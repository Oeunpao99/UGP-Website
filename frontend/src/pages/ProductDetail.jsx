import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Pipe from '../components/Pipe'
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

  return (
    <>
      <section className="dark on-dark tight">
        <div className="shell">
          {backLink}
          <p className="eyebrow text-yellow mt-[22px]">{p.brands.join(' · ')}</p>
          <h2 className="max-w-[22ch]">{p.name}</h2>
          <p className="lead mt-[18px] max-w-[62ch]">{p.blurb}</p>
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

      <section className="dark on-dark tight">
        <div className="shell max-w-[720px] text-center">
          <h2>{t('products.catalogue.title')}</h2>
          <p className="lead mx-auto mb-[28px] mt-5">{t('products.catalogue.lead')}</p>
          <Link to={loc(lang, '/contact')} className="btn">
            {t('products.catalogue.cta')} <span className="ar">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
