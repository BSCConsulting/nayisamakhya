import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  const [lang, setLang] = useState('te')

  return (
    <div className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <Hero lang={lang} />
        {/* Dashboard and survey sections intentionally untouched in Phase 1 */}
        <div id="services" className="sr-only" aria-hidden="true" />
        <div id="voice" className="sr-only" aria-hidden="true" />
      </main>
    </div>
  )
}
