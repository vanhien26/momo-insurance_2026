import type { Metadata } from "next";
import type { SEOVariableItem } from "@/types/seo";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { ProviderPackageGrid } from "@/components/insurance/ProviderPackageGrid";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import ClientVehicleInfoForm from "@/components/insurance/ClientVehicleInfoForm";
import {
  BrandOverviewBlock,
  ModelGridBlock,
  WhyChooseBlock,
  RelatedBrandsBlock,
  ContentBlock,
  TrustSignalsBlock,
} from "@/components/insurance/seo";
import { buildPageSEO } from "@/lib/seo";
import brandsWithModels from "@/products/auto-insurance/data/brands-with-models.json";

interface PageProps {
  params: Promise<{ productSlug: string; typeSlug: string; seoParam: string }>;
}

export async function generateStaticParams() {
  return registry.getSEOParams();
}

function resolveSEOParam(
  product: NonNullable<ReturnType<typeof registry.get>>,
  seoParam: string
) {
  for (const dim of product.seoVariables.dimensions) {
    const found = dim.data.find(
      (item: SEOVariableItem) => item.slug === seoParam
    );
    if (found)
      return { dimension: dim.dimension, item: found, label: dim.label };
  }
  return null;
}

function getBrandWithModels(slug: string) {
  return brandsWithModels.find((b: { slug: string }) => b.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = registry.get(resolvedParams.productSlug);
  if (!product) return {};
  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug);
  if (!type) return {};
  const resolved = resolveSEOParam(product, resolvedParams.seoParam);
  if (!resolved) return {};

  const year = new Date().getFullYear();
  const title = `Bảo hiểm ô tô ${resolved.item.name} ${year} - So sánh & Mua online | MoMo`;
  const description = `Mua bảo hiểm ô tô ${type.name.toLowerCase()} ${resolved.item.name}. So sánh ${type.providers.length} nhà bảo hiểm, mua online qua MoMo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://momo.vn/${resolvedParams.productSlug}/${resolvedParams.typeSlug}/${resolvedParams.seoParam}`,
    },
  };
}

export default async function SEOParamPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = registry.get(resolvedParams.productSlug);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug);
  if (!type) notFound();

  const resolved = resolveSEOParam(product, resolvedParams.seoParam);
  if (!resolved) notFound();

  const seo = buildPageSEO({
    product,
    type,
    seoParam: resolvedParams.seoParam,
  });
  const providers = type.providers;
  const isBrandPage = resolved.dimension === "brand";
  const isProviderPage = resolved.dimension === "provider";

  // Trang Đối tác: chỉ lấy provider và các gói của đối tác đó
  const currentProvider = isProviderPage
    ? providers.find((p) => p.slug === resolvedParams.seoParam)
    : null;
  const providerTiers = isProviderPage && currentProvider
    ? type.pricingTiers.filter(
        (t) => t.providerId === currentProvider.id || t.providerId === "all"
      )
    : [];

  const brandData = isBrandPage
    ? getBrandWithModels(resolvedParams.seoParam)
    : null;

  const breadcrumbItems = [
    ...seo.breadcrumbs,
    {
      label: resolved.item.name,
      href: `/${product.slug}/${type.slug}/${resolvedParams.seoParam}`,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={seo.schema} />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero - Thiết kế mới, đẹp hơn */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-momo-500/20 text-momo-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                {resolved.label}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {type.name}{" "}
                {resolved.dimension === "brand"
                  ? `xe ${resolved.item.name}`
                  : resolved.dimension === "province"
                  ? `tại ${resolved.item.name}`
                  : resolved.item.name}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {isProviderPage
                  ? `Các gói ${type.name.toLowerCase()} tại ${resolved.item.name}. Chọn gói phù hợp và mua ngay qua MoMo.`
                  : `So sánh ${providers.length} nhà bảo hiểm uy tín. Mua online qua MoMo, cấp đơn 5 phút, bồi thường nhanh 24h.`}
              </p>
            </div>

            {(isBrandPage || isProviderPage) && (
              <div className="w-full lg:w-auto flex-shrink-0 max-w-md">
                <ClientVehicleInfoForm
                  productSlug={resolvedParams.productSlug}
                  typeSlug={resolvedParams.typeSlug}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustSignalsBlock />

      {/* Brand page: nhiều block SEO */}
      {isBrandPage && brandData && (
        <>
          <BrandOverviewBlock
            brandName={resolved.item.name}
            origin={(resolved.item as { meta?: { origin?: string } }).meta?.origin}
            segment={(resolved.item as { meta?: { segment?: string } }).meta?.segment}
            typeName={type.name}
          />

          {brandData.models && brandData.models.length > 0 && (
            <ModelGridBlock
              brandName={brandData.name}
              brandSlug={brandData.slug}
              typeName={type.name}
              models={brandData.models}
              productSlug={resolvedParams.productSlug}
              typeSlug={resolvedParams.typeSlug}
            />
          )}

          <WhyChooseBlock
            brandName={resolved.item.name}
            typeName={type.name}
            providerCount={providers.length}
          />

          <ContentBlock
            title={`Mức phí ${type.name.toLowerCase()} cho xe ${resolved.item.name}`}
            paragraphs={[
              `Phí bảo hiểm cho xe ${resolved.item.name} thường dao động từ 1.1% - 1.8% giá trị xe, tùy theo đời xe, dòng xe và phạm vi bảo hiểm (có thủy kích hay không). Trên MoMo, bạn có thể nhập biển số để nhận báo giá chính xác từ 11+ nhà bảo hiểm trong vòng 30 giây.`,
              `Các dòng xe ${resolved.item.name} phổ biến tại Việt Nam như Vios, Camry, Innova, Fortuner đều được các nhà bảo hiểm hỗ trợ với mức phí cạnh tranh. So sánh và chọn gói phù hợp ngay trên MoMo.`,
            ]}
          />

          <RelatedBrandsBlock
            currentBrandSlug={resolvedParams.seoParam}
            brands={brandsWithModels}
            productSlug={resolvedParams.productSlug}
            typeSlug={resolvedParams.typeSlug}
          />
        </>
      )}

      {/* Non-brand pages: content đơn giản hơn */}
      {!isBrandPage && (
        <ContentBlock
          title={`Tổng quan ${type.name.toLowerCase()} ${resolved.dimension === "province" ? `tại ${resolved.item.name}` : resolved.item.name}`}
          paragraphs={[
            resolved.dimension === "provider"
              ? `${resolved.item.name} là một trong những nhà bảo hiểm uy tín hàng đầu Việt Nam. Với sản phẩm ${type.name.toLowerCase()}, ${resolved.item.name} cung cấp nhiều gói bảo hiểm phù hợp với mọi nhu cầu và ngân sách.`
              : `Mua ${type.name.toLowerCase()} tại ${resolved.item.name} với ${providers.length} nhà bảo hiểm uy tín. So sánh giá và quyền lợi để chọn gói phù hợp nhất. Cấp đơn trong 5 phút qua MoMo.`,
          ]}
        />
      )}

      {/* Provider page: Grid gói bảo hiểm của đối tác | Brand/Province: Grid tất cả đối tác */}
      <section className="py-16 bg-white" id="provider-grid">
        <div className="container mx-auto px-4">
          {isProviderPage && currentProvider ? (
            <>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Các gói {type.name.toLowerCase()} tại {resolved.item.name}
              </h2>
              <p className="text-slate-600 mb-10 max-w-2xl">
                Chọn gói phù hợp, bấm Mua ngay để xác thực xe và điền thông tin người mua
              </p>
              <ProviderPackageGrid
                provider={currentProvider}
                tiers={providerTiers}
                productSlug={product.slug}
                typeSlug={type.slug}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center lg:text-left">
                {providers.length} nhà bảo hiểm uy tín
              </h2>
              <ProviderGrid
                providers={providers}
                pricingTiers={type.pricingTiers}
                productSlug={product.slug}
                typeSlug={type.slug}
              />
            </>
          )}
        </div>
      </section>

      <FAQAccordion
        faqs={product.faqs}
        productName={`${type.name.toLowerCase()} ${isBrandPage ? `xe ${resolved.item.name}` : ""}`}
      />

      <InsuranceCTA
        title={`Bảo vệ xe ${isBrandPage ? resolved.item.name : ""} với ${type.name}`}
        description="So sánh báo giá 30s. Mua online qua MoMo."
        ctaText="Xem báo giá ngay"
        ctaHref={`/${product.slug}/${type.slug}`}
      />
    </div>
  );
}
