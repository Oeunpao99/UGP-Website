export default function HeadRow({ eyebrow, title, lead, action, leadStyle }) {
  return (
    <div className="mb-[clamp(34px,4vw,56px)] flex flex-wrap items-end justify-between gap-8">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {lead && <p className="lead mt-[14px] mb-0" style={leadStyle}>{lead}</p>}
      </div>
      {action}
    </div>
  )
}
