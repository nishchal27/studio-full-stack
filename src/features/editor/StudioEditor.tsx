"use client";

import { useEffect, useMemo } from "react";

import { AddSectionControls } from "@/components/studio/AddSectionControls";
import { EditorField } from "@/components/studio/EditorField";
import { SectionControls } from "@/components/studio/SectionControls";
import { getEditableFields } from "@/features/editor/config/editableFields";
import { createDraftSection } from "@/features/editor/lib/createDraftPage";
import {
  clearPersistedDraft,
  loadPersistedDraft,
  persistDraft,
} from "@/features/editor/lib/draftPersistence";
import { PageRenderer } from "@/features/preview/PageRenderer";
import { PublishPanel } from "@/features/publish/PublishPanel";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import { isSupportedSection } from "@/registry/sectionRegistry";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addSection,
  removeSection,
  reorderSection,
  setDraftPage,
  updateSectionProp,
} from "@/store/slices/draftPageSlice";
import type { RenderablePage, SectionType, UserRole } from "@/types/domain";

type StudioEditorProps = {
  initialDraft: RenderablePage;
  role: UserRole;
};

export function StudioEditor({ initialDraft, role }: StudioEditorProps) {
  const dispatch = useAppDispatch();
  const draftPage = useAppSelector((state) => state.draftPage.page);
  const isDirty = useAppSelector((state) => state.draftPage.isDirty);

  useEffect(() => {
    const persistedDraft = loadPersistedDraft(initialDraft.slug);

    // Local drafts are restored through the same renderable pipeline used by server data,
    // keeping Studio and Preview synchronized even after a reload.
    dispatch(setDraftPage(persistedDraft ?? initialDraft));
  }, [dispatch, initialDraft]);

  useEffect(() => {
    if (draftPage && isDirty) {
      persistDraft(draftPage);
    }
  }, [draftPage, isDirty]);

  const renderableDraft = useMemo(
    () => (draftPage ? createRenderablePage(draftPage) : null),
    [draftPage],
  );

  if (!draftPage) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16" aria-labelledby="studio-loading-title">
        <h1 id="studio-loading-title" className="text-3xl font-semibold tracking-normal">
          Loading studio
        </h1>
      </section>
    );
  }

  return (
    <div className="grid min-h-dvh gap-0 lg:grid-cols-[420px_1fr]">
      <aside
        aria-labelledby="studio-title"
        className="border-b border-slate-200 bg-slate-50 px-6 py-6 lg:border-r lg:border-b-0"
      >
        <p className="text-sm font-medium text-sky-700">Role: {role}</p>
        <h1 id="studio-title" className="mt-2 text-2xl font-semibold tracking-normal">
          Studio: {draftPage.slug}
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          Draft changes are owned by Redux and rendered through the shared page pipeline.
        </p>

        <div className="mt-6 space-y-6">
          {draftPage.sections.map((section, index) => (
            <section
              aria-labelledby={`${section.id}-editor-title`}
              className="rounded-md border border-slate-200 bg-white p-4"
              key={section.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    id={`${section.id}-editor-title`}
                    className="text-sm font-semibold text-slate-950"
                  >
                    {section.type}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">{section.id}</p>
                </div>
                <SectionControls
                  canMoveDown={index < draftPage.sections.length - 1}
                  canMoveUp={index > 0}
                  onMoveDown={() =>
                    dispatch(reorderSection({ sectionId: section.id, direction: "down" }))
                  }
                  onMoveUp={() =>
                    dispatch(reorderSection({ sectionId: section.id, direction: "up" }))
                  }
                  onRemove={() => dispatch(removeSection({ sectionId: section.id }))}
                />
              </div>

              {isSupportedSection(section) ? (
                <div className="mt-4 space-y-4">
                  {getEditableFields(section.type).map((field) => {
                    const propName = field.path.replace("props.", "");
                    const value = readEditableValue(section.props, propName);

                    return (
                      <EditorField
                        field={field}
                        key={field.path}
                        onChange={(nextValue) =>
                          dispatch(
                            updateSectionProp({
                              sectionId: section.id,
                              propName,
                              value: nextValue,
                            }),
                          )
                        }
                        value={value}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-amber-900">
                  Unsupported sections can be reordered or removed, but not edited.
                </p>
              )}
            </section>
          ))}

          <AddSectionControls
            onAddSection={(sectionType: SectionType) =>
              dispatch(addSection(createDraftSection(sectionType)))
            }
          />

          <button
            className="text-sm font-medium text-sky-700 underline"
            onClick={() => {
              clearPersistedDraft(draftPage.slug);
              dispatch(setDraftPage(initialDraft));
            }}
            type="button"
          >
            Reset local draft
          </button>

          <PublishPanel draftPage={draftPage} role={role} />
        </div>
      </aside>

      <main aria-labelledby="studio-preview-title" className="bg-white">
        <h2 id="studio-preview-title" className="sr-only">
          Studio preview
        </h2>
        {renderableDraft?.ok ? (
          <PageRenderer page={renderableDraft.page} />
        ) : (
          <section className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-normal">Draft failed validation</h2>
            <p className="mt-3 text-slate-700">
              This draft is blocked from rendering until invalid fields are corrected.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function readEditableValue(props: Record<string, unknown>, propName: string) {
  const value = props[propName];

  return typeof value === "string" ? value : "";
}
