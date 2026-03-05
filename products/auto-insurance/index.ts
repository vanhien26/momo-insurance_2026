import { registry } from "@/lib/registry";
import { autoInsuranceProduct } from "./config";

// Self-register when imported
registry.register(autoInsuranceProduct);

export { autoInsuranceProduct };
export type { VehicleInfo, CoverageSelection, OwnerInfo, AutoInsuranceFormData } from "./types";
