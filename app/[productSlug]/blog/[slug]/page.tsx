import { notFound } from "next/navigation";

interface PageProps {
  params: { productSlug: string; slug: string };
}

// Blog posts will be generated from MDX content
export async function generateStaticParams() {
  // TODO: Read from content/blog directory
  return [];
}

export default function BlogPostPage({ params }: PageProps) {
  // TODO: Load MDX content by slug
  notFound();
}
