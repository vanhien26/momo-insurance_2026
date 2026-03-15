import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CarModel {
  slug: string;
  name: string;
}

interface ModelGridBlockProps {
  brandName: string;
  brandSlug: string;
  typeName: string;
  models: CarModel[];
  productSlug: string;
  typeSlug: string;
}

export function ModelGridBlock({
  brandName,
  brandSlug,
  typeName,
  models,
  productSlug,
  typeSlug,
}: ModelGridBlockProps) {
  if (!models || models.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          {typeName} theo dòng xe {brandName}
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl">
          Chọn dòng xe {brandName} của bạn để xem báo giá bảo hiểm chi tiết
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/${productSlug}/${typeSlug}/dong-xe/${brandSlug}/${model.slug}`}
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 hover:border-momo-200 hover:shadow-card-hover transition-all"
            >
              <span className="font-medium text-slate-800 group-hover:text-momo-600 transition-colors">
                {model.name}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-momo-500 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
