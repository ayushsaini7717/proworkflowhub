import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 1. Check if the user is trying to access the /admin route
  if (req.nextUrl.pathname.startsWith("/admin")) {
    
    // 2. Get the Authorization header
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      // 3. Decode the Base64 username:password pair
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      // 4. Verify against environment variables
      if (
        user === process.env.ADMIN_USER &&
        pwd === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next(); // ✅ Allow access
      }
    }

    // 5. If no auth or wrong password, force the browser popup
    return new NextResponse("Authentication Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
      },
    });
  }

  // Allow all other routes to pass through normally
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: "/admin/:path*",
};