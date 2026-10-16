import { useEffect, useState } from 'react'
import { Home, FolderGit2, Sparkles, Menu, X, FileText } from 'lucide-react'
import { RESUME_URL } from '../data.js'

const links = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'chat', label: "Let's Chat", icon: Sparkles },
]

export default function Nav({ view, onNavigate }) {
  const [spy, setSpy] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (view === 'home') setSpy('home')
  }, [view])

  const active = view === 'projects' ? 'projects' : view === 'chat' ? 'chat' : spy
  const go = (id) => { setOpen(false); onNavigate(id) }

  return (
    <header className="sticky top-3 z-40">
      <nav aria-label="Main" className="rounded-3xl border border-line bg-black/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => go('home')} className="flex items-center gap-3">
            
<img
  src="/image.jpg"
  alt="Ayush Singh"
  className="h-10 w-10 rounded-full border border-accent/40 object-cover"
/>

            <span className="font-semibold">Ayush Singh</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button onClick={() => go(id)} aria-current={active === id ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${active === id ? 'bg-[#14181f] text-white shadow-[inset_0_-2px_0_0_#d6b97b]' : 'text-muted hover:bg-white/[.04] hover:text-white'}`}>
                  <Icon size={16} aria-hidden="true" /> {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={RESUME_URL} target="_blank" rel="noreferrer noopener" aria-label="Available for internships — open resume.pdf"
              className="group relative hidden h-10 w-[250px] items-center justify-center overflow-hidden rounded-xl border border-line bg-[#14181f] text-sm font-medium transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-[#f3e6c8] sm:flex">
              <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0">
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>
                Available for Internships
              </span>
              <span className="absolute inset-0 flex translate-y-6 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <FileText size={16} aria-hidden="true" /> resume.pdf
              </span>
            </a>
            <button className="grid h-9 w-9 place-items-center rounded-xl border border-line md:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <ul className="mt-3 grid gap-1 border-t border-line pt-3 md:hidden">
            {links.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button onClick={() => go(id)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm ${active === id ? 'bg-[#14181f]' : 'text-muted'}`}>
                  <Icon size={16} /> {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
