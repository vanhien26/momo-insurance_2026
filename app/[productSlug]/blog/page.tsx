import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";

interface PageProps {
  params: { productSlug: string };
}

export async function generateStaticParams() {
  return registry.getProductHubParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = registry.get(params.productSlug);
  if (!product) return {};
  return {
    title: `Blog ${product.name} - Kiến thức & Hướng dẫn`,
    description: `Kiến thức, hướng dẫn và tin tức về ${product.name.toLowerCase()}. Cập nhật mới nhất từ MoMo.`,
  };
}

export default function BlogListingPage({ params }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Bảo hiểm", href: "/bao-hiem" },
    { label: product.name, href: `/${product.slug}` },
    { label: "Blog", href: `/${product.slug}/blog` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <h1 className="text-3xl font-bold text-content mt-4 mb-2">
        Blog {product.name}
      </h1>
      <p className="text-content-secondary mb-10">
        Kiến thức, hướng dẫn và tin tức mới nhất về {product.name.toLowerCase()}.
      </p>

      {/* Placeholder for blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-content-tertiary">
          <p className="text-lg mb-2">📝</p>
          <p>Bài viết sẽ được thêm vào đây.</p>
          <p className="text-sm mt-1">
            Thêm file .mdx vào content/blog/{product.slug}/
          </p>
        </div>
      </div>
    </div>
  );
}
