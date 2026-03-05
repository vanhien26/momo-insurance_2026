import type { BreadcrumbItem } from "@/types/seo";

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-4 h-4 text-content-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {i === items.length - 1 ? (
              <span className="text-content-secondary font-medium">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-content-tertiary hover:text-momo-600 transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
