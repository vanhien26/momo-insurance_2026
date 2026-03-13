import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import LeadCaptureForm from "@/components/insurance/LeadCaptureForm";
import { TrustSignalsBlock, ContentBlock } from "@/components/insurance/seo";
import brandsWithModels from "@/products/auto-insurance/data/brands-with-models.json";

interface PageProps {
  params: Promise<{
    productSlug: string;
    typeSlug: string;
    brandSlug: string;
    modelSlug: string;
  }>;
}

function getBrandAndModel(brandSlug: string, modelSlug: string) {
  const brand = brandsWithModels.find((b: { slug: string }) => b.slug === brandSlug);
  if (!brand || !brand.models) return null;
  const model = brand.models.find((m: { slug: string }) => m.slug === modelSlug);
  if (!model) return null;
  return { brand, model };
}

export async function generateStaticParams() {
  const params: { productSlug: string; typeSlug: string; brandSlug: string; modelSlug: string }[] = [];
  const product = registry.get("bao-hiem-o-to");
  if (!product) return params;

  for (const type of product.types) {
    for (const b of brandsWithModels) {
      for (const m of b.models || []) {
        params.push({
          productSlug: "bao-hiem-o-to",
          typeSlug: type.slug,
          brandSlug: b.slug,
          modelSlug: m.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const found = getBrandAndModel(resolvedParams.brandSlug, resolvedParams.modelSlug);
  if (!found) return {};

  const product = registry.get(resolvedParams.productSlug);
  if (!product) return {};
  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug);
  if (!type) return {};

  const year = new Date().getFullYear();
  const title = `Bảo hiểm ${found.brand.name} ${found.model.name} ${year} - So sánh & Mua online | MoMo`;
  const description = `Mua ${type.name.toLowerCase()} cho xe ${found.brand.name} ${found.model.name}. So sánh 11+ nhà bảo hiểm, mua online qua MoMo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://momo.vn/${resolvedParams.productSlug}/${resolvedParams.typeSlug}/dong-xe/${resolvedParams.brandSlug}/${resolvedParams.modelSlug}`,
    },
  };
}

export default async function BrandModelPage({ params }: PageProps) {
  const resolvedParams = await params;
  const found = getBrandAndModel(resolvedParams.brandSlug, resolvedParams.modelSlug);
  if (!found) notFound();

  const product = registry.get(resolvedParams.productSlug);
  if (!product) notFound();
  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug);
  if (!type) notFound();

  const { brand, model } = found;
  const providers = type.providers;
  const fullCarName = `${brand.name} ${model.name}`;

  const breadcrumbItems = [
    { label: product.name, href: `/${product.slug}` },
    { label: type.name, href: `/${product.slug}/${type.slug}` },
    { label: brand.name, href: `/${product.slug}/${type.slug}/${brand.slug}` },
    { label: model.name, href: "#" },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Bảo hiểm ${fullCarName}`,
      description: `So sánh ${providers.length} nhà bảo hiểm cho xe ${fullCarName}. Mua online qua MoMo.`,
      brand: { "@type": "Brand", name: brand.name },
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={schema} />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-momo-500/20 text-momo-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Dòng xe
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {type.name} <br />
                <span className="text-momo-300">{fullCarName}</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                So sánh {providers.length} nhà bảo hiểm cho xe {fullCarName}. Điền thông tin để nhận tư vấn báo giá chính xác.

              </p>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0 max-w-md">
              <LeadCaptureForm
                productSlug={resolvedParams.productSlug}
                typeSlug={resolvedParams.typeSlug}
              />

            </div>
          </div>
        </div>
      </section>

      <TrustSignalsBlock />

      <ContentBlock
        title={`Mức phí ${type.name.toLowerCase()} cho xe ${fullCarName}`}
        paragraphs={[
          `Xe ${fullCarName} là dòng xe phổ biến tại Việt Nam. Mức phí bảo hiểm thường dao động từ 1.1% - 1.8% giá trị xe, tùy theo đời xe và phạm vi bảo hiểm. Nhập biển số trên MoMo để nhận báo giá chính xác từ 11+ nhà bảo hiểm.`,
          `Các nhà bảo hiểm uy tín như PVI, Bảo Việt, MIC đều cung cấp gói bảo hiểm cho xe ${brand.name} ${model.name}. So sánh quyền lợi và mức phí để chọn gói phù hợp nhất với nhu cầu của bạn.`,
        ]}
      />

      {/* Link back to brand page + other models */}
      <section className="py-8 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-slate-600 text-sm mb-4">
            Xem thêm các dòng xe {brand.name} khác:{" "}
          </p>
          <div className="flex flex-wrap gap-2">
            {brand.models
              ?.filter((m: { slug: string }) => m.slug !== model.slug)
              .slice(0, 6)
              .map((m: { slug: string; name: string }) => (
                <Link
                  key={m.slug}
                  href={`/${resolvedParams.productSlug}/${resolvedParams.typeSlug}/dong-xe/${brand.slug}/${m.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm hover:border-momo-300 hover:text-momo-600 transition-colors"
                >
                  {m.name}
                </Link>
              ))}
            <Link
              href={`/${resolvedParams.productSlug}/${resolvedParams.typeSlug}/${brand.slug}`}
              className="px-3 py-1.5 rounded-lg bg-momo-100 text-momo-600 text-sm font-medium hover:bg-momo-200 transition-colors"
            >
              Xem tất cả dòng xe {brand.name} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="provider-grid">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center lg:text-left">
            {providers.length} nhà bảo hiểm cho xe {fullCarName}
          </h2>
          <ProviderGrid
            providers={providers}
            pricingTiers={type.pricingTiers}
            productSlug={product.slug}
            typeSlug={type.slug}
          />
        </div>
      </section>

      <FAQAccordion
        faqs={product.faqs}
        productName={`${type.name.toLowerCase()} xe ${fullCarName}`}
      />

      <InsuranceCTA
        title={`Bảo vệ xe ${fullCarName} ngay hôm nay`}
        description="So sánh báo giá 30s. Mua online qua MoMo."
        ctaText="Xem báo giá ngay"
        ctaHref={`/${product.slug}/${type.slug}`}
      />
    </div>
  );
}
