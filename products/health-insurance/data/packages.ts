import type { HealthPackage } from "../types";

export const healthPackages: HealthPackage[] = [
  {
    id: "basic",
    name: "Gói Cơ bản",
    limit: 1000000000, // 1 tỷ
    priceMonthly: 200000,
    priceYearly: 2200000, // 20% discount
    coverage: ["37 bệnh hiểm nghèo", "Viện phí thực tế"]
  },
  {
    id: "standard",
    name: "Gói Tiêu chuẩn",
    limit: 3000000000, // 3 tỷ
    priceMonthly: 450000,
    priceYearly: 4950000,
    coverage: ["37 bệnh hiểm nghèo", "Viện phí + ICU"]
  },
  {
    id: "premium",
    name: "Gói Cao cấp (5 tỷ)",
    limit: 5000000000, // 5 tỷ
    priceMonthly: 750000,
    priceYearly: 8250000,
    coverage: ["37 bệnh hiểm nghèo", "Toàn diện + Phục hồi"]
  }
];

