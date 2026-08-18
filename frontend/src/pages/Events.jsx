import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { getEvents } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const KINDS = ['all', 'Quality', 'Customers', 'Supply chain', 'Community']

const CHIP =
  'inline-flex cursor-pointer items-center gap-[9px] rounded-full border border-line-strong bg-card px-[18px] py-[10px] text-[.88rem] font-semibold transition-all duration-200 ease-brand hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white'

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const META_ICON = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const PIN = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[15px] w-[15px] flex-none text-blue-lite">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const CLOCK = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[15px] w-[15px] flex-none text-blue-lite">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)
const TEAM = (
  <svg viewBox="0 0 24 24" {...META_ICON} className="h-[15px] w-[15px] flex-none text-blue-lite">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export default function Events() {
  const { lang, t, tAlt } = useI18n()
  const [events, setEvents] = useState([])
  const [kind, setKind] = useState('all')
  const [error, setError] = useState(null)

  const imgSrc = (t) => `/images/events/${slugify(t)}.jpg`

  useEffect(() => {
    getEvents('all', lang)
      .then((r) => setEvents(r.items))
      .catch((e) => setError(String(e)))
  }, [lang])

  const visible = useMemo(
    () => (kind === 'all' ? events : events.filter((e) => e.kind === kind)),
    [events, kind]
  )

  return (
    <>
      <section className="dark on-dark tight page-hero" style={{ '--hero-img': "url('/images/heroes/events.jpg')" }}>
        <div className="shell">
          <p className="eyebrow">
            {t('nav.events')} <span className="kh">{tAlt('nav.events')}</span>
          </p>
          <h2 className="max-w-[16ch]">{t('events.title')}</h2>
          <p className="lead mt-[22px]">
            {t('events.lead')}
          </p>
        </div>
      </section>

      <section className="pt-0">
        <div className="shell">
          <Reveal className="grid grid-cols-1 overflow-hidden rounded-[14px] bg-ink text-white lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-[clamp(32px,4vw,52px)]">
              <p className="eyebrow text-yellow">
                {t('events.featured')}
              </p>
              <h3 className="mb-[14px] text-[clamp(1.5rem,2.6vw,2.1rem)]">
                {t('events.featured.title')}
              </h3>
              <p className="text-[.96rem] text-white/[0.74]">
                {t('events.featured.body')}
              </p>
              <Link to={loc(lang, '/contact')} className="btn mt-[14px]">
                {t('events.cta')} <span className="ar">→</span>
              </Link>
            </div>
            <div className="relative grid min-h-[300px] place-items-center overflow-hidden bg-yellow">
              <span className="ring-inset" />
              <div className="relative p-5 text-center font-display text-[clamp(2rem,4vw,3rem)] font-black leading-[.95] text-ink">
                {t('events.stamp')}
                <br />
                {t('events.stamp2')}
                <small className="mt-3 block font-mono text-[.72rem] font-medium tracking-[.2em]">
                  {t('events.stamp3')}
                </small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pt-[clamp(40px,4vw,56px)]">
        <div className="shell">
          <div className="mb-[30px] flex flex-wrap gap-[10px]" role="group" aria-label={t('events.all')}>
            {KINDS.map((k) => (
              <button
                key={k}
                className={CHIP}
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k === 'all' ? t('events.all') : t(`events.kind.${k}`)}
              </button>
            ))}
          </div>
          {error && <p className="lead">{t('events.err')}: {error}</p>}
          <div className="space-y-5">
            {visible.map((e, i) => {
              const kindColors = {
                Quality: 'bg-blue text-white',
                Customers: 'bg-yellow text-ink',
                'Supply chain': 'bg-green-600 text-white',
                Community: 'bg-red text-white',
              }
              const kindColor = kindColors[e.kind] || 'bg-paper-2 text-fg'
              const imgPath = e.img || imgSrc(e.t)
              return (
                <Reveal key={i}>
                  <Link
                    to={`${loc(lang, '/events')}/${e.id}`}
                    className="group block overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 hover:border-blue/30 hover:shadow-[0_12px_40px_-12px_rgba(11,87,164,.25)]"
                  >
                    <div className="grid lg:grid-cols-[200px_1fr]">
                      <div className="relative flex flex-col items-center justify-center bg-ink p-8">
                        <span className="absolute inset-0 opacity-10">
                          <span className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(255,255,255,.05)_10px,rgba(255,255,255,.05)_20px)]" />
                        </span>
                        <span className="relative font-display text-[2.6rem] font-extrabold leading-none text-yellow">{e.m}</span>
                        <span className="relative font-display text-[1.6rem] font-bold text-white/80">{e.y}</span>
                        <span className={`relative mt-3 inline-flex rounded-full px-3 py-1 font-mono text-[.62rem] font-semibold uppercase tracking-[.1em] ${kindColor}`}>
                          {t(`events.kind.${e.kind}`)}
                        </span>
                      </div>
                      <div className="relative min-h-[220px] overflow-hidden">
                        <img
                          src={imgPath}
                          alt={e.t}
                          loading="lazy"
                          onError={(ev) => { ev.currentTarget.style.display = 'none' }}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-ink/85" />
                        <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-7 lg:p-9">
                          <h3 className="font-display text-[1.35rem] font-bold leading-tight text-white transition-colors duration-200 group-hover:text-yellow">{e.t}</h3>
                          <p className="m-0 max-w-[55ch] text-[.92rem] leading-relaxed text-white">{e.d}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-7 py-5 lg:px-9">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[.82rem]">
                        {e.loc && (
                          <span className="inline-flex items-center gap-1.5 text-grey">
                            {PIN}
                            {e.loc}
                          </span>
                        )}
                        {e.dur && (
                          <span className="inline-flex items-center gap-1.5 text-grey">
                            {CLOCK}
                            {e.dur}
                          </span>
                        )}
                        {e.team && (
                          <span className="inline-flex items-center gap-1.5 text-grey">
                            {TEAM}
                            {e.team}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-2 font-display text-[.86rem] font-bold text-blue">
                        {t('product.viewDetails')}
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-yellow text-ink transition-transform duration-200 group-hover:translate-x-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
