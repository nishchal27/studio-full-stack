import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SectionRenderer, isSupportedSection } from "@/registry/sectionRegistry";
import { createSection, createUnsupportedSection } from "@/tests/factories/sections";

describe("sectionRegistry", () => {
  it("renders supported sections through the typed registry", () => {
    const section = createSection("hero", {
      props: {
        heading: "Validated rendering",
        body: "CMS data is rendered only after schema validation.",
      },
    });

    const html = renderToStaticMarkup(<SectionRenderer section={section} />);

    expect(html).toContain("Validated rendering");
    expect(isSupportedSection(section)).toBe(true);
  });

  it("renders an unsupported fallback for unknown section types", () => {
    const section = createUnsupportedSection();

    const html = renderToStaticMarkup(<SectionRenderer section={section} />);

    expect(html).toContain("legacyBanner");
    expect(isSupportedSection(section)).toBe(false);
  });
});
