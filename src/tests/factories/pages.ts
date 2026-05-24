import { createSection } from "@/tests/factories/sections";
import type { RenderablePage } from "@/types/domain";

export function createRenderablePageFactory(
  overrides: Partial<RenderablePage> = {},
): RenderablePage {
  return {
    id: "page-1",
    slug: "home",
    title: "Home",
    updatedAt: "2026-05-24T00:00:00.000Z",
    sections: [createSection("hero")],
    ...overrides,
  };
}
