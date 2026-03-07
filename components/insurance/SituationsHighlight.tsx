import Link from "next/link";
import situationsData from "@/products/auto-insurance/data/situations.json";
import { Situation } from "@/types/insurance";
import { Card } from "@/components/ui/card";

interface SituationsHighlightProps {
  productSlug: string;
  typeSlug: string;
  maxSituations?: number;
}

export function SituationsHighlight({
  productSlug,
  typeSlug,
  maxSituations = 4,
}: SituationsHighlightProps) {
  const situations = (situationsData as Situation[]).slice(0, maxSituations);

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    red: "bg-red-50 text-red-600 border-red-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tình Huống Phổ Biến
            </h2>
            <p className="text-gray-600">
              Tìm hiểu về các rủi ro sẽ bảo hiểm vật chất xử lí
            </p>
          </div>
          <Link
            href={`/${productSlug}/${typeSlug}/tinh-huong`}
            className="text-momo-600 hover:text-momo-700 font-semibold flex items-center gap-1"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {situations.map((situation) => (
            <Link
              key={situation.id}
              href={`/${productSlug}/${typeSlug}/tinh-huong/${situation.slug}`}
            >
              <Card
                className={`p-4 text-center cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  colorClasses[situation.color] || colorClasses.blue
                }`}
              >
                <div className="text-4xl mb-3">{situation.icon}</div>
                <h3 className="font-semibold text-sm md:text-base">
                  {situation.name}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Gồm {situation.coveringPackages.length} gói bảo hiểm
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
