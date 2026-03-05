import type { PageSEO, BreadcrumbItem, MetaTemplate } from "@/types/seo";
import type { InsuranceProduct, InsuranceProductType, InsuranceProvider } from "@/types/insurance";

const SITE_URL = "https://momo.vn";
const SITE_NAME = "MoMo";
const CURRENT_YEAR = new Date().getFullYear();

export function buildPageSEO(params: {
  product: InsuranceProduct;
  type?: InsuranceProductType;
  seoParam?: string;
  provider?: InsuranceProvider;
  customTitle?: string;
  customDescription?: string;
}): PageSEO {
  const { product, type, provider, customTitle, customDescription } = params;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Bảo hiểm", href: "/bao-hiem" },
    { label: product.name, href: `/${product.slug}` },
  ];

  if (type) {
    breadcrumbs.push({
      label: type.name,
      href: `/${product.slug}/${type.slug}`,
    });
  }

  const title =
    customTitle ||
    (type
      ? `${type.name} ${CURRENT_YEAR} - So sánh & Mua online | ${SITE_NAME}`
      : `${product.name} ${CURRENT_YEAR} - So sánh giá & Mua online | ${SITE_NAME}`);

  const description =
    customDescription ||
    (type
      ? `Mua ${type.name.toLowerCase()} online qua MoMo. So sánh ${type.providers.length} nhà bảo hiểm, giá tốt nhất ${CURRENT_YEAR}. Bồi thường nhanh 24h.`
      : product.description);

  const canonical = type
    ? `${SITE_URL}/${product.slug}/${type.slug}`
    : `${SITE_URL}/${product.slug}`;

  const schema = buildSchemaMarkup({ product, type, provider, breadcrumbs });

  return { title, description, canonical, schema, breadcrumbs };
}

function buildSchemaMarkup(params: {
  product: InsuranceProduct;
  type?: InsuranceProductType;
  provider?: InsuranceProvider;
  breadcrumbs: BreadcrumbItem[];
}): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];
  const { product, type, provider, breadcrumbs } = params;

  // BreadcrumbList
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  });

  // FAQPage
  if (product.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // Provider Organization
  if (provider) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: provider.name,
      url: provider.website,
      telephone: provider.hotline,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: provider.rating,
        reviewCount: provider.reviewCount,
        bestRating: 5,
      },
    });
  }

  // Product with AggregateOffer
  if (type && type.pricingTiers.length > 0) {
    const prices = type.pricingTiers.map((t) => t.annualPremium);
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.name} - ${type.name}`,
      description: type.shortDesc,
      brand: { "@type": "Brand", name: "MoMo" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        priceCurrency: "VND",
        offerCount: type.pricingTiers.length,
      },
    });
  }

  return schemas;
}

export function interpolateTemplate(
  template: string,
  vars: Record<string, string | number>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, String(value));
  }
  return result;
}
