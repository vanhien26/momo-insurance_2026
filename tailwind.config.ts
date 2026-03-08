import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./products/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        momo: {
          50: "#FFF0F7",
          100: "#FFE0EF",
          200: "#FFC2DF",
          300: "#FF8DC3",
          400: "#FF4DA0",
          500: "#d82f8b", // Màu thương hiệu MoMo
          600: "#B8207A",
          700: "#A5006A",
          800: "#7A004E",
          900: "#520034",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          tertiary: "#F1F5F9",
        },
        content: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
        },
      },
      fontFamily: {
        // MoMo Trust Display - imported from globals.css
        sans: ["Momo Trust Display", "system-ui", "sans-serif"],
        display: ["Momo Trust Display", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        elevated: "0 8px 24px 0 rgb(0 0 0 / 0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Hỗ trợ các animation của shadcn
};

export default config;