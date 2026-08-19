import { useRef, useState } from 'react'
import { uploadImage } from './adminApi'

export const inputCls =
  'w-full rounded-[10px] border border-line bg-paper-2 px-3.5 py-2.5 text-[.92rem] text-fg placeholder:text-grey/60 transition-colors focus:border-blue focus:bg-card focus:outline-none focus:ring-2 focus:ring-blue/15'
export const areaCls = inputCls + ' font-mono text-[.84rem] leading-relaxed'
export const BTN = 'btn sm'
export const BTN_GHOST = 'btn ghost sm'
export const LABEL = 'block text-[.82rem] font-semibold text-grey'

export const PILL =
  'cursor-pointer rounded-full border px-3 py-[5px] text-[.78rem] font-semibold transition-colors duration-200'

export function RowActions({ onEdit, onDelete, editLabel = 'Edit', deleteLabel = 'Delete' }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button type="button" onClick={onEdit} className={`${PILL} border-line bg-paper text-blue hover:border-blue`}>
        {editLabel}
      </button>
      <button
        type="button"
        onClick={onDelete}
        className={`${PILL} border-line bg-paper text-[#C0392B] hover:border-[#C0392B]`}
      >
        {deleteLabel}
      </button>
    </div>
  )
}

const ALERT_ICONS = {
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true">
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 4v5a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0Zm-1 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true">
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.8 6.4-4.3 4.3a1 1 0 0 1-1.4 0L5.6 10a1 1 0 1 1 1.4-1.4l1.7 1.7 3.6-3.6a1 1 0 0 1 1.5 1.4Z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true">
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 3a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1Z" />
    </svg>
  ),
}

const ALERT_STYLES = {
  error: 'border-[#F3C6C6] bg-[#FDEEEE] text-[#B23B3B]',
  success: 'border-[#BFE8CE] bg-[#E9F7EF] text-[#1E8449]',
  info: 'border-[#C7D9F0] bg-[#EDF3FB] text-[#1b449c]',
}

export function Alert({ kind = 'error', children }) {
  return (
    <div className={`mb-5 flex items-start gap-2.5 rounded-[10px] border px-4 py-3 text-[.86rem] leading-snug ${ALERT_STYLES[kind]}`}>
      {ALERT_ICONS[kind]}
      <span>{children}</span>
    </div>
  )
}

export function Section({ step, title, desc, children, className = 'grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2' }) {
  return (
    <section className="overflow-hidden rounded-[16px] border border-line bg-card">
      <header className="flex items-center gap-3 border-b border-line bg-paper-2/50 px-5 py-4">
        {step != null && (
          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-blue font-display text-[.82rem] font-bold text-white">
            {step}
          </span>
        )}
        <div>
          <h2 className="font-display text-[.98rem] font-bold leading-tight">{title}</h2>
          {desc && <p className="mt-0.5 text-[.78rem] leading-snug text-grey">{desc}</p>}
        </div>
      </header>
      <div className={`p-5 ${className}`}>{children}</div>
    </section>
  )
}

export function Field({ label, hint, required, lang, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <span className="text-[.8rem] font-semibold text-fg/90">{label}</span>
        {required && <span className="text-[.8rem] font-semibold text-[#C0392B]" aria-hidden="true">*</span>}
        {lang && (
          <span className="rounded-[4px] border border-line bg-paper px-1.5 py-px font-mono text-[.62rem] uppercase tracking-[.1em] text-grey">
            {lang}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[.74rem] leading-snug text-grey">{hint}</span>}
    </label>
  )
}

export function TextInput(props) {
  return <input {...props} className={inputCls + (props.className ? ' ' + props.className : '')} />
}

export function TextArea(props) {
  return <textarea {...props} className={areaCls + (props.className ? ' ' + props.className : '')} />
}

// A small spreadsheet-like editor for a { cols: string[], rows: string[][] }
// spec table — every cell is its own input, columns/rows can be added or
// removed with a click, and the shape (cell count per row) can't drift out
// of sync the way a hand-typed "one row per line, cells separated by |"
// textarea can.
export function SpecTableEditor({ cols, rows, onChange, labels = {} }) {
  const L = {
    colPh: labels.colPh || 'Column',
    cellPh: labels.cellPh || '',
    addCol: labels.addCol || '+ Column',
    addRow: labels.addRow || '+ Add row',
    removeCol: labels.removeCol || 'Remove column',
    removeRow: labels.removeRow || 'Remove row',
  }

  const setCol = (i, value) => {
    onChange(cols.map((c, j) => (j === i ? value : c)), rows)
  }
  const addCol = () => onChange([...cols, ''], rows.map((r) => [...r, '']))
  const removeCol = (i) => onChange(cols.filter((_, j) => j !== i), rows.map((r) => r.filter((_, j) => j !== i)))

  const setCell = (ri, ci, value) => {
    onChange(cols, rows.map((r, i) => (i === ri ? r.map((c, j) => (j === ci ? value : c)) : r)))
  }
  const addRow = () => onChange(cols, [...rows, cols.map(() => '')])
  const removeRow = (ri) => onChange(cols, rows.filter((_, i) => i !== ri))

  return (
    <div className="space-y-2.5">
      <div className="tablewrap">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-paper-2">
              {cols.map((c, i) => (
                <th key={i} className="border-b border-line p-1.5 text-left">
                  <div className="flex items-center gap-1">
                    <input
                      value={c}
                      onChange={(e) => setCol(i, e.target.value)}
                      placeholder={`${L.colPh} ${i + 1}`}
                      className="w-full min-w-[110px] rounded-[6px] border border-line bg-card px-2 py-1.5 text-[.82rem] font-semibold text-fg focus:border-blue focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeCol(i)}
                      aria-label={L.removeCol}
                      className="flex-none cursor-pointer rounded-[6px] border-0 bg-transparent px-1.5 py-1 text-grey transition-colors hover:text-[#C0392B]"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
              <th className="w-[1%] border-b border-line p-1.5">
                <button
                  type="button"
                  onClick={addCol}
                  className="cursor-pointer rounded-[6px] border border-dashed border-line-strong bg-card px-2.5 py-1.5 text-[.78rem] font-semibold whitespace-nowrap text-grey transition-colors hover:border-blue hover:text-blue"
                >
                  {L.addCol}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {cols.map((_, ci) => (
                  <td key={ci} className="border-b border-line p-1">
                    <input
                      value={r[ci] ?? ''}
                      onChange={(e) => setCell(ri, ci, e.target.value)}
                      placeholder={L.cellPh}
                      className="w-full min-w-[110px] rounded-[6px] border border-line bg-paper-2 px-2 py-1.5 text-[.84rem] text-fg focus:border-blue focus:bg-card focus:outline-none"
                    />
                  </td>
                ))}
                <td className="border-b border-line p-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(ri)}
                    aria-label={L.removeRow}
                    className="cursor-pointer rounded-[6px] border-0 bg-transparent px-1.5 py-1 text-grey transition-colors hover:text-[#C0392B]"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="w-full cursor-pointer rounded-[8px] border border-dashed border-line-strong bg-paper-2/40 px-3 py-2.5 text-[.82rem] font-semibold text-grey transition-colors duration-200 hover:border-blue hover:text-blue"
      >
        {L.addRow}
      </button>
    </div>
  )
}

export function Select({ children, className = '', ...props }) {
  return (
    <select {...props} className={inputCls + ' cursor-pointer ' + className}>
      {children}
    </select>
  )
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[.88rem] text-fg/90">
      <input type="checkbox" {...props} className="h-4 w-4 cursor-pointer accent-[#1b449c]" />
      <span>{label}</span>
    </label>
  )
}

const PRESET_COLORS = [
  'var(--blue)', 'var(--c-upvc)', 'var(--c-hdpe)', 'var(--c-ppr)', 'var(--c-conduit)',
  '#1b449c', '#12A150', '#E0A106', '#C70F2D', '#0C3466',
]

export function ImagePicker({ value, onChange, hint, labels = {} }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const L = {
    upload: labels.upload || 'Upload image',
    replace: labels.replace || 'Replace',
    remove: labels.remove || 'Remove',
    uploading: labels.uploading || 'Uploading…',
  }

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const r = await uploadImage(file)
      onChange(r.url)
    } catch (uploadErr) {
      setErr(String(uploadErr))
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="flex items-center gap-3 rounded-[10px] border border-line bg-paper p-2.5">
          <img
            src={value}
            alt=""
            className="h-[72px] w-[72px] flex-none rounded-[8px] border border-line bg-card object-contain"
          />
          <div className="min-w-0 flex-1">
            <span className="block truncate font-mono text-[.72rem] text-grey">{value}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={`${PILL} border-line bg-card text-blue hover:border-blue`}
              >
                {busy ? L.uploading : L.replace}
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className={`${PILL} border-line bg-card text-[#C0392B] hover:border-[#C0392B]`}
              >
                {L.remove}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-line-strong bg-paper-2/60 px-4 py-6 text-[.86rem] font-semibold text-grey transition-colors duration-200 hover:border-blue hover:text-blue disabled:opacity-60"
        >
          {busy ? L.uploading : L.upload}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={onFile}
      />
      {hint && <span className="block text-[.74rem] leading-snug text-grey">{hint}</span>}
      {err && <span className="block text-[.74rem] leading-snug text-[#C0392B]">{err}</span>}
    </div>
  )
}

export function SwatchInput({ value, onChange, placeholder = 'var(--c-upvc) or a hex value' }) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <span
          className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 rounded-full border border-black/15"
          style={{ background: value }}
        />
        <input value={value} onChange={onChange} placeholder={placeholder} className={inputCls + ' pl-11'} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            title={c}
            onClick={() => onChange({ target: { value: c } })}
            className="h-6 w-6 cursor-pointer rounded-full border border-black/10 transition-transform hover:scale-110"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  )
}

export function ActionBar({ left, children }) {
  return (
    <div className="sticky bottom-0 z-10 mt-6 rounded-[14px] border border-line bg-card p-4 shadow-[0_-8px_30px_-18px_rgba(27,68,156,.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>{left}</div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </div>
  )
}

export function Card({ children, className = '' }) {
  return <div className={`rounded-[14px] border border-line bg-card shadow-[0_1px_2px_rgba(27,68,156,.05)] ${className}`}>{children}</div>
}

export function PageHeader({ title, action, onBack, backLabel, eyebrow }) {
  return (
    <div className="mb-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-0 text-[.82rem] font-semibold text-blue transition-colors hover:text-ink-2"
        >
          ← {backLabel || 'Back'}
        </button>
      )}
      {eyebrow && (
        <p className="mb-1.5 font-mono text-[.7rem] font-medium uppercase tracking-[.18em] text-grey">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="admin-h1 font-display text-[1.55rem] font-bold tracking-tight">{title}</h1>
        {action}
      </div>
    </div>
  )
}

export const TABLE = 'w-full border-collapse text-[.9rem]'
export const TH = 'border-b border-line px-3 py-2 text-left font-mono text-[.72rem] uppercase tracking-[.06em] text-grey'
export const TD = 'border-b border-line px-3 py-2 align-top'
