import { describe, expect, it } from "vitest";

import { calculateVersionChange } from "@/lib/semver/calculateVersionChange";
import { createRenderablePageFactory } from "@/tests/factories/pages";
import { createSection } from "@/tests/factories/sections";

describe("semver engine", () => {
  it("generates a patch version for prop updates", () => {
    const previousPage = createRenderablePageFactory();
    const currentPage = createRenderablePageFactory({
      sections: [
        createSection("hero", {
          props: {
            heading: "Updated heading",
          },
        }),
      ],
    });

    expect(
      calculateVersionChange({
        previousPage,
        previousVersion: "1.0.0",
        currentPage,
      }),
    ).toMatchObject({
      change: "patch",
      version: "1.0.1",
      changelog: ["Updated hero section"],
    });
  });

  it("generates a minor version for added sections", () => {
    const previousPage = createRenderablePageFactory();
    const currentPage = createRenderablePageFactory({
      sections: [createSection("hero"), createSection("cta", { id: "cta-1" })],
    });

    expect(
      calculateVersionChange({
        previousPage,
        previousVersion: "1.0.1",
        currentPage,
      }).version,
    ).toBe("1.1.0");
  });

  it("generates a major version for removed sections", () => {
    const previousPage = createRenderablePageFactory({
      sections: [createSection("hero"), createSection("cta", { id: "cta-1" })],
    });
    const currentPage = createRenderablePageFactory({
      sections: [createSection("hero")],
    });

    expect(
      calculateVersionChange({
        previousPage,
        previousVersion: "1.1.0",
        currentPage,
      }).version,
    ).toBe("2.0.0");
  });
});
