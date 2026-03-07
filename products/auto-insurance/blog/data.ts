import type { BlogCategory, BlogPost } from "@/types/blog";

export const AUTO_INSURANCE_BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "huong-dan",
    name: "Hướng dẫn",
    description: "Bài hướng dẫn mua & sử dụng bảo hiểm ô tô",
  },
  {
    slug: "kien-thuc",
    name: "Kiến thức",
    description: "Giải thích khái niệm, quyền lợi, điều khoản phổ biến",
  },
  {
    slug: "phap-ly",
    name: "Pháp lý",
    description: "Quy định, giấy tờ và lưu ý khi tham gia bảo hiểm",
  },
  {
    slug: "kinh-nghiem",
    name: "Kinh nghiệm",
    description: "Tips chọn gói phù hợp, tối ưu chi phí và bồi thường",
  },
];

const AUTHOR = {
  name: "MoMo Insurance",
  role: "Biên tập",
};

export const AUTO_INSURANCE_BLOG_POSTS: BlogPost[] = [
  {
    productSlug: "bao-hiem-o-to",
    slug: "bao-hiem-vat-chat-la-gi",
    title: "Bảo hiểm vật chất ô tô là gì? Nên mua khi nào?",
    excerpt:
      "Giải thích dễ hiểu về bảo hiểm vật chất (thân vỏ), phạm vi bảo vệ, các quyền lợi thường gặp và gợi ý thời điểm nên mua.",
    category: "kien-thuc",
    tags: ["vật chất", "thân vỏ", "quyền lợi"],
    coverImage: "/images/blog/auto/vat-chat.jpg",
    author: AUTHOR,
    publishedAt: "2026-03-01",
    readingTime: 6,
    content: `
## Bảo hiểm vật chất ô tô là gì?

Bảo hiểm vật chất ô tô (thường gọi là **bảo hiểm thân vỏ**) là loại bảo hiểm giúp chi trả chi phí sửa chữa/khắc phục thiệt hại của **chính chiếc xe của bạn** khi xảy ra rủi ro.

## Bảo hiểm vật chất thường bảo vệ những gì?

- Tai nạn, va chạm
- Cháy nổ
- Thiên tai (ngập nước, bão…)
- Mất cắp toàn bộ (tùy gói)
- Quyền lợi mở rộng: **thủy kích**, kính xe, trầy xước…

## Nên mua khi nào?

- Xe mới hoặc giá trị cao
- Bạn di chuyển nhiều trong đô thị đông xe
- Khu vực thường mưa lớn / ngập nước

## Mẹo chọn gói nhanh

1. Chọn phạm vi bảo hiểm phù hợp (có/không thủy kích)
2. So sánh mức **miễn thường** và điều khoản garage
3. Ưu tiên gói có hỗ trợ cứu hộ 24/7 nếu bạn đi nhiều
`,
  },
  {
    productSlug: "bao-hiem-o-to",
    slug: "tnds-bat-buoc-can-giay-to-gi",
    title: "TNDS bắt buộc: cần giấy tờ gì và mua ở đâu nhanh?",
    excerpt:
      "Danh sách giấy tờ cần chuẩn bị khi mua TNDS bắt buộc, lưu ý thông tin trên chứng nhận và cách mua online nhanh trên MoMo.",
    category: "phap-ly",
    tags: ["tnds", "bắt buộc", "giấy tờ"],
    coverImage: "/images/blog/auto/tnds.jpg",
    author: AUTHOR,
    publishedAt: "2026-03-02",
    readingTime: 5,
    content: `
## TNDS bắt buộc là gì?

TNDS bắt buộc là loại bảo hiểm theo quy định, nhằm bồi thường cho **bên thứ ba** khi chủ xe gây tai nạn.

## Cần giấy tờ gì?

Thông thường bạn cần:

- Biển số xe (hoặc đăng ký xe)
- Thông tin chủ xe (họ tên, số điện thoại)
- Loại xe / số chỗ

## Lưu ý khi nhận chứng nhận

- Kiểm tra đúng **biển số**, **thời hạn** và **loại xe**
- Lưu bản điện tử để xuất trình khi cần

## Mua ở đâu nhanh?

Bạn có thể mua online để tiết kiệm thời gian, nhận chứng nhận điện tử và quản lý ngay trên ứng dụng.
`,
  },
  {
    productSlug: "bao-hiem-o-to",
    slug: "thuy-kich-la-gi-co-nen-mua-khong",
    title: "Thủy kích là gì? Có nên mua điều khoản thủy kích?",
    excerpt:
      "Thủy kích là rủi ro thường gặp mùa mưa. Bài viết giúp bạn hiểu thủy kích, dấu hiệu, chi phí và cách chọn điều khoản phù hợp.",
    category: "kien-thuc",
    tags: ["thủy kích", "ngập nước", "mùa mưa"],
    coverImage: "/images/blog/auto/thuy-kich.jpg",
    author: AUTHOR,
    publishedAt: "2026-03-03",
    readingTime: 7,
    content: `
## Thủy kích là gì?

**Thủy kích** xảy ra khi nước lọt vào buồng đốt khiến động cơ bị hỏng nặng. Rủi ro này dễ gặp khi xe đi vào vùng ngập.

## Khi nào nên mua thủy kích?

- Bạn thường đi qua khu vực hay ngập
- Xe có động cơ giá trị cao
- Mùa mưa ở khu vực bạn sống kéo dài

## Lưu ý quan trọng

- Không cố khởi động lại xe khi bị ngập
- Gọi cứu hộ và thông báo nhà bảo hiểm càng sớm càng tốt
`,
  },
  {
    productSlug: "bao-hiem-o-to",
    slug: "huong-dan-bao-lanh-sua-chua-garage",
    title: "Hướng dẫn bảo lãnh sửa chữa tại garage: quy trình 5 bước",
    excerpt:
      "Quy trình bảo lãnh sửa chữa giúp bạn giảm áp lực tài chính khi xe gặp sự cố. Cùng xem 5 bước phổ biến và các lưu ý.",
    category: "huong-dan",
    tags: ["bảo lãnh", "garage", "bồi thường"],
    coverImage: "/images/blog/auto/garage.jpg",
    author: AUTHOR,
    publishedAt: "2026-03-04",
    readingTime: 6,
    content: `
## Bảo lãnh sửa chữa là gì?

Bảo lãnh sửa chữa nghĩa là nhà bảo hiểm/đối tác thanh toán trực tiếp (một phần hoặc toàn bộ) cho garage theo phạm vi hợp đồng.

## Quy trình tham khảo (5 bước)

1. Thông báo sự cố & chụp hiện trường
2. Đưa xe đến garage liên kết (hoặc theo điều khoản)
3. Giám định & lập phương án sửa chữa
4. Xác nhận bảo lãnh / tạm ứng
5. Nhận xe & đối chiếu hóa đơn

## Mẹo giúp xử lý nhanh

- Chuẩn bị giấy tờ xe và ảnh hiện trường rõ ràng
- Giữ liên lạc với giám định viên/CSKH
`,
  },
  {
    productSlug: "bao-hiem-o-to",
    slug: "kinh-nghiem-chon-goi-phu-hop",
    title: "Kinh nghiệm chọn gói bảo hiểm ô tô phù hợp theo nhu cầu",
    excerpt:
      "Không có gói “tốt nhất” cho mọi người. Bài viết gợi ý cách chọn theo nhu cầu: đi ít/đi nhiều, xe mới/xe cũ, ngân sách.",
    category: "kinh-nghiem",
    tags: ["so sánh", "tối ưu chi phí", "chọn gói"],
    coverImage: "/images/blog/auto/chon-goi.jpg",
    author: AUTHOR,
    publishedAt: "2026-03-05",
    readingTime: 8,
    content: `
## 1) Xe mới / giá trị cao

- Ưu tiên gói phạm vi rộng (tai nạn, thiên tai, mất cắp)
- Cân nhắc thêm thủy kích nếu khu vực hay ngập

## 2) Xe cũ / ngân sách giới hạn

- Chọn gói cơ bản + miễn thường hợp lý để tối ưu phí

## 3) Đi nhiều đường dài

- Ưu tiên có cứu hộ 24/7, xe thay thế (nếu có)

## 4) Mẹo so sánh nhanh

- So sánh **phí**, **miễn thường**, **quyền lợi** và **điều khoản garage**
- Đọc kỹ phần loại trừ
`,
  },
];

export function getAutoInsuranceBlogPosts(productSlug: string) {
  return AUTO_INSURANCE_BLOG_POSTS.filter((p) => p.productSlug === productSlug);
}

export function getAutoInsuranceBlogCategoriesForPosts(posts: BlogPost[]) {
  const set = new Set(posts.map((p) => p.category));
  return AUTO_INSURANCE_BLOG_CATEGORIES.filter((c) => set.has(c.slug));
}

export function getAutoInsurancePostBySlug(productSlug: string, slug: string) {
  return AUTO_INSURANCE_BLOG_POSTS.find(
    (p) => p.productSlug === productSlug && p.slug === slug
  );
}

