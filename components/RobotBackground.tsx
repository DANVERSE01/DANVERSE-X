"use client";

import { Suspense, lazy, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));
const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(Boolean(media?.matches));
    updatePreference();
    media?.addEventListener?.("change", updatePreference);
    return () => media?.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const { requestIdleCallback, cancelIdleCallback } = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const scheduleLoad = () => {
      if (idleId || timeoutId) return;
      if (requestIdleCallback) {
        idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 1500 });
      } else {
        timeoutId = window.setTimeout(() => setShouldLoad(true), 300);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        scheduleLoad();
      }
    };

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (idleId) cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  if (!shouldLoad || prefersReducedMotion) {
    return <div className="fixed inset-0 z-[1] bg-black" aria-hidden="true" />;
  }

  return (
    <div
      className="fixed inset-0 z-[1] overflow-hidden"
      style={{ pointerEvents: "auto", touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-b-white" />
          </div>
        }
      >
        <Spline scene={sceneUrl} className="h-full w-full" />
      </Suspense>
    </div>
  );
}
