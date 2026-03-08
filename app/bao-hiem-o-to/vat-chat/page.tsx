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
import { SituationsHighlight } from "@/components/insurance/SituationsHighlight";
import ClientVehicleInfoForm from "@/components/insurance/ClientVehicleInfoForm";
import { buildPageSEO } from "@/lib/seo";

const PRODUCT_SLUG = "bao-hiem-o-to";
const TYPE_SLUG = "vat-chat";

export async function generateMetadata(): Promise<Metadata> {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) return {};
  const type = product.types.find((t) => t.slug === TYPE_SLUG);
  if (!type) return {};
  const seo = buildPageSEO({ product, type });
  return { title: seo.title, description: seo.description };
}

export default function AutoInsuranceVatChatPage() {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === TYPE_SLUG);
  if (!type) notFound();

  const seo = buildPageSEO({ product, type });

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      <BreadcrumbNav items={seo.breadcrumbs} />

      <section className="bg-gradient-to-br from-momo-500 to-momo-700 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {type.name}
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">{type.shortDesc}</p>
          <div className="mt-8">
            <a
              href={`/${PRODUCT_SLUG}/${TYPE_SLUG}/tinh-huong`}
              className="inline-block bg-white text-momo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              📋 Xem Các Tình Huống Bảo Hiểm →
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card p-8">
            <ClientVehicleInfoForm productSlug={PRODUCT_SLUG} typeSlug={TYPE_SLUG} />
          </div>
        </div>
      </section>

      <section className="py-12" id="provider-grid">
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

      <SituationsHighlight productSlug={PRODUCT_SLUG} typeSlug={TYPE_SLUG} />

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

