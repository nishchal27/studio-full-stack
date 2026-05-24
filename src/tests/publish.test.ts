import { rm } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { publishDraft } from "@/features/publish/publishDraft";
import { createRenderablePageFactory } from "@/tests/factories/pages";
import { createSection } from "@/tests/factories/sections";

describe("publishDraft", () => {
  const generatedSlugs = new Set<string>();

  afterEach(async () => {
    await Promise.all(
      [...generatedSlugs].map((slug) =>
        rm(path.join(process.cwd(), "releases", slug), { force: true, recursive: true }),
      ),
    );
    generatedSlugs.clear();
  });

  it("creates an immutable initial snapshot", async () => {
    const slug = createTestSlug("publish-home");
    const result = await publishDraft(createRenderablePageFactory({ slug }));

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.idempotent).toBe(false);
      expect(result.snapshot.version).toBe("1.0.0");
      expect(result.snapshot.changelog).toEqual(["Created initial release"]);
    }
  });

  it("returns the existing snapshot for identical drafts", async () => {
    const page = createRenderablePageFactory({ slug: createTestSlug("idempotent-home") });
    const first = await publishDraft(page);
    const second = await publishDraft(page);

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);

    if (first.ok && second.ok) {
      expect(second.idempotent).toBe(true);
      expect(second.snapshot.version).toBe(first.snapshot.version);
      expect(second.snapshot.createdAt).toBe(first.snapshot.createdAt);
    }
  });

  it("creates the next deterministic version when a draft changes", async () => {
    const slug = createTestSlug("changed-home");
    const page = createRenderablePageFactory({ slug });
    await publishDraft(page);

    const changedPage = createRenderablePageFactory({
      slug,
      sections: [
        createSection("hero", {
          props: {
            heading: "Changed heading",
          },
        }),
      ],
    });
    const result = await publishDraft(changedPage);

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.snapshot.version).toBe("1.0.1");
      expect(result.snapshot.changelog).toEqual(["Updated hero section"]);
    }
  });

  function createTestSlug(prefix: string) {
    const slug = `${prefix}-${crypto.randomUUID()}`;
    generatedSlugs.add(slug);
    return slug;
  }
});
