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
  const [open, setOpen] = useState({})

  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }))
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
      <section className="tight">
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-5">
            {visible.map((e, i) => (
              <article
                className="flex flex-col overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 ease-brand hover:-translate-y-[5px] hover:shadow-[0_26px_44px_-30px_rgba(7,33,63,.7)]"
                key={i}
              >
                <div className="relative grid h-[190px] place-items-center overflow-hidden bg-[var(--c)]">
                  <span className="diag" />
                  <b className="relative font-display text-[clamp(1.8rem,2.4vw,2.4rem)] font-extrabold leading-none text-white opacity-92">
                    {e.m} {e.y}
                  </b>
                  <img
                    src={imgSrc(e.t)}
                    alt={e.t}
                    loading="lazy"
                    onError={(ev) => (ev.currentTarget.style.display = 'none')}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pt-[20px] pb-[24px]">
                  <div className="mb-[9px] font-mono text-[.7rem] uppercase tracking-[.13em] text-blue">
                    {t(`events.kind.${e.kind}`)}
                  </div>
                  <h3 className="mb-[9px] text-[1.12rem]">{e.t}</h3>
                  <p className="m-0 text-[.9rem] text-grey">{e.d}</p>
                  <div className="mt-[16px] space-y-[8px]">
                    {e.loc && (
                      <div className="flex items-center gap-[10px] text-[.84rem] text-fg">
                        {PIN}
                        <span>{e.loc}</span>
                      </div>
                    )}
                    {e.dur && (
                      <div className="flex items-center gap-[10px] text-[.84rem] text-fg">
                        {CLOCK}
                        <span>{e.dur}</span>
                      </div>
                    )}
                    {e.team && (
                      <div className="flex items-center gap-[10px] text-[.84rem] text-fg">
                        {TEAM}
                        <span>{e.team}</span>
                      </div>
                    )}
                  </div>
                  {e.highlights?.length > 0 && (
                    <>
                      <button
                        onClick={() => toggle(i)}
                        aria-expanded={!!open[i]}
                        aria-controls={`ev-details-${i}`}
                        className="group mt-[16px] inline-flex cursor-pointer items-center gap-[10px] border-0 bg-transparent p-0 font-display text-[.92rem] font-bold text-fg transition-colors duration-200 ease-brand hover:text-blue"
                      >
                        <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-yellow text-[.95rem] leading-none text-ink transition-transform duration-300 ease-brand group-aria-expanded:rotate-45">
                          +
                        </span>
                        {t('events.more')}
                      </button>
                      <div id={`ev-details-${i}`} className={`mt-[14px]${open[i] ? ' block' : ' hidden'}`}>
                        <ul className="m-0 space-y-[8px] border-l border-line-strong pl-[14px]">
                          {e.highlights.map((h, j) => (
                            <li key={j} className="flex gap-[10px] text-[.88rem] leading-snug text-grey">
                              <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full bg-blue-lite" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
