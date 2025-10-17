import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // 지원 언어 목록 (임시로 한국어만 활성화 - 플레이 스토어 제출용)
  locales: ['ko'], // 원래: ['ko', 'en', 'zh', 'vi', 'th', 'ne', 'km', 'ru']

  // 기본 언어
  defaultLocale: 'ko',

  // URL에 언어 코드 항상 표시
  localePrefix: 'always',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
