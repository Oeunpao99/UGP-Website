export default function PlaceholderImage({ label, color = '#1a2744', className = '' }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      <span className="px-4 text-center font-mono text-[0.7rem] uppercase tracking-widest text-white/60 leading-tight">
        {label}
      </span>
    </div>
  )
}
