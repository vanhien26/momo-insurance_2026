import type { InsuranceProvider, PricingTier } from "@/types/insurance";
import { ProviderCard } from "./ProviderCard";

interface ProviderGridProps {
  providers: InsuranceProvider[];
  pricingTiers: PricingTier[];
  productSlug: string;
  typeSlug: string;
}

export function ProviderGrid({
  providers,
  pricingTiers,
  productSlug,
  typeSlug,
}: ProviderGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {providers.map((provider) => {
        const providerTiers = pricingTiers.filter(
          (t) => t.providerId === provider.id
        );
        const minPrice =
          providerTiers.length > 0
            ? Math.min(...providerTiers.map((t) => t.annualPremium))
            : undefined;

        return (
          <ProviderCard
            key={provider.id}
            provider={provider}
            minPrice={minPrice}
            tierCount={providerTiers.length}
            productSlug={productSlug}
            typeSlug={typeSlug}
          />
        );
      })}
    </div>
  );
}
