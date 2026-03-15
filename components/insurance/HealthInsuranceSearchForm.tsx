"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2 } from "lucide-react";

interface HICSearchFormProps {
  onSubmit?: (data: {
    insuranceId: string;
    fullName: string;
    dateOfBirth: string;
  }) => void;
}

export function HealthInsuranceSearchForm({ onSubmit }: HICSearchFormProps) {
  const [formData, setFormData] = useState({
    insuranceId: "",
    fullName: "",
    dateOfBirth: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ insuranceId: "", fullName: "", dateOfBirth: "" });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Tra cứu BHYT
        </h3>
        <p className="text-slate-600">
          Nhập thông tin để kiểm tra tình trạng bảo hiểm y tế của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mã số bảo hiểm */}
        <div>
          <label htmlFor="insuranceId" className="block text-sm font-semibold text-slate-700 mb-2">
            Mã số bảo hiểm
          </label>
          <Input
            id="insuranceId"
            name="insuranceId"
            type="text"
            placeholder="VD: 123456789AB"
            value={formData.insuranceId}
            onChange={handleChange}
            required
            className="h-12 border-slate-200 focus:border-momo-500 focus:ring-momo-500"
          />
        </div>

        {/* Họ tên */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
            Họ và tên
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="VD: Nguyễn Văn A"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="h-12 border-slate-200 focus:border-momo-500 focus:ring-momo-500"
          />
        </div>

        {/* Ngày tháng năm sinh */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-slate-700 mb-2">
            Ngày tháng năm sinh
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="h-12 border-slate-200 focus:border-momo-500 focus:ring-momo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {isSuccess ? (
            <div className="flex items-center justify-center gap-2 h-12 bg-green-50 text-green-700 rounded-xl font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Tra cứu thành công!
            </div>
          ) : (
            <Button
              type="submit"
              disabled={isLoading || !formData.insuranceId || !formData.fullName || !formData.dateOfBirth}
              className="w-full h-12 bg-momo-500 hover:bg-momo-600 text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Đang tra cứu...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Tra cứu
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Mẹo:</span> Mã số bảo hiểm thường nằm ở mặt trước thẻ BHYT của bạn
        </p>
      </div>
    </div>
  );
}
