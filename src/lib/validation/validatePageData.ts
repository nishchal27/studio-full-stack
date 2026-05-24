import { pageSchema } from "@/schemas/page.schema";

export function validatePageData(input: unknown) {
  return pageSchema.safeParse(input);
}
