"use client";

import React, { useState } from "react";

interface ClientVehicleInfoFormProps {
  productSlug: string;
  typeSlug: string;
}

function normalisePlate(value: string) {
  return value.toUpperCase().replace(/\s+/g, "");
}

export default function ClientVehicleInfoForm({
  productSlug,
  typeSlug,
}: ClientVehicleInfoFormProps) {
  const [licensePlate, setLicensePlate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = normalisePlate(licensePlate);

    if (!value) {
      setError("Vui lòng nhập biển số xe");
      return;
    }

    // Đơn giản: chỉ kiểm tra tối thiểu 5 ký tự, không quá chặt regex
    if (value.length < 5) {
      setError("Biển số xe không hợp lệ, vui lòng kiểm tra lại");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licensePlate: value,
          productSlug,
          typeSlug,
        }),
      });
    } catch {
      // Không chặn flow xem báo giá, chỉ đơn giản bỏ qua lỗi mạng/backend
    } finally {
      setIsSubmitting(false);
    }

    if (typeof window !== "undefined") {
      const el = document.getElementById("provider-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50"
    >
      <h3 className="text-xl font-bold mb-3 text-slate-800">
        Thông tin xe của bạn
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Nhập biển số xe để xem báo giá chi tiết từ các nhà bảo hiểm.
      </p>

      <div className="mb-4">
        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">
          Biển số xe *
        </label>
        <input
          type="text"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="VD: 30G-123.45"
          className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-[#D82D8B] focus:ring-1 focus:ring-[#D82D8B]"
        />
        {error && (
          <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-[#D82D8B] text-white font-bold rounded-xl hover:bg-[#b02471] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? "Đang lấy báo giá..."
          : "Xem báo giá các nhà bảo hiểm"}
      </button>
    </form>
  );
}