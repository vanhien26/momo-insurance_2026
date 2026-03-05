import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-momo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg text-white">MoMo Bảo Hiểm</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nền tảng so sánh và mua bảo hiểm online hàng đầu Việt Nam. Đối tác chính thức của 11 nhà bảo hiểm uy tín.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bao-hiem-o-to/vat-chat" className="hover:text-momo-400 transition-colors">BH Ô Tô Vật Chất</Link></li>
              <li><Link href="/bao-hiem-o-to/bat-buoc" className="hover:text-momo-400 transition-colors">BH TNDS Bắt Buộc</Link></li>
              <li><span className="text-gray-500">BH Xe Máy (Sắp ra mắt)</span></li>
              <li><span className="text-gray-500">BH Sức Khỏe (Sắp ra mắt)</span></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kiến thức</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bao-hiem-o-to/blog" className="hover:text-momo-400 transition-colors">Blog Bảo Hiểm Ô Tô</Link></li>
              <li><Link href="/bao-hiem-o-to#faq" className="hover:text-momo-400 transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>Hotline: 1900 636 652</li>
              <li>Email: insurance@momo.vn</li>
              <li className="pt-2">
                <span className="text-gray-500">Công ty CP Dịch vụ Di Động Trực Tuyến (M_Service)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MoMo. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}
