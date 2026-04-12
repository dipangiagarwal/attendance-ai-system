import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [
    "/dashboardlogin",
    "/dashboardregister",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  // ✅ Only protect actual dashboard route
  const isDashboardRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  // ❌ Not logged in → block dashboard
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(
      new URL("/dashboardlogin", request.url)
    );
  }

  // ❌ Logged in → block login/register
  if (token && isPublicRoute) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboardlogin",
    "/dashboardregister",
  ],
};