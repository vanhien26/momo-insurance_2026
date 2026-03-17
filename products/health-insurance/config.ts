import type { InsuranceProduct } from "@/types/insurance";
import { healthPackages } from "./data/packages";
import chubbProvider from "./data/providers.json" assert { type: "json" };

const config: InsuranceProduct = {
  id: "bao-hiem-suc-khoe",
  slug: "bao-hiem-suc-khoe",
  name: "Bảo hiểm Sức khỏe+",
  shortName: "Sức khỏe+",
  icon: "🏥",
  description: "Bảo vệ 37 bệnh hiểm nghèo lên đến 5 tỷ/năm. Mua ngay trên MoMo",
  types: [
    {
      slug: "mua",
      name: "Mua bảo hiểm",
      shortDesc: "Mua bảo hiểm sức khỏe online",
      icon: "🏥",
      providers: [],
      pricingTiers: [],
    }
  ],
  metadata: {
    heroTitle: "MoMoCare | Bảo hiểm Sức khỏe+ - Chubb Life",
    heroSubtitle: "Bảo vệ 37 bệnh hiểm nghèo lên đến 5 tỷ/năm. Mua ngay trên MoMo",
    trustStats: [],
    ctaText: "Mua ngay",
    ctaHref: "/bao-hiem-suc-khoe/mua",
  },
  faqs: [],
  seoVariables: {
    dimensions: [],
    combinations: []
  }
};

export default config;