export const MACRO_DATA = {
  lastUpdatedAnchor: "28 Oct 2026, 15:30 IST",
  anchors: [
    { id: "24h", label: "Last 24 Hours", timestamp: "27 Oct 2026, 15:30 IST", days: 1 },
    { id: "3d", label: "Past 3 Days", timestamp: "25 Oct 2026, 15:30 IST", days: 3 },
    { id: "7d", label: "Past 1 Week", timestamp: "21 Oct 2026, 15:30 IST", days: 7 }
  ],
  benchmarks: [
    {
      id: "nifty50",
      name: "NIFTY 50",
      value: "24,845.20",
      deltas: {
        "24h": { delta: "+0.45%", isPositive: true },
        "3d":  { delta: "+1.28%", isPositive: true },
        "7d":  { delta: "-0.62%", isPositive: false }
      },
      category: "index"
    },
    {
      id: "india10y",
      name: "India 10Y Yield",
      value: "6.82%",
      deltas: {
        "24h": { delta: "-4 bps", isPositive: true },
        "3d":  { delta: "-9 bps", isPositive: true },
        "7d":  { delta: "-16 bps", isPositive: true }
      },
      note: "Easing cost of corporate borrowing",
      category: "rates"
    },
    {
      id: "steel_hrc",
      name: "Domestic HRC Steel",
      value: "₹48,200/T",
      tag: "Input Cost",
      deltas: {
        "24h": { delta: "-0.6%", isPositive: false },
        "3d":  { delta: "-1.4%", isPositive: false },
        "7d":  { delta: "-2.3%", isPositive: false }
      },
      note: "Margin relief for Infra & Auto; margin drag for Steel producers",
      category: "commodity"
    },
    {
      id: "brent_crude",
      name: "Brent Crude",
      value: "$74.10/bbl",
      deltas: {
        "24h": { delta: "-0.8%", isPositive: true },
        "3d":  { delta: "-1.8%", isPositive: true },
        "7d":  { delta: "-4.2%", isPositive: true }
      },
      note: "Tailwind for paint, tyres & logistics",
      category: "commodity"
    },
    {
      id: "usdinr",
      name: "USD / INR",
      value: "84.08",
      deltas: {
        "24h": { delta: "+0.04%", isPositive: false },
        "3d":  { delta: "+0.12%", isPositive: false },
        "7d":  { delta: "+0.31%", isPositive: false }
      },
      category: "forex"
    }
  ],
  macroBrief: "RBI liquidity injection and softening global crude ($74/bbl) maintain benign interest rate outlook. HRC Steel correction (-2.3%) provides margin cushion to capital goods and auto assemblers while hurting primary metals."
};
