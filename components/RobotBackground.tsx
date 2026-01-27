"use client";

import { Suspense, lazy, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function RobotBackground() {
  const [canUseWebGL, setCanUseWebGL] = useState(false);

  useEffect(() => {
    // Check if WebGL is available
    const canvas = document.createElement("canvas");
    const webglContext = canvas.getContext("webgl") || canvas.getContext("webgl2");
    setCanUseWebGL(!!webglContext);
  }, []);

  // If WebGL is not available, don't render the Spline component
  if (!canUseWebGL) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <ErrorBoundary fallback={null}>
          <Spline
            scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
            className="w-full h-full"
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

// Error boundary to catch Spline rendering errors
function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
}
