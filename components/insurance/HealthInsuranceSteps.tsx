import { CheckCircle2, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: 1,
    title: "Chuẩn bị thông tin",
    description: "Chuẩn bị mã số BHYT, họ tên và ngày sinh",
    icon: "📋",
    details: [
      "Mã số trên thẻ BHYT",
      "Họ và tên đầy đủ",
      "Ngày tháng năm sinh"
    ]
  },
  {
    step: 2,
    title: "Tra cứu & Kiểm tra",
    description: "Nhập thông tin vào hệ thống để kiểm tra tình trạng",
    icon: "🔍",
    details: [
      "Xác nhận tình trạng BHYT",
      "Kiểm tra quyền lợi",
      "Xem thông tin chi tiết"
    ]
  },
  {
    step: 3,
    title: "Gia hạn hoặc đăng ký",
    description: "Thực hiện gia hạn hoặc đăng ký BHYT mới qua MoMo",
    icon: "✅",
    details: [
      "Gia hạn BHYT hiện tại",
      "Thanh toán nhanh qua MoMo",
      "Nhận thẻ kỹ thuật số ngay"
    ]
  }
];

export function HealthInsuranceSteps() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-momo-500 text-sm font-bold border border-pink-100 mb-4">
            ⚡ Quy trình đơn giản
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            3 bước <span className="text-momo-500">tra cứu & gia hạn</span> BHYT
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Chỉ cần vài phút, bạn có thể tra cứu và gia hạn BHYT mà không cần rời khỏi nhà
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STEPS.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-4 w-8 h-[2px] bg-gradient-to-r from-momo-500 to-momo-300" />
              )}

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                {/* Step number circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-momo-500 to-momo-600 flex items-center justify-center text-white font-black text-2xl mb-6">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{item.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Details */}
                <div className="space-y-3 bg-slate-50 rounded-xl p-4">
                  {item.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-momo-50 to-pink-50 p-8 border border-pink-100 max-w-2xl">
            <p className="text-slate-700 mb-4">
              ✨ Bắt đầu tra cứu BHYT của bạn ngay hôm nay
            </p>
            <a href="#search-form">
              <button className="bg-momo-500 hover:bg-momo-600 text-white font-bold py-3 px-8 rounded-xl transition-all inline-flex items-center gap-2">
                Tra cứu ngay
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
