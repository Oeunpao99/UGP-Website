import { useEffect, useState } from 'react'
import { listEvents, createEvent, updateEvent, deleteEvent } from '../adminApi'
import { usePageLang } from '../lang'
import { PreviewModal, EventPreview } from '../preview'
import { Field, TextInput, TextArea, Select, Section, Alert, ActionBar, PageHeader, BTN, BTN_GHOST, SwatchInput, ImagePicker, Card, RowActions, TABLE, TH, TD } from '../ui'

const T = {
  en: {
    'new': 'New event',
    'newTitle': 'New event',
    'editTitle': 'Edit event',
    'backLabel': 'Events',
    'save': 'Save event',
    'delete': 'Delete event',
    'basics': 'Basics',
    'basics.d': 'When it happened and how it is categorised.',
    'year': 'Year',
    'year.hint': 'e.g. 2026',
    'month': 'Month',
    'month.hint': '3-letter, e.g. JUN',
    'kind': 'Kind',
    'color': 'Color token',
    'color.hint': 'A var(--…) token or hex value',
    'image': 'Cover image',
    'image.hint': 'Optional — shown on the event card',
    'headline': 'Title & summary',
    'headline.d': 'The headline shown on the timeline and card.',
    'title': 'Title',
    'summary': 'Summary',
    'facts': 'Facts',
    'facts.d': 'Location, duration and team — shown as labelled facts.',
    'location': 'Location',
    'duration': 'Duration',
    'team': 'Team',
    'content': 'Content',
    'content.d': 'Longer copy — highlights and the detail page.',
    'highlights': 'Highlights',
    'onePerLine': 'One per line',
    'detail': 'Extra detail',
    'detail.hint': 'Optional — shown on the event detail page',
    'outcome': 'Outcome',
    'outcome.hint': 'Optional — shown in a highlighted box',
  },
  km: {
    'new': 'ព្រឹត្តិការណ៍ថ្មី',
    'newTitle': 'ព្រឹត្តិការណ៍ថ្មី',
    'editTitle': 'កែសម្រួលព្រឹត្តិការណ៍',
    'backLabel': 'ព្រឹត្តិការណ៍',
    'save': 'រក្សាទុកព្រឹត្តិការណ៍',
    'delete': 'លុបព្រឹត្តិការណ៍',
    'basics': 'មូលដ្ឋាន',
    'basics.d': 'ពេលណាបានកើតឡើង និងប្រភេទអ្វី។',
    'year': 'ឆ្នាំ',
    'year.hint': 'ឧ. 2026',
    'month': 'ខែ',
    'month.hint': 'អក្សរ ៣ ឧ. JUN',
    'kind': 'ប្រភេទ',
    'color': 'តម្លៃពណ៌',
    'color.hint': 'token var(--…) ឬតម្លៃ hex',
    'image': 'រូបភាពគម្រប',
    'image.hint': 'ស្រេចចិត្ត — បង្ហាញលើកាតព្រឹត្តិការណ៍',
    'headline': 'ចំណងជើង និងសេចក្តីសង្ខេប',
    'headline.d': 'ចំណងជើងបង្ហាញលើបន្ទាត់ពេលវេលា និងកាត។',
    'title': 'ចំណងជើង',
    'summary': 'សេចក្តីសង្ខេប',
    'facts': 'ព័ត៌មាន',
    'facts.d': 'ទីតាំង រយៈពេល និងក្រុម — បង្ហាញជាព័ត៌មានដែលមានស្លាក។',
    'location': 'ទីតាំង',
    'duration': 'រយៈពេល',
    'team': 'ក្រុម',
    'content': 'ខ្លឹមសារ',
    'content.d': 'អត្ថបទវែង — ចំណុចសំខាន់ៗ និងទំព័រលម្អិត។',
    'highlights': 'ចំណុចសំខាន់ៗ',
    'onePerLine': 'មួយក្នុងមួយជួរ',
    'detail': 'ព័ត៌មានបន្ថែម',
    'detail.hint': 'ស្រេចចិត្ត — បង្ហាញលើទំព័រលម្អិត',
    'outcome': 'លទ្ធផល',
    'outcome.hint': 'ស្រេចចិត្ត — បង្ហាញក្នុងប្រអប់រំលេច',
  },
}

const KINDS = ['Quality', 'Customers', 'Supply chain', 'Community']

const BLANK = {
  id: '', y: '', m: '', kind: 'Quality', c: 'var(--blue)', img: '',
  t: '', t_km: '', d: '', d_km: '', loc: '', loc_km: '', dur: '', dur_km: '',
  team: '', team_km: '', highlights: '', highlights_km: '',
  detail: '', detail_km: '', outcome: '', outcome_km: '',
}

function toForm(e) {
  if (!e) return BLANK
  return {
    ...BLANK,
    ...e,
    highlights: (e.highlights || []).join('\n'),
    highlights_km: (e.highlights_km || []).join('\n'),
  }
}

function toPayload(f) {
  return {
    ...f,
    highlights: f.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
    highlights_km: f.highlights_km.split('\n').map((s) => s.trim()).filter(Boolean),
  }
}

export default function AdminEvents() {
  const { t, fmt, pick, lang } = usePageLang(T)
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(false)

  function load() {
    listEvents().then((r) => setItems(r.items)).catch((e) => setError(String(e)))
  }
  useEffect(load, [])

  function startNew() {
    setForm(BLANK)
    setEditing('new')
    setError('')
  }
  function startEdit(e) {
    setForm(toForm(e))
    setEditing(e)
    setError('')
  }
  function cancel() {
    setEditing(null)
    setError('')
  }

  async function save(ev) {
    ev.preventDefault()
    setBusy(true)
    setError('')
    try {
      const payload = toPayload(form)
      if (editing === 'new') await createEvent(payload)
      else await updateEvent(editing.id, payload)
      setEditing(null)
      load()
    } catch (err) {
      setError(String(err))
    } finally {
      setBusy(false)
    }
  }

  async function remove(e) {
    if (!confirm(fmt('deleteConfirm', { name: e.t }))) return
    try {
      await deleteEvent(e.id)
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
            <Field label={t('year')} hint={t('year.hint')} required>
              <TextInput value={form.y} onChange={set('y')} required />
            </Field>
            <Field label={t('month')} hint={t('month.hint')} required>
              <TextInput value={form.m} onChange={set('m')} required />
            </Field>
            <Field label={t('kind')}>
              <Select value={form.kind} onChange={set('kind')}>
                {KINDS.map((k) => <option key={k} value={k}>{t(`kind.${k}`)}</option>)}
              </Select>
            </Field>
            <Field label={t('color')} hint={t('color.hint')}>
              <SwatchInput value={form.c} onChange={set('c')} />
            </Field>
            <Field label={t('image')} hint={t('image.hint')} className="md:col-span-2">
              <ImagePicker
                value={form.img}
                onChange={(url) => setForm({ ...form, img: url })}
                labels={{ upload: t('img.upload'), replace: t('img.replace'), remove: t('img.remove'), uploading: t('img.uploading') }}
              />
            </Field>
          </Section>

          <Section step={2} title={t('headline')} desc={t('headline.d')}>
            <Field label={t('title')} lang="EN" required>
              <TextInput value={form.t} onChange={set('t')} required />
            </Field>
            <Field label={t('title')} lang="KM">
              <TextInput value={form.t_km} onChange={set('t_km')} />
            </Field>
            <Field label={t('summary')} lang="EN">
              <TextArea rows={3} value={form.d} onChange={set('d')} />
            </Field>
            <Field label={t('summary')} lang="KM">
              <TextArea rows={3} value={form.d_km} onChange={set('d_km')} />
            </Field>
          </Section>

          <Section step={3} title={t('facts')} desc={t('facts.d')}>
            <Field label={t('location')} lang="EN">
              <TextInput value={form.loc} onChange={set('loc')} />
            </Field>
            <Field label={t('location')} lang="KM">
              <TextInput value={form.loc_km} onChange={set('loc_km')} />
            </Field>
            <Field label={t('duration')} lang="EN">
              <TextInput value={form.dur} onChange={set('dur')} />
            </Field>
            <Field label={t('duration')} lang="KM">
              <TextInput value={form.dur_km} onChange={set('dur_km')} />
            </Field>
            <Field label={t('team')} lang="EN">
              <TextInput value={form.team} onChange={set('team')} />
            </Field>
            <Field label={t('team')} lang="KM">
              <TextInput value={form.team_km} onChange={set('team_km')} />
            </Field>
          </Section>

          <Section step={4} title={t('content')} desc={t('content.d')}>
            <Field label={t('highlights')} lang="EN" hint={t('onePerLine')}>
              <TextArea rows={4} value={form.highlights} onChange={set('highlights')} />
            </Field>
            <Field label={t('highlights')} lang="KM" hint={t('onePerLine')}>
              <TextArea rows={4} value={form.highlights_km} onChange={set('highlights_km')} />
            </Field>
            <Field label={t('detail')} lang="EN" hint={t('detail.hint')}>
              <TextArea rows={3} value={form.detail} onChange={set('detail')} />
            </Field>
            <Field label={t('detail')} lang="KM">
              <TextArea rows={3} value={form.detail_km} onChange={set('detail_km')} />
            </Field>
            <Field label={t('outcome')} lang="EN" hint={t('outcome.hint')}>
              <TextArea rows={3} value={form.outcome} onChange={set('outcome')} />
            </Field>
            <Field label={t('outcome')} lang="KM">
              <TextArea rows={3} value={form.outcome_km} onChange={set('outcome_km')} />
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
            <EventPreview e={toPayload(form)} pick={pick} lang={lang} />
          </PreviewModal>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={t('nav.events')}
        eyebrow={t('eyebrow')}
        action={<button type="button" className={BTN} onClick={startNew}>{t('new')}</button>}
      />
      {error && <Alert kind="error">{error}</Alert>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{t('th.date')}</th>
              <th className={TH}>{t('th.title')}</th>
              <th className={TH}>{t('th.kind')}</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id} className="transition-colors hover:bg-paper-2">
                <td className={TD}>{e.m} {e.y}</td>
                <td className={TD}>{pick(e.t, e.t_km)}</td>
                <td className={TD}>{t(`kind.${e.kind}`)}</td>
                <td className={`${TD} whitespace-nowrap`}>
                  <RowActions onEdit={() => startEdit(e)} onDelete={() => remove(e)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
