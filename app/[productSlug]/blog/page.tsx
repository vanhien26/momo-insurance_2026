import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import Link from "next/link";
import { getAutoInsuranceBlogCategoriesForPosts, getAutoInsuranceBlogPosts } from "@/products/auto-insurance/blog/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

interface PageProps {
  params: { productSlug: string };
  searchParams?: { category?: string };
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

export default function BlogListingPage({ params, searchParams }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const posts = getAutoInsuranceBlogPosts(product.slug)
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const categories = getAutoInsuranceBlogCategoriesForPosts(posts);

  const selectedCategory =
    typeof searchParams?.category === "string" ? searchParams.category : undefined;

  const filteredPosts =
    selectedCategory && selectedCategory !== "all"
      ? posts.filter((p) => p.category === selectedCategory)
      : posts;

  const breadcrumbs = [
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

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href={`/${product.slug}/blog`}
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
            !selectedCategory || selectedCategory === "all"
              ? "bg-momo-50 border-momo-200 text-momo-700"
              : "bg-white border-slate-200 text-slate-700 hover:border-momo-200 hover:text-momo-600"
          }`}
        >
          Tất cả ({formatNumber(posts.length)})
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${product.slug}/blog?category=${c.slug}`}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              selectedCategory === c.slug
                ? "bg-momo-50 border-momo-200 text-momo-700"
                : "bg-white border-slate-200 text-slate-700 hover:border-momo-200 hover:text-momo-600"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/${product.slug}/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-card-hover transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                    {categories.find((c) => c.slug === post.category)?.name ||
                      post.category}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {post.readingTime} phút đọc
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="text-sm font-semibold text-momo-600">
                  Đọc tiếp →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
