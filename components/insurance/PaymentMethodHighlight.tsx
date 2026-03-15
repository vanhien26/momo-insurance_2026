"use client";

import { CreditCard, Zap, Shield, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PaymentMethodHighlightProps {
  variant?: "banner" | "card" | "inline";
}

export function PaymentMethodHighlight({
  variant = "banner",
}: PaymentMethodHighlightProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
        <CreditCard className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span className="text-xs font-semibold text-amber-900">
          Hỗ trợ thanh toán qua MoMo Ví Trả Sau 0%
        </span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-start justfy-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900">
                  Thanh toán linh hoạt với MoMo Ví Trả Sau
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Mua bảo hiểm ngay, thanh toán sau. Được hỗ trợ 100% từ MoMo với lãi suất 0% khi thanh toán đúng hạn.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700">Ngay lập tức</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700">Lãi suất 0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700">An toàn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Banner variant (default)
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 py-8 px-4 mb-8 rounded-2xl">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">
                Ví Trả Sau MoMo 0% lãi suất
              </h3>
            </div>
            <p className="text-white/90 text-sm md:text-base mb-2">
              Mua bảo hiểm ngay, thanh toán sau với MoMo. Không phí, không lãi suất khi thanh toán đúng hạn.
            </p>
          </div>
          <div className="flex-shrink-0 text-white">
            <div className="text-4xl font-black">0%</div>
            <div className="text-sm font-semibold text-white/90">Lãi suất</div>
          </div>
        </div>
      </div>
    </div>
  );
}
