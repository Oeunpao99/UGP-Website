import { useEffect, useState } from 'react'
import { listJobs, createJob, updateJob, deleteJob } from '../adminApi'
import { usePageLang } from '../lang'
import { PreviewModal, JobPreview } from '../preview'
import { Field, TextInput, TextArea, Section, Alert, ActionBar, PageHeader, BTN, BTN_GHOST, Card, RowActions, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'new': 'New job opening',
    'newTitle': 'New job opening',
    'editTitle': 'Edit job',
    'backLabel': 'Careers',
    'save': 'Save job',
    'delete': 'Delete job',
    'basics': 'Basics',
    'basics.d': 'The job title and where it sits.',
    'title': 'Title',
    'dept': 'Department',
    'loc': 'Location',
    'content': 'Content',
    'content.d': 'Responsibilities and requirements — one item per line.',
    'resp': 'Responsibilities',
    'req': 'Requirements',
    'onePerLine': 'One per line',
  },
  km: {
    'new': 'ការងារថ្មី',
    'newTitle': 'ការងារថ្មី',
    'editTitle': 'កែសម្រួលការងារ',
    'backLabel': 'អាជីព',
    'save': 'រក្សាទុកការងារ',
    'delete': 'លុបការងារ',
    'basics': 'មូលដ្ឋាន',
    'basics.d': 'ចំណងជើងការងារ និងកន្លែងដែលវាស្ថិតនៅ។',
    'title': 'ចំណងជើង',
    'dept': 'នាយកដ្ឋាន',
    'loc': 'ទីតាំង',
    'content': 'ខ្លឹមសារ',
    'content.d': 'ភារកិច្ច និងតម្រូវការ — មួយក្នុងមួយជួរ។',
    'resp': 'ភារកិច្ច',
    'req': 'តម្រូវការ',
    'onePerLine': 'មួយក្នុងមួយជួរ',
  },
}

const BLANK = {
  id: '', t: '', t_km: '', dept: '', dept_km: '', loc: '', loc_km: '',
  r: '', r_km: '', q: '', q_km: '',
}

function toForm(j) {
  if (!j) return BLANK
  return {
    ...BLANK,
    ...j,
    r: (j.r || []).join('\n'),
    r_km: (j.r_km || []).join('\n'),
    q: (j.q || []).join('\n'),
    q_km: (j.q_km || []).join('\n'),
  }
}

function toPayload(f) {
  return {
    ...f,
    r: f.r.split('\n').map((s) => s.trim()).filter(Boolean),
    r_km: f.r_km.split('\n').map((s) => s.trim()).filter(Boolean),
    q: f.q.split('\n').map((s) => s.trim()).filter(Boolean),
    q_km: f.q_km.split('\n').map((s) => s.trim()).filter(Boolean),
  }
}

export default function AdminCareers() {
  const { t, fmt, pick, lang } = usePageLang(T)
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(false)

  function load() {
    listJobs().then((r) => setItems(r.items)).catch((e) => setError(String(e)))
  }
  useEffect(load, [])

  function startNew() {
    setForm(BLANK)
    setEditing('new')
    setError('')
  }
  function startEdit(j) {
    setForm(toForm(j))
    setEditing(j)
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
      if (editing === 'new') await createJob(payload)
      else await updateJob(editing.id, payload)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    } finally {
      setBusy(false)
    }
  }

  async function remove(j) {
    if (!confirm(fmt('deleteConfirm', { name: j.t }))) return
    try {
      await deleteJob(j.id)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  if (editing) {
    return (
      <div className="w-full">
        <PageHeader
          title={editing === 'new' ? t('newTitle') : `${t('editTitle')} — ${pick(editing.t, editing.t_km)}`}
          onBack={cancel}
          backLabel={t('backLabel')}
        />
        {error && <Alert kind="error">{error}</Alert>}
        <form onSubmit={save} className="space-y-5">
          <Section step={1} title={t('basics')} desc={t('basics.d')}>
            <Field label={t('title')} lang="EN" required>
              <TextInput value={form.t} onChange={set('t')} required />
            </Field>
            <Field label={t('title')} lang="KM">
              <TextInput value={form.t_km} onChange={set('t_km')} />
            </Field>
            <Field label={t('dept')} lang="EN">
              <TextInput value={form.dept} onChange={set('dept')} />
            </Field>
            <Field label={t('dept')} lang="KM">
              <TextInput value={form.dept_km} onChange={set('dept_km')} />
            </Field>
            <Field label={t('loc')} lang="EN">
              <TextInput value={form.loc} onChange={set('loc')} />
            </Field>
            <Field label={t('loc')} lang="KM">
              <TextInput value={form.loc_km} onChange={set('loc_km')} />
            </Field>
          </Section>

          <Section step={2} title={t('content')} desc={t('content.d')}>
            <Field label={t('resp')} lang="EN" hint={t('onePerLine')}>
              <TextArea rows={5} value={form.r} onChange={set('r')} />
            </Field>
            <Field label={t('resp')} lang="KM" hint={t('onePerLine')}>
              <TextArea rows={5} value={form.r_km} onChange={set('r_km')} />
            </Field>
            <Field label={t('req')} lang="EN" hint={t('onePerLine')}>
              <TextArea rows={5} value={form.q} onChange={set('q')} />
            </Field>
            <Field label={t('req')} lang="KM" hint={t('onePerLine')}>
              <TextArea rows={5} value={form.q_km} onChange={set('q_km')} />
            </Field>
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
            title={editing === 'new' ? t('newTitle') : pick(editing.t, editing.t_km)}
            subtitle={t('preview')}
            onClose={() => setPreview(false)}
          >
            <JobPreview j={toPayload(form)} pick={pick} lang={lang} index="01" />
          </PreviewModal>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t('nav.careers')}
        eyebrow={t('eyebrow')}
        action={<button type="button" className={BTN} onClick={startNew}>{t('new')}</button>}
      />
      {error && <Alert kind="error">{error}</Alert>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{t('th.title')}</th>
              <th className={TH}>{t('th.department')}</th>
              <th className={TH}>{t('th.location')}</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((j) => (
              <tr key={j.id} className="transition-colors hover:bg-paper-2">
                <td className={TD}>{pick(j.t, j.t_km)}</td>
                <td className={TD}>{pick(j.dept, j.dept_km)}</td>
                <td className={TD}>{pick(j.loc, j.loc_km)}</td>
                <td className={`${TD} whitespace-nowrap`}>
                  <RowActions onEdit={() => startEdit(j)} onDelete={() => remove(j)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
