import { NextResponse, type NextRequest } from "next/server";

import { canAccessStudio, parseUserRole } from "@/features/auth/rbac";

export function proxy(request: NextRequest) {
  const role = parseUserRole(request.cookies.get("page_studio_role")?.value);

  // Proxy provides route-level protection, while server helpers protect privileged
  // actions. UI conditionals are only a reflection of these server-side boundaries.
  if (request.nextUrl.pathname.startsWith("/studio") && !canAccessStudio(role)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "studio-forbidden");

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
