import { Metadata } from "next";
import { registry } from "./registry";
import { InsuranceProduct, InsuranceProductType } from "@/types/insurance";
import type { SEOVariable } from "@/types/seo";

/**
 * SEO ENGINE - MOMO INSURANCE PLATFORM
 * Chịu trách nhiệm xử lý logic Programmatic SEO:
 * 1. Inject biến số vào template (Spinning Content)
 * 2. Tạo Metadata chuẩn xác cho từng trang pSEO
 * 3. Sinh ra JSON-LD Schema tương ứng
 */

interface SEOParams {
  product: InsuranceProduct;
  type?: InsuranceProductType;
  typeSlug?: string;
  seoParam?: string; // e.g., 'toyota', 'ha-noi'
}

export function buildPageSEO({ product, type, typeSlug, seoParam }: SEOParams): any {
  let title = product.metadata.heroTitle;
  let description = product.description;
  let breadcrumbs: any[] = [{ label: "Bảo hiểm", href: "/bao-hiem" }, { label: product.name, href: `/${product.slug}` }];

  if (type) {
    title = `${type.name} - ${product.name}`;
    description = type.shortDesc || description;
    breadcrumbs.push({ label: type.name, href: `/${product.slug}/${type.slug}`, active: !seoParam });
  }

  // Nếu là trang pSEO (có tham số seoParam)
  if (seoParam && product.seoVariables) {
    // 1. Tìm xem seoParam thuộc Dimension nào (Brand, Province hay Provider)
    let activeDim: SEOVariable | undefined;
    let activeValue: any;

    for (const dim of product.seoVariables.dimensions) {
      const found = dim.data.find((item) => item.slug === seoParam);
      if (found) {
        activeDim = dim;
        activeValue = found;
        break;
      }
    }

    if (activeDim && activeValue) {
      // 2. Tìm combination tương ứng để lấy Template
      const combo = product.seoVariables.combinations.find((c) =>
        c.dims.includes(activeDim!.dimension)
      );

      if (combo) {
        // 3. Thực hiện "Inject" biến số vào Template
        const replaceMap: Record<string, string> = {
          [`{${activeDim.dimension}}`]: activeValue.name,
          "{product}": product.name,
        };

        title = combo.titlePattern;
        description = combo.descPattern;

        Object.entries(replaceMap).forEach(([key, val]) => {
          title = title.replace(new RegExp(key, "g"), val);
          description = description.replace(new RegExp(key, "g"), val);
        });

        breadcrumbs.push({ label: activeValue.name, href: "#", active: true });
      }
    }
  }

  return {
    title: `${title} | MoMo Insurance`,
    description,
    breadcrumbs,
    // Trả về schema mẫu (có thể mở rộng thêm)
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title,
        "description": description,
        "brand": { "@type": "Brand", "name": "MoMo Insurance" }
      }
    ]
  };
}

/**
 * Hàm hỗ trợ lấy nội dung Content Spinning cho trang Landing
 */
export function getSpunContent(template: string, variables: Record<string, string>) {
  let content = template;
  Object.entries(variables).forEach(([key, val]) => {
    content = content.replace(new RegExp(`{${key}}`, "g"), val);
  });
  return content;
}