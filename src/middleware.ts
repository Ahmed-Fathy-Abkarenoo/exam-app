import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/forgot-password"];
const protectedRoutes = ["/diplomas", "/exams", "^/account.*$"];

export default async function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname);

  const token = await getToken({ req: request });

  if (protectedRoutes.some((route) => new RegExp(route).test(request.nextUrl.pathname))) {
    if (token) return NextResponse.next();

    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl || "/login");
  }

  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (!token) return NextResponse.next();

    return NextResponse.redirect(new URL("/diplomas", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
