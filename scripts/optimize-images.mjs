import { stat, readdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const SIZE_THRESHOLD_BYTES = 200 * 1024
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"])

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
      continue
    }

    files.push(fullPath)
  }

  return files
}

async function optimizeImage(filePath) {
  const beforeStats = await stat(filePath)

  if (beforeStats.size <= SIZE_THRESHOLD_BYTES) {
    return null
  }

  const targetPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp")
  await sharp(filePath).webp({ quality: 82 }).toFile(targetPath)

  const afterStats = await stat(targetPath)

  return {
    source: filePath,
    target: targetPath,
    beforeBytes: beforeStats.size,
    afterBytes: afterStats.size,
  }
}

async function main() {
  const files = await walk(PUBLIC_DIR)
  const candidates = files.filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
  const results = []

  for (const filePath of candidates) {
    const result = await optimizeImage(filePath)

    if (result) {
      results.push(result)
    }
  }

  if (results.length === 0) {
    console.log("No JPG or PNG files over 200 KB were found in public/.")
    return
  }

  for (const result of results) {
    console.log(
      `${path.relative(process.cwd(), result.source)} -> ${path.relative(process.cwd(), result.target)} | ${formatSize(result.beforeBytes)} -> ${formatSize(result.afterBytes)}`
    )
  }

  const totalBefore = results.reduce((sum, item) => sum + item.beforeBytes, 0)
  const totalAfter = results.reduce((sum, item) => sum + item.afterBytes, 0)
  console.log(`Optimized ${results.length} images | ${formatSize(totalBefore)} -> ${formatSize(totalAfter)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
