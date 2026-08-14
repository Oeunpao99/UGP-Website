import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMeta } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const SOCIAL_LINK =
  'grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] border border-white/[0.18] transition-all duration-200 hover:border-yellow hover:bg-yellow hover:text-ink'

export default function Footer() {
  const { t, lang } = useI18n()
  const [meta, setMeta] = useState(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    let alive = true
    getMeta()
      .then((m) => alive && setMeta(m))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const phone = meta?.phone || '+855 (0)23 939 399'
  const phoneTel = meta?.phone_tel || '+85523939399'
  const email = meta?.email || 'sales@upgpipe.com'
  const ho1 = meta?.head_office?.line1 || 'Building #6, St. 289, Sangkat Boeung Kak 2, Khan Toul Kork, Phnom Penh'

  const PRODUCT_LINKS = [
    { to: '/products', label: t('contact.product.upvc') },
    { to: '/products', label: t('contact.product.fittings') },
    { to: '/products', label: t('contact.product.ppr') },
    { to: '/products', label: t('contact.product.hdpe') },
    { to: '/products', label: t('contact.product.conduit') },
  ]
  const PAGE_LINKS = [
    { to: '/about', label: t('nav.about') },
    { to: '/events', label: t('nav.events') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <footer className="border-t border-white/[0.08] bg-ink text-white/[0.68]">
      <div className="shell flex flex-wrap items-center gap-x-10 gap-y-5 py-[22px]">
        <Link to={loc(lang, '/home')} className="flex flex-none items-center pl-[6px]">
          <img src="/images/logo.jpg" alt="UPG PIPE CO., LTD" className="h-[46px] w-[46px] flex-none rounded-full border-[3px] border-blue object-cover" />
        </Link>

        <nav className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 text-[.86rem]">
          <div className="group relative">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-[6px] border-0 bg-transparent p-0 text-[.86rem] text-white/[0.68] transition-colors hover:text-yellow"
            >
              {t('footer.products')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-[10px] w-[10px] transition-transform duration-150 group-hover:-rotate-180 group-focus-within:-rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="invisible absolute bottom-full left-0 z-10 mb-[10px] min-w-[210px] rounded-[10px] border border-white/10 bg-[#0B1424] py-[6px] opacity-0 shadow-[0_24px_48px_-20px_rgba(0,0,0,.65)] transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {PRODUCT_LINKS.map((l, i) => (
                <Link
                  key={i}
                  to={loc(lang, l.to)}
                  className="block whitespace-nowrap px-[14px] py-[9px] text-[.84rem] text-white/75 transition-colors hover:bg-white/[0.07] hover:text-yellow"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <span className="hidden h-[14px] w-px flex-none bg-white/[0.16] sm:block" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {PAGE_LINKS.map((l, i) => (
              <Link key={i} to={loc(lang, l.to)} className="whitespace-nowrap transition-colors hover:text-yellow">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-none flex-wrap items-center gap-x-5 gap-y-2 text-[.86rem]">
          <a className="whitespace-nowrap transition-colors hover:text-yellow" href={`tel:${phoneTel}`}>
            {phone}
          </a>
          <a className="whitespace-nowrap transition-colors hover:text-yellow" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="flex gap-[8px]">
            <Link to={loc(lang, '/contact')} aria-label="Website" className={SOCIAL_LINK}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[15px] w-[15px]">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
              </svg>
            </Link>
            <Link to={loc(lang, '/contact')} aria-label="Telegram" className={SOCIAL_LINK}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                <path d="M21.9 4.3 18.7 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.3 13.1l-4.8-1.5c-1-.3-1-1 .2-1.5l18.8-7.3c.9-.3 1.6.2 1.4 1.5Z" />
              </svg>
            </Link>
            <Link to={loc(lang, '/contact')} aria-label="Facebook" className={SOCIAL_LINK}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                <path d="M14 9h3V5.5h-3c-2.2 0-4 1.8-4 4V12H7.5v3.5H10V22h3.5v-6.5H16l.5-3.5H13.5V9.5c0-.3.2-.5.5-.5Z" />
              </svg>
            </Link>
            <Link to={loc(lang, '/contact')} aria-label="YouTube" className={SOCIAL_LINK}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
                <path d="M22 12s0-3.3-.4-4.9a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.7C2 8.7 2 12 2 12s0 3.3.4 4.9a2.5 2.5 0 0 0 1.8 1.7C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.7C22 15.3 22 12 22 12ZM10 15V9l5.2 3L10 15Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-[14px] font-mono text-[.74rem] tracking-[.03em] text-white/45">
          <span className="whitespace-nowrap">© {year} UPG PIPE CO., LTD — {t('footer.rights')}</span>
          <span className="whitespace-nowrap">{ho1}</span>
          <span className="whitespace-nowrap">{t('footer.legal')}</span>
        </div>
      </div>
    </footer>
  )
}
