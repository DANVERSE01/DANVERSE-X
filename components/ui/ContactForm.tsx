"use client"

import { FormEvent, useState } from "react"
import { SignalButton } from "@/components/ui/SignalButton"
import { useDanverseStore } from "@/lib/store"

export function ContactForm() {
  const formState = useDanverseStore((state) => state.formState)
  const setFormState = useDanverseStore((state) => state.setFormState)
  const [error, setError] = useState<string | null>(null)
  const submitting = formState === "submitting"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setFormState("submitting")
    setError(null)

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? ""),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Transmission failed.")
      }

      form.reset()
      setFormState("success")
    } catch (submissionError) {
      setFormState("error")
      setError(submissionError instanceof Error ? submissionError.message : "Transmission failed.")
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Project type</span>
        <select name="projectType" defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="Cinematic Brand Identity">Cinematic Brand Identity</option>
          <option value="AI-Powered Content Systems">AI-Powered Content Systems</option>
          <option value="Interactive Digital Experiences">Interactive Digital Experiences</option>
          <option value="Motion & 3D Production">Motion &amp; 3D Production</option>
          <option value="Launch Campaign Strategy">Launch Campaign Strategy</option>
          <option value="Creative Direction & Consulting">Creative Direction &amp; Consulting</option>
        </select>
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <SignalButton type="submit" disabled={submitting}>
        {submitting ? "TRANSMITTING..." : "START THE TRANSMISSION →"}
      </SignalButton>
      <div aria-live="polite">
        {formState === "success" ? <p className="contact-form__status">Transmission received.</p> : null}
        {error ? <p className="contact-form__error">{error}</p> : null}
      </div>
    </form>
  )
}
