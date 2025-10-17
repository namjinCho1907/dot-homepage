'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { notificationService } from '@/lib/notifications';
import { getCountryData } from '@/lib/countries';
import type { Notification } from '@/types';

export default function NotificationsPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);

      // 화면 진입 시 자동으로 모두 읽음 처리
      if (data.length > 0) {
        await notificationService.markAllAsRead();
      }
    } catch (error) {
      console.error('알림 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // 읽음 처리
    if (!notification.is_read) {
      try {
        await notificationService.markAsRead(notification.id);
        setNotifications(prev =>
          prev.map(n => (n.id === notification.id ? { ...n, is_read: true } : n))
        );
      } catch (error) {
        console.error('알림 읽음 처리 실패:', error);
      }
    }

    // 알림 타입에 따라 화면 이동
    if (notification.notification_type === 'friend_request') {
      router.push(`/${locale}/friends`);
    } else if (notification.notification_type === 'comment') {
      router.back();
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('알림 삭제 실패:', error);
      alert(t('알림 삭제에 실패했습니다'));
    }
  };

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return '';
    const country = getCountryData().find(c => c.code === countryCode);
    return country?.flag || '';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t('방금 전');
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}주 전`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
    return `${Math.floor(diffInSeconds / 31536000)}년 전`;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-2 text-lg font-semibold">{t('알림')}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg className="w-20 h-20 text-[#A3A3A3] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-base text-[#A3A3A3]">{t('알림이 없습니다')}</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E5E5]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative ${
                  notification.is_read ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <button
                  onClick={() => handleNotificationClick(notification)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* 프로필 이미지 */}
                    <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                      {notification.sender?.profile_image ? (
                        <img
                          src={notification.sender.profile_image}
                          alt={notification.sender.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#A3A3A3]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* 알림 내용 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1 mb-1">
                        <p className="font-bold text-sm">
                          {notification.sender?.username || 'Unknown'}
                        </p>
                        {notification.sender?.country && (
                          <span className="text-xs">
                            {getCountryFlag(notification.sender.country)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#404040] mb-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#737373]">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                    </div>

                    {/* 읽지 않음 표시 */}
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </button>

                {/* 스와이프 삭제 UI (웹에서는 호버 시 삭제 버튼 표시) */}
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-500 text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                  title={t('삭제')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
