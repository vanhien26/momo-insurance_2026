import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-momo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-momo-500 text-white hover:bg-momo-600 active:bg-momo-700 shadow-md hover:shadow-lg":
              variant === "primary",
            "bg-surface-tertiary text-content hover:bg-gray-200 active:bg-gray-300":
              variant === "secondary",
            "border-2 border-momo-500 text-momo-500 hover:bg-momo-50 active:bg-momo-100":
              variant === "outline",
            "text-content-secondary hover:bg-surface-tertiary active:bg-gray-200":
              variant === "ghost",
          },
          {
            "h-9 px-4 text-sm gap-1.5": size === "sm",
            "h-11 px-6 text-base gap-2": size === "md",
            "h-13 px-8 text-lg gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
