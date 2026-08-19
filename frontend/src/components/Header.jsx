import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { loc } from '../links'

const NAV = [
  { to: '/home', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/products', key: 'nav.products' },
  { to: '/events', key: 'nav.events' },
  { to: '/careers', key: 'nav.careers' },
  { to: '/contact', key: 'nav.contact' },
]

const PRODUCT_MENU = [
  {
    titleKey: 'nav.products.upvc',
    items: [
      { id: 'upvc', key: 'contact.product.upvc' },
      { id: 'fittings', key: 'contact.product.fittings' },
    ],
  },
  {
    titleKey: 'nav.products.ppr',
    items: [{ id: 'ppr', key: 'contact.product.ppr' }],
  },
  {
    titleKey: 'nav.products.hdpe',
    items: [{ id: 'hdpe', key: 'contact.product.hdpe' }],
  },
  {
    titleKey: 'nav.products.electrical',
    items: [
      { id: 'conduit', key: 'contact.product.conduit' },
      { id: 'corrugated', key: 'contact.product.corr' },
      { id: 'trunking', key: 'contact.product.trunking' },
      { id: 'condfit', key: 'contact.product.condfit' },
    ],
  },
]

const NAV_LINK =
  'relative flex flex-1 max-w-[104px] items-center justify-center whitespace-nowrap rounded-lg px-[10px] py-[10px] text-[.93rem] font-medium text-fg transition hover:bg-paper ' +
  'after:absolute after:left-[12px] after:right-[12px] after:bottom-[2px] after:h-[3px] after:origin-left after:rounded-sm ' +
  'after:bg-yellow after:scale-x-0 after:transition-transform after:duration-300 after:ease-brand ' +
  'aria-current:font-semibold aria-current:text-blue aria-current:after:scale-x-100'

export default function Header() {
  const { lang, t, tAlt } = useI18n()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const closeTimer = useRef(null)

  const openProducts = () => {
    clearTimeout(closeTimer.current)
    setProductsOpen(true)
  }
  const closeProducts = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 150)
  }

  const switchLang = (l) => {
    const parts = pathname.split('/')
    if (parts[1] === 'en' || parts[1] === 'km') parts[1] = l
    else parts.unshift('', l)
    navigate(parts.join('/') || `/${l}/home`)
  }

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`sticky top-0 z-[60] border-b border-line bg-card backdrop-blur-[14px] transition-shadow duration-300${stuck ? ' shadow-[0_14px_34px_-26px_rgba(27,68,156,.7)]' : ''}`}>
        <div className="shell flex h-[74px] items-center gap-[16px]">
          <Link to={loc(lang, '/home')} className="flex flex-none items-center pl-[6px]" aria-label="UPG PIPE home">
            <img src="/images/logo.jpg" alt="UPG PIPE CO., LTD" className="h-[58px] w-[58px] flex-none rounded-full border-[3px] border-blue object-cover" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-[2px] md:flex" aria-label={t('nav.main')}>
            {NAV.map((n) =>
              n.to === '/products' ? (
                <div key={n.to} className="flex flex-1 max-w-[104px]" onMouseEnter={openProducts} onMouseLeave={closeProducts} onFocus={openProducts}>
                  <NavLink to={loc(lang, n.to)} end className={NAV_LINK + ' w-full'} aria-expanded={productsOpen}>
                    {t(n.key)}
                  </NavLink>
                </div>
              ) : (
                <NavLink key={n.to} to={loc(lang, n.to)} end={n.to === '/home'} className={NAV_LINK}>
                  {t(n.key)}
                </NavLink>
              )
            )}
          </nav>

          <div className="relative flex flex-none items-center gap-[3px] rounded-full border border-line bg-paper p-[3px]" role="group" aria-label="Language">
            <span
              aria-hidden="true"
              className="absolute inset-y-[3px] left-[3px] w-[56px] rounded-full bg-ink transition-transform duration-300 ease-brand"
              style={{ transform: lang === 'km' ? 'translateX(59px)' : 'translateX(0)' }}
            />
            <button
              type="button"
              aria-pressed={lang === 'en'}
              onClick={() => switchLang('en')}
              className="relative z-10 w-[56px] cursor-pointer rounded-full border-0 bg-transparent py-2 text-center font-mono text-[.72rem] font-semibold tracking-[.05em] text-grey transition-colors duration-200 hover:text-fg aria-pressed:text-yellow"
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={lang === 'km'}
              onClick={() => switchLang('km')}
              className="relative z-10 w-[56px] cursor-pointer rounded-full border-0 bg-transparent py-2 text-center font-mono text-[.72rem] font-semibold tracking-[.05em] text-grey transition-colors duration-200 hover:text-fg aria-pressed:text-yellow"
            >
              ខ្មែរ
            </button>
          </div>

          <button
            type="button"
            aria-label={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
            onClick={toggle}
            className="grid h-[42px] w-[42px] flex-none cursor-pointer place-items-center rounded-full border border-line bg-paper text-grey transition-colors duration-200 hover:text-fg"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>

          <Link to={loc(lang, '/contact')} className="btn hidden w-[180px] justify-center px-5 py-[11px] text-[.88rem] xl:inline-flex">
            {t('nav.quote')} <span className="ar">→</span>
          </Link>

          <button
            className="group flex h-[46px] w-[46px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[11px] border border-line-strong bg-card md:hidden"
            aria-expanded={open}
            aria-controls="drawer"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-[2px] w-[19px] bg-fg transition-transform duration-300 ease-brand first:group-aria-expanded:translate-y-[7px] first:group-aria-expanded:rotate-45" />
            <span className="h-[2px] w-[19px] bg-fg transition-opacity duration-300 group-aria-expanded:opacity-0" />
            <span className="h-[2px] w-[19px] bg-fg transition-transform duration-300 ease-brand last:group-aria-expanded:-translate-y-[7px] last:group-aria-expanded:-rotate-45" />
          </button>
        </div>

        <div
          className={`absolute inset-x-0 top-full z-10 border-t border-b border-line bg-card shadow-[0_18px_40px_-20px_rgba(27,68,156,.35)] transition-all duration-200 ease-brand ${
            productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-[4px] opacity-0'
          }`}
          onMouseEnter={openProducts}
          onMouseLeave={closeProducts}
        >
          <div className="shell grid grid-cols-4 gap-[22px] py-[26px]">
            {PRODUCT_MENU.map((group) => (
              <div key={group.titleKey}>
                <h4 className="mb-[10px] text-[.82rem] font-bold leading-[1.3] text-fg" style={lang === 'km' ? { fontFamily: 'var(--kh)' } : undefined}>
                  {t(group.titleKey)}
                </h4>
                <ul className="m-0 list-none p-0">
                  {group.items.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`${loc(lang, '/products')}/${p.id}`}
                        className="block cursor-pointer whitespace-nowrap rounded-[6px] py-[6px] text-[.84rem] text-grey transition-colors duration-150 hover:text-blue"
                      >
                        {t(p.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={`border-t border-line bg-card md:hidden${open ? ' block' : ' hidden'}`} id="drawer">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={loc(lang, n.to)}
              end={n.to === '/home'}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 border-b border-line px-[22px] py-[15px] font-semibold aria-current:bg-paper aria-current:text-blue"
            >
              {t(n.key)} <span className="kh text-[.85rem] font-normal text-grey">{tAlt(n.key)}</span>
            </NavLink>
          ))}
        </div>
      </header>
    </>
  )
}
