import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fetchStockEOD } from './yahoo.js';
import { fetchScreenerFundamentals } from './screener.js';
import { analyzeTickerWithAI } from './ai.js';
import { getCache, setCache } from './cache.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
// Health & Model Configuration check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    tasks: {
      pullResearch: process.env.MODEL_PULL_RESEARCH || 'gemini-3.5-flash-lite',
      narrativeAudit: process.env.MODEL_NARRATIVE_AUDIT || 'gemini-3.5-flash-lite',
      filingsTriage: process.env.MODEL_FILINGS_TRIAGE || 'gemini-3.5-flash-lite',
      execEnrichment: process.env.MODEL_EXEC_ENRICHMENT || 'gemini-3.5-flash-lite',
      fallback: process.env.MODEL_FALLBACK || 'gemini-2.5-flash-lite'
    },
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Single stock live EOD & fundamentals
app.get('/api/stock/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const [eod, fundamentals] = await Promise.all([
      fetchStockEOD(ticker),
      fetchScreenerFundamentals(ticker)
    ]);
    res.json({ success: true, data: { ...eod, fundamentals } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complete on-demand research endpoint (Pull mode)
app.post('/api/research', async (req, res) => {
  try {
    const { ticker } = req.body;
    if (!ticker) {
      return res.status(400).json({ success: false, error: 'Ticker is required' });
    }

    const cleanTicker = ticker.trim().toUpperCase();
    const [eod, fundamentals] = await Promise.all([
      fetchStockEOD(cleanTicker),
      fetchScreenerFundamentals(cleanTicker)
    ]);

    const analysis = await analyzeTickerWithAI(cleanTicker, eod, fundamentals);

    res.json({
      success: true,
      data: {
        ...eod,
        fundamentals,
        ...analysis
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend static build if present
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`FINN Backend API running on port ${PORT}`);
});
