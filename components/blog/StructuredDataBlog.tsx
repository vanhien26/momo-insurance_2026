// StructuredDataBlog.tsx - Enhanced schema markup for SEO
"use client";

import type { BlogPost, Author } from "@/types/blog";

interface StructuredDataBlogProps {
  post: BlogPost;
  product: any;
  fullUrl: string;
  relatedPostsCount: number;
}

export function StructuredDataBlog({
  post,
  product,
  fullUrl,
  relatedPostsCount,
}: StructuredDataBlogProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || `/images/og-${product.slug}.jpg`,
    author: {
      "@type": "Organization",
      name: post.author.name,
      logo: "/images/logo.png",
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    articleBody: post.content,
    keywords: post.tags?.join(", ") || "",
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: "vi-VN",
    relatedLink: Array(relatedPostsCount).fill(fullUrl),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
