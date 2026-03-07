"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { formatCurrency } from "@/lib/utils";
import { Camera, ArrowLeft } from "lucide-react";

export default function MuaBaoHiemPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const productSlug = params.productSlug as string;
  const typeSlug = params.typeSlug as string;
  const providerSlug = searchParams.get("provider") || "";
  const tierId = searchParams.get("tier") || "";

  const [step, setStep] = useState<1 | 2>(1);
  const [licensePlate, setLicensePlate] = useState("");
  const [plateError, setPlateError] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerError, setBuyerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: "Bảo hiểm Ô tô", href: `/${productSlug}` },
    { label: typeSlug === "vat-chat" ? "Vật chất" : "TNDS", href: `/${productSlug}/${typeSlug}` },
    { label: "Mua bảo hiểm", href: "#" },
  ];

  const handleScanPlate = () => {
    // TODO: Mở camera OCR quét biển số xe
    // Hiện tại mô phỏng - có thể tích hợp Web API MediaDevices.getUserMedia
    window.alert("Tính năng quét biển số OCR sẽ được tích hợp. Vui lòng nhập thủ công.");
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const plate = licensePlate.toUpperCase().replace(/\s+/g, "");
    if (!plate || plate.length < 5) {
      setPlateError("Vui lòng nhập biển số xe hợp lệ");
      return;
    }
    setPlateError("");
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      setBuyerError("Vui lòng nhập họ tên");
      return;
    }
    if (!buyerPhone.trim() || buyerPhone.length < 10) {
      setBuyerError("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    setBuyerError("");
    setIsSubmitting(true);

    try {
      // TODO: Gọi API mua bảo hiểm, chuyển hướng MoMo thanh toán
      await new Promise((r) => setTimeout(r, 800));
      router.push(`/${productSlug}/${typeSlug}?purchased=true`);
    } catch {
      setBuyerError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link
          href={`/${productSlug}/${typeSlug}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-momo-500 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại chọn gói
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-8 bg-momo-500 rounded-full" />
            <h1 className="text-xl font-bold text-slate-900">
              Xác thực xe & Thông tin người mua
            </h1>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Gói đã chọn</p>
            <p className="font-semibold text-slate-900">
              {providerSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} • {tierId.split("-").slice(-1)[0]?.replace(/\b\w/g, (c) => c.toUpperCase()) || tierId}
            </p>
          </div>

          <div className="flex gap-2 mb-8">
            <div
              className={`flex-1 h-2 rounded-full ${step >= 1 ? "bg-momo-500" : "bg-slate-200"}`}
            />
            <div
              className={`flex-1 h-2 rounded-full ${step >= 2 ? "bg-momo-500" : "bg-slate-200"}`}
            />
          </div>

          {step === 1 && (
            <form onSubmit={handleStep1Submit}>
              <h2 className="font-bold text-slate-900 mb-2">Bước 1: Thông tin xe</h2>
              <p className="text-sm text-slate-500 mb-4">
                Nhập hoặc quét biển số xe để xác thực
              </p>

              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => {
                      setLicensePlate(e.target.value);
                      setPlateError("");
                    }}
                    placeholder="VD: 30G-123.45"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
                  />
                  {plateError && (
                    <p className="mt-2 text-xs text-red-500">{plateError}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleScanPlate}
                  className="h-12 px-4 rounded-xl border border-slate-200 hover:border-momo-300 hover:bg-momo-50 flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Quét OCR
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-momo-500 text-white font-bold rounded-xl hover:bg-momo-600 transition-all"
              >
                Tiếp tục
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2Submit}>
              <h2 className="font-bold text-slate-900 mb-2">Bước 2: Thông tin người mua</h2>
              <p className="text-sm text-slate-500 mb-4">
                Điền thông tin để nhận hợp đồng bảo hiểm
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="0901234567"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
                  />
                </div>
              </div>

              {buyerError && (
                <p className="text-sm text-red-500 mb-4">{buyerError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 h-14 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-momo-500 text-white font-bold rounded-xl hover:bg-momo-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Thanh toán qua MoMo"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Bạn sẽ được chuyển đến MoMo để thanh toán an toàn
        </p>
      </div>
    </div>
  );
}
