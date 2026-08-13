function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function ClientMarquee({ title, items, reverse }) {
  const cells = items.map((c, i) => (
    <div className="relative flex h-[96px] w-[200px] flex-none items-center justify-center border-r border-line px-[20px]" key={i}>
      <span className="whitespace-nowrap px-2 text-center font-display text-[.9rem] font-bold opacity-70">{c.name}</span>
      <img
        src={`/images/clients/${slugify(c.name)}.png`}
        alt={c.name}
        loading="lazy"
        className="absolute inset-0 m-auto max-h-[64px] max-w-[176px] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  ))

  return (
    <div className="mb-[22px] last:mb-0">
      <div className="mb-[14px] flex items-center gap-3">
        <span className="h-[3px] w-[26px] flex-none rounded-full bg-yellow" />
        <h3 className="m-0 font-mono text-[.72rem] uppercase tracking-[.18em] text-grey">{title}</h3>
      </div>
      <div className="overflow-hidden rounded-[14px] border border-line bg-card">
        <div className={`group flex w-max animate-slide group-hover:[animation-play-state:paused]${reverse ? ' [animation-direction:reverse]' : ''}`}>
          {cells}
          {cells}
        </div>
      </div>
    </div>
  )
}
