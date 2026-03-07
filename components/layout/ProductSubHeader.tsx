"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

// Tự động lấy dữ liệu từ các file json bạn đã upload
import brands from "../../products/auto-insurance/data/brands.json";
import providers from "../../products/auto-insurance/data/providers.json";

export default function ProductSubHeader() {
  const pathname = usePathname();

  // Cấu hình Menu trực tiếp trong code để đảm bảo "bắt" được 100%
  const navigation = {
    "/bao-hiem-o-to": [
      { label: "Vật chất", href: "/bao-hiem-o-to/vat-chat" },
      { label: "TNDS Bắt buộc", href: "/bao-hiem-o-to/tnds" },
      { label: "Blog", href: "/bao-hiem-o-to/blog" },
      {
        label: "Hãng xe",
        href: "#",
        children: brands.map(b => ({ label: b.name, href: `/bao-hiem-o-to/vat-chat/${b.slug}` }))
      },
      {
        label: "Đối tác",
        href: "#",
        children: providers.map(p => ({ label: p.name, href: `/bao-hiem-o-to/doi-tac/${p.slug}` }))
      },
    ]
  };

  // Logic kiểm tra URL
  const activeKey = Object.keys(navigation).find((key) => pathname.startsWith(key)) as keyof typeof navigation;
  const menuItems = navigation[activeKey] || [];

  if (menuItems.length === 0) return null;

  return (
    <div className="bg-white border-b border-slate-100 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-6 h-14 overflow-x-auto no-scrollbar">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group h-full flex items-center whitespace-nowrap">
              <Link
                href={item.href}
                className={`flex items-center gap-1 text-sm font-bold transition-colors ${
                  pathname === item.href ? "text-[#D82D8B]" : "text-slate-600 hover:text-[#D82D8B]"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4 opacity-40" />}
              </Link>

              {item.children && (
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-2xl rounded-b-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50 grid grid-cols-1 gap-1">
                  {item.children.slice(0, 10).map((child) => ( // Giới hạn 10 item để không quá dài
                    <Link
                      key={child.label}
                      href={child.href}
                      className="px-5 py-2 text-sm text-slate-600 hover:bg-pink-50 hover:text-[#D82D8B] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}