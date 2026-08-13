const BASE = import.meta.env.VITE_API_BASE || ''

async function api(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

function qs(params) {
  const parts = Object.entries(params)
    .filter(([, v]) => v && v !== 'all' && v !== 'en')
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
  return parts.length ? `?${parts.join('&')}` : ''
}

export const getMeta = () => api('/api/meta')
export const getProducts = (brand, lang) =>
  api('/api/products' + qs({ brand, lang }))
export const getProduct = (id, lang) =>
  api(`/api/products/${encodeURIComponent(id)}` + qs({ lang }))
export const getFittings = (lang) => api('/api/fittings' + qs({ lang }))
export const getEvents = (kind, lang) =>
  api('/api/events' + qs({ kind, lang }))
export const getJobs = (lang) => api('/api/jobs' + qs({ lang }))
export const getClients = () => api('/api/clients')
export const sendQuote = (payload) =>
  api('/api/quote', { method: 'POST', body: JSON.stringify(payload) })
export const sendChat = (message, history = []) =>
  api('/api/chat', { method: 'POST', body: JSON.stringify({ message, history }) })
