import { expect, test } from "@playwright/test";

test("preview placeholder renders", async ({ page }) => {
  await page.goto("/preview/example");

  await expect(page.getByRole("heading", { name: "Content is unavailable" })).toBeVisible();
});

test("studio placeholder renders", async ({ page }) => {
  await page.goto("/studio/example");

  await expect(page.getByRole("heading", { name: "Studio: example" })).toBeVisible();
});
