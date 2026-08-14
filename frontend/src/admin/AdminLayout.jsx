import { NavLink, Outlet } from 'react-router-dom'

const NAV = [
  { to: 'products', label: 'Products' },
  { to: 'events', label: 'Events' },
  { to: 'careers', label: 'Careers' },
  { to: 'clients', label: 'Clients' },
  { to: 'settings', label: 'Company info' },
  { to: 'chats', label: 'Chat conversations' },
]

export default function AdminLayout({ username, onLogout }) {
  return (
    <div className="flex min-h-screen bg-paper text-fg">
      <aside className="flex w-[220px] flex-none flex-col border-r border-line bg-card">
        <div className="border-b border-line px-5 py-5">
          <b className="font-display text-[1.05rem] font-bold">UPG Admin</b>
          <div className="mt-1 truncate text-[.78rem] text-grey">{username}</div>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className="block px-5 py-[10px] text-[.9rem] text-fg transition-colors hover:bg-paper aria-current:bg-paper aria-current:font-semibold aria-current:text-blue"
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={onLogout}
          className="cursor-pointer border-0 border-t border-line bg-transparent px-5 py-4 text-left text-[.86rem] text-grey hover:text-fg"
        >
          Log out
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
