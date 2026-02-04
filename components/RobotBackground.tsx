"use client";

import { Suspense, lazy, useState, useEffect } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));
const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // تقليل وقت التأخير لتحسين انطباع السرعة
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return <div className="fixed inset-0 z-[1] bg-black" />;

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-auto" aria-hidden="true">
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
