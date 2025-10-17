'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LanguageSelector from '@/components/LanguageSelector';

// Google Identity Services 타입 정의
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { setUser, setToken } = useAuthStore();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // Google Identity Services 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('📞 전화번호 인증 시작:', phoneNumber);
      const response = await authService.sendVerificationCode({ phone_number: phoneNumber });
      console.log('✅ 인증번호 발송 성공:', response);

      // 신규/기존 사용자 모두 인증번호 입력 화면으로 이동
      const isExistingUser = response.is_existing_user;
      const nextUrl = `/${locale}/verification?phone=${encodeURIComponent(phoneNumber)}&isExisting=${isExistingUser}`;
      console.log('🔄 페이지 이동 시도:', nextUrl);

      // setTimeout으로 페이지 이동 (state 업데이트 방지)
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 100);

      return; // finally 블록으로 가지 않도록
    } catch (err: any) {
      console.error('❌ 인증번호 발송 실패:', err);
      console.error('❌ 에러 응답:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || t('네트워크 오류');
      setError(errorMessage);
      alert(`로그인 실패: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      if (!window.google) {
        throw new Error('Google Identity Services not loaded');
      }

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId || clientId === 'your_google_client_id_here') {
        alert(t('Google 로그인 설정 필요'));
        setGoogleLoading(false);
        return;
      }

      // Google OAuth2 토큰 클라이언트 초기화
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: async (response: any) => {
          try {
            if (response.access_token) {
              // 백엔드로 access token 전송
              const loginResponse = await authService.googleLogin(response.access_token);

              // 토큰 및 사용자 정보 저장
              setToken(loginResponse.token);
              setUser(loginResponse.user);

              // 프로필 완성 여부 확인
              const user = loginResponse.user;
              const isNewUser = loginResponse.is_new_user;
              const isProfileIncomplete =
                user.username === user.phone_number || !user.country || user.country === 'OTHER';

              if (isNewUser) {
                // 신규 사용자는 약관 동의 화면으로 이동 (소셜 로그인이므로 전화번호 없음)
                router.push(`/${locale}/terms-agreement?email=${encodeURIComponent(user.email || '')}`);
              } else if (isProfileIncomplete) {
                router.push(`/${locale}/profile-setup`);
              } else {
                router.push(`/${locale}/main`);
              }
            }
          } catch (err: any) {
            console.error('Google login error:', err);
            setError(err.response?.data?.message || t('Google 로그인 실패'));
          } finally {
            setGoogleLoading(false);
          }
        },
        error_callback: (error: any) => {
          console.error('Google OAuth error:', error);
          setError(t('Google 로그인 취소'));
          setGoogleLoading(false);
        },
      });

      // 토큰 요청 시작
      client.requestAccessToken();
    } catch (err: any) {
      console.error('Google login initialization error:', err);
      setError(t('Google 로그인 초기화 실패'));
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E5E5]">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center">WelcomeU</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Language Selector */}
        <div className="mb-8 sm:mb-10 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2 sm:gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span className="text-sm sm:text-base text-blue-900 font-semibold">{t('언어 선택')}</span>
          <LanguageSelector />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2">
            {t('대한민국에 오신 것을 환영합니다')}
          </h2>
          <p className="text-sm sm:text-base text-[#737373]">{t('전화번호로 간편하게 로그인하세요')}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSendCode} className="space-y-6">
          <Input
            type="tel"
            label={t('전화번호')}
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={error}
            fullWidth
            required
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          />

          <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
            {t('인증번호 전송')}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 sm:my-10 flex items-center">
          <div className="flex-1 border-t border-[#E5E5E5]"></div>
          <span className="px-3 sm:px-4 text-[#737373] text-xs sm:text-sm">{t('또는')}</span>
          <div className="flex-1 border-t border-[#E5E5E5]"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 sm:space-y-4">
          {/* Google Login */}
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleGoogleLogin}
            loading={googleLoading}
            className="flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="font-semibold">{t('Google로 계속하기')}</span>
          </Button>
        </div>

        {/* Terms */}
        <p className="mt-8 sm:mt-10 text-center text-xs text-[#737373] leading-relaxed">
          {t('로그인 약관 동의')}
        </p>
      </main>
    </div>
  );
}
