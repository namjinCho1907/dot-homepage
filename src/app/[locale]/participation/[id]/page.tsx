'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { participationService } from '@/lib/participation';
import { Gathering } from '@/types';
import Avatar from '@/components/ui/Avatar';

export default function ParticipationDetailPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const id = parseInt(params.id as string);
  const { user } = useAuthStore();

  const [gathering, setGathering] = useState<Gathering | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    loadGathering();
  }, [id]);

  const loadGathering = async () => {
    try {
      setLoading(true);
      const data = await participationService.getGathering(id);
      setGathering(data);
    } catch (error) {
      console.error('참여 프로그램 로드 실패:', error);
      alert(t('게시글을 불러오는데 실패했습니다'));
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!gathering) return;

    if (gathering.author.id === user?.id) {
      alert(t('자신이 작성한 글에는 참여할 수 없습니다'));
      return;
    }

    if (gathering.is_joined) {
      alert(t('이미 참여 중입니다'));
      return;
    }

    if (gathering.status === 'full') {
      alert(t('참여 인원이 마감되었습니다'));
      return;
    }

    setIsJoining(true);
    try {
      await participationService.joinGathering(id);

      // 참여 완료 후 상세 정보 다시 로드
      const updatedGathering = await participationService.getGathering(id);
      setGathering(updatedGathering);

      // 채팅방이 있으면 채팅방으로 이동
      if (updatedGathering.chat_room) {
        alert(t('참여가 완료되었습니다! 채팅방으로 이동합니다'));
        router.push(`/${locale}/chat/${updatedGathering.chat_room.id}`);
      } else {
        alert(t('참여가 완료되었습니다!'));
      }
    } catch (error: any) {
      console.error('참여 실패:', error);
      alert(error.response?.data?.error || t('참여에 실패했습니다'));
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!gathering) return;

    if (!confirm(t('참여를 취소하시겠습니까?'))) return;

    setIsJoining(true);
    try {
      await participationService.leaveGathering(id);
      alert(t('참여가 취소되었습니다'));
      // 상세 정보 다시 로드
      loadGathering();
    } catch (error: any) {
      console.error('참여 취소 실패:', error);
      alert(error.response?.data?.error || t('참여 취소에 실패했습니다'));
    } finally{
      setIsJoining(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return t('방금 전');
    if (diffInMinutes < 60) return `${diffInMinutes}${t('분 전')}`;
    if (diffInHours < 24) return `${diffInHours}${t('시간 전')}`;
    if (diffInDays < 7) return `${diffInDays}${t('일 전')}`;

    return date.toLocaleDateString();
  };

  const getStatusBadge = () => {
    if (!gathering) return null;

    if (gathering.status === 'full') {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
          {t('모집완료')}
        </span>
      );
    }
    if (gathering.status === 'closed') {
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
          {t('종료')}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
        {t('모집중')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-gray-500">{t('로딩 중')}</div>
      </div>
    );
  }

  if (!gathering) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
        <p className="text-gray-700 mb-4">{t('게시글을 찾을 수 없습니다')}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          {t('돌아가기')}
        </button>
      </div>
    );
  }

  const isAuthor = gathering.author.id === user?.id;
  const canJoin = !isAuthor && !gathering.is_joined && gathering.status !== 'full' && gathering.status !== 'closed';
  const canLeave = !isAuthor && gathering.is_joined;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="px-4 py-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">{t('참여하기')}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Author Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar
                src={gathering.author.profile_image}
                name={gathering.author.username}
                size="lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{gathering.author.username}</span>
                  {getStatusBadge()}
                </div>
                <span className="text-sm text-gray-500">{formatDate(gathering.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{gathering.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-medium">
                  {gathering.current_participants}/{gathering.max_participants > 0 ? gathering.max_participants : '∞'}
                </span>
              </div>
              {gathering.city && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{gathering.city}</span>
                </div>
              )}
              {gathering.distance && (
                <span className="text-blue-600 font-medium">
                  {gathering.distance.toFixed(1)}km
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-800 whitespace-pre-wrap">{gathering.content}</p>
          </div>

          {/* Images */}
          {gathering.post_images && gathering.post_images.length > 0 && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {gathering.post_images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-lg bg-gray-200 overflow-hidden"
                  >
                    <img
                      src={img.image}
                      alt={`${t('이미지')} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Action Button */}
      {!isAuthor && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto">
            {canJoin && (
              <button
                onClick={handleJoin}
                disabled={isJoining}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isJoining ? t('처리 중') : t('참여하기')}
              </button>
            )}
            {canLeave && (
              <button
                onClick={handleLeave}
                disabled={isJoining}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400"
              >
                {isJoining ? t('처리 중') : t('참여 취소')}
              </button>
            )}
            {!canJoin && !canLeave && gathering.status === 'full' && (
              <div className="w-full py-3 bg-gray-200 text-gray-600 rounded-lg font-semibold text-center">
                {t('모집이 완료되었습니다')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
