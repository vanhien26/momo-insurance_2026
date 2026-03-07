import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { PricingTable } from "@/components/insurance/PricingTable";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import ClientVehicleInfoForm from "@/components/insurance/ClientVehicleInfoForm";
import { buildPageSEO } from "@/lib/seo";

// 1. Định nghĩa Interface cho Params để tránh lỗi 'any'
interface PageProps {
  params: Promise<{ productSlug: string; typeSlug: string }>;
}

export async function generateStaticParams() {
  return registry.getProductTypeParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = registry.get(resolvedParams.productSlug);
  if (!product) return {};
  
  // FIX: Ép kiểu 'as any' để TypeScript không bắt lỗi 'undefined'
  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug) as any;
  if (!type) return {};

  const seo = buildPageSEO({ product, type });
  return { 
    title: seo.title, 
    description: seo.description,
    alternates: { canonical: `https://momo.vn/${resolvedParams.productSlug}/${resolvedParams.typeSlug}` }
  };
}

export default async function ProductTypePage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = registry.get(resolvedParams.productSlug);
  if (!product) notFound();

  // FIX: Ép kiểu 'as any' tại đây để xóa vệt đỏ thứ 2
  const type = product.types.find((t) => t.slug === resolvedParams.typeSlug) as any;
  if (!type) notFound();

  const seo = buildPageSEO({ product, type });

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schemas={seo.schema} />
      <BreadcrumbNav items={seo.breadcrumbs} />

      <section className="relative py-12 lg:py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#D82D8B] text-xs font-black uppercase tracking-widest rounded-full mb-6">
                Bảo vệ toàn diện
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                {type.name} <br /> 
                <span className="text-[#D82D8B]">So sánh báo giá 30s</span>
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl">
                {type.shortDesc} Nhận ngay báo giá từ 11+ nhà bảo hiểm uy tín và quản lý hợp đồng trực tiếp trên siêu ứng dụng MoMo.
              </p>
            </div>

            <div className="w-full lg:w-1/2 max-w-xl mx-auto">
              {/* Đảm bảo import ClientVehicleInfoForm không có dấu ngoặc nhọn {} */}
              <ClientVehicleInfoForm
                productSlug={resolvedParams.productSlug}
                typeSlug={resolvedParams.typeSlug}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-50/50 to-transparent -skew-x-12 translate-x-1/4 z-0" />
      </section>

      <section className="py-20" id="provider-grid">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center lg:text-left">
            {type.providers.length} nhà bảo hiểm uy tín
          </h2>
          <ProviderGrid
            providers={type.providers}
            pricingTiers={type.pricingTiers}
            productSlug={resolvedParams.productSlug}
            typeSlug={type.slug}
          />
        </div>
      </section>

      <FAQAccordion faqs={product.faqs} productName={type.name.toLowerCase()} />

      <InsuranceCTA
        ctaText="Nhận báo giá ngay"
        ctaHref={`/${resolvedParams.productSlug}/${type.slug}`}
        title={`Bảo vệ xe với ${type.name} MoMo`}
      />
    </div>
  );
}