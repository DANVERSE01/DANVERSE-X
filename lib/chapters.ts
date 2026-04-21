export const CHAPTERS = [
  { id: "hero", number: "01", label: "Entry", kicker: "Ingress" },
  { id: "statement", number: "02", label: "Statement", kicker: "Thesis" },
  { id: "works", number: "03", label: "Selected works", kicker: "Objects" },
  { id: "identity", number: "04", label: "Identity", kicker: "Position" },
  { id: "expertise", number: "05", label: "Discipline", kicker: "Capability" },
  { id: "process", number: "06", label: "Method", kicker: "Sequence" },
  { id: "contact", number: "07", label: "Admission", kicker: "Contact" },
  { id: "hold", number: "08", label: "Hold", kicker: "Close" },
] as const

export type ChapterId = (typeof CHAPTERS)[number]["id"]

export function getChapter(id: ChapterId) {
  return CHAPTERS.find((c) => c.id === id)!
}
