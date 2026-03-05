// ── Core Insurance Types ──
// Shared across ALL insurance products

import type {
  SEOVariableMatrix,
  SEOVariable,
  SEOVariableItem,
  CombinationRule,
} from "./seo";

export interface InsuranceProvider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviewCount: number;
  hotline: string;
  website: string;
  description: string;
  features: string[];
  yearEstablished?: number;
}

export interface PricingTier {
  id: string;
  providerId: string;
  label: string;
  annualPremium: number;
  coverage: number;
  deductible: number;
  benefits: string[];
  isPopular?: boolean;
}

export interface InsuranceProductType {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
  providers: InsuranceProvider[];
  pricingTiers: PricingTier[];
}

export interface ProductMetadata {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  trustStats: TrustStat[];
  ctaText: string;
  ctaHref: string;
}

export interface TrustStat {
  value: string;
  label: string;
  icon?: string;
}

export interface InsuranceProduct<TFormData = Record<string, unknown>> {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  types: InsuranceProductType[];
  seoVariables: SEOVariableMatrix;
  metadata: ProductMetadata;
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// Re-export SEO types for convenience
export type {
  SEOVariableMatrix,
  SEOVariable,
  SEOVariableItem,
  CombinationRule,
} from "./seo";
