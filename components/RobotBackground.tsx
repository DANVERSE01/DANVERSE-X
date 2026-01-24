"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function RobotBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Spline
          scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}
