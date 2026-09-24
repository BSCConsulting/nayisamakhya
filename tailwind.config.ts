import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFBF9",
        surface: "#ffffff",
        ink: "#18181B",
        muted: "#71717A",
        line: "#EBE8E0",
        warm: "#F4F2EB",
        brand: {
          DEFAULT: "#C2410C",
          hover: "#9A3412",
        },
        sos: "#dc2626",
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "chat-pulse": "chat-pulse 2s ease-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "chat-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(194 65 12 / 0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgb(194 65 12 / 0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
