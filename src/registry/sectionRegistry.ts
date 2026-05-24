import { createElement, type ComponentType } from "react";

import { CtaSection } from "@/components/sections/CtaSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { UnsupportedSection } from "@/components/sections/UnsupportedSection";
import type {
  Section,
  SectionType,
  UnsupportedSection as UnsupportedSectionData,
} from "@/types/domain";

type SectionComponent<TSection extends Section> = ComponentType<{
  section: TSection;
}>;

type SectionRegistry = {
  [TType in SectionType]: SectionComponent<Extract<Section, { type: TType }>>;
};

export const sectionRegistry = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CtaSection,
} satisfies SectionRegistry;

export type RenderableSection = Section | UnsupportedSectionData;

export function SectionRenderer({ section }: { section: RenderableSection }) {
  if (!isSupportedSection(section)) {
    return createElement(UnsupportedSection, { section });
  }

  switch (section.type) {
    case "hero":
      return createElement(sectionRegistry.hero, { section });
    case "featureGrid":
      return createElement(sectionRegistry.featureGrid, { section });
    case "testimonial":
      return createElement(sectionRegistry.testimonial, { section });
    case "cta":
      return createElement(sectionRegistry.cta, { section });
  }
}

export function isSupportedSection(section: RenderableSection): section is Section {
  return section.type in sectionRegistry;
}
