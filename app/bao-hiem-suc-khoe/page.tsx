import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake, 
  CheckCircle2, 
  ShieldPlus, 
  Headset, 
  Zap,
  ShieldCheck
} from "lucide-react";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { HealthInsuranceSearchForm } from "@/components/insurance/HealthInsuranceSearchForm";
import { HealthInsuranceSteps } from "@/components/insurance/HealthInsuranceSteps";
import { HealthInsuranceTestimonials } from "@/components/insurance/HealthInsuranceTestimonials";

export const metadata: Metadata = {
  title: "Mua Bảo Hiểm Sức Khỏe+ trên MoMo: An Toàn, Tiện Lợi",
  description: "Chỉ với vài thao tác đơn giản, bạn có thể mua MoMoCare | Bảo hiểm Sức khỏe+ ngay trên MoMo, không cần đến bệnh viện hay làm thủ tục phức tạp. Bảo vệ sức khỏe bạn trở nên dễ dàng hơn bao giờ hết.",
  keywords: "Bảo Hiểm Sức Khỏe +",
  openGraph: {
    title: "Mua Bảo Hiểm Sức Khỏe+ trên MoMo: An Toàn, Tiện Lợi",
    description: "Chỉ với vài thao tác đơn giản, bạn có thể mua MoMoCare | Bảo hiểm Sức khỏe+ ngay trên MoMo, không cần đến bệnh viện hay làm thủ tục phức tạp. Bảo vệ sức khỏe bạn trở nên dễ dàng hơn bao giờ hết.",
    images: ["https://homepage.momocdn.net/img/momo-amazone-s3-api-250724092618-638889459781143449.jpg"],
    url: "https://momo.vn/bao-hiem-suc-khoe"
  }
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Bảo hiểm", href: "/bao-hiem" },
  { label: "Bảo hiểm Sức khỏe+", href: "/bao-hiem-suc-khoe" },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "MoMoCare | Bảo hiểm Sức khỏe+",
    "description": "Bảo hiểm bệnh hiểm nghèo chi trả lên đến 5 tỷ/năm cho 37 bệnh phổ biến tại Việt Nam",
    "image": "https://homepage.momocdn.net/img/momo-amazone-s3-api-250724092618-638889459781143449.jpg",
    "brand": { "@type": "Brand", "name": "Chubb Life Việt Nam" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "VND",
      "price": "Từ 200.000đ/tháng",
      "availability": "https://schema.org/InStock"
    }
  }
];

export default function HealthPlusPage() {
  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={schema} />

      {/* 1. Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      {/* 2. Hero Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content */}
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                🛡️ Bảo hiểm bệnh hiểm nghèo Chubb Life
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
                <span className="text-emerald-600">MoMoCare</span> <br />
                Bảo hiểm <span className="text-emerald-600">Sức khỏe+</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Bảo vệ tài chính lên đến <strong>5 TỶ/năm</strong> cho <strong>37 bệnh hiểm nghèo</strong> phổ biến. 
                Không khám sức khỏe, chỉ 2 câu hỏi, mua ngay trên MoMo.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="#form"
                className="group w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-12 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShieldPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Mua ngay (3 phút)
              </Link>
              <Link
                href="#why"
                className="group w-full sm:w-auto bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-600 font-bold px-12 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. USP Grid */}
      <section id="why" className="py-16 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "37 Bệnh hiểm nghèo",
                desc: "Ung thư, đột quỵ, tim mạch, suy thận... Chi trả thực tế lên 5 tỷ/năm"
              },
              {
                icon: ShieldPlus,
                title: "Không khám sức khỏe",
                desc: "Chỉ 2 câu hỏi đơn giản. Duyệt ngay trong 3 phút"
              },
              {
                icon: Zap,
                title: "Phí linh hoạt",
                desc: "Trả góp tháng hoặc tiết kiệm 20% khi đóng năm"
              },
              {
                icon: Headset,
                title: "Hỗ trợ 24/7",
                desc: "Chubb Life + MoMo - Bồi thường nhanh qua app"
              }
            ].map((usp, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <usp.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{usp.title}</h4>
                <p className="text-slate-600 leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quick Form */}
      <section id="form" className="py-20 bg-emerald-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Bắt đầu bảo vệ ngay hôm nay
            </h2>
            <p className="text-xl text-slate-600">
              Nhập thông tin để xem báo giá & mua trong 3 phút
            </p>
          </div>
          <HealthInsuranceSearchForm />
        </div>
      </section>

      {/* 5. Steps */}
      <HealthInsuranceSteps />

      {/* 6. Testimonials */}
      <HealthInsuranceTestimonials />

      {/* 7. FAQ - Highlight 37 Diseases */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              37 <span className="text-emerald-600">Bệnh hiểm nghèo</span> được bảo vệ
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Từ ung thư, tim mạch đến suy thận giai đoạn cuối...
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "Ung thư bất kỳ giai đoạn nào?", a: "✅ Chi trả đầy đủ viện phí, thuốc men thực tế" },
              { q: "Nhồi máu cơ tim?", a: "✅ Phẫu thuật tim, ICU, phục hồi chức năng" },
              { q: "Suy thận mạn giai đoạn cuối?", a: "✅ Lọc máu, chạy thận nhân tạo vô thời hạn" },
              { q: "Đột quỵ liệt nửa người?", a: "✅ Phục hồi chức năng suốt đời" },
              { q: "Thời gian chờ?", a: "⏰ Chỉ 90 ngày (ngoại trừ tai nạn)" },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-2xl font-black text-emerald-500">{i+1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-8">
              <Link href="#form" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all">
                Xem đầy đủ 37 bệnh
                <ShieldCheck className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <InsuranceCTA
        ctaText="Bảo vệ sức khỏe ngay hôm nay"
        ctaHref="#form"
      />
    </div>
  );
}

