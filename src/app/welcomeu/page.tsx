'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomeUPage() {
  const router = useRouter();

  useEffect(() => {
    // 기본 언어(한국어)로 리다이렉트
    router.push('/ko');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-600">로딩 중...</div>
    </div>
  );
}
