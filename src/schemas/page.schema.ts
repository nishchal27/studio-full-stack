import { z } from "zod";

import { renderableSectionSchema } from "@/schemas/section.schema";

export const publishVersionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  pageId: z.string().min(1),
  slug: z.string().min(1),
  changelog: z.string(),
  createdAt: z.string().datetime(),
  createdBy: z.string().min(1),
});

export const pageSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  sections: z.array(renderableSectionSchema),
  updatedAt: z.string().datetime(),
  publishVersion: publishVersionSchema.optional(),
});

export type PageSchema = z.infer<typeof pageSchema>;

export function parsePage(input: unknown) {
  return pageSchema.safeParse(input);
}
