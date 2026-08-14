import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMeta } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

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
  const ho2 = meta?.head_office?.line2
  return (
    <footer className="bg-ink pt-[clamp(56px,6vw,80px)] text-white/[0.68]">
      <div className="shell">
        <div className="grid grid-cols-1 gap-[34px] pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="foot-brand">
            <div className="flex items-center gap-3">
              <svg className="h-[42px] w-[42px] flex-none" viewBox="0 0 48 48" aria-hidden="true">
                <rect width="48" height="48" rx="11" fill="#FFD100" />
                <circle cx="24" cy="24" r="14" fill="none" stroke="#07213F" strokeWidth="2.4" />
                <circle cx="24" cy="24" r="8" fill="none" stroke="#0B57A4" strokeWidth="2.4" />
                <path d="M24 10v28" stroke="#07213F" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <span className="leading-none">
                <b className="logo-text block font-display text-[1.35rem] font-black tracking-[-.02em] text-white">UPG PIPE</b>
                <span className="mt-[3px] block font-mono text-[.56rem] uppercase tracking-[.24em] text-white/50">{t('brand.sub')}</span>
              </span>
            </div>
            <p className="mt-[18px] max-w-[34ch] text-[.92rem]">{t('footer.tagline')}</p>
            <div className="mt-[18px] max-w-[34ch] space-y-[8px] text-[.9rem]">
              <a className="block transition-colors hover:text-yellow" href={`tel:${phoneTel}`}>
                {phone}
              </a>
              <a className="block transition-colors hover:text-yellow" href={`mailto:${email}`}>
                {email}
              </a>
              <span className="block leading-snug">
                {ho1}
                {ho2 && (
                  <>
                    <br />
                    {ho2}
                  </>
                )}
              </span>
            </div>
            <div className="mt-[18px] flex gap-[10px]">
              <Link to={loc(lang, '/contact')} aria-label="Website" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-white/[0.18] transition-all duration-200 hover:border-yellow hover:bg-yellow hover:text-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[17px] w-[17px]">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
                </svg>
              </Link>
              <Link to={loc(lang, '/contact')} aria-label="Telegram" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-white/[0.18] transition-all duration-200 hover:border-yellow hover:bg-yellow hover:text-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
                  <path d="M21.9 4.3 18.7 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.3 13.1l-4.8-1.5c-1-.3-1-1 .2-1.5l18.8-7.3c.9-.3 1.6.2 1.4 1.5Z" />
                </svg>
              </Link>
              <Link to={loc(lang, '/contact')} aria-label="Facebook" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-white/[0.18] transition-all duration-200 hover:border-yellow hover:bg-yellow hover:text-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
                  <path d="M14 9h3V5.5h-3c-2.2 0-4 1.8-4 4V12H7.5v3.5H10V22h3.5v-6.5H16l.5-3.5H13.5V9.5c0-.3.2-.5.5-.5Z" />
                </svg>
              </Link>
              <Link to={loc(lang, '/contact')} aria-label="YouTube" className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-white/[0.18] transition-all duration-200 hover:border-yellow hover:bg-yellow hover:text-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
                  <path d="M22 12s0-3.3-.4-4.9a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.7C2 8.7 2 12 2 12s0 3.3.4 4.9a2.5 2.5 0 0 0 1.8 1.7C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.7C22 15.3 22 12 22 12ZM10 15V9l5.2 3L10 15Z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-[18px] font-display text-[.82rem] uppercase tracking-[.16em] text-white">{t('footer.products')}</h4>
            <ul className="m-0 list-none p-0">
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.upvc')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.fittings')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.ppr')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.hdpe')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.conduit')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/products')} className="hover:text-yellow">{t('contact.product.trunking')} &amp; {t('contact.product.condfit').toLowerCase()}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[18px] font-display text-[.82rem] uppercase tracking-[.16em] text-white">{t('footer.company')}</h4>
            <ul className="m-0 list-none p-0">
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/about')} className="hover:text-yellow">{t('nav.about')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/events')} className="hover:text-yellow">{t('nav.events')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/careers')} className="hover:text-yellow">{t('nav.careers')}</Link></li>
              <li className="mb-[10px] text-[.92rem]"><Link to={loc(lang, '/contact')} className="hover:text-yellow">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-[18px] border-t border-white/[0.13] py-[22px] font-mono text-[.8rem] tracking-[.04em] text-white/45">
          <span>© {year} UPG PIPE CO., LTD — {t('footer.rights')}</span>
          <span>{t('footer.legal')}</span>
        </div>
      </div>
    </footer>
  )
}
