import { PageShell } from "@/components/shared/PageShell";
import { assertCanAccessStudio } from "@/features/auth/serverSession";
import { StudioEditor } from "@/features/editor/StudioEditor";
import { loadStudioDraft } from "@/features/editor/lib/loadStudioDraft";

type StudioPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StudioPage({ params }: StudioPageProps) {
  const { slug } = await params;
  const role = await assertCanAccessStudio();
  const initialDraft = await loadStudioDraft(slug);

  return (
    <PageShell>
      <StudioEditor initialDraft={initialDraft} role={role} />
    </PageShell>
  );
}
