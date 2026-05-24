"use server";

import { assertCanPublish } from "@/features/auth/serverSession";
import { publishDraft } from "@/features/publish/publishDraft";
import { createRenderablePage } from "@/lib/validation/createRenderablePage";

export type PublishDraftActionResult =
  | {
      ok: true;
      idempotent: boolean;
      version: string;
      changelog: string[];
      createdAt: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function publishDraftAction(draft: unknown): Promise<PublishDraftActionResult> {
  await assertCanPublish();

  // Publish accepts untrusted client draft data and re-enters the shared renderable
  // pipeline on the server before calculating versions or writing snapshots.
  const renderableDraft = createRenderablePage(draft);

  if (!renderableDraft.ok) {
    return {
      ok: false,
      message: "Draft failed validation and was not published.",
    };
  }

  const result = await publishDraft(renderableDraft.page);

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    idempotent: result.idempotent,
    version: result.snapshot.version,
    changelog: result.snapshot.changelog,
    createdAt: result.snapshot.createdAt,
  };
}
