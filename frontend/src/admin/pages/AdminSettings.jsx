import { useEffect, useState } from 'react'
import { getAdminMeta, updateAdminMeta } from '../adminApi'
import { usePageLang } from '../lang'
import { Field, TextInput, TextArea, Section, Alert, PageHeader, BTN, SwatchInput, ImagePicker } from '../ui'

const T = {
  en: {
    'save': 'Save company info',
    'saved': 'Company info saved.',
    'company': 'Company & contact',
    'company.d': 'The details shown in the site footer and contact page.',
    'companyName': 'Company name',
    'tagline': 'Tagline',
    'iso': 'ISO line',
    'founded': 'Founded',
    'phone': 'Phone (display)',
    'phoneTel': 'Phone (tel: link)',
    'phoneTel.hint': 'e.g. +85523939399',
    'email': 'Sales email',
    'hrEmail': 'HR email',
    'hours': 'Office hours',
    'offices': 'Offices & staff',
    'offices.d': 'Two addresses plus staff counts shown on the About page.',
    'ho1': 'Head office — line 1',
    'ho2': 'Head office — line 2',
    'fac1': 'Factory — line 1',
    'fac2': 'Factory — line 2',
    'staffHo': 'Staff — head office',
    'staffFac': 'Staff — factory',
    'staffTotal': 'Staff — total',
    'sizes': 'uPVC size rail',
    'onePerLine': 'One per line',
    'cert': 'Certificate',
    'cert.d': 'The ISO / TÜV certificate details.',
    'certStandard': 'Standard',
    'certNumber': 'Number',
    'certRegistrar': 'Registrar',
    'certFirst': 'First certified',
    'certIssued': 'Issued',
    'certExpires': 'Expires',
    'certScope': 'Scope',
    'fullWidth': 'Full width',
    'team': 'Team',
    'team.d': 'Management portraits shown on the About page — leave a name blank to fall back to the default.',
    'member': 'Member',
    'memberName': 'Name',
    'memberRole': 'Role',
    'memberColor': 'Accent color',
    'memberPhoto': 'Portrait',
    'memberPhoto.hint': 'Recommended 4:5 crop (e.g. 800 × 1000 px)',
    'addMember': '+ Add member',
    'remove': 'Remove',
    'saveLabel': 'Save company info',
  },
  km: {
    'save': 'រក្សាទុកព័ត៌មានក្រុមហ៊ុន',
    'saved': 'រក្សាទុកព័ត៌មានក្រុមហ៊ុនរួចរាល់។',
    'company': 'ក្រុមហ៊ុន និងទំនាក់ទំនង',
    'company.d': 'ព័ត៌មានលម្អិតបង្ហាញនៅបាតទំព័រ និងទំព័រទំនាក់ទំនង។',
    'companyName': 'ឈ្មោះក្រុមហ៊ុន',
    'tagline': 'បាវចនា',
    'iso': 'បន្ទាត់ ISO',
    'founded': 'ឆ្នាំបង្កើត',
    'phone': 'ទូរស័ព្ទ (បង្ហាញ)',
    'phoneTel': 'ទូរស័ព្ទ (link tel:)',
    'phoneTel.hint': 'ឧ. +85523939399',
    'email': 'អ៊ីមែលលក់',
    'hrEmail': 'អ៊ីមែល HR',
    'hours': 'ម៉ោងធ្វើការ',
    'offices': 'ការិយាល័យ និងបុគ្គលិក',
    'offices.d': 'អាសយដ្ឋានពីរ និងចំនួនបុគ្គលិកដែលបង្ហាញលើទំព័រអំពីយើង។',
    'ho1': 'ទីស្នាក់ការកណ្តាល — ជួរទី 1',
    'ho2': 'ទីស្នាក់ការកណ្តាល — ជួរទី 2',
    'fac1': 'រោងចក្រ — ជួរទី 1',
    'fac2': 'រោងចក្រ — ជួរទី 2',
    'staffHo': 'បុគ្គលិក — ទីស្នាក់ការកណ្តាល',
    'staffFac': 'បុគ្គលិក — រោងចក្រ',
    'staffTotal': 'បុគ្គលិក — សរុប',
    'sizes': 'ទំហំ uPVC rail',
    'onePerLine': 'មួយក្នុងមួយជួរ',
    'cert': 'វិញ្ញាបនបត្រ',
    'cert.d': 'ព័ត៌មានលម្អិតវិញ្ញាបនបត្រ ISO / TÜV។',
    'certStandard': 'ស្តង់ដារ',
    'certNumber': 'លេខ',
    'certRegistrar': 'Registrar',
    'certFirst': 'ឆ្នាំទទួលស្គាល់ដំបូង',
    'certIssued': 'ចេញផ្សាយ',
    'certExpires': 'ផុតកំណត់',
    'certScope': 'វិសាលភាព',
    'fullWidth': 'ពេញទទឹង',
    'team': 'ក្រុមការងារ',
    'team.d': 'រូបភាពអ្នកគ្រប់គ្រងបង្ហាញលើទំព័រអំពីយើង — ទុកឈ្មោះទទេ ដើម្បីប្រើតម្លៃលំនាំដើម។',
    'member': 'សមាជិក',
    'memberName': 'ឈ្មោះ',
    'memberRole': 'តួនាទី',
    'memberColor': 'ពណ៌សង្កត់',
    'memberPhoto': 'រូបថត',
    'memberPhoto.hint': 'សមាមាត្រ 4:5 (ឧ. 800 × 1000 px)',
    'addMember': '+ បន្ថែមសមាជិក',
    'remove': 'ដកចេញ',
    'saveLabel': 'រក្សាទុកព័ត៌មានក្រុមហ៊ុន',
  },
}

const BLANK = {
  company: '', tagline: '', iso: '', phone: '', phone_tel: '', email: '', hr_email: '', office_hours: '',
  ho_line1: '', ho_line2: '', factory_line1: '', factory_line2: '',
  staff_head_office: '', staff_factory: '', staff_total: '', founded: '',
  sizes_rail: '',
  cert_standard: '', cert_number: '', cert_registrar: '', cert_scope: '', cert_issued: '', cert_expires: '', cert_first: '',
  team: [],
}

const TEAM_COLORS = ['#0B57A4', '#12A150', '#E0A106', '#2278CA']

function normMember(m = {}, i = 0) {
  return {
    name: m.name || '',
    name_km: m.name_km || '',
    role: m.role || '',
    role_km: m.role_km || '',
    color: m.color || TEAM_COLORS[i % TEAM_COLORS.length],
    img: m.img || '',
  }
}

function toForm(meta) {
  if (!meta) return BLANK
  const saved = Array.isArray(meta.team) && meta.team.length ? meta.team.map(normMember) : []
  const team = saved.length
    ? saved
    : TEAM_COLORS.map((c, i) => ({ name: '', name_km: '', role: '', role_km: '', color: c, img: '' }))
  return {
    ...BLANK,
    company: meta.company || '', tagline: meta.tagline || '', iso: meta.iso || '',
    phone: meta.phone || '', phone_tel: meta.phone_tel || '', email: meta.email || '',
    hr_email: meta.hr_email || '', office_hours: meta.office_hours || '',
    ho_line1: meta.head_office?.line1 || '', ho_line2: meta.head_office?.line2 || '',
    factory_line1: meta.factory?.line1 || '', factory_line2: meta.factory?.line2 || '',
    staff_head_office: meta.staff_head_office ?? '', staff_factory: meta.staff_factory ?? '',
    staff_total: meta.staff_total ?? '', founded: meta.founded || '',
    sizes_rail: (meta.sizes_rail || []).join('\n'),
    cert_standard: meta.certificate?.standard || '', cert_number: meta.certificate?.number || '',
    cert_registrar: meta.certificate?.registrar || '', cert_scope: meta.certificate?.scope || '',
    cert_issued: meta.certificate?.issued || '', cert_expires: meta.certificate?.expires || '',
    cert_first: meta.certificate?.first_certified || '',
    team,
  }
}

function toPayload(f) {
  return {
    company: f.company, tagline: f.tagline, iso: f.iso,
    phone: f.phone, phone_tel: f.phone_tel, email: f.email, hr_email: f.hr_email, office_hours: f.office_hours,
    head_office: { label: 'Head office', line1: f.ho_line1, line2: f.ho_line2 },
    factory: { label: 'Factory', line1: f.factory_line1, line2: f.factory_line2 },
    staff_head_office: Number(f.staff_head_office) || 0,
    staff_factory: Number(f.staff_factory) || 0,
    staff_total: Number(f.staff_total) || 0,
    founded: f.founded,
    sizes_rail: f.sizes_rail.split('\n').map((s) => s.trim()).filter(Boolean),
    certificate: {
      standard: f.cert_standard, number: f.cert_number, registrar: f.cert_registrar,
      scope: f.cert_scope, issued: f.cert_issued, expires: f.cert_expires, first_certified: f.cert_first,
    },
    team: f.team.filter((m) => m.name || m.img).map((m) => ({ ...m })),
  }
}

export default function AdminSettings() {
  const { t } = usePageLang(T)
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getAdminMeta().then((m) => setForm(toForm(m))).catch((e) => setError(String(e)))
  }, [])

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setSaved(false)
    try {
      await updateAdminMeta(toPayload(form))
      setSaved(true)
    } catch (err) {
      setError(String(err))
    } finally {
      setBusy(false)
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const setMember = (i, key, value) => {
    setForm({ ...form, team: form.team.map((m, j) => (j === i ? { ...m, [key]: value } : m)) })
  }
  const addMember = () => {
    setForm({ ...form, team: [...form.team, normMember({}, form.team.length)] })
  }
  const removeMember = (i) => {
    setForm({ ...form, team: form.team.filter((_, j) => j !== i) })
  }
  const imgLabels = { upload: t('img.upload'), replace: t('img.replace'), remove: t('img.remove'), uploading: t('img.uploading') }

  return (
    <div className="w-full">
      <PageHeader title={t('nav.settings')} eyebrow={t('eyebrow')} />
      {error && <Alert kind="error">{error}</Alert>}
      {saved && <Alert kind="success">{t('saved')}</Alert>}
      <form onSubmit={save} className="space-y-5">
        <Section step={1} title={t('company')} desc={t('company.d')}>
          <Field label={t('companyName')}><TextInput value={form.company} onChange={set('company')} /></Field>
          <Field label={t('tagline')}><TextInput value={form.tagline} onChange={set('tagline')} /></Field>
          <Field label={t('iso')}><TextInput value={form.iso} onChange={set('iso')} /></Field>
          <Field label={t('founded')}><TextInput value={form.founded} onChange={set('founded')} /></Field>
          <Field label={t('phone')}><TextInput value={form.phone} onChange={set('phone')} /></Field>
          <Field label={t('phoneTel')} hint={t('phoneTel.hint')}><TextInput value={form.phone_tel} onChange={set('phone_tel')} /></Field>
          <Field label={t('email')}><TextInput value={form.email} onChange={set('email')} /></Field>
          <Field label={t('hrEmail')}><TextInput value={form.hr_email} onChange={set('hr_email')} /></Field>
          <Field label={t('hours')}><TextInput value={form.office_hours} onChange={set('office_hours')} /></Field>
        </Section>

        <Section step={2} title={t('offices')} desc={t('offices.d')}>
          <Field label={t('ho1')}><TextInput value={form.ho_line1} onChange={set('ho_line1')} /></Field>
          <Field label={t('ho2')}><TextInput value={form.ho_line2} onChange={set('ho_line2')} /></Field>
          <Field label={t('fac1')}><TextInput value={form.factory_line1} onChange={set('factory_line1')} /></Field>
          <Field label={t('fac2')}><TextInput value={form.factory_line2} onChange={set('factory_line2')} /></Field>
          <Field label={t('staffHo')}><TextInput type="number" value={form.staff_head_office} onChange={set('staff_head_office')} /></Field>
          <Field label={t('staffFac')}><TextInput type="number" value={form.staff_factory} onChange={set('staff_factory')} /></Field>
          <Field label={t('staffTotal')}><TextInput type="number" value={form.staff_total} onChange={set('staff_total')} /></Field>
          <Field label={t('sizes')} hint={t('onePerLine')}>
            <TextArea rows={4} value={form.sizes_rail} onChange={set('sizes_rail')} />
          </Field>
        </Section>

        <Section step={3} title={t('cert')} desc={t('cert.d')}>
          <Field label={t('certStandard')}><TextInput value={form.cert_standard} onChange={set('cert_standard')} /></Field>
          <Field label={t('certNumber')}><TextInput value={form.cert_number} onChange={set('cert_number')} /></Field>
          <Field label={t('certRegistrar')}><TextInput value={form.cert_registrar} onChange={set('cert_registrar')} /></Field>
          <Field label={t('certFirst')}><TextInput value={form.cert_first} onChange={set('cert_first')} /></Field>
          <Field label={t('certIssued')}><TextInput value={form.cert_issued} onChange={set('cert_issued')} /></Field>
          <Field label={t('certExpires')}><TextInput value={form.cert_expires} onChange={set('cert_expires')} /></Field>
          <Field label={t('certScope')} hint={t('fullWidth')} className="md:col-span-2">
            <TextArea rows={3} value={form.cert_scope} onChange={set('cert_scope')} />
          </Field>
        </Section>

        <Section step={4} title={t('team')} desc={t('team.d')}>
          <div className="space-y-4 md:col-span-2">
            {form.team.map((m, i) => (
              <div key={i} className="rounded-[12px] border border-line bg-paper-2/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[.7rem] uppercase tracking-[.12em] text-grey">
                    {t('member')} {String(i + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMember(i)}
                    className="cursor-pointer border-0 bg-transparent px-1 text-[.8rem] font-semibold text-[#C0392B] hover:underline"
                  >
                    {t('remove')}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
                  <Field label={t('memberName')} lang="EN">
                    <TextInput value={m.name} onChange={(e) => setMember(i, 'name', e.target.value)} />
                  </Field>
                  <Field label={t('memberName')} lang="KM">
                    <TextInput value={m.name_km} onChange={(e) => setMember(i, 'name_km', e.target.value)} />
                  </Field>
                  <Field label={t('memberRole')} lang="EN">
                    <TextInput value={m.role} onChange={(e) => setMember(i, 'role', e.target.value)} />
                  </Field>
                  <Field label={t('memberRole')} lang="KM">
                    <TextInput value={m.role_km} onChange={(e) => setMember(i, 'role_km', e.target.value)} />
                  </Field>
                  <Field label={t('memberColor')}>
                    <SwatchInput value={m.color} onChange={(e) => setMember(i, 'color', e.target.value)} />
                  </Field>
                  <Field label={t('memberPhoto')} hint={t('memberPhoto.hint')}>
                    <ImagePicker value={m.img} onChange={(url) => setMember(i, 'img', url)} labels={imgLabels} />
                  </Field>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMember}
              className="w-full cursor-pointer rounded-[10px] border border-dashed border-line-strong bg-paper-2/40 px-4 py-3.5 text-[.86rem] font-semibold text-grey transition-colors duration-200 hover:border-blue hover:text-blue"
            >
              {t('addMember')}
            </button>
          </div>
        </Section>

        <div className="sticky bottom-0 z-10 mt-6 rounded-[14px] border border-line bg-card p-4 shadow-[0_-8px_30px_-18px_rgba(7,33,63,.35)]">
          <div className="flex items-center justify-end gap-3">
            <button type="submit" disabled={busy} className={BTN}>{busy ? t('saving') : t('save')}</button>
          </div>
        </div>
      </form>
    </div>
  )
}
