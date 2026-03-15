import type { InsuranceProvider, PricingTier } from "@/types/insurance";
import { ProviderPackageCard } from "./ProviderPackageCard";

interface ProviderPackageGridProps {
  provider: InsuranceProvider;
  tiers: PricingTier[];
  productSlug: string;
  typeSlug: string;
}

export function ProviderPackageGrid({
  provider,
  tiers,
  productSlug,
  typeSlug,
}: ProviderPackageGridProps) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {tiers.map((tier) => (
        <ProviderPackageCard
          key={tier.id}
          tier={tier as PricingTier & { popular?: boolean }}
          providerName={provider.name}
          productSlug={productSlug}
          typeSlug={typeSlug}
          providerSlug={provider.slug}
        />
      ))}
    </div>
  );
}
