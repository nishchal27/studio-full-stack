import { PageShell } from "@/components/shared/PageShell";

type StudioPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StudioPage({ params }: StudioPageProps) {
  const { slug } = await params;

  return (
    <PageShell>
      <section aria-labelledby="studio-title" className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-sky-700">Studio route</p>
        <h1 id="studio-title" className="mt-3 text-3xl font-semibold tracking-normal">
          Studio: {slug}
        </h1>
        <p className="mt-4 text-slate-700">
          Editor controls and publishing workflows are intentionally deferred beyond Phase 0.
        </p>
      </section>
    </PageShell>
  );
}
