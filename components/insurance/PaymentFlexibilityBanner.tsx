"use client";

import { CreditCard, Zap, TrendingDown, Shield, CheckCircle2 } from "lucide-react";

interface PaymentFlexibilityBannerProps {
  variant?: "minimal" | "detailed";
}

export function PaymentFlexibilityBanner({
  variant = "detailed",
}: PaymentFlexibilityBannerProps) {
  if (variant === "minimal") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
        <CreditCard className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-semibold text-amber-900">
          Thanh toán qua Ví Trả Sau - 0% lãi suất
        </span>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 rounded-2xl border border-amber-200 overflow-hidden">
      <div className="px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white rounded-lg shadow-sm">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                Thanh toán linh hoạt với Ví Trả Sau
              </h3>
            </div>
            <p className="text-slate-700 text-sm mb-4 leading-relaxed">
              Mua bảo hiểm ngay, thanh toán sau 30-60 ngày. Không phí, không lãi suất khi thanh toán đúng hạn. Đây là cách tối ưu để quản lý dòng tiền của bạn.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, label: "Cấp phê duyệt tức thì" },
                { icon: TrendingDown, label: "0% lãi suất" },
                { icon: Shield, label: "Bảo mật cao" },
                { icon: CheckCircle2, label: "Dễ quản lý" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden sm:flex flex-shrink-0 flex-col items-center gap-2">
            <div className="text-5xl font-black text-amber-600">0%</div>
            <p className="text-sm font-semibold text-slate-600 text-center">
              Lãi suất
            </p>
            <div className="text-xs text-slate-500 text-center max-w-[120px]">
              Thanh toán đúng hạn
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
