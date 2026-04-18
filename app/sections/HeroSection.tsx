"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MagneticButton } from "@/app/components/MagneticButton"
import { gsap, registerGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const objectY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"])

  useEffect(() => {
    const title = titleRef.current
    const meta = metaRef.current
    const action = actionRef.current
    if (!title || !meta || !action) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    registerGSAP()
    const split = new SplitText(title, { type: "lines", mask: "lines" })
    gsap.set([meta, action], { y: 24, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      stagger: 0.09,
      ease: "power4.out",
    })
      .to(meta, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.55")
      .to(action, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.38")

    const scan = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate(self) {
        sectionRef.current?.style.setProperty("--artifact-progress", self.progress.toFixed(3))
      },
    })

    return () => {
      tl.kill()
      scan.kill()
      split.revert()
    }
  }, [])

  return (
    <motion.section id="hero" ref={sectionRef} className="artifact-hero">
      <motion.div className="artifact-hero__object" style={{ y: objectY }} aria-hidden="true">
        <Image
          src="/images/work/shelby-alexandria/cover.webp"
          alt=""
          fill
          loading="eager"
          quality={75}
          sizes="(max-width: 680px) 90vw, 48rem"
        />
      </motion.div>

      <motion.figure className="artifact-hero__float artifact-hero__float--right" style={{ y: floatY }} aria-hidden="true">
        <Image
          src="/images/work/kova-cosmetics/cover.webp"
          alt=""
          fill
          loading="eager"
          quality={75}
          sizes="13rem"
        />
      </motion.figure>

      <div ref={metaRef} className="artifact-hero__meta">
        <span>Creative direction / Alexandria → GCC</span>
        <span>Brand · Motion · Digital · CGI</span>
      </div>

      <span className="artifact-hero__commitment">
        Discipline
        <br />
        before
        <br />
        release
      </span>

      <motion.div className="artifact-hero__copy" style={{ y: titleY }}>
        <h1 ref={titleRef} className="artifact-hero__title">
          Nothing
          <br />
          leaves
          <br />
          soft
        </h1>
        <div ref={actionRef} className="artifact-hero__cta">
          <MagneticButton href="/people" className="assembly-button">
            Seek admission
          </MagneticButton>
          <Link href="/work" className="artifact-hero__below" data-cursor="magnetic">
            View objects
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}
