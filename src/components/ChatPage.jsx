import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Sparkles, Download, Github, Linkedin, Mail } from 'lucide-react'
import { Card, IconLink } from './ui.jsx'
import { EMAIL, GITHUB, LINKEDIN, RESUME_URL, stack, projects } from '../data.js'
import emailjs from '@emailjs/browser'

const suggestions = [
  "What's Ayush's tech stack?",
  'Tell me about CodeOrbit',
  'Is Ayush open to internships?',
  'What is he currently learning?',
]

// Dummy, rule-based replies (no backend). Swap `reply()` for a real API later.
function reply(q) {
  const t = q.toLowerCase()
  if (/stack|tech|skill|language/.test(t))
    return 'Ayush works with ' + stack.map((g) => `${g.group}: ${g.items.slice(0, 4).join(', ')}`).join(' · ') + '.'
  const hit = projects.find((p) => t.includes(p.name.toLowerCase().split(' ')[0]))
  if (hit) return `${hit.name} — ${hit.desc}${hit.live ? ` Live: ${hit.live}` : ''}`
  if (/project|built|build/.test(t)) return 'Highlights: ' + projects.map((p) => p.name).join(', ') + '. Ask me about any of them!'
  if (/intern|job|hire|work|avail|opportun/.test(t)) return 'Yes — Ayush is open to internships and entry-level opportunities. Email is the quickest way to reach him.'
  if (/learn|devops|cloud|docker|aws|jenkins/.test(t)) return 'Currently exploring Docker, Jenkins CI/CD, AWS deployments and GitOps through hands-on projects.'
  if (/resume|cv/.test(t)) return 'You can open the resume from the button on the right, or hover the badge in the navbar.'
  if (/contact|email|reach/.test(t)) return `Best way: ${EMAIL}. He usually replies within a day.`
  if (/who|about|study|college/.test(t)) return 'Ayush is a B.Tech CSE student (graduating 2027) focused on full-stack development and Cloud/DevOps.'
  return "I'm a demo assistant, so I only know the basics — try asking about his stack, projects, or availability."
}

function ChatPanel() {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [msgs, typing])

  const send = (text) => {
    const q = text.trim()
    if (!q || typing) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setInput(''); setTyping(true)
    setTimeout(() => { setMsgs((m) => [...m, { role: 'bot', text: reply(q) }]); setTyping(false) }, 900)
  }

  return (
    <Card className="flex h-[560px] flex-col !p-0 lg:h-[600px]">
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-accent"><Sparkles size={16} /></span>
        <div>
          <h2 className="text-sm font-semibold">Ask my AI assistant</h2>
          <p className="text-xs text-muted">Trained on Ayush's projects & background (demo)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5" aria-live="polite">
        {msgs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Sparkles className="text-accent" size={28} />
            <h3 className="mt-3 text-sm font-semibold">Hey, I'm Ayush's AI assistant 👋</h3>
            <p className="mt-1 text-xs text-muted">Ask about his stack, projects, or availability.</p>
            <div className="mt-5 flex max-w-md flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="chip-fx rounded-full border border-line bg-[#0e1218] px-3 py-1.5 text-xs text-zinc-300">{s}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent text-black' : 'border border-line bg-[#0e1218] text-zinc-200'}`}>{m.text}</p>
              </div>
            ))}
            {typing && (
              <div className="flex"><p className="flex gap-1 rounded-2xl border border-line bg-[#0e1218] px-4 py-3" aria-label="Assistant is typing">
                <span className="dot h-1.5 w-1.5 rounded-full bg-accent" /><span className="dot h-1.5 w-1.5 rounded-full bg-accent" /><span className="dot h-1.5 w-1.5 rounded-full bg-accent" />
              </p></div>
            )}
            <div ref={end} />
          </div>
        )}
      </div>

      <div className="border-t border-line p-4">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask anything about Ayush…" aria-label="Message"
            className="min-w-0 flex-1 rounded-xl border border-line bg-[#0e1218] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent/60" />
          <button onClick={() => send(input)} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-black transition hover:brightness-110 disabled:opacity-40" disabled={!input.trim() || typing}><ArrowUp size={18} /></button>
        </div>
      </div>
    </Card>
  )
}

const field = 'w-full rounded-xl border border-line bg-[#0e1218] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent/60'


function SideCards() {
  const [f, setF] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  

  const [status, setStatus] = useState('')

  const set = (k) => (e) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  const submit = async (e) => {
    
    e.preventDefault()
    setStatus('Sending...')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: f.name,
          from_email: f.email,
          subject: f.subject || 'Portfolio Inquiry',
          message: f.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )

      setStatus('Message sent successfully!')
      setF({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('Failed to send. Please check the setup and try again.')
    }
  }

  return (
    <div className="space-y-4">
      <Card>
  <div className="flex items-start gap-4">
    <div className="min-w-0 flex-1">
      <h2 className="text-lg font-bold text-white">
        I'm Ayush 👋
      </h2>

      <p className="mt-1 text-sm font-semibold text-white">
        B.Tech CSE Student | Full Stack & Cloud/DevOps
      </p>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        I build practical software projects and explore full-stack
        development, cloud infrastructure, Docker, and CI/CD.
      </p>
    </div>

    <img
      src="/image.jpg"
      alt="Ayush Singh"
      className="h-24 w-24 shrink-0 rounded-2xl object-cover"
    />
  </div>

  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
    <div className="flex gap-2">
      <IconLink
        href="https://github.com/mrayushsingh08-dot"
        label="GitHub"
      >
        <Github size={16} />
      </IconLink>

      <IconLink
        href="https://www.linkedin.com/in/ayush-singh-7796572a1/"
        label="LinkedIn"
      >
        <Linkedin size={16} />
      </IconLink>

      <IconLink href="mailto:ayush4dot@gmail.com" label="Email">
        <Mail size={16} />
      </IconLink>
    </div>

    <a
      href="/resume.pdf"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-semibold transition hover:border-accent/60"
    >
      <Download size={16} />
      Resume
    </a>
  </div>
</Card>
      <Card>
        <h2 className="text-sm font-semibold">Prefer email?</h2>
        <p className="mb-3 text-xs text-muted">
          I'll get back within a day.
        </p>

        <form onSubmit={submit} className="space-y-2.5">
          <input
            required
            value={f.name}
            onChange={set('name')}
            placeholder="Your name"
            className={field}
          />

          <input
            required
            type="email"
            value={f.email}
            onChange={set('email')}
            placeholder="Your email"
            className={field}
          />

          <input
            value={f.subject}
            onChange={set('subject')}
            placeholder="What's this about?"
            className={field}
          />

          <textarea
            required
            rows={3}
            value={f.message}
            onChange={set('message')}
            placeholder="Your message"
            className={field}
          />

          {status && (
            <p role="status" className="text-xs text-muted">
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'Sending...'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
          >
            <Mail size={16} /> Send message
          </button>
        </form>
      </Card>
    </div>
  )
}


export default function ChatPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
      <ChatPanel />
      <SideCards />
    </div>
  )
}
