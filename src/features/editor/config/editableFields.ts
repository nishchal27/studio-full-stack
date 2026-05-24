import type { SectionType } from "@/types/domain";

export type EditableFieldType = "text" | "textarea" | "url";

export type EditableFieldConfig = {
  path: string;
  label: string;
  type: EditableFieldType;
  required?: boolean;
};

export type EditableFieldsBySection = {
  [TType in SectionType]: readonly EditableFieldConfig[];
};

// The editor will mutate only fields listed here. Keeping this boundary explicit
// prevents ad-hoc form code from drifting away from renderer and publish contracts.
export const editableFields = {
  hero: [
    { path: "props.eyebrow", label: "Eyebrow", type: "text" },
    { path: "props.heading", label: "Heading", type: "text", required: true },
    { path: "props.body", label: "Body", type: "textarea" },
    { path: "props.ctaLabel", label: "CTA label", type: "text" },
    { path: "props.ctaHref", label: "CTA URL", type: "url" },
  ],
  featureGrid: [{ path: "props.heading", label: "Heading", type: "text", required: true }],
  testimonial: [
    { path: "props.quote", label: "Quote", type: "textarea", required: true },
    { path: "props.authorName", label: "Author", type: "text", required: true },
    { path: "props.authorTitle", label: "Author title", type: "text" },
  ],
  cta: [
    { path: "props.heading", label: "Heading", type: "text", required: true },
    { path: "props.body", label: "Body", type: "textarea" },
    { path: "props.label", label: "Button label", type: "text", required: true },
    { path: "props.href", label: "Button URL", type: "url", required: true },
  ],
} satisfies EditableFieldsBySection;

export function getEditableFields(sectionType: SectionType) {
  return editableFields[sectionType];
}
