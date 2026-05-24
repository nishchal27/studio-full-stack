import { PageShell } from "@/components/shared/PageShell";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;

  return (
    <PageShell>
      <section aria-labelledby="preview-title" className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-sky-700">Preview route</p>
        <h1 id="preview-title" className="mt-3 text-3xl font-semibold tracking-normal">
          Preview: {slug}
        </h1>
        <p className="mt-4 text-slate-700">
          Renderer and Contentful integration are intentionally deferred to the next phase.
        </p>
      </section>
    </PageShell>
  );
}
