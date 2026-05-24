"use server";

import { assertCanPublish } from "@/features/auth/serverSession";

export async function preparePublishAction() {
  // The publish engine is intentionally deferred. This protected action exists now so
  // Phase 3 starts from a server-enforced authorization boundary instead of UI checks.
  await assertCanPublish();

  return {
    ok: true,
  };
}
