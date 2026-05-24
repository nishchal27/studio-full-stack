import { contentfulClient } from "@/lib/contentful/contentfulClient";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import type { RenderablePage } from "@/types/domain";

import { createEmptyDraftPage } from "./createDraftPage";

export async function loadStudioDraft(slug: string): Promise<RenderablePage> {
  const draftResult = await contentfulClient.getDraftPage(slug);

  if (draftResult.ok && draftResult.page) {
    const renderableDraft = createRenderablePage(draftResult.page);

    if (renderableDraft.ok) {
      return renderableDraft.page;
    }
  }

  // Studio remains usable without CMS credentials by creating a minimal local draft.
  // This fallback never bypasses rendering validation because the client re-enters
  // createRenderablePage before rendering draft output.
  return createEmptyDraftPage(slug);
}
