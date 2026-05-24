import type { UserRole } from "@/types/domain";

export const rolePermissions = {
  viewer: {
    canAccessStudio: false,
    canEditDrafts: false,
    canPublish: false,
  },
  editor: {
    canAccessStudio: true,
    canEditDrafts: true,
    canPublish: false,
  },
  publisher: {
    canAccessStudio: true,
    canEditDrafts: true,
    canPublish: true,
  },
} satisfies Record<UserRole, Record<string, boolean>>;

export function parseUserRole(value: string | undefined | null): UserRole {
  if (value === "viewer" || value === "editor" || value === "publisher") {
    return value;
  }

  // This is intentionally permissive for the mocked local session. Real auth can replace
  // the source of the role without changing middleware or server-action permission checks.
  return "editor";
}

export function canAccessStudio(role: UserRole) {
  return rolePermissions[role].canAccessStudio;
}

export function canPublish(role: UserRole) {
  return rolePermissions[role].canPublish;
}
