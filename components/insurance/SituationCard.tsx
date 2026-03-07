import Link from "next/link";
import { Situation } from "@/types/insurance";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface SituationCardProps {
  situation: Situation;
  productSlug: string;
  typeSlug: string;
}

export function SituationCard({
  situation,
  productSlug,
  typeSlug,
}: SituationCardProps) {
  const href = `/${productSlug}/${typeSlug}/tinh-huong/${situation.slug}`;

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
    red: "bg-red-50 border-red-200 hover:border-red-400",
    orange: "bg-orange-50 border-orange-200 hover:border-orange-400",
    gray: "bg-gray-50 border-gray-200 hover:border-gray-400",
    yellow: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    purple: "bg-purple-50 border-purple-200 hover:border-purple-400",
  };

  const colorTextClasses: Record<string, string> = {
    blue: "text-blue-600",
    red: "text-red-600",
    orange: "text-orange-600",
    gray: "text-gray-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
  };

  const colorBgClasses: Record<string, string> = {
    blue: "bg-blue-100",
    red: "bg-red-100",
    orange: "bg-orange-100",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
    purple: "bg-purple-100",
  };

  return (
    <Link href={href}>
      <Card
        className={`p-6 transition-all duration-200 border-2 cursor-pointer hover:shadow-md ${
          colorClasses[situation.color] || colorClasses.blue
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg ${
                  colorBgClasses[situation.color] || colorBgClasses.blue
                }`}
              >
                <span className={`text-2xl ${colorTextClasses[situation.color] || colorTextClasses.blue}`}>
                  {situation.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {situation.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {situation.description}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        </div>
      </Card>
    </Link>
  );
}
