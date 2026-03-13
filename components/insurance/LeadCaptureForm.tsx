"use client";

import React, { useState } from "react";

interface LeadCaptureFormProps {
  productSlug: string;
  typeSlug: string;
}

export default function LeadCaptureForm({
  productSlug,
  typeSlug,
}: LeadCaptureFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Vui lòng nhập họ tên");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Vui lòng nhập số điện thoại hợp lệ (10+ số)");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          productSlug,
          typeSlug,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi gửi thông tin");
      }

      setSuccess(true);
      // Scroll to providers
      if (typeof window !== "undefined") {
        const el = document.getElementById("provider-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          ✅
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">Cảm ơn bạn!</h3>
        <p className="text-sm text-slate-500">
          Chúng tôi sẽ liên hệ tư vấn mua bảo hiểm trong 5 phút qua {phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50">
      <h3 className="text-xl font-bold mb-3 text-slate-800">
        Tư vấn mua bảo hiểm
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Điền thông tin để nhận báo giá chi tiết từ các nhà bảo hiểm.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">
            Họ tên *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">
            Số điện thoại *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0901234567"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-1 focus:ring-momo-500"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-momo-500 text-white font-bold rounded-xl hover:bg-momo-600 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi thông tin - Nhận báo giá"}
      </button>
    </form>
  );
}
