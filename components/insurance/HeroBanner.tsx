import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  bgClass?: string;
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bgClass = "from-momo-500 to-momo-700",
}: HeroBannerProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${bgClass} py-16 md:py-24`}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 animate-fade-in">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in [animation-delay:100ms]">
            {subtitle}
          </p>
          <a href={ctaHref}>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-momo-600 hover:bg-gray-50 shadow-elevated animate-fade-in [animation-delay:200ms]"
            >
              {ctaText}
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
