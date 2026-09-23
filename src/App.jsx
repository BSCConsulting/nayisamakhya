import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import StrategicLoop from './components/StrategicLoop.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [lang, setLang] = useState('te')

  return (
    <div className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <Hero lang={lang} />
        <StrategicLoop lang={lang} />
        <Dashboard lang={lang} />
        <div id="voice" className="sr-only" aria-hidden="true" />
      </main>
    </div>
  )
}
