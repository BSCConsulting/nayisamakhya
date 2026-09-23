import { Link, NavLink } from 'react-router-dom'

export default function Header({ lang = 'te', onLangChange }) {
  const isTelugu = lang === 'te'

  const navItems = isTelugu
    ? [
        { to: '/', label: 'హోమ్', end: true },
        { to: '/suryapet/kodad', label: 'మండలం', end: true },
        { to: '/suryapet/kodad/survey', label: 'సర్వే' },
      ]
    : [
        { to: '/', label: 'Home', end: true },
        { to: '/suryapet/kodad', label: 'Mandal', end: true },
        { to: '/suryapet/kodad/survey', label: 'Survey' },
      ]

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="max-w-6xl mx-auto bg-[#FBFBF9]/80 backdrop-blur-md border border-[#EBE8E0] rounded-full px-6 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className={`text-sm font-semibold tracking-tight text-[#18181B] shrink-0 ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu ? 'నయి' : 'Nayi'}
        </Link>

        <ul className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-sm transition-colors ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  } ${
                    isActive
                      ? 'bg-[#18181B] text-white'
                      : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F2EB]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          className="flex items-center rounded-full border border-[#EBE8E0] bg-white p-0.5 shrink-0"
          role="group"
          aria-label="Language"
        >
          <button
            type="button"
            onClick={() => onLangChange?.('te')}
            className={`px-3 py-1 rounded-full text-xs font-medium font-telugu transition-colors ${
              isTelugu
                ? 'bg-[#18181B] text-white'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            తెలుగు
          </button>
          <button
            type="button"
            onClick={() => onLangChange?.('en')}
            className={`px-3 py-1 rounded-full text-xs font-medium font-ui transition-colors ${
              !isTelugu
                ? 'bg-[#18181B] text-white'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  )
}
