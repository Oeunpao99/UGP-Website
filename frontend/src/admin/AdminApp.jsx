import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { adminLogout, adminMe } from './adminApi'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import AdminProducts from './pages/AdminProducts'
import AdminEvents from './pages/AdminEvents'
import AdminCareers from './pages/AdminCareers'
import AdminClients from './pages/AdminClients'
import AdminSettings from './pages/AdminSettings'
import AdminChats from './pages/AdminChats'

export default function AdminApp() {
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

  return (
    <Routes>
      <Route
        path="login"
        element={status === 'authed' ? <Navigate to="/admin/products" replace /> : <AdminLogin onSuccess={checkAuth} />}
      />
      <Route
        element={
          status === 'authed' ? (
            <AdminLayout username={username} onLogout={handleLogout} />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="*" element={<Navigate to="products" replace />} />
      </Route>
    </Routes>
  )
}
