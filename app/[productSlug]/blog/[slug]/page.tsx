import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import "@/products/auto-insurance";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/blog/Markdown";
import {
  getAutoInsuranceBlogCategoriesForPosts,
  getAutoInsuranceBlogPosts,
  getAutoInsurancePostBySlug,
} from "@/products/auto-insurance/blog/data";

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

  return {
    title: `${post.title} | Blog ${product.name}`,
    description: post.excerpt,
    alternates: {
      canonical: `https://momo.vn/${product.slug}/blog/${post.slug}`,
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

  const breadcrumbs = [
    { label: product.name, href: `/${product.slug}` },
    { label: "Blog", href: `/${product.slug}/blog` },
    { label: post.title, href: `/${product.slug}/blog/${post.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav items={breadcrumbs} />

      <article className="max-w-3xl mx-auto mt-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
            {categoryName}
          </Badge>
          <span className="text-xs text-slate-500">
            {post.readingTime} phút đọc
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">
            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          {post.title}
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          {post.excerpt}
        </p>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-card">
          <Markdown content={post.content} />
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-momo-50 text-momo-700 border border-momo-100 text-xs font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <Link
            href={`/${product.slug}/blog`}
            className="text-sm font-semibold text-slate-700 hover:text-momo-600"
          >
            ← Xem tất cả bài viết
          </Link>
          <div className="text-xs text-slate-500">
            Tác giả: {post.author?.name || "MoMo Insurance"}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto mt-14">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/${product.slug}/blog/${p.slug}`}
                className="block rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-card-hover transition-all"
              >
                <div className="text-xs text-slate-500 mb-2">{categoryName}</div>
                <div className="font-bold text-slate-900 mb-2 line-clamp-2">
                  {p.title}
                </div>
                <div className="text-sm text-slate-600 line-clamp-3">
                  {p.excerpt}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
