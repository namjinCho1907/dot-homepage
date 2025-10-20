import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('[middleware.ts] Request pathname:', pathname);

  // Dot 홈페이지 경로는 middleware 적용 안함
  if (pathname === '/' || pathname.startsWith('/linker') || pathname.startsWith('/welcomeu') || pathname.startsWith('/u/') || pathname.startsWith('/app')) {
    console.log('[middleware.ts] Skipping intl for Dot homepage');
    return NextResponse.next();
  }

  // Extract locale from pathname manually
  const pathnameLocale = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  console.log('[middleware.ts] Extracted locale:', pathnameLocale);

  if (!pathnameLocale) {
    // Redirect to default locale
    console.log('[middleware.ts] No locale found, redirecting to default');
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}${pathname}`, request.url)
    );
  }

  // Set locale in header for next-intl
  const response = NextResponse.next();
  response.headers.set('x-next-intl-locale', pathnameLocale);
  console.log('[middleware.ts] Set locale header:', pathnameLocale);
  return response;
}

export const config = {
  // 모든 경로에 적용하되, api, _next, static 파일은 제외
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
