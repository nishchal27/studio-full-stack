import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const accessibilityTargets = ["/", "/preview/example", "/studio/example"] as const;

test.afterAll(async () => {
  await writeFile(
    path.join(process.cwd(), "a11y-report.json"),
    `${JSON.stringify(accessibilityReports, null, 2)}\n`,
  );
});

const accessibilityReports: Array<{
  url: string;
  criticalViolations: number;
  violations: Array<{ id: string; impact: string | null; description: string }>;
}> = [];

for (const target of accessibilityTargets) {
  test(`${target} has no critical accessibility violations`, async ({ page }) => {
    await page.goto(target);

    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter(
      (violation) => violation.impact === "critical",
    );

    accessibilityReports.push({
      url: target,
      criticalViolations: criticalViolations.length,
      violations: criticalViolations.map((violation) => ({
        id: violation.id,
        impact: violation.impact ?? null,
        description: violation.description,
      })),
    });

    // CI fails only on critical axe findings so accessibility enforcement remains strict
    // without making early product scaffolding brittle on lower-impact advisory checks.
    expect(criticalViolations).toEqual([]);
  });
}

test("studio controls are keyboard reachable", async ({ page }) => {
  await page.goto("/studio/example");
  await page.keyboard.press("Tab");

  await expect(page.locator(":focus")).toBeVisible();
});

test("reduced motion preference keeps Studio usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/studio/example");

  await expect(page.getByRole("heading", { name: "Studio: example" })).toBeVisible();
});
