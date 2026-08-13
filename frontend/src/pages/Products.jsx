import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pipe from '../components/Pipe'
import Reveal from '../components/Reveal'
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
    return (
      <article className="mb-5 grid grid-cols-1 overflow-hidden rounded-[14px] border border-line bg-card scroll-mt-[120px] lg:grid-cols-[200px_1fr]" id={`p-${p.id}`} key={p.id}>
        <div className="prod-visual">
          <Pipe
            color={p.color}
            stripe={p.stripe}
            legend={p.legend}
            light={p.light}
            height="88%"
          />
        </div>
        <div className="px-8 py-[30px] pb-8">
          <div className="mb-[14px] font-mono text-[.72rem] uppercase tracking-[.13em] text-blue">{p.brands.join(' · ')}</div>
          <h3 className="mb-[6px]">
            <Link
              to={`${loc(lang, '/products')}/${p.id}`}
              className="inline-block transition-transform duration-150 ease-brand hover:text-blue active:scale-[0.97]"
            >
              {p.name}
            </Link>
          </h3>
          <p className="text-[.94rem] text-grey">{p.blurb}</p>
          <div className="flex flex-wrap gap-[7px]">
            {p.tags.map((tag) => (
              <span className="rounded-full border border-line bg-paper px-[10px] py-[5px] font-mono text-[.68rem] tracking-[.06em] text-fg" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`${loc(lang, '/products')}/${p.id}`}
            className="group/spec mt-[6px] inline-flex items-center gap-[10px] font-display text-[.92rem] font-bold text-fg transition-transform duration-150 ease-brand active:scale-[0.97]"
          >
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-yellow text-[.9rem] transition-transform duration-200 ease-brand group-hover/spec:translate-x-[3px] group-active/spec:scale-90">
              →
            </span>{' '}
            {p.specTitle}
          </Link>
        </div>
      </article>
    )
  }

  return (
    <>
      <section className="dark on-dark tight">
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

      <section className="band">
        <div className="shell">
          <div className="mb-[clamp(34px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow">{t('products.eyebrow')}</p>
              <h2>
                {t('products.fittings.title1')}
                <br />
                {t('products.fittings.title2')}
              </h2>
            </div>
            <p className="lead mb-0 mt-[14px]">
              {t('products.fittings.lead')}
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px]">
            {fittings.map((f, i) => (
              <Reveal className="rounded-[12px] border border-line bg-card px-4 py-[18px] text-center transition-all duration-200 ease-brand hover:-translate-y-[3px] hover:border-blue" key={i}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="mx-auto mb-3 h-[44px] w-[44px] text-blue-lite"
                >
                  <path d={f.p} />
                </svg>
                <b className="block font-display text-[.88rem] font-bold">{f.n}</b>
                <span className="font-mono text-[.68rem] text-grey">{f.s}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark on-dark tight">
        <div className="shell max-w-[760px] text-center">
          <h2>{t('products.catalogue.title')}</h2>
          <p className="lead mx-auto mb-[28px] mt-5">
            {t('products.catalogue.lead')}
          </p>
          <Link to={loc(lang, '/contact')} className="btn">
            {t('products.catalogue.cta')} <span className="ar">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
