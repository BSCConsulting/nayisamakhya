import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import StrategicLoop from './components/StrategicLoop.jsx'
import Dashboard from './components/Dashboard.jsx'
import MandalDirectory from './components/MandalDirectory.jsx'
import MandalView from './components/MandalView.jsx'
import SurveyWizard from './components/SurveyWizard.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function HomePage({ lang }) {
  return (
    <>
      <Hero lang={lang} />
      <StrategicLoop lang={lang} />
      <Dashboard lang={lang} />
      <div id="voice" className="sr-only" aria-hidden="true" />
    </>
  )
}

function AppShell() {
  const [lang, setLang] = useState('te')

  return (
    <div className="min-h-screen bg-canvas">
      <ScrollToTop />
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/mandals" element={<MandalDirectory lang={lang} />} />
          <Route path="/:district/:mandal" element={<MandalView lang={lang} />} />
          <Route
            path="/:district/:mandal/survey"
            element={<SurveyWizard lang={lang} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
