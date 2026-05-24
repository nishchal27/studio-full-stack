import { createElement, type ComponentType } from "react";

import { CtaSection } from "@/components/sections/CtaSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { UnsupportedSection } from "@/components/sections/UnsupportedSection";
import type {
  SectionType,
  SupportedSection,
  UnsupportedSection as UnsupportedSectionData,
} from "@/types/domain";

type SectionComponent<TSection extends SupportedSection> = ComponentType<{
  section: TSection;
}>;

type SectionRegistry = {
  [TType in SectionType]: SectionComponent<Extract<SupportedSection, { type: TType }>>;
};

export const sectionRegistry = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CtaSection,
} satisfies SectionRegistry;

export type RenderableSection = SupportedSection | UnsupportedSectionData;

export function SectionRenderer({ section }: { section: RenderableSection }) {
  // Registry resolution is deliberately centralized so section components never need to
  // understand CMS-specific fallback rules or duplicate unknown-section handling.
  if (!isSupportedSection(section)) {
    return createElement(UnsupportedSection, { section });
  }

  // The switch keeps component props exhaustive without unsafe dynamic component casts.
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

export function isSupportedSection(section: RenderableSection): section is SupportedSection {
  return section.type in sectionRegistry;
}
