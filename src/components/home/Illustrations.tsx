/** Lightweight civic illustrations as inline SVG (no heavy assets). */
export function IllustrationSalon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="illSalon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
      </defs>
      <rect x="8" y="14" width="48" height="36" rx="10" fill="url(#illSalon)" opacity="0.15" />
      <circle cx="32" cy="26" r="8" fill="#9A3412" opacity="0.85" />
      <path
        d="M18 46c3-8 9-12 14-12s11 4 14 12"
        fill="none"
        stroke="#C2410C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M44 20l6 4M46 18l4 6" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationArtisan({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="22" fill="#C2410C" opacity="0.1" />
      <path
        d="M20 40c4-10 10-16 12-16s8 6 12 16"
        fill="none"
        stroke="#9A3412"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="22" r="6" fill="#9A3412" />
      <path d="M24 48h16" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationCommunity({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="12" y="28" width="40" height="22" rx="4" fill="#C2410C" opacity="0.12" />
      <path d="M16 28l16-12 16 12" fill="none" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="36" width="8" height="14" rx="1.5" fill="#9A3412" />
      <circle cx="22" cy="40" r="2.5" fill="#C2410C" />
      <circle cx="42" cy="40" r="2.5" fill="#9A3412" />
    </svg>
  );
}
