// RecordLinksData.ts - Automation: Track internal links for analytics & SEO
/**
 * LINK BUILDING AUTOMATION
 * Tự động theo dõi internal links, external links, và generate sitemap dữ liệu
 * Giúp:
 * - Tối ưu hóa link structure
 * - Theo dõi internal linking strategy
 * - Identify orphaned pages
 * - Generate link building reports
 */

export interface LinkRecord {
  fromSlug: string;
  toUrl: string;
  linkText: string;
  type: "internal" | "external";
  category: "product" | "blog" | "guide" | "cta";
  context?: string;
}

export interface LinkBuildingMetrics {
  totalInternalLinks: number;
  totalExternalLinks: number;
  orphanedPages: string[];
  pageRankByLinks: Array<{ slug: string; linkCount: number }>;
  categoryLinkDistribution: Record<string, number>;
}

export class LinkBuildingTracker {
  private links: LinkRecord[] = [];

  addLink(record: LinkRecord) {
    this.links.push(record);
  }

  /**
   * Phát hiện các trang không có internal links trỏ đến
   */
  findOrphanedPages(allPages: string[]): string[] {
    const linkedPages = new Set(
      this.links.filter((l) => l.type === "internal").map((l) => l.toUrl)
    );
    return allPages.filter((page) => !linkedPages.has(page));
  }

  /**
   * Tính toán page importance dựa trên số lượng internal links
   */
  calculatePageRank(): Array<{ slug: string; linkCount: number }> {
    const linkCount: Record<string, number> = {};
    this.links
      .filter((l) => l.type === "internal")
      .forEach((l) => {
        linkCount[l.toUrl] = (linkCount[l.toUrl] || 0) + 1;
      });

    return Object.entries(linkCount)
      .sort(([, a], [, b]) => b - a)
      .map(([slug, count]) => ({ slug, linkCount: count }));
  }

  /**
   * Phân tích link distribution theo category
   */
  getMetrics(): LinkBuildingMetrics {
    const categoryDist: Record<string, number> = {};
    this.links.forEach((l) => {
      categoryDist[l.category] = (categoryDist[l.category] || 0) + 1;
    });

    return {
      totalInternalLinks: this.links.filter((l) => l.type === "internal").length,
      totalExternalLinks: this.links.filter((l) => l.type === "external").length,
      orphanedPages: [],
      pageRankByLinks: this.calculatePageRank(),
      categoryLinkDistribution: categoryDist,
    };
  }

  /**
   * Generate suggestions for internal linking
   */
  suggestInternalLinks(fromSlug: string, allPosts: any[]): { slug: string; title: string }[] {
    const suggestions: { slug: string; title: string }[] = [];
    // Logic để tìm các bài viết liên quan chưa được link
    return suggestions;
  }
}

// Export global instance
export const linkTracker = new LinkBuildingTracker();
