import { cookies } from "next/headers";

import { canAccessStudio, canPublish, parseUserRole } from "@/features/auth/rbac";

export async function getCurrentUserRole() {
  const cookieStore = await cookies();

  return parseUserRole(cookieStore.get("page_studio_role")?.value);
}

export async function assertCanAccessStudio() {
  const role = await getCurrentUserRole();

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
