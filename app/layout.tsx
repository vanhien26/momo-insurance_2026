import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bảo hiểm ô tô MoMo - So sánh báo giá từ 11+ nhà bảo hiểm",
  description: "Giải pháp bảo vệ xế yêu toàn diện. So sánh báo giá từ Bảo Việt, PVI, MIC... ngay trên MoMo.",
  icons: {
    icon: "/images/momo-logo.webp",
    apple: "/images/momo-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}