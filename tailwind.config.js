/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#090A0E",
        surface: "#12141A",
        surfaceElevated: "#181B24",
        borderSubtle: "#222634",
        borderStrong: "#303649",
        textPrimary: "#F4F4F6",
        textSecondary: "#A0A6B8",
        textMuted: "#6B7285",
        accent: "#3B82F6",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
