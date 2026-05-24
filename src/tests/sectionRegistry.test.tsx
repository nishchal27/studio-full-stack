import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SectionRenderer, isSupportedSection } from "@/registry/sectionRegistry";
import type { Section } from "@/types/domain";

describe("sectionRegistry", () => {
  it("renders supported sections through the typed registry", () => {
    const section: Section = {
      id: "hero-1",
      type: "hero",
      props: {
        heading: "Validated rendering",
        body: "CMS data is rendered only after schema validation.",
      },
    };

    const html = renderToStaticMarkup(<SectionRenderer section={section} />);

    expect(html).toContain("Validated rendering");
    expect(isSupportedSection(section)).toBe(true);
  });

  it("renders an unsupported fallback for unknown section types", () => {
    const section: Section = {
      id: "unknown-1",
      type: "legacyBanner",
      props: {
        heading: "Old model",
      },
    };

    const html = renderToStaticMarkup(<SectionRenderer section={section} />);

    expect(html).toContain("legacyBanner");
    expect(isSupportedSection(section)).toBe(false);
  });
});
