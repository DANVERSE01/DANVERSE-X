---
name: arabic-rtl
description: Arabic language and RTL web development for DANVERSE-X — bilingual layouts, RTL CSS, Arabic typography, Next.js i18n, and GCC market targeting. Auto-loaded for Arabic, RTL, or bilingual work.
trigger: arabic|rtl|bilingual|i18n|عربي|right-to-left|lang=ar|dir=rtl|gcc|localization|translation
---

# Arabic RTL Web System — DANVERSE-X

## HTML Setup
```tsx
// app/[locale]/layout.tsx
export default function Layout({ children, params }: { 
  children: React.ReactNode
  params: { locale: string }
}) {
  const isArabic = params.locale === 'ar'
  return (
    <html 
      lang={params.locale} 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <body>{children}</body>
    </html>
  )
}
```

## Next.js i18n Routing
```ts
// middleware.ts
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'ar']
const defaultLocale = 'en'

// Redirect / → /en or /ar based on browser language
```

## CSS RTL Patterns

### Logical Properties (preferred — auto-flips in RTL)
```css
/* ✅ Use logical properties — work in both LTR and RTL */
margin-inline-start: 1rem;     /* left in LTR, right in RTL */
margin-inline-end: 1rem;       /* right in LTR, left in RTL */
padding-inline: 1.5rem;        /* horizontal padding */
padding-block: 2rem;           /* vertical padding */
border-inline-start: 1px solid; /* left border in LTR */
inset-inline-start: 0;         /* left in LTR, right in RTL */
text-align: start;             /* left in LTR, right in RTL */
float: inline-start;
```

### Physical Properties (only when direction matters)
```css
/* Only use when you specifically need direction-aware override */
[dir="rtl"] .icon-arrow { transform: scaleX(-1); }
[dir="rtl"] .sidebar { right: 0; left: auto; }
```

### Tailwind RTL Support
```tsx
// Tailwind 3.3+ rtl: modifier
<div className="mr-4 rtl:mr-0 rtl:ml-4">...</div>
<div className="text-left rtl:text-right">...</div>
<div className="flex-row rtl:flex-row-reverse">...</div>
```

## Arabic Typography

### Font Loading (next/font)
```tsx
import { Cairo, Tajawal, Noto_Sans_Arabic } from 'next/font/google'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-arabic'
})

// Cairo — clean, modern, professional (DANVERSE choice)
// Tajawal — slightly rounded, warm
// Noto Sans Arabic — maximum compatibility
```

### Arabic CSS Rules
```css
/* Arabic body text */
[lang="ar"] body, [dir="rtl"] body {
  font-family: var(--font-arabic), 'Cairo', sans-serif;
  font-size: 1.05rem;      /* Arabic needs slightly larger */
  line-height: 1.85;       /* Arabic needs more line height */
  letter-spacing: 0;       /* Never add letter-spacing to Arabic */
  word-spacing: 0.05em;    /* Subtle word spacing is fine */
}

/* Arabic headings */
[dir="rtl"] h1, [dir="rtl"] h2 {
  font-weight: 700;        /* Bold is common in Arabic headings */
  line-height: 1.4;
}

/* ❌ Never */
[dir="rtl"] * {
  letter-spacing: 0.05em;  /* Breaks Arabic calligraphy — banned */
}
```

## Bilingual Component Pattern
```tsx
interface BilingualTextProps {
  en: string
  ar: string
  locale: 'en' | 'ar'
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function BilingualText({ en, ar, locale, as: Tag = 'p' }: BilingualTextProps) {
  return (
    <Tag 
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {locale === 'ar' ? ar : en}
    </Tag>
  )
}
```

## Translation Object Pattern
```ts
// lib/translations.ts
export const t = {
  en: {
    hero_title: 'Creative Director',
    hero_subtitle: 'Alexandria → Gulf',
    cta: 'View Work',
    contact: 'Get in Touch',
  },
  ar: {
    hero_title: 'مدير إبداعي',
    hero_subtitle: 'الإسكندرية ← الخليج',
    cta: 'استعرض الأعمال',
    contact: 'تواصل معنا',
  }
} as const

type Locale = keyof typeof t
type TranslationKey = keyof typeof t.en

export function useTranslation(locale: Locale) {
  return (key: TranslationKey) => t[locale][key]
}
```

## Layout Flip Patterns

### Navigation (RTL-aware)
```tsx
<nav className="flex items-center justify-between rtl:flex-row-reverse">
  <Logo />
  <div className="flex gap-6 rtl:flex-row-reverse">
    {navItems.map(item => <NavLink key={item.href} {...item} />)}
  </div>
</nav>
```

### Icon + Text (RTL-aware)
```tsx
<button className="flex items-center gap-2 rtl:flex-row-reverse">
  <ArrowIcon className="rtl:rotate-180" />
  <span>{label}</span>
</button>
```

## GCC Market Notes
- Arabic is written right-to-left, but numbers stay left-to-right (bidirectional text)
- GCC market: Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman
- Saudi Arabia: largest market — formal MSA preferred
- UAE: mix of MSA + Gulf dialect OK
- Friday = weekend in GCC (Thu-Fri or Fri-Sat depending on country)
- Ramadan: different content strategy — longer evenings, emotional/spiritual tone
- Colors: Green is Saudi national color (use carefully), gold = premium across GCC
