import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Phone, Globe, Star, ArrowLeft, ShieldCheck } from "lucide-react";

import { registry } from "@/lib/registry";
import "@/products/moto-insurance";

import { BreadcrumbNav } from "@/components/insurance/BreadcrumbNav";
import { SchemaMarkup } from "@/components/insurance/SchemaMarkup";
import { FAQAccordion } from "@/components/insurance/FAQAccordion";
import { InsuranceCTA } from "@/components/insurance/InsuranceCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PRODUCT_SLUG = "bao-hiem-xe-may";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const product = registry.get(PRODUCT_SLUG);
    if (!product) return [];
    const type = product.types[0];
    return type.providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = registry.get(PRODUCT_SLUG);
    if (!product) return {};

    const type = product.types[0];
    const provider = type.providers.find((p) => p.slug === resolvedParams.slug);
    if (!provider) return {};

    return {
        title: `Bảo hiểm xe máy ${provider.name} - Đối tác MoMo`,
        description: `Mua bảo hiểm xe máy tự nguyện từ ${provider.name} trên MoMo. So sánh giá, quyền lợi và dịch vụ bồi thường. Phí chỉ từ 120.000đ/năm.`,
    };
}

export default async function PartnerDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const product = registry.get(PRODUCT_SLUG);
    if (!product) notFound();

    const type = product.types[0];
    const provider = type.providers.find((p) => p.slug === resolvedParams.slug);
    if (!provider) notFound();

    // Lấy pricing tiers cho provider này
    const providerTiers = type.pricingTiers.filter(
        (t) => t.providerId === provider.id
    );

    const breadcrumbs = [
        { label: "Trang chủ", href: "/" },
        { label: "Bảo hiểm xe máy", href: "/bao-hiem-xe-may" },
        { label: provider.name, href: `/bao-hiem-xe-may/doi-tac/${provider.slug}` },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <BreadcrumbNav items={breadcrumbs} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-momo-900 py-16 md:py-24">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Back button */}
                    <Link
                        href="/bao-hiem-xe-may"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại tất cả đối tác
                    </Link>

                    <div className="flex flex-col md:flex-row items-start gap-10">
                        {/* Provider Logo & Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-black text-white border border-white/20">
                                    {provider.name.slice(0, 2)}
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black text-white">
                                        {provider.name}
                                    </h1>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(provider.rating)
                                                        ? "text-amber-400 fill-amber-400"
                                                        : "text-white/20"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-white/60 text-sm">
                                            {provider.rating}/5 · {provider.reviewCount.toLocaleString("vi-VN")} đánh giá
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-6">
                                {provider.description}
                            </p>

                            {/* Contact info */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={`tel:${provider.hotline.replace(/\s/g, "")}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    {provider.hotline}
                                </a>
                                <a
                                    href={provider.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Website
                                </a>
                            </div>
                        </div>

                        {/* Quick CTA card */}
                        <div className="w-full md:w-auto md:min-w-[320px]">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                                <div className="text-center mb-4">
                                    <p className="text-white/60 text-xs uppercase tracking-wider font-bold mb-1">
                                        Phí bảo hiểm từ
                                    </p>
                                    <p className="text-4xl font-black text-white">
                                        {providerTiers.length
                                            ? `${Math.min(
                                                ...providerTiers.map((t) => t.annualPremium)
                                            ).toLocaleString("vi-VN")}đ`
                                            : "Liên hệ"}
                                    </p>
                                    <p className="text-white/50 text-sm">/năm</p>
                                </div>
                                <a href="/bao-hiem-xe-may#bao-gia">
                                    <Button className="w-full bg-momo-500 hover:bg-momo-600 text-white font-bold h-12 rounded-xl">
                                        Mua bảo hiểm ngay
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-momo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center">
                        Điểm nổi bật của <span className="text-momo-500">{provider.name}</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {provider.features.map((feature, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-pink-50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-momo-100 flex items-center justify-center mb-4 group-hover:bg-momo-200 transition-colors">
                                    <ShieldCheck className="w-6 h-6 text-momo-500" />
                                </div>
                                <p className="text-sm font-semibold text-slate-800">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            {providerTiers.length > 0 && (
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center">
                            Các gói bảo hiểm xe máy từ{" "}
                            <span className="text-momo-500">{provider.name}</span>
                        </h2>
                        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
                            Chọn gói phù hợp với nhu cầu và ngân sách của bạn
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {providerTiers.map((tier) => (
                                <Card
                                    key={tier.id}
                                    className={`border-none rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${tier.isPopular
                                        ? "ring-2 ring-momo-500 shadow-lg relative"
                                        : "shadow-sm"
                                        }`}
                                >
                                    {tier.isPopular && (
                                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-momo-500 to-momo-600 text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                                            Phổ biến nhất
                                        </div>
                                    )}
                                    <CardContent className={`p-8 ${tier.isPopular ? "pt-12" : ""}`}>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                                            {tier.label}
                                        </h3>

                                        <div className="mb-6">
                                            <span className="text-3xl font-black text-momo-500">
                                                {tier.annualPremium.toLocaleString("vi-VN")}đ
                                            </span>
                                            <span className="text-sm text-slate-400">/năm</span>
                                        </div>

                                        <div className="mb-4 pb-4 border-b border-slate-100">
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                                                Bồi thường tối đa
                                            </p>
                                            <p className="text-lg font-bold text-slate-800">
                                                {tier.coverage.toLocaleString("vi-VN")}đ
                                            </p>
                                        </div>

                                        <div className="space-y-2.5 mb-6">
                                            {tier.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-slate-600">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <a href="/bao-hiem-xe-may#bao-gia">
                                            <Button
                                                className={`w-full h-11 rounded-xl font-bold ${tier.isPopular
                                                    ? "bg-momo-500 hover:bg-momo-600 text-white"
                                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                                    }`}
                                            >
                                                Chọn gói này
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="py-20 bg-white">
                <FAQAccordion faqs={product.faqs} productName={`bảo hiểm xe máy ${provider.name}`} />
            </section>

            {/* CTA */}
            <InsuranceCTA
                ctaText="Mua bảo hiểm ngay"
                ctaHref="/bao-hiem-xe-may#bao-gia"
                title={`Bảo vệ xe máy với ${provider.name} trên MoMo`}
            />
        </div>
    );
}
