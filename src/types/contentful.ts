export type ContentfulEnvironment = "preview" | "published";

export type ContentfulPageLookup = {
  slug: string;
  environment?: ContentfulEnvironment;
};

export type ContentfulAdapterErrorCode = "missingConfig" | "fetchFailed";

export type ContentfulPageResult =
  | {
      ok: true;
      page: unknown | null;
      source: "contentful";
      environment: ContentfulEnvironment;
    }
  | {
      ok: false;
      error: {
        code: ContentfulAdapterErrorCode;
        message: string;
      };
      source: "contentful";
      environment: ContentfulEnvironment;
    };
