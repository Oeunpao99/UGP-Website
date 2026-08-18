export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink/60 backdrop-blur-md transition-opacity duration-300">
      <div className="mb-5 h-10 w-10 animate-spin rounded-full border-[3px] border-white/20 border-t-yellow" />
      <span className="font-mono text-[.72rem] uppercase tracking-[.16em] text-white/80">{label}</span>
    </div>
  )
}
