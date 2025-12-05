# DANVERSE-X | AI-Powered Creative Studio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://danverse-x.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

Premium creative studio showcase website featuring cinematic WebGL animations, professional UI components, and a bold red/orange brand identity. Built with cutting-edge web technologies for maximum performance and visual impact.

## 🎯 Features

### Visual Excellence
- **Cinematic WebGL Background** - Custom Plasma shader with smooth, fluid animations
- **Responsive Video Grid** - Lazy-loaded video cards optimized for all devices
- **Glass Morphism UI** - Modern glassmorphic design with backdrop blur effects
- **Custom Logo System** - SVG-based DANVERSE branding with multiple variants
- **Smooth Animations** - Hardware-accelerated transitions and scroll effects

### Technical Stack
- **Framework**: Next.js 15 with App Router (React 18)
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS 4 with custom configuration
- **UI Components**: shadcn/ui with radix-ui primitives
- **Fonts**: Inter (system font)
- **Package Manager**: pnpm (recommended)

### Performance Optimizations
- Static generation for instant TTFB
- Lazy video loading with IntersectionObserver
- Optimized WebGL shaders for 60fps
- Image optimization with Next.js Image
- Minimal JavaScript bundle size

### SEO & Accessibility
- Comprehensive metadata and Open Graph tags
- Structured data (JSON-LD) for rich snippets
- Semantic HTML5 markup
- ARIA labels for accessibility
- Dynamic sitemap generation
- Robots.txt configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DANVERSE01/DANVERSE-X.git
cd DANVERSE-X
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_SITE_URL=https://danverse.ai
NEXT_PUBLIC_WHATSAPP_NUMBER=201207346648
NEXT_PUBLIC_CONTACT_EMAIL=danverseai@outlook.com
```

4. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
DANVERSE-X/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & Tailwind
│   ├── About/                   # About page
│   ├── faq/                     # FAQ page
│   ├── revisions/               # Revisions policy
│   ├── t&c/                     # Terms & conditions
│   └── work/                    # Portfolio/work showcase
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui primitives
│   ├── hero.tsx                 # Hero section with video grid
│   ├── features.tsx             # Features section
│   ├── pricing.tsx              # Pricing cards
│   ├── plasma.tsx               # WebGL background shader
│   ├── site-header.tsx          # Navigation header
│   ├── appverse-footer.tsx      # Footer with contact form
│   ├── danverse-logo.tsx        # Custom SVG logo
│   ├── lazy-video.tsx           # Optimized video component
│   └── ...
│
├── lib/                         # Utility functions
│   └── utils.ts                 # Helper utilities
│
├── public/                      # Static assets
│   ├── icons/                   # Favicons and app icons
│   └── fonts/                   # Custom fonts
│
├── hooks/                       # Custom React hooks
├── styles/                      # Additional stylesheets
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  danverse: {
    red: '#ef4444',
    orange: '#f97316',
    dark: '#0a0a0f',
  }
}
```

### WebGL Background
Modify `components/plasma.tsx` to adjust the shader effect:

```typescript
<Plasma 
  colorStops={["#ef4444", "#f97316", "#fbbf24"]} 
  speed={1.0} 
  amplitude={1.0} 
  blend={0.6} 
/>
```

### Contact Information
Update environment variables in `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
NEXT_PUBLIC_INSTAGRAM=your_instagram_handle
```

## 📦 Build & Deploy

### Production Build

```bash
pnpm build
pnpm start
```

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DANVERSE01/DANVERSE-X)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Deploy to Other Platforms

- **Netlify**: Use `netlify.toml` configuration
- **Cloudflare Pages**: Configure build settings
- **AWS Amplify**: Use Next.js SSR deployment

## 🔧 Development

### Code Quality

```bash
# Run TypeScript checks
pnpm tsc --noEmit

# Run linting
pnpm lint

# Fix linting issues
pnpm lint --fix
```

### Adding New Components

```bash
# Install shadcn/ui component
pnpx shadcn@latest add button
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Production URL | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp contact number | Yes |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email address | Yes |
| `NEXT_PUBLIC_INSTAGRAM` | Instagram handle | No |

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- No admin panels or authentication (removed for security)
- Environment variables for sensitive data
- HTTPS enforced in production
- CSP headers configured

## 📄 License

All rights reserved © 2025 DANVERSE Creative Studio

## 📞 Contact

- **Website**: [danverse.ai](https://danverse.ai)
- **Email**: danverseai@outlook.com
- **Instagram**: [@danverse.creative](https://instagram.com/danverse.creative)
- **WhatsApp**: [Chat with us](https://wa.me/201207346648)

---

Built with ❤️ by DANVERSE Studio | Powered by Next.js 15
