import { useEffect, useState } from 'react'
import { listClients, createClient, updateClient, deleteClient } from '../adminApi'
import { usePageLang } from '../lang'
import { PreviewModal, ClientPreview } from '../preview'
import { Field, TextInput, Section, Alert, ActionBar, PageHeader, BTN, BTN_GHOST, Checkbox, ImagePicker, Card, RowActions, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'new': 'New client',
    'newTitle': 'New client',
    'editTitle': 'Edit client',
    'backLabel': 'Clients',
    'save': 'Save client',
    'name': 'Name',
    'market': 'Market',
    'international': 'International client (shown in the overseas marquee)',
    'logo': 'Logo',
    'logo.hint': 'Optional — shown in the client marquee on the home & about pages',
    'removeConfirm': 'Remove "{name}"?',
    'yes': 'Yes',
    'no': 'No',
  },
  km: {
    'new': 'អតិថិជនថ្មី',
    'newTitle': 'អតិថិជនថ្មី',
    'editTitle': 'កែសម្រួលអតិថិជន',
    'backLabel': 'អតិថិជន',
    'save': 'រក្សាទុកអតិថិជន',
    'name': 'ឈ្មោះ',
    'market': 'ទីផ្សារ',
    'international': 'អតិថិជនអន្តរជាតិ (បង្ហាញក្នុង marquee ក្រៅប្រទេស)',
    'logo': 'ឡូហ្គោ',
    'logo.hint': 'ស្រេចចិត្ត — បង្ហាញក្នុង marquee អតិថិជនលើទំព័រដើម និងអំពីយើង',
    'removeConfirm': 'ដកចេញ "{name}"?',
    'yes': 'បាទ',
    'no': 'ទេ',
  },
}

const BLANK = { name: '', international: false, logo: '' }

export default function AdminClients() {
  const { t, fmt } = usePageLang(T)
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null) // null | 'new' | client object
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(false)

  function load() {
    listClients().then((r) => setItems(r.items)).catch((e) => setError(String(e)))
  }
  useEffect(load, [])

  function startNew() {
    setForm(BLANK)
    setEditing('new')
    setError('')
  }
  function startEdit(c) {
    setForm({ name: c.name, international: !!c.international, logo: c.logo || '' })
    setEditing(c)
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
      if (editing === 'new') await createClient(form)
      else await updateClient(editing.id, form)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    } finally {
      setBusy(false)
    }
  }

  async function remove(c) {
    if (!confirm(fmt('removeConfirm', { name: c.name }))) return
    try {
      await deleteClient(c.id)
      load()
    } catch (err) {
      setError(String(err))
    }
  }

  if (editing) {
    return (
      <div className="w-full">
        <PageHeader
          title={editing === 'new' ? t('newTitle') : `${t('editTitle')} — ${editing.name}`}
          onBack={cancel}
          backLabel={t('backLabel')}
        />
        {error && <Alert kind="error">{error}</Alert>}
        <form onSubmit={save}>
          <Section step={1} title={t('name')} desc={t('market')}>
            <Field label={t('name')} required>
              <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required autoFocus />
            </Field>
            <div>
              <span className="mb-2 block text-[.8rem] font-semibold text-fg/90">{t('market')}</span>
              <Checkbox
                label={t('international')}
                checked={form.international}
                onChange={(e) => setForm({ ...form, international: e.target.checked })}
              />
            </div>
            <Field label={t('logo')} hint={t('logo.hint')} className="md:col-span-2">
              <ImagePicker
                value={form.logo}
                onChange={(url) => setForm({ ...form, logo: url })}
                labels={{ upload: t('img.upload'), replace: t('img.replace'), remove: t('img.remove'), uploading: t('img.uploading') }}
              />
            </Field>
          </Section>
          <ActionBar>
            <button type="button" className={BTN_GHOST} onClick={() => setPreview(true)}>{t('preview')}</button>
            <button type="button" className={BTN_GHOST} onClick={cancel}>{t('cancel')}</button>
            <button type="submit" disabled={busy} className={BTN}>{busy ? t('saving') : t('save')}</button>
          </ActionBar>
        </form>
        {preview && (
          <PreviewModal
            title={editing === 'new' ? t('newTitle') : editing.name}
            subtitle={t('preview')}
            onClose={() => setPreview(false)}
          >
            <ClientPreview c={form} t={t} />
          </PreviewModal>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t('nav.clients')}
        eyebrow={t('eyebrow')}
        action={<button type="button" className={BTN} onClick={startNew}>{t('new')}</button>}
      />
      {error && <Alert kind="error">{error}</Alert>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{t('th.name')}</th>
              <th className={TH}>{t('th.international')}</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-paper-2">
                <td className={TD}>{c.name}</td>
                <td className={TD}>{c.international ? t('yes') : t('no')}</td>
                <td className={`${TD} whitespace-nowrap`}>
                  <RowActions onEdit={() => startEdit(c)} onDelete={() => remove(c)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
