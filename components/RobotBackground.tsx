"use client";

import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const splineApp = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  function onLoad(spline: Application) {
    splineApp.current = spline;
    setIsLoaded(true);
  }

  function onError() {
    setHasError(true);
    setIsLoaded(true);
  }

  return (
    <div
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-auto"
      aria-hidden="true"
      style={{ 
        willChange: 'transform', 
        touchAction: 'none',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}
      {!hasError && (
        <Spline
          scene={sceneUrl}
          className="h-full w-full"
          onLoad={onLoad}
          onError={onError}
          renderOnDemand={false}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      )}
    </div>
  );
}
