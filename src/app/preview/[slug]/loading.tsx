import { PageShell } from "@/components/shared/PageShell";
import { PreviewState } from "@/features/preview/PreviewStates";

export default function PreviewLoading() {
  return (
    <PageShell>
      <PreviewState title="Loading preview" message="Preparing validated page content." />
    </PageShell>
  );
}
