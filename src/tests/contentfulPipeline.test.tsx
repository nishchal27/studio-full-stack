import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PageRenderer } from "@/features/preview/PageRenderer";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import { isSupportedSection } from "@/registry/sectionRegistry";

const contentfulEmbeddedPage = {
  id: "page-home",
  slug: "home",
  title: "Home",
  updatedAt: "2026-05-24T00:00:00.000Z",
  sections: [
    {
      id: "hero-1",
      type: "hero",
      props: {
        eyebrow: "AI PAGE STUDIO",
        title: "Build landing pages with schema-driven rendering",
        subtitle: "Production-oriented rendering from Contentful.",
        ctaLabel: "Explore Studio",
        ctaUrl: "/studio/home",
      },
    },
    {
      id: "feature-grid-1",
      type: "featureGrid",
      props: {
        title: "Core Platform Features",
        features: [
          {
            title: "Schema Validation",
            description: "Every page is validated before rendering.",
          },
        ],
      },
    },
    {
      id: "testimonial-1",
      type: "testimonial",
      props: {
        quote: "The architecture feels production-oriented.",
        author: "Engineering Reviewer",
        role: "Senior Full Stack Engineer",
      },
    },
    {
      id: "cta-1",
      type: "cta",
      props: {
        title: "Ready to publish safely?",
        body: "Use deterministic publishing.",
        label: "Open Studio",
        url: "/studio/home",
      },
    },
  ],
};

describe("Contentful render pipeline", () => {
  it("keeps valid embedded Contentful section types registry-supported", () => {
    const result = createRenderablePage(contentfulEmbeddedPage);

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.page.sections.map((section) => section.type)).toEqual([
        "hero",
        "featureGrid",
        "testimonial",
        "cta",
      ]);
      expect(result.page.sections.every(isSupportedSection)).toBe(true);
    }
  });

  it("maps Contentful prop aliases into render-safe section contracts", () => {
    const result = createRenderablePage(contentfulEmbeddedPage);

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.page.sections[0]?.props).toMatchObject({
        heading: "Build landing pages with schema-driven rendering",
        body: "Production-oriented rendering from Contentful.",
        ctaHref: "/studio/home",
      });
      expect(result.page.sections[1]?.props).toMatchObject({
        heading: "Core Platform Features",
        features: [
          {
            title: "Schema Validation",
            body: "Every page is validated before rendering.",
          },
        ],
      });
      expect(result.page.sections[2]?.props).toMatchObject({
        authorName: "Engineering Reviewer",
        authorTitle: "Senior Full Stack Engineer",
      });
      expect(result.page.sections[3]?.props).toMatchObject({
        heading: "Ready to publish safely?",
        href: "/studio/home",
      });
    }
  });

  it("renders valid Contentful sections without unsupported fallbacks", () => {
    const result = createRenderablePage(contentfulEmbeddedPage);

    expect(result.ok).toBe(true);

    if (result.ok) {
      const html = renderToStaticMarkup(<PageRenderer page={result.page} />);

      expect(html).toContain("Build landing pages with schema-driven rendering");
      expect(html).toContain("Core Platform Features");
      expect(html).not.toContain("This section type is not supported yet");
    }
  });
});
