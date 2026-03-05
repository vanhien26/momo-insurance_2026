import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Chuyển sang Inter để ổn định trên Next 14
import "./globals.css";

// Khởi tạo font Inter
const inter = Inter({
  subsets: ["latin", "vietnamese"], // Thêm vietnamese để hiển thị chuẩn nội dung bảo hiểm
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bảo hiểm ô tô MoMo - Uy tín và An toàn",
  description: "Giải pháp bảo vệ xế yêu toàn diện. So sánh báo giá từ 11+ nhà bảo hiểm hàng đầu Việt Nam ngay trên MoMo.",
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
    <html lang="vi">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}