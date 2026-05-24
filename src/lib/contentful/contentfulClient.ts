import type { ContentfulPageLookup, ContentfulPageResult } from "@/types/contentful";

export type ContentfulClient = {
  getPageBySlug: (lookup: ContentfulPageLookup) => Promise<ContentfulPageResult>;
  getDraftPage: (slug: string) => Promise<ContentfulPageResult>;
  getPublishedPage: (slug: string) => Promise<ContentfulPageResult>;
};

export function createContentfulClient(): ContentfulClient {
  const getPageBySlug: ContentfulClient["getPageBySlug"] = async ({
    environment = "published",
  }) => {
    return {
      page: null,
      source: "contentful",
      environment,
    };
  };

  return {
    getPageBySlug,
    async getDraftPage(slug) {
      return getPageBySlug({ slug, environment: "preview" });
    },
    async getPublishedPage(slug) {
      return getPageBySlug({ slug, environment: "published" });
    },
  };
}

export const contentfulClient = createContentfulClient();
