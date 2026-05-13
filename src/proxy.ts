import { NextRequest, NextResponse } from "next/server";
import { readSessionFromCookie, ADMIN_COOKIE } from "@/lib/admin/session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicAdminRoutes = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
  ];

  if (
    pathname.startsWith("/admin") &&
    !publicAdminRoutes.includes(pathname)
  ) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const session = await readSessionFromCookie(token);
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
