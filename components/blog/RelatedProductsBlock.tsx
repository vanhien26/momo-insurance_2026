// RelatedProductsBlock.tsx - Smart linking to product pages
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RelatedProduct {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

interface RelatedProductsBlockProps {
  title: string;
  products: RelatedProduct[];
  productSlug: string;
}

export function RelatedProductsBlock({
  title,
  products,
  productSlug,
}: RelatedProductsBlockProps) {
  if (products.length === 0) return null;

  return (
    <section className="my-8">
      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/${productSlug}/${product.slug}`}
            className="block"
          >
            <Card className="h-full hover:shadow-card-hover transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{product.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 mb-1">{product.name}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-momo-600 group-hover:text-momo-700">
                      Tìm hiểu thêm
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
