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

export type PublishSnapshot = {
  version: string;
  slug: string;
  createdAt: string;
  changelog: string[];
  page: RenderablePage;
};

export type BaseSection<TType extends SectionType, TProps> = {
  id: string;
  type: TType;
  props: TProps;
};

export type HeroSectionProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FeatureGridItem = {
  title: string;
  body: string;
};

export type FeatureGridSectionProps = {
  heading: string;
  features: FeatureGridItem[];
};

export type TestimonialSectionProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
};

export type CtaSectionProps = {
  heading: string;
  body: string;
  label: string;
  href: string;
};

export type HeroSection = BaseSection<"hero", HeroSectionProps>;

export type FeatureGridSection = BaseSection<"featureGrid", FeatureGridSectionProps>;

export type TestimonialSection = BaseSection<"testimonial", TestimonialSectionProps>;

export type CtaSection = BaseSection<"cta", CtaSectionProps>;

export type UnsupportedSection = {
  id: string;
  type: string;
  props?: unknown;
};

export type SupportedSection = HeroSection | FeatureGridSection | TestimonialSection | CtaSection;
export type Section = SupportedSection | UnsupportedSection;

export type RenderablePage = {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
  updatedAt: string;
  publishVersion?: PublishVersion;
};

export type Page = RenderablePage;
