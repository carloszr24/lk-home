import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-session'
import {
  adminAccessDeniedResponse,
  applyAdminSecurityHeaders,
  isAdminIpAllowed,
} from '@/lib/admin-security'

function isAuthed(request: NextRequest): boolean {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  const touchesAdmin =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/admin') ||
    (pathname.startsWith('/api/propiedades') && method !== 'GET') ||
    pathname.startsWith('/api/uploads') ||
    (pathname.startsWith('/api/leads') && method !== 'POST')

  if (!touchesAdmin) {
    return NextResponse.next()
  }

  if (!isAdminIpAllowed(request)) {
    return adminAccessDeniedResponse(403)
  }

  const isPublicAdminRoute =
    (pathname === '/api/admin/login' && method === 'POST') ||
    (pathname === '/api/admin/session' && method === 'GET')

  if (!isPublicAdminRoute && pathname.startsWith('/api/') && !isAuthed(request)) {
    return adminAccessDeniedResponse(401)
  }

  return applyAdminSecurityHeaders(NextResponse.next())
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/propiedades/:path*', '/api/uploads/:path*', '/api/leads'],
}
