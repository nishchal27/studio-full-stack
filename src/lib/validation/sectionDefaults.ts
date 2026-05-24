import type {
  CtaSectionProps,
  FeatureGridSectionProps,
  HeroSectionProps,
  SectionType,
  TestimonialSectionProps,
} from "@/types/domain";

export type SectionDefaultProps = {
  hero: HeroSectionProps;
  featureGrid: FeatureGridSectionProps;
  testimonial: TestimonialSectionProps;
  cta: CtaSectionProps;
};

export const sectionDefaultProps = {
  hero: {
    eyebrow: "",
    heading: "Untitled hero",
    body: "",
    ctaLabel: "",
    ctaHref: "",
  },
  featureGrid: {
    heading: "Features",
    features: [
      {
        title: "Feature",
        body: "Feature details",
      },
    ],
  },
  testimonial: {
    quote: "Customer quote",
    authorName: "Customer",
    authorTitle: "",
  },
  cta: {
    heading: "Call to action",
    body: "",
    label: "Learn more",
    href: "/",
  },
} satisfies SectionDefaultProps;

export function getSectionDefaultProps<TType extends SectionType>(
  type: TType,
): SectionDefaultProps[TType] {
  return sectionDefaultProps[type];
}
