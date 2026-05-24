import { stableSerialize } from "@/lib/semver/stableSerialize";
import type { RenderablePage, Section } from "@/types/domain";

export type VersionChange = "none" | "patch" | "minor" | "major";

export type PageDiff = {
  change: VersionChange;
  messages: string[];
};

const changeRank: Record<VersionChange, number> = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
};

export function compareRenderablePages(
  previous: RenderablePage | null,
  current: RenderablePage,
): PageDiff {
  if (!previous) {
    return {
      change: "minor",
      messages: ["Created initial release"],
    };
  }

  if (stableSerialize(toComparablePage(previous)) === stableSerialize(toComparablePage(current))) {
    return {
      change: "none",
      messages: ["No changes detected"],
    };
  }

  const messages: string[] = [];
  let change: VersionChange = "none";

  if (previous.title !== current.title) {
    change = maxChange(change, "patch");
    messages.push("Updated page title");
  }

  const previousById = new Map(previous.sections.map((section) => [section.id, section]));
  const currentById = new Map(current.sections.map((section) => [section.id, section]));

  for (const previousSection of previous.sections) {
    const currentSection = currentById.get(previousSection.id);

    if (!currentSection) {
      change = maxChange(change, "major");
      messages.push(`Removed ${previousSection.type} section`);
      continue;
    }

    if (previousSection.type !== currentSection.type) {
      change = maxChange(change, "major");
      messages.push(`Changed ${previousSection.type} section to ${currentSection.type}`);
      continue;
    }

    if (stableSerialize(previousSection.props) !== stableSerialize(currentSection.props)) {
      change = maxChange(change, "patch");
      messages.push(`Updated ${currentSection.type} section`);
    }
  }

  for (const currentSection of current.sections) {
    if (!previousById.has(currentSection.id)) {
      change = maxChange(change, "minor");
      messages.push(`Added ${currentSection.type} section`);
    }
  }

  if (hasSectionOrderChanged(previous.sections, current.sections)) {
    change = maxChange(change, "minor");
    messages.push("Reordered sections");
  }

  return {
    change,
    messages: messages.length > 0 ? messages : ["Updated page content"],
  };
}

function hasSectionOrderChanged(previous: Section[], current: Section[]) {
  const previousIds = previous.map((section) => section.id).join("|");
  const currentIds = current
    .filter((section) => previous.some((previousSection) => previousSection.id === section.id))
    .map((section) => section.id)
    .join("|");

  return previousIds !== currentIds;
}

function maxChange(current: VersionChange, next: VersionChange) {
  return changeRank[next] > changeRank[current] ? next : current;
}

function toComparablePage(page: RenderablePage) {
  return {
    title: page.title,
    sections: page.sections,
  };
}
