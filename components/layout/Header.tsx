"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";
import brands from "../../products/auto-insurance/data/brands.json";
import providers from "../../products/auto-insurance/data/providers.json";
import situations from "../../products/auto-insurance/data/situations.json";

// ĐỊNH NGHĨA KIỂU DỮ LIỆU ĐỂ HẾT BÁO ĐỎ
interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export default function Header() {
  const pathname = usePathname();

  const navigation: Record<string, NavItem[]> = {
    "/bao-hiem-o-to": [
      { label: "Vật chất", href: "/bao-hiem-o-to/vat-chat" },
      { label: "TNDS Bắt buộc", href: "/bao-hiem-o-to/bat-buoc" },
      { label: "Blog", href: "/bao-hiem-o-to/blog" },
      {
        label: "Tình Huống",
        href: "/bao-hiem-o-to/vat-chat/tinh-huong",
        children: (situations as any).slice(0, 8).map((s: any) => ({ label: s.name, href: `/bao-hiem-o-to/vat-chat/tinh-huong/${s.slug}` }))
      },
      {
        label: "Hãng xe",
        href: "#",
        children: brands ? brands.slice(0, 10).map((b: any) => ({ label: b.name, href: `/bao-hiem-o-to/vat-chat/${b.slug}` })) : []
      },
      {
        label: "Đối tác",
        href: "#",
        children: providers ? providers.slice(0, 10).map((p: any) => ({ label: p.name, href: `/bao-hiem-o-to/vat-chat/${p.slug}` })) : []
      },
    ],
    "/bao-hiem": [
      { label: "Bảo hiểm Ô tô", href: "/bao-hiem-o-to" },
      { label: "Bảo hiểm Xe máy", href: "/bao-hiem-xe-may" },
    ]
  };

  const activeKey = Object.keys(navigation).find((key) => pathname?.startsWith(key)) || "/bao-hiem";
  const menuItems = navigation[activeKey];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/bao-hiem" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-momo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
          <span className="font-bold text-lg text-slate-900 hidden sm:block"><span className="text-momo-500">Bảo Hiểm</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 h-full">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group h-full flex items-center">
              <Link href={item.href} className={`flex items-center gap-1 text-sm font-bold ${pathname === item.href ? "text-momo-500" : "text-slate-600 hover:text-momo-500"}`}>
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4 opacity-40 group-hover:rotate-180 transition-all" />}
              </Link>
              {item.children && item.children.length > 0 && (
                <div className="absolute top-[75%] left-0 w-60 bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} className="block px-5 py-2.5 text-sm text-slate-600 hover:bg-pink-50 hover:text-momo-500">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link href="/bao-hiem-o-to/vat-chat" className="bg-momo-500 text-white text-sm font-bold px-6 py-2.5 rounded-full">Báo giá ngay</Link>
      </div>
    </header>
  );
}