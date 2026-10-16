import { useCallback, useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import { About, TechStack, Projects, Activity } from './components/Dashboard.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ChatPage from './components/ChatPage.jsx'
import { Certifications } from './components/Sections.jsx'
import { Reveal } from './components/ui.jsx'

const fromHash = () => ({ '#/projects': 'projects', '#/chat': 'chat' }[window.location.hash] || 'home')

export default function App() {
  const [view, setView] = useState(fromHash)

  useEffect(() => {
    const onPop = () => { setView(fromHash()); window.scrollTo(0, 0) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((id) => {
    const next = id === 'projects' || id === 'chat' ? id : 'home'
    if (next !== view) window.history.pushState(null, '', next === 'home' ? '#/' : `#/${next}`)
    setView(next)
    window.scrollTo({ top: 0, behavior: next === view ? 'smooth' : 'auto' })
  }, [view])

  return (
    <div className="mx-auto max-w-[1280px] px-3 pb-10 pt-3 sm:px-5">
      <Nav view={view} onNavigate={navigate} />
      <main className="mt-4">
        {view === 'projects' ? (
          <Reveal key="projects"><ProjectsPage /></Reveal>
        ) : view === 'chat' ? (
          <Reveal key="chat"><ChatPage /></Reveal>
        ) : (
          <Reveal key="home">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[32fr_33fr_35fr]">
              <About />
              <TechStack />
              <div className="md:col-span-2 lg:col-span-1 lg:row-span-2"><Projects onOpenProjects={() => navigate('projects')} /></div>
              <Activity />
            </div>
            <div className="mt-4"><Certifications /></div>
          </Reveal>
        )}
      </main>
      <footer className="mt-8 text-center text-xs text-muted">© {new Date().getFullYear()} Ayush Singh</footer>
    </div>
  )
}
