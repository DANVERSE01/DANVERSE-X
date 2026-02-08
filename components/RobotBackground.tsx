"use client";

import { useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const sceneUrl = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function RobotBackground() {
  const splineApp = useRef<Application | null>(null);

  function onLoad(spline: Application) {
    splineApp.current = spline;
  }

  return (
    <div 
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-auto" 
      aria-hidden="true"
      style={{ willChange: 'transform', touchAction: 'none' }}
    >
      <Spline 
        scene={sceneUrl} 
        className="h-full w-full"
        onLoad={onLoad}
        renderOnDemand={false}
      />
    </div>
  );
}
