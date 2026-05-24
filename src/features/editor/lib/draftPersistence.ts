import { createRenderablePage } from "@/lib/validation/createRenderablePage";
import type { RenderablePage } from "@/types/domain";

const storagePrefix = "page-studio:draft:";

export function getDraftStorageKey(slug: string) {
  return `${storagePrefix}${slug}`;
}

export function loadPersistedDraft(slug: string): RenderablePage | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawDraft = window.localStorage.getItem(getDraftStorageKey(slug));

  if (!rawDraft) {
    return null;
  }

  try {
    const parsedDraft = JSON.parse(rawDraft) as unknown;
    const renderableDraft = createRenderablePage(parsedDraft);

    // Persisted drafts are treated as untrusted input because localStorage can be edited
    // by users or stale application versions.
    return renderableDraft.ok ? renderableDraft.page : null;
  } catch {
    return null;
  }
}

export function persistDraft(page: RenderablePage) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getDraftStorageKey(page.slug), JSON.stringify(page));
}

export function clearPersistedDraft(slug: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(getDraftStorageKey(slug));
}
