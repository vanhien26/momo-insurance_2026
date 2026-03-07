// BlogLinkStrategy.ts - Hướng dẫn tối ưu link building tự động

/**
 * LINK BUILDING AUTOMATION STRATEGY
 * 
 * 1. INTERNAL LINKING (Nội liên)
 * - Mỗi bài blog nên link đến 3-5 trang sản phẩm
 * - Sử dụng RelatedProductsBlock để link đến các sản phẩm tương quan
 * - Tracking: LinkBuildingTracker ghi lại mỗi link
 * 
 * 2. CONTEXTUAL LINKING
 * - Link các keyword relevant ngay trong nội dung bài viết
 * - Ví dụ: "Bảo hiểm vật chất" → /bao-hiem-o-to/vat-chat
 * - Sử dụng CalloutBox & Markdown links
 * 
 * 3. RELATED CONTENT BLOCKING  
 * - Related posts (3 bài min)
 * - Cross-category recommendations
 * - Author bio + external social links
 * 
 * 4. SHARING & AMPLIFICATION
 * - ShareButtons cho viral potential (SEO signal)
 * - Social links tự động generate OpenGraph
 * - Tracking: GA4, UTM parameters
 * 
 * 5. SEO SIGNALS
 * - TableOfContents: Better UX → Lower bounce rate
 * - Structured Data (Schema): Google richsnippets
 * - Reading time: User engagement metric
 * - Word count: Content depth signal
 */

export interface LinkBuildingStrategy {
  minimum_internal_links: number; // 3-5
  minimum_related_posts: number; // 3
  use_contextual_anchors: boolean;
  require_schema_markup: boolean;
  track_external_outbound: boolean;
}

export const RECOMMENDED_BLOG_STRATEGY: LinkBuildingStrategy = {
  minimum_internal_links: 4,
  minimum_related_posts: 3,
  use_contextual_anchors: true,
  require_schema_markup: true,
  track_external_outbound: true,
};

/**
 * CHECKLIST cho mỗi bài blog
 */
export const BLOG_POST_SEO_CHECKLIST = [
  "✅ Meta title (55-60 chars)",
  "✅ Meta description (155-160 chars)",
  "✅ H1 unique & clear",
  "✅ Table of Contents generated",
  "✅ Image with alt text",
  "✅ Internal links (3-5 contextual)",
  "✅ Related products block",
  "✅ Related posts (3+ min)",
  "✅ Schema markup (BlogPosting)",
  "✅ Reading time accurate",
  "✅ Tags/Keywords (5-8)",
  "✅ Social share buttons",
  "✅ Author card & bio",
  "✅ CTA button to product",
  "✅ Mobile responsive",
];

/**
 * AUTOMATION HOOKS
 * Thêm vào data.ts để auto-track:
 */
export const automationExample = `
// Trong blog/data.ts
import { linkTracker } from "@/lib/link-building";

export const AUTO_INSURANCE_BLOG_POSTS = [
  // ... existing posts
];

// Hook: Khi deploy blog post mới
export function trackBlogPostLinks(post: BlogPost) {
  // Tự động parse internal links từ markdown
  const internalLinks = parseMarkdownLinks(post.content);
  internalLinks.forEach(link => {
    linkTracker.addLink({
      fromSlug: post.slug,
      toUrl: link.url,
      linkText: link.text,
      type: 'internal',
      category: link.category || 'blog'
    });
  });
}

// Hook: Generate link suggestions
export function suggestMissingLinks(post: BlogPost) {
  const suggestions = linkTracker.suggestInternalLinks(
    post.slug,
    AUTO_INSURANCE_BLOG_POSTS
  );
  return suggestions; // Manual review before adding
}
`;

/**
 * LINKING BEST PRACTICES
 */
export const LINKING_GUIDELINES = {
  anchor_text: [
    "✅ Descriptive: 'Bảo hiểm vật chất'",
    "❌ Generic: 'Click here', 'Read more'",
    "✅ Branded: 'MoMo bảo hiểm'",
  ],
  link_placement: [
    "◆ First paragraph (high priority)",
    "◆ Mid-content (contextual match)",
    "◆ Related section (bottom of page)",
  ],
  link_frequency: [
    "◆ 2-3 per 1000 words",
    "◆ Max 1 link per paragraph",
    "◆ Avoid link spam",
  ],
  tracking: [
    "◆ UTM parameters for GA4",
    "◆ Click tracking with hotjar",
    "◆ Internal link report monthly",
  ],
};
