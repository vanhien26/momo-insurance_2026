import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(({ className, label, error, id, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-content">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white px-4 text-base transition-colors",
          "placeholder:text-content-tertiary",
          "focus:outline-none focus:ring-2 focus:ring-momo-500 focus:border-transparent",
          error ? "border-red-300" : "border-gray-200 hover:border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
