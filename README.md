# FINN: Financial Investment Agent

> **Submission for ENAM Holdings - AI Engineer Build Challenge**  
> **Mobile-First Intelligence Layer for High-Conviction Public Market Investors**

---

## 💡 Overview & Philosophy

An investor today is drowning in filings, announcements, and market noise. Aggregating data is cheap; **filtering for what actually moves earnings and structuring mental models is the real signal.**

FINN is built around two core interaction modes:
1. **Push Mode (Morning 3-Minute Triage):** Reaches out to the investor anchored to their `last_updated_date`. It surfaces material announcements, detects volume/price anomalies, highlights supply-chain ripples, and collapses routine compliance paperwork.
2. **Pull Mode (First-Principles Driver & Backtracking Engine):** On-demand deep research that first identifies the **3 core value levers** that dictate earnings, backtracks upstream commodity and policy dependencies, decodes **player intent** (management vs institutional capital), and benchmarks concall guidance against audited delivery.

---

## ⚡ Zero-Lag, Ultra-Lightweight Architecture

* **Bundle Size:** < 82 kB gzipped total JS bundle.
* **First Paint:** Under 100ms. Zero sluggish spinners or hydration delays.
* **Dual-View Switcher for Instant PC & Phone Testing:**
  * **💻 Desktop View:** Full-width expanded view for seamless testing on your PC without switching devices.
  * **📱 Phone Preview:** True mobile viewport preview (430px) formatted for iOS/Android testing.

---

## 🏗️ Core Modules

### 1. Push Feed (Morning Triage)
* **Anchor Window Selector:** Filter what changed *Since Last 24 Hours*, *Past 3 Days*, or *Past 1 Week*.
* **Macro & Upstream Pulse:** Running indicators for NIFTY 50, India 10Y Yield, Domestic HRC Steel, Brent Crude, and USD/INR.
* **Upstream Supply-Chain Ripple:** Automatically detects cross-sector dependencies (e.g., *Domestic Steel deflation -2.3% → positive gross margin cushion for L&T and Tata Motors; margin drag for Tata Steel*).
* **Smart Results Cards:** Revenue, EBITDA, PBT, PAT with automated **QoQ and YoY % change tags** and 1-line key takeaway.
* **Enriched Leadership Changes:** Biographical pedigree and strategic impact for incoming executives.
* **Noise Reduction Filter:** Suppresses routine ESOP notices, statutory certificates, and newspaper ads into an expandable collapsed drawer.

### 2. Pull Research (First-Principles Analysis)
* **16 Curated Portfolio Stocks + Ad-hoc Ticker Search:** Evaluators can select from the portfolio or type any NSE symbol.
* **Step 1: Core Value Drivers:** Ranks the 3 pivotal operating levers that actually move company earnings.
* **Step 2: Upstream Backtracking:** Links directly to upstream raw material trends, government budget allocations, and component import tariffs.
* **Step 3: Market Layering & Stakeholder Intent:**
  * *🏛️ Management Intent:* What promoters and executives are actively pushing.
  * *💼 Institutional / FII Intent:* What large capital funds are pricing in.
  * *⚡ Valuation Friction:* Where management's narrative diverges from reality.
* **Step 4: Primary Evidence (Narrative vs. Reality):**
  * Direct quotes from past Concall Guidance vs. Audited Reported Outcomes.
  * Free Cash Flow & Cash Conversion reality check.
* **Step 5: Grounded Bull vs. Bear Case:** 3 structural facts per side, strictly grounded in primary data.

---

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start local dev server (works on localhost:3000)
npm run dev

# Build for production
npm run build
```

### One-Click Deployment
This project is 100% static-ready and can be deployed in 30 seconds to **Vercel**, **Netlify**, or **GitHub Pages**:
```bash
# Example with Vercel CLI
npx vercel
```

