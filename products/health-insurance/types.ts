import type { InsuranceProduct } from "@/types/insurance";

export interface HealthPackage {
  id: string;
  name: string;
  limit: number; // VND
  priceMonthly: number;
  priceYearly: number;
  coverage: string[];
}

export type HealthInsuranceProduct = InsuranceProduct & {
  packages: HealthPackage[];
};

