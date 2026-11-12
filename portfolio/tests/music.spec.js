import { test, expect } from "@playwright/test";

const command = async (page, text) => {
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await input.fill(text);
  await input.press("Enter");
};

test("music starts only on play, pauses, and resumes the same loop", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const NativeAudioContext = window.AudioContext;
    window.__musicContexts = [];
    window.AudioContext = class extends NativeAudioContext {
      constructor(...args) {
        super(...args);
        window.__musicContexts.push(this);
      }
      createBufferSource() {
        const source = super.createBufferSource();
        window.__musicSource = source;
        return source;
      }
    };
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => window.__musicContexts.length)).toBe(0);
  await command(page, "pause");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Music paused.",
  );
  expect(await page.evaluate(() => window.__musicContexts.length)).toBe(0);
  await command(page, "play");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Playing 8-bit music.",
  );
  const playback = await page.evaluate(() => ({
    contexts: window.__musicContexts.length,
    state: window.__musicContexts[0].state,
    looping: window.__musicSource.loop,
    duration: window.__musicSource.buffer.duration,
    audible: window.__musicSource.buffer
      .getChannelData(0)
      .some((sample) => Math.abs(sample) > 0.1),
  }));
  expect(playback.contexts).toBe(1);
  expect(playback.state).toBe("running");
  expect(playback.looping).toBe(true);
  expect(playback.duration).toBeGreaterThan(10);
  expect(playback.audible).toBe(true);
  await command(page, "pause");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Music paused.",
  );
  expect(await page.evaluate(() => window.__musicContexts[0].state)).toBe(
    "suspended",
  );
  await command(page, "play");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Playing 8-bit music.",
  );
  expect(await page.evaluate(() => window.__musicContexts.length)).toBe(1);
  expect(await page.evaluate(() => window.__musicContexts[0].state)).toBe(
    "running",
  );
  await command(page, "play");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Already playing.",
  );
  await command(page, "pause");
  await expect(page.locator(".command-response").last()).toHaveText(
    "Music paused.",
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/assets/msnp-white.svg",
  );
  const icon = await page.request.get("/assets/msnp-white.svg");
  expect(icon.ok()).toBe(true);
});
