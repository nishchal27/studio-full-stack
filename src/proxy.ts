import { NextResponse, type NextRequest } from "next/server";

import { canAccessStudio, parseUserRole } from "@/features/auth/rbac";

export function proxy(request: NextRequest) {
  const roleParam = request.nextUrl.searchParams.get("role");
  const role = parseUserRole(roleParam ?? request.cookies.get("page_studio_role")?.value);

  // Proxy provides route-level protection, while server helpers protect privileged
  // actions. UI conditionals are only a reflection of these server-side boundaries.
  if (request.nextUrl.pathname.startsWith("/studio") && !canAccessStudio(role)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.delete("role");
    url.searchParams.set("error", "studio-forbidden");

    const response = NextResponse.redirect(url);
    response.cookies.set("page_studio_role", role, { path: "/", sameSite: "lax" });

    return response;
  }

  const response = NextResponse.next();

  if (roleParam) {
    // Query-param role switching is intentionally lightweight for demos. Persisting the
    // mocked role lets protected server actions enforce the same walkthrough role.
    response.cookies.set("page_studio_role", role, { path: "/", sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: ["/studio/:path*"],
};
