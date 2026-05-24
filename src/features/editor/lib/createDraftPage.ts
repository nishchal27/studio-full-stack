import { getSectionDefaultProps } from "@/lib/validation/sectionDefaults";
import type { RenderablePage, SectionType, SupportedSection } from "@/types/domain";

export function createEmptyDraftPage(slug: string): RenderablePage {
  return {
    id: `draft-${slug}`,
    slug,
    title: `Draft: ${slug}`,
    updatedAt: new Date().toISOString(),
    sections: [createDraftSection("hero")],
  };
}

export function createDraftSection<TType extends SectionType>(
  type: TType,
  id = `${type}-${Date.now()}`,
): Extract<SupportedSection, { type: TType }> {
  return {
    id,
    type,
    props: getSectionDefaultProps(type),
  } as unknown as Extract<SupportedSection, { type: TType }>;
}
