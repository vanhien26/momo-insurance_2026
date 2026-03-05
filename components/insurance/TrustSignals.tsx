import type { TrustStat } from "@/types/insurance";

interface TrustSignalsProps {
  stats: TrustStat[];
}

export function TrustSignals({ stats }: TrustSignalsProps) {
  return (
    <section className="py-12 bg-surface-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-momo-600 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-content-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
