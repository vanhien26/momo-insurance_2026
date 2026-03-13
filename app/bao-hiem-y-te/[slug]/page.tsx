import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    HeartHandshake,
    CheckCircle2,
    ShieldPlus,
    Clock,
    Zap,
    Award,
    CalendarCheck,
    Smartphone
} from "lucide-react";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { HealthInsuranceDurationForm } from "@/components/insurance/HealthInsuranceDurationForm";

interface PageProps {
    params: {
        slug: string;
    };
}

const durationMap: Record<string, { months: number; title: string; priceText: string }> = {
    "3-thang": {
        months: 3,
        title: "Gia hạn BHYT 3 tháng",
        priceText: "~240.000đ"
    },
    "6-thang": {
        months: 6,
        title: "Gia hạn BHYT 6 tháng",
        priceText: "~456.000đ"
    },
    "12-thang": {
        months: 12,
        title: "Gia hạn BHYT 12 tháng",
        priceText: "~864.000đ"
    }
};

export async function generateStaticParams() {
    return [
        { slug: "3-thang" },
        { slug: "6-thang" },
        { slug: "12-thang" }
    ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const data = durationMap[params.slug];
    if (!data) return { title: "Không tìm thấy trang" };

    return {
        title: `${data.title} - Gia hạn nhanh, Nhận thẻ ngay | MoMo`,
        description: `Gia hạn bảo hiểm y tế (BHYT) thời hạn ${data.months} tháng qua MoMo. Thủ tục đơn giản 3 phút, thanh toán an toàn, nhận thẻ kỹ thuật số tức thì.`,
    };
}

export default function DurationPage({ params }: PageProps) {
    const data = durationMap[params.slug];

    if (!data) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Trang chủ", href: "/" },
        { label: "Bảo hiểm", href: "/bao-hiem" },
        { label: "Bảo hiểm Y tế", href: "/bao-hiem-y-te" },
        { label: data.title, href: `/bao-hiem-y-te/${params.slug}` },
    ];

    return (
        <div className="bg-white min-h-screen">
            <SchemaMarkup schemas={[{
                "@context": "https://schema.org",
                "@type": "Product",
                "name": data.title,
                "description": `Dịch vụ gia hạn bảo hiểm y tế online thời hạn ${data.months} tháng qua MoMo.`,
                "brand": { "@type": "Brand", "name": "MoMo" }
            }]} />

            {/* Breadcrumb */}
            <BreadcrumbNav items={breadcrumbs} />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-pink-50/20 to-white overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-momo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-momo-500/10 text-momo-600 text-sm font-bold border border-momo-500/20">
                                <Zap className="w-4 h-4 fill-momo-600" />
                                <span>Hoàn tất chỉ trong 3 phút</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                {data.title} <br />
                                <span className="text-momo-500 italic block mt-2 text-3xl md:text-5xl lg:text-5xl">Chỉ với {data.priceText}</span>
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                                {[
                                    { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Gia hạn trực tuyến 100%" },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Nhận kết quả tức thì" },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Hỗ trợ tra cứu mã số BHXH" },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Thanh toán MoMo linh hoạt" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2">
                                        {item.icon}
                                        <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                    <Award className="w-8 h-8 text-momo-500" />
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Chứng nhận bởi</p>
                                        <p className="text-sm font-black text-slate-900 leading-none mt-1">BHXH Việt Nam</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="w-full lg:w-auto flex-shrink-0" id="registration-form">
                            <HealthInsuranceDurationForm duration={data.months} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Why Choose this Duration? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                                Lợi ích khi gia hạn <span className="text-momo-500">{data.months} tháng</span>
                            </h2>
                            <div className="w-24 h-1.5 bg-momo-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                                    <CalendarCheck className="w-8 h-8 text-momo-500" />
                                </div>
                                <h4 className="font-bold text-xl text-slate-900 mb-3">Quyền lợi liên tục</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Đảm bảo thẻ BHYT luôn có giá trị sử dụng, tránh việc gián đoạn quyền lợi khám chữa bệnh khi có sự cố sức khỏe.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Smartphone className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-xl text-slate-900 mb-3">Quản lý dễ dàng</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Toàn bộ thông tin gia hạn và thẻ kỹ thuật số được lưu trữ ngay trong Ví MoMo, tra cứu mọi lúc mọi nơi.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Clock className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="font-bold text-xl text-slate-900 mb-3">Nhắc hẹn kịp thời</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Hệ thống tự động nhắc lịch khi sắp hết hạn, giúp bạn chủ động thời gian và không lo quá hạn mức bảo hiểm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide Section */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-black text-slate-900">Quy trình 3 bước đơn giản</h2>
                            <div className="space-y-6">
                                {[
                                    { step: "01", title: "Nhập thông tin", desc: "Cung cấp họ tên và mã số BHXH/BHYT in trên thẻ." },
                                    { step: "02", title: "Kiểm tra giá", desc: "Hệ thống tự động tính phí dựa trên thời hạn bạn chọn." },
                                    { step: "03", title: "Thanh toán", desc: "Xác nhận và thanh toán qua MoMo để nhận kết quả ngay." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-4xl font-black text-momo-500/20">{item.step}</span>
                                        <div>
                                            <h5 className="font-bold text-slate-900 mb-1">{item.title}</h5>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center">
                            <ShieldPlus className="w-16 h-16 text-momo-500 mx-auto mb-6" />
                            <h3 className="font-black text-xl mb-4 text-slate-900">An tâm 100% cùng MoMo</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                Dịch vụ được kết nối trực tiếp với hệ thống BHXH Việt Nam, đảm bảo tính pháp lý và nhanh chóng.
                            </p>
                            <div className="p-3 bg-pink-50 rounded-xl text-momo-600 font-bold text-sm">
                                Đã có 10.000+ người gia hạn tháng này
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <InsuranceCTA
                ctaText={`Đăng ký gói ${data.months} tháng ngay`}
                ctaHref="#registration-form"
            />
        </div>
    );
}
