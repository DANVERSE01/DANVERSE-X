import { SiteHeaderArchviz } from "./_components/site-header-archviz"
import { HeroArchviz } from "./_components/hero-archviz"
import { FeaturesArchviz } from "./_components/features-archviz"
import { LogoMarqueeArchviz } from "./_components/logo-marquee-archviz"
import { PricingArchviz } from "./_components/pricing-archviz"
import { FooterArchviz } from "./_components/footer-archviz"
import Script from "next/script"

export const dynamic = "force-static"

export const metadata = {
  title: "Architectural Visualization Studio | 3D CGI by DANVERSE",
  description:
    "DANVERSE architectural visualization — photoreal 3D renders and cinematic CGI walkthroughs that showcase your designs with stunning realism.",
  alternates: {
    canonical: "https://danverse.ai/3D-architecture-visualization-studio",
  },
  openGraph: {
    title: "Architectural Visualization Studio | 3D CGI by DANVERSE",
    description:
      "DANVERSE architectural visualization — photoreal 3D renders and cinematic CGI walkthroughs that showcase your designs with stunning realism.",
    url: "https://danverse.ai/3D-architecture-visualization-studio",
    type: "website",
  },
}

export default function Page() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://danverse.ai/3D-architecture-visualization-studio",
    name: "Architectural Visualization Studio | 3D CGI by DANVERSE",
    description:
      "DANVERSE architectural visualization — photoreal 3D renders and cinematic CGI walkthroughs that showcase your designs with stunning realism.",
    url: "https://danverse.ai/3D-architecture-visualization-studio",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeaderArchviz />
        <HeroArchviz />
        <FeaturesArchviz />
        <LogoMarqueeArchviz />
        <PricingArchviz />
        <FooterArchviz />
      </main>

      <Script
        id="archviz-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
