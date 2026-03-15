// TableOfContents.tsx - Tự động sinh mục lục từ heading
"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  content: string;
  readingTime: number;
}

export function TableOfContents({ content, readingTime }: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Parse markdown headings
    const headings = content.match(/^## .+$/gm) || [];
    const toc: TOCItem[] = headings.map((heading, i) => {
      const text = heading.replace(/^## /, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { level: 2, text, id };
    });
    setItems(toc);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll("h2");
      for (const heading of headingElements) {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-8 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden max-h-[calc(100vh-100px)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 transition-colors border-b border-slate-200"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold text-slate-900">Nội dung</span>
          <span className="text-xs text-slate-500 mt-0.5">{readingTime} phút đọc</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav className="px-6 py-4 space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm py-2 px-3 rounded-lg transition-all ${
                activeId === item.id
                  ? "bg-momo-100 text-momo-700 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
