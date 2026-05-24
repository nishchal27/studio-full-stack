import type { PageDiff } from "@/lib/semver/compareSections";

export function createChangelog(diff: PageDiff) {
  return diff.messages;
}
