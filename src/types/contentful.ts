import type { Page } from "@/types/domain";

export type ContentfulEnvironment = "preview" | "published";

export type ContentfulPageLookup = {
  slug: string;
  environment?: ContentfulEnvironment;
};

export type ContentfulPageResult = {
  page: Page | null;
  source: "contentful";
  environment: ContentfulEnvironment;
};
