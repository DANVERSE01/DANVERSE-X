/**
 * Lightweight text splitter for animation purposes.
 * Wraps words or characters in spans while preserving screen-reader access.
 *
 * Usage:
 *   const { chars, words, lines, revert } = splitText(element, "chars")
 *   gsap.from(chars, { yPercent: 110, stagger: 0.02, duration: 0.8 })
 */

export type SplitType = "chars" | "words" | "lines"

export interface SplitResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  lines: HTMLElement[]
  revert: () => void
}

export function splitText(element: HTMLElement, type: SplitType = "words"): SplitResult {
  const originalHTML = element.innerHTML
  const originalAriaLabel = element.getAttribute("aria-label") ?? element.textContent ?? ""

  // Set aria-label so screen readers read original text
  if (!element.getAttribute("aria-label")) {
    element.setAttribute("aria-label", originalAriaLabel)
  }
  element.setAttribute("aria-hidden", "false")

  const chars: HTMLElement[] = []
  const words: HTMLElement[] = []
  const lines: HTMLElement[] = []

  // Split into words first
  const rawText = element.textContent ?? ""
  const wordList = rawText.split(/\s+/).filter(Boolean)

  element.innerHTML = ""

  wordList.forEach((word, wi) => {
    const wordSpan = document.createElement("span")
    wordSpan.className = "split-word"
    wordSpan.style.display = "inline-block"
    wordSpan.style.overflow = "hidden"
    wordSpan.style.verticalAlign = "bottom"
    wordSpan.setAttribute("aria-hidden", "true")
    words.push(wordSpan)

    if (type === "chars") {
      ;[...word].forEach((char) => {
        const charSpan = document.createElement("span")
        charSpan.className = "split-char"
        charSpan.style.display = "inline-block"
        charSpan.style.willChange = "transform, opacity"
        charSpan.textContent = char
        wordSpan.appendChild(charSpan)
        chars.push(charSpan)
      })
    } else {
      wordSpan.textContent = word
    }

    element.appendChild(wordSpan)

    // Space between words
    if (wi < wordList.length - 1) {
      const space = document.createTextNode(" ")
      element.appendChild(space)
    }
  })

  const revert = () => {
    element.innerHTML = originalHTML
    element.removeAttribute("aria-hidden")
    if (!originalAriaLabel) {
      element.removeAttribute("aria-label")
    }
  }

  return { chars, words, lines, revert }
}
