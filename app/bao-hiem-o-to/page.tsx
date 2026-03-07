import React from 'react';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Headset, Car, MapPin } from "lucide-react";

// Import từ Registry và Lib
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";

// Import Components
import { HeroBanner } from "@/components/insurance/HeroBanner";
import { TrustSignals } from "@/components/insurance/TrustSignals";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageSEO } from "@/lib/seo";

const PRODUCT_SLUG = "bao-hiem-o-to";

export async function generateMetadata(): Promise<Metadata> {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) return { title: "Bảo hiểm ô tô trực tuyến - MoMo" };
  const seo = buildPageSEO({ product });
  return { 
    title: seo.title, 
    description: seo.description 
  };
}

export default function AutoInsuranceHubPage() {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) return notFound();
  const seo = buildPageSEO({ product });

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={seo.schema} />
      
      {/* 1. Breadcrumb - Tách biệt rõ ràng */}
      <BreadcrumbNav items={seo.breadcrumbs} />
      
      {/* 2. Hero Banner - Tối ưu LCP */}
      <HeroBanner
        title={product.metadata.heroTitle}
        subtitle={product.metadata.heroSubtitle}
        ctaText={product.metadata.ctaText || "Mua ngay"}
        ctaHref={product.metadata.ctaHref || `/${PRODUCT_SLUG}/vat-chat`}
      />

      {/* 3. Section USP - Lợi ích khi mua trên MoMo */}
      <section className="py-16 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="w-8 h-8 text-momo-500" />, title: "Báo giá 30s", desc: "So sánh 11+ hãng bảo hiểm hàng đầu." },
              { icon: <ShieldCheck className="w-8 h-8 text-momo-500" />, title: "Bồi thường dễ", desc: "Quy trình online, nhận tiền qua MoMo." },
              { icon: <Headset className="w-8 h-8 text-momo-500" />, title: "Hỗ trợ 24/7", desc: "Chuyên gia luôn sẵn sàng đồng hành." },
              { icon: <CheckCircle2 className="w-8 h-8 text-momo-500" />, title: "Pháp lý chuẩn", desc: "Chứng chỉ số có giá trị toàn quốc." },
            ].map((usp, i) => (
              <div key={i} className="text-center md:text-left p-4">
                <div className="mb-4 flex justify-center md:justify-start">{usp.icon}</div>
                <h4 className="font-bold text-slate-900 mb-1">{usp.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Danh sách gói bảo hiểm */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Các gói <span className="text-momo-500">Bảo hiểm Ô tô</span>
              </h2>
              <p className="text-slate-600">Lựa chọn giải pháp bảo vệ tối ưu nhất cho nhu cầu của bạn.</p>
            </div>
            <TrustSignals stats={product.metadata.trustStats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {product.types.map((type) => (
              <Link key={type.slug} href={`/${product.slug}/${type.slug}`} className="group">
                <Card className="h-full border-none shadow-sm group-hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-0 flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-white flex items-center justify-center p-10 group-hover:bg-pink-50">
                       <div className="text-6xl">{type.slug.includes('vat-chat') ? '🛡️' : '⚖️'}</div>
                    </div>
                    <div className="md:w-2/3 p-10 bg-white">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-momo-500">{type.name}</h3>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed">{type.shortDesc}</p>
                      <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                          <Car className="w-4 h-4" /> {type.providers.length} Đối tác
                        </span>
                        <div className="text-momo-500 font-black">Khám phá ngay →</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section FAQ */}
      <section className="py-20 bg-white">
        <FAQAccordion faqs={product.faqs} productName={product.name.toLowerCase()} />
      </section>
      
      {/* 6. Footer CTA */}
      <InsuranceCTA
        ctaText={product.metadata.ctaText || "Mua bảo hiểm ngay"}
        ctaHref={product.metadata.ctaHref || `/${PRODUCT_SLUG}/vat-chat`}
      />
    </div>
  );
}