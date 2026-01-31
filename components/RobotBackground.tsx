"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));
const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  return (
    <div className="fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
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
