import SplitType from "split-type"
import { ensureGsapPlugins, gsap } from "@/lib/gsap-config"

type SplitUnit = "chars" | "words" | "lines"
type SplitTypes = "lines,words,chars" | "lines,words" | "words,chars" | "lines" | "words" | "chars"

interface SplitAnimationOptions {
  unit?: SplitUnit
  duration?: number
  delay?: number
  stagger?: number
  yPercent?: number
  ease?: string
}

export function createSplitText(target: Element, types: SplitTypes = "lines,words,chars") {
  const split = new SplitType(target as HTMLElement, { types })

  return {
    split,
    chars: split.chars ?? [],
    words: split.words ?? [],
    lines: split.lines ?? [],
    revert: () => split.revert(),
  }
}

export function animateSplitIn(
  target: Element,
  {
    unit = "words",
    duration = 1,
    delay = 0,
    stagger = 0.05,
    yPercent = 110,
    ease = "power4.out",
  }: SplitAnimationOptions = {},
) {
  ensureGsapPlugins()

  const { chars, words, lines, revert } = createSplitText(target)
  const units = unit === "chars" ? chars : unit === "lines" ? lines : words.length ? words : chars

  gsap.set(units, {
    autoAlpha: 0,
    yPercent,
    willChange: "transform, opacity",
  })

  const animation = gsap.to(units, {
    autoAlpha: 1,
    yPercent: 0,
    duration,
    delay,
    stagger,
    ease,
    clearProps: "willChange",
  })

  return {
    units,
    animation,
    revert,
  }
}
