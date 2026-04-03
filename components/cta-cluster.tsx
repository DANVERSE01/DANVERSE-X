import { Button } from "@/components/ui/button"
import { resolveCtaHref, type CtaDefinition } from "@/lib/cta"

interface CtaClusterProps {
  align?: "center" | "left"
  primary: CtaDefinition
  secondary?: CtaDefinition
}

function alignmentClasses(align: NonNullable<CtaClusterProps["align"]>) {
  if (align === "left") {
    return {
      body: "items-start text-left",
      buttons: "justify-start",
      meta: "items-start text-left",
    }
  }

  return {
    body: "items-center text-center",
    buttons: "justify-center",
    meta: "items-center text-center",
  }
}

function CtaMeta({ definition }: { definition: CtaDefinition }) {
  return (
    <div className="max-w-[30rem]">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-acid-lime)]">
        {definition.durationLabel}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/68">{definition.whatHappensText}</p>
    </div>
  )
}

export function CtaCluster({ align = "center", primary, secondary }: CtaClusterProps) {
  const classes = alignmentClasses(align)

  return (
    <div className={`flex flex-col gap-5 ${classes.body}`}>
      <div className={`flex w-full flex-col gap-3 sm:flex-row ${classes.buttons}`}>
        <Button asChild className="cta-primary rounded-full px-7 py-3 font-semibold text-white">
          <a href={resolveCtaHref(primary)} target={primary.channel === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer">
            {primary.label}
          </a>
        </Button>
        {secondary ? (
          <Button asChild variant="outline" className="cta-secondary rounded-full px-7 py-3 font-semibold text-white">
            <a
              href={resolveCtaHref(secondary)}
              target={secondary.channel === "whatsapp" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {secondary.label}
            </a>
          </Button>
        ) : null}
      </div>

      <div className={`grid gap-4 ${secondary ? "lg:grid-cols-2" : ""} ${classes.meta}`}>
        <CtaMeta definition={primary} />
        {secondary ? <CtaMeta definition={secondary} /> : null}
      </div>
    </div>
  )
}
