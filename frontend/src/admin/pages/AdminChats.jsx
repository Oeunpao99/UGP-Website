import { useEffect, useState } from 'react'
import { listChats, getChatMessages } from '../adminApi'
import { usePageLang } from '../lang'
import { Card, PageHeader, Alert, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'close': 'Close',
    'noMessages': 'No messages yet.',
    'empty': 'No chat visitors yet.',
  },
  km: {
    'close': 'បិទ',
    'noMessages': 'មិនទាន់មានសារនៅឡើយទេ។',
    'empty': 'មិនទាន់មានអ្នកទស្សនាជជែកនៅឡើយទេ។',
  },
}

const AVATAR_COLORS = ['bg-blue', 'bg-green-600', 'bg-yellow-deep', 'bg-red', 'bg-blue-lite', 'bg-ink-2']

function initials(name, email) {
  const src = (name || email || '?').trim()
  const parts = src.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

function colorFor(id) {
  let h = 0
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function AdminChats() {
  const { t } = usePageLang(T)
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    listChats().then((r) => setUsers(r.items)).catch((e) => setError(String(e)))
  }, [])

  function open(user) {
    setSelected(user)
    getChatMessages(user.id).then((r) => setMessages(r.items)).catch((e) => setError(String(e)))
  }

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <div>
      <PageHeader title={t('nav.chats')} eyebrow={t('eyebrow')} />
      {error && <Alert kind="error">{error}</Alert>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{t('th.visitor')}</th>
              <th className={TH}>{t('th.email')}</th>
              <th className={TH}>{t('th.messages')}</th>
              <th className={TH}>{t('th.lastActive')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="cursor-pointer hover:bg-paper" onClick={() => open(u)}>
                <td className={TD}>{u.name || '—'}</td>
                <td className={TD}>{u.email}</td>
                <td className={TD}>{u.message_count}</td>
                <td className={TD}>{fmt(u.last_seen)}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td className={TD} colSpan={4}>{t('empty')}</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {selected && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(5,14,27,.6)] p-6 backdrop-blur-[3px]"
          onClick={() => setSelected(null)}
        >
          <div
            className="flex max-h-[86vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[16px] border border-line bg-card shadow-[0_40px_120px_rgba(0,0,0,.5)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name || selected.email || selected.id}
          >
            <div className="flex items-center gap-3 border-b border-line bg-ink px-5 py-4 text-white">
              <span className={`grid h-10 w-10 flex-none place-items-center rounded-full font-display text-[.85rem] font-bold text-white ${colorFor(selected.id)}`}>
                {initials(selected.name, selected.email)}
              </span>
              <span className="min-w-0 flex-1">
                <b className="block truncate font-display text-[.98rem] font-bold leading-tight">{selected.name || selected.email || selected.id}</b>
                <span className="mt-[2px] block truncate text-[.78rem] text-white/60">{selected.email}</span>
              </span>
              <button
                type="button"
                aria-label={t('close')}
                onClick={() => setSelected(null)}
                className="flex-none cursor-pointer rounded-full border border-white/15 bg-white/[0.06] px-3 py-[7px] text-[.85rem] text-white/80 transition-colors duration-150 hover:border-white/30 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-paper px-5 py-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[75%] rounded-[14px] px-4 py-[10px] text-[.9rem] leading-relaxed ${
                    m.role === 'user' ? 'ml-auto rounded-br-[4px] bg-blue text-white' : 'rounded-bl-[4px] border border-line bg-card'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{m.text}</div>
                  <div className={`mt-1 text-[.66rem] ${m.role === 'user' ? 'text-white/70' : 'text-grey'}`}>{fmt(m.created_at)}</div>
                </div>
              ))}
              {messages.length === 0 && <p className="text-[.88rem] text-grey">{t('noMessages')}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
