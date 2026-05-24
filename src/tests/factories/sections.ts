import { sectionDefaultProps } from "@/lib/validation/sectionDefaults";
import type { Section, SectionType, SupportedSection } from "@/types/domain";

type SectionByType<TType extends SectionType> = Extract<SupportedSection, { type: TType }>;
type SectionOverrides<TType extends SectionType> = Omit<Partial<SectionByType<TType>>, "props"> & {
  props?: Partial<SectionByType<TType>["props"]>;
};

export function createSection<TType extends SectionType>(
  type: TType,
  overrides = {} as SectionOverrides<TType>,
): SectionByType<TType> {
  const { props, ...sectionOverrides } = overrides;

  return {
    id: `${type}-1`,
    type,
    ...sectionOverrides,
    props: {
      ...sectionDefaultProps[type],
      ...props,
    },
  } as unknown as SectionByType<TType>;
}

export function createUnsupportedSection(overrides: Partial<Section> = {}): Section {
  return {
    id: "unsupported-1",
    type: "legacyBanner",
    props: {
      heading: "Legacy section",
    },
    ...overrides,
  };
}
