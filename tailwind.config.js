/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finance: {
          bg: "#0B0F17",
          card: "#131B2A",
          cardBorder: "#1E293B",
          accent: "#2563EB",
          accentLight: "#38BDF8",
          bullish: "#10B981",
          bearish: "#EF4444",
          neutral: "#F59E0B",
          textMuted: "#94A3B8",
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
