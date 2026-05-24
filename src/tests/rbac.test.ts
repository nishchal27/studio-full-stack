import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { canAccessStudio, canPublish, parseUserRole } from "@/features/auth/rbac";
import { proxy } from "@/proxy";

describe("rbac", () => {
  it("allows editors into Studio but blocks viewers", () => {
    expect(canAccessStudio("editor")).toBe(true);
    expect(canAccessStudio("publisher")).toBe(true);
    expect(canAccessStudio("viewer")).toBe(false);
  });

  it("limits publish permission to publishers", () => {
    expect(canPublish("publisher")).toBe(true);
    expect(canPublish("editor")).toBe(false);
  });

  it("parses unknown mocked roles to the local editor default", () => {
    expect(parseUserRole(undefined)).toBe("editor");
  });

  it("redirects explicit viewers away from Studio routes", () => {
    const request = new NextRequest("http://localhost:3000/studio/home", {
      headers: {
        cookie: "page_studio_role=viewer",
      },
    });

    const response = proxy(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("studio-forbidden");
  });

  it("uses demo role query params before mocked role cookies", () => {
    const request = new NextRequest("http://localhost:3000/studio/home?role=viewer", {
      headers: {
        cookie: "page_studio_role=publisher",
      },
    });

    const response = proxy(request);

    expect(response.status).toBe(307);
    expect(
      response.headers.getSetCookie().some((cookie) => cookie.includes("page_studio_role=viewer")),
    ).toBe(true);
  });

  it("persists allowed demo roles for protected server actions", () => {
    const request = new NextRequest("http://localhost:3000/studio/home?role=publisher");

    const response = proxy(request);

    expect(response.status).toBe(200);
    expect(
      response.headers
        .getSetCookie()
        .some((cookie) => cookie.includes("page_studio_role=publisher")),
    ).toBe(true);
  });
});
