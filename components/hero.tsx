"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Wacus-style parallax for background
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    if (!textRef.current) return

    // Wacus-style entrance: Smooth, deliberate, high-end
    const ctx = gsap.context(() => {
      gsap.from(".reveal-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.5,
      })

      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      })
    }, textRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 sm:px-12"
    >
      {/* Background - Wacus style: Deep black with subtle depth */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-black" />
      </motion.div>

      {/* Content - Wacus style: Clean, centered, powerful typography */}
      <div ref={textRef} className="relative z-10 mx-auto w-full max-w-[1440px] text-center">
        <div className="flex flex-col items-center gap-8 sm:gap-12">
          <h1 className="flex flex-col gap-2 text-center">
            <span className="reveal-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,8vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white uppercase">
                DANVERSE builds
              </span>
            </span>
            <span className="reveal-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,8vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white uppercase">
                high-performance
              </span>
            </span>
            <span className="reveal-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,8vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white uppercase">
                digital platforms.
              </span>
            </span>
          </h1>

          <div className="hero-cta flex flex-col items-center gap-8">
            <p className="max-w-[600px] text-center text-lg font-light leading-relaxed text-white/60 sm:text-xl">
              We leverage cutting-edge technology to deliver robust, future-proof digital infrastructure and cinematic brand experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/work"
                className="group relative flex h-14 items-center justify-center border border-white px-12 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-black"
              >
                View Our Work
              </Link>
              <Link
                href="/checkout"
                className="group relative flex h-14 items-center justify-center bg-white px-12 text-[10px] font-bold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:bg-transparent hover:text-white hover:border hover:border-white"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Wacus style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
