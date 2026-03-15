// BlogAuthorCard.tsx - Hiển thị thông tin tác giả
"use client";

import type { Author } from "@/types/blog";
import { Mail, Globe } from "lucide-react";

interface BlogAuthorCardProps {
  author: Author;
}

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <div className="bg-gradient-to-r from-momo-50 to-blue-50 rounded-2xl border border-momo-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {author.avatar && (
          <div className="w-24 h-24 rounded-full bg-white border-4 border-momo-100 flex-shrink-0 overflow-hidden">
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-black text-slate-900">{author.name}</h3>
          {author.role && <p className="text-sm text-momo-600 font-medium mt-1">{author.role}</p>}

          {author.bio && <p className="text-sm text-slate-600 mt-3 leading-relaxed">{author.bio}</p>}

          <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
            <a
              href="mailto:contact@momo.vn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-momo-300 hover:bg-momo-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Liên hệ
            </a>
            <a
              href="https://momo.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-momo-300 hover:bg-momo-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
