import Reveal from '../components/Reveal'
import { useI18n } from '../i18n'

const CHECKS = [
  { tKey: 'about.check1.t', bKey: 'about.check1.b', svg: <path d="M4 20h16M7 20V9M12 20V4M17 20v-7" /> },
  { tKey: 'about.check2.t', bKey: 'about.check2.b', svg: <path d="M12 7v5l3 2" /> },
  { tKey: 'about.check3.t', bKey: 'about.check3.b', svg: <path d="M3 12h18M12 3v18" /> },
  { tKey: 'about.check4.t', bKey: 'about.check4.b', svg: <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-4.5 5-9 5-9Z" /> },
  { tKey: 'about.check5.t', bKey: 'about.check5.b', svg: <path d="M11 11a7 7 0 1 1 9 9" /> },
  { tKey: 'about.check6.t', bKey: 'about.check6.b', svg: <path d="M8 10h8M8 14h5" /> },
]

export default function About() {
  const { t, tAlt } = useI18n()
  const certRows = [
    [t('about.cert.standard'), 'ISO 9001:2015'],
    [t('about.cert.number'), '745371'],
    [t('about.cert.registrar'), 'Guardian Independent Certification Ltd'],
    [t('about.cert.scope'), 'Manufacturing of uPVC, HDPE, LDPE, PPR pipes, and electrical cable conduits and fitting products'],
    [t('about.cert.issued'), '22 March 2024'],
    [t('about.cert.expires'), '21 March 2027'],
    [t('about.cert.first'), '2017'],
  ]

  return (
    <>
      <section className="dark on-dark">
        <div className="shell">
          <p className="eyebrow text-yellow">
            {t('about.eyebrow')} <span className="kh">{tAlt('about.eyebrow')}</span>
          </p>
          <h2 className="max-w-[16ch]">
            {t('about.title')}
          </h2>
          <p className="lead mt-6">
            {t('about.lead')}
          </p>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="mb-[clamp(34px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[62ch]">
              <p className="eyebrow">{t('about.who.eyebrow')}</p>
              <h2>{t('about.who.title')}</h2>
              <p className="lead mt-[22px]">
                {t('about.who.lead1')}
              </p>
              <p className="lead">
                {t('about.who.lead2')}
              </p>
            </div>
            <div className="min-w-[250px] flex-none">
              <div className="mb-[14px] rounded-[14px] border border-line bg-card p-6">
                <b className="mb-[7px] block font-display text-[1.02rem]">{t('about.vision')}</b>
                <p className="m-0 text-[.89rem] text-grey">{t('about.vision.d')}</p>
              </div>
              <div className="rounded-[14px] border border-line bg-card p-6">
                <b className="mb-[7px] block font-display text-[1.02rem]">{t('about.mission')}</b>
                <p className="m-0 text-[.89rem] text-grey">{t('about.mission.d')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <p className="eyebrow">{t('about.checks.eyebrow')}</p>
          <h2 className="mb-10">{t('about.checks.title')}</h2>
          <div className="flex flex-col gap-[14px] lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-line bg-paper-2 lg:min-h-0">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-grey">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[44px] w-[44px]">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="font-mono text-[.72rem] uppercase tracking-[.16em]">{t('about.checks.photo')}</span>
              </div>
              <img
                src="/images/about-checks.jpg"
                alt={t('about.checks.photoAlt')}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(238px,1fr))] gap-[2px] overflow-hidden rounded-[14px] bg-line">
              {CHECKS.map((f, i) => (
                <Reveal className="bg-card px-[26px] py-[30px]" key={i}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mb-4 h-[30px] w-[30px] text-blue">
                    {f.svg}
                  </svg>
                  <h4 className="mb-2 font-display text-[1.06rem] font-bold">{t(f.tKey)}</h4>
                  <p className="m-0 text-[.9rem] text-grey">{t(f.bKey)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="eyebrow">{t('about.cert.eyebrow')}</p>
              <h2>ISO 9001:2015</h2>
              <p className="lead mt-5">
                {t('about.cert.lead')}
              </p>
              <div className="tablewrap mt-[26px]">
                <table>
                  <caption>{t('about.cert.caption')}</caption>
                  <tbody>
                    {certRows.map(([k, v], i) => (
                      <tr key={i}>
                        <th scope="row">{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="mb-[18px] rounded-[14px] bg-ink px-[clamp(26px,3vw,36px)] py-[clamp(26px,3vw,36px)] text-white">
                <h3 className="mb-5">{t('about.cert.ho')}</h3>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('about.k.address')}</span>
                    <span className="text-[.96rem] leading-[1.5]">
                      Building #6, St. 289, Sangkat Boeung Kak 2,
                      <br />
                      Khan Toul Kork, Phnom Penh, Cambodia
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('about.k.team')}</span>
                    <span className="text-[.96rem] leading-[1.5]">{t('about.ho.team')}</span>
                  </div>
                </div>
              </div>
              <div className="mb-[18px] rounded-[14px] bg-blue px-[clamp(26px,3vw,36px)] py-[clamp(26px,3vw,36px)] text-white">
                <h3 className="mb-5">{t('about.cert.factory')}</h3>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('about.k.address')}</span>
                    <span className="text-[.96rem] leading-[1.5]">
                      Phoum Por Mongkoul, Sangkat Prek Phnov,
                      <br />
                      Khan Prek Phnov, Phnom Penh, Cambodia
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M2 20h20M4 20V9l5-3v14M13 20V4l7 4v12" />
                    <path d="M8 12h.01M8 16h.01M17 12h.01M17 16h.01" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('about.k.team')}</span>
                    <span className="text-[.96rem] leading-[1.5]">{t('about.factory.team')}</span>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l3 2" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('about.k.visits')}</span>
                    <span className="text-[.96rem] leading-[1.5]">{t('about.factory.visits')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
