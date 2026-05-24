import { describe, expect, it } from "vitest";

import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import { createRenderablePageFactory } from "@/tests/factories/pages";
import { createUnsupportedSection } from "@/tests/factories/sections";

describe("createRenderablePage", () => {
  it("normalizes section defaults before validation", () => {
    const result = createRenderablePage(
      createRenderablePageFactory({
        sections: [
          {
            id: "hero-1",
            type: "hero",
            props: {
              heading: "Shared pipeline",
            },
          },
        ],
      }),
    );

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.page.sections[0]?.props).toMatchObject({
        heading: "Shared pipeline",
        eyebrow: "",
        body: "",
      });
    }
  });

  it("preserves unsupported sections for fallback rendering", () => {
    const result = createRenderablePage(
      createRenderablePageFactory({
        sections: [createUnsupportedSection()],
      }),
    );

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.page.sections[0]?.type).toBe("legacyBanner");
    }
  });

  it("fails safely when known section props have invalid runtime types", () => {
    const result = createRenderablePage(
      createRenderablePageFactory({
        sections: [
          {
            id: "hero-1",
            type: "hero",
            props: {
              heading: 42,
            },
          },
        ],
      }),
    );

    expect(result.ok).toBe(false);
  });
});
