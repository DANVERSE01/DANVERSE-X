"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { TxLabel } from "@/components/ui/TxLabel"
import { emitter } from "@/lib/events"
import { useDanverseStore } from "@/lib/store"

const services = [
  {
    number: "01",
    title: "Cinematic Brand Identity",
    description: "Identity systems built as moving proof, not static promise. Type, motion, and rhythm lock the first impression before the explanation arrives.",
    refs: [
      "/images/work/tag-heuer-carrera/cover.jpg",
      "/images/work/missha-time-revolution/cover.jpg",
    ],
  },
  {
    number: "02",
    title: "AI-Powered Content Systems",
    description: "Content systems that hold a single point of view while scaling the number of outputs. Direction stays human. Throughput becomes the multiplier.",
    refs: [
      "/images/work/modern-skincare/cover.jpg",
      "/images/work/missha-time-revolution/cover.jpg",
    ],
  },
  {
    number: "03",
    title: "Interactive Digital Experiences",
    description: "Interfaces that prove capability through interaction itself. Scroll, cursor, timing, and transition all carry the same signal instead of fighting it.",
    refs: ["/images/work/tag-heuer-carrera/cover.jpg", "/images/work/modern-skincare/cover.jpg"],
  },
  {
    number: "04",
    title: "Motion & 3D Production",
    description: "Motion and dimensional systems where the render is not decoration. Form, depth, and pace make the idea feel inevitable on first contact.",
    refs: ["/images/work/missha-time-revolution/cover.jpg", "/images/work/tag-heuer-carrera/cover.jpg"],
  },
  {
    number: "05",
    title: "Launch Campaign Strategy",
    description: "Launch structures built around the opening frame, the rollout sequence, and the assets that keep the same conviction from teaser to delivery.",
    refs: [
      "/images/work/modern-skincare/cover.jpg",
      "/images/work/tag-heuer-carrera/cover.jpg",
    ],
  },
  {
    number: "06",
    title: "Creative Direction & Consulting",
    description: "Direction that sharpens the idea before production expands it. The right constraints arrive early, so the finished work lands with more force.",
    refs: ["/images/work/modern-skincare/cover.jpg", "/images/work/tag-heuer-carrera/cover.jpg"],
  },
] as const

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const setActiveSection = useDanverseStore((state) => state.setActiveSection)

  useEffect(() => {
    const section = document.getElementById("tx-03")
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting)
        if (active) {
          setActiveSection("tx-03")
          emitter.emit("section-change", { id: "tx-03" })
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection])

  const active = services[activeIndex]

  return (
    <section id="tx-03" className="services-section tx-section">
      <div className="section-inner">
        <TxLabel>TX-03 / CAPABILITY</TxLabel>
        <div className="services-grid">
          <div className="service-list" role="tablist" aria-label="Services">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                className={`service-item ${index === activeIndex ? "is-active" : ""}`}
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls="service-detail"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span>{service.number}</span>
                <strong>{service.title}</strong>
              </button>
            ))}
          </div>
          <div className="service-panel" id="service-detail" role="tabpanel">
            <p>{active.description}</p>
            <div className="service-panel__refs">
              {active.refs.map((ref) => (
                <div key={ref} className="service-panel__thumb">
                  <Image src={ref} alt="" fill sizes="160px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
