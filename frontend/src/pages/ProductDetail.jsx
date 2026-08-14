import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Pipe from '../components/Pipe'
import RichText from '../components/RichText'
import { getProduct } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

export default function ProductDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setProduct(null)
    setError(null)
    getProduct(id, lang)
      .then(setProduct)
      .catch((e) => setError(String(e)))
  }, [id, lang])

  const backLink = (
    <Link
      to={loc(lang, '/products')}
      className="inline-flex items-center gap-2 font-mono text-[.78rem] tracking-[.04em] text-yellow transition-transform duration-150 ease-brand active:scale-[0.96]"
    >
      <span className="ar" style={{ transform: 'rotate(180deg)' }}>→</span> {t('product.back')}
    </Link>
  )

  if (error) {
    return (
      <section className="dark on-dark tight">
        <div className="shell max-w-[640px]">
          {backLink}
          <p className="lead mt-[26px]">{t('product.notfound')}</p>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="dark on-dark tight">
        <div className="shell max-w-[640px]">
          {backLink}
          <p className="lead mt-[26px]">{t('product.loading')}</p>
        </div>
      </section>
    )
  }

  const p = product
  const quoteTo = `${loc(lang, '/contact')}?product=${p.id}`

  return (
    <>
      <section className="dark on-dark tight relative overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-[6px] bg-[var(--c)]" style={{ '--c': p.color }} />
        <span className="pointer-events-none absolute -right-20 -bottom-24 h-[360px] w-[360px] rounded-full border-[44px] border-white/[0.05]" />
        <div className="shell">
          {backLink}
          <p className="eyebrow text-yellow mt-[22px]">
            {p.id} / {p.brands.join(' · ')}
          </p>
          <h2 className="max-w-[22ch]">{p.name}</h2>
          <RichText html={p.blurb} className="lead mt-[18px] max-w-[62ch]" />
          <div className="mt-[22px] flex flex-wrap gap-[8px]">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.22] px-[13px] py-[7px] font-mono text-[.72rem] tracking-[.06em] text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-[28px] flex flex-wrap gap-[14px]">
            <Link to={quoteTo} className="btn sm">
              {t('product.quote')} <span className="ar">→</span>
            </Link>
            <Link to={loc(lang, '/contact')} className="btn ghost sm">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="shell grid grid-cols-1 gap-[34px] lg:grid-cols-[260px_1fr]">
          <div className="prod-visual overflow-hidden rounded-[14px] border border-line">
            <Pipe color={p.color} stripe={p.stripe} legend={p.legend} light={p.light} height="88%" />
          </div>
          <div>
            <p className="mb-[22px] text-[.94rem] text-grey">{p.meta}</p>
            <h3 className="mb-[14px]">{p.specTitle}</h3>
            <div className="tablewrap">
              <table>
                <caption>{p.caption}</caption>
                <thead>
                  <tr>
                    {p.cols.map((c, i) => (
                      <th scope="col" key={i}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((c, j) => (
                        <td key={j}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
