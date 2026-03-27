"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

const QUOTES = [
  "We don't chase attention. We engineer the frame people remember.",
  "If the scroll is the battlefield, DANVERSE builds the first strike.",
  "Strong brands do not whisper. They arrive with intent.",
  "Cinematic work earns the pause before the next swipe.",
  "The goal is not more noise. The goal is unmistakable signal.",
]

export default function NotFound() {
  const router = useRouter()
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push("/")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,60,47,0.22),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e63c2f] to-transparent opacity-70" />
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <div className="relative">
          <span className="sr-only">404</span>
          <p
            className="glitch-404 font-display text-[clamp(7rem,24vw,15rem)] leading-none tracking-[0.14em] text-[#e63c2f]"
            data-text="404"
            aria-hidden="true"
          >
            404
          </p>
        </div>
        <h1 className="mt-4 text-3xl font-semibold uppercase tracking-[0.18em] text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
          The page you requested is off the DANVERSE grid. Head back to the last frame and keep moving.
        </p>
        <blockquote className="mt-8 max-w-xl border-l border-[#e63c2f]/40 pl-4 text-left text-sm italic leading-7 text-white/65">
          "{quote}"
        </blockquote>
        <Button
          type="button"
          onClick={handleBack}
          className="mt-8 rounded-full border border-[#e63c2f]/40 bg-[#e63c2f]/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#e63c2f] hover:text-black"
        >
          Go Back
        </Button>
      </div>
      <style jsx>{`
        .glitch-404 {
          position: relative;
          animation: glitch-jitter 1.6s infinite steps(2, end);
        }

        .glitch-404::before,
        .glitch-404::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
        }

        .glitch-404::before {
          color: rgba(255, 255, 255, 0.7);
          transform: translate(-3px, 0);
          clip-path: inset(0 0 56% 0);
          animation: glitch-slice-top 1.3s infinite steps(2, end);
        }

        .glitch-404::after {
          color: rgba(230, 60, 47, 0.92);
          transform: translate(4px, 0);
          clip-path: inset(58% 0 0 0);
          animation: glitch-slice-bottom 1.1s infinite steps(2, end);
        }

        @keyframes glitch-jitter {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          20% {
            transform: translate3d(-2px, 1px, 0);
          }
          40% {
            transform: translate3d(2px, -1px, 0);
          }
          60% {
            transform: translate3d(-1px, -1px, 0);
          }
          80% {
            transform: translate3d(1px, 1px, 0);
          }
        }

        @keyframes glitch-slice-top {
          0%,
          100% {
            transform: translate(-3px, 0);
          }
          50% {
            transform: translate(4px, -2px);
          }
        }

        @keyframes glitch-slice-bottom {
          0%,
          100% {
            transform: translate(4px, 0);
          }
          50% {
            transform: translate(-4px, 2px);
          }
        }
      `}</style>
    </div>
  )
}
