import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export default auth(async req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

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

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
