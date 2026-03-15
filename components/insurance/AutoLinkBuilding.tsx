import Link from "next/link";
import { Situation } from "@/types/insurance";
import type { InsuranceProvider, PricingTier } from "@/types/insurance";
import { ArrowRight, ExternalLink, Shield, Car, FileText } from "lucide-react";

interface AutoLinkBuildingProps {
    currentSituation: Situation;
    allSituations: Situation[];
    providers: InsuranceProvider[];
    pricingTiers: PricingTier[];
    productSlug: string;
    typeSlug: string;
}

/**
 * AutoLinkBuilding - Tự động tạo internal links cho SEO
 * 
 * Chiến lược:
 * 1. Related Situations: Link đến các tình huống liên quan (cùng coveringPackages)
 * 2. Covering Providers: Link đến trang đối tác có gói bao gồm tình huống này
 * 3. Product Type Pages: Link đến các trang loại BH (vật chất, bắt buộc)
 * 4. Brand/SEO Pages: Link đến các trang pSEO (hãng xe, tỉnh thành)
 * 5. Blog/FAQ Cross-links: Link đến blog liên quan
 */
export function AutoLinkBuilding({
    currentSituation,
    allSituations,
    providers,
    pricingTiers,
    productSlug,
    typeSlug,
}: AutoLinkBuildingProps) {
    // 1. Related Situations - tìm các tình huống có chung gói bảo hiểm
    const relatedSituations = allSituations
        .filter((s) => s.id !== currentSituation.id)
        .map((s) => {
            const commonPackages = s.coveringPackages.filter((pkg) =>
                currentSituation.coveringPackages.includes(pkg)
            );
            return { ...s, relevanceScore: commonPackages.length };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 4);

    // 2. Covering Providers - nhà BH nào có gói cover tình huống này
    const coveringProviderIds = new Set(
        pricingTiers
            .filter((t) => currentSituation.coveringPackages.includes(t.id))
            .map((t) => t.providerId)
    );
    const coveringProviders = providers.filter((p) =>
        coveringProviderIds.has(p.id)
    );

    // 3. Static cross-links
    const crossLinks = [
        {
            label: "So sánh giá bảo hiểm vật chất",
            href: `/${productSlug}/${typeSlug}`,
            icon: Shield,
            desc: "Xem bảng giá từ 11+ nhà bảo hiểm",
        },
        {
            label: "Tất cả tình huống bảo hiểm",
            href: `/${productSlug}/${typeSlug}/tinh-huong`,
            icon: FileText,
            desc: "Khám phá 9 tình huống phổ biến",
        },
        {
            label: "Bảo hiểm ô tô",
            href: `/${productSlug}`,
            icon: Car,
            desc: "Tổng quan các gói bảo hiểm ô tô",
        },
        {
            label: "Bảo hiểm xe máy tự nguyện",
            href: "/bao-hiem-xe-may",
            icon: Shield,
            desc: "Bảo vệ xe máy từ 120K/năm",
        },
    ];

    return (
        <>
            {/* ─── Section 1: Tình huống liên quan ─── */}
            <section className="py-12 md:py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-momo-500 rounded-full" />
                            <h2 className="text-2xl font-black text-slate-900">
                                Tình Huống Liên Quan
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {relatedSituations.map((situation) => (
                                <Link
                                    key={situation.id}
                                    href={`/${productSlug}/${typeSlug}/tinh-huong/${situation.slug}`}
                                    className="group block bg-slate-50 hover:bg-pink-50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="text-3xl mb-3">{situation.icon}</div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-momo-500 transition-colors mb-2">
                                        {situation.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                        {situation.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-momo-500 group-hover:gap-2 transition-all">
                                        Xem chi tiết <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Section 2: Đối tác chi trả ─── */}
            {coveringProviders.length > 0 && (
                <section className="py-12 md:py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                                <h2 className="text-2xl font-black text-slate-900">
                                    Nhà Bảo Hiểm Chi Trả cho {currentSituation.name}
                                </h2>
                            </div>
                            <p className="text-sm text-slate-500 mb-8 ml-4">
                                Các nhà bảo hiểm dưới đây có gói bao gồm quyền lợi{" "}
                                <strong>{currentSituation.name.toLowerCase()}</strong>
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {coveringProviders.map((provider) => {
                                    const providerTiers = pricingTiers.filter(
                                        (t) =>
                                            t.providerId === provider.id &&
                                            currentSituation.coveringPackages.includes(t.id)
                                    );
                                    const minPrice = providerTiers.length
                                        ? Math.min(...providerTiers.map((t) => t.annualPremium))
                                        : null;

                                    return (
                                        <Link
                                            key={provider.id}
                                            href={`/${productSlug}/${typeSlug}/${provider.slug}`}
                                            className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-50 to-momo-50 flex items-center justify-center flex-shrink-0 text-sm font-black text-momo-600 group-hover:from-momo-100 group-hover:to-pink-100 transition-all">
                                                {provider.name.slice(0, 2)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-900 group-hover:text-momo-500 transition-colors">
                                                    {provider.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-amber-500 text-xs">
                                                        {"★".repeat(Math.floor(provider.rating))}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {provider.rating}
                                                    </span>
                                                    {minPrice && (
                                                        <span className="text-xs text-momo-500 font-bold">
                                                            · từ {minPrice.toLocaleString("vi-VN")}đ
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-momo-500 transition-colors flex-shrink-0" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Section 3: Cross-links Hub ─── */}
            <section className="py-12 md:py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl font-black text-slate-900">
                                Khám Phá Thêm
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {crossLinks.map((link) => {
                                const IconComp = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center gap-4 p-5 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-momo-50 hover:to-pink-50 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                                            <IconComp className="w-5 h-5 text-momo-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-900 text-sm group-hover:text-momo-500 transition-colors">
                                                {link.label}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {link.desc}
                                            </p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-momo-400 transition-colors flex-shrink-0" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
