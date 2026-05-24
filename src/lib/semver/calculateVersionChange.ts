import { compareRenderablePages } from "@/lib/semver/compareSections";
import { createChangelog } from "@/lib/semver/createChangelog";
import { generateVersion } from "@/lib/semver/generateVersion";
import type { RenderablePage } from "@/types/domain";

export function calculateVersionChange(options: {
  previousPage: RenderablePage | null;
  previousVersion: string | null;
  currentPage: RenderablePage;
}) {
  const diff = compareRenderablePages(options.previousPage, options.currentPage);

  return {
    change: diff.change,
    version: generateVersion(options.previousVersion, diff.change),
    changelog: createChangelog(diff),
  };
}
