import Link from "next/link";
import type { BreadcrumbItem } from "@/types/seo";

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 md:py-4"
    >
      <div className="container mx-auto">
        <ol className="flex items-center flex-wrap gap-2 text-xs md:text-sm">
          {/* Item mặc định: Trang chủ hoặc Bảo hiểm */}
          <li className="flex items-center gap-2">
            <Link
              href="/bao-hiem"
              className="text-slate-400 hover:text-momo-500 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">Bảo hiểm</span>
            </Link>
          </li>

          {items.map((item, i) => (
            <li key={item.href || i} className="flex items-center gap-2 min-w-0">
              <svg
                className="w-3.5 h-3.5 text-slate-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {i === items.length - 1 ? (
                <span className="text-slate-900 font-semibold truncate">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="text-slate-500 hover:text-momo-500 transition-colors whitespace-nowrap truncate"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}