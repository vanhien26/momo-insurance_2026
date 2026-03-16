import type { InsuranceProduct } from "@/types/insurance";
import type { HealthPackage } from "./types";
import { healthPackages } from "./data/packages";
import chubbProvider from "./data/providers.json" assert { type: "json" };

const config: InsuranceProduct = {
  slug: "bao-hiem-suc-khoe",
  name: "Bảo hiểm Sức khỏe+",
  heroTitle: "MoMoCare | Bảo hiểm Sức khỏe+ - Chubb Life",
  heroSubtitle: "Bảo vệ 37 bệnh hiểm nghèo lên đến 5 tỷ/năm. Mua ngay trên MoMo",
  types: [
    {
      slug: "mua",
      name: "Mua bảo hiểm",
    }
  ],
  providers: [chubbProvider],
  packages: healthPackages,
  seoVariables: {
    dimensions: [],
    combinations: []
  }
};

export default config;

