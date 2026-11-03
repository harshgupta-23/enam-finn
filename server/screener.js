import { getCache, setCache } from './cache.js';

export async function fetchScreenerFundamentals(tickerSymbol) {
  const cleanTicker = tickerSymbol.trim().toUpperCase().replace(".NS", "").replace(".BO", "");
  const cacheKey = `screener_${cleanTicker}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://www.screener.in/company/${cleanTicker}/consolidated/`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!res.ok) throw new Error(`Screener status ${res.status}`);
    const html = await res.text();

    // Primary document links extraction
    const primaryLinks = {
      screenerUrl: url,
      concallLink: `https://www.screener.in/company/${cleanTicker}/#concalls`,
      annualReportLink: `https://www.screener.in/company/${cleanTicker}/#annual-reports`,
      source: "screener.in (Primary Company Disclosures)"
    };

    setCache(cacheKey, primaryLinks);
    return primaryLinks;
  } catch (err) {
    return {
      screenerUrl: `https://www.screener.in/company/${cleanTicker}/`,
      concallLink: `https://www.screener.in/company/${cleanTicker}/#concalls`,
      annualReportLink: `https://www.screener.in/company/${cleanTicker}/#annual-reports`,
      source: "screener.in (Primary Company Disclosures)",
      isFallback: true
    };
  }
}

