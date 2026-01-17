"use client";

import { Suspense, lazy } from "react";

// Lazy-load Spline library for performance
const Spline = lazy(() => import("@splinetool/react-spline"));

// Scene URL: interactive robot with full animations
const SCENE_URL = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export default function RobotBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="h-8 w-8 border-2 border-white/40 border-b-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={SCENE_URL} className="w-full h-full" />
      </Suspense>
    </div>
  );
}
