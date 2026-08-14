import { useEffect, useState } from 'react'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../adminApi'
import { Field, TextInput, TextArea, Card, PageHeader, BTN, BTN_GHOST, TABLE, TH, TD } from '../ui'

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
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null) // null | 'new' | product object
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

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
    if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return
    try {
      await deleteProduct(p.id)
      load()
    } catch (err) {
      setError(String(err))
    }
  }

  if (editing) {
    return (
      <div className="max-w-[760px]">
        <PageHeader title={editing === 'new' ? 'New product' : `Edit — ${editing.name}`} />
        {error && <p className="mb-4 rounded-[8px] bg-[#FDECEC] px-3 py-2 text-[.85rem] text-[#C0392B]">{error}</p>}
        <form onSubmit={save} className="space-y-5">
          <Card className="grid grid-cols-2 gap-4">
            <Field label="ID (used in URLs, e.g. upvc)">
              <TextInput
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={editing !== 'new'}
                required
              />
            </Field>
            <Field label="Brands (comma-separated: Eagle, Lion Head, Smart)">
              <TextInput value={form.brands} onChange={(e) => setForm({ ...form, brands: e.target.value })} required />
            </Field>
            <Field label="Name (English)">
              <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </Field>
            <Field label="Name (Khmer)">
              <TextInput value={form.name_km} onChange={(e) => setForm({ ...form, name_km: e.target.value })} />
            </Field>
            <Field label="Meta line (English)" hint='e.g. Class 13.5 & 8.5 · 1/2"–12" · 4 m lengths'>
              <TextInput value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} />
            </Field>
            <Field label="Meta line (Khmer)">
              <TextInput value={form.meta_km} onChange={(e) => setForm({ ...form, meta_km: e.target.value })} />
            </Field>
          </Card>

          <Card className="grid grid-cols-2 gap-4">
            <Field label="Description (English)">
              <TextArea rows={4} value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} />
            </Field>
            <Field label="Description (Khmer)">
              <TextArea rows={4} value={form.blurb_km} onChange={(e) => setForm({ ...form, blurb_km: e.target.value })} />
            </Field>
            <Field label="Tags (English, one per line)">
              <TextArea rows={4} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </Field>
            <Field label="Tags (Khmer, one per line)">
              <TextArea rows={4} value={form.tags_km} onChange={(e) => setForm({ ...form, tags_km: e.target.value })} />
            </Field>
          </Card>

          <Card className="grid grid-cols-2 gap-4">
            <Field label="Spec table title (English)">
              <TextInput value={form.specTitle} onChange={(e) => setForm({ ...form, specTitle: e.target.value })} />
            </Field>
            <Field label="Spec table title (Khmer)">
              <TextInput value={form.specTitle_km} onChange={(e) => setForm({ ...form, specTitle_km: e.target.value })} />
            </Field>
            <Field label="Caption (English)">
              <TextInput value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            </Field>
            <Field label="Caption (Khmer)">
              <TextInput value={form.caption_km} onChange={(e) => setForm({ ...form, caption_km: e.target.value })} />
            </Field>
            <Field label="Columns (one header per line)">
              <TextArea rows={4} value={form.cols} onChange={(e) => setForm({ ...form, cols: e.target.value })} />
            </Field>
            <Field label="Rows (one row per line, cells separated by |)" hint='e.g. 21 | 22 | 1/2" | 22.4 ± 0.2'>
              <TextArea rows={4} value={form.rows} onChange={(e) => setForm({ ...form, rows: e.target.value })} />
            </Field>
          </Card>

          <Card className="grid grid-cols-2 gap-4">
            <Field label="Color token" hint="e.g. var(--c-upvc) or a hex value">
              <TextInput value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
            </Field>
            <Field label="Legend text (printed on the pipe graphic)">
              <TextInput value={form.legend} onChange={(e) => setForm({ ...form, legend: e.target.value })} />
            </Field>
          </Card>

          <div className="flex gap-3">
            <button type="submit" disabled={busy} className={BTN}>{busy ? 'Saving…' : 'Save'}</button>
            <button type="button" className={BTN_GHOST} onClick={cancel}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Products"
        action={<button type="button" className={BTN} onClick={startNew}>New product</button>}
      />
      {error && <p className="mb-4 rounded-[8px] bg-[#FDECEC] px-3 py-2 text-[.85rem] text-[#C0392B]">{error}</p>}
      <Card>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Name</th>
              <th className={TH}>ID</th>
              <th className={TH}>Brands</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td className={TD}>{p.name}</td>
                <td className={TD}>{p.id}</td>
                <td className={TD}>{(p.brands || []).join(', ')}</td>
                <td className={`${TD} whitespace-nowrap text-right`}>
                  <button type="button" className="mr-3 cursor-pointer border-0 bg-transparent text-blue" onClick={() => startEdit(p)}>Edit</button>
                  <button type="button" className="cursor-pointer border-0 bg-transparent text-[#C0392B]" onClick={() => remove(p)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
