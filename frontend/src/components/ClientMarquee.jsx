import { useState } from 'react'

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function Cell({ name, i, accent }) {
  const [err, setErr] = useState(false)
  const dot = accent === 'blue' ? 'bg-blue' : 'bg-yellow'

  return (
    <div className="group/card relative flex h-[148px] w-[290px] flex-none items-center justify-center overflow-hidden border-r border-dashed border-line bg-white px-[24px]">
      <span className="pointer-events-none absolute top-[9px] left-[12px] font-mono text-[.6rem] font-semibold tracking-[.16em] text-line-strong">
        {String(i + 1).padStart(2, '0')}
      </span>
      <span className={`pointer-events-none absolute top-[10px] right-[12px] h-[6px] w-[6px] rounded-full ${dot}`} />
      {err ? (
        <span className="whitespace-nowrap px-2 text-center font-display text-[.9rem] font-bold opacity-70">{name}</span>
      ) : (
        <img
          src={`/images/clients/${slugify(name)}.png`}
          alt={name}
          loading="lazy"
          className="relative z-[1] h-[92px] w-auto max-w-[252px] object-contain transition-transform duration-300 ease-brand group-hover/card:scale-[1.12]"
          onError={() => setErr(true)}
        />
      )}
    </div>
  )
}

export default function ClientMarquee({ title, items, reverse, accent }) {
  const cells = items.map((c, i) => <Cell name={c.name} i={i} accent={accent} key={i} />)
  const dur = Math.max(45, Math.round((items.length * 290) / 22))

  return (
    <div className="mb-[22px] last:mb-0">
      <div className="mb-[14px] flex items-center gap-3">
        <span className="h-[3px] w-[26px] flex-none rounded-full bg-yellow" />
        <h3 className="m-0 font-mono text-[.72rem] uppercase tracking-[.18em] text-grey">{title}</h3>
      </div>
      <div className="overflow-hidden rounded-[14px] border border-line bg-card shadow-[0_22px_44px_-34px_rgba(7,33,63,.5)]">
        <div className={`group flex w-max animate-slide group-hover:[animation-play-state:paused]${reverse ? ' [animation-direction:reverse]' : ''}`} style={{ animationDuration: `${dur}s` }}>
          {cells}
          {cells}
        </div>
      </div>
    </div>
  )
}
