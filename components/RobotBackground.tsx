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
    setIsLoaded(true); // Stop showing loading spinner
  }

  return (
    <div 
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-auto" 
      aria-hidden="true"
      style={{ willChange: 'transform', touchAction: 'none' }}
    >
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Static fallback if WebGL fails */}
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
        />
      )}
    </div>
  );
}
