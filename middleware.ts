import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes: { path: string; role?: string }[] = [
  { path: "/users/profile", role: "" },
  { path: "/dashboard", role: "admin" },
];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes("/api");
  const isProtectedRoute = privateRoutes.find((route) =>
    nextUrl.pathname.startsWith(route.path)
  );

  if (!isLoggedIn && isAuthRoute) return;
  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.url));
  if (isLoggedIn && isApiRoute)
    return NextResponse.redirect(new URL("/", req.url));

  if (isProtectedRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));

    if (
      token &&
      token.role &&
      isProtectedRoute.role &&
      token.role.trim() !== isProtectedRoute.role.trim()
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
