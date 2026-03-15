import type { InsuranceProvider } from "@/types/insurance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ProviderCardProps {
  provider: InsuranceProvider;
  minPrice?: number;
  tierCount?: number;
  productSlug: string;
  typeSlug: string;
}

export function ProviderCard({
  provider,
  minPrice,
  tierCount,
  productSlug,
  typeSlug,
}: ProviderCardProps) {
  return (
    <Card className="group hover:-translate-y-1 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Logo placeholder */}
          <div className="w-14 h-14 rounded-xl bg-surface-tertiary flex items-center justify-center flex-shrink-0 text-lg font-bold text-momo-600">
            {provider.name.slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-content text-lg truncate">
              {provider.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-amber-500 text-sm">
                {"★".repeat(Math.floor(provider.rating))}
              </span>
              <span className="text-sm text-content-secondary">
                {provider.rating} ({provider.reviewCount.toLocaleString("vi-VN")} đánh giá)
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-content-secondary mb-4 line-clamp-2">
          {provider.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {provider.features.slice(0, 3).map((f) => (
            <Badge key={f} variant="default">
              {f}
            </Badge>
          ))}
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-gray-50">
          <div>
            {minPrice ? (
              <>
                <p className="text-xs text-content-tertiary">Phí từ</p>
                <p className="text-lg font-bold text-momo-600">
                  {formatCurrency(minPrice)}
                  <span className="text-xs font-normal text-content-tertiary">
                    /năm
                  </span>
                </p>
              </>
            ) : null}
            {tierCount !== undefined && tierCount > 0 && (
              <p className="text-xs text-content-tertiary">{tierCount} gói</p>
            )}
          </div>
          <a href={`/${productSlug}/${typeSlug}/${provider.slug}`}>
            <Button size="sm" variant="outline">
              Xem chi tiết
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
