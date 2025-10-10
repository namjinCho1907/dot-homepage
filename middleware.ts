import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // /admin 경로는 Django 백엔드로 리다이렉트
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const backendUrl = 'https://welcomeu-api-xkxkkmidlq-du.a.run.app' + request.nextUrl.pathname + request.nextUrl.search
    return NextResponse.redirect(backendUrl, 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
