export interface SEOVariableItem {
  slug: string;
  name: string;
  meta?: Record<string, unknown>;
}

export interface SEOVariable {
  dimension: string;
  slug: string;
  label: string;
  data: SEOVariableItem[];
}

export interface CombinationRule {
  dims: string[];
  urlPattern: string;
  titlePattern: string;
  descPattern: string;
  priority: number;
}

export interface SEOVariableMatrix {
  dimensions: SEOVariable[];
  combinations: CombinationRule[];
}

export interface MetaTemplate {
  title: string;
  description: string;
  canonical?: string;
}

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  schema: Record<string, unknown>[];
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
