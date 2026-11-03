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
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ''),
    timestamp: new Date().toISOString()
  });
});

// Direct Gemini API Test Endpoint
app.get('/api/test-gemini', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return res.json({
      success: false,
      hasKey: false,
      message: 'GEMINI_API_KEY is not set in .env. Paste your free key from https://aistudio.google.com/ into .env to enable live AI responses.'
    });
  }

  const model = process.env.MODEL_FALLBACK || 'gemini-2.5-flash-lite';
  const startTime = Date.now();

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond strictly in JSON: {"status": "connected", "message": "Google Gemini API is live and responding!"}' }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const latency = Date.now() - startTime;

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(geminiRes.status).json({
        success: false,
        hasKey: true,
        status: geminiRes.status,
        error: errText,
        message: `Google API error (${geminiRes.status}). Verify your API key or model permissions.`
      });
    }

    const data = await geminiRes.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = rawText ? JSON.parse(rawText) : data;

    res.json({
      success: true,
      hasKey: true,
      modelUsed: model,
      latencyMs: latency,
      response: parsed,
      message: `Gemini API connected successfully in ${latency}ms!`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      hasKey: true,
      error: err.message,
      message: `Network error connecting to Gemini API: ${err.message}`
    });
  }
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
