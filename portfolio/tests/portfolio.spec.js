import { test, expect } from "@playwright/test";

const command = async (page, text) => {
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await input.fill(text);
  await input.press("Enter");
};

test("terminal commands, history, completion, and safe output", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await command(page, "help");
  await expect(
    page.getByRole("button", { name: "whoami", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".command-row")).toHaveCount(7);
  await command(page, "stack");
  await expect(page.locator(".command-response").last()).toContainText(
    "PostgreSQL",
  );
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await input.press("ArrowUp");
  await expect(input).toHaveValue("stack");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("");
  await input.fill("pro");
  await input.press("Tab");
  await expect(input).toHaveValue("projects");
  await input.press("Enter");
  await expect(page.locator(".command-response").last()).toContainText(
    "Cache-cool",
  );
  await command(page, "echo <script>alert(1)</script>");
  await expect(page.locator(".command-response").last()).toHaveText(
    "<script>alert(1)</script>",
  );
  await command(page, "missing-command");
  await expect(page.locator(".command-response").last()).toContainText(
    "command not found",
  );
  await command(page, "cat stack.json");
  await expect(page.locator(".command-response").last()).toContainText(
    "LangGraph",
  );
  await command(page, "now");
  await expect(
    page
      .locator(".command-response")
      .last()
      .getByRole("link", { name: /LinkedIn/ }),
  ).toHaveAttribute("href", /linkedin/);
  await command(page, "clear");
  await expect(page.locator(".terminal-entry")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("résumé dialog, download, navigation, and project stories", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await command(page, "resume");
  await expect(page.getByRole("dialog")).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download résumé/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    "Muhammad-Sadegh-Nematpour-Resume.md",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#resume-dialog")).not.toBeVisible();
  await command(page, "cd projects");
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(page.locator(".project-details").first()).toContainText(
    "Why I built it",
  );
});

test("the sketch layout: full-screen shell, then navigation, intro, timeline, and projects", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const layout = await page.evaluate(() => {
    const box = (selector) =>
      document.querySelector(selector).getBoundingClientRect();
    return {
      viewport: innerHeight,
      terminal: box(".terminal-landing").height,
      nav: box(".site-header").top,
      intro: box("#about").top,
      experience: box("#experience").top,
      education: box("#education").top,
      projects: box("#work").top,
    };
  });
  expect(layout.terminal).toBe(layout.viewport);
  expect(layout.nav).toBeGreaterThanOrEqual(layout.viewport);
  expect(layout.intro).toBeGreaterThan(layout.nav);
  expect(layout.experience).toBeGreaterThan(layout.intro);
  expect(layout.education).toBeGreaterThan(layout.experience);
  expect(layout.projects).toBeGreaterThan(layout.education);
  await expect(
    page.getByRole("textbox", { name: "Terminal command" }),
  ).toHaveAttribute("placeholder", "help");
  await expect(page.locator(".terminal-entry")).toHaveCount(0);
  await expect(
    page.locator(".shell-masthead, .shell-keyboard-hint"),
  ).toHaveCount(0);
  await expect(page.locator(".brand-logo")).toHaveCount(2);
  await expect
    .poll(() =>
      page
        .locator(".brand-logo")
        .first()
        .evaluate((img) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole("link", { name: /^SCROLL/ }).click();
  await expect(page.locator("#about")).toBeInViewport();
});

for (const width of [360, 390, 768, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("textbox", { name: "Terminal command" }),
    ).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  });
}
