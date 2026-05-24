import { cookies } from "next/headers";

import { canAccessStudio, canPublish, parseUserRole } from "@/features/auth/rbac";

export async function getCurrentUserRole(roleOverride?: string | null) {
  const cookieStore = await cookies();

  return parseUserRole(roleOverride ?? cookieStore.get("page_studio_role")?.value);
}

export async function assertCanAccessStudio(roleOverride?: string | null) {
  const role = await getCurrentUserRole(roleOverride);

  if (!canAccessStudio(role)) {
    throw new Error("Studio access requires editor permissions.");
  }

  return role;
}

export async function assertCanPublish() {
  const role = await getCurrentUserRole();

  if (!canPublish(role)) {
    throw new Error("Publishing requires publisher permissions.");
  }

  return role;
}
