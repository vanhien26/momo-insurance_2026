import { PricingTier, InsuranceProvider } from "@/types/insurance";
import { ProviderPackageCard } from "./ProviderPackageCard";

interface CoveringInsurancesProps {
  coveringPackageIds: string[];
  pricingTiers: PricingTier[];
  providers: InsuranceProvider[];
  productSlug: string;
  typeSlug: string;
}

export function CoveringInsurances({
  coveringPackageIds,
  pricingTiers,
  providers,
  productSlug,
  typeSlug,
}: CoveringInsurancesProps) {
  // Filter pricing tiers that cover this situation
  const coveringTiers = pricingTiers.filter((tier) =>
    coveringPackageIds.includes(tier.id)
  );

  // Group by provider
  const groupedByProvider = coveringTiers.reduce(
    (acc, tier) => {
      const provider = providers.find((p) => p.id === tier.providerId);
      if (provider) {
        if (!acc[provider.id]) {
          acc[provider.id] = { provider, tiers: [] };
        }
        acc[provider.id].tiers.push(tier);
      }
      return acc;
    },
    {} as Record<string, { provider: InsuranceProvider; tiers: PricingTier[] }>
  );

  return (
    <div className="space-y-8">
      {Object.values(groupedByProvider).map(({ provider, tiers }) => (
        <div key={provider.id} className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            {provider.logo && (
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-10 w-auto"
              />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span>⭐ {provider.rating}</span>
                <span>({provider.reviewCount} đánh giá)</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      ))}

      {coveringTiers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Hiện chưa có gói bảo hiểm nào chi trả cho tình huống này.
          </p>
        </div>
      )}
    </div>
  );
}
