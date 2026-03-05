import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/bao-hiem" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-momo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-xl text-content">
              MoMo <span className="text-momo-500">Bảo Hiểm</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/bao-hiem-o-to"
              className="text-sm font-medium text-content-secondary hover:text-momo-600 transition-colors"
            >
              BH Ô Tô
            </Link>
            <Link
              href="/bao-hiem-o-to/vat-chat"
              className="text-sm font-medium text-content-secondary hover:text-momo-600 transition-colors"
            >
              Vật Chất
            </Link>
            <Link
              href="/bao-hiem-o-to/bat-buoc"
              className="text-sm font-medium text-content-secondary hover:text-momo-600 transition-colors"
            >
              TNDS Bắt Buộc
            </Link>
            <Link
              href="/bao-hiem-o-to/blog"
              className="text-sm font-medium text-content-secondary hover:text-momo-600 transition-colors"
            >
              Kiến thức
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/bao-hiem-o-to/vat-chat"
            className="hidden md:inline-flex items-center h-10 px-5 bg-momo-500 text-white text-sm font-semibold rounded-xl hover:bg-momo-600 transition-colors"
          >
            Báo giá ngay
          </Link>
        </div>
      </div>
    </header>
  );
}
