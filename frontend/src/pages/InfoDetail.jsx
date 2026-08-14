import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { loc } from '../links'

export default function InfoDetail({ items }) {
  const { lang, t, tAlt } = useI18n()
  const { id } = useParams()
  const item = items.find((x) => x.id === id)
  const L = (o) => (o && o[lang]) || (o && o.en) || ''

  if (!item) {
    return (
      <section className="dark on-dark">
        <div className="shell">
          <p className="lead">{t('info.notfound')}</p>
          <Link to={loc(lang, '/')} className="btn ghost">
            {t('info.back')}
          </Link>
        </div>
      </section>
    )
  }

  const title = item.t ? L(item.t) : L(item.k)
  const lead = item.b ? L(item.b) : L(item.d)

  return (
    <>
      <section className="dark on-dark relative overflow-hidden">
        <span className="ring-circle" aria-hidden="true" />
        <div className="shell relative">
          <Link
            to={loc(lang, '/')}
            className="inline-flex items-center gap-2 font-mono text-[.72rem] uppercase tracking-[.18em] text-white/60 transition-colors hover:text-yellow"
          >
            ← {t('info.back')}
          </Link>
          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div>
              <p className="eyebrow text-yellow">
                UPG PIPE CO., LTD <span className="kh">{tAlt('brand.tagline')}</span>
              </p>
              {item.n && (
                <div className="mt-3 font-display text-[clamp(2.6rem,6vw,4rem)] font-extrabold leading-none text-yellow">
                  {item.n}
                </div>
              )}
              <h1 className="mt-4">{title}</h1>
              <p className="lead mt-6">{lead}</p>
              <div className="mt-8 flex flex-wrap gap-[14px]">
                <Link to={loc(lang, '/products')} className="btn">
                  {t('info.browse')} <span className="ar">→</span>
                </Link>
                <Link to={loc(lang, '/contact')} className="btn ghost">
                  {t('product.quote')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-5 -z-10 rounded-[26px] bg-[var(--c)]/20 blur-2xl" style={{ '--c': item.color }} />
              <img src={item.img} alt={title} className="w-full rounded-[18px] border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]" />
              {item.n && (
                <span
                  className="absolute -bottom-7 -left-4 font-display text-[clamp(4rem,9vw,6.5rem)] font-extrabold leading-none text-white/10"
                  aria-hidden="true"
                >
                  {item.n}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="max-w-[820px]">
            <p className="eyebrow">{t('info.highlights')}</p>
            <h2 className="mb-8">{title}</h2>
            <ul className="m-0 list-none space-y-4">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-4 rounded-[12px] border border-line bg-card px-5 py-4">
                  <span className="mt-[7px] h-[10px] w-[10px] flex-none rounded-full" style={{ background: item.color }} />
                  <p className="mb-0 text-[.96rem] text-grey">{L(b)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-14 max-w-[820px]">
            <p className="eyebrow">{t('info.story')}</p>
            <p className="lead">{L(item.more)}</p>
          </div>
        </div>
      </section>

      <section className="dark on-dark tight">
        <div className="shell max-w-[820px] text-center">
          <h2 className="mb-[30px]">{title}</h2>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <Link to={loc(lang, '/products')} className="btn">
              {t('info.browse')} <span className="ar">→</span>
            </Link>
            <Link to={loc(lang, '/contact')} className="btn ghost">
              {t('product.quote')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
