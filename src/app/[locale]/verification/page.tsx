'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';

function VerificationForm() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;

  const phoneNumber = searchParams.get('phone') || '';
  const { setUser, setToken } = useAuthStore();

  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0]?.current?.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    // Handle paste
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const newCode = [...code];
      for (let i = 0; i < digits.length && i < 4; i++) {
        newCode[i] = digits[i];
      }
      setCode(newCode);

      // Focus last filled input
      const lastIndex = Math.min(digits.length - 1, 3);
      inputRefs[lastIndex]?.current?.focus();

      // Auto verify if all filled
      if (digits.length === 4) {
        verifyCode(newCode.join(''));
      }
      return;
    }

    // Handle single digit input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }

    // Auto verify when all filled
    if (newCode.every((digit) => digit)) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const verifyCode = async (verificationCode: string) => {
    if (verificationCode.length !== 4) return;

    setError('');
    setIsLoading(true);

    try {
      const response = await authService.verifyCode({
        phone_number: phoneNumber,
        verification_code: verificationCode,
      });

      console.log('✅ 인증 성공:', response);
      console.log('🔑 토큰:', response.token ? `${response.token.substring(0, 20)}...` : 'No token');

      // Save token and user data
      setToken(response.token);
      setUser(response.user);

      console.log('💾 토큰 저장 완료 - localStorage 확인:', localStorage.getItem('access_token') ? 'OK' : 'FAIL');

      // Check if new user or profile is incomplete
      const isNewUser = response.is_new_user;
      const user = response.user;
      const isProfileIncomplete =
        user.username === phoneNumber || !user.country || user.country === 'OTHER';

      if (isNewUser) {
        // 신규 사용자는 약관 동의 화면으로 이동
        router.push(`/${locale}/terms-agreement?phone=${encodeURIComponent(phoneNumber)}`);
      } else if (isProfileIncomplete) {
        // 기존 사용자지만 프로필 미완성이면 프로필 설정으로
        router.push(`/${locale}/profile-setup`);
      } else {
        // 기존 사용자이고 프로필 완성되어 있으면 메인으로
        router.push(`/${locale}/main`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t('인증에 실패했습니다'));
      // Clear code on error
      setCode(['', '', '', '']);
      inputRefs[0]?.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      await authService.sendVerificationCode({ phone_number: phoneNumber });
      alert(t('인증번호를 다시 발송했습니다'));
    } catch (err: any) {
      setError(t('인증번호 재발송에 실패했습니다'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E5E5]">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-black hover:text-[#737373] -ml-1"
            aria-label="뒤로 가기"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg sm:text-xl font-semibold pr-5">{t('전화번호 인증')}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">{t('인증번호 입력')}</h2>
          <p className="text-sm sm:text-base text-[#737373] px-2">
            {phoneNumber}
            {t('로 발송된 인증번호를 입력해주세요')}
          </p>
        </div>

        {/* Code Input */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-center text-xl sm:text-2xl font-bold border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Verify Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onClick={() => verifyCode(code.join(''))}
          className="mb-6"
        >
          {t('인증하기')}
        </Button>

        {/* Resend Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-sm sm:text-base text-[#737373] hover:text-black underline disabled:opacity-50 transition-colors"
          >
            {t('인증번호를 받지 못했나요?')} {t('재발송')}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <VerificationForm />
    </Suspense>
  );
}
