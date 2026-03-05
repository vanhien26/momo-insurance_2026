import { InsuranceProduct } from "@/types/insurance";
import providersData from "./data/providers.json";
import pricingData from "./data/pricing.json";
import brandsData from "./data/brands.json";
import provincesData from "./data/provinces.json";

/**
 * CONFIGURATION CHI TIẾT - BẢO HIỂM Ô TÔ MOMO
 * File này đóng vai trò là "Source of Truth" cho toàn bộ Platform.
 * Được thiết kế để Cursor và Vercel có thể hiểu và tự động sinh trang (pSEO).
 */

const providers = providersData;
const allPricing = pricingData as any;

const vatChatPricing = allPricing["vat-chat"];
const batBuocPricing = allPricing["bat-buoc"];

export const autoInsuranceProduct: InsuranceProduct = {
  id: "auto-insurance",
  slug: "bao-hiem-o-to",
  name: "Bảo Hiểm Ô Tô",
  shortName: "BH Ô Tô",
  icon: "Car",
  description:
    "So sánh và mua bảo hiểm ô tô online từ 11 nhà bảo hiểm uy tín (PVI, Bảo Việt, MIC...). Ưu đãi tới 20%, cấp đơn siêu tốc 5 phút và hỗ trợ bồi thường 24/7 qua MoMo.",

  // 1. Phân loại sản phẩm (Product Types)
  types: [
    {
      slug: "vat-chat",
      name: "Bảo Hiểm Vật Chất",
      shortDesc:
        "Bảo vệ xế yêu khỏi tai nạn, cháy nổ, thủy kích và mất cắp. Giải pháp an tâm tuyệt đối cho chủ xe.",
      icon: "Shield",
      providers,
      pricingTiers: vatChatPricing,
    },
    {
      slug: "bat-buoc",
      name: "Bảo Hiểm TNDS Bắt Buộc",
      shortDesc:
        "Tuân thủ Luật Giao thông, bảo vệ tài chính trước các rủi ro bồi thường cho bên thứ ba.",
      icon: "FileCheck",
      providers: providers.slice(0, 8), // Giả định chỉ 8 nhà cung cấp bán gói bắt buộc
      pricingTiers: batBuocPricing,
    },
  ],

  // 2. Ma trận pSEO (Programmatic SEO Matrix)
  // Hệ thống sẽ dựa vào đây để tạo ra ~327 trang tự động
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
      {
        dimension: "brand",
        slug: "hang-xe",
        label: "Hãng xe",
        data: brandsData.map((b: any) => ({
          slug: b.slug,
          name: b.name,
          meta: { origin: b.meta.origin, segment: b.meta.segment },
        })),
      },
      {
        dimension: "province",
        slug: "tinh-thanh",
        label: "Tỉnh thành",
        data: provincesData.map((p: any) => ({
          slug: p.slug,
          name: p.name,
          meta: { region: p.meta.region, priority: p.meta.priority },
        })),
      },
    ],
    // Các mẫu tiêu đề và mô tả cho trang pSEO (SEO Templates)
    combinations: [
      {
        dims: ["brand"],
        urlPattern: "cho-xe-{brand}",
        titlePattern: "Bảo hiểm vật chất xe {brand} - Ưu đãi 20% trên MoMo",
        descPattern: "Mua bảo hiểm ô tô cho xe {brand} online. So sánh báo giá từ 11 nhà bảo hiểm uy tín, hỗ trợ bồi thường nhanh 24h.",
        priority: 1.0,
      },
      {
        dims: ["province"],
        urlPattern: "tai-{province}",
        titlePattern: "Mua bảo hiểm ô tô tại {province} - Cấp đơn trong 5 phút",
        descPattern: "Dịch vụ bảo hiểm ô tô trực tuyến tốt nhất tại {province}. So sánh giá PVI, Bảo Việt, MIC ngay trên MoMo.",
        priority: 0.8,
      },
      {
        dims: ["provider"],
        urlPattern: "review-{provider}",
        titlePattern: "Đánh giá bảo hiểm ô tô {provider} - Có nên mua không?",
        descPattern: "Review chi tiết quyền lợi, mức phí và dịch vụ bồi thường của {provider}. Đăng ký mua qua MoMo để nhận voucher giảm giá.",
        priority: 0.7,
      }
    ],
  },

  // 3. Metadata & Content Hub (Dùng cho trang chủ momo.vn/bao-hiem-o-to)
  metadata: {
    heroTitle: "Bảo hiểm ô tô trực tuyến",
    heroSubtitle:
      "So sánh 11 nhà bảo hiểm hàng đầu Việt Nam. Cấp đơn siêu tốc, quản lý dễ dàng trên siêu ứng dụng MoMo.",
    trustStats: [
      { value: "1.5M+", label: "Hợp đồng đã cấp", icon: "Users" },
      { value: "11", label: "Đối tác uy tín", icon: "Building2" },
      { value: "5 phút", label: "Cấp đơn điện tử", icon: "Zap" },
      { value: "24/7", label: "Hỗ trợ bồi thường", icon: "Clock" },
    ],
    ctaText: "Xem báo giá ngay",
    ctaHref: "/bao-hiem-o-to/vat-chat",
  },

  // 4. Content Templates (Dùng cho kỹ thuật Content Spinning)
  // Giúp tạo nội dung độc nhất cho mỗi trang pSEO
  contentTemplates: {
    hero: {
      title: "Bảo hiểm ô tô {value}",
      subtitle: "Giải pháp bảo vệ toàn diện cho xế yêu tại {context}. So sánh {providerCount} nhà bảo hiểm ngay."
    },
    benefitSection: [
      "Bồi thường nhanh chóng cho dòng xe {brand} tại hệ thống Garage liên kết toàn quốc.",
      "Cấp đơn bảo hiểm điện tử tại {province} có giá trị pháp lý tương đương bản cứng.",
      "Mức phí cạnh tranh nhất từ {provider} dành riêng cho người dùng MoMo."
    ]
  },

  // 5. Câu hỏi thường gặp (Tối ưu SEO FAQ Schema)
  faqs: [
    {
      question: "Bảo hiểm vật chất ô tô là gì?",
      answer:
        "Bảo hiểm vật chất ô tô (hay bảo hiểm thân vỏ) bảo vệ xe của bạn khỏi thiệt hại do tai nạn, cháy nổ, thiên tai, mất cắp bộ phận và thủy kích. Đây là giải pháp bảo vệ tài sản quan trọng nhất cho chủ xe.",
    },
    {
      question: "Phí bảo hiểm vật chất ô tô tính như thế nào?",
      answer:
        "Mức phí thường dao động từ 1.1% - 1.8% giá trị xe tùy theo đời xe, hãng xe và phạm vi bảo hiểm (có thủy kích hay không). Trên MoMo, bạn có thể xem báo giá chính xác chỉ sau 30 giây nhập thông tin.",
    },
    {
      question: "Mua bảo hiểm trên MoMo có nhận được giấy chứng nhận giấy không?",
      answer:
        "MoMo cung cấp Giấy chứng nhận bảo hiểm điện tử theo Nghị định 03/2021/NĐ-CP, có giá trị pháp lý hoàn toàn tương đương bản giấy. Bạn có thể xuất trình ngay trên ứng dụng khi cần thiết.",
    },
    {
      question: "Làm sao để được hỗ trợ bồi thường khi gặp sự cố?",
      answer:
        "Bạn chỉ cần mở App MoMo, vào mục 'Lịch sử mua hàng' hoặc 'Trung tâm bồi thường' để gửi yêu cầu. MoMo và đội ngũ giám định viên của nhà bảo hiểm sẽ hỗ trợ bạn trực tuyến và hướng dẫn đưa xe vào Garage gần nhất.",
    },
    {
      question: "Tôi có được chọn Garage sửa chữa không?",
      answer:
        "Đa số các gói bảo hiểm trên MoMo đều bao gồm quyền lợi 'Tự chọn cơ sở sửa chữa' (Garage chính hãng). Bạn nên kiểm tra chi tiết này trong bảng so sánh quyền lợi trước khi thanh toán.",
    },
  ],
};