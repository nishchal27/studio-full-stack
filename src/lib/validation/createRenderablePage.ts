import { normalizePageData } from "@/lib/validation/normalizePageData";
import { validatePageData } from "@/lib/validation/validatePageData";
import type { RenderablePage } from "@/types/domain";

export type RenderablePageResult =
  | {
      ok: true;
      page: RenderablePage;
    }
  | {
      ok: false;
      reason: "validation";
    };

export function createRenderablePage(input: unknown): RenderablePageResult {
  const normalizedPage = normalizePageData(input);
  const validation = validatePageData(normalizedPage);

  if (!validation.success) {
    return {
      ok: false,
      reason: "validation",
    };
  }

  return {
    ok: true,
    page: validation.data,
  };
}
