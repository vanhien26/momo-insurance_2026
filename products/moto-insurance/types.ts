export type MotoVehicleType = "xe-so" | "tay-ga" | "con-tay" | "xe-dien";

export interface MotoVehicleInfo {
    plateNumber: string;
    vehicleType: MotoVehicleType;
    brand: string;
    year: number;
    engineCC: number;
    estimatedValue: number;
}

export interface MotoCoverageSelection {
    packageId: string;
    addons: string[];
}

export interface MotoOwnerInfo {
    fullName: string;
    idNumber: string;
    phone: string;
    email: string;
    address: string;
    province: string;
}

export interface MotoInsuranceFormData {
    vehicle: MotoVehicleInfo;
    coverage: MotoCoverageSelection;
    selectedProviderId: string;
    selectedTierId: string;
    owner: MotoOwnerInfo;
}
