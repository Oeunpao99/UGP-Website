import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEvent } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const META_ICON = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const PIN = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[17px] w-[17px] flex-none text-yellow">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const CLOCK = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[17px] w-[17px] flex-none text-yellow">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)
const TEAM = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[17px] w-[17px] flex-none text-yellow">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export default function EventDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setEvent(null)
    setError(null)
    getEvent(id, lang)
      .then(setEvent)
      .catch((e) => setError(String(e)))
  }, [id, lang])

  const backLink = (
    <Link
      to={loc(lang, '/events')}
      className="inline-flex items-center gap-2 font-mono text-[.78rem] tracking-[.04em] text-yellow transition-transform duration-150 ease-brand active:scale-[0.96]"
    >
      <span className="ar" style={{ transform: 'rotate(180deg)' }}>→</span> {t('event.back')}
    </Link>
  )

  if (error) {
    return (
      <section className="dark on-dark tight">
        <div className="shell max-w-[640px]">
          {backLink}
          <p className="lead mt-[26px]">{t('event.notfound')}</p>
        </div>
      </section>
    )
  }

  if (!event) {
    return (
      <section className="dark on-dark tight">
        <div className="shell max-w-[640px]">
          {backLink}
          <p className="lead mt-[26px]">{t('event.loading')}</p>
        </div>
      </section>
    )
  }

  const e = event

  return (
    <>
      <section className="dark on-dark tight relative overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-[6px] bg-[var(--c)]" style={{ '--c': e.c }} />
        <span className="pointer-events-none absolute -right-20 -bottom-24 h-[360px] w-[360px] rounded-full border-[44px] border-white/[0.05]" />
        <div className="shell">
          {backLink}
          <div className="mt-[22px] flex flex-wrap items-center gap-[14px]">
            <span className="inline-flex items-center gap-[10px] rounded-[10px] bg-[var(--c)] px-[16px] py-[12px] font-display text-[1.35rem] font-extrabold leading-none text-white">
              {e.m} <span className="text-white/70">{e.y}</span>
            </span>
            <span className="rounded-full border border-white/[0.24] px-[13px] py-[6px] font-mono text-[.72rem] uppercase tracking-[.14em] text-white/85">
              {t(`events.kind.${e.kind}`)}
            </span>
          </div>
          <h2 className="mt-[22px] max-w-[24ch]">{e.t}</h2>
          <p className="lead mt-[18px] max-w-[64ch]">{e.d}</p>
          <div className="mt-[24px] grid grid-cols-1 gap-[12px] sm:grid-cols-3">
            {e.loc && (
              <div className="flex items-center gap-[10px] rounded-[10px] border border-white/[0.16] bg-white/[0.06] px-[14px] py-[12px] text-[.9rem]">
                {PIN}
                <span>
                  <small className="block font-mono text-[.62rem] uppercase tracking-[.14em] text-white/55">{t('event.location')}</small>
                  {e.loc}
                </span>
              </div>
            )}
            {e.dur && (
              <div className="flex items-center gap-[10px] rounded-[10px] border border-white/[0.16] bg-white/[0.06] px-[14px] py-[12px] text-[.9rem]">
                {CLOCK}
                <span>
                  <small className="block font-mono text-[.62rem] uppercase tracking-[.14em] text-white/55">{t('event.duration')}</small>
                  {e.dur}
                </span>
              </div>
            )}
            {e.team && (
              <div className="flex items-center gap-[10px] rounded-[10px] border border-white/[0.16] bg-white/[0.06] px-[14px] py-[12px] text-[.9rem]">
                {TEAM}
                <span>
                  <small className="block font-mono text-[.62rem] uppercase tracking-[.14em] text-white/55">{t('event.team')}</small>
                  {e.team}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {e.img && (
        <section className="pt-0">
          <div className="shell">
            <div className="overflow-hidden rounded-[14px] border border-line">
              <img src={e.img} alt={e.t} loading="lazy" className="max-h-[420px] w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="tight">
        <div className="shell grid grid-cols-1 gap-[26px] lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <h3 className="mb-[14px]">{t('event.highlights')}</h3>
            <ul className="m-0 space-y-[10px]">
              {e.highlights.map((h, i) => (
                <li key={i} className="flex gap-[12px] text-[.95rem] leading-snug text-fg">
                  <span className="mt-[9px] h-[7px] w-[7px] flex-none rounded-full bg-blue-lite" />
                  {h}
                </li>
              ))}
            </ul>
            {e.detail && (
              <>
                <h3 className="mb-[14px] mt-[38px]">{t('events.more')}</h3>
                <p className="mb-0 text-[.97rem] leading-relaxed text-grey">{e.detail}</p>
              </>
            )}
          </div>
          {e.outcome && (
            <aside className="self-start rounded-[14px] border border-line bg-card p-7 lg:sticky lg:top-[110px]">
              <span className="mb-[14px] inline-block rounded-full bg-[var(--c)] px-[12px] py-[5px] font-mono text-[.66rem] font-semibold uppercase tracking-[.14em] text-white">
                {t('event.outcome')}
              </span>
              <p className="mb-0 text-[.94rem] leading-relaxed text-fg">{e.outcome}</p>
            </aside>
          )}
        </div>
      </section>

      <section className="dark on-dark tight">
        <div className="shell max-w-[720px] text-center">
          <h2>{t('products.catalogue.title')}</h2>
          <p className="lead mx-auto mb-[28px] mt-5">{t('products.catalogue.lead')}</p>
          <Link to={loc(lang, '/contact')} className="btn">
            {t('products.catalogue.cta')} <span className="ar">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
