import { Button } from "@/components/ui/button";

interface InsuranceCTAProps {
  title?: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  variant?: "inline" | "banner";
}

export function InsuranceCTA({
  title = "Bảo vệ xe của bạn ngay hôm nay",
  description = "So sánh 11 nhà bảo hiểm uy tín. Mua online trong 3 phút.",
  ctaText,
  ctaHref,
  variant = "banner",
}: InsuranceCTAProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-4 p-4 bg-momo-50 rounded-xl border border-momo-100">
        <div className="flex-1">
          <p className="font-medium text-content">{title}</p>
          <p className="text-sm text-content-secondary">{description}</p>
        </div>
        <a href={ctaHref}>
          <Button size="sm">{ctaText}</Button>
        </a>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-momo-500 to-momo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
          {description}
        </p>
        <a href={ctaHref}>
          <Button
            size="lg"
            className="bg-white text-momo-600 hover:bg-gray-50 shadow-elevated"
          >
            {ctaText}
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </a>
      </div>
    </section>
  );
}
