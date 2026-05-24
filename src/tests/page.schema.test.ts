import { describe, expect, it } from "vitest";

import { parsePage } from "@/schemas/page.schema";

describe("pageSchema", () => {
  it("parses a minimal valid page", () => {
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
            heading: "Build pages safely",
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("fails safely for invalid section data", () => {
    const result = parsePage({
      id: "page-1",
      slug: "home",
      title: "Home",
      updatedAt: "2026-05-24T00:00:00.000Z",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          props: {},
        },
      ],
    });

    expect(result.success).toBe(false);
  });
});
