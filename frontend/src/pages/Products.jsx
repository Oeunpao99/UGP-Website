import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pipe from '../components/Pipe'
import Reveal from '../components/Reveal'
import RichText from '../components/RichText'
import PlaceholderImage from '../components/PlaceholderImage'
import { getFittings, getProducts } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const BRANDS = [
  { id: 'eagle', label: 'Eagle', color: 'var(--yellow-deep)', roleKey: 'home.brand.eagle.role' },
  { id: 'lion', label: 'Lion Head', color: 'var(--red)', roleKey: 'home.brand.lion.role' },
  { id: 'smart', label: 'Smart', color: 'var(--blue)', roleKey: 'home.brand.smart.role' },
]

const CHIP =
  'inline-flex cursor-pointer items-center gap-[9px] rounded-full border border-line-strong bg-card px-[18px] py-[10px] text-[.88rem] font-semibold transition-all duration-200 ease-brand hover:border-ink'

export default function Products() {
  const { lang, t, tAlt } = useI18n()
  const [products, setProducts] = useState([])
  const [fittings, setFittings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts('all', lang)
      .then((r) => setProducts(r.items))
      .catch((e) => setError(String(e)))
  }, [lang])

  useEffect(() => {
    getFittings(lang).then((r) => setFittings(r.items)).catch(() => {})
  }, [lang])

  const scrollToBrand = (id) => {
    document.getElementById(`brand-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const card = (p) => {
    const detail = `${loc(lang, '/products')}/${p.id}`
    const idx = String(products.indexOf(p) + 1).padStart(2, '0')
    return (
      <article
        className="group relative mb-5 grid grid-cols-1 overflow-hidden rounded-[16px] border border-line bg-card scroll-mt-[120px] transition-all duration-300 ease-brand hover:-translate-y-[5px] hover:border-transparent hover:shadow-[0_32px_56px_-30px_rgba(7,33,63,.62)] lg:grid-cols-[220px_1fr]"
        id={`p-${p.id}`}
        key={p.id}
        style={{ '--c': p.color }}
      >
        <span className="absolute inset-y-0 left-0 z-[2] w-[6px] bg-[var(--c)]" />
        <div className="prod-visual relative overflow-hidden">
          <span className="pointer-events-none absolute -right-6 -bottom-6 h-[140px] w-[140px] rounded-full border-[20px] border-white/[0.07]" />
          <span className="pointer-events-none absolute -right-1 -bottom-1 h-[72px] w-[72px] rounded-full border-[11px] border-white/[0.07]" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[5px] bg-[var(--c)]" />
          <Pipe
            color={p.color}
            stripe={p.stripe}
            legend={p.legend}
            light={p.light}
            height="88%"
          />
        </div>
        <div className="relative flex flex-col px-8 py-7 sm:px-9">
          <span
            className="pointer-events-none absolute top-[14px] right-[20px] select-none font-display text-[3.3rem] font-extrabold leading-none text-paper-2 transition-colors duration-300 ease-brand group-hover:text-[var(--c)]"
            aria-hidden="true"
          >
            {idx}
          </span>
          <div className="mb-3 flex flex-wrap items-center gap-2 pr-12">
            {p.brands.map((b) => {
              const br = BRANDS.find((x) => x.label === b)
              return (
                <span
                  className="inline-flex items-center gap-[7px] rounded-full border border-line bg-paper px-[10px] py-[5px] font-mono text-[.66rem] font-semibold uppercase tracking-[.08em]"
                  key={b}
                >
                  <span className="h-[6px] w-[6px] rounded-full" style={{ background: br ? br.color : 'var(--c)' }} />
                  {b}
                </span>
              )
            })}
          </div>
          <h3>
            <Link
              to={detail}
              className="inline-block pr-12 transition-transform duration-150 ease-brand hover:text-blue active:scale-[0.98]"
            >
              {p.name}
            </Link>
          </h3>
          <RichText html={p.blurb} className="mt-[8px] max-h-[4.6em] max-w-[62ch] overflow-hidden text-[.94rem] text-grey" />
          <div className="mt-[16px] flex flex-wrap gap-[7px]">
            {p.tags.slice(0, 4).map((tag) => (
              <span className="rounded-full border border-line bg-paper px-[10px] py-[5px] font-mono text-[.68rem] tracking-[.06em] text-fg" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-[24px] flex flex-wrap items-center gap-[14px] border-t border-line pt-[18px]">
            <Link
              to={detail}
              className="group/spec inline-flex items-center gap-[10px] font-display text-[.92rem] font-bold transition-transform duration-150 ease-brand active:scale-[0.97]"
            >
              <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-yellow text-[.9rem] transition-transform duration-200 ease-brand group-hover/spec:translate-x-[3px]">
                →
              </span>{' '}
              {p.specTitle}
            </Link>
            <Link to={detail} className="btn solid sm ml-auto">
              {t('product.viewDetails')} <span className="ar">→</span>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <>
      <section className="dark on-dark tight page-hero" style={{ '--hero-img': "url('/images/heroes/products.jpg')" }}>
        <div className="shell">
          <p className="eyebrow text-yellow">
            {t('products.eyebrow')} <span className="kh">{tAlt('products.eyebrow')}</span>
          </p>
          <h2 className="max-w-[18ch]">
            {t('products.page.title')}
          </h2>
          <p className="lead mt-[22px]">
            {t('products.page.lead')}
          </p>
        </div>
      </section>

      <section className="tight">
        <div className="shell">
          <div className="mb-[30px] flex flex-wrap gap-[10px]" role="group" aria-label={t('products.brands')}>
            {BRANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                className={CHIP}
                onClick={() => scrollToBrand(b.id)}
              >
                <span className="h-[9px] w-[9px] rounded-full" style={{ background: b.color }} />
                {b.label}
              </button>
            ))}
          </div>

          {error && <p className="lead">{t('products.err')}: {error}</p>}

          {!error &&
            BRANDS.map((b) => {
              const list = products.filter((p) => p.brands.includes(b.label))
              if (list.length === 0) return null
              return (
                <div className="mb-[clamp(38px,4vw,56px)]" id={`brand-${b.id}`} key={b.id}>
                  <div className="mb-[18px] flex items-center gap-4 border-b border-line pb-4">
                    <span className="h-9 w-[5px] flex-none rounded-full" style={{ background: b.color }} />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-[1.6rem] font-extrabold">{b.label}</h3>
                      <span className="text-[.88rem] text-grey">{t(b.roleKey)}</span>
                    </div>
                    <span className="ml-auto font-mono text-[.72rem] tracking-[.08em] text-grey">{list.length}</span>
                  </div>
                  {list.map((p) => card(p))}
                </div>
              )
            })}
        </div>
      </section>

      <section className="dark on-dark tight relative overflow-hidden" id="fittings-section">
        <span className="pointer-events-none absolute -right-20 -bottom-24 h-[360px] w-[360px] rounded-full border-[44px] border-white/[0.05]" />
        <div className="shell">
          <p className="eyebrow text-yellow">
            {t('products.eyebrow')} <span className="kh">{tAlt('products.eyebrow')}</span>
          </p>
          <p className="mt-4 font-mono text-[.78rem] tracking-[.08em] text-white/50">
            fittings / Eagle · Lion Head · Smart
          </p>
          <h2 className="mt-3 max-w-[22ch]">
            {t('products.fittings.title1')}
            <br />
            {t('products.fittings.title2')}
          </h2>
          <RichText html={t('products.fittings.lead')} className="lead mt-[18px] max-w-[62ch]" />
          <div className="mt-[22px] flex flex-wrap gap-[8px]">
            {['Tees', 'Elbows 90° & 45°', 'Couplings', 'Reducers', 'Plugs & caps', 'Clamps'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.22] px-[13px] py-[7px] font-mono text-[.72rem] tracking-[.06em] text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-[28px] flex flex-wrap gap-[14px]">
            <Link to={loc(lang, '/contact')} className="btn sm">
              {t('product.quote')} <span className="ar">→</span>
            </Link>
            <Link to={loc(lang, '/contact')} className="btn ghost sm">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="shell">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-9 w-[5px] flex-none rounded-full bg-blue" />
            <h3 className="font-display text-[1.3rem] font-extrabold">Fitting classes</h3>
          </div>
          <p className="mb-6 max-w-[62ch] text-[.92rem] text-grey">Full dimension drawings for every fitting are in the printed catalogue.</p>
          <div className="overflow-hidden rounded-[14px] border border-line">
            <table>
              <thead>
                <tr className="bg-ink text-white">
                  <th className="px-6 py-4 text-left font-mono text-[.72rem] uppercase tracking-[.12em]">Class</th>
                  <th className="px-6 py-4 text-left font-mono text-[.72rem] uppercase tracking-[.12em]">Size range</th>
                  <th className="px-6 py-4 text-left font-mono text-[.72rem] uppercase tracking-[.12em]">Includes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line">
                  <td className="px-6 py-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue/10 font-display text-[.92rem] font-bold text-blue">13.5</span>
                  </td>
                  <td className="px-6 py-5 font-display text-[.92rem] font-semibold">21 – 165 mm <span className="text-grey">(½" – 6")</span></td>
                  <td className="px-6 py-5 text-[.88rem] text-grey">Tees, 90°/45° elbows, female & male elbows, couplings, reducers, male plugs, end caps, clamps</td>
                </tr>
                <tr className="border-t border-line bg-paper-2/50">
                  <td className="px-6 py-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-yellow/10 font-display text-[.92rem] font-bold text-yellow-deep">8.5</span>
                  </td>
                  <td className="px-6 py-5 font-display text-[.92rem] font-semibold">60 – 165 mm <span className="text-grey">(2" – 6")</span></td>
                  <td className="px-6 py-5 text-[.88rem] text-grey">Drainage tees, swept tees, 45° elbows, reducing bushes, waste traps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fittings.map((f, i) => (
              <Reveal key={i}>
                <div className="group overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 hover:-translate-y-[4px] hover:border-blue/30 hover:shadow-[0_16px_36px_-14px_rgba(11,87,164,.18)]">
                  <div className="relative h-[160px] overflow-hidden bg-paper-2">
                    <PlaceholderImage
                      label={f.n}
                      color="#0B57A4"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-[4px] bg-blue" />
                  </div>
                  <div className="p-5">
                    <h4 className="mb-1 font-display text-[1rem] font-bold">{f.n}</h4>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-mono text-[.72rem] font-semibold text-blue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                      {f.s}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
