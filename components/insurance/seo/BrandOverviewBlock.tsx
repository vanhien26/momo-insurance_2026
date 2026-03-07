import { Car } from "lucide-react";

interface BrandOverviewBlockProps {
  brandName: string;
  origin?: string;
  segment?: string;
  typeName: string;
}

export function BrandOverviewBlock({
  brandName,
  origin,
  segment,
  typeName,
}: BrandOverviewBlockProps) {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-6 md:p-8">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-momo-100 flex items-center justify-center">
            <Car className="w-6 h-6 text-momo-600" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
              Giới thiệu {typeName} cho xe {brandName}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Xe {brandName} là một trong những hãng xe được yêu thích tại Việt Nam. Việc mua {typeName.toLowerCase()} cho xe {brandName} giúp bảo vệ tài sản của bạn trước các rủi ro tai nạn, cháy nổ, thủy kích và mất cắp.
            </p>
            {(origin || segment) && (
              <div className="flex flex-wrap gap-4 text-sm">
                {origin && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Xuất xứ:</span>
                    <span className="font-medium text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                      {origin}
                    </span>
                  </div>
                )}
                {segment && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Phân khúc:</span>
                    <span className="font-medium text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                      {segment}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
