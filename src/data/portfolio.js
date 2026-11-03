export const PORTFOLIO_STOCKS = [
  {
    ticker: "LT",
    name: "Larsen & Toubro Ltd",
    sector: "Infrastructure & EPC",
    exchange: "NSE",
    price: 3624.50,
    priceDelta: "+2.8%",
    isPricePositive: true,
    volumeMultiple: 2.6, // 2.6x 20-day avg volume -> ANOMALY
    pe: 34.2,
    marketCap: "₹4,98,200 Cr",
    fiftyTwoWeekRange: "₹2,840 - ₹3,919",
    // Upstream backtracking
    supplyChain: {
      upstream: [
        { item: "Domestic Steel (HRC)", trend: "-2.3% this week", impact: "positive", note: "Pass-through lag grants ~40-60 bps gross margin cushion on fixed-price EPC contracts" },
        { item: "Bulk Cement", trend: "Flat (-0.4%)", impact: "neutral", note: "Stable input costs across Western and Southern execution corridors" },
        { item: "Union Govt Capex Outlay", trend: "+11.1% YoY allocated", impact: "positive", note: "National Highway & Railway order momentum intact" }
      ],
      downstream: ["Public Infrastructure", "Middle-East Hydrocarbon", "Defense Systems"]
    },
    // Core Value Drivers (What actually matters)
    valueDrivers: [
      { driver: "Order Book Pipeline & Execution", weight: "High", metric: "₹4.75 Lakh Cr backlog (3.1x FY24 Revenue)" },
      { driver: "Working Capital Intensity", weight: "Critical", metric: "12.2% of revenue (target <12% to prevent cash bleed)" },
      { driver: "Input Cost Pass-Through Lag", weight: "Medium", metric: "65% contracts inflation-indexed; 35% fixed price" }
    ],
    // Narrative vs Numbers (PDF Worked Example)
    narrativeVsNumbers: {
      concallPromise: "Q1 Concall Guidance: 'We are targeting 15% core revenue growth and core EBITDA margin expansion of 8.25-8.50% in FY25 despite Middle-East supply chain volatility.'",
      actualDelivery: "Q2 Actuals: Core Revenue grew 17.2% YoY, but Core EBITDA margin compressed to 7.6% (-65 bps miss) due to legacy fixed-price international orders.",
      verdict: "Lagging on Margin",
      verdictSeverity: "warning",
      fcfCheck: "Cash flow from operations turned positive at ₹3,210 Cr as client retention money was released."
    },
    // Player Intent & Market Layering
    marketLayering: {
      managementIntent: "Accelerating Middle East mega-hydrocarbon packages while divesting non-core concessions (Hyderabad Metro) to de-risk ROE.",
      institutionalIntent: "FIIs seeking margin defense; rotating into pure domestic infrastructure plays where pricing power is higher.",
      marketFriction: "Valuation multiple (34x P/E) prices in flawless execution; any working capital stretch triggers analyst downgrades."
    },
    // Bull vs Bear
    bullVsBear: {
      bull: [
        "Unrivaled ₹4.75L Cr order backlog provides 3+ years of rock-solid revenue visibility.",
        "Middle East capex cycle in renewables and gas processing offsetting sluggish domestic private capex.",
        "Steel deflation offers immediate tailwind to second-half execution margins."
      ],
      bear: [
        "Supply chain & labor availability in GCC nations pressuring project completion timelines.",
        "Hyderabad Metro concession debt continues to drag consolidated return on equity (ROE 15.2%).",
        "High base effect will moderate YoY order inflow growth to single digits."
      ]
    },
    // Filings / Push feed items
    filings: [
      {
        id: "lt-filing-1",
        category: "results",
        priority: "high",
        timestamp: "Today, 14:15 IST",
        title: "Q2 FY25 Consolidated Financial Results",
        summary: "Robust top-line expansion led by energy & infrastructure execution; margin compression in international projects.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹61,555 Cr", qoq: "+11.7%", yoy: "+20.6%", status: "beat" },
          ebitda: { current: "₹6,362 Cr", qoq: "+12.1%", yoy: "+13.0%", status: "inline" },
          pbt: { current: "₹5,180 Cr", qoq: "+15.3%", yoy: "+12.4%", status: "inline" },
          pat: { current: "₹3,395 Cr", qoq: "+22.1%", yoy: "+5.4%", status: "miss" }
        },
        keyTakeaway: "Revenue beat consensus by 4.2%, but PAT growth muted at +5.4% YoY due to higher financing cost on international advances."
      },
      {
        id: "lt-filing-2",
        category: "press_release",
        priority: "medium",
        timestamp: "Yesterday, 11:30 IST",
        title: "L&T Construction bags 'Mega' order (>₹7,000 Cr) for Electrification",
        summary: "Order win from high-speed rail corridor. Fixed-margin schedule with milestone-linked advance payments."
      },
      {
        id: "lt-filing-3",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 09:45 IST",
        title: "Intimation of ESOP Allotment under Scheme 2021",
        summary: "Allotment of 14,250 equity shares to eligible senior employees under company option plan."
      }
    ]
  },
  {
    ticker: "TATAMOTORS",
    name: "Tata Motors Ltd",
    sector: "Automotive & EV",
    exchange: "NSE",
    price: 884.20,
    priceDelta: "-3.6%",
    isPricePositive: false,
    volumeMultiple: 2.1, // >2x -> ANOMALY
    pe: 9.8,
    marketCap: "₹3,25,400 Cr",
    fiftyTwoWeekRange: "₹640 - ₹1,179",
    supplyChain: {
      upstream: [
        { item: "Auto Grade Steel & Aluminum", trend: "-2.1% past 10 days", impact: "positive", note: "Slight raw-material cost relief for commercial vehicle margins" },
        { item: "Lithium Iron Phosphate / NMC Cells", trend: "Softening global spot (-4%)", impact: "positive", note: "Reduces battery pack costs for Nexon EV and Curvv EV" },
        { item: "UK / Europe Auto Demand", trend: "Down 5.2% MoM", impact: "negative", note: "Direct volume headwind for JLR Range Rover order book" }
      ],
      downstream: ["Domestic Passenger Vehicles", "Commercial Fleet Operators", "UK/EU Luxury SUV Market"]
    },
    valueDrivers: [
      { driver: "JLR Order Book & Cash Generation", weight: "Critical", metric: "JLR Net Debt targeted to near-zero by FY25 end (£400m remaining)" },
      { driver: "Domestic EV Market Share Defense", weight: "High", metric: "Market share currently ~68%, under pressure from Mahindra & Hyundai" },
      { driver: "Commercial Vehicle Fleet Demand", weight: "Medium", metric: "Domestic CV tonnage growth cyclical, currently flat YoY" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Guidance: 'JLR will achieve >8.5% EBIT margin in FY25 and achieve net cash positive position by Q4 FY25.'",
      actualDelivery: "Latest Quarter: JLR achieved 8.9% EBIT margin (+40 bps above target). Consolidated FCF generated was £751M.",
      verdict: "Delivered on Cash & Margins",
      verdictSeverity: "positive",
      fcfCheck: "Exceptional cash conversion: Operating Cash Flow of ₹14,200 Cr comfortably outpaced capex of ₹8,900 Cr."
    },
    marketLayering: {
      managementIntent: "Demerging the Commercial Vehicle and Passenger Vehicle businesses into two independent listed entities by mid-2025 to unlock pure-play valuations.",
      institutionalIntent: "Institutions de-risking after a 2-year multi-bagger run; cautious on European automotive demand slowdown.",
      marketFriction: "Low P/E (9.8x) reflects market fear of peak JLR cyclical margins and slowing domestic passenger vehicle retail inquiries."
    },
    bullVsBear: {
      bull: [
        "JLR order book remains resilient at over 120,000 units, skewed heavily towards high-margin Range Rover and Defender.",
        "Upcoming corporate demerger will give pure-play luxury/EV investors a direct vehicle without CV cyclical drag.",
        "Strong domestic balance sheet de-leveraging enables reinstated dividend payouts."
      ],
      bear: [
        "Domestic passenger vehicle dealer inventory is at elevated 60+ days industry-wide, forcing higher promotional discounts.",
        "European luxury EV adoption slowing down, delaying electric Range Rover ramp-up timeline.",
        "Commodity deflation in steel mostly offset by wage inflation across UK manufacturing hubs."
      ]
    },
    filings: [
      {
        id: "tatamotors-filing-1",
        category: "results",
        priority: "high",
        timestamp: "Today, 15:05 IST",
        title: "Q2 FY25 Financial Results & Demerger Progress Update",
        summary: "JLR delivers resilient margins; domestic passenger vehicle margins compressed due to industry discounts.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹1,01,450 Cr", qoq: "-6.2%", yoy: "+10.1%", status: "inline" },
          ebitda: { current: "₹14,520 Cr", qoq: "-8.4%", yoy: "+13.8%", status: "inline" },
          pbt: { current: "₹6,880 Cr", qoq: "-12.5%", yoy: "+18.2%", status: "inline" },
          pat: { current: "₹3,450 Cr", qoq: "-38.0%", yoy: "-11.2%", status: "miss" }
        },
        keyTakeaway: "One-off tax reversal in prior base distorts PAT (-11% YoY), but core JLR operational EBIT of 8.9% held strong."
      },
      {
        id: "tatamotors-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 17:15 IST",
        title: "Compliance Certificate under Reg 7(3) of SEBI LODR",
        summary: "Routine quarterly compliance confirmation with registrar and share transfer agent."
      }
    ]
  },
  {
    ticker: "TRENT",
    name: "Trent Ltd (Tata Retail)",
    sector: "Consumer & Retail",
    exchange: "NSE",
    price: 6920.00,
    priceDelta: "+4.1%",
    isPricePositive: true,
    volumeMultiple: 2.8, // >2x -> ANOMALY
    pe: 142.5,
    marketCap: "₹2,46,000 Cr",
    fiftyTwoWeekRange: "₹2,720 - ₹8,345",
    supplyChain: {
      upstream: [
        { item: "Cotton & Spinning Yarn Prices", trend: "Subdued (-1.2% MoM)", impact: "positive", note: "Allows Zudio to maintain sub-₹999 price ceiling with 39% gross margins" },
        { item: "Tier-2/3 Commercial Retail Rentals", trend: "+4.5% annual escalation", impact: "neutral", note: "High store revenue density (₹32,000/sqft) comfortably absorbs lease costs" },
        { item: "Fast-Fashion Turnaround Cycle", trend: "14-day design-to-shelf", impact: "positive", note: "Zero warehousing bottleneck; inventory turns 5.8x" }
      ],
      downstream: ["Zudio Fast Fashion", "Westside Premium Apparel", "Star Bazaar Food Retail"]
    },
    valueDrivers: [
      { driver: "Zudio Store Count & Square Footage Expansion", weight: "Critical", metric: "Opening ~200 new Zudio stores in FY25 (total 560+)" },
      { driver: "Like-for-Like (LFL) Same Store Sales Growth", weight: "High", metric: "Maintaining >12% LFL in an industry averaging flat-to-negative" },
      { driver: "Star Bazaar Food Retail Profitability", weight: "Medium", metric: "Reaching store-level EBITDA breakeven on high private-label share" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Commentary: 'We will not chase empty store count; every single Zudio opened must achieve profitability within 60 days of operations.'",
      actualDelivery: "Reported: 58 new Zudio stores added in Q2; revenue grew 39% YoY with company-level EBITDA margin expanding to 16.2%.",
      verdict: "Over-Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Strong working capital control: Operating Cash Flow grew +48% YoY, self-funding all capex with zero bank borrowings."
    },
    marketLayering: {
      managementIntent: "Replicating the Zudio value-play model internationally (pilot stores launched in UAE) while scaling Star Bazaar.",
      institutionalIntent: "DII funds treating Trent as India's premier discretionary compounding machine; valuation elasticity tested at 140x P/E.",
      marketFriction: "Any slight deceleration in quarterly SSSG from 15% to 8% could trigger sharp valuation multiple de-rating."
    },
    bullVsBear: {
      bull: [
        "Zudio is structurally disrupting unorganized apparel in Tier-2/3/4 towns with unmatched scale economics.",
        "Negative working capital cycle and high store payback (<18 months) allows 100% internal accrual expansion.",
        "Emerging categories like Zudio Beauty and Footwear creating incremental basket size expansion."
      ],
      bear: [
        "Priced for absolute perfection at 140x trailing earnings; minimal margin of safety against macro consumption slumps.",
        "Intense competitive retaliation from Reliance Trends and Aditya Birla Fashion (Style Up) targeting value retail.",
        "Mall availability of prime 8,000 sq ft retail spaces becoming scarcer in top 150 cities."
      ]
    },
    filings: [
      {
        id: "trent-filing-1",
        category: "press_release",
        priority: "high",
        timestamp: "Today, 10:20 IST",
        title: "International Expansion: Trent opens 2nd Zudio Flagship in Dubai, UAE",
        summary: "Expansion into GCC markets testing value-fashion model outside India through wholly-owned subsidiary."
      },
      {
        id: "trent-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 16:30 IST",
        title: "Loss of Share Certificate Intimation under Reg 39(3)",
        summary: "Notice regarding request for duplicate share certificate for 100 shares."
      }
    ]
  },
  {
    ticker: "DIXON",
    name: "Dixon Technologies (India) Ltd",
    sector: "Electronics Manufacturing (EMS)",
    exchange: "NSE",
    price: 14850.00,
    priceDelta: "+3.2%",
    isPricePositive: true,
    volumeMultiple: 1.8,
    pe: 88.0,
    marketCap: "₹88,900 Cr",
    fiftyTwoWeekRange: "₹5,100 - ₹15,900",
    supplyChain: {
      upstream: [
        { item: "Display Panels & Memory Modules", trend: "Imports from Shenzhen/Taiwan steady", impact: "neutral", note: "Components bill passed through directly to global smartphone brands" },
        { item: "Govt Smartphone PLI Incentive Release", trend: "Disbursal approvals accelerated", impact: "positive", note: "Direct cash boost to operating margins" },
        { item: "Localization of Mobile PCB Assemblies", trend: "Domestic sourcing up 28%", impact: "positive", note: "Deepens value addition from 6% to ~12%" }
      ],
      downstream: ["Xiaomi / Motorola / Transsion Mobile Assembly", "Samsung / LG Home Appliances", "Telecom Equipment"]
    },
    valueDrivers: [
      { driver: "Mobile Division Volume Ramp", weight: "Critical", metric: "Monthly run rate reaching 3.5M smartphones" },
      { driver: "Value-Addition & Component Localization", weight: "High", metric: "Moving from screw-driver assembly (3-4% margin) to sub-components (6-8%)" },
      { driver: "Client Concentration Risk", weight: "High", metric: "Top 3 smartphone clients account for ~55% of consolidated revenues" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'Mobile volumes will double in FY25 led by Motorola and Ismartu contracts; targeting ₹28,000 Cr full-year revenue.'",
      actualDelivery: "H1 Run-rate: Q2 mobile revenues surged 180% YoY, on track to achieve ₹27,500-29,000 Cr annualized revenue.",
      verdict: "Delivered on Volumes",
      verdictSeverity: "positive",
      fcfCheck: "Cash conversion tight: Working capital bloated by ₹480 Cr inventory buffer for festive festive assembly lines."
    },
    marketLayering: {
      managementIntent: "Consolidating domestic mobile contract manufacturing and entering IT hardware (laptops/servers) via JV with Compal.",
      institutionalIntent: "FIIs treating Dixon as the quintessential 'Make in India' proxy; highly sensitive to any change in import duty regulations.",
      marketFriction: "Thin operating margins (3.8-4.2%) mean even small client contract renegotiations compress bottom line."
    },
    bullVsBear: {
      bull: [
        "Undisputed market leader in Indian contract mobile assembly, capturing ~45% of domestic Android outsourcing.",
        "PLI scheme disbursements kicking into high gear, providing tangible cash inflows over FY25-27.",
        "Expansion into high-margin telecom equipment and defense electronics diversifying client base."
      ],
      bear: [
        "Very low margin profile (EBITDA ~4%) leaves zero room for cost errors or inventory write-offs.",
        "OEM customers hold significant bargaining power and can re-tender contracts to Foxconn or DBG.",
        "High working capital debt to fund component inventories before client invoice clearance."
      ]
    },
    filings: [
      {
        id: "dixon-filing-1",
        category: "m_and_a",
        priority: "high",
        timestamp: "Yesterday, 18:40 IST",
        title: "Execution of Share Purchase Agreement to acquire 50.1% stake in Ismartu India",
        summary: "Finalizes acquisition of Transsion mobile phone manufacturing operations in India for ₹238 Cr."
      },
      {
        id: "dixon-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 12:10 IST",
        title: "Press clipping submission regarding analyst interaction",
        summary: "Compliance disclosure of news article regarding general electronics manufacturing sector outlook."
      }
    ]
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Ltd",
    sector: "Banking & Financial Services",
    exchange: "NSE",
    price: 1742.80,
    priceDelta: "-0.6%",
    isPricePositive: false,
    volumeMultiple: 1.1,
    pe: 18.9,
    marketCap: "₹13,25,000 Cr",
    fiftyTwoWeekRange: "₹1,363 - ₹1,794",
    supplyChain: {
      upstream: [
        { item: "Systemic Deposit Growth vs Credit Growth", trend: "Deposit growth 11.8% vs Credit 13.5%", impact: "negative", note: "Intense competition for retail CASA deposits pushes up cost of funds" },
        { item: "RBI Repo Rate", trend: "Unchanged at 6.50%", impact: "neutral", note: "Lending yields near peak; waiting for monetary easing cycle" },
        { item: "Corporate Balance Sheet Health", trend: "Gross NPAs at decade lows (0.98%)", impact: "positive", note: "Credit costs benign across wholesale portfolios" }
      ],
      downstream: ["Retail Mortgages", "SME Working Capital", "Corporate Syndication", "Credit Cards"]
    },
    valueDrivers: [
      { driver: "Credit-to-Deposit (LDR) Ratio Normalization", weight: "Critical", metric: "Brought down from 110% post-merger to 99.8% (target ~85-90%)" },
      { driver: "Net Interest Margin (NIM) Defense", weight: "High", metric: "Consolidated NIM steady at 3.46% (pre-merger benchmark 4.0%)" },
      { driver: "Retail Deposit Mobilization via Branch Network", weight: "Critical", metric: "Opening ~800-1000 branches/year to harvest low-cost CASA" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Commitment: 'We will prioritize deposit growth over loan growth for the next 2-3 years to bring LDR to normalized levels, even if it means sacrificing near-term asset growth.'",
      actualDelivery: "Q2 Delivered: Loans grew +7.0% YoY while Deposits grew +15.1% YoY, proving intentional balance sheet re-balancing.",
      verdict: "Delivered on Strategy",
      verdictSeverity: "positive",
      fcfCheck: "Strong capital adequacy: Tier-1 CAR at 19.8% comfortably above regulatory minimums."
    },
    marketLayering: {
      managementIntent: "Absorbing the gargantuan HDFC Ltd mortgage book without blowing out cost of funds; preserving underwriting discipline.",
      institutionalIntent: "FII holding headroom opened up in MSCI rebalancing, prompting massive institutional accumulation.",
      marketFriction: "Patience required: NIMs will remain rangebound at 3.4-3.6% until high-cost borrowings mature over the next 18 months."
    },
    bullVsBear: {
      bull: [
        "Unmatched distribution franchise with 8,800+ branches capable of gathering low-cost sticky retail deposits.",
        "Mortgage cross-sell runway into 90+ million legacy bank account holders just beginning.",
        "Asset quality cleanest in Indian banking history with Net NPAs at 0.33%."
      ],
      bear: [
        "Elevated Credit-to-Deposit ratio forces bank to restrain loan growth to below systemic pace for 4-6 quarters.",
        "Branch expansion pace creates elevated Cost-to-Income ratio (~40%).",
        "Higher deposit pricing competition from public sector banks (SBI, BoB) squeezes spreads."
      ]
    },
    filings: [
      {
        id: "hdfc-filing-1",
        category: "results",
        priority: "high",
        timestamp: "26 Oct 2026, 13:30 IST",
        title: "Q2 FY25 Audited Financial Results",
        summary: "Advances up 7% YoY, Deposits up 15% YoY as bank prioritizes deposit accretion; Net NPA steady at 0.33%.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹85,500 Cr", qoq: "+3.2%", yoy: "+11.4%", status: "inline" },
          ebitda: { current: "₹24,300 Cr", qoq: "+4.1%", yoy: "+8.9%", status: "inline" }, // NII + Other Income
          pbt: { current: "₹21,800 Cr", qoq: "+4.8%", yoy: "+6.1%", status: "inline" },
          pat: { current: "₹16,820 Cr", qoq: "+4.0%", yoy: "+5.3%", status: "inline" }
        },
        keyTakeaway: "Core deposit growth outpaced loan growth 2:1, successfully reducing the post-merger liquidity ratio."
      },
      {
        id: "hdfc-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 11:00 IST",
        title: "Notice of Postal Ballot - Appointment of Independent Director",
        summary: "Seeking shareholder approval via remote e-voting for re-appointment of non-executive director."
      }
    ]
  },
  {
    ticker: "CDSL",
    name: "Central Depository Services Ltd",
    sector: "Capital Markets Infrastructure",
    exchange: "NSE",
    price: 1540.00,
    priceDelta: "-1.8%",
    isPricePositive: false,
    volumeMultiple: 1.4,
    pe: 46.2,
    marketCap: "₹32,180 Cr",
    fiftyTwoWeekRange: "₹840 - ₹1,720",
    supplyChain: {
      upstream: [
        { item: "Monthly Demat Account Additions", trend: "3.2M new demat accounts/mo in India", impact: "positive", note: "Direct driver of recurring annual issuer charges and transaction fee volume" },
        { item: "NSE/BSE Cash & Derivatives Trading Turnover", trend: "Derivatives volume moderating post SEBI index norms", impact: "negative", note: "Pledging and unpledging transactions volume see minor deceleration" },
        { item: "IPO Pipeline Activity", trend: "Record 42 mainboard IPOs this quarter", impact: "positive", note: "Generates high-margin corporate action and verification fees" }
      ],
      downstream: ["Retail Demat Account Holders", "Discount Brokers (Zerodha, Groww)", "Listed Corporate Issuers"]
    },
    valueDrivers: [
      { driver: "Active Demat Account Market Share", weight: "Critical", metric: "CDSL controls 77% share of total Indian demat accounts vs NSDL (23%)" },
      { driver: "Transaction Charges & IPO Corporate Actions", weight: "High", metric: "Linked to secondary market cash volumes and retail IPO participation" },
      { driver: "Operating Leverage & Fixed Cost Base", weight: "High", metric: "EBITDA margins exceed 60% due to software asset model" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Commentary: 'We will continue to invest in cybersecurity and regulatory compliance while maintaining >60% operating margins as retail financialization expands.'",
      actualDelivery: "Reported: Operating EBITDA margin reached 64.2% on record revenue of ₹322 Cr.",
      verdict: "Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Pure cash machine: Free Cash Flow equals ~90% of PAT due to negligible maintenance capex."
    },
    marketLayering: {
      managementIntent: "Scaling value-added services like e-KYC, e-Sign, and insurance repository (CIRL) to diversify away from purely market-cyclical transaction charges.",
      institutionalIntent: "DIIs favor CDSL as an irreplaceable tollbooth monopoly on Indian household equity penetration.",
      marketFriction: "SEBI regulatory crackdowns on F&O volumes could dampen retail account churn in the short term."
    },
    bullVsBear: {
      bull: [
        "Uncontested duopoly with NSDL, with CDSL capturing 85%+ of all new discount broker account openings.",
        "Zero debt, negative working capital, 60%+ EBITDA margins, and 30%+ ROCE.",
        "Structural long-term megatrend: Indian household financialization still in early innings (<6% equity penetration)."
      ],
      bear: [
        "Valuation at 46x earnings leaves it vulnerable during cyclical equity bear markets when retail trading volume dries up.",
        "SEBI regulation capping or revising transaction fees can instantly haircut revenue.",
        "Heightened tech and cybersecurity compliance costs following SEBI system audit directives."
      ]
    },
    filings: [
      {
        id: "cdsl-filing-1",
        category: "management_change",
        priority: "high",
        timestamp: "Yesterday, 16:45 IST",
        title: "Appointment of Mr. Rajesh Kumar as Chief Technology Officer (CTO)",
        summary: "SEBI-approved appointment of veteran technologist from banking infrastructure background.",
        execBio: {
          name: "Rajesh Kumar",
          role: "Chief Technology Officer (CTO)",
          previousRole: "Head of Infrastructure & Core Engineering, National Payments Corporation of India (NPCI)",
          experience: "24 years in mission-critical financial exchange systems, high-concurrency clearing networks, and cloud resilience.",
          significance: "Crucial hire to modernize CDSL's transaction clearing engine following recent capacity upgrade directives from SEBI."
        }
      },
      {
        id: "cdsl-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "26 Oct 2026, 10:15 IST",
        title: "Intimation of investor analyst group meeting",
        summary: "One-on-one virtual meeting with Motilal Oswal Financial Services."
      }
    ]
  },
  {
    ticker: "HAL",
    name: "Hindustan Aeronautics Ltd",
    sector: "Aerospace & Defense",
    exchange: "NSE",
    price: 4410.00,
    priceDelta: "+1.9%",
    isPricePositive: true,
    volumeMultiple: 1.3,
    pe: 38.5,
    marketCap: "₹2,95,000 Cr",
    fiftyTwoWeekRange: "₹2,100 - ₹5,675",
    supplyChain: {
      upstream: [
        { item: "Titanium & Aerospace Alloys", trend: "Supply constraints from international suppliers", impact: "negative", note: "Requires buffer inventory management for LCA Tejas Mk1A assembly" },
        { item: "GE F404 Aero Engines Delivery", trend: "GE delivery delays resolving (deliveries starting Nov)", impact: "positive", note: "Unblocks stalled Tejas Mk1A batch handovers to Indian Air Force" },
        { item: "Defense Acquisition Council (DAC) Clearances", trend: "₹1.4 Lakh Cr capital approvals granted", impact: "positive", note: "Includes 97 additional Tejas Mk1A fighters and 156 Prachand LCH helicopters" }
      ],
      downstream: ["Indian Air Force", "Indian Army Aviation", "Friendly Foreign Export Nations (Philippines, Egypt)"]
    },
    valueDrivers: [
      { driver: "Order Book Pipeline Execution", weight: "Critical", metric: "Order book at record ₹1.24 Lakh Cr (3.9x FY24 Revenue)" },
      { driver: "Indigenous Engine Component Manufacturing", weight: "High", metric: "GE F414 80% tech transfer pact for Tejas Mk2" },
      { driver: "Repair & Overhaul (ROH) Recurring Annuity", weight: "High", metric: "ROH accounts for ~60% of annual turnover with 28% steady margins" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'We expect 14-16% annual revenue growth in FY25, accelerating once GE delivers the first lot of F404 engines.'",
      actualDelivery: "Execution: H1 revenue grew 11.2% due to GE engine shipment lag; full-year target reliant on Q4 catch-up.",
      verdict: "Mild Lag (Supplier Constraint)",
      verdictSeverity: "warning",
      fcfCheck: "Cash surplus: Free cash reserves in bank deposits stand at ₹26,000 Cr, generating ₹1,800 Cr annual interest income."
    },
    marketLayering: {
      managementIntent: "Indigenizing critical aerospace sensors and expanding aircraft manufacturing line capacity to 24 Tejas per year.",
      institutionalIntent: "Institutions treat HAL as the primary anchor of India's indigenization (Aatmanirbhar Bharat) capex super-cycle.",
      marketFriction: "Single-customer reliance (Ministry of Defense) and long delivery cycles create lumpy quarter-to-quarter financial reporting."
    },
    bullVsBear: {
      bull: [
        "Monopoly sovereign defense aerospace manufacturer with zero domestic competition for fighter aircraft and military helicopters.",
        "Zero debt with massive ₹26,000 Cr cash pile providing balance sheet invulnerability.",
        "Repair and Overhaul (ROH) contracts provide high-margin, recession-proof recurring revenue."
      ],
      bear: [
        "Heavy reliance on foreign OEMs (General Electric) for propulsion units causes assembly choke-points.",
        "Any delay in government budget allocation directly stretches milestone cash receipts.",
        "Rich valuation (38x P/E) leaves little margin for operational delivery delays."
      ]
    },
    filings: [
      {
        id: "hal-filing-1",
        category: "capex",
        priority: "medium",
        timestamp: "Yesterday, 14:00 IST",
        title: "Board approves ₹1,150 Cr CapEx for 3rd Tejas Aircraft Production Line in Nashik",
        summary: "Expansion will scale annual Tejas fighter jet output capacity from 16 to 24 aircraft per year."
      },
      {
        id: "hal-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 17:30 IST",
        title: "Notice of closure of trading window for designated persons",
        summary: "Statutory trading window closure notice pursuant to SEBI Prohibition of Insider Trading regulations."
      }
    ]
  },
  {
    ticker: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Ltd",
    sector: "Pharmaceuticals & Healthcare",
    exchange: "NSE",
    price: 1890.00,
    priceDelta: "+0.8%",
    isPricePositive: true,
    volumeMultiple: 1.0,
    pe: 36.8,
    marketCap: "₹4,53,000 Cr",
    fiftyTwoWeekRange: "₹1,130 - ₹1,960",
    supplyChain: {
      upstream: [
        { item: "Active Pharmaceutical Ingredients (API) & Solvents", trend: "China chemical pricing stable", impact: "positive", note: "API input cost deflation supports formulation gross margins" },
        { item: "US FDA Regulatory Inspections", trend: "Halol facility under import alert; Mohali/Dadra cleared", impact: "neutral", note: "US specialty business shifted primarily to outsourced cGMP sites" },
        { item: "Clinical Trial R&D Spend", trend: "R&D at 6.8% of sales", impact: "neutral", note: "Targeted at derma and ophthalmology pipeline expansion" }
      ],
      downstream: ["Domestic Chronic Prescriptions", "US Dermatology & Ophthalmology Clinics", "Emerging Market Formulations"]
    },
    valueDrivers: [
      { driver: "Global Specialty Portfolio Ramp", weight: "Critical", metric: "Specialty revenues crossed $1.1B run-rate led by Ilumya, Cequa, and Winlevi" },
      { driver: "India Domestic Formulations Market Leadership", weight: "High", metric: "No. 1 ranking in Indian pharma market with 8.4% market share" },
      { driver: "Deutivacaftor / Leqselvi Alopecia Launch", weight: "High", metric: "US launch trajectory following patent litigation settlements" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'Double-digit consolidated revenue growth driven by global specialty portfolio and domestic branded formulations.'",
      actualDelivery: "Performance: Q2 Consolidated revenue grew 10.8% YoY with Global Specialty business jumping 19.2% YoY.",
      verdict: "Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Cash generator: Operating Cash Flow conversion reached 88% of EBITDA, net cash surplus of $1.8 Billion."
    },
    marketLayering: {
      managementIntent: "Transitioning Sun Pharma from a generic copycat drugmaker into a proprietary global specialty innovator.",
      institutionalIntent: "FIIs value Sun as a defensive growth haven insulated from US generic price erosion that plagued peers.",
      marketFriction: "US patent litigations on new specialty molecules create event risks."
    },
    bullVsBear: {
      bull: [
        "Specialty portfolio provides high entry barriers, pricing power, and insulation from generic price erosion.",
        "Undisputed chronic therapy leader in India, benefiting from domestic lifestyle disease treatment growth.",
        "Net debt-free balance sheet with $1.8B cash buffer for targeted tuck-in biotech acquisitions."
      ],
      bear: [
        "Unfavorable outcome in pending US patent infringement trials could stall Leqselvi commercialization.",
        "R&D spend scaling to 7-8% of sales without guaranteed pipeline commercial success.",
        "Regulatory scrutiny: Any FDA Warning Letter at key formulation sites can temporarily disrupt supplies."
      ]
    },
    filings: [
      {
        id: "sun-filing-1",
        category: "press_release",
        priority: "medium",
        timestamp: "Yesterday, 13:10 IST",
        title: "US FDA approves Supplemental New Drug Application for Ilumya (Tildrakizumab)",
        summary: "Label expansion for treatment of moderate-to-severe plaque psoriasis in pediatric populations."
      },
      {
        id: "sun-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "26 Oct 2026, 18:20 IST",
        title: "Disclosure of shareholding pattern under Reg 31",
        summary: "Quarterly promoter and public shareholding breakdown submission."
      }
    ]
  },
  {
    ticker: "TATASTEEL",
    name: "Tata Steel Ltd",
    sector: "Metals & Mining (Upstream)",
    exchange: "NSE",
    price: 148.50,
    priceDelta: "-2.9%",
    isPricePositive: false,
    volumeMultiple: 2.3, // >2x -> ANOMALY
    pe: 28.4,
    marketCap: "₹1,85,400 Cr",
    fiftyTwoWeekRange: "₹115 - ₹184",
    supplyChain: {
      upstream: [
        { item: "Coking Coal Spot Prices (Australia)", trend: "Softening to $210/t", impact: "positive", note: "Reduces blast furnace operational conversion cost" },
        { item: "Iron Ore Captive Mines (Odisha/Jharkhand)", trend: "100% captive integration", impact: "positive", note: "Shields India operations from raw material price shocks" },
        { item: "UK Port Talbot Blast Furnace Closure", trend: "Transitioning to Electric Arc Furnace (EAF)", impact: "neutral", note: "Subsidized by £500M UK government grant; eliminates cash burn" }
      ],
      downstream: ["Automotive Chassis (Tata Motors, Maruti)", "Construction EPC (L&T)", "Capital Goods & Machinery"]
    },
    valueDrivers: [
      { driver: "India Steel Realization per Tonne", weight: "Critical", metric: "Blended domestic realization ₹54,200/t (down 4% YoY on Chinese exports)" },
      { driver: "Kalinganagar 5 MTPA Expansion Commissioning", weight: "High", metric: "Expanding low-cost domestic capacity to 26 MTPA" },
      { driver: "UK Restructuring Cash Drain Elimination", weight: "High", metric: "De-risking European subsidiary to turn EBITDA neutral by FY26" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'India EBITDA per tonne will remain resilient above ₹14,000/t supported by domestic infrastructure demand.'",
      actualDelivery: "Outcome: Q2 India EBITDA per tonne dipped to ₹12,850/t due to cheap Vietnamese and Chinese steel imports entering Indian ports.",
      verdict: "Missed Target",
      verdictSeverity: "warning",
      fcfCheck: "Heavy capex cycle: Kalinganagar expansion keeps Free Cash Flow negative (-₹1,450 Cr) despite healthy operating profit."
    },
    marketLayering: {
      managementIntent: "Pushing for Indian government safeguard duties on subsidized Chinese steel dumping while completing domestic Kalinganagar phase 2.",
      institutionalIntent: "Cyclical rotation out of upstream primary steel into downstream fabricators and consumers (L&T, Tata Motors).",
      marketFriction: "Global steel overcapacity limits near-term pricing power despite robust Indian volume growth."
    },
    bullVsBear: {
      bull: [
        "100% captive iron ore mines in India give it the lowest conversion cost structure among global steelmakers.",
        "Kalinganagar phase-2 ramp up adds high-value cold-rolled automotive steel volumes.",
        "Port Talbot blast furnace shutdown permanently stops European cash bleed."
      ],
      bear: [
        "Surplus Chinese steel exports flooding Asian markets capping domestic realization recovery.",
        "Consolidated net debt remains elevated at ₹78,000 Cr amidst heavy ongoing capex.",
        "Downstream consumers (Auto, Infra) aggressively negotiating lower contract prices."
      ]
    },
    filings: [
      {
        id: "tatasteel-filing-1",
        category: "results",
        priority: "high",
        timestamp: "Today, 14:40 IST",
        title: "Q2 FY25 Financial Results & UK Transition Update",
        summary: "India deliveries up 6% YoY; realization pressure softens consolidated margins.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹53,905 Cr", qoq: "-1.5%", yoy: "-3.2%", status: "miss" },
          ebitda: { current: "₹6,220 Cr", qoq: "-7.1%", yoy: "+18.4%", status: "inline" },
          pbt: { current: "₹1,420 Cr", qoq: "-24.2%", yoy: "Turnaround", status: "inline" },
          pat: { current: "₹833 Cr", qoq: "-14.5%", yoy: "Turnaround", status: "inline" }
        },
        keyTakeaway: "Turned PAT positive vs prior year loss as UK restructuring charges subsided, but domestic realization per tonne contracted."
      },
      {
        id: "tatasteel-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 15:50 IST",
        title: "Intimation of credit rating affirmation by ICRA",
        summary: "ICRA reaffirms [ICRA]AA+ rating with Stable outlook."
      }
    ]
  },
  {
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "Conglomerate (Energy / Telecom / Retail)",
    exchange: "NSE",
    price: 2680.00,
    priceDelta: "-1.2%",
    isPricePositive: false,
    volumeMultiple: 1.2,
    pe: 25.1,
    marketCap: "₹18,12,000 Cr",
    fiftyTwoWeekRange: "₹2,220 - ₹3,217",
    supplyChain: {
      upstream: [
        { item: "Singapore Gross Refining Margin (GRM)", trend: "Collapsed to $3.8/bbl from $7.5", impact: "negative", note: "O2C oil refining earnings hit multi-quarter cyclical trough" },
        { item: "Telecom ARPU Post-Tariff Hike", trend: "ARPU expanding +8.5% QoQ to ₹195", impact: "positive", note: "Full flow-through of July 2024 tariff hikes hitting Jio cash flow" },
        { item: "New Energy Solar Giga-factory Capex", trend: "Phase 1 commissioning Q4 FY25", impact: "neutral", note: "Transitioning Jamnagar into green hydrogen and solar hub" }
      ],
      downstream: ["Petrochemical Fabricators", "490M Jio 5G Subscribers", "18,000+ Reliance Retail Stores"]
    },
    valueDrivers: [
      { driver: "Jio ARPU & Upcoming Telecom IPO", weight: "Critical", metric: "ARPU trajectory towards ₹220; potential 2025 public listing" },
      { driver: "Reliance Retail Store Rationalization & Quick Commerce", weight: "High", metric: "Consolidating non-performing formats, expanding JioMart express" },
      { driver: "O2C Petrochemicals Margin Recovery", weight: "Medium", metric: "Waiting for global demand revival to restore downstream polymer margins" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Commentary: 'Tariff hikes in Jio will completely flow into operating EBITDA over the next two quarters, generating strong FCF.'",
      actualDelivery: "Delivered: Jio EBITDA jumped 17.8% YoY with ARPU reaching ₹195.1; offset by 14% drop in Oil-to-Chemicals profitability.",
      verdict: "Delivered on Telecom; Weak Energy",
      verdictSeverity: "warning",
      fcfCheck: "Annual capex run-rate remains immense (~₹1.3 Lakh Cr), keeping consolidated free cash flow neutral."
    },
    marketLayering: {
      managementIntent: "De-risking from fossil-fuel cyclicality by spinning off Jio and Retail as standalone market leaders while building Green Energy.",
      institutionalIntent: "Investors waiting for the Jio IPO filing date as the primary valuation unlock catalyst.",
      marketFriction: "O2C refining weakness caps near-term consolidated earnings growth."
    },
    bullVsBear: {
      bull: [
        "Jio telecom tariff hikes are structural and have zero customer churn, driving annuity cash flows.",
        "Retail business operates unrivaled scale across grocery, electronics, and fashion.",
        "Impending IPOs of Jio and Retail will unlock massive conglomerate discount."
      ],
      bear: [
        "Global refining margins in cyclical downturn, depressing oil-to-chemicals segment.",
        "Huge capex intensity across 5G and New Energy delaying balance sheet debt reduction.",
        "Quick commerce competition from Blinkit and Zepto pressuring Reliance Retail's e-commerce ambitions."
      ]
    },
    filings: [
      {
        id: "ril-filing-1",
        category: "results",
        priority: "high",
        timestamp: "27 Oct 2026, 18:00 IST",
        title: "Q2 FY25 Consolidated Financial Results & Segment Review",
        summary: "Jio and Retail power EBITDA growth, offsetting cyclical moderation in Oil-to-Chemicals (O2C).",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹2,35,481 Cr", qoq: "+1.8%", yoy: "+0.2%", status: "inline" },
          ebitda: { current: "₹43,934 Cr", qoq: "+3.4%", yoy: "-2.0%", status: "inline" },
          pbt: { current: "₹25,820 Cr", qoq: "+2.1%", yoy: "-5.4%", status: "inline" },
          pat: { current: "₹16,563 Cr", qoq: "+9.4%", yoy: "-4.8%", status: "inline" }
        },
        keyTakeaway: "Jio EBITDA up +17.8% YoY following tariff hikes, successfully counterbalancing energy segment drag."
      },
      {
        id: "ril-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 12:45 IST",
        title: "Media release on commercial paper issuance",
        summary: "Redemption of commercial paper series CP-142 upon scheduled maturity."
      }
    ]
  },
  {
    ticker: "TCS",
    name: "Tata Consultancy Services Ltd",
    sector: "Information Technology Services",
    exchange: "NSE",
    price: 3950.00,
    priceDelta: "+0.5%",
    isPricePositive: true,
    volumeMultiple: 0.9,
    pe: 27.5,
    marketCap: "₹14,28,000 Cr",
    fiftyTwoWeekRange: "₹3,310 - ₹4,585",
    supplyChain: {
      upstream: [
        { item: "US & European Banking (BFSI) Tech Budgets", trend: "Cautious revival in discretionary tech spend", impact: "positive", note: "BFSI order intake grew +8.2% after 4 quarters of stagnation" },
        { item: "Enterprise GenAI Proof-of-Concepts to Production", trend: "GenAI pipeline doubled to $1.5 Billion", impact: "positive", note: "Transitioning from experimental pilots into enterprise billing contracts" },
        { item: "Offshore IT Wage Inflation & Attrition", trend: "Attrition dropped to 12.3% (all-time low)", impact: "positive", note: "Relieves operating margin pressure; allows 24-25% EBIT margin defense" }
      ],
      downstream: ["Global Fortune 500 Enterprises", "US Regional Banks", "European Telecoms"]
    },
    valueDrivers: [
      { driver: "Total Contract Value (TCV) Deal Wins", weight: "Critical", metric: "Quarterly TCV steady at $8.6B (book-to-bill ratio 1.2x)" },
      { driver: "EBIT Operating Margin Defense", weight: "High", metric: "Consistently operating at 24.1-24.8% EBIT margin" },
      { driver: "BFSI & Retail Vertical Turnaround", weight: "High", metric: "BFSI accounts for 32% of total revenue" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Management Commentary: 'We expect FY25 to be better than FY24 as BFSI returns to growth, and we will preserve our 26-28% aspirational margin band.'",
      actualDelivery: "Q2 Delivered: Constant currency revenue grew 5.5% YoY, but EBIT margin closed at 24.1% (below 26% aspirational band).",
      verdict: "Modest Growth, Margin Miss",
      verdictSeverity: "warning",
      fcfCheck: "Cash flow titan: 100% of Net Profit converted to Free Cash Flow; ₹9,800 Cr returned as interim dividend."
    },
    marketLayering: {
      managementIntent: "Securing large mega-cost-optimization deals while re-skilling 350,000+ employees in Enterprise AI architectures.",
      institutionalIntent: "FIIs treating TCS as an ultra-safe dollar hedge with reliable 85%+ dividend payout ratio.",
      marketFriction: "Lack of explosive revenue growth (5-7% CAGR) limits valuation multiple expansion beyond 28x."
    },
    bullVsBear: {
      bull: [
        "Unbeatable enterprise relationships and scale with over 600,000 engineers globally.",
        "Cash conversion is world-class with near 100% FCF-to-PAT ratio and >50% ROCE.",
        "US interest rate reduction cycle typically sparks revival in deferred enterprise IT modernization capex."
      ],
      bear: [
        "Clients demanding vendor rate cuts and higher productivity pass-throughs using AI tooling.",
        "European economic sluggishness delaying manufacturing and retail contract signings.",
        "Revenue growth stuck in mid-single digits compared to previous double-digit cycles."
      ]
    },
    filings: [
      {
        id: "tcs-filing-1",
        category: "press_release",
        priority: "medium",
        timestamp: "27 Oct 2026, 16:20 IST",
        title: "TCS expands partnership with McDonald's Philippines to digitize supply chain",
        summary: "Multi-year deal to modernize cloud operations and automated store inventory intelligence."
      },
      {
        id: "tcs-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "26 Oct 2026, 14:10 IST",
        title: "Submission of Reconciliation of Share Capital Audit Report",
        summary: "Routine quarterly reconciliation under SEBI Depositories and Participants regulations."
      }
    ]
  },
  {
    ticker: "ZOMATO",
    name: "Zomato Ltd (Eternal)",
    sector: "Consumer Tech & Quick Commerce",
    exchange: "NSE",
    price: 258.40,
    priceDelta: "+5.2%",
    isPricePositive: true,
    volumeMultiple: 3.2, // >3x -> ANOMALY
    pe: 112.0,
    marketCap: "₹2,28,000 Cr",
    fiftyTwoWeekRange: "₹108 - ₹298",
    supplyChain: {
      upstream: [
        { item: "Dark Store Real Estate in Metro Neighborhoods", trend: "Aggressive store rollout (adding 100 stores/qtr)", impact: "positive", note: "Blinkit expanding footprint to 1,000 dark stores by March 2025" },
        { item: "Gig Delivery Partner Availability & Wages", trend: "Supply tight in festive rush; platform fees raised to ₹10", impact: "neutral", note: "Customer platform fee increases protect per-order contribution margins" },
        { item: "FMCG Brand Ad Spends on Quick Commerce", trend: "Ad revenue surged +120% YoY", impact: "positive", note: "Brands shifting budget from TV/print directly into Blinkit search placement" }
      ],
      downstream: ["Urban Household Grocery Customers", "Restaurant Partners", "Blinkit Quick-Commerce Shoppers"]
    },
    valueDrivers: [
      { driver: "Blinkit Gross Order Value (GOV) Growth", weight: "Critical", metric: "GOV surging +125% YoY; contribution margin positive at 3.9%" },
      { driver: "Food Delivery Adjusted EBITDA Margin", weight: "High", metric: "Steady at 3.4% of GOV, funding quick-commerce dark store expansion" },
      { driver: "₹8,500 Cr QIP Institutional Fundraise", weight: "Critical", metric: "Cash war chest to fend off Swiggy and Zepto aggressive capital burns" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'Blinkit will achieve adjusted EBITDA breakeven while doubling dark store footprint within 12 months.'",
      actualDelivery: "Outcome: Blinkit delivered adjusted EBITDA breakeven in top metro clusters while GOV jumped 122% YoY.",
      verdict: "Delivered Ahead of Schedule",
      verdictSeverity: "positive",
      fcfCheck: "Strong cash generation in core food delivery; consolidated FCF kept temporarily negative by fast-paced dark store inventory build."
    },
    marketLayering: {
      managementIntent: "Transforming Blinkit into the default retail gateway for everything (electronics, toys, apparel) delivered in 10 minutes.",
      institutionalIntent: "FIIs viewing Zomato as the undisputed victor of Indian consumer tech; willing to overlook near-term QIP dilution.",
      marketFriction: "Swiggy's upcoming mega IPO and Zepto's fresh $650M funding rounds intensify delivery rider poaching wars."
    },
    bullVsBear: {
      bull: [
        "Quick commerce is actively eating modern trade and kirana market share across top 15 metros.",
        "Advertising revenue on Blinkit is high-margin (80%+ gross margin) and scaling exponentially.",
        "Food delivery business is an established cash cow generating ₹1,200+ Cr annual operating cash."
      ],
      bear: [
        "Intense capital wars as Swiggy, Zepto, and Reliance JioMart race to open dark stores next door.",
        "Valuation at 110x forward earnings requires zero missteps in quick-commerce execution.",
        "Potential regulatory interventions on gig-worker minimum wages and social security levies."
      ]
    },
    filings: [
      {
        id: "zomato-filing-1",
        category: "fund_raise",
        priority: "high",
        timestamp: "Yesterday, 20:15 IST",
        title: "Board approves raising up to ₹8,500 Cr via Qualified Institutions Placement (QIP)",
        summary: "War chest creation to strengthen balance sheet and scale quick-commerce dark store infrastructure."
      },
      {
        id: "zomato-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "26 Oct 2026, 16:50 IST",
        title: "Intimation of grant of stock options under ESOP 2018",
        summary: "Grant of 1,200,000 employee stock options at face value."
      }
    ]
  },
  {
    ticker: "TITAN",
    name: "Titan Company Ltd",
    sector: "Jewelry & Luxury Goods",
    exchange: "NSE",
    price: 3380.00,
    priceDelta: "-1.5%",
    isPricePositive: false,
    volumeMultiple: 1.5,
    pe: 78.4,
    marketCap: "₹3,00,200 Cr",
    fiftyTwoWeekRange: "₹3,055 - ₹3,886",
    supplyChain: {
      upstream: [
        { item: "Customs Duty on Gold Imports", trend: "Slashed from 15% to 6% in Union Budget", impact: "positive", note: "Sparked massive retail consumer surge; eliminates unorganized smuggling gap" },
        { item: "Global Spot Gold Bullion Rates", trend: "Record high $2,750/oz (₹78,000/10g)", impact: "neutral", note: "High gold prices elevate average ticket size, but can defer volume buying" },
        { item: "Lab-Grown Diamond (LGD) Disruption", trend: "Natural diamond prices softening -12%", impact: "negative", note: "Creates inventory value markdowns in studded jewelry segment" }
      ],
      downstream: ["Tanishq Jewelry Boutiques", "Mia Everyday Jewelry", "Titan Eye+ & Watches", "CaratLane"]
    },
    valueDrivers: [
      { driver: "Jewelry Domestic Buyer Volume Growth", weight: "Critical", metric: "Tanishq retail sales surged +25% YoY following customs duty cuts" },
      { driver: "Studded Jewelry Share in Product Mix", weight: "High", metric: "Studded ratio at 33% (vital for maintaining >12% jewelry EBIT margins)" },
      { driver: "CaratLane Omnichannel Scale", weight: "High", metric: "CaratLane revenue growing >35% YoY among younger cohort" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'The customs duty reduction will cause a one-time inventory loss in Q2, but will structural drive 20%+ volume growth thereafter.'",
      actualDelivery: "Q2 Delivered: Retail sales grew 26% YoY, but reported PAT dipped due to anticipated ₹290 Cr one-off customs duty inventory hit.",
      verdict: "Delivered as Guided",
      verdictSeverity: "positive",
      fcfCheck: "Gold metal loan mechanism provides strong working capital hedge, ensuring healthy operating cash flows."
    },
    marketLayering: {
      managementIntent: "Aggressively expanding Tanishq overseas (US, GCC, Singapore) to capture non-resident Indian wedding jewelry spend.",
      institutionalIntent: "DIIs view Titan as the ultimate beneficiary of unorganized-to-organized jewelry formalization.",
      marketFriction: "Studded diamond price volatility pressures gross margins in the near term."
    },
    bullVsBear: {
      bull: [
        "Customs duty reduction has permanently tilted market share toward transparent organized players like Tanishq.",
        "Brand trust in Tanishq gold purity gives it unrivaled pricing power on making charges.",
        "CaratLane acquisition gives complete dominance over affordable everyday jewelry."
      ],
      bear: [
        "One-time inventory losses from duty cuts distort trailing financial optics.",
        "Softness in natural diamond prices hurts high-margin studded jewelry demand.",
        "Aggressive competitive expansion by Kalyan Jewellers and Malabar Gold in South India."
      ]
    },
    filings: [
      {
        id: "titan-filing-1",
        category: "results",
        priority: "high",
        timestamp: "Yesterday, 17:20 IST",
        title: "Q2 FY25 Business Update & Quarterly Performance",
        summary: "Domestic jewelry operations grew 26% YoY driven by consumer response to customs duty cut; studded share at 33%.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹14,534 Cr", qoq: "+18.2%", yoy: "+25.8%", status: "beat" },
          ebitda: { current: "₹1,320 Cr", qoq: "+10.1%", yoy: "+8.5%", status: "inline" },
          pbt: { current: "₹1,110 Cr", qoq: "+8.4%", yoy: "+1.2%", status: "miss" },
          pat: { current: "₹825 Cr", qoq: "+7.1%", yoy: "-1.8%", status: "miss" }
        },
        keyTakeaway: "Revenue surged +25.8% YoY on duty cut, but PAT compressed temporarily due to ₹290 Cr one-off gold inventory duty adjustment."
      },
      {
        id: "titan-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "26 Oct 2026, 12:15 IST",
        title: "Submission of newspaper advertisement for board meeting",
        summary: "Mandatory statutory publication in Business Standard and Dinamani."
      }
    ]
  },
  {
    ticker: "ULTRACEMCO",
    name: "UltraTech Cement Ltd",
    sector: "Building Materials & Cement",
    exchange: "NSE",
    price: 11150.00,
    priceDelta: "+1.4%",
    isPricePositive: true,
    volumeMultiple: 1.1,
    pe: 42.0,
    marketCap: "₹3,21,800 Cr",
    fiftyTwoWeekRange: "₹8,200 - ₹12,140",
    supplyChain: {
      upstream: [
        { item: "Imported Petcoke & Fuel Costs", trend: "Petcoke prices down 8% to $105/t", impact: "positive", note: "Substantial relief in power and fuel cost per tonne of clinker" },
        { item: "Fly Ash & Slag Sourcing", trend: "Stable availability from NTPC plants", impact: "neutral", note: "Maintains blended cement ratio at 72%" },
        { item: "Freight & Diesel Logistics", trend: "Diesel prices flat; rail freight normalized", impact: "neutral", note: "Lead distance optimized to <410 km" }
      ],
      downstream: ["L&T Infrastructure Projects", "Urban Residential Construction", "Rural Housing (PMAY)"]
    },
    valueDrivers: [
      { driver: "Capacity Scale & Market Consolidation", weight: "Critical", metric: "Consolidated capacity expanding to 160+ MTPA via Kesoram & India Cements acquisitions" },
      { driver: "Operating EBITDA per Tonne", weight: "Critical", metric: "EBITDA/t at ₹1,020 (target ₹1,200/t as price hikes stick)" },
      { driver: "Rural vs Infrastructure Demand Mix", weight: "Medium", metric: "Monsoon exit reviving rural retail bag sales" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'We will achieve 150 MTPA capacity ahead of timeline while keeping net debt-to-EBITDA below 1.0x.'",
      actualDelivery: "Delivered: Capacity reached 154 MTPA post acquisition clearances; Net Debt to EBITDA maintained at 0.52x.",
      verdict: "Delivered on Capacity & Debt",
      verdictSeverity: "positive",
      fcfCheck: "Cash conversion strong: Generated ₹4,800 Cr operating cash flow in H1, easily funding greenfield debottlenecking."
    },
    marketLayering: {
      managementIntent: "Aggressively capturing 35%+ market share across South and West India to widen moat against Adani Cement.",
      institutionalIntent: "Institutions view UltraTech as the essential anchor for India's 10-year physical infrastructure buildout.",
      marketFriction: "Pricing discipline in South India remains fragile due to intense capacity battles with Adani."
    },
    bullVsBear: {
      bull: [
        "Uncontested capacity behemoth (160 MTPA), giving it unmatched freight and cost leadership.",
        "Petcoke fuel deflation provides direct operating margin expansion in Q3/Q4.",
        "Consolidated balance sheet remains pristine with net debt/EBITDA at conservative 0.5x."
      ],
      bear: [
        "Price cuts by competitors in East and South India limit ability to pass through inflation.",
        "Monsoon-induced construction delays temporarily depress quarterly volume growth.",
        "Integration execution risk across newly acquired Kesoram and India Cements assets."
      ]
    },
    filings: [
      {
        id: "ultra-filing-1",
        category: "m_and_a",
        priority: "high",
        timestamp: "Yesterday, 19:10 IST",
        title: "CCI approves acquisition of cement business of Kesoram Industries",
        summary: "Competition Commission of India grants unconditional clearance for 10.75 MTPA cement asset consolidation."
      },
      {
        id: "ultra-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 14:35 IST",
        title: "Intimation of loss of share certificates",
        summary: "Statutory notice of duplicate share request."
      }
    ]
  },
  {
    ticker: "POLYCAB",
    name: "Polycab India Ltd",
    sector: "Wires, Cables & FMEG",
    exchange: "NSE",
    price: 6680.00,
    priceDelta: "-3.1%",
    isPricePositive: false,
    volumeMultiple: 2.4, // >2x -> ANOMALY
    pe: 48.5,
    marketCap: "₹1,00,400 Cr",
    fiftyTwoWeekRange: "₹3,800 - ₹7,325",
    supplyChain: {
      upstream: [
        { item: "LME Copper Cash Settled Prices", trend: "Copper prices surged +3.8% to $9,650/t", impact: "negative", note: "Pass-through formula with dealers resets every 30 days, creating temporary margin lag" },
        { item: "Aluminum Wire Rods", trend: "Subdued (+0.5%)", impact: "neutral", note: "Used in utility power distribution cables" },
        { item: "PVC & XLPE Polymers", trend: "Soft crude keeps resin prices flat", impact: "positive", note: "Insulation compounding costs stable" }
      ],
      downstream: ["Industrial Capex / Factory Automation", "Real Estate Electrification", "Renewable Solar & Wind Farms"]
    },
    valueDrivers: [
      { driver: "Institutional & Export Cable Orders", weight: "Critical", metric: "Exports growing >30% YoY driven by US and European grid modernization" },
      { driver: "Domestic Real Estate & Infrastructure Demand", weight: "Critical", metric: "Wires & cables domestic market share expands to 25-26%" },
      { driver: "FMEG (Fans, Lights, Switches) Breakeven", weight: "Medium", metric: "Targeting positive EBIT in fast-moving consumer electricals" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'Project Leap targets ₹20,000 Cr revenue by FY26 with 12-14% sustainable EBITDA margin.'",
      actualDelivery: "Performance: Achieved ₹18,000 Cr annualized run-rate ahead of schedule with Q2 EBITDA margin at 13.5%.",
      verdict: "Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Cash cycle robust: Working capital stable at 54 days; negative net debt."
    },
    marketLayering: {
      managementIntent: "Pushing heavy into high-voltage extra-high-voltage (EHV) submarine cables and expanding distribution reach in US/Europe.",
      institutionalIntent: "FIIs treating Polycab as the prime beneficiary of data centers and renewable energy grid spending.",
      marketFriction: "Sharp copper volatility creates short-term margin compression before quarterly price revisions."
    },
    bullVsBear: {
      bull: [
        "Dominant 25% share of organized Indian wires and cables market with unmatched 4,300+ dealer network.",
        "Massive tailwinds from global power grid replacement and domestic data center construction.",
        "Superior return ratios with ROCE exceeding 30% and zero long-term debt."
      ],
      bear: [
        "Sharp spikes in LME copper can squeeze gross margins if dealer price hikes face resistance.",
        "FMEG consumer business still sub-scale and diluting overall corporate margins.",
        "Valuation at 48x trailing earnings leaves zero cushion for quarterly execution slips."
      ]
    },
    filings: [
      {
        id: "polycab-filing-1",
        category: "press_release",
        priority: "medium",
        timestamp: "Today, 11:45 IST",
        title: "Polycab bags ₹850 Cr international order for High Voltage power cables in Europe",
        summary: "Supply agreement for renewable offshore wind transmission grid with 18-month delivery schedule."
      },
      {
        id: "polycab-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "Yesterday, 13:00 IST",
        title: "Intimation of institutional investor conference schedule",
        summary: "Participation in Edelweiss Annual India Conference in Mumbai."
      }
    ]
  },
  {
    ticker: "KAYNES",
    name: "Kaynes Technology India Ltd",
    sector: "Precision EMS & Semiconductor",
    exchange: "NSE",
    price: 5240.00,
    priceDelta: "+4.8%",
    isPricePositive: true,
    volumeMultiple: 2.9, // >2x -> ANOMALY
    pe: 94.2,
    marketCap: "₹33,500 Cr",
    fiftyTwoWeekRange: "₹2,380 - ₹5,980",
    supplyChain: {
      upstream: [
        { item: "Union Cabinet approval for OSAT / ATMP Fab", trend: "₹3,300 Cr Sanand facility cleared under India Semi Mission", impact: "positive", note: "50% central subsidy + 20% state subsidy eliminates equity dilution risk" },
        { item: "High-rel PCB and Multi-layer bare boards", trend: "Domestic sourcing from Mysore plant", impact: "positive", note: "Integrated EMS design-to-assembly model" },
        { item: "Specialty Silicon Wafers", trend: "Imports from Japan and South Korea steady", impact: "neutral", note: "Pass-through to aerospace & railway clients" }
      ],
      downstream: ["Indian Railways Kavach Safety Systems", "Aerospace & Defense Electronics", "Automotive ECU Units", "Industrial IoT"]
    },
    valueDrivers: [
      { driver: "Railway Kavach Anti-Collision Ramp", weight: "Critical", metric: "Indian Railways ordering Kavach across 10,000 km track network" },
      { driver: "High-Margin Aerospace & Defense Share", weight: "High", metric: "Industrial and auto electronics deliver ~14-15% EBITDA margins" },
      { driver: "Sanand Semiconductor Assembly Commissioning", weight: "Critical", metric: "Commercial operations targeted for late 2025" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'Order book will surpass ₹5,000 Cr by FY25 end with revenue growing >60% YoY and 15% EBITDA margins.'",
      actualDelivery: "Performance: Order book crossed ₹5,038 Cr; Q2 revenue expanded 58.5% YoY with EBITDA margin at 14.8%.",
      verdict: "Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Cash flow constrained: Fast growth and railway working capital cycles require continuous working capital funding."
    },
    marketLayering: {
      managementIntent: "Positioning Kaynes as India's premier high-reliability mission-critical EMS provider and entering advanced semiconductor packaging (OSAT).",
      institutionalIntent: "Hedge funds and domestic mutual funds aggressively bidding up EMS multiples on sovereign electronics manufacturing substitution.",
      marketFriction: "High valuation multiple (94x P/E) demands non-stop 50%+ revenue growth."
    },
    bullVsBear: {
      bull: [
        "Highest EBITDA margin profile (14-15%) in Indian EMS industry due to focus on mission-critical railway and defense electronics.",
        "Direct beneficiary of the multi-billion dollar Kavach rail safety rollout.",
        "Sanand OSAT semiconductor facility positions company at the apex of India's chip ecosystem."
      ],
      bear: [
        "Working capital cycle stretched to 110+ days due to government railway billing cycles.",
        "Very high valuation multiple (94x P/E) creates high sensitivity to any quarterly revenue lumpy delays.",
        "Execution risks in setting up clean-room semiconductor packaging facilities from scratch."
      ]
    },
    filings: [
      {
        id: "kaynes-filing-1",
        category: "press_release",
        priority: "high",
        timestamp: "Today, 12:30 IST",
        title: "Kaynes receives ₹420 Cr order for Railway Kavach automatic train protection systems",
        summary: "Supply and installation contract from Western Railway zone with 12-month delivery timeline."
      },
      {
        id: "kaynes-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 15:40 IST",
        title: "Intimation of investor meet under Reg 30",
        summary: "Participation in virtual analyst group call hosted by Kotak Equities."
      }
    ]
  },
  {
    ticker: "ICICIBANK",
    name: "ICICI Bank Ltd",
    sector: "Banking & Financial Services",
    exchange: "NSE",
    price: 1265.00,
    priceDelta: "+1.2%",
    isPricePositive: true,
    volumeMultiple: 1.0,
    pe: 17.6,
    marketCap: "₹8,92,000 Cr",
    fiftyTwoWeekRange: "₹910 - ₹1,310",
    supplyChain: {
      upstream: [
        { item: "Systemic Retail Deposit Mobilization", trend: "Deposits growing +15.7% YoY", impact: "positive", note: "Outpacing HDFC Bank and systemic deposit growth" },
        { item: "RBI Unsecured Lending Risk Weights", trend: "Personal loan growth deliberately moderated to +12%", impact: "positive", note: "De-risks asset quality before any credit cycle turn" },
        { item: "Corporate Capex Loan Demand", trend: "Private capex syndications picking up +14%", impact: "positive", note: "High-grade corporate loan pricing power intact" }
      ],
      downstream: ["Retail Mortgages & Auto Loans", "Corporate Syndication", "SME Business Banking", "iMobile Pay Ecosystem"]
    },
    valueDrivers: [
      { driver: "Return on Assets (RoA) & RoE Sustainability", weight: "Critical", metric: "RoA at best-in-class 2.36%, RoE steady at 18.8%" },
      { driver: "Net Interest Margin (NIM) Stability", weight: "High", metric: "NIM held resilient at 4.27% despite industry deposit cost pressures" },
      { driver: "Credit Costs & Slippages", weight: "High", metric: "Net slippages negligible; Net NPA at pristine 0.42%" }
    ],
    narrativeVsNumbers: {
      concallPromise: "Guidance: 'We will maintain a risk-calibrated approach to core operating profit growth and deliver sustained 2.2-2.3% RoA.'",
      actualDelivery: "Performance: Q2 RoA delivered at 2.36%; core operating profit grew 12.1% YoY with zero asset quality stress.",
      verdict: "Over-Delivered",
      verdictSeverity: "positive",
      fcfCheck: "Capital adequacy superior: Tier-1 CET-1 ratio at 16.2% enables organic balance sheet expansion without equity dilution."
    },
    marketLayering: {
      managementIntent: "Underwriting profitable risk-calibrated credit without chasing unremunerative market share; maximizing digital straight-through processing.",
      institutionalIntent: "FIIs' most overweight Indian bank due to superior execution, consistent NIMs, and lack of merger integration headwinds.",
      marketFriction: "Industry-wide deposit competition creates upward pressure on term deposit interest rates."
    },
    bullVsBear: {
      bull: [
        "Gold standard in Indian private banking execution with sector-leading 2.36% RoA and 18.8% RoE.",
        "Domestic loan growth balanced across retail, SME, and high-rated corporates.",
        "Digital app 'iMobile' has highest user engagement and low operating cost structure."
      ],
      bear: [
        "Unsecured personal loans and credit cards facing mild industry-wide delinquency uptick.",
        "NIMs could face 10-15 bps compression as high-rate term deposits re-price.",
        "High institutional ownership (FIIs hold 44%) leaves it sensitive to foreign capital outflow waves."
      ]
    },
    filings: [
      {
        id: "icici-filing-1",
        category: "results",
        priority: "high",
        timestamp: "26 Oct 2026, 14:00 IST",
        title: "Q2 FY25 Audited Financial Results",
        summary: "Net profit surges 14.5% YoY to ₹11,746 Cr; Net NPA down to 0.42%; RoA at 2.36%.",
        financials: {
          quarter: "Q2 FY25",
          revenue: { current: "₹47,714 Cr", qoq: "+5.1%", yoy: "+16.8%", status: "beat" },
          ebitda: { current: "₹16,043 Cr", qoq: "+6.8%", yoy: "+12.1%", status: "beat" }, // Core Operating Profit
          pbt: { current: "₹15,620 Cr", qoq: "+7.2%", yoy: "+13.9%", status: "beat" },
          pat: { current: "₹11,746 Cr", qoq: "+6.2%", yoy: "+14.5%", status: "beat" }
        },
        keyTakeaway: "Best-in-class quarterly banking report with RoA holding firm at 2.36% and deposit growth (+15.7%) outpacing loans."
      },
      {
        id: "icici-filing-2",
        category: "unclassified",
        priority: "low",
        timestamp: "27 Oct 2026, 10:30 IST",
        title: "Schedule of analysts and institutional investor call",
        summary: "Details of earnings call and audio recording link disclosure pursuant to Reg 30."
      }
    ]
  }
];


