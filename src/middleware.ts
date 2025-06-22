import { type NextRequest, NextResponse } from "next/server";
// import { verifyAuth } from './lib/auth' // Assume you have an auth utility

// Route configurations
const publicRoutes = ["/", "/about", "/contact", "/pricing"];
const authRoutes = ["/login", "/register", "/verify-email", "/reset-password", "/forgot-password"];
// const apiAuthRoutes = ["/api/account", "/api/profile"];
const privateRoutes = [
  "/dashboard",
  "/dashboard/:path*", // Match all subroutes
  "/profile",
  "/settings",
  "/billing",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  //   const cookies = request.cookies;
  //   const sessionToken = cookies.get("sessionToken")?.value;
  //   const isAuthenticated = sessionToken ? await verifyAuth(sessionToken) : false

  // 1. Handle API routes
  if (pathname.startsWith("/api")) {
    // if (apiAuthRoutes.some(route => pathname.startsWith(route)) {
    //   if (!isAuthenticated) {
    //     return NextResponse.json(
    //       { error: 'Unauthorized' },
    //       { status: 401 }
    //     )
    //   }
    // }
    return NextResponse.next();
  }

  // 2. Check if current route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Handle auth routes for authenticated users
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    // if (isAuthenticated) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
    return NextResponse.next();
  }

  // 4. Handle private routes
  if (
    privateRoutes.some((route) => {
      const regex = new RegExp(`^${route.replace(/:\w+/g, "\\w+").replace(/\*/g, ".*")}$`);
      return regex.test(pathname);
    })
  ) {
    // if (!isAuthenticated) {
    //   const redirectUrl = new URL('/login', request.url)
    //   redirectUrl.searchParams.set('redirect', pathname)
    //   return NextResponse.redirect(redirectUrl)
    // }
    return NextResponse.next();
  }

  // 5. Allow static files and unmatched routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - public folder
     * - blog routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|public|blog|portfolio|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
