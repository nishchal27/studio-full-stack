export const sectionTypes = ["hero", "featureGrid", "testimonial", "cta"] as const;

export type SectionType = (typeof sectionTypes)[number];

export type UserRole = "viewer" | "editor" | "publisher";

export type PublishVersion = {
  version: string;
  pageId: string;
  slug: string;
  changelog: string;
  createdAt: string;
  createdBy: string;
};

export type BaseSection<TType extends SectionType, TProps> = {
  id: string;
  type: TType;
  props: TProps;
};

export type HeroSection = BaseSection<
  "hero",
  {
    eyebrow?: string;
    heading: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }
>;

export type FeatureGridSection = BaseSection<
  "featureGrid",
  {
    heading: string;
    features: Array<{
      title: string;
      body: string;
    }>;
  }
>;

export type TestimonialSection = BaseSection<
  "testimonial",
  {
    quote: string;
    authorName: string;
    authorTitle?: string;
  }
>;

export type CtaSection = BaseSection<
  "cta",
  {
    heading: string;
    body?: string;
    label: string;
    href: string;
  }
>;

export type UnsupportedSection = {
  id: string;
  type: string;
  props?: unknown;
};

export type SupportedSection = HeroSection | FeatureGridSection | TestimonialSection | CtaSection;
export type Section = SupportedSection | UnsupportedSection;

export type Page = {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
  updatedAt: string;
  publishVersion?: PublishVersion;
};
