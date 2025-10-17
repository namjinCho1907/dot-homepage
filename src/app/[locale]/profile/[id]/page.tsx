'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { profileService } from '@/lib/profile';
import { chatService } from '@/lib/chat';
import type { User } from '@/types';
import Avatar from '@/components/ui/Avatar';
import { getCountryByCode } from '@/lib/countries';

export default function UserProfilePage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const userId = parseInt(params.id as string);
  const { user: currentUser } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blockStatus, setBlockStatus] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    loadUserProfile();
    checkBlockStatus();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await profileService.getUserProfile(userId);
      setUser(profile);
    } catch (error: any) {
      console.error('프로필 로드 실패:', error);
      setError(t('프로필을 불러올 수 없습니다'));
    } finally {
      setLoading(false);
    }
  };

  const checkBlockStatus = async () => {
    try {
      const status = await profileService.checkBlocked(userId);
      setBlockStatus(status);
    } catch (error) {
      console.error('차단 상태 확인 실패:', error);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      await profileService.sendFriendRequest(userId);
      alert(t('친구 요청을 보냈습니다'));
      loadUserProfile();
    } catch (error: any) {
      alert(error.response?.data?.error || t('친구 요청에 실패했습니다'));
    }
  };

  const handleStartChat = async () => {
    try {
      const room = await chatService.createPrivateRoom(userId);
      router.push(`/${locale}/chat/${room.id}`);
    } catch (error: any) {
      alert(error.response?.data?.error || t('채팅방 생성에 실패했습니다'));
    }
  };

  const handleBlock = async () => {
    if (!confirm(t('이 사용자를 차단하시겠습니까?'))) return;

    try {
      await profileService.blockUser(userId);
      alert(t('차단되었습니다'));
      router.back();
    } catch (error: any) {
      alert(error.response?.data?.error || t('차단에 실패했습니다'));
    }
  };

  const handleReport = async (reportType: string, description: string) => {
    try {
      await profileService.reportUser(userId, reportType, description);
      alert(t('신고가 접수되었습니다'));
      setShowReportModal(false);
    } catch (error: any) {
      alert(error.response?.data?.error || t('신고에 실패했습니다'));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-500">{t('로딩 중')}</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          {t('돌아가기')}
        </button>
      </div>
    );
  }

  const country = user.country ? getCountryByCode(user.country) : null;
  const isBlocked = blockStatus?.is_blocked;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{t('프로필')}</h1>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-600 hover:text-gray-900 relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <button
                  onClick={handleBlock}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('차단하기')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowReportModal(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  {t('신고하기')}
                </button>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={user.profile_image}
            name={user.username}
            size="xl"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
              {country && (
                <span className="text-2xl">{country.flag}</span>
              )}
            </div>
            {user.bio && (
              <p className="text-gray-600 mb-2">{user.bio}</p>
            )}
            {user.city && (
              <p className="text-sm text-gray-500">{user.city}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.friends_count || 0}</div>
              <div className="text-sm text-gray-500">{t('친구')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.photos?.length || 0}</div>
              <div className="text-sm text-gray-500">{t('사진')}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isBlocked && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleSendFriendRequest}
              className="flex-1 py-3 bg-white border-2 border-black text-black rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('친구 추가')}
            </button>
            <button
              onClick={handleStartChat}
              className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('채팅하기')}
            </button>
          </div>
        )}

        {/* Photos Grid */}
        {user.photos && user.photos.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t('사진')}</h3>
            <div className="grid grid-cols-3 gap-2">
              {user.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  {photo.image && (
                    <img
                      src={photo.image}
                      alt={photo.caption || ''}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}
    </div>
  );
}

// Report Modal Component
function ReportModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (type: string, description: string) => void;
}) {
  const t = useTranslations();
  const [reportType, setReportType] = useState('spam');
  const [description, setDescription] = useState('');

  const reportTypes = [
    { value: 'spam', label: t('스팸/광고') },
    { value: 'abuse', label: t('욕설/비방') },
    { value: 'inappropriate', label: t('부적절한 콘텐츠') },
    { value: 'harassment', label: t('괴롭힘') },
    { value: 'impersonation', label: t('사칭') },
    { value: 'other', label: t('기타') },
  ];

  const handleSubmit = () => {
    if (!description.trim()) {
      alert(t('신고 사유를 입력해주세요'));
      return;
    }
    onSubmit(reportType, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('사용자 신고')}</h3>

        {/* Report Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('신고 유형')}
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {reportTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('신고 사유')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('자세한 신고 사유를 입력해주세요')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {t('취소')}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('신고하기')}
          </button>
        </div>
      </div>
    </div>
  );
}
