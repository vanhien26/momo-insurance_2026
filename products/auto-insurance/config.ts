import type { InsuranceProduct } from "@/types/insurance";
import providersData from "./data/providers.json";
import pricingData from "./data/pricing.json";
import brandsData from "./data/brands.json";
import provincesData from "./data/provinces.json";

const providers = providersData;
const allPricing = pricingData;

const vatChatPricing = allPricing["vat-chat"];
const batBuocPricing = allPricing["bat-buoc"];

export const autoInsuranceProduct: InsuranceProduct = {
  id: "auto-insurance",
  slug: "bao-hiem-o-to",
  name: "Bảo Hiểm Ô Tô",
  shortName: "BH Ô Tô",
  icon: "Car",
  description:
    "So sánh và mua bảo hiểm ô tô online từ 11 nhà bảo hiểm uy tín. Vật chất & TNDS bắt buộc. Phí từ 3.1 triệu/năm, bồi thường nhanh 24h.",

  types: [
    {
      slug: "vat-chat",
      name: "Bảo Hiểm Vật Chất",
      shortDesc:
        "Bảo vệ xe khỏi tai nạn, cháy nổ, mất cắp, thủy kích và hư hỏng. Tự nguyện nhưng cực kỳ cần thiết.",
      icon: "Shield",
      providers,
      pricingTiers: vatChatPricing,
    },
    {
      slug: "bat-buoc",
      name: "Bảo Hiểm TNDS Bắt Buộc",
      shortDesc:
        "Bắt buộc theo Luật. Bồi thường thiệt hại cho bên thứ ba khi xảy ra tai nạn giao thông.",
      icon: "FileCheck",
      providers: providers.slice(0, 8),
      pricingTiers: batBuocPricing,
    },
  ],

  seoVariables: {
    dimensions: [
      {
        dimension: "provider",
        slug: "provider",
        label: "Nhà bảo hiểm",
        data: providers.map((p) => ({
          slug: p.slug,
          name: p.name,
          meta: { rating: p.rating },
        })),
      },
      {
        dimension: "brand",
        slug: "brand",
        label: "Hãng xe",
        data: brandsData.map((b) => ({
          slug: b.slug,
          name: b.name,
          meta: { origin: b.meta.origin, segment: b.meta.segment },
        })),
      },
      {
        dimension: "province",
        slug: "province",
        label: "Tỉnh thành",
        data: provincesData.map((p) => ({
          slug: p.slug,
          name: p.name,
          meta: { region: p.meta.region, priority: p.meta.priority },
        })),
      },
    ],
    combinations: [
      {
        dims: ["provider", "brand"],
        urlPattern: "{provider}-{brand}",
        titlePattern: "BH ô tô {provider} cho xe {brand}",
        descPattern:
          "So sánh gói bảo hiểm ô tô {provider} dành cho xe {brand}. Báo giá online, mua qua MoMo.",
        priority: 0.5,
      },
    ],
  },

  metadata: {
    heroTitle: "Bảo hiểm ô tô thông minh",
    heroSubtitle:
      "So sánh 11 nhà bảo hiểm. Mua online trong 3 phút. Bồi thường nhanh 24h.",
    trustStats: [
      { value: "10M+", label: "Người dùng MoMo", icon: "Users" },
      { value: "11", label: "Nhà bảo hiểm uy tín", icon: "Building2" },
      { value: "24h", label: "Bồi thường nhanh", icon: "Clock" },
      { value: "100%", label: "Online, không giấy tờ", icon: "Smartphone" },
    ],
    ctaText: "Báo giá ngay",
    ctaHref: "/bao-hiem-o-to/vat-chat",
  },

  faqs: [
    {
      question: "Bảo hiểm ô tô vật chất là gì?",
      answer:
        "Bảo hiểm ô tô vật chất (hay bảo hiểm thân vỏ) bảo vệ xe của bạn khỏi thiệt hại do tai nạn, cháy nổ, thiên tai, mất cắp và các rủi ro khác. Đây là loại bảo hiểm tự nguyện nhưng rất cần thiết để bảo vệ tài sản.",
    },
    {
      question: "Phí bảo hiểm ô tô vật chất bao nhiêu tiền một năm?",
      answer:
        "Phí bảo hiểm ô tô vật chất thường từ 1% đến 2% giá trị xe/năm. Xe phổ thông (500 triệu - 1 tỷ) thường từ 3-8 triệu/năm. Phí phụ thuộc vào giá trị xe, đời xe, mục đích sử dụng và phạm vi bảo hiểm.",
    },
    {
      question: "Bảo hiểm TNDS ô tô bắt buộc khác gì bảo hiểm vật chất?",
      answer:
        "BH TNDS bắt buộc: theo luật, bồi thường cho người thứ ba bị thiệt hại. BH vật chất: tự nguyện, bồi thường cho chính xe của bạn. Nên mua cả hai để được bảo vệ toàn diện.",
    },
    {
      question: "Mua bảo hiểm ô tô online qua MoMo có uy tín không?",
      answer:
        "Hoàn toàn uy tín. MoMo là đại lý chính thức của 11 nhà bảo hiểm lớn nhất Việt Nam. Hợp đồng điện tử có giá trị pháp lý tương đương bản giấy. Bạn được hỗ trợ claim 24/7 qua app MoMo.",
    },
    {
      question: "Thời gian bồi thường bảo hiểm ô tô mất bao lâu?",
      answer:
        "Thông thường 7-15 ngày làm việc kể từ khi hồ sơ đầy đủ. Các nhà bảo hiểm lớn như Bảo Việt, Liberty, PVI cam kết giải quyết nhanh trong 24h với sự cố nhỏ. MoMo hỗ trợ theo dõi trạng thái claim realtime.",
    },
  ],
};
