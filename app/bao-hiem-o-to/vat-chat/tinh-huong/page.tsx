import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import situationsData from "@/products/auto-insurance/data/situations.json";
import { SituationCard } from "@/components/insurance/SituationCard";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { buildPageSEO } from "@/lib/seo";

const PRODUCT_SLUG = "bao-hiem-o-to";
const TYPE_SLUG = "vat-chat";

export const metadata: Metadata = {
  title: "Các Tình Huống Bảo Hiểm Vật Chất Ô Tô | MoMo Insurance",
  description:
    "Tìm hiểu về các tình huống bảo hiểm vật chất ô tô như thủy kích, va chạm, cháy nổ và các bảo hiểm nào chi trả.",
};

export default function SituationsPage() {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) notFound();

  const type = product.types.find((t) => t.slug === TYPE_SLUG);
  if (!type) notFound();

  const seo = buildPageSEO({ product, type });

  const situations = situationsData as any[];

  return (
    <>
      <SchemaMarkup schemas={seo.schema} />

      <nav className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <BreadcrumbNav
            items={[
              ...seo.breadcrumbs,
              { label: "Tình Huống", href: "" },
            ]}
          />
        </div>
      </nav>

      <section className="bg-gradient-to-br from-momo-500 to-momo-700 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Các Tình Huống Bảo Hiểm Vật Chất
          </h1>
          <p className="text-lg text-white/85 max-w-2xl">
            Khám phá các tình huống mà ô tô cần bảo hiểm vật chất xử lí và tìm
            hiểu bảo hiểm nào chi trả cho mỗi tình huống.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {situations.map((situation) => (
              <SituationCard
                key={situation.id}
                situation={situation}
                productSlug={PRODUCT_SLUG}
                typeSlug={TYPE_SLUG}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Lựa Chọn Gói Bảo Hiểm Phù Hợp
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Mỗi tình huống yêu cầu một mức độ bảo vệ khác nhau. Bảo hiểm
                vật chất được chia thành ba gói chính:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-momo-500 font-bold">•</span>
                  <span>
                    <strong>Gói Cơ Bản:</strong> Bao gồm tai nạn, va chạm, cháy
                    nổ, thiên tai và mất cắp toàn bộ.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-momo-500 font-bold">•</span>
                  <span>
                    <strong>Gói Nâng Cao:</strong> Tất cả gói Cơ Bản cộng thêm
                    thủy kích, trầy xước, kính xe vỡ.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-momo-500 font-bold">•</span>
                  <span>
                    <strong>Gói Toàn Diện:</strong> Bảo vệ tối đa với tất cả các
                    tình huống bao gồm tai nạn lái xe, hỗ trợ đường bộ 24/7 và
                    xe thay thế.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
