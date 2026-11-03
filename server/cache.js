import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.resolve(process.cwd(), '.cache_store.json');

// In-memory cache map
const memoryCache = new Map();

// Load persistent cache from disk if available
try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([k, v]) => memoryCache.set(k, v));
  }
} catch (err) {
  console.warn('Cache file init warning:', err.message);
}

export function getCache(key) {
  const item = memoryCache.get(key);
  if (!item) return null;
  // Expire after 6 hours to balance freshness and $0 cost
  if (Date.now() - item.timestamp > 6 * 60 * 60 * 1000) {
    memoryCache.delete(key);
    return null;
  }
  return item.data;
}

export function setCache(key, data) {
  memoryCache.set(key, { data, timestamp: Date.now() });
  try {
    const obj = {};
    memoryCache.forEach((v, k) => { obj[k] = v; });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal if writing disk fails in sandboxed environment
  }
}
