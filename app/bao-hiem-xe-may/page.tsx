import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Headset, Bike, Banknote } from "lucide-react";

import { registry } from "@/lib/registry";
import "@/products/moto-insurance";

import { HeroBanner } from "@/components/insurance/HeroBanner";
import { TrustSignals } from "@/components/insurance/TrustSignals";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { ProviderGrid } from "@/components/insurance/ProviderGrid";
import { PricingTable } from "@/components/insurance/PricingTable";
import MotoInsuranceForm from "@/components/insurance/MotoInsuranceForm";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageSEO } from "@/lib/seo";

const PRODUCT_SLUG = "bao-hiem-xe-may";

export async function generateMetadata(): Promise<Metadata> {
    const product = registry.get(PRODUCT_SLUG);
    if (!product) return { title: "Bảo hiểm xe máy tự nguyện - MoMo" };
    const seo = buildPageSEO({ product });
    return {
        title: seo.title,
        description: seo.description,
    };
}

export default function MotoInsuranceHubPage() {
    const product = registry.get(PRODUCT_SLUG);
    if (!product) return notFound();
    const seo = buildPageSEO({ product });
    const type = product.types[0]; // Tự nguyện - loại duy nhất

    return (
        <div className="bg-white min-h-screen">
            <SchemaMarkup schemas={seo.schema} />

            {/* 1. Breadcrumb */}
            <BreadcrumbNav items={seo.breadcrumbs} />

            {/* 2. Hero + Form Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-pink-50 py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
                        {/* Content side */}
                        <div className="w-full lg:w-1/2 space-y-6 pt-4">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-momo-500 text-sm font-bold border border-pink-100">
                                🏍️ Bảo hiểm xe máy tự nguyện 2026
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                                {product.metadata.heroTitle}
                            </h1>

                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                {product.metadata.heroSubtitle}
                            </p>

                            {/* Trust stats inline */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {product.metadata.trustStats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-100"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-momo-500 font-bold text-sm">
                                            {stat.value}
                                        </div>
                                        <span className="text-xs text-slate-600 font-medium leading-tight">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form side */}
                        <div className="w-full lg:w-1/2 max-w-xl mx-auto" id="bao-gia">
                            <MotoInsuranceForm productSlug={PRODUCT_SLUG} />
                        </div>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-50/60 to-transparent -skew-x-12 translate-x-1/4 z-0" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-momo-100/30 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 z-0" />
            </section>

            {/* 3. USP Section */}
            <section className="py-16 bg-white border-b border-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                            Tại sao chọn mua trên <span className="text-momo-500">MoMo</span>?
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Quy trình đơn giản, báo giá minh bạch, bồi thường nhanh chóng
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8 text-momo-500" />,
                                title: "Báo giá 30 giây",
                                desc: "So sánh ngay 6 nhà bảo hiểm uy tín hàng đầu.",
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-momo-500" />,
                                title: "Bồi thường dễ",
                                desc: "Quy trình online, nhận tiền bồi thường qua MoMo.",
                            },
                            {
                                icon: <Headset className="w-8 h-8 text-momo-500" />,
                                title: "Hỗ trợ 24/7",
                                desc: "Đội ngũ chuyên gia luôn sẵn sàng đồng hành.",
                            },
                            {
                                icon: <Banknote className="w-8 h-8 text-momo-500" />,
                                title: "Chỉ từ 120K/năm",
                                desc: "Phí siêu rẻ, bảo vệ toàn diện cho xe máy.",
                            },
                        ].map((usp, i) => (
                            <div
                                key={i}
                                className="text-center p-6 rounded-2xl hover:bg-pink-50/50 transition-colors group"
                            >
                                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                                    {usp.icon}
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">{usp.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {usp.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Provider Grid */}
            <section className="py-20 bg-slate-50" id="provider-grid">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                Đối tác <span className="text-momo-500">bảo hiểm xe máy</span>
                            </h2>
                            <p className="text-slate-600">
                                So sánh các gói bảo hiểm tự nguyện từ {type.providers.length} nhà bảo hiểm hàng đầu.
                            </p>
                        </div>
                        <TrustSignals stats={product.metadata.trustStats} />
                    </div>

                    {/* Provider Cards - Custom for moto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {type.providers.map((provider) => {
                            const providerTiers = type.pricingTiers.filter(
                                (t) => t.providerId === provider.id
                            );
                            const minPrice = providerTiers.length
                                ? Math.min(...providerTiers.map((t) => t.annualPremium))
                                : null;

                            return (
                                <Link
                                    key={provider.id}
                                    href={`/bao-hiem-xe-may/doi-tac/${provider.slug}`}
                                    className="group"
                                >
                                    <Card className="h-full border-none shadow-sm group-hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden bg-white">
                                        <CardContent className="p-6">
                                            {/* Provider header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-50 to-momo-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-momo-600 group-hover:from-momo-100 group-hover:to-pink-100 transition-all">
                                                    {provider.name.slice(0, 2)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-momo-500 transition-colors">
                                                        {provider.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-amber-500 text-sm">
                                                            {"★".repeat(Math.floor(provider.rating))}
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            {provider.rating} ({provider.reviewCount.toLocaleString("vi-VN")})
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                                                {provider.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-1.5 mb-5">
                                                {provider.features.slice(0, 3).map((f) => (
                                                    <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                                                        <span>{f}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Price & CTA */}
                                            <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                                                <div>
                                                    {minPrice && (
                                                        <>
                                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                                                Phí từ
                                                            </p>
                                                            <p className="text-xl font-black text-momo-500">
                                                                {minPrice.toLocaleString("vi-VN")}đ
                                                                <span className="text-xs font-normal text-slate-400">
                                                                    /năm
                                                                </span>
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-momo-500 group-hover:translate-x-1 transition-transform inline-block">
                                                    Xem chi tiết →
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Pricing Comparison Table */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            So sánh giá <span className="text-momo-500">tất cả gói</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Bảng so sánh chi tiết giá và quyền lợi từ các nhà bảo hiểm
                        </p>
                    </div>
                    <PricingTable tiers={type.pricingTiers} providers={type.providers} />
                </div>
            </section>

            {/* 6. Info card: BH Bắt buộc */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <Card className="border-none shadow-lg rounded-[2rem] overflow-hidden">
                        <CardContent className="p-0 flex flex-col md:flex-row">
                            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 p-10 md:p-12 flex flex-col justify-center text-white">
                                <div className="text-5xl mb-4">⚖️</div>
                                <h3 className="text-2xl md:text-3xl font-black mb-3">
                                    Bảo hiểm TNDS Bắt buộc
                                </h3>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    Theo quy định pháp luật, mọi xe máy tham gia giao thông đều phải có bảo hiểm TNDS bắt buộc.
                                </p>
                            </div>
                            <div className="md:w-3/5 p-10 md:p-12 bg-white">
                                <div className="space-y-4 mb-6">
                                    {[
                                        "Bồi thường thiệt hại cho bên thứ ba khi xảy ra tai nạn",
                                        "Mức bồi thường tối đa 150 triệu đồng/vụ về người",
                                        "Phí chỉ từ 66.000đ/năm cho xe máy dưới 50cc",
                                        "Bắt buộc theo Nghị định 03/2021/NĐ-CP",
                                        "Bị phạt 100.000 - 200.000đ nếu không có",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 italic">
                                    * Tính năng mua bảo hiểm TNDS bắt buộc online sẽ sớm được triển khai trên MoMo.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 7. FAQ */}
            <section className="py-20 bg-white">
                <FAQAccordion faqs={product.faqs} productName="bảo hiểm xe máy" />
            </section>

            {/* 8. Footer CTA */}
            <InsuranceCTA
                ctaText={product.metadata.ctaText || "Mua bảo hiểm ngay"}
                ctaHref="#bao-gia"
            />
        </div>
    );
}
