import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import {
  Car,
  Bike,
  HeartPulse,
  ShieldPlus,
  Building2,
  ShieldCheck,
  Zap,
  Headset,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bảo Hiểm Online - So sánh & Mua nhanh nhất Việt Nam | MoMo",
  description:
    "Nền tảng so sánh bảo hiểm online hàng đầu Việt Nam. Ô tô, xe máy, sức khỏe, y tế, xã hội. Mua qua MoMo trong 3 phút, bồi thường nhanh 24h.",
};

const INSURANCE_PRODUCTS = [
  {
    name: "Bảo hiểm Ô tô",
    href: "/bao-hiem-o-to",
    icon: Car,
    emoji: "🚗",
    desc: "So sánh 11+ nhà bảo hiểm. Vật chất, TNDS bắt buộc. Cấp đơn 5 phút.",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    tags: ["Vật chất", "TNDS Bắt buộc"],
    active: true,
  },
  {
    name: "Bảo hiểm Xe máy",
    href: "/bao-hiem-xe-may",
    icon: Bike,
    emoji: "🏍️",
    desc: "Bảo vệ xe máy khỏi mất cắp, tai nạn, cháy nổ. Chỉ từ 120K/năm.",
    color: "from-momo-500 to-momo-600",
    bgLight: "bg-pink-50",
    textColor: "text-momo-500",
    tags: ["Tự nguyện", "Mất cắp"],
    active: true,
  },
  {
    name: "Bảo hiểm Y tế",
    href: "/bao-hiem-y-te",
    icon: HeartPulse,
    emoji: "🏥",
    desc: "Chi trả viện phí, phẫu thuật, nội trú & ngoại trú tại bệnh viện toàn quốc.",
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50",
    textColor: "text-red-500",
    tags: ["Nội trú", "Ngoại trú"],
    active: true,
  },
  {
    name: "Bảo hiểm Sức khỏe+",
    href: "/bao-hiem-suc-khoe",
    icon: ShieldPlus,
    emoji: "💪",
    desc: "Bảo hiểm bệnh hiểm nghèo Chubb Life: 37 bệnh, lên đến 5 tỷ/năm.",
    color: "from-emerald-500 to-green-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    tags: ["Tai nạn", "Bệnh hiểm nghèo"],
    active: true,
  },
  {
    name: "Bảo hiểm Xã hội",
    href: "/bao-hiem-xa-hoi",
    icon: Building2,
    emoji: "🏛️",
    desc: "Tra cứu, đóng BHXH tự nguyện online. Bảo vệ quyền lợi hưu trí, thai sản.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    tags: ["Tự nguyện", "Hưu trí"],
    active: false,
  },
];

const TRUST_STATS = [
  { icon: Users, value: "2M+", label: "Người tin dùng" },
  { icon: Star, value: "4.8/5", label: "Đánh giá App" },
  { icon: Clock, value: "3 phút", label: "Mua & cấp đơn" },
  { icon: ShieldCheck, value: "24/7", label: "Hỗ trợ bồi thường" },
];

export default function InsuranceHubPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "MoMo Bảo Hiểm - Nền tảng so sánh bảo hiểm online",
      description:
        "So sánh và mua bảo hiểm online từ các nhà bảo hiểm uy tín hàng đầu Việt Nam.",
      url: "https://momo.vn/bao-hiem",
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* ─── 1. Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-momo-900 py-20 md:py-28">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-bold border border-white/10 mb-6 backdrop-blur-sm">
              🛡️ Nền tảng bảo hiểm số 1 Việt Nam
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Bảo hiểm thông minh
              <br />
              <span className="bg-gradient-to-r from-momo-300 to-pink-300 bg-clip-text text-transparent">
                trên MoMo
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
              So sánh giá từ nhiều nhà bảo hiểm uy tín. Mua online trong 3 phút.
              Bồi thường nhanh 24h qua MoMo.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/bao-hiem-o-to"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-3.5 rounded-2xl hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                <Car className="w-5 h-5" />
                Bảo hiểm Ô tô
              </Link>
              <Link
                href="/bao-hiem-xe-may"
                className="inline-flex items-center gap-2 bg-momo-500 text-white font-bold px-8 py-3.5 rounded-2xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/20 transition-all"
              >
                <Bike className="w-5 h-5" />
                Bảo hiểm Xe máy
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-momo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-momo-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </section>

      {/* ─── 2. Trust Stats ─── */}
      <section className="py-0 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {TRUST_STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-momo-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Product Grid ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Sản phẩm <span className="text-momo-500">Bảo hiểm</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Đa dạng sản phẩm bảo hiểm phù hợp mọi nhu cầu, từ xe cộ đến sức khỏe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {INSURANCE_PRODUCTS.map((product) => {
              const IconComp = product.icon;
              const content = (
                <Card
                  className={`h-full border-none shadow-sm rounded-2xl overflow-hidden transition-all duration-500 ${product.active
                      ? "hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                      : "opacity-70"
                    }`}
                >
                  <CardContent className="p-0">
                    {/* Color bar */}
                    <div
                      className={`h-1.5 bg-gradient-to-r ${product.color}`}
                    />

                    <div className="p-7">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${product.bgLight} flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComp className={`w-7 h-7 ${product.textColor}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {product.name}
                          </h3>
                          {/* No badge for active products */}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-5">
                        {product.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      {product.active ? (
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className={`text-sm font-bold ${product.textColor}`}>
                            Khám phá ngay
                          </span>
                          <ArrowRight className={`w-4 h-4 ${product.textColor}`} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center pt-4 border-t border-slate-100">
                          <span className="text-xs text-slate-400">
                            Đang phát triển...
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              return product.active ? (
                <Link key={product.name} href={product.href} className="group">
                  {content}
                </Link>
              ) : (
                <div key={product.name}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. Why MoMo Section ─── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Tại sao chọn mua bảo hiểm trên{" "}
              <span className="text-momo-500">MoMo</span>?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Quy trình đơn giản, minh bạch và nhanh chóng cho mọi người
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8 text-momo-500" />,
                title: "So sánh & mua trong 3 phút",
                desc: "Nhập thông tin → So sánh giá → Thanh toán qua MoMo → Nhận đơn bảo hiểm điện tử ngay lập tức.",
                step: "01",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-momo-500" />,
                title: "Minh bạch, không phí ẩn",
                desc: "Giá niêm yết công khai từ nhà bảo hiểm. Không phát sinh thêm bất kỳ chi phí nào khi mua qua MoMo.",
                step: "02",
              },
              {
                icon: <Headset className="w-8 h-8 text-momo-500" />,
                title: "Bồi thường nhanh qua app",
                desc: "Khi cần bồi thường, chụp ảnh → gửi qua MoMo → nhà bảo hiểm xử lý → nhận tiền trực tiếp qua MoMo.",
                step: "03",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 group-hover:text-pink-100 transition-colors">
                  {item.step}
                </div>
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Partners Section ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Đối tác <span className="text-momo-500">bảo hiểm uy tín</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Hợp tác với các nhà bảo hiểm hàng đầu Việt Nam và quốc tế
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {["Bảo Việt", "PVI", "PTI", "MIC", "BIC", "BSH", "Liberty", "Generali", "MSIG", "VBI", "PJICO"].map(
              (name) => (
                <div
                  key={name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-pink-50 transition-colors group"
                >
                  <span className="text-sm md:text-base font-bold text-slate-400 group-hover:text-momo-500 transition-colors">
                    {name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── 6. CTA Section ─── */}
      <section className="py-20 bg-gradient-to-br from-momo-500 to-momo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Bắt đầu bảo vệ tài sản của bạn ngay hôm nay
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Chỉ mất 3 phút để so sánh và chọn gói bảo hiểm phù hợp nhất
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/bao-hiem-o-to"
                className="inline-flex items-center gap-2 bg-white text-momo-600 font-bold px-8 py-4 rounded-2xl hover:-translate-y-0.5 hover:shadow-xl transition-all text-base"
              >
                <Car className="w-5 h-5" />
                BH Ô tô
              </Link>
              <Link
                href="/bao-hiem-xe-may"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:-translate-y-0.5 hover:bg-white/25 transition-all text-base"
              >
                <Bike className="w-5 h-5" />
                BH Xe máy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
