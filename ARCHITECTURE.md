# DANVERSE-X Performance Architecture Plan

## A) Problem Framing

We are tasked with architecting a performance-focused solution for the DANVERSE-X website, which is currently experiencing significant slowness across all devices. Success means delivering a measurably faster user experience, particularly improving Core Web Vitals (LCP, INP, CLS), while adhering to a strict "no visual changes" constraint. The 3D robot background must be preserved and its mouse interaction made smooth and performant. All work will be done within the existing Next.js application, without introducing paid services or breaking the build.

**Assumptions:**

*   ASSUMPTION: The user has access to the Netlify dashboard to apply build command changes and review deployment status.
*   ASSUMPTION: The current hosting on Netlify is a fixed constraint.
*   ASSUMPTION: The `danverse.ai` domain is correctly configured to point to the Netlify deployment.
*   ASSUMPTION: The rollback to a "known-good" commit implies the latest commits on the `main` branch are the source of the performance degradation and potential build breakages.

## B) Requirements

### Functional Requirements

1.  The website must remain visually identical to the current production version at `https://www.danverse.ai`.
2.  The 3D robot background must remain and its interactivity with the mouse must be smooth and responsive.
3.  All existing content, including text, images, and videos, must be preserved.
4.  All existing SEO metadata and structured data must be preserved.
5.  The website must continue to be deployable on Netlify.

### Non-Functional Requirements

1.  **Performance:** Achieve a Lighthouse performance score of 90+ for desktop and 70+ for mobile.
2.  **Core Web Vitals:**
    *   Largest Contentful Paint (LCP) should be under 2.5 seconds.
    *   Interaction to Next Paint (INP) should be under 200 milliseconds.
    *   Cumulative Layout Shift (CLS) should be under 0.1.
3.  **Budget:** No paid APIs, subscriptions, or services.
4.  **Maintainability:** Code changes should be clean, well-documented, and easy to maintain.
5.  **Stability:** The build process must not break, and no new regressions should be introduced.

### Out of Scope

*   Any visual redesign or changes to the UI/UX.
*   Adding new features or content.
*   Changing the hosting provider from Netlify.
*   Introducing new paid dependencies or services.

## C) System Design

### Architecture Overview

*   **Client:** Next.js 14 (App Router) with React 18, TypeScript, and Tailwind CSS. The frontend is statically exported (`output: 'export'`) and hosted on Netlify.
*   **Server:** None. The site is fully static. API routes are not used in the production build.
*   **Data:** All content is hardcoded in the React components.
*   **External Services:**
    *   **Spline:** The 3D robot background is loaded from a Spline scene URL (`https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode`).
    *   **Vercel Blob:** Videos are hosted on Vercel's blob storage (`hebbkx1anhila5yf.public.blob.vercel-storage.com`).
    *   **Google Tag Manager & Analytics:** Used for analytics, loaded via `next/script` with `lazyOnload` strategy.

### Performance Architecture

*   **Rendering Model:** Static Site Generation (SSG) via `next build` and `output: 'export'`. This is the most performant rendering model for static content.
*   **Data Fetching Model:** No data fetching. All content is local.
*   **Caching Strategy:**
    *   **Netlify:** The `netlify.toml` file already implements a good caching strategy with immutable caching for `_next/static` assets and stale-while-revalidate for images and icons. This will be preserved.
    *   **Browser:** We will leverage browser caching for all assets.
*   **Bundling Strategy:** Next.js automatically handles code splitting and bundling. We will analyze the build output to identify large chunks and opportunities for further optimization.
*   **Media Strategy:**
    *   **Images:** Currently unoptimized (`unoptimized: true` in `next.config.mjs`). This is a major performance bottleneck. We will implement image optimization without changing the visual output.
    *   **Videos:** Videos are loaded lazily using an `IntersectionObserver` in the `LazyVideo` component. This is a good strategy, but the videos themselves are large and unoptimized. We will focus on optimizing the video files.
*   **Third-Party Strategy:** Google Tag Manager and Analytics are already deferred. The main third-party dependency is Spline, which is a significant performance bottleneck. We will focus on optimizing its loading and execution.

### Robot/3D Interaction Design

*   **Implementation:** The 3D robot is implemented using `@splinetool/react-spline` in the `RobotBackground.tsx` component. It's loaded lazily with a 500ms delay.
*   **Event Loop Design:** The interaction loop is managed by the Spline runtime. The main issue is the `pointer-events-auto` on the container, which can interfere with other UI elements. The current implementation uses a z-stacking context with `pointer-events-none` on the main content and `pointer-events-auto` on individual sections, which is a fragile approach.
*   **rAF Scheduling:** The Spline runtime uses `requestAnimationFrame` internally. We will not interfere with this.
*   **Throttling:** We will investigate if the Spline runtime offers any throttling options for mouse events.
*   **DPR Strategy:** The Spline runtime handles device pixel ratio automatically.
*   **Mobile Fallbacks:** No mobile fallback is implemented. The Spline scene is loaded on all devices.

### Error Handling Strategy

*   The application currently has no specific error handling strategy. We will add React Error Boundaries to prevent component crashes from breaking the entire page.

### Security Considerations

*   The `netlify.toml` file includes security headers (X-Frame-Options, X-XSS-Protection, etc.), which is good practice. We will preserve these.
*   Since the site is static, the attack surface is minimal.

## D) Project Structure

### Folder Tree

The existing folder structure is well-organized and follows Next.js conventions. We will not make any major changes to it.

```
.
├── app/                # App Router routes, layouts, and assets
├── components/         # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   └── RobotBackground.tsx # 3D robot component
├── lib/                # Shared utilities
├── public/             # Static assets (images, icons)
├── styles/             # Global styling
├── next.config.mjs     # Next.js configuration
├── netlify.toml        # Netlify deployment configuration
└── package.json        # Dependencies and scripts
```

### Responsibility of Each Major Folder

*   `app/`: Contains all pages and layouts. This is the core of the application's structure.
*   `components/`: Contains all reusable React components. This is where we will focus most of our optimization efforts.
*   `public/`: Contains static assets. We will add optimized images and videos here.
*   `lib/`: Contains shared utility functions. We may add performance-related utilities here.

### Naming Conventions and Code Style Rules

The project uses TypeScript and follows standard React/Next.js naming conventions (PascalCase for components, camelCase for variables and functions). We will continue to follow these conventions.

### Rule: Minimal Movement of Files

We will not move files unless absolutely necessary. All refactors will be done in place to minimize risk.

## E) Implementation Plan

### Milestones

*   **M1: Initial Performance Baseline & Build Fix**
*   **M2: Image & Video Optimization**
*   **M3: 3D Robot Interaction & Performance Optimization**
*   **M4: Final Verification & Deployment**

### For each milestone:

**M1: Initial Performance Baseline & Build Fix**

*   **Deliverables:**
    *   A baseline Lighthouse report for the current production site.
    *   A local build of the project that runs without errors.
*   **Tests:**
    *   Run `npm install` and `npm run build` to ensure the project builds successfully.
    *   Run `npm run dev` and verify the site runs locally.
*   **Verification Commands:**
    *   **Local:**
        ```bash
        # Install dependencies
        npm install
        # Build the project
        npm run build
        # Run the development server
        npm run dev
        ```
    *   **Netlify:**
        *   Run a build on Netlify and ensure it completes successfully.

**M2: Image & Video Optimization**

*   **Deliverables:**
    *   Optimized images in WebP format.
    *   Optimized videos in WebM format.
    *   Updated components to use the new optimized assets.
*   **Tests:**
    *   Visually compare the optimized assets with the originals to ensure no perceptible quality loss.
    *   Run Lighthouse and measure the improvement in LCP.
*   **Verification Commands:**
    *   **Local:**
        ```bash
        # Run Lighthouse on the local dev server
        # (Instructions to be provided on how to do this)
        ```

**M3: 3D Robot Interaction & Performance Optimization**

*   **Deliverables:**
    *   A refactored `RobotBackground.tsx` component with improved mouse interaction.
    *   A revised `app/layout.tsx` that removes the fragile `pointer-events` stacking context.
*   **Tests:**
    *   Manually test the mouse interaction with the 3D robot on desktop and mobile.
    *   Run the Chrome Performance panel to analyze the main thread work during interaction.
*   **Verification Commands:**
    *   **Local:**
        *   Manual testing of the 3D robot interaction.

**M4: Final Verification & Deployment**

*   **Deliverables:**
    *   A final Lighthouse report showing the performance improvements.
    *   A pull request with all the changes.
*   **Tests:**
    *   Run all previous tests to ensure no regressions.
*   **Verification Commands:**
    *   **Local & Netlify:**
        *   Run Lighthouse on the deployed preview URL.

### Risk List with Mitigation

*   **Risk:** Build breakage.
    *   **Mitigation:** We will run the build locally after every change. We will also rely on Netlify's deploy previews to catch any build issues before merging to `main`.
*   **Risk:** Visual regressions.
    *   **Mitigation:** We will perform a visual side-by-side comparison of the production site and our local changes after every modification.
*   **Risk:** Performance improvements are not significant.
    *   **Mitigation:** We will focus on the biggest bottlenecks first (images, videos, Spline) and measure the impact of each change.

## F) Confirmation Gate

This architecture plan outlines the strategy for improving the performance of the DANVERSE-X website while adhering to all constraints. I will now await your confirmation before proceeding with any code changes.

Please review the plan and reply with **"APPROVED. WRITE CODE"** to begin implementation. After each code chunk is delivered, I will provide a short verification checklist and rollback instructions.
