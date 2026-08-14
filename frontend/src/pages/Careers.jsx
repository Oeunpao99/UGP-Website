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
      <section className="dark on-dark tight">
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[18px]">
            {PERKS.map((p, i) => (
              <Reveal className="rounded-[14px] border border-line bg-card px-6 py-[26px]" key={i}>
                <b className="mb-[7px] block font-display text-[1.02rem]">{t(p.tKey)}</b>
                <p className="m-0 text-[.89rem] text-grey">{t(p.dKey)}</p>
              </Reveal>
            ))}
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
          <div className="job-row overflow-hidden rounded-[14px] border border-line bg-card">
            {jobs.map((j, i) => {
              const isOpen = !!open[i]
              return (
                <div className="border-b border-line last:border-b-0" key={i}>
                  <button
                    className="group flex w-full cursor-pointer items-center gap-5 border-0 bg-transparent px-[26px] py-6 text-left transition-colors duration-200 hover:bg-paper"
                    aria-expanded={isOpen}
                    aria-controls={`j-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="w-[26px] flex-none font-mono text-[.76rem] text-grey">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">
                      <b className="block font-display text-[1.08rem] font-bold">{j.t}</b>
                      <span className="job-dept text-[.84rem] text-grey">{j.dept}</span>
                    </span>
                    <span className="job-loc whitespace-nowrap rounded-full bg-paper px-3 py-[6px] font-mono text-[.7rem] uppercase tracking-[.1em] text-blue">{j.loc}</span>
                    <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-yellow font-bold transition-transform duration-300 ease-brand group-aria-expanded:rotate-45">+</span>
                  </button>
                  <div className={`px-[26px] pb-7 lg:pl-[72px]${isOpen ? ' block animate-pageIn' : ' hidden'}`} id={`j-${i}`}>
                    <h4 className="mb-[10px] font-display text-[.92rem] uppercase tracking-[.06em] text-fg">{t('careers.r')}</h4>
                    <ul className="mb-[18px] ml-0 pl-[18px]">
                      {j.r.map((x, k) => (
                        <li className="mb-[6px] text-[.93rem] text-grey" key={k}>{x}</li>
                      ))}
                    </ul>
                    <h4 className="mb-[10px] font-display text-[.92rem] uppercase tracking-[.06em] text-fg">{t('careers.q')}</h4>
                    <ul className="mb-[18px] ml-0 pl-[18px]">
                      {j.q.map((x, k) => (
                        <li className="mb-[6px] text-[.93rem] text-grey" key={k}>{x}</li>
                      ))}
                    </ul>
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
