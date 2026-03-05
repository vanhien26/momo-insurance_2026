import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { HeroBanner } from "@/components/insurance/HeroBanner";
import { TrustSignals } from "@/components/insurance/TrustSignals";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageSEO } from "@/lib/seo";
import Link from "next/link";

interface PageProps {
  params: { productSlug: string };
}

export async function generateStaticParams() {
  return registry.getProductHubParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = registry.get(params.productSlug);
  if (!product) return {};
  const seo = buildPageSEO({ product });
  return { title: seo.title, description: seo.description };
}

export default function ProductHubPage({ params }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const seo = buildPageSEO({ product });

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      <HeroBanner
        title={product.metadata.heroTitle}
        subtitle={product.metadata.heroSubtitle}
        ctaText={product.metadata.ctaText}
        ctaHref={product.metadata.ctaHref}
      />

      <TrustSignals stats={product.metadata.trustStats} />

      {/* Product Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BreadcrumbNav items={seo.breadcrumbs} />

          <h2 className="text-2xl font-bold text-content mb-8 mt-4">
            Chọn loại {product.name.toLowerCase()}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {product.types.map((type) => (
              <Link key={type.slug} href={`/${product.slug}/${type.slug}`}>
                <Card className="h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-semibold text-content mb-2 group-hover:text-momo-600 transition-colors">
                      {type.name}
                    </h3>
                    <p className="text-content-secondary mb-4">
                      {type.shortDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-content-tertiary">
                        {type.providers.length} nhà bảo hiểm
                      </span>
                      <span className="text-momo-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Xem chi tiết →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={product.faqs} productName={product.name.toLowerCase()} />

      <InsuranceCTA
        ctaText={product.metadata.ctaText}
        ctaHref={product.metadata.ctaHref}
      />
    </>
  );
}
