"use client";

import React, { useState } from "react";

interface MotoInsuranceFormProps {
    productSlug: string;
}

const VEHICLE_TYPES = [
    { value: "tay-ga", label: "Xe tay ga" },
    { value: "xe-so", label: "Xe số" },
    { value: "con-tay", label: "Xe côn tay" },
    { value: "xe-dien", label: "Xe điện" },
];

const BRANDS = [
    { value: "honda", label: "Honda" },
    { value: "yamaha", label: "Yamaha" },
    { value: "suzuki", label: "Suzuki" },
    { value: "sym", label: "SYM" },
    { value: "piaggio", label: "Piaggio (Vespa)" },
    { value: "vinfast", label: "VinFast" },
    { value: "pega", label: "Pega" },
    { value: "khac", label: "Hãng khác" },
];

function normalisePlate(value: string) {
    return value.toUpperCase().replace(/\s+/g, "");
}

export default function MotoInsuranceForm({
    productSlug,
}: MotoInsuranceFormProps) {
    const [licensePlate, setLicensePlate] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const plate = normalisePlate(licensePlate);

        if (!plate) {
            setError("Vui lòng nhập biển số xe");
            return;
        }
        if (plate.length < 5) {
            setError("Biển số xe không hợp lệ, vui lòng kiểm tra lại");
            return;
        }
        if (!vehicleType) {
            setError("Vui lòng chọn loại xe");
            return;
        }
        if (!brand) {
            setError("Vui lòng chọn hãng xe");
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    licensePlate: plate,
                    vehicleType,
                    brand,
                    productSlug,
                    typeSlug: "tu-nguyen",
                }),
            });
        } catch {
            // Không chặn flow, bỏ qua lỗi mạng/backend
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
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-momo-500 to-momo-600 flex items-center justify-center text-white text-xl">
                    🏍️
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                    Báo giá bảo hiểm xe máy
                </h3>
            </div>
            <p className="text-sm text-slate-500 mb-8">
                Nhập thông tin xe để nhận báo giá chi tiết từ các nhà bảo hiểm uy tín.
            </p>

            {/* Biển số xe */}
            <div className="mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Biển số xe <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="VD: 29B1-12345"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-2 focus:ring-momo-100 transition-all"
                />
            </div>

            {/* Loại xe & Hãng xe - 2 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Loại xe <span className="text-red-400">*</span>
                    </label>
                    <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-2 focus:ring-momo-100 transition-all bg-white appearance-none cursor-pointer"
                    >
                        <option value="">Chọn loại xe</option>
                        {VEHICLE_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Hãng xe <span className="text-red-400">*</span>
                    </label>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-momo-500 focus:ring-2 focus:ring-momo-100 transition-all bg-white appearance-none cursor-pointer"
                    >
                        <option value="">Chọn hãng xe</option>
                        {BRANDS.map((b) => (
                            <option key={b.value} value={b.value}>
                                {b.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Gói bảo hiểm - read only note */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-momo-50 rounded-xl border border-pink-100">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-momo-500 text-sm">🛡️</span>
                    <span className="text-sm font-bold text-momo-600">Bảo hiểm tự nguyện</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                    Bảo vệ xe máy khỏi tai nạn, mất cắp, cháy nổ, thiên tai. Xem chi tiết các gói bên dưới sau khi nhập thông tin xe.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-momo-500 to-momo-600 text-white font-bold rounded-xl hover:from-momo-600 hover:to-momo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 active:translate-y-0"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang lấy báo giá...
                    </span>
                ) : (
                    "Xem báo giá từ 6 nhà bảo hiểm →"
                )}
            </button>
        </form>
    );
}
