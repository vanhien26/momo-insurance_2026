"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ShieldCheck, CreditCard, Loader2 } from "lucide-react";

interface HICDurationFormProps {
    duration: number; // 3, 6, 12
}

export function HealthInsuranceDurationForm({ duration }: HICDurationFormProps) {
    const [formData, setFormData] = useState({
        insuranceId: "",
        fullName: "",
        phoneNumber: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [price, setPrice] = useState(0);

    // Giả lập tính giá dựa trên thời hạn
    // Giá tham khảo: 3 tháng ~ 250k, 6 tháng ~ 480k, 12 tháng ~ 900k
    useEffect(() => {
        const basePrice = 80000; // Giá mỗi tháng ước tính
        let calculatedPrice = basePrice * duration;

        // Giảm giá cho các gói dài hạn
        if (duration === 6) calculatedPrice *= 0.95;
        if (duration === 12) calculatedPrice *= 0.9;

        setPrice(Math.round(calculatedPrice / 1000) * 1000);
    }, [duration]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Header Form */}
            <div className="bg-momo-500 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Đăng ký gia hạn {duration} tháng</h3>
                <p className="opacity-90 text-sm">Cung cấp thông tin để hoàn tất thủ tục gia hạn BHYT</p>

                <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-black">{price.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm opacity-80">/ {duration} tháng</span>
                </div>
            </div>

            <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Họ tên */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-bold text-slate-700">
                                Họ và tên
                            </label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Nguyễn Văn A"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="h-12 rounded-xl border-slate-200 focus:border-momo-500 focus:ring-momo-500"
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className="space-y-2">
                            <label htmlFor="phoneNumber" className="text-sm font-bold text-slate-700">
                                Số điện thoại
                            </label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="0901234xxx"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="h-12 rounded-xl border-slate-200 focus:border-momo-500 focus:ring-momo-500"
                            />
                        </div>
                    </div>

                    {/* Mã số BHXH/BHYT */}
                    <div className="space-y-2">
                        <label htmlFor="insuranceId" className="text-sm font-bold text-slate-700">
                            Mã số BHXH / Thẻ BHYT
                        </label>
                        <Input
                            id="insuranceId"
                            name="insuranceId"
                            placeholder="VD: 0123456789"
                            value={formData.insuranceId}
                            onChange={handleChange}
                            required
                            className="h-12 rounded-xl border-slate-200 focus:border-momo-500 focus:ring-momo-500"
                        />
                        <p className="text-[11px] text-slate-500 italic">
                            * Mã số BHXH gồm 10 ký tự số in trên thẻ BHYT
                        </p>
                    </div>

                    {/* User Terms */}
                    <div className="p-4 bg-slate-50 rounded-xl flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Bằng việc nhấn &quot;Thanh toán&quot;, bạn đồng ý với <span className="text-momo-500 cursor-pointer hover:underline">Điều khoản & Điều kiện</span> của MoMo và cam kết thông tin cung cấp là chính xác.
                        </p>
                    </div>

                    {/* Submit Button */}
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-4 text-green-600 animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-16 h-16 mb-2" />
                            <p className="font-bold text-lg">Đăng ký thành công!</p>
                            <p className="text-sm text-slate-500">Chúng tôi sẽ xử lý yêu cầu của bạn trong giây lát.</p>
                        </div>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-momo-500 hover:bg-momo-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    ĐANG XỬ LÝ...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-6 h-6" />
                                    THANH TOÁN NGAY
                                </>
                            )}
                        </Button>
                    )}
                </form>

                {/* Security badges */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-6 opacity-40 grayscale">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">PCI DSS</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Secure SSL</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">MoMo Trust</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
