interface ContentBlockProps {
  title: string;
  paragraphs: string[];
  className?: string;
}

/**
 * Generic rich content block for SEO/GEO
 * Use for unique, valuable content on each page
 */
export function ContentBlock({
  title,
  paragraphs,
  className = "",
}: ContentBlockProps) {
  return (
    <section className={`py-12 lg:py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          {title}
        </h2>
        <div className="prose prose-slate max-w-none space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-slate-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
