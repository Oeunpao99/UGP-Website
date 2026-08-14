export const INPUT = 'mt-1 w-full rounded-[8px] border border-line-strong bg-card px-3 py-2 text-[.92rem] focus:border-blue focus:outline-none'
export const LABEL = 'block text-[.82rem] font-semibold text-grey'
export const BTN = 'btn'
export const BTN_GHOST = 'btn ghost'

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[.76rem] text-grey">{hint}</span>}
    </label>
  )
}

export function TextInput(props) {
  return <input {...props} className={INPUT + (props.className ? ' ' + props.className : '')} />
}

export function TextArea(props) {
  return <textarea {...props} className={INPUT + ' font-mono text-[.84rem]' + (props.className ? ' ' + props.className : '')} />
}

export function Card({ children, className = '' }) {
  return <div className={`rounded-[14px] border border-line bg-card p-6 ${className}`}>{children}</div>
}

export function PageHeader({ title, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-display text-[1.4rem] font-bold">{title}</h1>
      {action}
    </div>
  )
}

export const TABLE = 'w-full border-collapse text-[.9rem]'
export const TH = 'border-b border-line px-3 py-2 text-left font-mono text-[.72rem] uppercase tracking-[.06em] text-grey'
export const TD = 'border-b border-line px-3 py-2 align-top'
