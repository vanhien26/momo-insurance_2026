import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Cột 1: Thương hiệu */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-momo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl text-white">Bảo Hiểm</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nền tảng so sánh và mua bảo hiểm online hàng đầu Việt Nam. Đối tác chính thức của 11+ nhà bảo hiểm uy tín hàng đầu.
            </p>
          </div>

          {/* Cột 2: Sản phẩm */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Sản phẩm</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/bao-hiem-o-to/vat-chat" className="hover:text-momo-500 transition-colors">
                  Bảo hiểm Ô Tô Vật Chất
                </Link>
              </li>
              <li>
                <Link href="/bao-hiem-o-to/bat-buoc" className="hover:text-momo-500 transition-colors">
                  TNDS Bắt Buộc
                </Link>
              </li>
              <li>
                <span className="text-gray-600 italic">Bảo hiểm Xe Máy (Sắp ra mắt)</span>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Kiến thức</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/bao-hiem-o-to/blog" className="hover:text-momo-500 transition-colors">
                  Blog Bảo Hiểm Ô Tô
                </Link>
              </li>
              <li>
                <Link href="/bao-hiem-o-to#faq" className="hover:text-momo-500 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-momo-500 transition-colors">
                  Quy trình bồi thường
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Liên hệ</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-momo-500 font-bold tracking-wide">Hotline:</span> 1900 636 652
              </p>
              <p className="flex items-center gap-2">
                <span className="text-momo-500 font-bold tracking-wide">Email:</span> insurance@momo.vn
              </p>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-[11px] text-gray-500 uppercase leading-tight font-medium">
                  Công ty Cổ phần Dịch vụ Di Động Trực Tuyến (M_Service)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bản quyền và Pháp lý */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500">
          <p>© {currentYear} MoMo. Bản quyền thuộc về M_Service.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}