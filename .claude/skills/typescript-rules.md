---
name: typescript-rules
description: TypeScript strict-mode patterns for DANVERSE-X — zero any, proper generics, discriminated unions, type guards, and utility types. Auto-loaded for TypeScript or typing work.
trigger: typescript|type error|interface|generic|type guard|discriminated union|strict|infer|satisfies|zod
---

# TypeScript Strict — DANVERSE-X Rules

## Zero Tolerance Rules
```ts
// ❌ ALL OF THESE ARE BANNED
const data: any = fetchData()
const el = ref.current as unknown as HTMLDivElement
// @ts-ignore
// @ts-nocheck
function doSomething(x: any): any
```

## Proper Typing Patterns

### Component Props
```ts
// Named interface, not inline type literal
interface ProjectCardProps {
  project: Project
  onSelect?: (id: string) => void
  className?: string
}

export function ProjectCard({ project, onSelect, className }: ProjectCardProps) {
  // ...
}
```

### Event Handlers
```ts
// ✅ Typed event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... }
```

### Async Functions
```ts
// Return type explicit on public functions
async function fetchProject(slug: string): Promise<Project> {
  const res = await fetch(`/api/projects/${slug}`)
  if (!res.ok) throw new Error(`Project not found: ${slug}`)
  return res.json() as Promise<Project>
}
```

### Generics
```ts
// ✅ Constrained generics
function getFirst<T extends { id: string }>(items: T[]): T | undefined {
  return items[0]
}

// ✅ Generic with default
type ApiResponse<T = unknown> = {
  data: T
  status: number
  message: string
}
```

### Discriminated Unions
```ts
type VideoStatus = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: VideoProject[] }
  | { status: 'error'; error: string }

// Exhaustive handling
function renderStatus(state: VideoStatus) {
  switch (state.status) {
    case 'idle': return null
    case 'loading': return <Spinner />
    case 'success': return <Grid data={state.data} />
    case 'error': return <Error message={state.error} />
    // TypeScript catches missing cases
  }
}
```

### Type Guards
```ts
// Custom type guard
function isProject(val: unknown): val is Project {
  return (
    typeof val === 'object' &&
    val !== null &&
    'id' in val &&
    'title' in val &&
    typeof (val as Project).id === 'string'
  )
}

// Usage
const data: unknown = await fetchRaw()
if (isProject(data)) {
  console.log(data.title)  // ← fully typed
}
```

### `satisfies` Operator (TS 4.9+)
```ts
// Validates structure while preserving literal types
const ROUTES = {
  home: '/',
  work: '/work',
  about: '/about',
  contact: '/contact',
} satisfies Record<string, string>

// ROUTES.home is '/' (literal), not string
```

### Utility Types
```ts
// Common patterns in DANVERSE-X
type ProjectPreview = Pick<Project, 'id' | 'title' | 'thumbnail' | 'category'>
type ProjectUpdate = Partial<Omit<Project, 'id' | 'createdAt'>>
type ReadonlyProject = Readonly<Project>

// Component props from HTML element
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}
```

### Zod Runtime Validation (API boundaries)
```ts
import { z } from 'zod'

const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(['brand', 'video', 'web', 'direction']),
  year: z.number().int().min(2020).max(2030),
})

type Project = z.infer<typeof ProjectSchema>  // ← type from schema

// In API route:
const body = ProjectSchema.safeParse(await req.json())
if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 })
```

## React-Specific TypeScript

### forwardRef
```ts
const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={className}>{children}</div>
  )
)
AnimatedCard.displayName = 'AnimatedCard'
```

### useRef typing
```ts
const canvasRef = useRef<HTMLCanvasElement>(null)
const gsapRef = useRef<gsap.Context | null>(null)
const timelineRef = useRef<gsap.core.Timeline | null>(null)

// Access with null check
if (canvasRef.current) {
  canvasRef.current.width = 800
}
```

### Context with proper typing
```ts
interface ThemeContextType {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
}

const ThemeContext = React.createContext<ThemeContextType | null>(null)

export function useTheme(): ThemeContextType {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

## tsconfig.json Requirements
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false
  }
}
```
