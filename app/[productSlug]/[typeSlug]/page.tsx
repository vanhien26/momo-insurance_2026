import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { PricingTable } from "@/components/insurance/PricingTable";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { ClientVehicleInfoForm } from "@/components/insurance/ClientVehicleInfoForm";
import { buildPageSEO } from "@/lib/seo";

interface PageProps {
  params: { productSlug: string; typeSlug: string };
}

export async function generateStaticParams() {
  return registry.getProductTypeParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = registry.get(params.productSlug);
  if (!product) return {};
  const type = product.types.find((t) => t.slug === params.typeSlug);
  if (!type) return {};
  const seo = buildPageSEO({ product, type });
  return { title: seo.title, description: seo.description };
}

export default function ProductTypePage({ params }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === params.typeSlug);
  if (!type) notFound();

  const seo = buildPageSEO({ product, type });

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      {/* Hero section */}
      <section className="bg-gradient-to-br from-momo-500 to-momo-700 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <BreadcrumbNav
            items={seo.breadcrumbs.map((b) => ({
              ...b,
              label: b.label,
            }))}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
            {type.name}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">{type.shortDesc}</p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-12 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card p-8">
            <ClientVehicleInfoForm />
          </div>
        </div>
      </section>

      {/* Provider Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-content mb-8">
            {type.providers.length} nhà bảo hiểm {type.name.toLowerCase()}
          </h2>
          <ProviderGrid
            providers={type.providers}
            pricingTiers={type.pricingTiers}
            productSlug={product.slug}
            typeSlug={type.slug}
          />
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-12 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-content mb-8">
            So sánh giá tất cả gói {type.name.toLowerCase()}
          </h2>
          <PricingTable tiers={type.pricingTiers} providers={type.providers} />
        </div>
      </section>

      <FAQAccordion faqs={product.faqs} productName={type.name.toLowerCase()} />

      <InsuranceCTA
        ctaText="Mua ngay"
        ctaHref={`/${product.slug}/${type.slug}`}
        title={`Bảo vệ xe của bạn với ${type.name}`}
      />
    </>
  );
}
