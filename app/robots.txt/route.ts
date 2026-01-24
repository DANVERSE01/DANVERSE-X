export async function GET() {
  const lines = [
    "# robots.txt for DANVERSE",
    "User-agent: GPTBot",
    "Allow: /",
    "Disallow: /privacy",
    "Disallow: /terms",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin/",
    "",
    "Sitemap: https://danverseai.vercel.app/sitemap.xml",
  ].join("\n")
  return new Response(lines, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
