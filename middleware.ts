import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export default auth(async req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  if (nextUrl.pathname.startsWith("/app") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/app") && isLoggedIn) {
    if (!user?.name || !user.username) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }
  }

  if (AUTH_ROUTES.includes(nextUrl.pathname) && isLoggedIn) {
    if (!user?.name || !user.username) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    return NextResponse.redirect(new URL("/app", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/onboarding")) {
    if (isLoggedIn && user?.name && user.username) {
      return NextResponse.redirect(new URL("/app", nextUrl));
    }
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/activate") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
