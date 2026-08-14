import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sendQuote, getMeta } from '../api'
import { useI18n } from '../i18n'

const PRODUCT_OPTIONS = [
  { v: 'uPVC pressure pipe', k: 'contact.product.upvc' },
  { v: 'uPVC fittings', k: 'contact.product.fittings' },
  { v: 'PPR pipe (hot & cold)', k: 'contact.product.ppr' },
  { v: 'HDPE pipe', k: 'contact.product.hdpe' },
  { v: 'Electrical conduit', k: 'contact.product.conduit' },
  { v: 'Corrugated conduit', k: 'contact.product.corr' },
  { v: 'Trunking', k: 'contact.product.trunking' },
  { v: 'Conduit fittings', k: 'contact.product.condfit' },
  { v: 'Mixed order / not sure yet', k: 'contact.product.mixed' },
]

const PRODUCT_BY_ID = {
  upvc: 'uPVC pressure pipe',
  fittings: 'uPVC fittings',
  ppr: 'PPR pipe (hot & cold)',
  hdpe: 'HDPE pipe',
  conduit: 'Electrical conduit',
  corrugated: 'Corrugated conduit',
  trunking: 'Trunking',
  condfit: 'Conduit fittings',
}

const TOPIC_OPTIONS = [
  { v: 'A price quote', k: 'contact.topic.quote' },
  { v: 'Stock availability', k: 'contact.topic.stock' },
  { v: 'Technical specifications', k: 'contact.topic.specs' },
  { v: 'A factory visit', k: 'contact.topic.visit' },
  { v: 'To become a distributor', k: 'contact.topic.dist' },
]

const FIELD =
  'w-full rounded-[10px] border border-line-strong bg-paper px-[15px] py-[13px] text-[.95rem] transition-colors duration-200 focus:border-blue focus:bg-card focus:shadow-[0_0_0_3px_rgba(11,87,164,.14)] focus:outline-none'

export default function Contact() {
  const { t, tAlt } = useI18n()
  const [params] = useSearchParams()
  const initialProduct = PRODUCT_BY_ID[params.get('product')] || PRODUCT_OPTIONS[0].v
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: initialProduct,
    topic: TOPIC_OPTIONS[0].v,
    message: '',
  })
  const [sent, setSent] = useState(null) // {ok, mailto, errorText}
  const [busy, setBusy] = useState(false)
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    let alive = true
    getMeta()
      .then((m) => alive && setMeta(m))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const phone = meta?.phone || '+855 (0)23 939 399'
  const phoneTel = meta?.phone_tel || '+85523939399'
  const email = meta?.email || 'sales@upgpipe.com'
  const ho1 = meta?.head_office?.line1 || 'Building #6, St. 289, Sangkat Boeung Kak 2, Khan Toul Kork, Phnom Penh'
  const ho2 = meta?.head_office?.line2
  const fac1 = meta?.factory?.line1 || 'Phoum Por Mongkoul, Sangkat Prek Phnov, Khan Prek Phnov, Phnom Penh'
  const fac2 = meta?.factory?.line2

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setSent({ ok: false, errorText: t('contact.err.validation') })
      return
    }
    setBusy(true)
    try {
      const res = await sendQuote(form)
      setSent({ ok: true, ...res })
    } catch {
      setSent({ ok: false, errorText: t('contact.err.server') })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <section className="tight">
        <div className="shell">
          <p className="eyebrow">
            {t('nav.contact')} <span className="kh">{tAlt('nav.contact')}</span>
          </p>
          <h2 className="max-w-[14ch]">{t('contact.title')}</h2>
          <p className="lead mt-[22px]">
            {t('contact.lead')}
          </p>
        </div>
      </section>

      <section className="pt-0">
        <div className="shell">
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-[14px] border border-line bg-card p-[clamp(26px,3vw,38px)]">
              <h3 className="mb-5">{t('contact.form.title')}</h3>
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-[18px] grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="field">
                    <label htmlFor="f-name" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.name')}</label>
                    <input
                      id="f-name"
                      name="name"
                      required
                      placeholder={t('contact.ph.name')}
                      value={form.name}
                      onChange={set('name')}
                      className={FIELD}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-company" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.company')}</label>
                    <input
                      id="f-company"
                      name="company"
                      placeholder={t('contact.ph.company')}
                      value={form.company}
                      onChange={set('company')}
                      className={FIELD}
                    />
                  </div>
                </div>
                <div className="mb-[18px] grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="field">
                    <label htmlFor="f-phone" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.phone')}</label>
                    <input
                      id="f-phone"
                      name="phone"
                      required
                      placeholder={t('contact.ph.phone')}
                      value={form.phone}
                      onChange={set('phone')}
                      className={FIELD}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.email')}</label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      placeholder={t('contact.ph.email')}
                      value={form.email}
                      onChange={set('email')}
                      className={FIELD}
                    />
                  </div>
                </div>
                <div className="mb-[18px] grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="field">
                    <label htmlFor="f-product" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.product')}</label>
                    <select id="f-product" name="product" value={form.product} onChange={set('product')} className={FIELD}>
                      {PRODUCT_OPTIONS.map((o) => (
                        <option key={o.v} value={o.v}>
                          {t(o.k)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="f-topic" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.topic')}</label>
                    <select id="f-topic" name="topic" value={form.topic} onChange={set('topic')} className={FIELD}>
                      {TOPIC_OPTIONS.map((o) => (
                        <option key={o.v} value={o.v}>
                          {t(o.k)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-[18px]">
                  <label htmlFor="f-msg" className="mb-2 block font-mono text-[.7rem] uppercase tracking-[.14em] text-grey">{t('contact.label.message')}</label>
                  <textarea
                    id="f-msg"
                    name="message"
                    placeholder={t('contact.ph.message')}
                    value={form.message}
                    onChange={set('message')}
                    className={`${FIELD} min-h-[124px] resize-y`}
                  />
                </div>
                <button type="submit" className="btn solid" disabled={busy}>
                  {busy ? t('contact.sending') : t('contact.send')} <span className="ar">→</span>
                </button>
                <p className="mt-[14px] mb-0 text-[.82rem] text-grey">{t('contact.note')}</p>
                {sent && (
                  <div
                    className={`mt-4 rounded-[10px] border px-4 py-[14px] text-[.9rem]${sent.ok ? ' block border-[#A8DEC0] bg-[var(--ok-bg)]' : ' block border-[#F3B6B6] bg-[var(--err-bg)]'}`}
                  >
                    {sent.ok ? (
                      <>
                        {t('contact.sent.pre', { name: form.name, id: sent.id })}{' '}
                        <a
                          href={sent.mailto}
                          className="font-semibold text-blue"
                        >
                          {t('contact.open')}
                        </a>
                        {t('contact.sent.post')}
                      </>
                    ) : (
                      sent.errorText
                    )}
                  </div>
                )}
              </form>
            </div>

            <div>
              <div className="mb-[18px] rounded-[14px] bg-ink px-[clamp(26px,3vw,36px)] py-[clamp(26px,3vw,36px)] text-white">
                <h3 className="mb-5">{t('contact.info.talk')}</h3>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('contact.info.sales')}</span>
                    <a className="text-[.96rem] leading-[1.5] hover:text-yellow" href={`tel:${phoneTel}`}>
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('contact.info.email')}</span>
                    <a className="text-[.96rem] leading-[1.5] hover:text-yellow" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('contact.info.hours')}</span>
                    <span className="whitespace-pre-line text-[.96rem] leading-[1.5]">
                      {meta?.office_hours ? (
                        meta.office_hours
                      ) : (
                        <>
                          {t('contact.info.hours.v1')}
                          <br />
                          {t('contact.info.hours.v2')}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-[18px] rounded-[14px] bg-blue px-[clamp(26px,3vw,36px)] py-[clamp(26px,3vw,36px)] text-white">
                <h3 className="mb-5">{t('contact.info.visit')}</h3>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('contact.info.ho')}</span>
                    <span className="text-[.96rem] leading-[1.5]">
                      {ho1}
                      {ho2 && (
                        <>
                          <br />
                          {ho2}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-white/[0.14] py-[15px] first:border-t-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-[18px] w-[18px] flex-none text-yellow">
                    <path d="M2 20h20M4 20V9l5-3v14M13 20V4l7 4v12" />
                  </svg>
                  <div>
                    <span className="mb-[3px] block font-mono text-[.66rem] uppercase tracking-[.15em] text-white/55">{t('contact.info.factory')}</span>
                    <span className="text-[.96rem] leading-[1.5]">
                      {fac1}
                      {fac2 && (
                        <>
                          <br />
                          {fac2}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative grid min-h-[220px] place-items-center overflow-hidden rounded-[14px] border border-line bg-paper-2 p-[30px] text-center">
                <span className="map-grid" />
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-[10px] h-[34px] w-[34px] text-red">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <b className="mb-1 block font-display">{t('contact.map.name')}</b>
                  <span className="mb-[14px] block text-[.88rem] text-grey">{t('contact.map.street')}</span>
                  <a
                    className="btn ghost"
                    href="https://www.google.com/maps/search/?api=1&query=UPG+PIPE+CO+LTD+Phnom+Penh"
                    target="_blank"
                    rel="noopener"
                  >
                    {t('contact.map.cta')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
