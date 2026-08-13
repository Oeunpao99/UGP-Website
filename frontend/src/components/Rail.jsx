const SIZES = [
  '21 mm · 1/2"',
  '27 mm · 3/4"',
  '34 mm · 1"',
  '42 mm · 1 1/4"',
  '49 mm · 1 1/2"',
  '60 mm · 2"',
  '75 mm · 2 1/2"',
  '90 mm · 3"',
  '100 mm · 4"',
  '125 mm · 5"',
  '165 mm · 6"',
  '200 mm · 8"',
  '250 mm · 10"',
  '300 mm · 12"',
]

export default function Rail() {
  const items = SIZES.map((s, i) => (
    <div
      className="flex items-center gap-[10px] whitespace-nowrap border-r border-white/10 px-[26px] py-[15px] font-mono text-[.76rem] tracking-[.1em] text-white/60"
      key={i}
    >
      <span className="h-[6px] w-[6px] rounded-full bg-blue-lite" />
      uPVC <b className="font-semibold text-yellow">{s}</b>
    </div>
  ))
  return (
    <div className="relative z-[2] overflow-hidden border-y border-white/[0.14] bg-black/[0.22]" aria-hidden="true">
      <div className="group flex w-max animate-slide group-hover:[animation-play-state:paused]">
        {items}
        {items}
      </div>
    </div>
  )
}
