import type { Config } from "tailwindcss";

/**
 * Tailwind v4 primary tokens live in `src/app/globals.css` (`@theme`).
 * This config documents gradient/motion utilities and is loaded via `@config`.
 */
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f8fafc",
        surface: "#ffffff",
        brand: {
          DEFAULT: "#047857",
          hover: "#065f46",
          teal: "#0d9488",
        },
        accent: {
          DEFAULT: "#0284c7",
          success: "#16a34a",
        },
        sos: {
          DEFAULT: "#dc2626",
          soft: "#f87171",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(90deg, #047857 0%, #0d9488 100%)",
        "gradient-hero": "linear-gradient(90deg, #0284c7 0%, #16a34a 100%)",
        "gradient-sos": "linear-gradient(90deg, #dc2626 0%, #f87171 100%)",
        "gradient-metric": "linear-gradient(135deg, #065f46 0%, #059669 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "live-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.35)", opacity: "0.55" },
        },
        "sync-blink": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        "sos-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(220 38 38 / 0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgb(220 38 38 / 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "live-pulse": "live-pulse 1.6s ease-in-out infinite",
        "sync-blink": "sync-blink 1.4s ease-in-out infinite",
        "sos-pulse": "sos-pulse 2s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
