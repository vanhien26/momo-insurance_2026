import { registry } from "@/lib/registry";
import { motoInsuranceProduct } from "./config";

// Self-register when imported
registry.register(motoInsuranceProduct);

export { motoInsuranceProduct };
export type {
    MotoVehicleInfo,
    MotoCoverageSelection,
    MotoOwnerInfo,
    MotoInsuranceFormData,
} from "./types";
