import enDict from '../i18n/en'
import kmDict from '../i18n/km'
import Pipe from '../components/Pipe'
import RichText from '../components/RichText'

function pubT(lang, key) {
  const table = lang === 'km' ? kmDict : enDict
  return table[key] ?? enDict[key] ?? key
}

const PIN = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)
const CLOCK = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3.2 2" />
  </svg>
)
const TEAM = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3" />
    <circle cx="16.5" cy="9.5" r="2.4" />
    <path d="M3.6 18c.6-3 2.9-4.6 5.4-4.6S14.4 15 15 18M15.2 13.6c2.7-.2 4.9 1.1 5.4 3.9" />
  </svg>
)

function Fact({ icon, label, value }) {
  return (
    <div className="flex items-center gap-[12px] rounded-[12px] border border-white/[0.14] bg-white/[0.03] px-[15px] py-[13px]">
      <span className="text-yellow">{icon}</span>
      <span>
        <span className="block font-mono text-[.62rem] uppercase tracking-[.16em] text-white/50">{label}</span>
        <span className="block text-[.93rem] font-medium text-white/95">{value}</span>
      </span>
    </div>
  )
}

export function PreviewModal({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-[rgba(5,14,27,.72)] backdrop-blur-[3px]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0b1424] px-6 py-[14px] text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-yellow font-display text-[.8rem] font-black text-[#0b1424]">
            P
          </span>
          <span className="min-w-0">
            <b className="block truncate font-display text-[.95rem] font-bold leading-tight">{title}</b>
            <span className="mt-[3px] block truncate font-mono text-[.62rem] uppercase tracking-[.18em] text-white/40">
              {subtitle}
            </span>
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-none cursor-pointer rounded-full border border-white/15 bg-white/[0.04] px-[18px] py-[7px] text-[.8rem] font-semibold text-white/80 transition-colors duration-150 hover:border-white/30 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto my-8 w-full max-w-[980px] overflow-hidden rounded-[16px] border border-white/10 bg-white shadow-[0_40px_120px_rgba(0,0,0,.5)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ProductPreview({ p, pick, lang }) {
  const t = (k) => pubT(lang, k)
  const tags = lang === 'km' && p.tags_km?.length ? p.tags_km : p.tags || []
  return (
    <>
      <section className="dark on-dark tight relative overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-[6px] bg-[var(--c)]" style={{ '--c': p.color }} />
        <span className="pointer-events-none absolute -right-20 -bottom-24 h-[360px] w-[360px] rounded-full border-[44px] border-white/[0.05]" />
        <div className="shell">
          <p className="eyebrow mt-[22px] text-yellow">
            {p.id} / {(p.brands || []).join(' · ')}
          </p>
          <h2 className="max-w-[22ch] text-[1.7rem]">{pick(p.name, p.name_km)}</h2>
          <RichText html={pick(p.blurb, p.blurb_km)} className="lead mt-[18px] max-w-[62ch]" />
          <div className="mt-[22px] flex flex-wrap gap-[8px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.22] px-[13px] py-[7px] font-mono text-[.72rem] tracking-[.06em] text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-[28px] flex flex-wrap gap-[14px]">
            <span className="btn sm">
              {t('product.quote')} <span className="ar">→</span>
            </span>
            <span className="btn ghost sm">{t('nav.contact')}</span>
          </div>
        </div>
      </section>
      <section className="tight">
        <div className="shell grid grid-cols-1 gap-[34px] lg:grid-cols-[260px_1fr]">
          <div className="prod-visual overflow-hidden rounded-[14px] border border-line">
            <Pipe color={p.color} stripe={p.stripe} legend={p.legend} light={p.light} height="88%" />
          </div>
          <div>
            <p className="mb-[22px] text-[.94rem] text-grey">{pick(p.meta, p.meta_km)}</p>
            <h3 className="mb-[14px]">{pick(p.specTitle, p.specTitle_km)}</h3>
            <div className="tablewrap">
              <table>
                <caption>{pick(p.caption, p.caption_km)}</caption>
                <thead>
                  <tr>
                    {(p.cols || []).map((c, i) => (
                      <th scope="col" key={i}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(p.rows || []).map((r, i) => (
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
          <h2 className="text-[1.7rem]">{t('products.catalogue.title')}</h2>
          <p className="lead mx-auto mb-[28px] mt-5">{t('products.catalogue.lead')}</p>
          <span className="btn">
            {t('products.catalogue.cta')} <span className="ar">→</span>
          </span>
        </div>
      </section>
    </>
  )
}

export function EventPreview({ e, pick, lang }) {
  const t = (k) => pubT(lang, k)
  const arr = lang === 'km' && e.highlights_km?.length ? e.highlights_km : e.highlights
  const hl = (i) => pick(e.highlights?.[i], e.highlights_km?.[i])
  return (
    <>
      <section className="dark on-dark tight relative overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-[6px] bg-[var(--c)]" style={{ '--c': e.c }} />
        <span className="pointer-events-none absolute -right-20 -bottom-24 h-[360px] w-[360px] rounded-full border-[44px] border-white/[0.05]" />
        <div className="shell">
          <div className="mt-[22px] flex flex-wrap items-center gap-[14px]">
            <span className="inline-flex items-center gap-[10px] rounded-[10px] bg-[var(--c)] px-[16px] py-[12px] font-display text-[1.35rem] font-extrabold leading-none text-white">
              {e.m} <span className="text-white/70">{e.y}</span>
            </span>
            <span className="rounded-full border border-white/[0.24] px-[13px] py-[6px] font-mono text-[.72rem] uppercase tracking-[.14em] text-white/85">
              {t(`events.kind.${e.kind}`)}
            </span>
          </div>
          <h2 className="mt-[22px] max-w-[24ch] text-[1.7rem]">{pick(e.t, e.t_km)}</h2>
          <p className="lead mt-[18px] max-w-[64ch]">{pick(e.d, e.d_km)}</p>
          <div className="mt-[24px] grid grid-cols-1 gap-[12px] sm:grid-cols-3">
            {e.loc && <Fact icon={PIN} label={t('event.location')} value={pick(e.loc, e.loc_km)} />}
            {e.dur && <Fact icon={CLOCK} label={t('event.duration')} value={pick(e.dur, e.dur_km)} />}
            {e.team && <Fact icon={TEAM} label={t('event.team')} value={pick(e.team, e.team_km)} />}
          </div>
        </div>
      </section>
      <section className="tight">
        <div className="shell grid grid-cols-1 gap-[26px] lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <h3 className="mb-[14px]">{t('event.highlights')}</h3>
            <ul className="m-0 space-y-[10px]">
              {(arr || []).map((_, i) => (
                <li key={i} className="flex gap-[12px] text-[.95rem] leading-snug text-fg">
                  <span className="mt-[9px] h-[7px] w-[7px] flex-none rounded-full bg-[var(--c)]" style={{ '--c': e.c }} />
                  <span>{hl(i)}</span>
                </li>
              ))}
            </ul>
          </div>
          {e.outcome && (
            <aside className="self-start rounded-[14px] bg-[var(--c)] p-[22px] text-white" style={{ '--c': e.c }}>
              <b className="mb-[6px] block font-mono text-[.68rem] uppercase tracking-[.16em] text-white/80">
                {t('event.outcome')}
              </b>
              <p className="m-0 text-[.95rem] leading-relaxed">{pick(e.outcome, e.outcome_km)}</p>
            </aside>
          )}
        </div>
      </section>
      <section className="dark on-dark tight">
        <div className="shell max-w-[720px] text-center">
          <h2 className="text-[1.7rem]">{t('products.catalogue.title')}</h2>
          <p className="lead mx-auto mb-[28px] mt-5">{t('products.catalogue.lead')}</p>
          <span className="btn">
            {t('products.catalogue.cta')} <span className="ar">→</span>
          </span>
        </div>
      </section>
    </>
  )
}

export function JobPreview({ j, pick, lang, index }) {
  const t = (k) => pubT(lang, k)
  const rArr = lang === 'km' && j.r_km?.length ? j.r_km : j.r
  const qArr = lang === 'km' && j.q_km?.length ? j.q_km : j.q
  const r = (i) => pick(j.r?.[i], j.r_km?.[i])
  const q = (i) => pick(j.q?.[i], j.q_km?.[i])
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-card">
      <div className="flex items-center gap-5 px-[26px] py-6">
        <span className="w-[26px] flex-none font-mono text-[.76rem] text-grey">{index}</span>
        <span className="flex-1">
          <b className="block font-display text-[1.08rem] font-bold">{pick(j.t, j.t_km)}</b>
          <span className="text-[.84rem] text-grey">{pick(j.dept, j.dept_km)}</span>
        </span>
        <span className="whitespace-nowrap rounded-full bg-paper px-3 py-[6px] font-mono text-[.7rem] uppercase tracking-[.1em] text-blue">
          {pick(j.loc, j.loc_km)}
        </span>
      </div>
      <div className="animate-pageIn px-[26px] pb-7 lg:pl-[72px]">
        <h4 className="mb-[10px] font-display text-[.92rem] uppercase tracking-[.06em] text-fg">{t('careers.r')}</h4>
        <ul className="mb-[18px] ml-0 pl-[18px]">
          {(rArr || []).map((_, k) => (
            <li className="mb-[6px] text-[.93rem] text-grey" key={k}>
              {r(k)}
            </li>
          ))}
        </ul>
        <h4 className="mb-[10px] font-display text-[.92rem] uppercase tracking-[.06em] text-fg">{t('careers.q')}</h4>
        <ul className="mb-[18px] ml-0 pl-[18px]">
          {(qArr || []).map((_, k) => (
            <li className="mb-[6px] text-[.93rem] text-grey" key={k}>
              {q(k)}
            </li>
          ))}
        </ul>
        <span className="btn solid">
          {t('careers.apply')} <span className="ar">→</span>
        </span>
      </div>
    </div>
  )
}

export function ClientPreview({ c, t }) {
  return (
    <section className="tight">
      <div className="shell">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h2 className="mb-[26px] text-[1.7rem]">{c.name}</h2>
        <div className="flex flex-wrap items-center gap-[14px]">
          {c.logo ? (
            <span className="grid h-[110px] w-[240px] place-items-center rounded-[12px] border border-line bg-card px-5">
              <img src={c.logo} alt={c.name} className="max-h-[88px] max-w-[200px] object-contain" />
            </span>
          ) : (
            <span className="rounded-[12px] border border-line bg-card px-5 py-[13px] font-display text-[1rem] font-bold text-fg">
              {c.name}
            </span>
          )}
          {c.international && (
            <span className="rounded-full bg-blue px-4 py-[7px] font-mono text-[.68rem] uppercase tracking-[.14em] text-white">
              {t('th.international')}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
