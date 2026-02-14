"use client";

import { useRef, useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const splineApp = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // IntersectionObserver to detect when hero section is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            observer.disconnect(); // Stop observing once loaded
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before viewport
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  function onLoad(spline: Application) {
    splineApp.current = spline;
    setIsLoaded(true);
  }

  return (
    <div 
      ref={observerRef}
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-auto" 
      aria-hidden="true"
      style={{ willChange: 'transform', touchAction: 'none' }}
    >
      {/* Loading indicator */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Only render Spline when shouldLoad is true */}
      {shouldLoad && (
        <Spline 
          scene={sceneUrl} 
          className="h-full w-full"
          onLoad={onLoad}
          renderOnDemand={false}
        />
      )}
    </div>
  );
}
