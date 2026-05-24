import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page has no critical accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();
  const criticalViolations = results.violations.filter((violation) =>
    violation.impact ? ["critical"].includes(violation.impact) : false,
  );

  expect(criticalViolations).toEqual([]);
});
