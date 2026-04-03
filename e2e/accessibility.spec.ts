import { expect, test } from "@playwright/test"

test("homepage keeps navigation, manifest, and accessible labels intact", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/DANVERSE/i)
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeVisible()
  await expect(page.getByRole("heading", { level: 1, name: /we build visual advantage/i })).toBeVisible()
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest")

  const unnamedInteractiveElements = await page
    .locator('a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]')
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          const htmlElement = element as HTMLElement
          const inputElement = element as HTMLInputElement

          return !(
            htmlElement.getAttribute("aria-label")?.trim() ||
            htmlElement.getAttribute("aria-labelledby")?.trim() ||
            htmlElement.getAttribute("title")?.trim() ||
            htmlElement.textContent?.trim() ||
            inputElement.value?.trim() ||
            inputElement.placeholder?.trim()
          )
        })
        .map((element) => element.outerHTML)
    )

  expect(unnamedInteractiveElements).toEqual([])

  const imagesMissingAlt = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => !image.hasAttribute("alt")).map((image) => image.outerHTML)
  )

  expect(imagesMissingAlt).toEqual([])

  const serviceWorkerResponse = await page.request.get("/sw.js")
  expect(serviceWorkerResponse.ok()).toBeTruthy()
})

test("work archive route loads with the expected editorial heading", async ({ page }) => {
  await page.goto("/work")

  await expect(page).toHaveTitle(/Selected Work/i)
  await expect(page.getByRole("heading", { level: 1, name: /direction, proof, and rollout logic/i })).toBeVisible()
  await expect(page.locator("#jacob-bugatti").getByRole("heading", { name: /The Watch the World Wasn't Ready For/i })).toBeVisible()
})
