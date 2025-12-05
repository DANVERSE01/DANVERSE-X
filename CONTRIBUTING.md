# Contributing to DANVERSE-X

Thank you for your interest in contributing to DANVERSE-X! This document provides guidelines for contributing to the project.

## Code of Conduct

This project follows professional coding standards and best practices. All contributors are expected to maintain:

- Clean, readable code
- Comprehensive documentation
- Respectful communication
- Quality over quantity

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (recommended)
- Git for version control
- Basic understanding of Next.js and React

### Setup Development Environment

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/DANVERSE-X.git
cd DANVERSE-X
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Run development server**
```bash
pnpm dev
```

5. **Open browser**
```
http://localhost:3000
```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-new-component` - New features
- `fix/resolve-bug-name` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/improve-performance` - Code improvements
- `style/update-theme` - Visual/style changes

### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
git commit -m "feat(icons): add dynamic favicon generation"
git commit -m "fix(seo): correct sitemap generation"
git commit -m "docs(readme): update setup instructions"
```

### Pull Request Process

1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit**
```bash
git add .
git commit -m "feat: your feature description"
```

3. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request**
- Go to GitHub repository
- Click "New Pull Request"
- Select your branch
- Fill in PR template
- Request review

### PR Requirements

- ✅ Code builds successfully (`pnpm build`)
- ✅ No TypeScript errors (`pnpm tsc --noEmit`)
- ✅ ESLint passes (`pnpm lint`)
- ✅ Tests pass (if applicable)
- ✅ Documentation updated
- ✅ Clear description of changes

## Code Style Guidelines

### TypeScript

```typescript
// Use explicit types
const greeting: string = "Hello"

// Use interfaces for objects
interface User {
  name: string
  email: string
}

// Use arrow functions for components
const MyComponent = ({ title }: { title: string }) => {
  return <h1>{title}</h1>
}
```

### React Components

```typescript
// Functional components with TypeScript
import type { FC } from 'react'

interface Props {
  title: string
  children?: React.ReactNode
}

const Component: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default Component
```

### CSS/Tailwind

```typescript
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-black text-white">
  <h1 className="text-2xl font-bold">Title</h1>
</div>

// For complex styles, use CSS classes in globals.css
```

## File Structure

```
app/
  ├── (routes)/           # Page routes
  ├── layout.tsx         # Root layout
  ├── page.tsx           # Homepage
  └── globals.css        # Global styles

components/
  ├── ui/                # shadcn/ui components
  └── [feature].tsx    # Feature components

lib/
  └── utils.ts          # Utility functions

public/
  ├── icons/            # Static icons
  └── images/           # Static images
```

## Testing

### Manual Testing

1. **Build project**
```bash
pnpm build
```

2. **Test production build**
```bash
pnpm start
```

3. **Check different routes**
- Homepage: `/`
- About: `/About`
- Work: `/work`
- FAQ: `/faq`

4. **Test responsive design**
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)

5. **Test PWA features**
- Manifest loads correctly
- Icons display properly
- Add to home screen works

## Documentation

### Code Comments

```typescript
/**
 * Generates a unique ID for components
 * @param prefix - Optional prefix for the ID
 * @returns Unique identifier string
 */
function generateId(prefix?: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
```

### README Updates

When adding features:
1. Update main README.md
2. Add to Features section
3. Update setup instructions if needed
4. Add examples if applicable

## Performance Guidelines

- Use Next.js Image component for images
- Lazy load components when possible
- Minimize bundle size
- Optimize assets (compress images, minify CSS)
- Use static generation when possible

## Security Best Practices

- Never commit `.env` files
- Use environment variables for sensitive data
- Validate all user inputs
- Keep dependencies updated
- Run security audits regularly

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Open a new issue with `question` label
4. Contact: danverseai@outlook.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to DANVERSE-X! 🚀**
