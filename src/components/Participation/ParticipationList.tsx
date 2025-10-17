'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { participationService } from '@/lib/participation';
import { Gathering } from '@/types';
import Avatar from '@/components/ui/Avatar';

interface ParticipationListProps {
  onGatheringClick?: (gathering: Gathering) => void;
}

export default function ParticipationList({ onGatheringClick }: ParticipationListProps) {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGatherings();
  }, []);

  const loadGatherings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await participationService.getGatherings();
      setGatherings(data);
    } catch (error: any) {
      console.error('참여 프로그램 로드 실패:', error);
      if (error.response?.status === 401) {
        setError(t('로그인이 필요합니다'));
      } else {
        setError(t('데이터를 불러오는데 실패했습니다'));
      }
    } finally {
      setLoading(false);
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

  const getStatusBadge = (status: string, currentParticipants: number, maxParticipants: number) => {
    if (status === 'full') {
      return (
        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
          {t('모집완료')}
        </span>
      );
    }
    if (status === 'closed') {
      return (
        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
          {t('종료')}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
        {t('모집중')}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900">{t('참여 프로그램')}</h2>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('로딩 중')}</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-700 mb-2 font-medium">{error}</p>
            <button
              onClick={loadGatherings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('다시 시도')}
            </button>
          </div>
        ) : gatherings.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('참여 프로그램이 없습니다')}</div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {gatherings.map((gathering) => (
              <div
                key={gathering.id}
                onClick={() => {
                  if (onGatheringClick) {
                    onGatheringClick(gathering);
                  } else {
                    router.push(`/${locale}/participation/${gathering.id}`);
                  }
                }}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar
                      src={gathering.author.profile_image}
                      name={gathering.author.username}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900 truncate">
                          {gathering.author.username}
                        </span>
                        {getStatusBadge(gathering.status, gathering.current_participants, gathering.max_participants)}
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(gathering.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{gathering.title}</h3>

                {/* Content */}
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{gathering.content}</p>

                {/* Images */}
                {gathering.post_images && gathering.post_images.length > 0 && (
                  <div className="mb-3">
                    <div className="grid grid-cols-3 gap-2">
                      {gathering.post_images.slice(0, 3).map((img, idx) => (
                        <div
                          key={img.id}
                          className="aspect-square rounded-lg bg-gray-200 overflow-hidden"
                        >
                          <img
                            src={img.image}
                            alt={`이미지 ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
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
                        <span className="text-xs truncate">{gathering.city}</span>
                      </div>
                    )}
                  </div>
                  {gathering.distance && (
                    <span className="text-xs text-blue-600 font-medium">
                      {gathering.distance.toFixed(1)}km
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
        onClick={() => {
          alert(t('참여 프로그램 작성 기능은 곧 구현됩니다'));
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
