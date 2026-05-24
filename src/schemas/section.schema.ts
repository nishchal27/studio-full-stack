import { z } from "zod";

import { sectionTypes } from "@/types/domain";

const sectionBaseSchema = z.object({
  id: z.string().min(1),
});

export const heroSectionSchema = sectionBaseSchema.extend({
  type: z.literal("hero"),
  props: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().min(1),
    body: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().url().or(z.string().startsWith("/")).optional(),
  }),
});

export const featureGridSectionSchema = sectionBaseSchema.extend({
  type: z.literal("featureGrid"),
  props: z.object({
    heading: z.string().min(1),
    features: z
      .array(
        z.object({
          title: z.string().min(1),
          body: z.string().min(1),
        }),
      )
      .min(1),
  }),
});

export const testimonialSectionSchema = sectionBaseSchema.extend({
  type: z.literal("testimonial"),
  props: z.object({
    quote: z.string().min(1),
    authorName: z.string().min(1),
    authorTitle: z.string().optional(),
  }),
});

export const ctaSectionSchema = sectionBaseSchema.extend({
  type: z.literal("cta"),
  props: z.object({
    heading: z.string().min(1),
    body: z.string().optional(),
    label: z.string().min(1),
    href: z.string().url().or(z.string().startsWith("/")),
  }),
});

export const sectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  featureGridSectionSchema,
  testimonialSectionSchema,
  ctaSectionSchema,
]);

export const unsupportedSectionSchema = sectionBaseSchema.extend({
  type: z
    .string()
    .min(1)
    .refine((type) => !(sectionTypes as readonly string[]).includes(type)),
  props: z.unknown().optional(),
});

export const renderableSectionSchema = z.union([sectionSchema, unsupportedSectionSchema]);

export type SectionSchema = z.infer<typeof renderableSectionSchema>;

export function parseSection(input: unknown) {
  return renderableSectionSchema.safeParse(input);
}
