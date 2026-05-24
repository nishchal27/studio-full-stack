import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearPersistedDraft,
  getDraftStorageKey,
  loadPersistedDraft,
  persistDraft,
} from "@/features/editor/lib/draftPersistence";
import { createRenderablePageFactory } from "@/tests/factories/pages";

function createLocalStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
  };
}

describe("draftPersistence", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      localStorage: createLocalStorageMock(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("persists only validated renderable draft data", () => {
    const page = createRenderablePageFactory();

    persistDraft(page);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      getDraftStorageKey(page.slug),
      JSON.stringify(page),
    );
    expect(loadPersistedDraft(page.slug)?.slug).toBe(page.slug);
  });

  it("drops invalid persisted draft data during restore", () => {
    window.localStorage.setItem(
      getDraftStorageKey("home"),
      JSON.stringify({
        slug: "home",
      }),
    );

    expect(loadPersistedDraft("home")).toBeNull();
  });

  it("clears a persisted draft by slug", () => {
    const page = createRenderablePageFactory();

    persistDraft(page);
    clearPersistedDraft(page.slug);

    expect(loadPersistedDraft(page.slug)).toBeNull();
  });
});
