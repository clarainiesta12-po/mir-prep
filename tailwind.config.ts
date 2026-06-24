import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd5ff",
          300: "#8eb9ff",
          400: "#5891ff",
          500: "#3068ff",
          600: "#1a46f5",
          700: "#1434e1",
          800: "#172bb6",
          900: "#192a8f",
          950: "#141c57",
        },
        accent: {
          50:  "#fdf3f3",
          100: "#fce4e4",
          200: "#fbcece",
          300: "#f7a8a8",
          400: "#f27474",
          500: "#e84545",
          600: "#d42727",
          700: "#b21d1d",
          800: "#941c1c",
          900: "#7b1d1d",
          950: "#420b0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(48,104,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(48,104,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
