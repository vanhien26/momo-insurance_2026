"use client";

import type { PricingTier } from "@/types/insurance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProviderPackageCardProps {
  tier: PricingTier & { popular?: boolean };
  providerName: string;
  productSlug: string;
  typeSlug: string;
  providerSlug: string;
}

export function ProviderPackageCard({
  tier,
  providerName,
  productSlug,
  typeSlug,
  providerSlug,
}: ProviderPackageCardProps) {
  const isPopular = tier.popular ?? (tier as { isPopular?: boolean }).isPopular ?? false;

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 border-2 hover:border-momo-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-900">{tier.label}</h3>
          {isPopular && (
            <Badge className="bg-momo-100 text-momo-600 border-momo-200">
              Phổ biến
            </Badge>
          )}
        </div>

        <div className="mb-4">
          <p className="text-2xl font-black text-momo-600">
            {formatCurrency(tier.annualPremium)}
            <span className="text-sm font-normal text-slate-500">/năm</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Bảo hiểm: {formatCurrency(tier.coverage)} / Miễn thường: {formatCurrency(tier.deductible)}
          </p>
        </div>

        <ul className="space-y-2 mb-6">
          {tier.benefits.slice(0, 4).map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-momo-500 flex-shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/${productSlug}/${typeSlug}/mua/${providerSlug}/${tier.id}`}
          className="block"
        >
          <Button className="w-full bg-momo-500 hover:bg-momo-600 group-hover:shadow-lg transition-all">
            Mua ngay
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
