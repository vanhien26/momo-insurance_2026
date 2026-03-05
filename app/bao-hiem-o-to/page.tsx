import React from 'react';
import type { Metadata } from "next";
// Import từ 'next/navigation' và 'next/link' là các gói chuẩn của Next.js
import { notFound } from "next/navigation";
import Link from "next/link";

// Đảm bảo đường dẫn tương đối chính xác dựa trên cấu trúc thư mục project
// app/bao-hiem-o-to/page.tsx -> ../ (app/) -> ../ (root/)
import { registry } from "../../lib/registry";
import "../../products/auto-insurance";

import { HeroBanner } from "../../components/insurance/HeroBanner";
import { TrustSignals } from "../../components/insurance/TrustSignals";
import { FAQAccordion } from "../../components/insurance/FAQAccordion";
import { InsuranceCTA } from "../../components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "../../components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "../../components/insurance/SchemaMarkup";
import { Card, CardContent } from "../../components/ui/card";
import { buildPageSEO } from "../../lib/seo";

/**
 * ARCHITECTURE NOTE:
 * Trang này được thiết kế là một Server Component để tối ưu hóa SEO (pSEO) và hiệu suất.
 * Việc sử dụng đường dẫn tương đối (../../) thay vì alias (@/) để tương thích tốt hơn với môi trường build hiện tại.
 */

const PRODUCT_SLUG = "bao-hiem-o-to";

// generateMetadata chỉ hoạt động trong Server Component
export async function generateMetadata(): Promise<Metadata> {
  const product = registry.get(PRODUCT_SLUG);
  if (!product) {
    return {
      title: "Bảo hiểm ô tô trực tuyến - MoMo",
      description: "Mua bảo hiểm ô tô dễ dàng, nhanh chóng trên MoMo."
    };
  }

  const seo = buildPageSEO({ product });
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `https://momo.vn/${PRODUCT_SLUG}`,
    }
  };
}

export default function AutoInsuranceHubPage() {
  const product = registry.get(PRODUCT_SLUG);

  // Xử lý trường hợp sản phẩm chưa được đăng ký trong Registry
  if (!product) {
    return notFound();
  }

  const seo = buildPageSEO({ product });

  return (
    <div className="bg-surface min-h-screen">
      {/* Cấu trúc dữ liệu JSON-LD cho Google Search */}
      <SchemaMarkup schemas={seo.schema} />

      {/* Hero Banner: Phần đầu trang thu hút người dùng */}
      <HeroBanner
        title={product.metadata.heroTitle}
        subtitle={product.metadata.heroSubtitle}
        ctaText={product.metadata.ctaText || "Mua ngay"}
        ctaHref={product.metadata.ctaHref || `/${PRODUCT_SLUG}/vat-chat`}
      />

      {/* Trust Signals: Các con số chứng thực độ tin cậy */}
      <TrustSignals stats={product.metadata.trustStats} />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={seo.breadcrumbs} />

          <div className="mt-10 mb-12 text-center md:text-left">
            <h2 className="text-3xl font-black text-content tracking-tight sm:text-4xl">
              Các gói {product.name.toLowerCase()} MoMo
            </h2>
            <p className="mt-4 text-lg text-content-secondary max-w-3xl leading-relaxed">
              So sánh và lựa chọn giải pháp bảo vệ tối ưu cho xế yêu từ 11 nhà cung cấp hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto md:mx-0">
            {product.types.map((type) => (
              <Link key={type.slug} href={`/${product.slug}/${type.slug}`}>
                <Card className="h-full border border-gray-100 hover:shadow-card-hover hover:border-momo-200 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                  <CardContent className="pt-12 pb-10 px-8">
                    {/* Họa tiết trang trí đặc trưng của MoMo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-momo-50 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />

                    <h3 className="text-2xl font-bold text-content mb-4 group-hover:text-momo-600 transition-colors">
                      {type.name}
                    </h3>
                    <p className="text-content-secondary mb-8 leading-relaxed">
                      {type.shortDesc}
                    </p>

                    <div className="flex items-center justify-between mt-auto border-t border-gray-50 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-content-tertiary uppercase tracking-wider">Đang cung cấp</span>
                        <span className="text-sm font-bold text-content mt-1">
                          {type.providers.length} đối tác uy tín
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-momo-500 font-extrabold group-hover:gap-4 transition-all">
                        Khám phá
                        <span className="text-2xl">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Phần câu hỏi thường gặp */}
      <FAQAccordion
        faqs={product.faqs}
        productName={product.name.toLowerCase()}
      />

      {/* Phần kêu gọi hành động cuối trang */}
      <InsuranceCTA
        ctaText={product.metadata.ctaText || "Mua bảo hiểm ngay"}
        ctaHref={product.metadata.ctaHref || `/${PRODUCT_SLUG}/vat-chat`}
      />
    </div>
  );
}