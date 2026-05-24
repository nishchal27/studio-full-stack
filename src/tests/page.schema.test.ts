import { describe, expect, it } from "vitest";

import { parsePage } from "@/schemas/page.schema";
import { createRenderablePageFactory } from "@/tests/factories/pages";
import { createUnsupportedSection } from "@/tests/factories/sections";

describe("pageSchema", () => {
  it("parses a minimal valid page", () => {
    const result = parsePage(createRenderablePageFactory());

    expect(result.success).toBe(true);
  });

  it("fails safely for invalid known section data", () => {
    const result = parsePage({
      id: "page-1",
      slug: "home",
      title: "Home",
      updatedAt: "2026-05-24T00:00:00.000Z",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          props: {
            heading: 42,
          },
        },
      ],
    });

    expect(result.success).toBe(false);
  });

  it("accepts unknown sections as renderable fallback data", () => {
    const result = parsePage(
      createRenderablePageFactory({
        sections: [createUnsupportedSection()],
      }),
    );

    expect(result.success).toBe(true);
  });
});
