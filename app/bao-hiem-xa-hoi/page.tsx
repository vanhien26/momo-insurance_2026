import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Headset,
  Users,
  Clock,
  Banknote,
  Heart,
  Baby,
  ArrowRight,
  Star,
  Smartphone,
} from "lucide-react";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Bảo Hiểm Xã Hội Tự Nguyện - Đóng BHXH Online qua MoMo",
  description:
    "Đóng bảo hiểm xã hội tự nguyện online qua MoMo. Bảo vệ quyền lợi hưu trí, thai sản, ốm đau. Thủ tục đơn giản, không cần đến cơ quan BHXH.",
  keywords: "bảo hiểm xã hội, BHXH tự nguyện, đóng BHXH online, MoMo BHXH, hưu trí",
  openGraph: {
    title: "Bảo Hiểm Xã Hội Tự Nguyện - Đóng BHXH Online qua MoMo",
    description:
      "Đóng bảo hiểm xã hội tự nguyện online qua MoMo. Bảo vệ quyền lợi hưu trí, thai sản, ốm đau.",
    url: "https://momo.vn/bao-hiem-xa-hoi",
  },
};

const breadcrumbs = [
  { label: "Trang chủ", href: "/" },
  { label: "Bảo hiểm", href: "/bao-hiem" },
  { label: "Bảo hiểm Xã hội", href: "/bao-hiem-xa-hoi" },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bảo Hiểm Xã Hội Tự Nguyện trên MoMo",
    description:
      "Đóng BHXH tự nguyện, tra cứu quyền lợi hưu trí và thai sản dễ dàng qua ứng dụng MoMo.",
    url: "https://momo.vn/bao-hiem-xa-hoi",
  },
];

// Các chế độ quyền lợi BHXH
const BHXH_BENEFITS = [
  {
    icon: Banknote,
    title: "Hưu trí",
    desc: "Nhận lương hưu hàng tháng khi đủ tuổi nghỉ hưu (nam 62, nữ 60). Mức hưởng tối đa 75% mức bình quân tiền lương.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    tag: "Quyền lợi dài hạn",
  },
  {
    icon: Heart,
    title: "Ốm đau",
    desc: "Trợ cấp tiền khi nghỉ ốm có xác nhận của cơ sở y tế. Mức hưởng 75% tiền lương đóng BHXH.",
    color: "text-red-600",
    bg: "bg-red-50",
    tag: "Hỗ trợ ngắn hạn",
  },
  {
    icon: Baby,
    title: "Thai sản",
    desc: "Hỗ trợ 2 triệu đồng/thai kỳ khi sinh con. Điều kiện: đóng BHXH đủ 6 tháng trong 12 tháng trước sinh.",
    color: "text-pink-600",
    bg: "bg-pink-50",
    tag: "Hỗ trợ sinh sản",
  },
  {
    icon: ShieldCheck,
    title: "Tử tuất",
    desc: "Trợ cấp mai táng và tiền tuất cho thân nhân khi người tham gia qua đời.",
    color: "text-slate-600",
    bg: "bg-slate-50",
    tag: "Bảo vệ gia đình",
  },
];

// Mức đóng BHXH tự nguyện
const CONTRIBUTION_LEVELS = [
  { percent: "22%", base: "1.500.000đ/tháng", monthly: "330.000đ/tháng", note: "Mức thấp nhất" },
  { percent: "22%", base: "3.000.000đ/tháng", monthly: "660.000đ/tháng", note: "Phổ biến nhất", highlight: true },
  { percent: "22%", base: "5.000.000đ/tháng", monthly: "1.100.000đ/tháng", note: "Lương hưu cao" },
  { percent: "22%", base: "8.000.000đ/tháng", monthly: "1.760.000đ/tháng", note: "Tối ưu hưu trí" },
];

// Các bước đóng BHXH qua MoMo
const STEPS = [
  {
    step: "01",
    title: "Mở app MoMo",
    desc: 'Vào mục "Bảo hiểm" → chọn "Bảo hiểm Xã hội"',
    icon: Smartphone,
  },
  {
    step: "02",
    title: "Nhập mã số BHXH",
    desc: "Điền mã số BHXH 10 số của bạn. Hệ thống tự tra cứu thông tin.",
    icon: Building2,
  },
  {
    step: "03",
    title: "Chọn mức đóng",
    desc: "Chọn mức lương cơ sở muốn đóng. Hệ thống tính phí tự động.",
    icon: Banknote,
  },
  {
    step: "04",
    title: "Xác nhận & thanh toán",
    desc: "Thanh toán qua ví MoMo hoặc thẻ ngân hàng. Nhận biên lai ngay.",
    icon: CheckCircle2,
  },
];

// FAQ
const FAQS = [
  {
    q: "Ai được tham gia BHXH tự nguyện?",
    a: "Công dân Việt Nam từ 15 tuổi trở lên, không thuộc diện đóng BHXH bắt buộc. Bao gồm: lao động tự do, nông dân, hộ kinh doanh cá thể, người làm việc ở nước ngoài.",
  },
  {
    q: "Mức đóng BHXH tự nguyện tối thiểu là bao nhiêu?",
    a: "Tối thiểu bằng 22% mức chuẩn hộ nghèo khu vực thành thị. Hiện tại khoảng 330.000đ – 528.000đ/tháng tùy khu vực. Bạn có thể đóng linh hoạt: hàng tháng, hàng quý, 6 tháng hoặc 12 tháng một lần.",
  },
  {
    q: "Đóng bao nhiêu năm thì được hưởng lương hưu?",
    a: "Tối thiểu 20 năm đóng BHXH. Nam đủ 62 tuổi, nữ đủ 60 tuổi (theo lộ trình tăng dần). Nếu chưa đủ 20 năm, có thể đóng một lần hoặc chờ đủ điều kiện.",
  },
  {
    q: "Có được hỗ trợ phí khi đóng BHXH tự nguyện không?",
    a: "Có! Nhà nước hỗ trợ tối thiểu 10% mức đóng hàng tháng theo mức chuẩn hộ nghèo. Hộ nghèo được hỗ trợ 30%, hộ cận nghèo 25%, các đối tượng khác 10%.",
  },
  {
    q: "Đóng qua MoMo có an toàn không?",
    a: "Hoàn toàn an toàn. MoMo là đối tác chính thức của Bảo hiểm Xã hội Việt Nam. Giao dịch được mã hóa, có biên lai điện tử và lịch sử giao dịch đầy đủ.",
  },
];

export default function SocialInsurancePage() {
  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={schema} />

      {/* 1. Breadcrumb */}
      <BreadcrumbNav items={breadcrumbs} />

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 md:py-20 lg:py-28 border-b border-slate-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-bold border border-amber-200">
              🏛️ Bảo hiểm Xã hội Tự nguyện
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Đóng{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                BHXH tự nguyện
              </span>
              <br />
              dễ dàng qua MoMo
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Bảo vệ quyền lợi hưu trí, thai sản, ốm đau cho bản thân và gia đình.
              Đóng trực tuyến, không cần đến cơ quan BHXH.
            </p>

            {/* Trust stats nhỏ */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {[
                { icon: Users, value: "17M+", label: "Người tham gia BHXH tự nguyện" },
                { icon: Clock, value: "5 phút", label: "Thời gian đóng qua MoMo" },
                { icon: Star, value: "10%", label: "Nhà nước hỗ trợ phí đóng" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600">
                  <stat.icon className="w-4 h-4 text-amber-500" />
                  <span className="font-black text-slate-900">{stat.value}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="https://momo.vn"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <Building2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Đóng BHXH ngay trên MoMo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#quyen-loi"
                className="inline-flex items-center justify-center gap-3 bg-white border-2 border-amber-300 text-amber-700 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-amber-50 hover:-translate-y-1 transition-all duration-300"
              >
                Xem quyền lợi
              </Link>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* 3. Quyền lợi BHXH */}
      <section id="quyen-loi" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              4 quyền lợi khi tham gia{" "}
              <span className="text-amber-500">BHXH tự nguyện</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              BHXH tự nguyện bảo vệ bạn trong các tình huống quan trọng nhất của cuộc đời
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {BHXH_BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${benefit.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 mb-3">
                    {benefit.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Mức đóng */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Mức đóng <span className="text-amber-500">BHXH tự nguyện</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Đóng 22% mức thu nhập tự chọn. Mức thu nhập càng cao, lương hưu càng lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
            {CONTRIBUTION_LEVELS.map((level, i) => (
              <Card
                key={i}
                className={`border-none rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  level.highlight
                    ? "ring-2 ring-amber-400 shadow-lg"
                    : "shadow-sm"
                }`}
              >
                {level.highlight && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                    ✨ PHỔ BIẾN NHẤT
                  </div>
                )}
                <CardContent className="p-6">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Mức thu nhập
                  </p>
                  <p className="text-lg font-black text-slate-900 mb-4">
                    {level.base}
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-400 mb-1">Phí đóng hàng tháng</p>
                    <p
                      className={`text-2xl font-black ${
                        level.highlight ? "text-amber-500" : "text-slate-900"
                      }`}
                    >
                      {level.monthly}
                    </p>
                  </div>
                  <span className="inline-block mt-3 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {level.note}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-amber-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">
                  Nhà nước hỗ trợ 10% phí đóng
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Bạn chỉ cần đóng 90% số tiền thực tế. Nhà nước bù 10% còn lại cho người tham gia
                  thông thường; hộ nghèo được hỗ trợ đến 30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Các bước đóng qua MoMo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Chỉ <span className="text-amber-500">4 bước</span> để đóng BHXH qua MoMo
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Nhanh hơn đến cơ quan BHXH. Không xếp hàng, không giấy tờ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Icon className="w-8 h-8 text-amber-600" />
                    </div>
                    <div className="text-4xl font-black text-amber-100 mb-2 -mt-2">
                      {step.step}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="https://momo.vn"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Đóng ngay trên MoMo
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Tại sao chọn MoMo */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Tại sao đóng BHXH qua{" "}
              <span className="text-amber-500">MoMo</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "Nhanh chỉ 5 phút",
                desc: "Đóng online bất kỳ lúc nào, không cần đến cơ quan BHXH, không xếp hàng chờ đợi.",
                step: "01",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
                title: "An toàn & chính thống",
                desc: "MoMo là đối tác chính thức của BHXH Việt Nam. Biên lai điện tử ngay sau khi thanh toán.",
                step: "02",
              },
              {
                icon: <Headset className="w-8 h-8 text-amber-500" />,
                title: "Tra cứu mọi lúc",
                desc: "Xem lịch sử đóng, số tháng tích lũy, mức hưởng dự kiến ngay trên app MoMo.",
                step: "03",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 group-hover:text-amber-100 transition-colors">
                  {item.step}
                </div>
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Câu hỏi <span className="text-amber-500">thường gặp</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-amber-200 hover:bg-amber-50/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="text-sm font-black text-amber-600">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <InsuranceCTA
        ctaText="Đóng BHXH tự nguyện ngay hôm nay"
        ctaHref="https://momo.vn"
      />
    </div>
  );
}
