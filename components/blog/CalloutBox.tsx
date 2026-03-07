// CalloutBox.tsx - Hỗ trợ callout/highlight trong blog
"use client";

import { AlertCircle, Lightbulb, Target, TrendingUp } from "lucide-react";

type CalloutType = "info" | "tip" | "important" | "success";

interface CalloutBoxProps {
  type: CalloutType;
  title: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ReactNode; bgColor: string; borderColor: string; titleColor: string }
> = {
  info: {
    icon: <AlertCircle className="w-5 h-5" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    titleColor: "text-blue-900",
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    titleColor: "text-amber-900",
  },
  important: {
    icon: <Target className="w-5 h-5" />,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    titleColor: "text-red-900",
  },
  success: {
    icon: <TrendingUp className="w-5 h-5" />,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    titleColor: "text-green-900",
  },
};

export function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const config = calloutConfig[type];

  return (
    <div className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-4 md:p-6`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 text-amber-600">{config.icon}</div>
        <div className="flex-1">
          <h4 className={`font-bold ${config.titleColor} mb-2`}>{title}</h4>
          <div className={`text-sm ${config.titleColor} opacity-90`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
