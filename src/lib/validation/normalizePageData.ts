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
      };
    case "featureGrid":
      return {
        ...sectionDefaultProps.featureGrid,
        ...props,
        features: Array.isArray(props?.features)
          ? readArray(props.features).map(normalizeFeature)
          : sectionDefaultProps.featureGrid.features,
      };
    case "testimonial":
      return {
        ...sectionDefaultProps.testimonial,
        ...props,
      };
    case "cta":
      return {
        ...sectionDefaultProps.cta,
        ...props,
      };
    default:
      return props;
  }
}

function normalizeFeature(feature: unknown) {
  const value = asRecord(feature);

  return {
    title: readString(value?.title) ?? "",
    body: readString(value?.body) ?? "",
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
