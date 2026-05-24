import { describe, expect, it } from "vitest";

import { createDraftSection } from "@/features/editor/lib/createDraftPage";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import { draftPageReducer, setDraftPage, updateSectionProp } from "@/store/slices/draftPageSlice";
import { addSection, removeSection, reorderSection } from "@/store/slices/draftPageSlice";
import { createRenderablePageFactory } from "@/tests/factories/pages";

describe("draftPageSlice", () => {
  it("updates section props through Redux-owned draft state", () => {
    const initialPage = createRenderablePageFactory();
    const initialized = draftPageReducer(undefined, setDraftPage(initialPage));
    const updated = draftPageReducer(
      initialized,
      updateSectionProp({
        sectionId: "hero-1",
        propName: "heading",
        value: "Edited in Studio",
      }),
    );

    expect(updated.page?.sections[0]?.props).toMatchObject({
      heading: "Edited in Studio",
    });
    expect(updated.isDirty).toBe(true);
  });

  it("adds, reorders, and removes sections deterministically", () => {
    const initialPage = createRenderablePageFactory();
    const initialized = draftPageReducer(undefined, setDraftPage(initialPage));
    const added = draftPageReducer(initialized, addSection(createDraftSection("cta", "cta-1")));
    const reordered = draftPageReducer(
      added,
      reorderSection({ sectionId: "cta-1", direction: "up" }),
    );
    const removed = draftPageReducer(reordered, removeSection({ sectionId: "hero-1" }));

    expect(reordered.page?.sections.map((section) => section.id)).toEqual(["cta-1", "hero-1"]);
    expect(removed.page?.sections.map((section) => section.id)).toEqual(["cta-1"]);
  });

  it("keeps edited drafts compatible with the shared renderable pipeline", () => {
    const initialPage = createRenderablePageFactory();
    const initialized = draftPageReducer(undefined, setDraftPage(initialPage));
    const updated = draftPageReducer(
      initialized,
      updateSectionProp({
        sectionId: "hero-1",
        propName: "heading",
        value: "Renderable Studio draft",
      }),
    );

    const renderableDraft = createRenderablePage(updated.page);

    expect(renderableDraft.ok).toBe(true);
  });
});
