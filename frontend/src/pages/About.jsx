import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import HeadRow from '../components/HeadRow'
import ClientMarquee from '../components/ClientMarquee'
import { getClients, getMeta } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const CHECKS = [
  { tKey: 'about.check1.t', bKey: 'about.check1.b', svg: <path d="M4 20h16M7 20V9M12 20V4M17 20v-7" /> },
  { tKey: 'about.check2.t', bKey: 'about.check2.b', svg: <path d="M12 7v5l3 2" /> },
  { tKey: 'about.check3.t', bKey: 'about.check3.b', svg: <path d="M3 12h18M12 3v18" /> },
  { tKey: 'about.check4.t', bKey: 'about.check4.b', svg: <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-4.5 5-9 5-9Z" /> },
  { tKey: 'about.check5.t', bKey: 'about.check5.b', svg: <path d="M11 11a7 7 0 1 1 9 9" /> },
  { tKey: 'about.check6.t', bKey: 'about.check6.b', svg: <path d="M8 10h8M8 14h5" /> },
]

const TEAM = [
  { img: '/images/team/p1.png', nameKey: 'about.team.m1.name', roleKey: 'about.team.m1.role', color: '#0B57A4' },
  { img: '/images/team/p2.png', nameKey: 'about.team.m2.name', roleKey: 'about.team.m2.role', color: '#12A150' },
  { img: '/images/team/p3.png', nameKey: 'about.team.m3.name', roleKey: 'about.team.m3.role', color: '#E0A106' },
  { img: '/images/team/p4.png', nameKey: 'about.team.m4.name', roleKey: 'about.team.m4.role', color: '#2278CA' },
]

const FAMILIES = [
  { img: '/images/family/upvc.png', tKey: 'nav.products.upvc', bKey: 'about.family.upvc.b', color: '#3A84C9' },
  { img: '/images/family/hdpe.png', tKey: 'nav.products.hdpe', bKey: 'about.family.hdpe.b', color: '#E0A106' },
  { img: '/images/family/ppr.png', tKey: 'nav.products.ppr', bKey: 'about.family.ppr.b', color: '#12A150' },
  { img: '/images/family/conduit.png', tKey: 'nav.products.electrical', bKey: 'about.family.electrical.b', color: '#C70F2D' },
]

const QUALITY = [
  { img: '/images/process/test.png', tKey: 'about.quality.test.t', bKey: 'about.quality.test.b' },
  { img: '/images/process/customer.png', tKey: 'about.quality.customer.t', bKey: 'about.quality.customer.b' },
  { img: '/images/process/supplier.png', tKey: 'about.quality.supplier.t', bKey: 'about.quality.supplier.b' },
]

export default function About() {
  const { lang, t, tAlt } = useI18n()
  const [clients, setClients] = useState([])
  const [team, setTeam] = useState(null)

  useEffect(() => {
    let alive = true
    getClients()
      .then((c) => alive && setClients(c.items))
      .catch(() => {})
    getMeta()
      .then((m) => alive && setTeam(m.team || []))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const members =
    team && team.length
      ? team.map((m, i) => {
          const fb = TEAM[i]
          return {
            img: m.img || fb?.img,
            color: m.color || fb?.color || '#0B57A4',
            name: (lang === 'km' ? m.name_km || m.name : m.name) || (fb ? t(fb.nameKey) : ''),
            role: (lang === 'km' ? m.role_km || m.role : m.role) || (fb ? t(fb.roleKey) : ''),
          }
        })
      : TEAM

  const certRows = [
    [t('about.cert.standard'), 'ISO 9001:2015'],
    [t('about.cert.number'), '745371'],
    [t('about.cert.registrar'), 'Guardian Independent Certification Ltd'],
    [t('about.cert.scope'), 'Manufacturing of uPVC, HDPE, LDPE, PPR pipes, and electrical cable conduits and fitting products'],
    [t('about.cert.issued'), '22 March 2024'],
    [t('about.cert.expires'), '21 March 2027'],
    [t('about.cert.first'), '2017'],
  ]

  const stats = [
    { n: '177', k: t('about.stats.total'), d: t('about.ho.team'), color: '#0B57A4' },
    { n: '30', k: t('about.cert.ho'), d: t('about.k.team'), color: '#12A150' },
    { n: '147', k: t('about.cert.factory'), d: t('about.factory.team'), color: '#E0A106' },
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
          <HeadRow eyebrow={t('about.stats.eyebrow')} title={t('about.stats.title')} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                className="relative overflow-hidden rounded-[14px] border border-line bg-card px-[26px] py-[30px]"
                key={i}
              >
                <span className="absolute inset-y-0 left-0 w-[6px]" style={{ background: s.color }} />
                <b className="block font-display text-[clamp(2.2rem,4vw,3rem)] font-extrabold leading-none" style={{ color: s.color }}>
                  {s.n}
                </b>
                <span className="mt-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{s.k}</span>
                <p className="mb-0 mt-[10px] text-[.9rem] text-grey">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <HeadRow eyebrow={t('about.team.eyebrow')} title={t('about.team.title')} lead={t('about.team.lead')} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <div
                className="group overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 ease-brand hover:-translate-y-[5px] hover:shadow-[0_26px_44px_-30px_rgba(7,33,63,.75)]"
                key={m.nameKey || `m${i}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.nameKey ? t(m.nameKey) : m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.05]"
                  />
                  <span className="absolute bottom-0 right-0 h-[52px] w-[52px] rounded-tl-[14px]" style={{ background: m.color }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" className="h-full w-full p-[13px]">
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.8-3.6 3.4-5.5 7-5.5s6.2 1.9 7 5.5" />
                    </svg>
                  </span>
                </div>
                <div className="px-[22px] py-5">
                  <h3 className="mb-1 text-[1.06rem]">{m.nameKey ? t(m.nameKey) : m.name}</h3>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.14em]" style={{ color: m.color }}>
                    {m.roleKey ? t(m.roleKey) : m.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <HeadRow
            eyebrow={t('about.family.eyebrow')}
            title={t('about.family.title')}
            lead={t('about.family.lead')}
            action={
              <Link to={loc(lang, '/products')} className="btn ghost">
                {t('info.browse')} <span className="ar">→</span>
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FAMILIES.map((f) => (
              <Link
                to={loc(lang, '/products')}
                className="group relative block overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 ease-brand hover:-translate-y-[6px] hover:border-transparent hover:shadow-[0_26px_44px_-30px_rgba(7,33,63,.75)]"
                key={f.tKey}
              >
                <div className="relative h-[150px] overflow-hidden">
                  <img
                    src={f.img}
                    alt={t(f.tKey)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-[4px]" style={{ background: f.color }} />
                </div>
                <div className="px-[22px] py-5">
                  <h3 className="mb-2 text-[1.06rem]">{t(f.tKey)}</h3>
                  <p className="mb-0 text-[.9rem] text-grey">{t(f.bKey)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[.7rem] uppercase tracking-[.16em] text-blue">
                    {t('about.family.go')} <span className="ar">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark on-dark">
        <div className="shell">
          <HeadRow eyebrow={t('about.quality.eyebrow')} title={t('about.quality.title')} lead={t('about.cert.lead')} />
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <div>
              <div className="overflow-hidden rounded-[14px] border border-white/10 bg-white">
                <img src="/images/cert.png" alt="ISO 9001:2015 certificate" className="w-full" loading="lazy" />
              </div>
              <div className="tablewrap mt-[22px]">
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
              {QUALITY.map((q) => (
                <div
                  className="overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 transition-colors duration-300 ease-brand hover:bg-ink"
                  key={q.tKey}
                >
                  <div className="h-[110px] overflow-hidden">
                    <img src={q.img} alt={t(q.tKey)} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="px-[22px] py-5">
                    <h3 className="mb-2 font-display text-[1.05rem] font-bold text-white">{t(q.tKey)}</h3>
                    <p className="mb-0 text-[.9rem] text-white/[0.66]">{t(q.bKey)}</p>
                  </div>
                </div>
              ))}
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
                src="/images/process/test.png"
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
          <HeadRow
            eyebrow={t('about.projects.eyebrow')}
            title={
              <>
                {t('about.projects.title')}
              </>
            }
            lead={t('about.projects.lead')}
          />
          <ClientMarquee
            title={t('home.clients.local')}
            items={clients.filter((c) => !c.international)}
            accent="yellow"
          />
          <ClientMarquee
            title={t('home.clients.international')}
            items={clients.filter((c) => c.international)}
            reverse
            accent="blue"
          />
        </div>
      </section>

      <section className="dark on-dark tight">
        <div className="shell max-w-[820px] text-center">
          <p className="eyebrow justify-center text-yellow">
            {t('nav.about')}
          </p>
          <h2>
            {t('about.cta.t')}
          </h2>
          <p className="lead mx-auto mb-[30px] mt-[22px]">
            {t('about.cta.lead')}
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <Link to={loc(lang, '/contact')} className="btn">
              {t('nav.contact')} <span className="ar">→</span>
            </Link>
            <a href="tel:+85523939399" className="btn ghost">
              +855 (0)23 939 399
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
