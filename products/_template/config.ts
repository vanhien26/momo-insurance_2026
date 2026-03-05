// ─── TEMPLATE: Copy this folder to create a new insurance product ───
//
// Steps:
// 1. Copy _template/ to products/[your-product]/
// 2. Edit this config.ts with your product details
// 3. Create data/ folder with providers.json, pricing.json, etc.
// 4. Create product-specific components in components/
// 5. Import and register in index.ts
// 6. Run `npm run build` — all routes auto-generate from registry
//
// That's it. Zero changes needed in app/, components/insurance/, or lib/.

import type { InsuranceProduct } from "@/types/insurance";

export const templateProduct: InsuranceProduct = {
  id: "template",
  slug: "bao-hiem-template",
  name: "Bảo Hiểm Template",
  shortName: "BH Template",
  icon: "Shield",
  description: "Mô tả sản phẩm bảo hiểm...",

  types: [
    {
      slug: "loai-1",
      name: "Loại 1",
      shortDesc: "Mô tả loại 1...",
      icon: "Shield",
      providers: [],
      pricingTiers: [],
    },
  ],

  seoVariables: {
    dimensions: [],
    combinations: [],
  },

  metadata: {
    heroTitle: "Tiêu đề hero",
    heroSubtitle: "Mô tả hero",
    trustStats: [],
    ctaText: "Mua ngay",
    ctaHref: "/bao-hiem-template/loai-1",
  },

  faqs: [],
};
