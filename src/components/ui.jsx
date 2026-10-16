import { motion } from 'framer-motion'

export function Card({ children, className = '', as: Tag = 'section', ...rest }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onMouseMove={move} className={`card-fx rounded-3xl border border-line bg-card p-5 shadow-[0_8px_30px_rgba(0,0,0,.5)] ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Badge({ children, icon: Icon }) {
  return (
    <span className="chip-fx inline-flex items-center gap-1.5 rounded-full border border-line bg-[#0b0f15] px-3 py-1.5 text-xs font-medium text-zinc-200">
      {Icon && <Icon size={14} className="text-muted" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function IconLink({ href, label, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label} title={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-[#0e1218] text-zinc-300 transition-colors hover:bg-[#171d26] hover:text-white" {...rest}>
      {children}
    </a>
  )
}

export const Reveal = ({ children, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
    {children}
  </motion.div>
)
