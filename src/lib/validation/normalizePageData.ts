import { sectionDefaultProps } from "@/lib/validation/sectionDefaults";
import { sectionTypes } from "@/types/domain";

type RecordValue = Record<string, unknown>;

// Draft, preview, and publish flows share this normalization step so renderer behavior
// remains deterministic no matter which source produced the page-shaped data.
export function normalizePageData(input: unknown) {
  const page = asRecord(input);

  if (!page) {
    return input;
  }

  return {
    ...page,
    sections: readArray(page.sections).map(normalizeSectionData),
  };
}

function normalizeSectionData(input: unknown) {
  const section = asRecord(input);

  if (!section) {
    return input;
  }

  const type = readString(section.type);

  if (!type || !(sectionTypes as readonly string[]).includes(type)) {
    return {
      id: readString(section.id) ?? "unsupported-section",
      type: type ?? "unsupported",
      props: section.props,
    };
  }

  return {
    ...section,
    props: normalizeKnownSectionProps(type, asRecord(section.props)),
  };
}

function normalizeKnownSectionProps(type: string, props: RecordValue | null) {
  switch (type) {
    case "hero":
      return {
        ...sectionDefaultProps.hero,
        ...props,
        heading: readPropAlias(props, ["heading", "title"], sectionDefaultProps.hero.heading),
        body: readPropAlias(props, ["body", "subtitle"], sectionDefaultProps.hero.body),
        ctaHref: readPropAlias(props, ["ctaHref", "ctaUrl"], sectionDefaultProps.hero.ctaHref),
      };
    case "featureGrid":
      return {
        ...sectionDefaultProps.featureGrid,
        ...props,
        heading: readPropAlias(
          props,
          ["heading", "title"],
          sectionDefaultProps.featureGrid.heading,
        ),
        features: Array.isArray(props?.features)
          ? readArray(props.features).map(normalizeFeature)
          : sectionDefaultProps.featureGrid.features,
      };
    case "testimonial":
      return {
        ...sectionDefaultProps.testimonial,
        ...props,
        authorName: readPropAlias(
          props,
          ["authorName", "author"],
          sectionDefaultProps.testimonial.authorName,
        ),
        authorTitle: readPropAlias(
          props,
          ["authorTitle", "role"],
          sectionDefaultProps.testimonial.authorTitle,
        ),
      };
    case "cta":
      return {
        ...sectionDefaultProps.cta,
        ...props,
        heading: readPropAlias(props, ["heading", "title"], sectionDefaultProps.cta.heading),
        href: readPropAlias(props, ["href", "url"], sectionDefaultProps.cta.href),
      };
    default:
      return props;
  }
}

function readPropAlias(props: RecordValue | null, keys: string[], fallback: string) {
  if (!props) {
    return fallback;
  }

  for (const key of keys) {
    if (key in props) {
      return props[key];
    }
  }

  return fallback;
}

function normalizeFeature(feature: unknown) {
  const value = asRecord(feature);

  return {
    title: readString(value?.title) ?? "",
    body: readString(value?.body) ?? readString(value?.description) ?? "",
  };
}

function asRecord(value: unknown): RecordValue | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as RecordValue;
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}
