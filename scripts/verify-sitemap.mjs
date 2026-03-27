import { spawn } from "node:child_process"
import path from "node:path"

const PORT = Number(process.env.SITEMAP_VERIFY_PORT ?? 3100)
const BASE_URL = `http://127.0.0.1:${PORT}`
const CRITICAL_PATHS = new Set(["/", "/cinematic-ads", "/branding", "/websites", "/3d-product-rendering"])

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer() {
  for (let attempt = 0; attempt < 45; attempt += 1) {
    try {
      const response = await fetch(`${BASE_URL}/sitemap.xml`, { cache: "no-store" })

      if (response.ok) {
        return
      }
    } catch {
      // Keep waiting until the production server is ready.
    }

    await wait(1000)
  }

  throw new Error(`Timed out waiting for ${BASE_URL}/sitemap.xml`)
}

function parseSitemapLocations(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1])
}

async function main() {
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next")
  let serverOutput = ""

  const server = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(PORT)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  })

  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString()
  })

  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString()
  })

  try {
    await waitForServer()

    const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`, { cache: "no-store" })

    if (!sitemapResponse.ok) {
      throw new Error(`Unable to load sitemap.xml (${sitemapResponse.status})`)
    }

    const sitemapXml = await sitemapResponse.text()
    const urls = parseSitemapLocations(sitemapXml)

    if (urls.length === 0) {
      throw new Error("No URLs were found in sitemap.xml")
    }

    const brokenPages = []
    const criticalFailures = []

    for (const url of urls) {
      const pageUrl = new URL(url)
      const localUrl = `${BASE_URL}${pageUrl.pathname}${pageUrl.search}`
      const response = await fetch(localUrl, { cache: "no-store" })

      console.log(`${response.status} ${pageUrl.pathname}`)

      if (!response.ok) {
        brokenPages.push({ path: pageUrl.pathname, status: response.status })
      }

      if (response.status === 404 && CRITICAL_PATHS.has(pageUrl.pathname)) {
        criticalFailures.push(pageUrl.pathname)
      }
    }

    if (brokenPages.length > 0) {
      console.log("Broken sitemap pages:")

      for (const page of brokenPages) {
        console.log(`- ${page.path} (${page.status})`)
      }
    }

    if (criticalFailures.length > 0) {
      throw new Error(`Critical sitemap routes returned 404: ${criticalFailures.join(", ")}`)
    }
  } finally {
    server.kill()
  }

  if (serverOutput.trim()) {
    console.log(serverOutput.trim())
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
