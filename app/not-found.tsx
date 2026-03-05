import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h2>
            <p className="text-content-secondary mb-8">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di dời.
            </p>
            <Link href="/">
                <Button>Về trang chủ</Button>
            </Link>
        </div>
    );
}
