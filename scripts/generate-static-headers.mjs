import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { getNetlifyHeadersFile } from "./security-headers.mjs"
import { getNetlifyRedirectsFile } from "./static-redirects.mjs"

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDir, "..")
const publicDir = path.join(projectRoot, "public")
const headersFile = path.join(publicDir, "_headers")
const redirectsFile = path.join(publicDir, "_redirects")

await mkdir(publicDir, { recursive: true })
await writeFile(headersFile, getNetlifyHeadersFile(), "utf8")
await writeFile(redirectsFile, getNetlifyRedirectsFile(), "utf8")

console.info(`Generated ${path.relative(projectRoot, headersFile)}`)
console.info(`Generated ${path.relative(projectRoot, redirectsFile)}`)
