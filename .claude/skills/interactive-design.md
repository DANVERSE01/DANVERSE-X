---
name: interactive-design
description: Complete interactive design system for DANVERSE-X — cursor systems, magnetic effects, 3D card tilt, particle trails, noise backgrounds, loading sequences, and all interactive pattern implementations.
trigger: interactive|cursor|magnetic|tilt|3d card|particle trail|loading|preloader|noise|interactive component|hover system|click effect|ripple|spotlight
---

# Interactive Design — DANVERSE Patterns

## Cursor System Architecture

### Full Cursor Component
```tsx
"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

type CursorState = 'default' | 'hover' | 'text' | 'drag' | 'media' | 'hidden';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [state, setState] = useState<CursorState>('default');

  useEffect(() => {
    // Bail on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current!;
    const dot = dotRef.current!;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const onEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const type = target.getAttribute('data-cursor') as CursorState;
      const cursorLabel = target.getAttribute('data-cursor-label') ?? '';
      setState(type);
      setLabel(cursorLabel);
    };

    const onLeave = () => { setState('default'); setLabel(''); };

    // Smooth cursor ring
    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.12; // lerp factor
      cursorY += (mouseY - cursorY) * 0.12;
      gsap.set(cursor, { x: cursorX, y: cursorY });
      requestAnimationFrame(tick);
    };
    const rafId = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  }, []);

  return (
    <>
      {/* Cursor ring */}
      <div ref={cursorRef} className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9999]">
        <div className={[
          'rounded-full border border-white transition-all duration-300',
          state === 'default' ? 'w-8 h-8 opacity-60' : '',
          state === 'hover'   ? 'w-14 h-14 bg-[var(--color-electric-blue)] border-[var(--color-electric-blue)] opacity-90' : '',
          state === 'text'    ? 'w-0.5 h-6 rounded-none' : '',
          state === 'media'   ? 'w-20 h-20 opacity-80' : '',
          state === 'hidden'  ? 'opacity-0 scale-0' : '',
        ].join(' ')}>
          {label && <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">{label}</span>}
        </div>
      </div>
      {/* Dot */}
      <div ref={dotRef} className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9999] w-1 h-1 rounded-full bg-white" />
    </>
  );
}
```

### Cursor Data Attributes (use on elements)
```tsx
// Basic hover
<button data-cursor="hover">Click me</button>

// With label (for project cards)
<div data-cursor="media" data-cursor-label="VIEW">Project card</div>

// Text mode on inputs
<input data-cursor="text" />

// Hidden on non-interactive areas
<canvas data-cursor="hidden" />
```

---

## Magnetic Pull Effect

```tsx
"use client";
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function useMagnetic(strength: number = 0.4, radius: number = 80) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // touch bail

    const el = ref.current;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, radius]);

  return ref;
}
```

---

## 3D Card Tilt Effect

```tsx
"use client";
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function useTilt(maxAngle: number = 12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;   // -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(el, {
        rotateY: x * maxAngle,
        rotateX: -y * maxAngle,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.out',
      });

      // Move inner content for depth effect
      gsap.to(el.querySelector('.tilt-inner'), {
        x: x * 8,
        y: y * 8,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0, rotateX: 0,
        duration: 0.8, ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(el.querySelector('.tilt-inner'), {
        x: 0, y: 0,
        duration: 0.8, ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxAngle]);

  return ref;
}
```

---

## Particle Trail Cursor

```tsx
// Canvas overlay that follows cursor with particle trail
"use client";
import { useEffect, useRef } from 'react';

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; size: number; opacity: number; vx: number; vy: number }> = [];
    let mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1,
          opacity: 0.6,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        });
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.02;
        p.size *= 0.97;
        if (p.opacity <= 0) { particles.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 231, 91, ${p.opacity})`; // --color-electric-blue
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ mixBlendMode: 'screen' }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
```

---

## Spotlight Hover Effect

```tsx
// Radial spotlight that follows mouse within the element
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const { left, top } = ref.current!.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    ref.current!.style.setProperty('--x', `${x}px`);
    ref.current!.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="relative overflow-hidden"
      style={{
        background: 'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(224,231,91,0.08), transparent 70%)',
      }}
    >
      {children}
    </div>
  );
}
```

---

## Preloader / Loading Sequence

```tsx
"use client";
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide out preloader
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    // Animate progress counter 0 → 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function () {
        const val = Math.round(this.targets()[0].val);
        if (numberRef.current) numberRef.current.textContent = String(val);
        if (progressRef.current) progressRef.current.style.width = `${val}%`;
      },
    });
  }, [onComplete]);

  return (
    <div ref={ref} className="fixed inset-0 z-[10000] bg-[var(--color-bg)] flex items-center justify-center">
      <div className="w-full max-w-xs px-8">
        <span ref={numberRef} className="text-7xl font-display text-[var(--color-electric-blue)]">0</span>
        <div className="mt-4 h-px bg-white/10 relative">
          <div ref={progressRef} className="absolute inset-y-0 left-0 bg-[var(--color-electric-blue)] w-0 transition-none" />
        </div>
      </div>
    </div>
  );
}
```

---

## Noise / Grain Background (Canvas)

```tsx
"use client";
import { useEffect, useRef } from 'react';

export default function FilmGrain({ opacity = 0.04 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Xorshift32 PRNG — fast, deterministic
    let seed = 0xDEADBEEF;
    const rand = () => {
      seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5;
      return (seed >>> 0) / 4294967296;
    };

    const draw = () => {
      // Only redraw at 16fps
      frame++;
      if (frame % 4 !== 0) { requestAnimationFrame(draw); return; }

      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      const d = img.data;

      for (let i = 0; i < d.length; i += 4) {
        const val = rand() * 255;
        d[i] = d[i+1] = d[i+2] = val;
        d[i+3] = opacity * 255;
      }

      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(draw);
    };
    const rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ mixBlendMode: 'overlay' }}
      role="img"
      aria-label="Decorative film grain overlay"
    />
  );
}
```

---

## Ripple Click Effect

```ts
function addRipple(e: MouseEvent, el: HTMLElement) {
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  const size = Math.max(width, height) * 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px; height: ${size}px;
    left: ${x - size/2}px; top: ${y - size/2}px;
    border-radius: 50%;
    background: rgba(224,231,91,0.3);
    transform: scale(0);
    pointer-events: none;
  `;
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.appendChild(ripple);

  gsap.to(ripple, {
    scale: 1, opacity: 0,
    duration: 0.6, ease: 'power2.out',
    onComplete: () => ripple.remove(),
  });
}
```
