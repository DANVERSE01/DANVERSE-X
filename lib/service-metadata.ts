import type { Metadata } from "next"
import { env } from "@/lib/env"

interface ServiceMetadataInput {
  path: string
  title: string
  description: string
}

export function createServiceMetadata({ path, title, description }: ServiceMetadataInput): Metadata {
  const imageUrl = `${env.NEXT_PUBLIC_SITE_URL}/images/danverse-logo.png`
  const pageUrl = `${env.NEXT_PUBLIC_SITE_URL}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    category: "creative service",
    openGraph: {
      title,
      description,
      siteName: "DANVERSE",
      type: "website",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
