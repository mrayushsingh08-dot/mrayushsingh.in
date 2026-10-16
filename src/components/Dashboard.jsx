
import { useEffect, useMemo, useState } from 'react'
import * as L from 'lucide-react'
import { Card, CardHeader, IconLink } from './ui.jsx'
import {
  GITHUB,
  LINKEDIN,
  RESUME_URL,
  PHOTO_URL,
  GH_USER,
  stack,
  projects,
} from '../data.js'

export function About() {
  return (
    <Card id="home" className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Hey, I'm Ayush 👋</h1>
          <p className="mt-1 text-sm font-semibold text-muted">
            B.Tech CSE Student | Full Stack & Cloud/DevOps
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-100">
            I'm a Computer Science Engineering student graduating in 2027,
            interested in building useful web applications and learning cloud
            infrastructure, automation, and deployment workflows.
          </p>
        </div>

        {PHOTO_URL ? (
          <img
  src="/image.jpg"
  alt="Ayush Singh"
  width="112"
  height="112"
  className="h-28 w-28 shrink-0 rounded-2xl object-cover"
/>
        ) : (
          <div
            role="img"
            aria-label="Profile photo placeholder"
            className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2a2416] to-[#0f1d1c] text-3xl font-bold text-accent"
          >
            AS
          </div>
        )}
      </div>

      <div
        className="mt-auto flex items-center justify-between border-t border-line pt-4"
        style={{ marginTop: '1.5rem' }}
      >
        <div className="flex gap-2">
          <IconLink href={GITHUB} label="GitHub">
            <L.Github size={16} />
          </IconLink>
          <IconLink href={LINKEDIN} label="LinkedIn">
            <L.Linkedin size={16} />
          </IconLink>
        </div>

        {RESUME_URL ? (
          <a
            href={RESUME_URL}
            download
            className="flex items-center gap-2 rounded-xl border border-line bg-[#0e1218] px-4 py-2 text-sm font-medium hover:bg-[#171d26]"
          >
            <L.Download size={16} /> Resume
          </a>
        ) : (
          <button
            disabled
            title="Add resume.pdf to /public and set RESUME_URL in data.js"
            className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium opacity-50"
          >
            <L.Download size={16} /> Resume
          </button>
        )}
      </div>
    </Card>
  )
}


export function TechStack() {
  const items = stack.flatMap((g) => g.items)

  return (
    <Card className="!p-5 min-h-[220px]">
      <h2 className="mb-4 text-base font-semibold text-zinc-200">
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-2.5">
        {items.map((t) => (
          <span
            key={t}
            className="chip-fx rounded-full border border-line bg-[#0b0f15] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-accent/50 hover:text-white"
          >
            {t}
          </span>
        ))}
      </div>
    </Card>
  )
}


export function Preview({ p }) {
  return (
    <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-line">
      {p.cover ? (
        <img
          src={p.cover}
          alt={`${p.name} project cover`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div
          className="grid h-full place-items-center text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, hsl(${p.hue} 60% 14%), #07070a 70%)`,
            color: `hsl(${p.hue} 80% 70%)`,
          }}
        >
          {p.name}
        </div>
      )}
    </div>
  )
}

export function Projects({ onOpenProjects }) {
  return (
    <Card className="h-full">
      <CardHeader
        title="Projects"
        action={
          <button
            onClick={onOpenProjects}
            className="flex items-center gap-1 text-sm text-muted hover:text-white"
          >
            See all <L.ArrowRight size={14} />
          </button>
        }
      />

      <ul className="space-y-4">
        {projects.slice(0, 2).map((p) => (
          <li
            key={p.name}
            className="overflow-hidden rounded-3xl border border-line bg-[#090c11] p-3 transition-colors hover:border-[#4a4130]"
          >
            <button
              onClick={onOpenProjects}
              className="block w-full text-left"
              aria-label={`Open projects page: ${p.name}`}
            >
              <Preview p={p} />
            </button>

            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-0.5 text-sm text-muted">{p.desc}</p>
              </div>

              <div className="flex shrink-0 gap-2">
                {p.live && (
                  <IconLink href={p.live} label={`${p.name} live demo`}>
                    <L.ExternalLink size={15} />
                  </IconLink>
                )}
                <IconLink href={p.github} label={`${p.name} on GitHub`}>
                  <L.Github size={15} />
                </IconLink>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={onOpenProjects}
        className="mt-4 w-full rounded-xl border border-line bg-[#0e1218] py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#171d26] hover:text-white"
      >
        View all {projects.length} projects
      </button>
    </Card>
  )
}

const shade = ['#12161d', '#4a3f24', '#8a7340', '#c2a45f', '#ecd9a6']

export function Activity() {
  const [data, setData] = useState(null)
  const [profile, setProfile] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGitHubData() {
      try {
        const [contributionsResponse, profileResponse] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`,
            { signal: controller.signal }
          ),
          fetch(`https://api.github.com/users/${GH_USER}`, {
            signal: controller.signal,
          }),
        ])

        if (!contributionsResponse.ok) {
          throw new Error('Could not load contributions')
        }

        const contributionsJson = await contributionsResponse.json()
        setData(contributionsJson.contributions)

        if (profileResponse.ok) {
          setProfile(await profileResponse.json())
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          setFailed(true)
        }
      }
    }

    loadGitHubData()
    return () => controller.abort()
  }, [])

  const { weeks, months } = useMemo(() => {
    const days =
      data ??
      Array.from({ length: 371 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - 370 + i)
        return {
          date: date.toISOString().slice(0, 10),
          level: 0,
          count: 0,
        }
      })

    const weeks = []

    days.forEach((day, i) => {
      if (i === 0) {
        for (let k = 0; k < new Date(day.date).getUTCDay(); k++) {
          ;(weeks[0] ??= []).push(null)
        }
      }

      const lastWeek = weeks[weeks.length - 1]

      if (lastWeek && lastWeek.length < 7) {
        lastWeek.push(day)
      } else {
        weeks.push([day])
      }
    })

    const months = []
    let previousMonth = -1

    weeks.forEach((week, i) => {
      const first = week.find(Boolean)
      if (!first) return

      const month = new Date(first.date).getUTCMonth()

      if (month !== previousMonth && i < weeks.length - 1) {
        months.push({
          i,
          label: new Date(first.date).toLocaleString('en', {
            month: 'short',
            timeZone: 'UTC',
          }),
        })
      }

      previousMonth = month
    })

    return { weeks, months }
  }, [data])

  const total = data?.reduce((sum, day) => sum + day.count, 0) ?? 0

  const techCount = stack.reduce(
    (count, group) => count + group.items.length,
    0
  )

  const stats = [
    {
      label: 'Contributions',
      value: data ? total.toLocaleString() : '—',
      detail: 'Over the last year',
      icon: L.GitCommit,
    },
    {
      label: 'Public Repositories',
      value: profile ? profile.public_repos.toLocaleString() : '—',
      detail: 'Public projects',
      icon: L.GitFork,
    },
    {
      label: 'Followers',
      value: profile ? profile.followers.toLocaleString() : '—',
      detail: 'GitHub community',
      icon: L.Users,
    },
    {
      label: 'Tech Stack',
      value: techCount.toLocaleString(),
      detail: 'Technologies listed',
      icon: L.Code2,
    },
  ]

  return (
    <Card className="lg:col-span-2">
      <CardHeader
        title="Open Source Activity"
        subtitle={
          data
            ? `${total.toLocaleString()} contributions over the last year.`
            : 'Contributions over the last year.'
        }
        action={
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-xl border border-line bg-[#0e1218] px-3 py-2 text-xs font-medium text-muted hover:text-white"
          >
            <L.Github size={14} /> @{GH_USER}
          </a>
        }
      />

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div className="relative mb-1 h-4 text-[11px] text-muted">
            {months.map((month) => (
              <span
                key={month.i}
                className="absolute"
                style={{ left: `${(month.i / weeks.length) * 100}%` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div
            className="flex gap-[3px]"
            role="img"
            aria-label="GitHub contribution heatmap"
          >
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-1 flex-col gap-[3px]">
                {week.map((day, j) => (
                  <span
                    key={j}
                    title={day ? `${day.count} on ${day.date}` : ''}
                    className="aspect-square rounded-[3px]"
                    style={{
                      background: day ? shade[day.level] : 'transparent',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          {failed
            ? 'Live data unavailable right now — view the profile on GitHub.'
            : !data
              ? 'Loading activity…'
              : ''}
        </span>

        <span className="flex items-center gap-1">
          Less
          {shade.map((color) => (
            <span
              key={color}
              className="h-3 w-3 rounded-[3px]"
              style={{ background: color }}
            />
          ))}
          More
        </span>
      </div>

      {/* GitHub Stats Dashboard */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-line bg-[#090c11] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-[#0d1118]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs leading-relaxed text-muted">
                  {stat.label}
                </span>
                <Icon
                  size={16}
                  className="shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-3 truncate text-2xl font-bold text-zinc-100">
                {stat.value}
              </p>

              <p className="mt-1 text-[11px] text-muted">{stat.detail}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

