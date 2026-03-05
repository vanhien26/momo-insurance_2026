"use client";

import { VehicleInfoForm } from "@/products/auto-insurance/components/VehicleInfoForm";

export function ClientVehicleInfoForm() {
  return <VehicleInfoForm onSubmit={(data) => console.log("Submit:", data)} />;
}
