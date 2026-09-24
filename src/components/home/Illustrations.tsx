/** Lightweight civic illustrations as inline SVG (no heavy assets). */
export function IllustrationSalon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="illSalon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect x="8" y="14" width="48" height="36" rx="10" fill="url(#illSalon)" opacity="0.15" />
      <circle cx="32" cy="26" r="8" fill="#0f766e" opacity="0.85" />
      <path
        d="M18 46c3-8 9-12 14-12s11 4 14 12"
        fill="none"
        stroke="#047857"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M44 20l6 4M46 18l4 6" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationArtisan({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="22" fill="#047857" opacity="0.1" />
      <path
        d="M20 40c4-10 10-16 12-16s8 6 12 16"
        fill="none"
        stroke="#0d9488"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="22" r="6" fill="#0f766e" />
      <path d="M24 48h16" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationCommunity({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="12" y="28" width="40" height="22" rx="4" fill="#0284c7" opacity="0.12" />
      <path d="M16 28l16-12 16 12" fill="none" stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="36" width="8" height="14" rx="1.5" fill="#0d9488" />
      <circle cx="22" cy="40" r="2.5" fill="#0284c7" />
      <circle cx="42" cy="40" r="2.5" fill="#16a34a" />
    </svg>
  );
}
