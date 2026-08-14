import { useEffect, useState } from 'react'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../adminApi'
import { usePageLang } from '../lang'
import { PreviewModal, ProductPreview } from '../preview'
import { Field, TextInput, TextArea, Section, Alert, ActionBar, PageHeader, BTN, BTN_GHOST, Checkbox, SwatchInput, Card, RowActions, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'new': 'New product',
    'newTitle': 'New product',
    'editTitle': 'Edit product',
    'backLabel': 'Products',
    'save': 'Save product',
    'delete': 'Delete product',
    'identity': 'Identity',
    'identity.d': 'How this product is named and linked on the site.',
    'id': 'ID',
    'id.hint': 'Used in the URL, e.g. upvc',
    'brands': 'Brands',
    'brands.hint': 'Comma-separated, e.g. Eagle, Lion Head, Smart',
    'name': 'Name',
    'meta': 'Meta line',
    'meta.hint': 'e.g. Class 13.5 & 8.5 · 1/2"–12" · 4 m lengths',
    'desc': 'Description & tags',
    'desc.d': 'Shown on the product card and product page.',
    'blurb': 'Description',
    'tags': 'Tags',
    'onePerLine': 'One per line',
    'spec': 'Specification table',
    'spec.d': 'The technical table on the product page.',
    'specTitle': 'Table title',
    'caption': 'Caption',
    'cols': 'Column headers',
    'rows': 'Rows',
    'rows.hint': 'One row per line, cells separated by | — e.g. 21 | 22 | 1/2" | 22.4 ± 0.2',
    'appear': 'Appearance',
    'appear.d': 'The graphic and colours used across the site.',
    'color': 'Color token',
    'color.hint': 'A var(--c-…) token or hex value',
    'stripe': 'Stripe color',
    'stripe.hint': 'Optional accent stripe on the graphic',
    'legend': 'Legend',
    'legend.hint': 'Text printed on the pipe graphic',
    'graphic': 'Graphic',
    'light': 'Use the light version of the pipe graphic',
  },
  km: {
    'new': 'ផលិតផលថ្មី',
    'newTitle': 'ផលិតផលថ្មី',
    'editTitle': 'កែសម្រួលផលិតផល',
    'backLabel': 'ផលិតផល',
    'save': 'រក្សាទុកផលិតផល',
    'delete': 'លុបផលិតផល',
    'identity': 'អត្តសញ្ញាណ',
    'identity.d': 'របៀបដាក់ឈ្មោះ និងភ្ជាប់ផលិតផលនេះនៅលើគេហទំព័រ។',
    'id': 'លេខសម្គាល់',
    'id.hint': 'ប្រើក្នុង URL ឧ. upvc',
    'brands': 'ម៉ាក',
    'brands.hint': 'បំបែកដោយក្បៀស ឧ. Eagle, Lion Head, Smart',
    'name': 'ឈ្មោះ',
    'meta': 'បន្ទាត់ Meta',
    'meta.hint': 'ឧ. Class 13.5 & 8.5 · 1/2"–12" · 4 m lengths',
    'desc': 'ការពិពណ៌នា និងស្លាក',
    'desc.d': 'បង្ហាញលើកាតផលិតផល និងទំព័រផលិតផល។',
    'blurb': 'ការពិពណ៌នា',
    'tags': 'ស្លាក',
    'onePerLine': 'មួយក្នុងមួយជួរ',
    'spec': 'តារាងលក្ខណៈបច្ចេកទេស',
    'spec.d': 'តារាងបច្ចេកទេសនៅលើទំព័រផលិតផល។',
    'specTitle': 'ចំណងជើងតារាង',
    'caption': 'ចំណងជើងរង',
    'cols': 'ចំណងជើងជួរឈរ',
    'rows': 'ជួរដេក',
    'rows.hint': 'មួយជួរក្នុងមួយជួរដេក បំបែកក្រឡាដោយ | — ឧ. 21 | 22 | 1/2" | 22.4 ± 0.2',
    'appear': 'រូបរាង',
    'appear.d': 'ក្រាហ្វិក និងពណ៌ដែលប្រើលើគេហទំព័រ។',
    'color': 'តម្លៃពណ៌',
    'color.hint': 'token var(--c-…) ឬតម្លៃ hex',
    'stripe': 'ពណ៌ Stripe',
    'stripe.hint': 'ស្រេចចិត្ត — ឆ្នូតពណ៌លើក្រាហ្វិក',
    'legend': 'អត្ថបទលើបំពង់',
    'legend.hint': 'អត្ថបទបោះពុម្ពលើក្រាហ្វិកបំពង់',
    'graphic': 'ក្រាហ្វិក',
    'light': 'ប្រើក្រាហ្វិកបំពង់កំណែស្រាល',
  },
}

const BLANK = {
  id: '', name: '', name_km: '', brands: '', color: 'var(--c-upvc)', stripe: '', light: false,
  meta: '', meta_km: '', legend: '', blurb: '', blurb_km: '', tags: '', tags_km: '',
  specTitle: '', specTitle_km: '', caption: '', caption_km: '', cols: '', rows: '',
}

function toForm(p) {
  if (!p) return BLANK
  return {
    ...BLANK,
    ...p,
    brands: (p.brands || []).join(', '),
    tags: (p.tags || []).join('\n'),
    tags_km: (p.tags_km || []).join('\n'),
    cols: (p.cols || []).join('\n'),
    rows: (p.rows || []).map((r) => r.join(' | ')).join('\n'),
  }
}

function toPayload(f) {
  return {
    ...f,
    brands: f.brands.split(',').map((s) => s.trim()).filter(Boolean),
    tags: f.tags.split('\n').map((s) => s.trim()).filter(Boolean),
    tags_km: f.tags_km.split('\n').map((s) => s.trim()).filter(Boolean),
    cols: f.cols.split('\n').map((s) => s.trim()).filter(Boolean),
    rows: f.rows.split('\n').map((s) => s.trim()).filter(Boolean).map((line) => line.split('|').map((c) => c.trim())),
  }
}

export default function AdminProducts() {
  const { t, fmt, pick, lang } = usePageLang(T)
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null) // null | 'new' | product object
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(false)

  function load() {
    listProducts().then((r) => setItems(r.items)).catch((e) => setError(String(e)))
  }
  useEffect(load, [])

  function startNew() {
    setForm(BLANK)
    setEditing('new')
    setError('')
  }
  function startEdit(p) {
    setForm(toForm(p))
    setEditing(p)
    setError('')
  }
  function cancel() {
    setEditing(null)
    setError('')
  }

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const payload = toPayload(form)
      if (editing === 'new') await createProduct(payload)
      else await updateProduct(editing.id, payload)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    } finally {
      setBusy(false)
    }
  }

  async function remove(p) {
    if (!confirm(fmt('deleteConfirm', { name: p.name }))) return
    try {
      await deleteProduct(p.id)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const setChecked = (key) => (e) => setForm({ ...form, [key]: e.target.checked })

  if (editing) {
    return (
      <div className="w-full">
        <PageHeader
          title={editing === 'new' ? t('newTitle') : `${t('editTitle')} — ${pick(editing.name, editing.name_km)}`}
          onBack={cancel}
          backLabel={t('backLabel')}
        />
        {error && <Alert kind="error">{error}</Alert>}
        <form onSubmit={save} className="space-y-5">
          <Section step={1} title={t('identity')} desc={t('identity.d')}>
            <Field label={t('id')} hint={t('id.hint')} required>
              <TextInput value={form.id} onChange={set('id')} disabled={editing !== 'new'} required />
            </Field>
            <Field label={t('brands')} hint={t('brands.hint')} required>
              <TextInput value={form.brands} onChange={set('brands')} required />
            </Field>
            <Field label={t('name')} lang="EN" required>
              <TextInput value={form.name} onChange={set('name')} required />
            </Field>
            <Field label={t('name')} lang="KM">
              <TextInput value={form.name_km} onChange={set('name_km')} />
            </Field>
            <Field label={t('meta')} lang="EN" hint={t('meta.hint')}>
              <TextInput value={form.meta} onChange={set('meta')} />
            </Field>
            <Field label={t('meta')} lang="KM">
              <TextInput value={form.meta_km} onChange={set('meta_km')} />
            </Field>
          </Section>

          <Section step={2} title={t('desc')} desc={t('desc.d')}>
            <Field label={t('blurb')} lang="EN">
              <TextArea rows={4} value={form.blurb} onChange={set('blurb')} />
            </Field>
            <Field label={t('blurb')} lang="KM">
              <TextArea rows={4} value={form.blurb_km} onChange={set('blurb_km')} />
            </Field>
            <Field label={t('tags')} lang="EN" hint={t('onePerLine')}>
              <TextArea rows={4} value={form.tags} onChange={set('tags')} />
            </Field>
            <Field label={t('tags')} lang="KM" hint={t('onePerLine')}>
              <TextArea rows={4} value={form.tags_km} onChange={set('tags_km')} />
            </Field>
          </Section>

          <Section step={3} title={t('spec')} desc={t('spec.d')}>
            <Field label={t('specTitle')} lang="EN">
              <TextInput value={form.specTitle} onChange={set('specTitle')} />
            </Field>
            <Field label={t('specTitle')} lang="KM">
              <TextInput value={form.specTitle_km} onChange={set('specTitle_km')} />
            </Field>
            <Field label={t('caption')} lang="EN">
              <TextInput value={form.caption} onChange={set('caption')} />
            </Field>
            <Field label={t('caption')} lang="KM">
              <TextInput value={form.caption_km} onChange={set('caption_km')} />
            </Field>
            <Field label={t('cols')} hint={t('onePerLine')}>
              <TextArea rows={4} value={form.cols} onChange={set('cols')} />
            </Field>
            <Field label={t('rows')} hint={t('rows.hint')}>
              <TextArea rows={4} value={form.rows} onChange={set('rows')} />
            </Field>
          </Section>

          <Section step={4} title={t('appear')} desc={t('appear.d')}>
            <Field label={t('color')} hint={t('color.hint')}>
              <SwatchInput value={form.color} onChange={set('color')} />
            </Field>
            <Field label={t('stripe')} hint={t('stripe.hint')}>
              <SwatchInput value={form.stripe} onChange={set('stripe')} />
            </Field>
            <Field label={t('legend')} hint={t('legend.hint')}>
              <TextInput value={form.legend} onChange={set('legend')} />
            </Field>
            <div>
              <span className="mb-2 block text-[.8rem] font-semibold text-fg/90">{t('graphic')}</span>
              <Checkbox label={t('light')} checked={form.light} onChange={setChecked('light')} />
            </div>
          </Section>

          <ActionBar left={editing !== 'new' && (
            <button
              type="button"
              onClick={() => remove(editing)}
              className="cursor-pointer border-0 bg-transparent px-2 text-[.84rem] font-semibold text-[#C0392B] hover:underline"
            >
              {t('delete')}
            </button>
          )}>
            <button type="button" className={BTN_GHOST} onClick={() => setPreview(true)}>{t('preview')}</button>
            <button type="button" className={BTN_GHOST} onClick={cancel}>{t('cancel')}</button>
            <button type="submit" disabled={busy} className={BTN}>{busy ? t('saving') : t('save')}</button>
          </ActionBar>
        </form>
        {preview && (
          <PreviewModal
            title={editing === 'new' ? t('newTitle') : pick(editing.name, editing.name_km)}
            subtitle={t('preview')}
            onClose={() => setPreview(false)}
          >
            <ProductPreview p={toPayload(form)} pick={pick} lang={lang} />
          </PreviewModal>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t('nav.products')}
        eyebrow={t('eyebrow')}
        action={<button type="button" className={BTN} onClick={startNew}>{t('new')}</button>}
      />
      {error && <Alert kind="error">{error}</Alert>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{t('th.name')}</th>
              <th className={TH}>{t('th.id')}</th>
              <th className={TH}>{t('th.brands')}</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-paper-2">
                <td className={TD}>{pick(p.name, p.name_km)}</td>
                <td className={TD}>{p.id}</td>
                <td className={TD}>{(p.brands || []).join(', ')}</td>
                <td className={`${TD} whitespace-nowrap`}>
                  <RowActions onEdit={() => startEdit(p)} onDelete={() => remove(p)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
