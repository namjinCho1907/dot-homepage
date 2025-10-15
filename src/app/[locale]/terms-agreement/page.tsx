'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic'; // useSearchParams 사용으로 동적 렌더링 필요

function TermsAgreementForm() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;

  // URL에서 전화번호나 이메일 정보 받기
  const phoneNumber = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  // 개별 체크박스가 변경될 때마다 전체 동의 체크박스 상태 업데이트
  useEffect(() => {
    if (agreeTerms && agreePrivacy && agreeMarketing) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreeTerms, agreePrivacy, agreeMarketing]);

  const canProceed = agreeTerms && agreePrivacy;

  const handleProceed = () => {
    if (!canProceed) {
      alert(t('필수 약관에 동의해주세요'));
      return;
    }

    // 전화번호가 있으면 프로필 설정으로, 이메일만 있으면(소셜 로그인) 프로필 설정으로
    // 약관 동의 후에는 바로 프로필 설정으로 이동
    router.push(`/${locale}/profile-setup`);
  };

  const openTermsDetail = () => {
    // TODO: 이용약관 상세 페이지로 이동 또는 모달 표시
    alert('이용약관 상세 페이지 (구현 예정)');
  };

  const openPrivacyDetail = () => {
    // TODO: 개인정보 처리방침 상세 페이지로 이동 또는 모달 표시
    alert('개인정보 처리방침 상세 페이지 (구현 예정)');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5]">
        <div className="px-4 py-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">{t('약관 동의')}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-2xl mx-auto">
          {/* 안내 문구 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 whitespace-pre-line">
              {t('서비스 이용을 위해 약관에 동의해주세요')}
            </h2>
            <p className="text-sm text-[#737373]">
              {t('원활한 서비스 이용을 위해 필요한 약관입니다')}
            </p>
          </div>

          {/* 전체 동의 */}
          <div
            className={`mb-4 p-4 rounded-xl border-2 transition-colors ${
              agreeAll
                ? 'bg-blue-50 border-blue-600'
                : 'bg-white border-[#E5E5E5]'
            }`}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={agreeAll}
                onChange={(e) => handleAgreeAll(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex-1">
                <div className="font-bold text-base text-[#1A1A1A]">
                  {t('전체 동의')}
                </div>
                <div className="text-xs text-[#737373]">
                  {t('선택 항목 포함')}
                </div>
              </div>
            </label>
          </div>

          <div className="my-4 border-t border-[#E5E5E5]"></div>

          {/* 이용약관 동의 (필수) */}
          <div className="mb-3 p-4 bg-white rounded-xl border border-[#E5E5E5]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex-1 flex items-center">
                <span className="text-sm font-semibold text-blue-600 mr-1">
                  {t('[필수]')}
                </span>
                <span className="text-sm text-[#1A1A1A]">
                  {t('이용약관 동의')}
                </span>
              </div>
              <button
                onClick={openTermsDetail}
                className="ml-2 text-[#737373] hover:text-[#1A1A1A]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 개인정보 처리방침 동의 (필수) */}
          <div className="mb-3 p-4 bg-white rounded-xl border border-[#E5E5E5]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex-1 flex items-center">
                <span className="text-sm font-semibold text-blue-600 mr-1">
                  {t('[필수]')}
                </span>
                <span className="text-sm text-[#1A1A1A]">
                  {t('개인정보 처리방침 동의')}
                </span>
              </div>
              <button
                onClick={openPrivacyDetail}
                className="ml-2 text-[#737373] hover:text-[#1A1A1A]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 마케팅 정보 수신 동의 (선택) */}
          <div className="mb-3 p-4 bg-white rounded-xl border border-[#E5E5E5]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeMarketing}
                onChange={(e) => setAgreeMarketing(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex-1 flex items-center">
                <span className="text-sm font-semibold text-[#737373] mr-1">
                  {t('[선택]')}
                </span>
                <span className="text-sm text-[#1A1A1A]">
                  {t('마케팅 정보 수신 동의')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="bg-white border-t border-[#E5E5E5] p-6 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleProceed}
            disabled={!canProceed}
            className={`w-full h-14 rounded-xl font-bold text-base transition-colors ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('다음')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TermsAgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">Loading...</div>}>
      <TermsAgreementForm />
    </Suspense>
  );
}
