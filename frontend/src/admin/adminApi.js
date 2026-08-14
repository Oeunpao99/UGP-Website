const BASE = import.meta.env.VITE_API_BASE || ''

async function api(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  })
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`)
    err.status = res.status
    throw err
  }
  if (res.status === 204) return null
  return res.json()
}

export const adminLogin = (username, password) =>
  api('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) })
export const adminLogout = () => api('/api/admin/logout', { method: 'POST' })
export const adminMe = () => api('/api/admin/me')

export const listProducts = () => api('/api/admin/products')
export const createProduct = (item) => api('/api/admin/products', { method: 'POST', body: JSON.stringify(item) })
export const updateProduct = (id, item) =>
  api(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(item) })
export const deleteProduct = (id) => api(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const listEvents = () => api('/api/admin/events')
export const createEvent = (item) => api('/api/admin/events', { method: 'POST', body: JSON.stringify(item) })
export const updateEvent = (id, item) =>
  api(`/api/admin/events/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(item) })
export const deleteEvent = (id) => api(`/api/admin/events/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const listJobs = () => api('/api/admin/jobs')
export const createJob = (item) => api('/api/admin/jobs', { method: 'POST', body: JSON.stringify(item) })
export const updateJob = (id, item) =>
  api(`/api/admin/jobs/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(item) })
export const deleteJob = (id) => api(`/api/admin/jobs/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const listClients = () => api('/api/admin/clients')
export const createClient = (item) => api('/api/admin/clients', { method: 'POST', body: JSON.stringify(item) })
export const updateClient = (id, item) =>
  api(`/api/admin/clients/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(item) })
export const deleteClient = (id) => api(`/api/admin/clients/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const getAdminMeta = () => api('/api/admin/meta')
export const updateAdminMeta = (item) => api('/api/admin/meta', { method: 'PUT', body: JSON.stringify(item) })

export const listChats = () => api('/api/admin/chats')
export const getChatMessages = (userId) => api(`/api/admin/chats/${encodeURIComponent(userId)}`)
