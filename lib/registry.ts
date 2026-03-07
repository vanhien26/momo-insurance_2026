import type { InsuranceProduct } from "@/types/insurance";
import type { SEOVariable } from "@/types/seo";

interface StaticParam {
  productSlug: string;
  typeSlug?: string;
  seoParam?: string;
}

class ProductRegistry {
  private products: Map<string, InsuranceProduct> = new Map();
  private initialized = false;

  register(product: InsuranceProduct): void {
    if (this.products.has(product.slug)) {
      console.warn(`Product "${product.slug}" already registered, skipping.`);
      return;
    }
    this.products.set(product.slug, product);
  }

  get(slug: string): InsuranceProduct | undefined {
    this.ensureInit();
    return this.products.get(slug);
  }

  getAll(): InsuranceProduct[] {
    this.ensureInit();
    return Array.from(this.products.values());
  }

  getAllSlugs(): string[] {
    this.ensureInit();
    return Array.from(this.products.keys());
  }

  getProductHubParams(): StaticParam[] {
    return this.getAllSlugs().map((slug) => ({ productSlug: slug }));
  }

  getProductTypeParams(): StaticParam[] {
    const params: StaticParam[] = [];
    for (const product of this.getAll()) {
      for (const type of product.types) {
        params.push({
          productSlug: product.slug,
          typeSlug: type.slug,
        });
      }
    }
    return params;
  }

  getSEOParams(): StaticParam[] {
    const params: StaticParam[] = [];
    for (const product of this.getAll()) {
      for (const type of product.types) {
        for (const dim of product.seoVariables.dimensions) {
          for (const item of dim.data) {
            params.push({
              productSlug: product.slug,
              typeSlug: type.slug,
              seoParam: item.slug,
            });
          }
        }
        // Combination pages
        for (const combo of product.seoVariables.combinations) {
          if (combo.dims.length === 2) {
            const [dimA, dimB] = combo.dims;
            const dataA = product.seoVariables.dimensions.find(
              (d: SEOVariable) => d.dimension === dimA
            );
            const dataB = product.seoVariables.dimensions.find(
              (d: SEOVariable) => d.dimension === dimB
            );
            if (dataA && dataB) {
              for (const a of dataA.data) {
                for (const b of dataB.data) {
                  params.push({
                    productSlug: product.slug,
                    typeSlug: type.slug,
                    seoParam: combo.urlPattern
                      .replace(`{${dimA}}`, a.slug)
                      .replace(`{${dimB}}`, b.slug),
                  });
                }
              }
            }
          }
        }
      }
    }
    return params;
  }

  private ensureInit(): void {
    if (!this.initialized) {
      this.initialized = true;
      // Dynamic import of all product modules
      // Products self-register when imported
      try {
        require("@/products/auto-insurance");
      } catch {
        // Products may not be available during build steps
      }
      try {
        require("@/products/moto-insurance");
      } catch {
        // Products may not be available during build steps
      }
    }
  }
}

// Singleton
export const registry = new ProductRegistry();
