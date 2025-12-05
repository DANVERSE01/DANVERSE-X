// DANVERSE Marquee Icon System
// Consistent 2.5px stroke, red/orange accent colors matching brand

type IconCategory =
  | "ai-startups"
  | "personal-brands"
  | "saas-tech"
  | "education"
  | "agencies"
  | "events"
  | "luxury"
  | "ecommerce"
  | "community-funnels"
  | "cinematic-ads"
  | "ugc-labs"
  | "brand-identity"
  | "landing"
  | "pipeline"
  | "growth"
  | "scripts"

interface IconProps {
  type: IconCategory
  size?: number
  className?: string
}

export function MarqueeCardIcon({ type, size = 48, className = "" }: IconProps) {
  const sw = "2.5"
  const accent = "#EF4444" // Red
  const accent2 = "#F97316" // Orange

  // AI Startups - Neural network / brain
  if (type === "ai-startups") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth={sw} />
        <circle cx="24" cy="24" r="6" fill={accent} />
        <circle cx="24" cy="10" r="3" fill="#FFFFFF" />
        <circle cx="24" cy="38" r="3" fill="#FFFFFF" />
        <circle cx="10" cy="24" r="3" fill="#FFFFFF" />
        <circle cx="38" cy="24" r="3" fill="#FFFFFF" />
        <line x1="24" y1="13" x2="24" y2="18" stroke={accent} strokeWidth="2" />
        <line x1="24" y1="30" x2="24" y2="35" stroke={accent} strokeWidth="2" />
        <line x1="13" y1="24" x2="18" y2="24" stroke={accent} strokeWidth="2" />
        <line x1="30" y1="24" x2="35" y2="24" stroke={accent} strokeWidth="2" />
      </svg>
    )
  }

  // Personal Brands - Person with spotlight
  if (type === "personal-brands") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <circle cx="24" cy="16" r="8" stroke="#FFFFFF" strokeWidth={sw} />
        <path
          d="M12 42 Q12 32 18 29 Q24 27 30 29 Q36 32 36 42"
          stroke="#FFFFFF"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <line x1="6" y1="6" x2="18" y2="14" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="12" x2="16" y2="16" stroke={accent2} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  }

  // SaaS & Tech - Dashboard
  if (type === "saas-tech") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="6" y="8" width="36" height="28" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <line x1="6" y1="16" x2="42" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
        <rect x="10" y="20" width="8" height="12" fill={accent} rx="1" />
        <rect x="20" y="24" width="8" height="8" fill={accent2} rx="1" />
        <rect x="30" y="22" width="8" height="10" fill="#FFFFFF" rx="1" opacity="0.5" />
        <line x1="6" y1="40" x2="18" y2="40" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="30" y1="40" x2="42" y2="40" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    )
  }

  // Education - Book with play
  if (type === "education") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <path
          d="M6 10 Q6 8 10 8 L22 8 Q24 8 24 10 L24 38 Q22 36 10 36 Q6 36 6 34 Z"
          stroke="#FFFFFF"
          strokeWidth={sw}
        />
        <path
          d="M42 10 Q42 8 38 8 L26 8 Q24 8 24 10 L24 38 Q26 36 38 36 Q42 36 42 34 Z"
          stroke="#FFFFFF"
          strokeWidth={sw}
        />
        <circle cx="33" cy="22" r="7" stroke={accent} strokeWidth={sw} />
        <polygon points="31,18 31,26 37,22" fill={accent} />
      </svg>
    )
  }

  // Agencies - Overlapping screens
  if (type === "agencies") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="18" y="6" width="24" height="20" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <rect x="6" y="18" width="24" height="20" rx="2" stroke="#FFFFFF" strokeWidth={sw} fill="rgba(0,0,0,0.5)" />
        <circle cx="14" cy="28" r="4" fill={accent} />
        <rect x="20" y="26" width="6" height="6" fill={accent2} rx="1" />
      </svg>
    )
  }

  // Events - Spotlight / stage
  if (type === "events") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="6" y="34" width="36" height="8" rx="1" stroke="#FFFFFF" strokeWidth={sw} />
        <path d="M24 6 L12 28 L36 28 Z" stroke={accent} strokeWidth={sw} fill="none" />
        <circle cx="24" cy="18" r="4" fill={accent} />
        <line x1="24" y1="28" x2="24" y2="34" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    )
  }

  // Luxury - Diamond
  if (type === "luxury") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <polygon points="24,6 42,18 24,42 6,18" stroke="#FFFFFF" strokeWidth={sw} fill="none" />
        <line x1="6" y1="18" x2="42" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="24" y1="6" x2="18" y2="18" stroke={accent} strokeWidth="1.5" />
        <line x1="24" y1="6" x2="30" y2="18" stroke={accent} strokeWidth="1.5" />
        <line x1="18" y1="18" x2="24" y2="42" stroke={accent2} strokeWidth="1.5" />
        <line x1="30" y1="18" x2="24" y2="42" stroke={accent2} strokeWidth="1.5" />
      </svg>
    )
  }

  // E-commerce - Shopping bag
  if (type === "ecommerce") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <path d="M10 16 L14 42 L34 42 L38 16 Z" stroke="#FFFFFF" strokeWidth={sw} />
        <path d="M16 16 Q16 8 24 8 Q32 8 32 16" stroke="#FFFFFF" strokeWidth={sw} fill="none" />
        <circle cx="24" cy="28" r="6" stroke={accent} strokeWidth={sw} />
        <polyline
          points="21,28 23,30 27,26"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  // Community Funnels - Funnel with people
  if (type === "community-funnels") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <circle cx="12" cy="8" r="3" fill="#FFFFFF" />
        <circle cx="24" cy="6" r="3" fill={accent} />
        <circle cx="36" cy="8" r="3" fill="#FFFFFF" />
        <path d="M8 14 L40 14 L30 28 L30 38 L18 38 L18 28 Z" stroke="#FFFFFF" strokeWidth={sw} />
        <circle cx="24" cy="44" r="3" fill={accent} />
      </svg>
    )
  }

  // Cinematic Ads - Camera
  if (type === "cinematic-ads") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="8" y="14" width="26" height="20" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <circle cx="21" cy="24" r="7" stroke={accent} strokeWidth={sw} />
        <circle cx="21" cy="24" r="3" fill={accent} />
        <polygon points="34,20 42,14 42,34 34,28" stroke="#FFFFFF" strokeWidth={sw} fill="none" />
        <rect x="28" y="10" width="8" height="6" rx="1" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    )
  }

  // UGC Labs - Phone with content
  if (type === "ugc-labs") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="14" y="6" width="20" height="36" rx="3" stroke="#FFFFFF" strokeWidth={sw} />
        <rect x="20" y="8" width="8" height="2" rx="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="24" cy="22" r="3" fill={accent} />
        <rect x="36" y="12" width="8" height="6" rx="1" stroke={accent2} strokeWidth="2" />
        <rect x="4" y="28" width="8" height="6" rx="1" stroke={accent} strokeWidth="2" />
      </svg>
    )
  }

  // Brand Identity - Compass
  if (type === "brand-identity") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth={sw} />
        <circle cx="24" cy="24" r="4" fill={accent} />
        <line x1="24" y1="8" x2="24" y2="14" stroke={accent} strokeWidth="2" />
        <line x1="24" y1="34" x2="24" y2="40" stroke={accent} strokeWidth="2" />
        <line x1="8" y1="24" x2="14" y2="24" stroke={accent} strokeWidth="2" />
        <line x1="34" y1="24" x2="40" y2="24" stroke={accent} strokeWidth="2" />
        <rect x="6" y="6" width="6" height="6" rx="1" fill={accent2} />
        <circle cx="40" cy="8" r="3" fill="#FFFFFF" />
      </svg>
    )
  }

  // Landing Pages - Browser window
  if (type === "landing") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="6" y="8" width="36" height="32" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <line x1="6" y1="16" x2="42" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill={accent} />
        <circle cx="18" cy="12" r="2" fill={accent2} />
        <circle cx="24" cy="12" r="2" fill="#FFFFFF" opacity="0.5" />
        <rect x="12" y="22" width="24" height="4" rx="1" fill="#FFFFFF" opacity="0.3" />
        <rect x="12" y="30" width="16" height="4" rx="1" fill={accent} />
      </svg>
    )
  }

  // AI Pipelines - Flow chart
  if (type === "pipeline") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="6" y="6" width="12" height="10" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <rect x="30" y="6" width="12" height="10" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <rect x="18" y="32" width="12" height="10" rx="2" stroke={accent} strokeWidth={sw} />
        <line x1="12" y1="16" x2="12" y2="24" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="36" y1="16" x2="36" y2="24" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="24" y1="24" x2="24" y2="32" stroke={accent} strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill={accent} />
      </svg>
    )
  }

  // Growth Kits - Chart going up
  if (type === "growth") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <polyline
          points="8,36 18,26 28,30 40,12"
          stroke={accent}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="40,12 40,20 32,12" fill={accent} />
        <line x1="8" y1="42" x2="40" y2="42" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="8" y1="10" x2="8" y2="42" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    )
  }

  // Sales Scripts - Document with speech
  if (type === "scripts") {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        <rect x="10" y="6" width="24" height="32" rx="2" stroke="#FFFFFF" strokeWidth={sw} />
        <line x1="16" y1="14" x2="28" y2="14" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
        <line x1="16" y1="20" x2="28" y2="20" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
        <line x1="16" y1="26" x2="24" y2="26" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
        <path d="M30 32 Q38 32 40 26 Q42 20 38 18 Q34 16 32 20" stroke={accent} strokeWidth={sw} fill="none" />
        <circle cx="36" cy="24" r="2" fill={accent} />
      </svg>
    )
  }

  return null
}
