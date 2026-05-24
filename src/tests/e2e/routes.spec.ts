import { expect, test } from "@playwright/test";

test("preview placeholder renders", async ({ page }) => {
  const response = await page.goto("/preview/example");

  expect(response?.ok()).toBe(true);
});

test("studio renders and edits through the shared preview surface", async ({ page }) => {
  await page.goto("/studio/example");

  await expect(page.getByRole("heading", { name: "Studio: example" })).toBeVisible();
  await page.getByLabel("Heading").fill("Edited hero heading");

  await expect(page.getByRole("heading", { name: "Edited hero heading" })).toBeVisible();
});

test("viewer role cannot access studio", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "page_studio_role",
      value: "viewer",
      url: "http://localhost:3000",
    },
  ]);

  await page.goto("/studio/example");

  await expect(page).toHaveURL("/?error=studio-forbidden");
});

test("demo role query params switch Studio permissions", async ({ page }) => {
  await page.goto("/studio/example?role=publisher");

  await expect(page.getByText("Role: publisher")).toBeVisible();
  await expect(page.getByRole("button", { name: "Publish draft" })).toBeEnabled();

  await page.goto("/studio/example?role=viewer");

  await expect(page).toHaveURL("/?error=studio-forbidden");
});
