import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-24 border-b border-slate-100">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* CONTENT SIDE */}
          <div className="w-full md:w-3/5 text-center md:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-[#D82D8B] text-sm font-bold border border-pink-100">
              🛡️ Bảo vệ toàn diện 2026
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href={ctaHref} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#D82D8B] hover:bg-[#b02471] text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-pink-200 transition-all hover:-translate-y-1"
                >
                  {ctaText}
                </Button>
              </a>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="w-full md:w-2/5 relative h-[300px] md:h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-transparent rounded-full blur-3xl -z-10" />
            <Image
              src="/images/hero-car.webp"
              alt="Bảo hiểm ô tô MoMo"
              fill
              priority
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}