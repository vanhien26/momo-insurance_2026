// ShareButtons.tsx - Social sharing & CTA
"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  category: string;
}

export function ShareButtons({ title, url, category }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "f",
      color: "bg-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: "𝕏",
      color: "bg-black",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      color: "bg-blue-700",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-5 h-5 text-momo-600" />
        <h3 className="font-bold text-slate-900">Chia sẻ bài viết</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Chia sẻ trên ${link.name}`}
            className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center text-white font-bold hover:shadow-lg transition-all transform hover:scale-105`}
          >
            {link.icon}
          </a>
        ))}

        <button
          onClick={handleCopy}
          className="flex-1 md:flex-none px-4 py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Đã sao chép
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Sao chép link
            </>
          )}
        </button>
      </div>

      {/* Embedded CTA */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-600 mb-3">
          Bạn muốn mua bảo hiểm ô tô? Nhân viên MoMo sẽ hỗ trợ bạn:
        </p>
        <a
          href="/bao-hiem-o-to"
          className="inline-block w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-momo-500 to-momo-600 text-white font-bold text-center hover:shadow-lg transition-all"
        >
          So sánh giá & Mua ngay →
        </a>
      </div>
    </div>
  );
}
