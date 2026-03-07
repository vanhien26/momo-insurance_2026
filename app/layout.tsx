import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap", // Tối ưu LCP: Hiển thị chữ ngay lập tức
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bảo hiểm ô tô MoMo - So sánh báo giá từ 11+ nhà bảo hiểm",
  description: "Giải pháp bảo vệ xế yêu toàn diện. So sánh báo giá từ Bảo Việt, PVI, MIC... ngay trên MoMo.",
  icons: {
    icon: "/momo-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-slate-900`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}