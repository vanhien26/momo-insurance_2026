import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import situationsData from "@/products/auto-insurance/data/situations.json";
import { Situation } from "@/types/insurance";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { CoveringInsurances } from "@/components/insurance/CoveringInsurances";
import { AutoLinkBuilding } from "@/components/insurance/AutoLinkBuilding";
import { buildPageSEO } from "@/lib/seo";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const PRODUCT_SLUG = "bao-hiem-o-to";
const TYPE_SLUG = "vat-chat";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const situations = situationsData as Situation[];
  const situation = situations.find((s) => s.slug === params.slug);
  if (!situation) return {};

  const product = registry.get(PRODUCT_SLUG);
  if (!product) return {};

  const type = product.types.find((t) => t.slug === TYPE_SLUG);
  if (!type) return {};

  return {
    title: `${situation.name} - Bảo Hiểm Vật Chất Ô Tô | Bảo Hiểm MoMo`,
    description: situation.detailedDescription,
  };
}

export async function generateStaticParams() {
  const situations = situationsData as Situation[];
  return situations.map((situation) => ({
    slug: situation.slug,
  }));
}

export default function SituationDetailPage({ params }: PageProps) {
  const situations = situationsData as Situation[];
  const situation = situations.find((s) => s.slug === params.slug);
  if (!situation) notFound();

  const product = registry.get(PRODUCT_SLUG);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === TYPE_SLUG);
  if (!type) notFound();

  const seo = buildPageSEO({ product, type });

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      <BreadcrumbNav
        items={[
          ...seo.breadcrumbs,
          { label: "Tình Huống", href: `/${PRODUCT_SLUG}/${TYPE_SLUG}/tinh-huong` },
          { label: situation.name, href: `/${PRODUCT_SLUG}/${TYPE_SLUG}/tinh-huong/${situation.slug}` },
        ]}
      />

      <section className="relative h-[280px] md:h-[360px] overflow-hidden">
        <Image
          src="/images/situation-banner.jpg"
          alt={`Bảo hiểm ${situation.name}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="max-w-2xl">
            <p className="text-5xl mb-4">{situation.icon}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {situation.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {situation.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Mô Tả Chi Tiết
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {situation.detailedDescription}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Các Chi Phí Được Chi Trả
                </h3>
                <div className="space-y-3">
                  {situation.coverageDetails.map((detail, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-momo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-momo-50 to-momo-100 border-0 h-fit">
                <h3 className="font-semibold text-gray-900 mb-4">
                  ℹ️ Lưu Ý Quan Trọng
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-momo-500 font-bold">•</span>
                    <span>Mức chi trả phụ thuộc vào gói bảo hiểm bạn chọn</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-momo-500 font-bold">•</span>
                    <span>
                      Khấu trừ và giới hạn bảo hiểm có thể khác nhau giữa các
                      nhà bảo hiểm
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-momo-500 font-bold">•</span>
                    <span>Luôn đọc kỹ các điều khoản bảo hiểm trước khi ký</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Các Bảo Hiểm Chi Trả cho {situation.name}
              </h2>
              <CoveringInsurances
                coveringPackageIds={situation.coveringPackages}
                pricingTiers={type.pricingTiers}
                providers={type.providers}
                productSlug={PRODUCT_SLUG}
                typeSlug={TYPE_SLUG}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Automation Link Building ─── */}
      <AutoLinkBuilding
        currentSituation={situation}
        allSituations={situations}
        providers={type.providers}
        pricingTiers={type.pricingTiers}
        productSlug={PRODUCT_SLUG}
        typeSlug={TYPE_SLUG}
      />

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-momo-500 to-momo-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Bảo vệ xe của bạn trước rủi ro {situation.name.toLowerCase()}
            </h2>
            <p className="text-white/80 mb-6">
              So sánh giá từ nhiều nhà bảo hiểm và mua ngay trên MoMo trong 3 phút.
            </p>
            <a
              href={`/${PRODUCT_SLUG}/${TYPE_SLUG}`}
              className="inline-block bg-white text-momo-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
            >
              So sánh & Mua bảo hiểm ngay →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

