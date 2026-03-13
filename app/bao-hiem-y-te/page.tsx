import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, CheckCircle2, ShieldPlus, Headset, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { HealthInsuranceSearchForm } from "@/components/insurance/HealthInsuranceSearchForm";
import { HealthInsuranceSteps } from "@/components/insurance/HealthInsuranceSteps";
import { HealthInsuranceTestimonials } from "@/components/insurance/HealthInsuranceTestimonials";

export const metadata: Metadata = {
  title: "Bảo Hiểm Y Tế Online - Tra cứu & Gia hạn nhanh nhất | MoMo",
  description:
    "Tra cứu và gia hạn bảo hiểm y tế (BHYT) chỉ trong 3 phút. So sánh gói bảo vệ toàn diện. Thanh toán qua MoMo, nhận thẻ kỹ thuật số ngay.",
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Bảo hiểm", href: "/bao-hiem" },
  { label: "Bảo hiểm Y tế", href: "/bao-hiem-y-te" },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MoMo Bảo hiểm Y tế",
    "image": "https://momo.vn/images/momo-logo.webp",
    "description": "Platform tra cứu và gia hạn bảo hiểm y tế hàng đầu Việt Nam",
    "url": "https://momo.vn/bao-hiem-y-te",
    "telephone": "1900 1900",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "VN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "10000"
    }
  }
];

export default function HealthInsurancePage() {
  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={schema} />

      {/* 1. Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      {/* 2. Hero Banner with Search Form */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white via-pink-50/30 to-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content */}
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-momo-500 text-sm font-bold border border-pink-100">
                💚 Bảo vệ sức khỏe toàn gia đình
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
                Tra cứu & Gia hạn <span className="text-momo-500">BHYT</span> chỉ trong 3 phút
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Không gặp mặt, không phải chạy cơ quan. Tra cứu trực tuyến, gia hạn ngay trên MoMo.
              </p>
            </div>

            {/* Search Form */}
            <div className="flex justify-center" id="search-form">
              <HealthInsuranceSearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Duration Selection */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Chọn thời hạn <span className="text-momo-500">gia hạn</span>
            </h2>
            <p className="text-slate-600">Linh hoạt lựa chọn gói bảo vệ phù hợp với nhu cầu của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                duration: "3 tháng",
                slug: "3-thang",
                price: "240.000đ",
                desc: "Phù hợp trải nghiệm dịch vụ",
                icon: <Clock className="w-8 h-8 text-blue-500" />
              },
              {
                duration: "6 tháng",
                slug: "6-thang",
                price: "456.000đ",
                desc: "Tiết kiệm 5% so với thuê lẻ",
                icon: <CalendarCheck className="w-8 h-8 text-momo-500" />,
                popular: true
              },
              {
                duration: "12 tháng",
                slug: "12-thang",
                price: "864.000đ",
                desc: "Tối ưu chi phí, bớt lo toan",
                icon: <ShieldPlus className="w-8 h-8 text-green-500" />
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={`/bao-hiem-y-te/${item.slug}`}
                className={`group relative p-8 rounded-3xl bg-white border-2 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center ${item.popular ? 'border-momo-500 shadow-xl shadow-pink-100' : 'border-slate-100'}`}
              >
                {item.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-momo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ring-4 ring-white shadow-lg">
                    Phổ biến nhất
                  </div>
                )}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 group-hover:bg-pink-50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.duration}</h3>
                <p className="text-2xl font-black text-momo-500 mb-4">{item.price}</p>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[32px]">{item.desc}</p>

                <div className="mt-8 w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold group-hover:bg-momo-500 transition-colors">
                  Chọn ngay
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. USP Section */}
      <section className="py-16 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldPlus className="w-8 h-8 text-momo-500" />,
                title: "Tra cứu 30 giây",
                desc: "Kiểm tra tình trạng BHYT ngay lập tức"
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-momo-500" />,
                title: "Gia hạn không rộn",
                desc: "Quy trình đơn giản, dễ hiểu, tiết kiệm thời gian"
              },
              {
                icon: <Headset className="w-8 h-8 text-momo-500" />,
                title: "Hỗ trợ 24/7",
                desc: "Chuyên gia luôn sẵn sàng giúp bạn"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-momo-500" />,
                title: "An toàn & Bảo mật",
                desc: "Dữ liệu được mã hóa theo tiêu chuẩn quốc tế"
              },
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

      {/* 4. Steps Section */}
      <HealthInsuranceSteps />

      {/* 5. Testimonials */}
      <HealthInsuranceTestimonials />

      {/* 6. FAQ Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Câu hỏi <span className="text-momo-500">thường gặp</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tìm câu trả lời cho các câu hỏi phổ biến về bảo hiểm y tế
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: "Mã số BHYT ở đâu?",
                a: "Mã số BHYT được in trên mặt trước của thẻ bảo hiểm y tế của bạn. Nó gồm các chữ cái và số, thường bắt đầu bằng hai chữ cái đại diện cho tỉnh/thành phố."
              },
              {
                q: "Tôi có thể gia hạn BHYT qua MoMo không?",
                a: "Có! Sau khi tra cứu và xác nhận thông tin, bạn có thể gia hạn BHYT trực tiếp qua MoMo. Toàn bộ quy trình chỉ mất vài phút."
              },
              {
                q: "Chi phí gia hạn bao nhiêu?",
                a: "Chi phí gia hạn BHYT phụ thuộc vào gói bảo vệ bạn chọn. Chúng tôi sẽ hiển thị chi tiết giá sau khi bạn tra cứu thông tin."
              },
              {
                q: "Khi nào tôi nhận được thẻ BHYT sau gia hạn?",
                a: "Sau khi gia hạn thành công, bạn sẽ nhận được thẻ kỹ thuật số ngay lập tức trên MoMo. Thẻ vật lý sẽ được gửi trong vòng 7-10 ngày."
              },
              {
                q: "Thông tin của tôi có an toàn không?",
                a: "Tất cả thông tin của bạn được mã hóa và bảo vệ theo tiêu chuẩn an toàn quốc tế. Chúng tôi không chia sẻ dữ liệu với bên thứ ba."
              },
              {
                q: "Tôi cần giúp đỡ thì làm sao?",
                a: "Bạn có thể liên hệ với đội hỗ trợ khách hàng của chúng tôi 24/7 qua chat, email, hoặc hotline. Chúng tôi sẽ giải quyết mọi thắc mắc của bạn."
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                <details className="group cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 font-semibold text-slate-900 group-open:bg-pink-50">
                    <span>{faq.q}</span>
                    <span className="flex-shrink-0 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    <p>{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <InsuranceCTA
        ctaText="Tra cứu BHYT của bạn ngay"
        ctaHref="#search-form"
      />
    </div>
  );
}
