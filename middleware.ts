import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const COOKIE_NAME = "aso_admin_session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Block common admin path probing attempts
  const blockedPaths = ["/admin", "/admin/", "/wp-admin", "/wp-login", "/dashboard", "/panel"]
  if (blockedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    // Only block if it's not our actual admin-panel path
    if (!pathname.startsWith("/admin-panel/")) {
      return new NextResponse(null, { status: 404 })
    }
  }

  // 2. Validate admin-panel secret path
  if (pathname.startsWith("/admin-panel/")) {
    const secretPath = process.env.ADMIN_SECRET_PATH
    if (!secretPath) {
      return new NextResponse(null, { status: 404 })
    }

    // Extract the secret segment from the URL
    const segments = pathname.split("/")
    const urlSecret = segments[2] // /admin-panel/[secret]/...

    if (urlSecret !== secretPath) {
      return new NextResponse(null, { status: 404 })
    }

    // Login page doesn't need auth check
    if (pathname.endsWith("/login")) {
      return NextResponse.next()
    }

    // Check auth for all other admin pages
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.redirect(
        new URL(`/admin-panel/${secretPath}/login`, request.url)
      )
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      // Invalid/expired token - redirect to login
      const response = NextResponse.redirect(
        new URL(`/admin-panel/${secretPath}/login`, request.url)
      )
      response.cookies.delete(COOKIE_NAME)
      return response
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  )

  return response
}

export const config = {
  matcher: [
    // Admin paths
    "/admin-panel/:path*",
    // Blocked paths (honeypots)
    "/admin",
    "/admin/:path*",
    "/wp-admin",
    "/wp-admin/:path*",
    "/wp-login",
    "/wp-login/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/panel",
    "/panel/:path*",
    // API routes - apply security headers
    "/api/:path*",
    // Public pages
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
}
