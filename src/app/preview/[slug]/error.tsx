"use client";

import { PageShell } from "@/components/shared/PageShell";
import { PreviewState } from "@/features/preview/PreviewStates";

export default function PreviewError() {
  return (
    <PageShell>
      <PreviewState
        title="Preview could not render"
        message="An unexpected preview error was isolated before it could affect the rest of the application."
      />
    </PageShell>
  );
}
