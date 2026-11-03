export const MACRO_DATA = {
  lastUpdatedAnchor: "28 Oct 2026, 15:30 IST",
  anchors: [
    { id: "24h", label: "Last 24 Hours", timestamp: "27 Oct 2026, 15:30 IST" },
    { id: "3d", label: "Past 3 Days", timestamp: "25 Oct 2026, 15:30 IST" },
    { id: "7d", label: "Past 1 Week", timestamp: "21 Oct 2026, 15:30 IST" }
  ],
  benchmarks: [
    {
      id: "nifty50",
      name: "NIFTY 50",
      value: "24,845.20",
      delta: "+0.45%",
      isPositive: true,
      category: "index"
    },
    {
      id: "india10y",
      name: "India 10Y Yield",
      value: "6.82%",
      delta: "-4 bps",
      isPositive: true, // drop in yield is positive for equities / cost of debt
      note: "Easing cost of corporate borrowing",
      category: "rates"
    },
    {
      id: "steel_hrc",
      name: "Domestic HRC Steel",
      value: "₹48,200/T",
      delta: "-2.3%",
      isPositive: false,
      tag: "Input Cost",
      note: "Margin relief for Infra & Auto; margin drag for Steel producers",
      category: "commodity"
    },
    {
      id: "brent_crude",
      name: "Brent Crude",
      value: "$74.10/bbl",
      delta: "-1.8%",
      isPositive: true,
      note: "Tailwind for paint, tyres & logistics",
      category: "commodity"
    },
    {
      id: "usdinr",
      name: "USD / INR",
      value: "84.08",
      delta: "+0.12%",
      isPositive: false,
      category: "forex"
    }
  ],
  macroBrief: "RBI liquidity injection and softening global crude ($74/bbl) maintain benign interest rate outlook. HRC Steel correction (-2.3%) provides margin cushion to capital goods and auto assemblers while hurting primary metals."
};

