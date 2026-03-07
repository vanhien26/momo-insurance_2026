import Link from "next/link";
import type { InsuranceProductType } from "@/types/insurance";
import { formatCurrency } from "@/lib/utils";

interface ProductTypeCardsProps {
  types: InsuranceProductType[];
  productSlug: string;
}

export function ProductTypeCards({ types, productSlug }: ProductTypeCardsProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-ink-primary mb-8">
        Chọn loại bảo hiểm
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {types.map((type) => {
          const minPrice = Math.min(...type.pricingTiers.map((t) => t.annualPremium));
          return (
            <Link
              key={type.slug}
              href={`/${productSlug}/${type.slug}`}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8
                hover:border-momo-200 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold text-ink-primary group-hover:text-momo-600 transition-colors">
                {type.name}
              </h3>
              <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                {type.shortDesc}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-lg font-bold text-momo-600">
                  Từ {formatCurrency(minPrice)}
                </span>
                <span className="text-sm text-ink-tertiary">/năm</span>
              </div>
              <div className="mt-2 text-sm text-ink-tertiary">
                {type.providers.length} nhà bảo hiểm • {type.pricingTiers.length} gói
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-momo-500 group-hover:text-momo-600">
                So sánh & mua ngay
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
