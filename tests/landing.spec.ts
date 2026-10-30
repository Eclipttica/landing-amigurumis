import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("landing de Punto & Encanto", () => {
  test("estructura, orden de secciones y recursos", async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toContainText("Teje tus");
    await expect(title).toContainText("amigurumis");
    await expect(
      page.getByRole("heading", { name: /Pensé que era difícil/ }),
    ).toBeVisible();
    await expect(page.locator(".fomo-top-bar")).toContainText(
      "Inscripciones abiertas",
    );
    await expect(page.locator(".hook__stat")).toHaveCount(4);

    const sectionOrder = await page.evaluate(() => {
      const topBar = document.querySelector(".fomo-top-bar");
      const hero = document.querySelector(".hero");
      const hook = document.querySelector(".hook");
      const reasons = document.querySelector(".reasons");
      const program = document.querySelector(".program");
      if (!topBar || !hero || !hook || !reasons || !program) return false;
      const topBarBeforeHero = Boolean(
        topBar.compareDocumentPosition(hero) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      );
      const hookBefore = Boolean(
        hook.compareDocumentPosition(reasons) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      const reasonsBefore = Boolean(
        reasons.compareDocumentPosition(program) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      return topBarBeforeHero && hookBefore && reasonsBefore;
    });
    expect(sectionOrder).toBe(true);

    await expect(page.locator("header")).toHaveCount(0);
    await expect(page.locator("nav")).toHaveCount(0);
    await expect(page.locator("form, input, textarea, select")).toHaveCount(0);
    await expect(page.locator(".access__course img")).toHaveAttribute(
      "alt",
      /Mockup del curso Crochet Paso a Paso/,
    );

    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            image.evaluate((element) => {
              const img = element as HTMLImageElement;
              return img.complete && img.naturalWidth > 0;
            }),
          { timeout: 15_000 },
        )
        .toBe(true);
    }

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `artifacts/${testInfo.project.name}-full.png`, fullPage: true });
    await page.screenshot({ path: `artifacts/${testInfo.project.name}-hero.png` });

    expect(errors).toEqual([]);
  });

  test("los testimonios se reproducen en horizontal, sin sonido, y abren el modal con sonido", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    await page.locator(".hook").scrollIntoViewIfNeeded();
    const inlineVideos = page.locator(".reel video");
    await expect(inlineVideos).toHaveCount(2);
    const first = inlineVideos.first();
    const firstBox = await first.boundingBox();
    expect(firstBox).not.toBeNull();
    if (firstBox) expect(firstBox.width).toBeGreaterThan(firstBox.height);
    await expect(first).toHaveJSProperty("muted", true);
    await expect(first).toHaveJSProperty("loop", true);
    await expect(first).toHaveJSProperty("autoplay", true);
    await expect(first).toHaveJSProperty("playsInline", true);
    await expect
      .poll(() => first.evaluate((element) => (element as HTMLVideoElement).readyState))
      .toBeGreaterThanOrEqual(1);
    await expect
      .poll(() => first.evaluate((element) => (element as HTMLVideoElement).paused))
      .toBe(false);

    const trigger = page.getByRole("button", {
      name: "Abrir testimonio con sonido: Su primera pieza",
    });
    await trigger.click();

    const dialog = page.getByRole("dialog", {
      name: "Testimonio: Su primera pieza",
    });
    await expect(dialog).toBeVisible();
    const video = dialog.locator("video");
    await expect(video).toHaveAttribute("src", "/videos/testimonio-uno-web.mp4");
    await expect(video).toHaveJSProperty("controls", true);
    await expect(video).toHaveJSProperty("autoplay", true);
    await expect(video).toHaveJSProperty("muted", false);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("el modal de testimonio se abre grande y carga el video", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: "Abrir testimonio con sonido: Su primera pieza" })
      .click();

    const dialog = page.getByRole("dialog", {
      name: "Testimonio: Su primera pieza",
    });
    const video = dialog.locator("video");
    const dialogBox = await dialog.boundingBox();
    const viewport = page.viewportSize();

    expect(dialogBox).not.toBeNull();
    expect(viewport).not.toBeNull();
    if (!dialogBox || !viewport) return;

    expect(dialogBox.width).toBeGreaterThan(viewport.width > 700 ? 500 : 360);
    expect(dialogBox.height).toBeGreaterThan(viewport.width > 700 ? 700 : 560);

    await expect
      .poll(() =>
        video.evaluate((element) => (element as HTMLVideoElement).videoWidth),
      )
      .toBe(720);
    await expect
      .poll(() =>
        video.evaluate((element) => (element as HTMLVideoElement).readyState),
      )
      .toBeGreaterThanOrEqual(1);
  });

  test("el CTA flotante aparece al desplazarse y apunta a WhatsApp", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const cta = page.locator(".floating-cta");
    await expect(cta).not.toHaveClass(/is-visible/);

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await expect(cta).toHaveClass(/is-visible/);
    await expect(cta).toHaveAttribute("href", /wa\.me/);
    await expect(cta).toHaveAttribute("target", "_blank");
  });

  test("los acordeones de módulos y preguntas frecuentes funcionan", async ({ page }) => {
    await page.goto("/");

    const modules = page.locator("details.module");
    await expect(modules.nth(0)).toHaveJSProperty("open", true);
    await modules.nth(1).locator("summary").click();
    await expect(modules.nth(1)).toHaveJSProperty("open", true);
    await expect(modules.nth(0)).toHaveJSProperty("open", false);

    const faq = page
      .locator("details.faq__item")
      .filter({ hasText: "¿Cómo accederé al taller?" });
    await faq.locator("summary").click();
    await expect(faq).toHaveJSProperty("open", true);
    await expect(faq.getByText(/Después de la confirmación del pago/)).toBeVisible();
    await faq.locator("summary").click();
    await expect(faq).toHaveJSProperty("open", false);
  });

  test("los CTA de inscripción apuntan a WhatsApp y no hay formularios", async ({ page }) => {
    await page.goto("/");

    const ctas = page.locator(
      ".fomo-top-bar__link, .hero-actions .button--primary, .enroll__panel .button--primary, .final__content .button--light, .floating-cta",
    );
    const count = await ctas.count();
    expect(count).toBe(5);
    for (let index = 0; index < count; index += 1) {
      await expect(ctas.nth(index)).toHaveAttribute("href", /wa\.me/);
      await expect(ctas.nth(index)).toHaveAttribute("target", "_blank");
    }

    await expect(page.getByText("Inscripción asistida por WhatsApp")).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
  });

  test("sin barreras automáticas de accesibilidad en página y modal", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const pageAudit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(pageAudit.violations).toEqual([]);

    await page
      .getByRole("button", { name: "Abrir testimonio con sonido: Su primera pieza" })
      .click();
    await expect(page.locator(".modal-inner")).toHaveCSS("opacity", "1");

    const modalAudit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(modalAudit.violations).toEqual([]);
  });

  test("sin desbordamiento horizontal en anchos comunes", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    for (const width of [320, 360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(120);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });
});

