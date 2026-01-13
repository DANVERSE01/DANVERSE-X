import { NextResponse } from "next/server"

const SOUTH_ASIA = new Set(["IN", "PK", "BD"])

export async function GET(request: Request) {
  // Use standard headers for country detection
  // x-country-code and cf-ipcountry are common in many CDNs (Cloudflare, etc.)
  const countryHeader =
    request.headers.get("x-country-code") ||
    request.headers.get("cf-ipcountry") ||
    ""

  let country = countryHeader.toUpperCase()

  // If no server-provided country, use heuristics from Accept-Language
  if (!country) {
    const acceptLang = request.headers.get("accept-language") || ""
    if (/-(IN|PK|BD)\b/i.test(acceptLang)) {
      const match = acceptLang.match(/-(IN|PK|BD)\b/i)
      country = match ? match[1].toUpperCase() : ""
    }
  }

  const isSouthAsia = SOUTH_ASIA.has(country)
  const currency = isSouthAsia ? "INR" : "USD"

  return NextResponse.json({
    country: country || null,
    region: isSouthAsia ? "SOUTH_ASIA" : "OTHER",
    currency, // "INR" or "USD"
  })
}
