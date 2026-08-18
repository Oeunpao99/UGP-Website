import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeadRow from '../components/HeadRow'
import Pipe from '../components/Pipe'
import Rail from '../components/Rail'
import Reveal from '../components/Reveal'
import ClientMarquee from '../components/ClientMarquee'
import PlaceholderImage from '../components/PlaceholderImage'
import { getClients, getProducts } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'
import { FACTS, FEATURES } from './homeDetails'

const HERO_PIPES = [
  { color: 'var(--c-hdpe)', stripe: '#FFD100', h: '62%', d: 0.05, legend: 'EAGLE HDPE PIPE · ISO 9001:2015 · PRODUCT OF CAMBODIA' },
  { color: 'var(--c-ppr)', h: '78%', d: 0.15, legend: 'EAGLE PPR PIPE · ISO 9001:2015 · PRODUCT OF CAMBODIA' },
  { color: 'var(--c-upvc)', h: '100%', d: 0.25, legend: 'EAGLE uPVC PIPE · ISO 9001:2015 · PRODUCT OF CAMBODIA' },
  { color: 'var(--c-upvc)', h: '88%', d: 0.35, legend: 'LION HEAD uPVC PIPE · ISO 9001:2015' },
  { color: 'var(--c-hdpe)', stripe: '#E4002B', h: '70%', d: 0.45, legend: 'EAGLE HDPE PIPE · PE100 · PRODUCT OF CAMBODIA' },
  { color: 'var(--c-conduit)', light: true, h: '54%', d: 0.55, legend: 'EAGLE ELECTRICAL CONDUIT · ISO 9001:2015' },
]

const BRANDS = [
  {
    roleKey: 'home.brand.eagle.role',
    bodyKey: 'home.brand.eagle.body',
    name: 'EAGLE PIPE',
    dark: true,
    img: '/images/eagle.png',
  },
  {
    roleKey: 'home.brand.lion.role',
    bodyKey: 'home.brand.lion.body',
    name: 'LION HEAD PIPE',
    dark: false,
    img: '/images/lionhead.png',
  },
  {
    roleKey: 'home.brand.smart.role',
    bodyKey: 'home.brand.smart.body',
    name: 'SMART PIPE',
    dark: false,
    img: '/images/smart.png',
  },
]

export default function Home() {
  const { lang, t, tAlt } = useI18n()
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    Promise.all([getProducts('all', lang), getClients()])
      .then(([p, c]) => {
        if (!alive) return
        setProducts(p.items.slice(0, 6))
        setClients(c.items)
      })
      .catch((e) => alive && setError(String(e)))
    return () => {
      alive = false
    }
  }, [lang])

  return (
    <>
      <div className="hero on-dark" style={{ '--hero-img': "url('/images/heroes/home.jpg')" }}>
        <div className="shell">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <div>
              <p className="eyebrow text-yellow">
                UPG PIPE CO., LTD <span className="kh">{tAlt('brand.tagline')}</span>
              </p>
              <h1>
                {t('hero.t1')}
                <br />
                {t('hero.t2')}
                <em className="not-italic text-yellow">{t('hero.em')}</em>
              </h1>
              <p className="lead mt-[26px]">{t('hero.lead')}</p>
              <div className="mt-[34px] mb-[clamp(40px,5vw,64px)] flex flex-wrap gap-[14px]">
                <Link to={loc(lang, '/products')} className="btn">
                  {t('hero.cta1')} <span className="ar">→</span>
                </Link>
                <Link to={loc(lang, '/contact')} className="btn ghost">
                  {t('hero.cta2')}
                </Link>
              </div>
              <div className="flex flex-wrap gap-[34px] pb-11 max-sm:gap-[22px]">
                <div className="fact">
                  <b className="block font-display text-[2.1rem] font-extrabold leading-none text-yellow max-sm:text-[1.7rem]">2016</b>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/60">{t('hero.fact1')}</span>
                </div>
                <div className="fact">
                  <b className="block font-display text-[2.1rem] font-extrabold leading-none text-yellow max-sm:text-[1.7rem]">177</b>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/60">{t('hero.fact2')}</span>
                </div>
                <div className="fact">
                  <b className="block font-display text-[2.1rem] font-extrabold leading-none text-yellow max-sm:text-[1.7rem]">1/2&quot;–12&quot;</b>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/60">{t('hero.fact3')}</span>
                </div>
                <div className="fact">
                  <b className="block font-display text-[2.1rem] font-extrabold leading-none text-yellow max-sm:text-[1.7rem]">3</b>
                  <span className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/60">{t('hero.fact4')}</span>
                </div>
              </div>
            </div>
            <div className="flex h-[250px] items-end justify-start gap-3 lg:h-[clamp(300px,40vw,470px)] lg:justify-end" aria-hidden="true">
              {HERO_PIPES.map((p, i) => (
                <Pipe key={i} {...p} />
              ))}
            </div>
          </div>
        </div>
        <Rail />
      </div>

      <section className="tight band">
        <div className="shell">
          <HeadRow
            eyebrow={t('home.brands.eyebrow')}
            title={
              <>
                {t('home.brands.t1')}
                <br />
                {t('home.brands.t2')}
              </>
            }
            lead={t('home.brands.lead')}
          />
          <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-3">
            {BRANDS.map((b, i) => (
              <Reveal
                className={`relative overflow-hidden rounded-[14px] px-[26px] pt-8 pb-[26px] transition-transform duration-300 ease-brand hover:-translate-y-[5px] ${
                  b.dark ? 'bg-ink text-white' : 'bg-yellow text-ink-2'
                }`}
                as="div"
                key={i}
              >
                <span className="ring-circle" />
                <img
                  src={b.img}
                  alt={b.name}
                  className="relative h-[56px] w-[56px] rounded-full object-cover"
                  aria-hidden="true"
                />
                <div className="font-mono text-[.7rem] uppercase tracking-[.16em] opacity-72">{t(b.roleKey)}</div>
                <h3>{b.name}</h3>
                <p className="mb-0 mt-[14px] text-[.93rem] opacity-85">{t(b.bodyKey)}</p>
                <span className="mt-4 inline-block rounded-[3px] bg-white px-[9px] py-1 font-mono text-[.66rem] font-semibold tracking-[.12em] text-red">
                  ISO 9001:2015
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <HeadRow
            eyebrow={<> {t('products.eyebrow')} <span className="kh">{tAlt('products.eyebrow')}</span></>}
            title={t('home.family.title')}
            action={
              <Link to={loc(lang, '/products')} className="btn ghost">
                {t('home.family.cta')} <span className="ar">→</span>
              </Link>
            }
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {error && <p className="lead">{t('home.family.err')}: {error}</p>}
            {products.map((p, i) => (
              <Link
                to={`${loc(lang, '/products')}/${p.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-card p-[26px] text-left transition-all duration-300 ease-brand hover:-translate-y-[6px] hover:border-transparent hover:shadow-[0_26px_44px_-30px_rgba(7,33,63,.75)]"
                style={{ '--c': p.color }}
                key={p.id}
              >
                <span className="absolute inset-y-0 left-0 w-[4px] bg-[var(--c)]" />

                <div className="mb-3 flex flex-wrap items-center gap-[7px]">
                  {p.brands.map((b) => (
                    <span
                      className="inline-flex items-center gap-[6px] rounded-full border border-line bg-paper px-[9px] py-[4px] font-mono text-[.62rem] font-semibold uppercase tracking-[.08em]"
                      key={b}
                    >
                      <span className="h-[5px] w-[5px] rounded-full bg-[var(--c)]" />
                      {b}
                    </span>
                  ))}
                </div>

                <h3 className="mb-1 transition-colors duration-200 ease-brand group-hover:text-blue">{p.name}</h3>
                <p className="mb-0 text-[.88rem] leading-relaxed text-grey">{p.meta}</p>

                <span className="mt-4 flex flex-wrap gap-[7px]">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span className="rounded-full border border-line bg-paper px-[10px] py-[5px] font-mono text-[.68rem] tracking-[.06em] text-fg" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>

                <span className="mt-auto flex items-center gap-[10px] border-t border-line pt-5 font-display text-[.88rem] font-bold">
                  <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-yellow text-[.82rem] transition-transform duration-200 ease-brand group-hover:translate-x-[3px]">
                    →
                  </span>
                  {t('home.family.go')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark on-dark">
        <div className="shell">
          <HeadRow
            eyebrow={t('home.why.eyebrow')}
            title={
              <>
                {t('home.why.t1')}
                <br />
                {t('home.why.t2')}
              </>
            }
            lead={t('home.why.lead')}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal className="overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 transition-all duration-300 hover:-translate-y-[4px] hover:border-yellow/30 hover:shadow-[0_16px_36px_-14px_rgba(224,161,6,.15)]" key={f.id} as="div">
                <Link to={loc(lang, `/features/${f.id}`)} className="group block h-full">
                  <div className="relative h-[140px] overflow-hidden">
                    <PlaceholderImage
                      label={f.placeholder}
                      color={f.color}
                      className="h-full w-full transition-transform duration-500 ease-brand group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
                    <span className="absolute right-3 bottom-2 font-mono text-[.66rem] tracking-[.14em] text-white/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="px-6 pt-5 pb-6">
                    <h4 className="mb-2 font-display text-[1.08rem] font-bold">{f.t[lang]}</h4>
                    <p className="m-0 text-[.9rem] leading-relaxed text-white/[0.66]">{f.b[lang]}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-display text-[.86rem] font-bold text-yellow">
                      {t('info.detail')}
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-yellow text-ink transition-transform duration-200 group-hover:translate-x-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="shell">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => (
              <Link
                to={loc(lang, `/facts/${f.id}`)}
                className="group relative block overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 ease-brand hover:-translate-y-[6px] hover:border-transparent hover:shadow-[0_26px_44px_-30px_rgba(7,33,63,.75)]"
                key={f.id}
              >
                <div className="relative h-[150px] overflow-hidden">
                  <PlaceholderImage
                    label={f.placeholder}
                    color={f.color}
                    className="h-full w-full transition-transform duration-500 ease-brand group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-3 right-3 rounded-[6px] bg-ink/70 px-2 py-1 font-mono text-[.62rem] tracking-[.14em] text-white/70 backdrop-blur">
                    {t('info.detail')}
                  </span>
                </div>
                <div className="px-[22px] py-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <b className="font-display text-[1.9rem] font-extrabold leading-none" style={{ color: f.color }}>
                      {f.n}
                    </b>
                    <span className="font-mono text-[.68rem] uppercase tracking-[.14em] text-grey">{f.k[lang]}</span>
                  </div>
                  <p className="mb-0 mt-2 text-[.9rem] text-grey">{f.d[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <HeadRow
            eyebrow={t('home.projects.eyebrow')}
            title={
              <>
                {t('home.projects.t1')}
                <br />
                {t('home.projects.t2')}
              </>
            }
            lead={t('home.projects.lead')}
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
            {t('home.next.eyebrow')}
          </p>
          <h2>
            {t('home.next.t1')}
            <br />
            {t('home.next.t2')}
          </h2>
          <p className="lead mx-auto mb-[30px] mt-[22px]">
            {t('home.next.lead')}
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <Link to={loc(lang, '/contact')} className="btn">
              {t('home.next.cta')} <span className="ar">→</span>
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
