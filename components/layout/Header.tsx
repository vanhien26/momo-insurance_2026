"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, X, Download, Smartphone, Menu, Shield } from "lucide-react";
import brands from "../../products/auto-insurance/data/brands.json";
import providers from "../../products/auto-insurance/data/providers.json";
import situations from "../../products/auto-insurance/data/situations.json";
import motoProviders from "../../products/moto-insurance/data/providers.json";

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
  const [showDownload, setShowDownload] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

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
    "/bao-hiem-xe-may": [
      { label: "Bảo hiểm tự nguyện", href: "/bao-hiem-xe-may" },
      {
        label: "Đối tác",
        href: "#",
        children: motoProviders.map((p: any) => ({ label: p.name, href: `/bao-hiem-xe-may/doi-tac/${p.slug}` }))
      },
    ],
    "/bao-hiem": [
      { label: "Ô tô", href: "/bao-hiem-o-to" },
      { label: "Xe máy", href: "/bao-hiem-xe-may" },
      { label: "Y tế", href: "/bao-hiem-y-te" },
      { label: "Sức khỏe+", href: "/bao-hiem-suc-khoe" },
      { label: "Xã hội", href: "/bao-hiem-xa-hoi" },
    ]
  };

  const activeKey = Object.keys(navigation).find((key) => pathname?.startsWith(key)) || "/bao-hiem";
  const menuItems = navigation[activeKey];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="container mx-auto h-16 md:h-20 flex items-center justify-between lg:justify-start">
          {/* Logo and Brand */}
          <Link href="/bao-hiem" className="flex items-center gap-2.5 flex-shrink-0">
            <Image src="/images/momo-logo.webp" alt="MoMo Logo" width={40} height={40} className="object-contain rounded-xl" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-5 h-5 text-momo-500" />
              <span className="font-bold text-lg text-slate-900"><span className="text-momo-500">Bảo Hiểm</span></span>
            </div>
          </Link>

          {/* Desktop Navigation - centered */}
          <nav className="hidden lg:flex items-center gap-6 h-full flex-1 ml-12">
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

          {/* Download Button - center on desktop, hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <button
              onClick={() => setShowDownload(true)}
              className="flex items-center gap-2 bg-momo-500 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-momo-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Tải ứng dụng MoMo
            </button>
          </div>

          {/* Right side - Mobile menu and mobile download button */}
          <div className="lg:hidden flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowDownload(true)}
              className="flex items-center justify-center w-10 h-10 bg-momo-500 text-white rounded-full hover:bg-momo-600 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="flex items-center justify-center p-2"
            >
              <Menu className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {openMobileMenu && (
          <div className="lg:hidden bg-white border-t border-slate-100 animate-slide-up">
            <nav className="container mx-auto py-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <Link 
                    href={item.href} 
                    onClick={() => setOpenMobileMenu(false)}
                    className={`block px-4 py-3 text-sm font-bold ${pathname === item.href ? "text-momo-500 bg-pink-50" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="bg-slate-50 pl-4">
                      {item.children.map((child) => (
                        <Link 
                          key={child.label} 
                          href={child.href}
                          onClick={() => setOpenMobileMenu(false)}
                          className="block px-4 py-2.5 text-xs text-slate-600 hover:text-momo-500"
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
        )}
      </header>

      {/* Download Modal */}
      {showDownload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDownload(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
            {/* Close */}
            <button
              onClick={() => setShowDownload(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-momo-500 to-momo-700 px-8 pt-8 pb-10 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Image src="/images/momo-logo.webp" alt="MoMo" width={40} height={40} className="rounded-xl" />
              </div>
              <h3 className="text-xl font-black text-white mb-1">Tải ứng dụng MoMo</h3>
              <p className="text-sm text-white/70">Quét mã QR hoặc tải từ cửa hàng ứng dụng</p>
            </div>

            {/* Content */}
            <div className="px-8 py-8 -mt-4 bg-white rounded-t-3xl relative">
              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-white border-2 border-slate-100 rounded-2xl p-2 shadow-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://momo.vn/download&color=d82f8b"
                    alt="QR Code tải MoMo"
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <p className="text-center text-xs text-slate-400 mb-6">
                Quét mã QR bằng camera điện thoại để tải app
              </p>

              {/* Store buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://apps.apple.com/vn/app/momo-chuy%E1%BB%83n-ti%E1%BB%81n-thanh-to%C3%A1n/id918751511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] opacity-70 leading-none">Tải về trên</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.mservice.momotransfer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] opacity-70 leading-none">Tải về trên</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}