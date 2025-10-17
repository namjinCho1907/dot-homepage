'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { profileService } from '@/lib/profile';
import { notificationService } from '@/lib/notifications';
import { getCountryData } from '@/lib/countries';
import type { User, UserPhoto } from '@/types';
import PhotoGrid from './PhotoGrid';
import PhotoDetailModal from './PhotoDetailModal';

export default function ProfileScreen() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { user: authUser, setUser } = useAuthStore();

  const [user, setLocalUser] = useState<User | null>(authUser);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isProfileImageMenuOpen, setIsProfileImageMenuOpen] = useState(false);

  // 프로필 데이터 로드
  useEffect(() => {
    loadProfile();
    loadUnreadNotifications();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await profileService.getCurrentProfile();
      setLocalUser(profile);
      setUser(profile);
    } catch (error) {
      console.error('프로필 로드 실패:', error);
    }
  };

  const loadUnreadNotifications = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadNotifications(count);
    } catch (error) {
      console.error('알림 개수 로드 실패:', error);
    }
  };

  const handleProfileImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const updatedUser = await profileService.updateProfileImage(file);
      setLocalUser(updatedUser);
      setUser(updatedUser);
      setIsProfileImageMenuOpen(false);
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      alert(t('프로필 사진 업로드에 실패했습니다'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProfileImage = async () => {
    if (!confirm(t('프로필 사진을 삭제하시겠습니까?'))) {
      return;
    }

    try {
      setIsLoading(true);
      const updatedUser = await profileService.removeProfileImage();
      setLocalUser(updatedUser);
      setUser(updatedUser);
      setIsProfileImageMenuOpen(false);
    } catch (error) {
      console.error('프로필 이미지 삭제 실패:', error);
      alert(t('프로필 사진 삭제에 실패했습니다'));
    } finally {
      setIsLoading(false);
    }
  };

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return '';
    const country = getCountryData().find(c => c.code === countryCode);
    return country?.flag || '';
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-lg font-semibold">{t('프로필')}</h1>
          <div className="flex items-center gap-2">
            {/* 알림 버튼 */}
            <button
              onClick={() => router.push(`/${locale}/notifications`)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <div className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 rounded-full">
                  <span className="text-white text-[10px] font-bold">
                    {unreadNotifications > 99 ? '99+' : unreadNotifications}
                  </span>
                </div>
              )}
            </button>
            {/* 설정 버튼 */}
            <button
              onClick={() => router.push(`/${locale}/settings`)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Profile Card */}
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 mb-5">
            {/* 프로필 이미지 */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-[#E5E5E5] overflow-hidden bg-[#F5F5F5]">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#A3A3A3]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* 이미지 변경 버튼 */}
                <button
                  onClick={() => setIsProfileImageMenuOpen(true)}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 사용자 정보 */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                {user.country && (
                  <span className="text-xl">{getCountryFlag(user.country)}</span>
                )}
              </div>
              {user.bio && (
                <p className="text-[#525252] mb-2">{user.bio}</p>
              )}
              {user.city && (
                <div className="flex items-center justify-center gap-1 text-[#525252]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-sm">{user.city}</span>
                </div>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/${locale}/profile-edit`)}
                className="flex-1 py-2 px-4 border border-[#D4D4D4] rounded-md text-sm font-semibold hover:bg-[#F5F5F5] transition-colors"
              >
                {t('프로필 편집')}
              </button>
              <button
                onClick={() => {
                  // TODO: 프로필 공유 기능
                  alert(t('프로필 공유 기능 준비 중입니다'));
                }}
                className="flex-1 py-2 px-4 border border-[#D4D4D4] rounded-md text-sm font-semibold hover:bg-[#F5F5F5] transition-colors"
              >
                {t('프로필 공유')}
              </button>
            </div>
          </div>

          {/* 친구 통계 */}
          <div className="flex justify-center mb-5">
            <button
              onClick={() => router.push(`/${locale}/friends`)}
              className="flex flex-col items-center hover:opacity-70 transition-opacity"
            >
              <svg className="w-8 h-8 text-[#525252] mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span className="text-lg font-bold text-[#404040]">
                {user.friends_count || 0}
              </span>
              <span className="text-xs text-[#737373]">{t('친구')}</span>
            </button>
          </div>

          {/* 나의 이야기 섹션 */}
          <div className="border-t border-[#E5E5E5] pt-5">
            <div className="flex items-center justify-center gap-2 mb-5 pb-3 border-b-2 border-black">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
              </svg>
              <span className="text-base font-semibold">{t('나의 이야기')}</span>
            </div>

            <PhotoGrid
              photos={user.photos || []}
              onPhotoClick={(index) => setSelectedPhotoIndex(index)}
              onAddPhoto={() => router.push(`/${locale}/create-story`)}
            />
          </div>
        </div>
      </div>

      {/* 프로필 이미지 메뉴 모달 */}
      {isProfileImageMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
          onClick={() => setIsProfileImageMenuOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#D4D4D4] rounded-full mx-auto mb-4" />

            {user.profile_image ? (
              <>
                <label className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                    <span>{t('다른 사진으로 바꾸기')}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleProfileImageUpload(file);
                    }}
                  />
                </label>
                <button
                  onClick={handleRemoveProfileImage}
                  className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-red-500">{t('사진 내리기')}</span>
                  </div>
                </button>
              </>
            ) : (
              <label className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                  <span>{t('사진 선택')}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleProfileImageUpload(file);
                  }}
                />
              </label>
            )}

            <button
              onClick={() => setIsProfileImageMenuOpen(false)}
              className="block w-full p-4 text-left hover:bg-[#F5F5F5] rounded-lg transition-colors mt-2"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-[#737373]">{t('취소')}</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 사진 상세 모달 */}
      {selectedPhotoIndex !== null && user.photos && (
        <PhotoDetailModal
          photos={user.photos}
          initialIndex={selectedPhotoIndex}
          currentUser={user}
          onClose={() => setSelectedPhotoIndex(null)}
          onPhotoDeleted={loadProfile}
        />
      )}
    </div>
  );
}
