import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Trần Thị Linh",
    role: "Nhân viên văn phòng",
    avatar: "👩‍💼",
    content: "Thực sự thuận tiện! Tôi tra cứu BHYT chỉ trong vài phút mà không cần đi đâu. Gia hạn qua MoMo cũng quá dễ dàng.",
    rating: 5
  },
  {
    name: "Nguyễn Văn Minh",
    role: "Kinh doanh độc lập",
    avatar: "👨‍💼",
    content: "Tuyệt vời! Không phải chạy cơ quan bảo hiểm, tất cả giải quyết trên điện thoại. Tiết kiệm khá nhiều thời gian.",
    rating: 5
  },
  {
    name: "Phạm Thị Hương",
    role: "Giáo viên",
    avatar: "👩‍🏫",
    content: "Hỗ trợ khách hàng rất tốt! Mỗi khi có thắc mắc là nhân viên lên ngay để giúp. Rất ấn tượng với dịch vụ này.",
    rating: 5
  },
  {
    name: "Lê Đình Tuấn",
    role: "Tài xế Grab",
    avatar: "👨‍🚗",
    content: "Chắc chắn sẽ giới thiệu cho bạn bè. Quy trình rõ ràng, không lằng nhằng gì cả. Đúng là công nghệ giúp cuộc sống.",
    rating: 5
  },
];

export function HealthInsuranceTestimonials() {
  return (
    <section className="py-20 bg-white border-b border-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 text-momo-500 text-sm font-bold border border-pink-100 mb-4">
            ⭐ Đánh giá từ khách hàng
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Người dùng <span className="text-momo-500">yêu thích</span> dịch vụ của chúng tôi
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hơn 10,000+ khách hàng đã tin tưởng MoMo để tra cứu và gia hạn BHYT
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-momo-200 hover:shadow-lg transition-all">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-momo-50 to-pink-50 rounded-3xl p-8 border border-pink-100">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-momo-600 mb-2">4.9/5</p>
            <p className="text-sm text-slate-600">Đánh giá trung bình</p>
          </div>
          <div className="text-center border-l border-r border-pink-200">
            <p className="text-3xl md:text-4xl font-black text-momo-600 mb-2">10K+</p>
            <p className="text-sm text-slate-600">Khách hàng hài lòng</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-momo-600 mb-2">100%</p>
            <p className="text-sm text-slate-600">Hỗ trợ 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
}
