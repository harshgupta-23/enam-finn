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
          bg: "#080C15",           // Deep Midnight Charcoal Canvas
          surface: "#0E1424",      // Refined Institutional Card Surface
          surfaceSubtle: "#141D30",// Slightly elevated surface for metrics
          border: "#1E293B",       // Clean border line
          borderHover: "#334155",
          accent: "#3B82F6",       // Institutional Blue / Sapphire
          accentLight: "#60A5FA",
          bullish: "#10B981",      // Muted Emerald
          bearish: "#F43F5E",      // Refined Crimson
          warning: "#F59E0B",      // Amber
          textPrimary: "#F8FAFC",  // High-contrast primary text
          textSecondary: "#94A3B8",// Subtle cool slate
          textMuted: "#64748B",    // Tertiary metadata
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
