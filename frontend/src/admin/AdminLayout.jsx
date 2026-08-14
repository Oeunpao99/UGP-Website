import { NavLink } from 'react-router-dom'
import { usePageLang } from './lang'

const ICON = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const w = 'h-[17px] w-[17px] flex-none'

const T = {
  en: { 'studio': 'Content studio', 'administrator': 'Administrator', 'logout': 'Log out' },
  km: { 'studio': 'ស្ទូឌីយោមាតិកា', 'administrator': 'អ្នកគ្រប់គ្រង', 'logout': 'ចាកចេញ' },
}

const NAV = [
  {
    to: '/admin/products',
    label: 'Products',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><path d="M21 8l-9-5-9 5v8l9 5 9-5V8Z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>,
  },
  {
    to: '/admin/events',
    label: 'Events',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  },
  {
    to: '/admin/careers',
    label: 'Careers',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  },
  {
    to: '/admin/clients',
    label: 'Clients',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    to: '/admin/settings',
    label: 'Company info',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>,
  },
  {
    to: '/admin/chats',
    label: 'Chat conversations',
    icon: <svg viewBox="0 0 24 24" {...ICON} className={w}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" /></svg>,
  },
]

export default function AdminLayout({ username, onLogout, children }) {
  const { t, lang, setLang } = usePageLang(T)

  return (
    <div className="flex h-screen overflow-hidden bg-paper text-fg">
      <aside className="flex w-[248px] flex-none flex-col bg-ink text-white">
        <div className="border-b border-white/[0.08] px-5 py-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-yellow font-display text-[1.05rem] font-black text-ink">
              U
            </span>
            <div>
              <b className="block font-display text-[1.08rem] font-bold leading-none tracking-tight">UPG Admin</b>
              <span className="mt-1.5 block font-mono text-[.64rem] uppercase tracking-[.2em] text-white/45">
                {t('studio')}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-[10px] px-3 py-[10px] text-[.88rem] transition-colors duration-200 ${
                  isActive
                    ? 'bg-white/[0.09] font-semibold text-yellow'
                    : 'text-white/65 hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              {n.icon}
              {t(n.label)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/[0.08] px-4 py-4">
          <div className="mb-3 flex items-center gap-1 rounded-[10px] border border-white/[0.12] bg-white/[0.04] p-1">
            {(['en', 'km']).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`flex-1 cursor-pointer rounded-[7px] border-0 py-1.5 text-[.72rem] font-semibold transition-colors duration-200 ${
                  lang === code ? 'bg-yellow text-ink' : 'bg-transparent text-white/55 hover:text-white'
                }`}
              >
                {code === 'en' ? 'EN' : 'ខ្មែរ'}
              </button>
            ))}
          </div>
          <div className="mb-3 px-2">
            <div className="truncate text-[.86rem] font-semibold">{username}</div>
            <div className="mt-0.5 font-mono text-[.64rem] uppercase tracking-[.16em] text-white/40">
              {t('administrator')}
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-white/[0.12] bg-transparent px-3 py-2.5 text-[.84rem] font-semibold text-white/70 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
          >
            <svg viewBox="0 0 24 24" {...ICON} className="h-[15px] w-[15px] flex-none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5M21 12H9" />
            </svg>
            {t('logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
