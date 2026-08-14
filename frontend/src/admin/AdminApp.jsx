import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { adminLogout, adminMe } from './adminApi'
import { AdminLangProvider } from './lang'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import AdminProducts from './pages/AdminProducts'
import AdminEvents from './pages/AdminEvents'
import AdminCareers from './pages/AdminCareers'
import AdminClients from './pages/AdminClients'
import AdminSettings from './pages/AdminSettings'
import AdminChats from './pages/AdminChats'

function AdminApp() {
  const [status, setStatus] = useState('loading') // loading | authed | anon
  const [username, setUsername] = useState('')

  function checkAuth() {
    setStatus('loading')
    adminMe()
      .then((r) => {
        setUsername(r.username)
        setStatus('authed')
      })
      .catch(() => setStatus('anon'))
  }

  useEffect(() => {
    checkAuth()
  }, [])

  async function handleLogout() {
    await adminLogout().catch(() => {})
    setStatus('anon')
  }

  if (status === 'loading') {
    return <div className="grid min-h-screen place-items-center bg-paper text-grey">Loading…</div>
  }

  if (status !== 'authed') {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin onSuccess={checkAuth} />} />
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    )
  }

  return (
    <AdminLayout username={username} onLogout={handleLogout}>
      <Routes>
        <Route path="/admin/login" element={<Navigate to="/admin/products" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/products" replace />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/careers" element={<AdminCareers />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/chats" element={<AdminChats />} />
        <Route path="/admin/*" element={<Navigate to="/admin/products" replace />} />
      </Routes>
    </AdminLayout>
  )
}

export default function AdminAppRoot() {
  return (
    <AdminLangProvider>
      <AdminApp />
    </AdminLangProvider>
  )
}
