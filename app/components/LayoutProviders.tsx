"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"
import { SmoothScroll } from "@/app/components/SmoothScroll"
import { Preloader } from "@/app/components/Preloader"

const FilmGrain = dynamic(() => import("@/app/components/FilmGrain").then((m) => ({ default: m.FilmGrain })), { ssr: false })
const CustomCursor = dynamic(() => import("@/app/components/CustomCursor").then((m) => ({ default: m.CustomCursor })), { ssr: false })
const PageTransition = dynamic(() => import("@/app/components/PageTransition").then((m) => ({ default: m.PageTransition })), { ssr: false })

export function LayoutProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <FilmGrain />
      <CustomCursor />
      <Preloader />
      <PageTransition />
      <SmoothScroll>
        <PageTransition>
          {children}
        </PageTransition>
      </SmoothScroll>
    </>
  )
}
