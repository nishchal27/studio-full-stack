import { PageShell } from "@/components/shared/PageShell";
import { PageRenderer } from "@/features/preview/PageRenderer";
import { PreviewState } from "@/features/preview/PreviewStates";
import { contentfulClient } from "@/lib/contentful/contentfulClient";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";

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

  // Server rendering owns the Contentful fetch and validation boundary. Later client-side
  // draft editing should enter the same pipeline before previewing or publishing changes.
  const renderablePage = createRenderablePage(result.page);

  if (!renderablePage.ok) {
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
      <PageRenderer page={renderablePage.page} />
    </PageShell>
  );
}
