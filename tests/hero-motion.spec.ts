import { expect, test } from "@playwright/test";

test("movimiento reducido deja el hero estable y sin pin", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".hero-title")).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".hero-card__media img")).toHaveJSProperty("complete", true);

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);

  await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(700);
});

test("la entrada del hero termina y el parallax no bloquea el scroll", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  await expect
    .poll(() =>
      page.locator(".hero-visual").evaluate((element) => getComputedStyle(element).opacity),
    )
    .toBe("1");
  await expect(page.locator(".hero-title")).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);

  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(500);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(".hero-title")).toBeVisible();
});

test("movimiento reducido evita descargar el video ambiental", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("atelier-web.mp4")) videoRequests.push(request.url());
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".brand-story__video img")).toBeVisible();
  await expect(page.locator(".brand-story__video video")).toHaveCount(0);
  expect(videoRequests).toEqual([]);
});
