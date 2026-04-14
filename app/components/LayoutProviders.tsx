"use client"

import type { ReactNode } from "react"
import { SmoothScroll } from "@/app/components/SmoothScroll"
import { CustomCursor } from "@/app/components/CustomCursor"
import { FilmGrain } from "@/app/components/FilmGrain"
import { Preloader } from "@/app/components/Preloader"

export function LayoutProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <FilmGrain />
      <CustomCursor />
      <Preloader />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </>
  )
}
