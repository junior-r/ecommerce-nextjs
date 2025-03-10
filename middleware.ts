import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

const url = process.env.NEXT_PUBLIC_URL;

const privateRoutes = ["/users/profile", "/dashboard"];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  console.log(req.auth);

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) return;
  if (isLoggedIn && isAuthRoute) return Response.redirect(`${url}/dashboard`);
  if (!isLoggedIn && isAuthRoute) return;
  if (!isLoggedIn && isPrivateRoute) return Response.redirect(`${url}/login`);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
