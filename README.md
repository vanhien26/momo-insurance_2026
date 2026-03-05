# MoMo Insurance Web Platform

Marketing + conversion website kết hợp programmatic SEO cho các sản phẩm bảo hiểm MoMo.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **Deploy**: Vercel (SSG/ISR)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/bao-hiem](http://localhost:3000/bao-hiem)

## Architecture

Xem chi tiết trong `momo-insurance-architecture.docx`.

### Registry Pattern

Mỗi sản phẩm bảo hiểm là một "plugin" tự đăng ký vào registry:

```
products/auto-insurance/index.ts → registry.register(autoInsuranceProduct)
```

### URL Structure (Hub & Spoke)

```
/bao-hiem                           → Master Hub
/bao-hiem-o-to                      → Product Hub
/bao-hiem-o-to/vat-chat             → Product Type (Form + Compare)
/bao-hiem-o-to/vat-chat/bao-viet    → pSEO: Provider page
/bao-hiem-o-to/vat-chat/toyota      → pSEO: Brand page
/bao-hiem-o-to/vat-chat/ho-chi-minh → pSEO: Province page
/bao-hiem-o-to/blog                 → Blog listing
/bao-hiem-o-to/blog/[slug]          → Blog post
```

### Thêm sản phẩm mới

1. Copy `products/_template/` → `products/[ten-san-pham]/`
2. Sửa `config.ts` với thông tin sản phẩm
3. Tạo mock data trong `data/`
4. Gọi `registry.register()` trong `index.ts`
5. Build → tất cả routes tự động generate

**Zero refactor** — không sửa file nào trong `app/`, `components/`, hay `lib/`.

## Folder Structure

```
├── app/                    # Next.js routes
├── products/               # Product modules (plugins)
│   ├── auto-insurance/     # BH Ô tô (MVP)
│   └── _template/          # Scaffold cho product mới
├── components/
│   ├── insurance/          # Shared insurance components
│   ├── ui/                 # Base UI (Button, Card, Input...)
│   └── layout/             # Header, Footer
├── lib/                    # Registry, SEO, analytics
├── types/                  # TypeScript interfaces
└── content/blog/           # MDX blog content
```

## Pages Generated (MVP)

~327 pages từ variable matrix:
- 11 nhà bảo hiểm × 2 types = 22 provider pages
- 12 hãng xe × 2 types = 24 brand pages
- 15 tỉnh thành × 2 types = 30 province pages (P0-P2)
- Hub + Type + Blog = ~10 pages
- Combo pages (provider × brand) = 132 pages

## License

Proprietary — MoMo / M_Service
