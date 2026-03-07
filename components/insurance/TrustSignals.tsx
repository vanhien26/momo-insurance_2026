import type { TrustStat } from "@/types/insurance";

interface TrustSignalsProps {
  stats: TrustStat[];
}

export function TrustSignals({ stats }: TrustSignalsProps) {
  return (
    <section className="py-12 md:py-16 bg-surface-secondary border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-momo-600 mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-content-secondary font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
