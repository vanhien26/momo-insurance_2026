import { InsuranceProduct } from "@/types/insurance";
import providersData from "./data/providers.json";
import pricingData from "./data/pricing.json";

/**
 * CONFIGURATION CHI TIẾT - BẢO HIỂM XE MÁY MOMO
 * File này đóng vai trò là "Source of Truth" cho sản phẩm Bảo hiểm xe máy.
 */

const providers = providersData;
const allPricing = pricingData as any;
const tuNguyenPricing = allPricing["tu-nguyen"];

export const motoInsuranceProduct: InsuranceProduct = {
    id: "moto-insurance",
    slug: "bao-hiem-xe-may",
    name: "Bảo Hiểm Xe Máy",
    shortName: "BH Xe Máy",
    icon: "Bike",
    description:
        "So sánh và mua bảo hiểm xe máy tự nguyện online từ 6 nhà bảo hiểm uy tín (Bảo Việt, PVI, Liberty...). Bảo vệ xe khỏi mất cắp, tai nạn, thiên tai. Cấp đơn 5 phút, thanh toán linh hoạt với MoMo Ví Trả Sau 0% lãi.",

    // 1. Phân loại sản phẩm - Chỉ tập trung vào Tự Nguyện
    types: [
        {
            slug: "tu-nguyen",
            name: "Bảo Hiểm Xe Máy Tự Nguyện",
            shortDesc:
                "Bảo vệ xe máy khỏi tai nạn, mất cắp, cháy nổ và thiên tai. Mức phí chỉ từ 120.000đ/năm, bảo vệ toàn diện cho xế yêu của bạn.",
            icon: "Shield",
            providers,
            pricingTiers: tuNguyenPricing,
        },
    ],

    // 2. Ma trận pSEO
    seoVariables: {
        dimensions: [
            {
                dimension: "provider",
                slug: "nha-bao-hiem",
                label: "Nhà bảo hiểm",
                data: providers.map((p) => ({
                    slug: p.slug,
                    name: p.name,
                    meta: { rating: p.rating, reviewCount: p.reviewCount },
                })),
            },
        ],
        combinations: [
            {
                dims: ["provider"],
                urlPattern: "doi-tac-{provider}",
                titlePattern:
                    "Bảo hiểm xe máy {provider} - Ưu đãi trên MoMo",
                descPattern:
                    "Mua bảo hiểm xe máy tự nguyện từ {provider} online. So sánh giá, quyền lợi và dịch vụ bồi thường ngay trên MoMo.",
                priority: 1.0,
            },
        ],
    },

    // 3. Metadata & Content Hub
    metadata: {
        heroTitle: "Bảo hiểm xe máy tự nguyện",
        heroSubtitle:
            "Bảo vệ xế yêu khỏi mất cắp, tai nạn, cháy nổ. Chỉ từ 120.000đ/năm. So sánh 6 nhà bảo hiểm uy tín. Thanh toán linh hoạt với Ví Trả Sau 0% lãi.",
        trustStats: [
            { value: "80K+", label: "Hợp đồng xe máy", icon: "Users" },
            { value: "6", label: "Đối tác uy tín", icon: "Building2" },
            { value: "120K", label: "Phí chỉ từ/năm", icon: "Banknote" },
            { value: "24/7", label: "Hỗ trợ bồi thường", icon: "Clock" },
        ],
        ctaText: "Mua bảo hiểm ngay",
        ctaHref: "/bao-hiem-xe-may#bao-gia",
    },

    // 4. Content Templates
    contentTemplates: {
        hero: {
            title: "Bảo hiểm xe máy {value}",
            subtitle:
                "Giải pháp bảo vệ toàn diện cho xe máy tại {context}. So sánh {providerCount} nhà bảo hiểm ngay.",
        },
        benefitSection: [
            "Bồi thường nhanh chóng khi xảy ra tai nạn, mất cắp xe máy.",
            "Cấp đơn bảo hiểm điện tử có giá trị pháp lý tương đương bản cứng.",
            "Mức phí cạnh tranh nhất từ {provider} dành riêng cho người dùng MoMo.",
        ],
    },

    // 5. FAQ
    faqs: [
        {
            question: "Bảo hiểm xe máy tự nguyện là gì?",
            answer:
                "Bảo hiểm xe máy tự nguyện (hay bảo hiểm thân vỏ xe máy) giúp bảo vệ xe của bạn khỏi các rủi ro như tai nạn, va chạm, cháy nổ, thiên tai, ngập nước và mất cắp. Đây là giải pháp bổ sung ngoài bảo hiểm TNDS bắt buộc, mang lại sự an tâm tối đa cho chủ xe.",
        },
        {
            question: "Phí bảo hiểm xe máy tự nguyện bao nhiêu?",
            answer:
                "Mức phí dao động từ 120.000đ - 500.000đ/năm tùy vào giá trị xe, loại xe và gói bảo hiểm bạn chọn. Trên MoMo, bạn có thể so sánh ngay báo giá từ 6 nhà bảo hiểm để chọn gói phù hợp nhất.",
        },
        {
            question: "Bảo hiểm tự nguyện khác gì bảo hiểm bắt buộc?",
            answer:
                "Bảo hiểm TNDS bắt buộc chỉ bồi thường thiệt hại cho bên thứ ba (người bị tông). Bảo hiểm tự nguyện bảo vệ chính chiếc xe máy của bạn khỏi tai nạn, mất cắp, cháy nổ - giúp bạn được đền bù khi xe hư hỏng hoặc mất.",
        },
        {
            question: "Làm thế nào để yêu cầu bồi thường?",
            answer:
                "Khi gặp sự cố, bạn mở App MoMo → Bảo hiểm → Yêu cầu bồi thường. Chụp ảnh hiện trường, tải lên các giấy tờ liên quan. Nhà bảo hiểm sẽ liên hệ và xử lý trong 3-7 ngày làm việc. Tiền bồi thường chuyển trực tiếp qua MoMo.",
        },
        {
            question: "Xe máy điện có mua được bảo hiểm tự nguyện không?",
            answer:
                "Có, hầu hết các nhà bảo hiểm trên MoMo đều hỗ trợ bảo hiểm cho xe máy điện (VinFast, Yadea, Pega...). Mức phí tùy thuộc giá trị và loại xe điện cụ thể.",
        },
        {
            question: "Có thể thanh toán bảo hiểm xe máy bằng Ví Trả Sau không?",
            answer:
                "Có! Mua bảo hiểm xe máy qua MoMo, bạn có thể sử dụng MoMo Ví Trả Sau để thanh toán sau 30-60 ngày mà không phải trả lãi suất (nếu thanh toán đúng hạn). Đây là lựa chọn thanh toán linh hoạt giúp bạn quản lý dòng tiền tốt hơn.",
        },
    ],
};
