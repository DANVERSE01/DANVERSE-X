"use client"

export function LogoWordmark({ className = "", size = "default" }: { className?: string; size?: "default" | "small" }) {
  const sizeClasses = {
    default: "text-base sm:text-lg",
    small: "text-xs sm:text-sm",
  }

  return (
    <>
      <style>{`
        .logo-wordmark {
          font-family: 'Space Grotesk', 'Inter Tight', 'Satoshi', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: inline-block;
        }
        
        .logo-v {
          background: linear-gradient(180deg, #8B5CF6 0%, #A3E635 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(168, 230, 53, 0.3);
          filter: drop-shadow(0 0 8px rgba(168, 230, 53, 0.25));
          position: relative;
        }
        
        .logo-v::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: radial-gradient(circle at 30% 30%, rgba(168, 230, 53, 0.1), transparent);
          filter: blur(8px);
          border-radius: 2px;
          pointer-events: none;
        }
      `}</style>

      <span className={`logo-wordmark text-white uppercase tracking-tight ${sizeClasses[size]} ${className}`}>
        DAN<span className="logo-v">V</span>ERSE
      </span>
    </>
  )
}
