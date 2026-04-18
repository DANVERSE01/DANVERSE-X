"use client"

export function LightField() {
  return (
    <div className="light-field" aria-hidden="true">
      <span className="light-field__beam light-field__beam--one" />
      <span className="light-field__beam light-field__beam--two" />
      <span className="light-field__beam light-field__beam--three" />
    </div>
  )
}
