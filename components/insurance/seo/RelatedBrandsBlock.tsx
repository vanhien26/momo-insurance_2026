import Link from "next/link";
import { Car } from "lucide-react";

interface Brand {
  slug: string;
  name: string;
}

interface RelatedBrandsBlockProps {
  currentBrandSlug: string;
  brands: Brand[];
  productSlug: string;
  typeSlug: string;
}

export function RelatedBrandsBlock({
  currentBrandSlug,
  brands,
  productSlug,
  typeSlug,
}: RelatedBrandsBlockProps) {
  const related = brands
    .filter((b) => b.slug !== currentBrandSlug)
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          Bảo hiểm xe các hãng khác
        </h2>
        <p className="text-slate-600 mb-8">
          Chọn hãng xe để xem báo giá bảo hiểm tương ứng
        </p>
        <div className="flex flex-wrap gap-2">
          {related.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${productSlug}/${typeSlug}/${brand.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-momo-300 hover:text-momo-600 hover:bg-momo-50 transition-colors text-sm font-medium"
            >
              <Car className="w-4 h-4 text-slate-400" />
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
