export type FieldType =
  | "text"
  | "select"
  | "number"
  | "date"
  | "radio"
  | "checkbox"
  | "phone"
  | "plate-number"
  | "currency";

export interface FieldOption {
  value: string;
  label: string;
}

export interface ValidationRule {
  type: "required" | "min" | "max" | "pattern" | "custom";
  value?: string | number;
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  validation?: ValidationRule[];
  dependsOn?: {
    field: string;
    value: string | string[];
  };
  helpText?: string;
  width?: "full" | "half";
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  fields: FormField[];
}

export interface FormSchema<T = Record<string, unknown>> {
  steps: FormStep[];
  defaultValues: Partial<T>;
  submitAction: "web-purchase" | "deeplink-app" | "lead-form";
}
