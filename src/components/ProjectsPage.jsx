import { ExternalLink, Github } from 'lucide-react'
import { Card } from './ui.jsx'
import { Preview } from './Dashboard.jsx'
import { projects } from '../data.js'

const btn = 'flex items-center gap-1.5 rounded-xl border border-line bg-[#0e1218] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-[#171d26] hover:text-white'

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects-title">
      <h1 id="projects-title" className="text-3xl font-bold">Projects</h1>
      <p className="mt-1 text-muted">Things I've built and learned from.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.name}>
            <Card as="article" className="flex h-full flex-col">
              <Preview p={p} />
              <h2 className="mt-4 font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-muted">{p.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {p.live && <a href={p.live} target="_blank" rel="noreferrer noopener" className={btn}><ExternalLink size={14} /> Live demo</a>}
                <a href={p.github} target="_blank" rel="noreferrer noopener" className={btn}><Github size={14} /> GitHub</a>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
