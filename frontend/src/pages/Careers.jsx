import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import { getJobs } from '../api'
import { useI18n } from '../i18n'

const PERKS = [
  { tKey: 'careers.perk1.t', dKey: 'careers.perk1.d' },
  { tKey: 'careers.perk2.t', dKey: 'careers.perk2.d' },
  { tKey: 'careers.perk3.t', dKey: 'careers.perk3.d' },
  { tKey: 'careers.perk4.t', dKey: 'careers.perk4.d' },
]

export default function Careers() {
  const { lang, t, tAlt } = useI18n()
  const [jobs, setJobs] = useState([])
  const [open, setOpen] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    getJobs(lang)
      .then((r) => setJobs(r.items))
      .catch((e) => setError(String(e)))
  }, [lang])

  const toggle = (i) => setOpen((s) => ({ ...s, [i]: !s[i] }))

  return (
    <>
      <section className="dark on-dark tight page-hero" style={{ '--hero-img': "url('/images/heroes/careers.jpg')" }}>
        <div className="shell">
          <p className="eyebrow text-yellow">
            {t('nav.careers')} <span className="kh">{tAlt('nav.careers')}</span>
          </p>
          <h2 className="max-w-[17ch]">
            {t('careers.title')}
          </h2>
          <p className="lead mt-[22px]">
            {t('careers.lead')}
          </p>
        </div>
      </section>

      <section>
        <div className="shell">
          <p className="eyebrow">{t('careers.get.eyebrow')}</p>
          <h2 className="mb-[34px]">{t('careers.get.title')}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p, i) => {
              const icons = [
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path d="M12 14l9-5-9-5-9 5 9 5zM12 14v7m0 0l-3-3m3 3l3-3" /></svg>,
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
              ]
              const colors = ['text-blue', 'text-green-600', 'text-yellow-deep', 'text-red']
              return (
                <Reveal key={i}>
                  <div className="group relative h-full overflow-hidden rounded-[14px] border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_12px_40px_-16px_rgba(11,87,164,.2)]">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-paper transition-colors duration-300 group-hover:bg-blue/10 ${colors[i]}`}>
                      {icons[i]}
                    </div>
                    <b className="mb-2 block font-display text-[1.02rem] font-bold">{t(p.tKey)}</b>
                    <p className="m-0 text-[.88rem] leading-relaxed text-grey">{t(p.dKey)}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="mb-[clamp(34px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow">{t('careers.roles.eyebrow')}</p>
              <h2>{t('careers.roles.title')}</h2>
            </div>
            <p className="lead mb-0 mt-[14px]">
              {t('careers.roles.lead')}
            </p>
          </div>
          {error && <p className="lead">{t('careers.err')}: {error}</p>}
          <div className="space-y-4">
            {jobs.map((j, i) => {
              const isOpen = !!open[i]
              const deptColors = {
                'Sales & Marketing': 'bg-yellow text-ink',
                'Production': 'bg-blue text-white',
                'Quality': 'bg-green-600 text-white',
                'Operations': 'bg-red text-white',
              }
              const deptColor = deptColors[j.dept] || 'bg-paper-2 text-fg'
              return (
                <Reveal key={i}>
                  <div className={`group overflow-hidden rounded-[14px] border transition-all duration-300 ${isOpen ? 'border-blue shadow-[0_8px_30px_-12px_rgba(11,87,164,.25)]' : 'border-line hover:border-blue/40'}`}>
                    <button
                      className="flex w-full cursor-pointer items-center gap-5 border-0 bg-card p-[26px] text-left transition-colors duration-200 hover:bg-paper"
                      aria-expanded={isOpen}
                      aria-controls={`j-${i}`}
                      onClick={() => toggle(i)}
                    >
                      <span className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[10px] bg-paper-2 font-display text-[1.1rem] font-extrabold text-blue transition-colors duration-200 group-hover:bg-blue group-hover:text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 min-w-0">
                        <b className="mb-1 block font-display text-[1.12rem] font-bold leading-tight">{j.t}</b>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex rounded-full px-3 py-[3px] font-mono text-[.62rem] font-semibold uppercase tracking-[.08em] ${deptColor}`}>
                            {j.dept}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[.72rem] text-grey">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                              <circle cx="12" cy="9" r="2.5" />
                            </svg>
                            {j.loc}
                          </span>
                        </span>
                      </span>
                      <span className={`grid h-[32px] w-[32px] flex-none place-items-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 bg-blue text-white' : 'bg-yellow text-ink group-hover:scale-110'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-brand ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`} id={`j-${i}`}>
                      <div className="border-t border-line px-[26px] py-6 lg:pl-[96px]">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <h4 className="mb-3 flex items-center gap-2 font-display text-[.82rem] font-bold uppercase tracking-[.06em] text-fg">
                              <span className="h-5 w-[3px] rounded-full bg-blue" />
                              {t('careers.r')}
                            </h4>
                            <ul className="m-0 list-none space-y-2 pl-0">
                              {j.r.map((x, k) => (
                                <li className="flex items-start gap-2 text-[.9rem] text-grey" key={k}>
                                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue/40" />
                                  {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 flex items-center gap-2 font-display text-[.82rem] font-bold uppercase tracking-[.06em] text-fg">
                              <span className="h-5 w-[3px] rounded-full bg-yellow" />
                              {t('careers.q')}
                            </h4>
                            <ul className="m-0 list-none space-y-2 pl-0">
                              {j.q.map((x, k) => (
                                <li className="flex items-start gap-2 text-[.9rem] text-grey" key={k}>
                                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-yellow/60" />
                                  {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6">
                          <a
                            className="btn solid"
                            href={`mailto:hr@upgpipe.com?subject=${encodeURIComponent(
                              'Application — ' + j.t
                            )}`}
                          >
                            {t('careers.apply')} <span className="ar">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <p className="mt-5 text-[.82rem] text-grey">
            {t('careers.note')}
          </p>
        </div>
      </section>
    </>
  )
}
