import { access, readFile } from "node:fs/promises"
import path from "node:path"
import { constants } from "node:fs"

const OUT_DIR = path.join(process.cwd(), "out")
const SITEMAP_PATH = path.join(OUT_DIR, "sitemap.xml")
const ROBOTS_PATH = path.join(OUT_DIR, "robots.txt")
const CRITICAL_PATHS = new Set(["/", "/cinematic-ads", "/branding", "/websites", "/3d-product-rendering"])

function parseSitemapLocations(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1])
}

async function ensureFileExists(targetPath) {
  await access(targetPath, constants.F_OK)
}

async function hasExportedRoute(pathname) {
  const normalized = pathname === "/" ? "" : pathname.replace(/^\/+|\/+$/g, "")
  const candidates =
    normalized.length === 0
      ? [path.join(OUT_DIR, "index.html")]
      : [path.join(OUT_DIR, `${normalized}.html`), path.join(OUT_DIR, normalized, "index.html")]

  for (const candidate of candidates) {
    try {
      await ensureFileExists(candidate)
      return candidate
    } catch {
      // Try the next export shape.
    }
  }

  return null
}

async function main() {
  await ensureFileExists(SITEMAP_PATH)
  await ensureFileExists(ROBOTS_PATH)

  const [sitemapXml, robotsTxt] = await Promise.all([readFile(SITEMAP_PATH, "utf8"), readFile(ROBOTS_PATH, "utf8")])

  const urls = parseSitemapLocations(sitemapXml)

  if (urls.length === 0) {
    throw new Error("No URLs were found in out/sitemap.xml")
  }

  if (!robotsTxt.includes("Sitemap:")) {
    throw new Error("out/robots.txt is missing a Sitemap directive")
  }

  const missingRoutes = []
  const criticalFailures = []

  for (const url of urls) {
    const pathname = new URL(url).pathname
    const resolvedFile = await hasExportedRoute(pathname)

    if (!resolvedFile) {
      missingRoutes.push(pathname)
      if (CRITICAL_PATHS.has(pathname)) {
        criticalFailures.push(pathname)
      }
      continue
    }

    console.log(`OK ${pathname} -> ${path.relative(process.cwd(), resolvedFile)}`)
  }

  if (missingRoutes.length > 0) {
    console.warn("Missing exported routes referenced by sitemap:")
    for (const route of missingRoutes) {
      console.warn(`- ${route}`)
    }
  }

  if (criticalFailures.length > 0) {
    throw new Error(`Critical sitemap routes are missing from out/: ${criticalFailures.join(", ")}`)
  }

  console.log(`Verified sitemap.xml (${urls.length} URLs) and robots.txt against exported files in out/.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
