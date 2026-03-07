import { CheckCircle2 } from "lucide-react";

const SIGNALS = [
  "11+ nhà bảo hiểm uy tín",
  "Cấp đơn trong 5 phút",
  "Bồi thường nhanh 24h",
  "Quản lý trên MoMo",
];

export function TrustSignalsBlock() {
  return (
    <section className="py-10 bg-momo-50 border-y border-momo-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {SIGNALS.map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 text-slate-700 font-medium"
            >
              <CheckCircle2 className="w-5 h-5 text-momo-500 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
