'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';

export default function FeedPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, isLoading, router, locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">{t('로딩 중')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">WelcomeU</h1>
          <nav className="flex gap-6">
            <a href="/feed" className="text-blue-600 font-semibold">
              {t('피드')}
            </a>
            <a href="/board" className="text-gray-600 hover:text-gray-900">
              {t('게시판')}
            </a>
            <a href="/gatherings" className="text-gray-600 hover:text-gray-900">
              {t('모임')}
            </a>
            <a href="/chat" className="text-gray-600 hover:text-gray-900">
              {t('채팅')}
            </a>
            <a href="/profile" className="text-gray-600 hover:text-gray-900">
              {t('프로필')}
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t('피드')}</h2>
          <p className="text-gray-600">{t('곧 업데이트될 예정입니다')}</p>
        </div>
      </main>
    </div>
  );
}
