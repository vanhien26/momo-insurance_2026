import type { Metadata } from "next";
import Link from "next/link";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";

export const metadata: Metadata = {
  title: "Bảo Hiểm Online - So sánh & Mua nhanh nhất Việt Nam",
  description:
    "Nền tảng so sánh bảo hiểm online hàng đầu Việt Nam. Ô tô, xe máy, sức khỏe, du lịch, nhà ở. 11+ nhà bảo hiểm uy tín. Mua qua MoMo trong 3 phút.",
};

export default function InsuranceHubPage() {
  const products = registry.getAll();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "MoMo Bảo Hiểm - Nền tảng so sánh bảo hiểm online",
      description: "So sánh và mua bảo hiểm online từ các nhà bảo hiểm uy tín hàng đầu Việt Nam.",
      url: "https://momo.vn/bao-hiem",
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-momo-500 via-momo-600 to-momo-800 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Bảo hiểm thông minh
              <br />
              <span className="text-momo-200">trên MoMo</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto">
              So sánh giá từ 11+ nhà bảo hiểm uy tín. Mua online trong 3 phút.
              Bồi thường nhanh 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-content text-center mb-10">
            Chọn loại bảo hiểm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <Link key={product.id} href={`/${product.slug}`}>
                <Card className="h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 bg-momo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <h3 className="text-lg font-semibold text-content mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-content-secondary mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {product.types.map((t) => (
                        <span
                          key={t.slug}
                          className="text-xs bg-surface-tertiary text-content-secondary px-2.5 py-1 rounded-full"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Coming soon cards */}
            {["BH Xe Máy", "BH Sức Khỏe", "BH Du Lịch"].map((name) => (
              <Card key={name} className="h-full opacity-60">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔜</span>
                  </div>
                  <h3 className="text-lg font-semibold text-content mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-content-tertiary">Sắp ra mắt</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
