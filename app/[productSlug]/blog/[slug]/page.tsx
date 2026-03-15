import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import {
  Markdown,
  TableOfContents,
  BlogAuthorCard,
  ShareButtons,
  RelatedProductsBlock,
  StructuredDataBlog,
} from "@/components/blog";
import {
  getAutoInsuranceBlogCategoriesForPosts,
  getAutoInsuranceBlogPosts,
  getAutoInsurancePostBySlug,
} from "@/products/auto-insurance/blog/data";
import { ArrowRight, Eye } from "lucide-react";

interface PageProps {
  params: { productSlug: string; slug: string };
}

export async function generateStaticParams() {
  const posts = getAutoInsuranceBlogPosts("bao-hiem-o-to");
  return posts.map((p) => ({ productSlug: "bao-hiem-o-to", slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = registry.get(params.productSlug);
  if (!product) return {};
  const post = getAutoInsurancePostBySlug(product.slug, params.slug);
  if (!post) return {};

  const fullUrl = `https://momo.vn/${product.slug}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog ${product.name}`,
    description: post.excerpt,
    keywords: post.tags?.join(", ") || "",
    authors: [{ name: post.author?.name || "MoMo Insurance" }],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: fullUrl,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author?.name || "MoMo Insurance"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const product = registry.get(params.productSlug);
  if (!product) notFound();

  const post = getAutoInsurancePostBySlug(product.slug, params.slug);
  if (!post) notFound();

  const posts = getAutoInsuranceBlogPosts(product.slug);
  const categories = getAutoInsuranceBlogCategoriesForPosts(posts);
  const categoryName =
    categories.find((c) => c.slug === post.category)?.name || post.category;

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // Related products for internal linking
  const relatedProducts =
    product.types?.map((type) => ({
      slug: type.slug,
      name: type.name,
      description: type.shortDesc,
      icon: "🛡️",
    })) || [];

  const breadcrumbs = [
    { label: product.name, href: `/${product.slug}` },
    { label: "Blog", href: `/${product.slug}/blog` },
    { label: post.title, href: `/${product.slug}/blog/${post.slug}` },
  ];

  const fullUrl = `https://momo.vn/${product.slug}/blog/${post.slug}`;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <StructuredDataBlog
        post={post}
        product={product}
        fullUrl={fullUrl}
        relatedPostsCount={related.length}
      />

      <BreadcrumbNav items={breadcrumbs} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-slate-100 text-slate-700 border-slate-200">
              {categoryName}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Eye className="w-4 h-4" />
              <span>Cập nhật {new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl border border-slate-100">
            <div className="text-center">
              <div className="text-2xl font-black text-momo-600">
                {post.readingTime}
              </div>
              <div className="text-xs text-slate-500 mt-1">phút đọc</div>
            </div>
            <div className="text-center border-l border-r border-slate-100">
              <div className="text-2xl font-black text-momo-600">
                {Math.ceil(post.content.split(/\s+/).length / 200)}
              </div>
              <div className="text-xs text-slate-500 mt-1">phần</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-momo-600">
                {post.tags?.length || 0}
              </div>
              <div className="text-xs text-slate-500 mt-1">từ khóa</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Table of Contents (Sidebar) */}
          <div className="lg:col-span-1">
            <TableOfContents content={post.content} readingTime={post.readingTime} />
          </div>

          {/* Article Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl border border-slate-100 p-6 md:p-10 shadow-sm prose-lg">
              <Markdown content={post.content} />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-10 pt-10 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/${product.slug}/blog?tag=${encodeURIComponent(t)}`}
                        className="px-3 py-1.5 rounded-full bg-momo-50 text-momo-700 border border-momo-200 text-xs font-medium hover:bg-momo-100 transition-colors"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Share Section */}
            <div className="mt-8">
              <ShareButtons title={post.title} url={fullUrl} category={categoryName} />
            </div>

            {/* Author Card */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Về tác giả</h3>
              <BlogAuthorCard author={post.author} />
            </div>

            {/* CTA Section */}
            <div className="mt-10 bg-gradient-to-r from-momo-600 to-momo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-3">Sẵn sàng mua bảo hiểm?</h3>
              <p className="mb-6 text-momo-50">
                Dựa vào bài viết này, bạn có thể đã hiểu rõ hơn về nhu cầu bảo hiểm của mình.
                Hãy khám phá các gói bảo hiểm phù hợp ngay hôm nay.
              </p>
              <Link
                href={`/${product.slug}/${product.types?.[0]?.slug || "vat-chat"}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-momo-700 font-bold rounded-lg hover:bg-momo-50 transition-colors"
              >
                So sánh giá bảo hiểm ngay <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-10">
                <RelatedProductsBlock
                  title="Các sản phẩm khác"
                  products={relatedProducts}
                  productSlug={product.slug}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${product.slug}/blog/${p.slug}`}
                  className="group block rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-card-hover transition-all"
                >
                  <div className="p-6">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-3">
                      {categoryName}
                    </div>
                    <div className="font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-momo-600 transition-colors">
                      {p.title}
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-3 mb-4">
                      {p.excerpt}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{p.readingTime} phút đọc</span>
                      <span className="text-momo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <Link
              href={`/${product.slug}/blog`}
              className="inline-flex items-center gap-2 text-slate-700 font-semibold hover:text-momo-600 transition-colors"
            >
              ← Xem tất cả bài viết
            </Link>
            <div className="text-sm text-slate-500">
              Bài viết bởi{" "}
              <span className="font-semibold text-slate-700">{post.author?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
