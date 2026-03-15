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



  const handleSubmit = async (e: React.FormEvent) => {
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
      // TODO: Gọi API mua bảo hiểm với provider/tier, chuyển hướng MoMo thanh toán
      console.log('Purchase lead:', {productSlug, typeSlug, providerSlug, tierId, buyerName, buyerPhone, buyerEmail});
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
              Thông tin liên hệ mua bảo hiểm
            </h1>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Gói đã chọn</p>
            <p className="font-semibold text-slate-900">
              {providerSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} • {tierId.split("-").slice(-1)[0]?.replace(/\b\w/g, (c) => c.toUpperCase()) || tierId}
            </p>
          </div>

<form onSubmit={handleSubmit}>
              <h2 className="font-bold text-slate-900 mb-2">Thông tin liên hệ</h2>
              <p className="text-sm text-slate-500 mb-4">
                Điền thông tin để hoàn tất mua bảo hiểm
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
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-14 bg-momo-500 text-white font-bold rounded-xl hover:bg-momo-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Thanh toán qua MoMo"}
                </button>
              </div>
            </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Bạn sẽ được chuyển đến MoMo để thanh toán an toàn
        </p>
      </div>
    </div>
  );
}
