export interface VehicleInfo {
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  estimatedValue: number;
  usage: "personal" | "business" | "ride-hailing";
}

export interface CoverageSelection {
  type: "vat-chat" | "bat-buoc";
  addons: string[];
}

export interface OwnerInfo {
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  province: string;
}

export interface AutoInsuranceFormData {
  vehicle: VehicleInfo;
  coverage: CoverageSelection;
  selectedProviderId: string;
  selectedTierId: string;
  owner: OwnerInfo;
}
