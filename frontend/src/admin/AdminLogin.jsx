import { useState } from 'react'
import { adminLogin } from './adminApi'
import { usePageLang } from './lang'
import { TextInput, Alert, BTN } from './ui'

const T = {
  en: {
    'studio': 'Content studio',
    'title': 'Sign in to manage site content.',
    'username': 'Username',
    'password': 'Password',
    'signin': 'Sign in',
    'signing': 'Signing in…',
    'error': 'Invalid username or password.',
    'lang': 'Language',
  },
  km: {
    'studio': 'ស្ទូឌីយោមាតិកា',
    'title': 'ចូលប្រើដើម្បីគ្រប់គ្រងខ្លឹមសារគេហទំព័រ។',
    'username': 'ឈ្មោះអ្នកប្រើ',
    'password': 'ពាក្យសម្ងាត់',
    'signin': 'ចូលប្រើ',
    'signing': 'កំពុងចូលប្រើ…',
    'error': 'ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។',
    'lang': 'ភាសា',
  },
}

export default function AdminLogin({ onSuccess }) {
  const { t, lang, setLang } = usePageLang(T)
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
      setError(t('error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-shell relative grid min-h-screen place-items-center overflow-hidden bg-ink px-4">
      <span className="pointer-events-none absolute -top-32 -right-24 h-[440px] w-[440px] rounded-full border-[56px] border-white/[0.04]" />
      <span className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full border-[56px] border-white/[0.04]" />

      <div className="absolute top-5 right-5 flex items-center gap-1 rounded-full border border-white/[0.12] bg-white/[0.04] p-1">
        <span className="sr-only">{t('lang')}</span>
        {(['en', 'km']).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`cursor-pointer rounded-full border-0 px-3 py-1.5 text-[.72rem] font-semibold transition-colors duration-200 ${
              lang === code ? 'bg-yellow text-ink' : 'bg-transparent text-white/55 hover:text-white'
            }`}
          >
            {code === 'en' ? 'EN' : 'ខ្មែរ'}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="w-full max-w-[380px] rounded-[18px] border border-white/[0.1] bg-white/[0.04] p-9 shadow-[0_30px_60px_-40px_rgba(0,0,0,.8)] backdrop-blur">
        <span className="mb-6 grid h-12 w-12 place-items-center rounded-[14px] bg-yellow font-display text-[1.2rem] font-black text-ink">
          U
        </span>
        <p className="font-mono text-[.68rem] font-semibold uppercase tracking-[.22em] text-yellow">{t('studio')}</p>
        <h1 className="mt-2 mb-1 font-display text-[1.5rem] font-bold tracking-tight text-white">UPG Admin</h1>
        <p className="mb-7 text-[.9rem] text-white/55">{t('title')}</p>

        {error && <Alert kind="error">{error}</Alert>}

        <div className="mb-4">
          <label className="mb-1.5 block text-[.8rem] font-semibold text-white/80">{t('username')}</label>
          <TextInput value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        </div>
        <div className="mb-7">
          <label className="mb-1.5 block text-[.8rem] font-semibold text-white/80">{t('password')}</label>
          <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" disabled={busy} className={`${BTN} w-full justify-center`}>
          {busy ? t('signing') : t('signin')}
        </button>
      </form>
    </div>
  )
}
