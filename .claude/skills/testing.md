---
name: testing
description: Testing strategy and patterns for DANVERSE-X — unit tests, integration tests, accessibility testing, and visual regression patterns.
trigger: test|spec|vitest|jest|testing library|rtl|e2e|playwright|cypress|coverage|mock|assert
---

# Testing — DANVERSE-X

## Stack

- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **A11y**: `@axe-core/react` + axe-playwright
- **Visual regression**: Playwright screenshots (if needed)

## File Structure

```
__tests__/
  components/      ← Component unit tests
  hooks/           ← Hook unit tests
  lib/             ← Utility function tests
  e2e/             ← Playwright end-to-end tests
```

## Component Testing Pattern

```tsx
// __tests__/components/TextReveal.test.tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TextReveal from '@/components/text-reveal';

// Mock GSAP — never run real animations in tests
vi.mock('@/lib/gsap', () => ({
  gsap: {
    timeline: () => ({
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
    context: vi.fn(() => ({ revert: vi.fn() })),
  },
}));

// Mock ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(), kill: vi.fn() },
}));

describe('TextReveal', () => {
  it('renders children with correct text content', () => {
    render(<TextReveal preset="slide-up">Hello DANVERSE</TextReveal>);
    expect(screen.getByText('Hello DANVERSE')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<TextReveal preset="slide-up">Hello</TextReveal>);
    const el = screen.getByText('Hello');
    // Should not have role that breaks reading
    expect(el).not.toHaveAttribute('aria-hidden', 'true');
  });
});
```

## Hook Testing Pattern

```tsx
// __tests__/hooks/use-gsap-enter.test.tsx
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import useGsapEnter from '@/hooks/use-gsap-enter';

vi.mock('@/lib/gsap', () => ({ gsap: { fromTo: vi.fn() } }));

it('does not throw when ref is null', () => {
  const ref = { current: null };
  expect(() => renderHook(() => useGsapEnter(ref as any, 'fade-up'))).not.toThrow();
});
```

## Utility Testing Pattern

```tsx
// __tests__/lib/split-text.test.ts
import { splitWords, splitChars } from '@/lib/split-text';

describe('splitWords', () => {
  it('splits sentence into word spans', () => {
    const el = document.createElement('p');
    el.textContent = 'Hello World';
    const words = splitWords(el);
    expect(words).toHaveLength(2);
  });

  it('preserves aria-label on parent', () => {
    const el = document.createElement('p');
    el.textContent = 'Test sentence';
    splitWords(el);
    expect(el.getAttribute('aria-label')).toBe('Test sentence');
  });
});
```

## Playwright E2E Pattern

```ts
// __tests__/e2e/hero.spec.ts
import { test, expect } from '@playwright/test';

test('hero section renders correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-testid="hero-cta"]')).toBeVisible();
});

test('skip link is keyboard accessible', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.locator('text=Skip to content');
  await expect(skipLink).toBeFocused();
});
```

## Mocking Rules

| Module | Mock Strategy |
|--------|--------------|
| `lib/gsap.ts` | `vi.mock` returning chainable mock object |
| `gsap/ScrollTrigger` | `vi.mock` with `create`/`kill` stubs |
| `three` | `vi.mock` with geometry/material/renderer stubs |
| `next/image` | Use `@next/jest` transform or manual mock |
| `next/navigation` | `vi.mock('next/navigation', ...)` |

## Coverage Targets

| Area | Target |
|------|--------|
| `lib/` utilities | ≥ 90% |
| `hooks/` | ≥ 80% |
| `components/` critical path | ≥ 70% |
| Animation/GSAP logic | Smoke tests only |

## Running Tests

```bash
npx vitest                    # watch mode
npx vitest run                # CI one-shot
npx vitest run --coverage     # with coverage
npx playwright test           # E2E
npx playwright test --ui      # E2E with UI
```
