import billingOptions from "../constants/billingOptions";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SelectedPlan {
  plan: string;
  billingOption: billingOptions.MONTHLY | billingOptions.YEARLY;
  monthlyPrice?: number;
  yearlyPrice?: number;
}

export interface SelectedAddOns {
  title: string;
  price: number;
}

export interface FormData {
  personalInfo: PersonalInfo;
  selectedPlan: SelectedPlan;
  selectedAddOns: SelectedAddOns[];
}

export interface PersonalInfoFormData {
  personalInfo: PersonalInfo;
}

export interface YourInfoProps {
  formData: FormData;
  onUpdate: (data: Partial<PersonalInfo>) => void;
  errors?: Record<string, string>;
}

export interface SelectPlanProps {
  formData: FormData;
  onUpdate: (data: Partial<SelectedPlan>) => void;
  error?: string;
}

export interface AddonsProps {
  formData: FormData;
  onUpdate: (data: SelectedAddOns[]) => void;
}
