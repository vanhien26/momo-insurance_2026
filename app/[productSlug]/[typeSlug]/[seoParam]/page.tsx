import type { Metadata } from "next";
import type { SEOVariableItem } from "@/types/seo";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { buildPageSEO } from "@/lib/seo";

interface PageProps {
  params: { productSlug: string; typeSlug: string; seoParam: string };
}

export async function generateStaticParams() {
  return registry.getSEOParams();
}

function resolveSEOParam(
  product: NonNullable<ReturnType<typeof registry.get>>,
  seoParam: string
) {
  // Try provider
  for (const dim of product.seoVariables.dimensions) {
    const found = dim.data.find(
      (item: SEOVariableItem) => item.slug === seoParam
    );
    if (found)
      return { dimension: dim.dimension, item: found, label: dim.label };
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = registry.get(params.productSlug);
  if (!product) return {};
  const type = product.types.find((t) => t.slug === params.typeSlug);
  if (!type) return {};
  const resolved = resolveSEOParam(product, params.seoParam);
  if (!resolved) return {};

  const year = new Date().getFullYear();
  const title = `Bảo hiểm ô tô ${resolved.item.name} ${year} - So sánh & Mua online | MoMo`;
  const description = `Mua bảo hiểm ô tô ${type.name.toLowerCase()} ${resolved.item.name}. So sánh ${type.providers.length} nhà bảo hiểm, mua online qua MoMo.`;

  return { title, description };
}

export default function SEOParamPage({ params }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === params.typeSlug);
  if (!type) notFound();

  const resolved = resolveSEOParam(product, params.seoParam);
  if (!resolved) notFound();

  const seo = buildPageSEO({ product, type });
  const year = new Date().getFullYear();

  // Filter providers for specific dimension if applicable
  const providers = type.providers;

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      <section className="bg-gradient-to-br from-momo-500 to-momo-700 py-12">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={[
              ...seo.breadcrumbs,
              { label: resolved.item.name, href: `/${product.slug}/${type.slug}/${params.seoParam}` },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
            {type.name} {resolved.item.name} {year}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">
            So sánh {providers.length} nhà bảo hiểm {type.name.toLowerCase()} cho{" "}
            {resolved.dimension === "brand" ? `xe ${resolved.item.name}` : 
             resolved.dimension === "province" ? `tại ${resolved.item.name}` :
             resolved.item.name}.
            Mua online qua MoMo, bồi thường nhanh 24h.
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-content mb-4">
              Tổng quan {type.name.toLowerCase()}{" "}
              {resolved.dimension === "brand" ? `cho xe ${resolved.item.name}` :
               resolved.dimension === "province" ? `tại ${resolved.item.name}` :
               resolved.item.name}
            </h2>
            <p className="text-content-secondary leading-relaxed">
              {resolved.dimension === "provider"
                ? `${resolved.item.name} là một trong những nhà bảo hiểm uy tín hàng đầu Việt Nam. Với sản phẩm ${type.name.toLowerCase()}, ${resolved.item.name} cung cấp nhiều gói bảo hiểm phù hợp với mọi nhu cầu và ngân sách.`
                : resolved.dimension === "brand"
                ? `Xe ${resolved.item.name} là một trong những hãng xe phổ biến nhất tại Việt Nam. Việc mua ${type.name.toLowerCase()} cho xe ${resolved.item.name} giúp bảo vệ tài sản của bạn trước các rủi ro tai nạn, cháy nổ, mất cắp.`
                : `Mua ${type.name.toLowerCase()} tại ${resolved.item.name} với ${providers.length} nhà bảo hiểm uy tín. So sánh giá và quyền lợi để chọn gói phù hợp nhất.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-content mb-6">
            {providers.length} nhà bảo hiểm
          </h2>
          <ProviderGrid
            providers={providers}
            pricingTiers={type.pricingTiers}
            productSlug={product.slug}
            typeSlug={type.slug}
          />
        </div>
      </section>

      <FAQAccordion faqs={product.faqs} productName={type.name.toLowerCase()} />

      <InsuranceCTA
        ctaText="Mua ngay"
        ctaHref={`/${product.slug}/${type.slug}`}
      />
    </>
  );
}
