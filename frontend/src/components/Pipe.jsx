export default function Pipe({ color, stripe, legend, height, delay = 0, light, style, className = '' }) {
  return (
    <div
      className={`pipe${light ? ' on-light' : ''} ${className}`}
      style={{ '--c': color, '--d': `${delay}s`, height, ...style }}
    >
      {stripe && <span className="stripe" style={{ '--s': stripe }} />}
      <span className="legend" style={light ? { color: 'rgba(7,33,63,.6)' } : undefined}>
        {legend}
      </span>
    </div>
  )
}
