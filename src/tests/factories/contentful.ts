import { createRenderablePageFactory } from "@/tests/factories/pages";
import type { RenderablePage } from "@/types/domain";

export function createContentfulEntry(page: Partial<RenderablePage> = {}) {
  const renderablePage = createRenderablePageFactory(page);

  return {
    sys: {
      id: renderablePage.id,
      updatedAt: renderablePage.updatedAt,
    },
    fields: {
      slug: renderablePage.slug,
      title: renderablePage.title,
      sections: renderablePage.sections.map((section) => ({
        sys: {
          id: section.id,
          contentType: {
            sys: {
              id: section.type,
            },
          },
        },
        fields: {
          ...(isRecord(section.props) ? section.props : {}),
          type: section.type,
        },
      })),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
