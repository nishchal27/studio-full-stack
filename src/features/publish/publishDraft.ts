import { calculateVersionChange } from "@/lib/semver/calculateVersionChange";
import { stableSerialize } from "@/lib/semver/stableSerialize";
import type { PublishSnapshot, RenderablePage } from "@/types/domain";

import { getLatestSnapshot, writeSnapshot } from "./releaseStore";

export type PublishDraftResult =
  | {
      ok: true;
      idempotent: boolean;
      snapshot: PublishSnapshot;
    }
  | {
      ok: false;
      message: string;
    };

export async function publishDraft(page: RenderablePage): Promise<PublishDraftResult> {
  const latestSnapshot = await getLatestSnapshot(page.slug);

  if (latestSnapshot && isSameReleasePage(latestSnapshot.page, page)) {
    return {
      ok: true,
      idempotent: true,
      snapshot: latestSnapshot,
    };
  }

  const versionChange = calculateVersionChange({
    previousPage: latestSnapshot?.page ?? null,
    previousVersion: latestSnapshot?.version ?? null,
    currentPage: page,
  });

  if (versionChange.change === "none" && latestSnapshot) {
    return {
      ok: true,
      idempotent: true,
      snapshot: latestSnapshot,
    };
  }

  const snapshot: PublishSnapshot = {
    version: versionChange.version,
    slug: page.slug,
    createdAt: new Date().toISOString(),
    changelog: versionChange.changelog,
    page,
  };

  await writeSnapshot(snapshot);

  return {
    ok: true,
    idempotent: false,
    snapshot,
  };
}

function isSameReleasePage(previous: RenderablePage, current: RenderablePage) {
  return stableSerialize(toComparablePage(previous)) === stableSerialize(toComparablePage(current));
}

function toComparablePage(page: RenderablePage) {
  return {
    title: page.title,
    sections: page.sections,
  };
}
