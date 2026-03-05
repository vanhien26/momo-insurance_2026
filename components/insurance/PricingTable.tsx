"use client";

import { useState } from "react";
import type { PricingTier, InsuranceProvider } from "@/types/insurance";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface PricingTableProps {
  tiers: PricingTier[];
  providers: InsuranceProvider[];
  onSelect?: (tierId: string) => void;
}

export function PricingTable({ tiers, providers, onSelect }: PricingTableProps) {
  const [sortBy, setSortBy] = useState<"price" | "coverage">("price");

  const sorted = [...tiers].sort((a, b) =>
    sortBy === "price"
      ? a.annualPremium - b.annualPremium
      : b.coverage - a.coverage
  );

  const getProvider = (id: string) => providers.find((p) => p.id === id);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-content-secondary">Sắp xếp theo:</span>
        <button
          onClick={() => setSortBy("price")}
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
            sortBy === "price"
              ? "bg-momo-50 text-momo-600 font-medium"
              : "text-content-secondary hover:bg-surface-tertiary"
          }`}
        >
          Giá thấp nhất
        </button>
        <button
          onClick={() => setSortBy("coverage")}
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
            sortBy === "coverage"
              ? "bg-momo-50 text-momo-600 font-medium"
              : "text-content-secondary hover:bg-surface-tertiary"
          }`}
        >
          Mức bảo hiểm cao nhất
        </button>
      </div>

      <div className="space-y-4">
        {sorted.map((tier) => {
          const provider = getProvider(tier.providerId);
          return (
            <Card
              key={tier.id}
              className={`relative ${tier.isPopular ? "ring-2 ring-momo-500" : ""}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-6">
                  <Badge variant="momo" className="shadow-sm">
                    Phổ biến nhất
                  </Badge>
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Provider + Tier */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-surface-tertiary flex items-center justify-center text-sm font-bold text-momo-600">
                        {provider?.name.slice(0, 2) || "?"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-content">
                          {provider?.name} - {tier.label}
                        </h4>
                        <span className="text-xs text-amber-500">
                          {"★".repeat(Math.floor(provider?.rating || 0))}{" "}
                          {provider?.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tier.benefits.slice(0, 4).map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center text-xs text-content-secondary"
                        >
                          <svg className="w-3.5 h-3.5 text-emerald-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-content-tertiary">Phí/năm</p>
                      <p className="text-2xl font-bold text-momo-600">
                        {formatCurrency(tier.annualPremium)}
                      </p>
                      <p className="text-xs text-content-tertiary">
                        BH tối đa: {formatCurrency(tier.coverage)}
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onSelect?.(tier.id)}
                    >
                      Chọn gói
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
