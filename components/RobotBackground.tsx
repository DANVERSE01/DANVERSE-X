"use client";

import { useRef, useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const splineApp = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function onLoad(spline: Application) {
    splineApp.current = spline;
    setIsLoaded(true);
  }

  function onError() {
    setHasError(true);
  }

  return (
    <div
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ willChange: "transform", touchAction: "none" }}
    >
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}
      {shouldLoad && !hasError && (
        <div
          className="h-full w-full transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        >
          <Spline
            scene={sceneUrl}
            className="h-full w-full"
            onLoad={onLoad}
            onError={onError}
            renderOnDemand={false}
          />
        </div>
      )}
    </div>
  );
}
