'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/lib/auth';
import { Languages, Bell, MessageSquare, Info, LogOut, UserX } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { logout } = useAuthStore();

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showAppInfoDialog, setShowAppInfoDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const languages = [
    { code: 'ko', flag: '🇰🇷', name: t('한국어') },
    { code: 'en', flag: '🇺🇸', name: t('English') },
    { code: 'zh', flag: '🇨🇳', name: t('중문') },
    { code: 'vi', flag: '🇻🇳', name: t('베트남어') },
    { code: 'th', flag: '🇹🇭', name: t('태국어') },
    { code: 'ne', flag: '🇳🇵', name: t('네팔어') },
    { code: 'km', flag: '🇰🇭', name: t('캄보디아어') },
    { code: 'ru', flag: '🇷🇺', name: t('러시아어') },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (langCode: string) => {
    router.push(`/${langCode}/settings`);
    setShowLanguageDialog(false);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      alert(t('피드백 내용을 입력해주세요'));
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.submitFeedback(feedbackText.trim());
      setShowFeedbackDialog(false);
      setFeedbackText('');
      alert(t('피드백이 성공적으로 전송되었습니다'));
    } catch (error) {
      console.error('피드백 전송 실패:', error);
      alert(t('피드백 전송에 실패했습니다'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    logout();
    router.push(`/${locale}/phone-login`);
  };

  const handleDeleteAccount = async () => {
    try {
      setIsSubmitting(true);
      await authService.deleteAccount();
      logout();
      router.push(`/${locale}/phone-login`);
      alert(t('회원 탈퇴 완료 메시지'));
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('탈퇴 처리 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.push(`/${locale}/main?tab=4`)}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">{t('설정')}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* 일반 섹션 */}
          <SettingsSection title={t('일반')}>
            <SettingsItem
              icon={<Languages className="w-5 h-5" />}
              title={t('언어 설정')}
              subtitle={currentLanguage?.name}
              onClick={() => setShowLanguageDialog(true)}
            />
            <SettingsItem
              icon={<Bell className="w-5 h-5" />}
              title={t('알림 설정')}
              subtitle={t('푸시 알림 관리')}
              onClick={() => alert(t('알림 설정 기능 준비 중입니다'))}
            />
          </SettingsSection>

          {/* 지원 섹션 */}
          <SettingsSection title={t('지원')}>
            <SettingsItem
              icon={<MessageSquare className="w-5 h-5" />}
              title={t('피드백 보내기')}
              subtitle={t('개선 사항 제안')}
              onClick={() => setShowFeedbackDialog(true)}
            />
            <SettingsItem
              icon={<Info className="w-5 h-5" />}
              title={t('앱 정보')}
              subtitle={t('앱 버전')}
              onClick={() => setShowAppInfoDialog(true)}
            />
          </SettingsSection>

          {/* 계정 섹션 */}
          <SettingsSection title={t('계정')}>
            <SettingsItem
              icon={<LogOut className="w-5 h-5" />}
              title={t('로그아웃')}
              titleColor="text-orange-500"
              onClick={() => setShowLogoutDialog(true)}
            />
            <SettingsItem
              icon={<UserX className="w-5 h-5" />}
              title={t('회원 탈퇴')}
              titleColor="text-red-500"
              onClick={() => setShowDeleteAccountDialog(true)}
            />
          </SettingsSection>
        </div>
      </div>

      {/* 언어 선택 다이얼로그 */}
      {showLanguageDialog && (
        <Dialog onClose={() => setShowLanguageDialog(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('언어 설정')}</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    checked={lang.code === locale}
                    readOnly
                    className="w-4 h-4"
                  />
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`text-base ${lang.code === locale ? 'font-bold' : ''}`}>
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageDialog(false)}
              className="mt-4 w-full py-2 text-gray-600"
            >
              {t('닫기')}
            </button>
          </div>
        </Dialog>
      )}

      {/* 피드백 다이얼로그 */}
      {showFeedbackDialog && (
        <Dialog onClose={() => setShowFeedbackDialog(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('피드백 보내기')}</h2>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={t('개선 사항이나 문제점을 알려주세요')}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1 mb-4">
              {feedbackText.length}/500
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFeedbackDialog(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                {t('취소')}
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={isSubmitting || !feedbackText.trim()}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('전송 중') : t('보내기')}
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* 앱 정보 다이얼로그 */}
      {showAppInfoDialog && (
        <Dialog onClose={() => setShowAppInfoDialog(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('웰컴투코리아')}</h2>
            <div className="text-gray-700 mb-6 whitespace-pre-line">
              <p className="mb-2">{t('앱 버전')}</p>
              <p className="mb-2">{t('앱 설명')}</p>
              <p className="text-sm mt-4">{t('개발자 정보')}</p>
            </div>
            <button
              onClick={() => setShowAppInfoDialog(false)}
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {t('확인')}
            </button>
          </div>
        </Dialog>
      )}

      {/* 로그아웃 확인 다이얼로그 */}
      {showLogoutDialog && (
        <Dialog onClose={() => setShowLogoutDialog(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('로그아웃')}</h2>
            <p className="text-gray-700 mb-6">{t('정말 로그아웃 하시겠습니까?')}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t('취소')}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                {t('로그아웃')}
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* 회원 탈퇴 확인 다이얼로그 */}
      {showDeleteAccountDialog && (
        <Dialog onClose={() => setShowDeleteAccountDialog(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('회원 탈퇴')}</h2>
            <div className="mb-6">
              <p className="text-base font-medium mb-3">{t('정말로 탈퇴하시겠습니까?')}</p>
              <p className="text-sm text-red-600 font-medium mb-2">
                {t('탈퇴 시 다음 정보들이 삭제됩니다')}
              </p>
              <p className="text-sm text-gray-600 mb-3 whitespace-pre-line leading-relaxed">
                {t('프로필 정보 삭제 경고')}
              </p>
              <p className="text-sm text-red-600 font-semibold">
                {t('이 작업은 되돌릴 수 없습니다')}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteAccountDialog(false)}
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t('취소')}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300"
              >
                {isSubmitting ? t('탈퇴 처리 중') : t('탈퇴하기')}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

// 설정 섹션 컴포넌트
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 mb-2 px-4">{title}</h3>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// 설정 아이템 컴포넌트
function SettingsItem({
  icon,
  title,
  subtitle,
  titleColor = 'text-gray-900',
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  titleColor?: string;
  onClick: () => void;
}) {
  const iconColor = titleColor === 'text-orange-500' ? 'text-orange-500' : titleColor === 'text-red-500' ? 'text-red-500' : 'text-gray-900';
  const bgColor = titleColor === 'text-orange-500' ? 'bg-orange-50' : titleColor === 'text-red-500' ? 'bg-red-50' : 'bg-gray-100';

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="flex-1 text-left">
        <div className={`text-base font-medium ${titleColor}`}>{title}</div>
        {subtitle && <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div>}
      </div>
      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

// 다이얼로그 컴포넌트
function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
