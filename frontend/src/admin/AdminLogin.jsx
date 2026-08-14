import { useState } from 'react'
import { adminLogin } from './adminApi'
import { Field, TextInput, BTN } from './ui'

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await adminLogin(username, password)
      onSuccess()
    } catch {
      setError('Invalid username or password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-paper px-4">
      <form onSubmit={submit} className="w-full max-w-[360px] rounded-[16px] border border-line bg-card p-8">
        <h1 className="mb-1 font-display text-[1.3rem] font-bold">UPG Admin</h1>
        <p className="mb-6 text-[.88rem] text-grey">Sign in to manage site content.</p>
        {error && (
          <p className="mb-4 rounded-[8px] bg-[#FDECEC] px-3 py-2 text-[.85rem] text-[#C0392B]">{error}</p>
        )}
        <div className="mb-4">
          <Field label="Username">
            <TextInput value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </Field>
        </div>
        <div className="mb-6">
          <Field label="Password">
            <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
        </div>
        <button type="submit" disabled={busy} className={`${BTN} w-full justify-center`}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
