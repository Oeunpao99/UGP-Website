import { useEffect, useState } from 'react'
import { listChats, getChatMessages } from '../adminApi'
import { usePageLang } from '../lang'
import { Card, PageHeader, Alert, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'back': 'Back to conversations',
    'noMessages': 'No messages yet.',
    'empty': 'No chat visitors yet.',
  },
  km: {
    'back': 'ត្រឡប់ទៅការសន្ទនា',
    'noMessages': 'មិនទាន់មានសារនៅឡើយទេ។',
    'empty': 'មិនទាន់មានអ្នកទស្សនាជជែកនៅឡើយទេ។',
  },
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

  if (selected) {
    return (
      <div className="max-w-[700px]">
        <button type="button" className="mb-4 cursor-pointer border-0 bg-transparent text-[.86rem] text-blue" onClick={() => setSelected(null)}>
          ← {t('back')}
        </button>
        <PageHeader title={selected.name || selected.email || selected.id} eyebrow={t('eyebrow')} />
        <p className="mb-5 text-[.86rem] text-grey">{selected.email}</p>
        <Card className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[80%] rounded-[12px] px-4 py-2 text-[.9rem] ${m.role === 'user' ? 'ml-auto bg-blue text-white' : 'bg-paper'}`}>
              <div>{m.text}</div>
              <div className={`mt-1 text-[.68rem] ${m.role === 'user' ? 'text-white/70' : 'text-grey'}`}>{fmt(m.created_at)}</div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-[.88rem] text-grey">{t('noMessages')}</p>}
        </Card>
      </div>
    )
  }

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
    </div>
  )
}
