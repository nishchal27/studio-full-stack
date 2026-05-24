import { createClient } from "contentful";

import type { ContentfulPageLookup, ContentfulPageResult } from "@/types/contentful";

export type ContentfulClient = {
  getPageBySlug: (lookup: ContentfulPageLookup) => Promise<ContentfulPageResult>;
  getDraftPage: (slug: string) => Promise<ContentfulPageResult>;
  getPublishedPage: (slug: string) => Promise<ContentfulPageResult>;
};

type ContentfulConfig = {
  space: string;
  accessToken: string;
  environment: string;
  host?: "preview.contentful.com";
};

type NormalizedSection = {
  id: string;
  type: string;
  props?: unknown;
};

const PAGE_CONTENT_TYPE = "page";

export function createContentfulClient(): ContentfulClient {
  const getPageBySlug: ContentfulClient["getPageBySlug"] = async ({
    slug,
    environment = "published",
  }) => {
    const config = getContentfulConfig(environment);

    if (!config) {
      return {
        ok: false,
        source: "contentful",
        environment,
        error: {
          code: "missingConfig",
          message:
            "Contentful environment variables are not configured for this rendering environment.",
        },
      };
    }

    try {
      const client = createClient(config);
      const response: unknown = await client.getEntries({
        content_type: PAGE_CONTENT_TYPE,
        "fields.slug": slug,
        include: 2,
        limit: 1,
      });

      return {
        ok: true,
        // The adapter maps SDK-specific entries to plain data only. Shared validation
        // still happens later so server preview, future drafts, and snapshots agree.
        page: normalizePageEntry(getFirstItem(response)),
        source: "contentful",
        environment,
      };
    } catch {
      return {
        ok: false,
        source: "contentful",
        environment,
        error: {
          code: "fetchFailed",
          message: "Contentful content could not be loaded for this page.",
        },
      };
    }
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

function getContentfulConfig(
  environment: ContentfulPageLookup["environment"],
): ContentfulConfig | null {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
  const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
  const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  const accessToken = environment === "preview" ? previewToken : deliveryToken;

  if (!space || !accessToken) {
    return null;
  }

  return {
    space,
    accessToken,
    environment: contentfulEnvironment,
    ...(environment === "preview" ? { host: "preview.contentful.com" } : {}),
  };
}

function normalizePageEntry(entry: unknown) {
  const entryRecord = asRecord(entry);
  const fields = asRecord(entryRecord?.fields);
  const sys = asRecord(entryRecord?.sys);

  if (!entryRecord || !fields || !sys) {
    return null;
  }

  // Adapter normalization keeps CMS-specific field shapes away from route and UI code.
  // Zod still performs the trust boundary check after this mapping step.
  return {
    id: readString(sys.id) ?? "",
    slug: readString(fields.slug) ?? "",
    title: readString(fields.title) ?? "",
    updatedAt: readString(sys.updatedAt) ?? new Date(0).toISOString(),
    sections: readArray(fields.sections).map(normalizeSectionEntry),
  };
}

function normalizeSectionEntry(entry: unknown, index: number): NormalizedSection {
  const entryRecord = asRecord(entry);
  const fields = asRecord(entryRecord?.fields);
  const sys = asRecord(entryRecord?.sys);
  const contentType = asRecord(asRecord(sys?.contentType)?.sys);
  const type = readString(fields?.type) ?? readString(contentType?.id) ?? "unsupported";

  return {
    id: readString(sys?.id) ?? `section-${index}`,
    type,
    props: normalizeSectionProps(type, fields),
  };
}

function normalizeSectionProps(type: string, fields: Record<string, unknown> | null) {
  if (!fields) {
    return undefined;
  }

  switch (type) {
    case "hero":
      return pickFields(fields, ["eyebrow", "heading", "body", "ctaLabel", "ctaHref"]);
    case "featureGrid":
      return {
        heading: fields.heading,
        features: readArray(fields.features).map(normalizeFeature),
      };
    case "testimonial":
      return pickFields(fields, ["quote", "authorName", "authorTitle"]);
    case "cta":
      return pickFields(fields, ["heading", "body", "label", "href"]);
    default:
      return fields.props ?? fields;
  }
}

function normalizeFeature(feature: unknown) {
  const fields = asRecord(asRecord(feature)?.fields) ?? asRecord(feature);

  return {
    title: fields?.title,
    body: fields?.body,
  };
}

function pickFields(fields: Record<string, unknown>, keys: string[]) {
  return keys.reduce<Record<string, unknown>>((props, key) => {
    if (key in fields) {
      props[key] = fields[key];
    }

    return props;
  }, {});
}

function getFirstItem(response: unknown) {
  return readArray(asRecord(response)?.items)[0] ?? null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export const contentfulClient = createContentfulClient();
