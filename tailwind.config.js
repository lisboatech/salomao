/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        "white-alpha": {
          5: "rgba(255, 255, 255, 0.05)",
          10: "rgba(255, 255, 255, 0.1)",
          15: "rgba(255, 255, 255, 0.15)",
          20: "rgba(255, 255, 255, 0.2)",
          30: "rgba(255, 255, 255, 0.3)",
          50: "rgba(255, 255, 255, 0.5)",
          60: "rgba(255, 255, 255, 0.6)",
          80: "rgba(255, 255, 255, 0.8)",
        },
        "gray": {
          50: "#F5F5F5",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A0A0A0",
          400: "#888888",
          500: "#6F6F6F",
          600: "#5A5A5A",
          700: "#3F3F3F",
          800: "#2A2A2A",
          900: "#1A1A1A",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
        "glow-sm": "0px 0px 10px rgba(255, 255, 255, 0.3)",
        "glow-lg": "0px 0px 20px rgba(255, 255, 255, 0.7)",
      },
      backdropBlur: {
        xs: "2px",
        "25": "25px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient": "gradient 2.5s linear infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        gradient: {
          to: { backgroundPosition: "200%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translate(-50%, 20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
    },
  },
  plugins: [],
};
