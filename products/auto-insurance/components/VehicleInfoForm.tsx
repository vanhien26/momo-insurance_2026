"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import brandsData from "../data/brands.json";

interface VehicleInfoFormProps {
  onSubmit: (data: VehicleFormData) => void;
}

interface VehicleFormData {
  brand: string;
  model: string;
  year: number;
  seats: number;
  estimatedValue: number;
  usage: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
const seatOptions = [4, 5, 7, 8, 9, 16];

export function VehicleInfoForm({ onSubmit }: VehicleInfoFormProps) {
  const [form, setForm] = useState<Partial<VehicleFormData>>({
    usage: "personal",
    year: currentYear,
    seats: 5,
  });

  const update = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.brand && form.estimatedValue) {
      onSubmit(form as VehicleFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-content">
        Thông tin xe của bạn
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-content">
            Hãng xe *
          </label>
          <select
            value={form.brand || ""}
            onChange={(e) => update("brand", e.target.value)}
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base focus:outline-none focus:ring-2 focus:ring-momo-500"
            required
          >
            <option value="">Chọn hãng xe</option>
            {brandsData.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <Input
          label="Dòng xe"
          placeholder="VD: Camry, CX-5, Accent..."
          value={form.model || ""}
          onChange={(e) => update("model", e.target.value)}
        />

        {/* Year */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-content">
            Năm sản xuất *
          </label>
          <select
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base focus:outline-none focus:ring-2 focus:ring-momo-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Seats */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-content">
            Số chỗ ngồi
          </label>
          <div className="flex gap-2">
            {seatOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update("seats", s)}
                className={`flex-1 h-12 rounded-xl border-2 text-sm font-medium transition-colors ${form.seats === s
                    ? "border-momo-500 bg-momo-50 text-momo-600"
                    : "border-gray-200 text-content-secondary hover:border-gray-300"
                  } active:scale-95`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Value */}
        <Input
          label="Giá trị xe ước tính (VNĐ) *"
          type="number"
          placeholder="VD: 800000000"
          value={form.estimatedValue || ""}
          onChange={(e) => update("estimatedValue", Number(e.target.value))}
          required
        />

        {/* Usage */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-content">
            Mục đích sử dụng
          </label>
          <div className="flex gap-2">
            {[
              { value: "personal", label: "Cá nhân" },
              { value: "business", label: "Kinh doanh" },
              { value: "ride-hailing", label: "Chạy app" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("usage", opt.value)}
                className={`flex-1 min-h-12 px-2 rounded-xl border-2 text-sm font-medium transition-colors ${form.usage === opt.value
                    ? "border-momo-500 bg-momo-50 text-momo-600"
                    : "border-gray-200 text-content-secondary hover:border-gray-300"
                  } active:scale-95 leading-tight`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto">
        Xem báo giá từ 11 nhà bảo hiểm
        <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Button>
    </form>
  );
}
