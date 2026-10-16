
import { Award, Plus, ExternalLink } from 'lucide-react'
import { Card, CardHeader } from './ui.jsx'
import { certifications } from '../data.js'

export function Certifications() {
  return (
    <Card>
      <CardHeader title="Certifications" />

      {certifications.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Plus size={16} />
          No certifications listed yet. Add them in
          <code className="rounded bg-[#12161d] px-1.5 py-0.5">
            src/data.js
          </code>.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c) => (
            <li
              key={c.title}
              className="group flex items-start gap-3 rounded-2xl border border-line bg-[#090c11] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
            >
              <Award
                size={18}
                className="mt-0.5 shrink-0 text-accent"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1 text-sm">
                <h3 className="font-semibold">{c.title}</h3>

                <p className="mt-1 text-muted">
                  {c.issuer} · {c.date}
                </p>

                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {c.description}
                </p>

                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  >
                    View Certificate
                    <ExternalLink
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
