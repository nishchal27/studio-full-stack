import { PageShell } from "@/components/shared/PageShell";
import { PageRenderer } from "@/features/preview/PageRenderer";
import { PreviewState } from "@/features/preview/PreviewStates";
import { contentfulClient } from "@/lib/contentful/contentfulClient";
import { parsePage } from "@/schemas/page.schema";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    draft?: string;
  }>;
};

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { slug } = await params;
  const { draft } = await searchParams;
  const result =
    draft === "true"
      ? await contentfulClient.getDraftPage(slug)
      : await contentfulClient.getPublishedPage(slug);

  if (!result.ok) {
    return (
      <PageShell>
        <PreviewState title="Content is unavailable" message={result.error.message} />
      </PageShell>
    );
  }

  if (!result.page) {
    return (
      <PageShell>
        <PreviewState
          title="Page not found"
          message="No Contentful page entry matched this preview slug."
        />
      </PageShell>
    );
  }

  // CMS data is validated before rendering so malformed content cannot break
  // the runtime rendering pipeline.
  const parsedPage = parsePage(result.page);

  if (!parsedPage.success) {
    return (
      <PageShell>
        <PreviewState
          title="Page content failed validation"
          message="This page has malformed CMS data and was blocked before rendering."
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageRenderer page={parsedPage.data} />
    </PageShell>
  );
}
