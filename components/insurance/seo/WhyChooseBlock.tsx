import { Shield, Zap, HeadphonesIcon } from "lucide-react";

interface WhyChooseBlockProps {
  brandName: string;
  typeName: string;
  providerCount: number;
}

const BENEFITS = [
  {
    icon: Shield,
    title: "Bồi thường nhanh 24h",
    desc: "Hệ thống garage liên kết toàn quốc, giám định và sửa chữa chuyên nghiệp cho xe",
  },
  {
    icon: Zap,
    title: "Cấp đơn điện tử 5 phút",
    desc: "Giấy chứng nhận bảo hiểm có giá trị pháp lý, quản lý trực tiếp trên MoMo",
  },
  {
    icon: HeadphonesIcon,
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ tư vấn và bồi thường luôn sẵn sàng hỗ trợ khách hàng",
  },
];

export function WhyChooseBlock({
  brandName,
  typeName,
  providerCount,
}: WhyChooseBlockProps) {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          Vì sao nên mua {typeName.toLowerCase()} cho xe {brandName} trên MoMo?
        </h2>
        <p className="text-slate-600 mb-10 max-w-2xl">
          So sánh {providerCount} nhà bảo hiểm uy tín, chọn gói phù hợp nhất với xe của bạn
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-momo-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-momo-100 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-momo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
