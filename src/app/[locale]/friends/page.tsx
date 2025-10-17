'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { profileService } from '@/lib/profile';
import Avatar from '@/components/ui/Avatar';
import { getCountryByCode } from '@/lib/countries';
import type { User } from '@/types';

interface FriendRequest {
  id: number;
  sender: User;
  receiver: User;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export default function FriendsPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [activeTab, setActiveTab] = useState<'requests' | 'friends'>('requests');
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'requests') {
        const requests = await profileService.getFriendRequests();
        setFriendRequests(requests);
      } else {
        const friendsList = await profileService.getFriends();
        setFriends(friendsList);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await profileService.acceptFriendRequest(requestId);
      // 요청 목록에서 제거
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      alert('친구 요청을 수락했습니다');
    } catch (error: any) {
      console.error('수락 실패:', error);
      alert(error.response?.data?.error || '친구 요청 수락에 실패했습니다');
    }
  };

  const handleDecline = async (requestId: number) => {
    try {
      await profileService.declineFriendRequest(requestId);
      // 요청 목록에서 제거
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      alert('친구 요청을 거절했습니다');
    } catch (error: any) {
      console.error('거절 실패:', error);
      alert(error.response?.data?.error || '친구 요청 거절에 실패했습니다');
    }
  };

  const handleUserClick = (userId: number) => {
    router.push(`/${locale}/profile/${userId}`);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return `${Math.floor(diffInSeconds / 604800)}주 전`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">친구</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'requests'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            받은 요청
            {friendRequests.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {friendRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'friends'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            친구 목록
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : activeTab === 'requests' ? (
          friendRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-2">받은 친구 요청이 없습니다</p>
              <p className="text-sm text-gray-500">친구 요청을 받으면 여기에 표시됩니다</p>
            </div>
          ) : (
            <div className="space-y-2">
              {friendRequests.map((request) => {
                const country = request.sender.country ? getCountryByCode(request.sender.country) : null;

                return (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => handleUserClick(request.sender.id)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <Avatar
                          src={request.sender.profile_image}
                          name={request.sender.username}
                          size="md"
                        />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{request.sender.username}</span>
                            {country && <span className="text-lg">{country.flag}</span>}
                          </div>
                          {request.sender.bio && (
                            <p className="text-sm text-gray-600 truncate">{request.sender.bio}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(request.created_at)}</p>
                        </div>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        거절
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          friends.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-2">아직 친구가 없습니다</p>
              <p className="text-sm text-gray-500">검색에서 친구를 찾아보세요</p>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.map((friend) => {
                const country = friend.country ? getCountryByCode(friend.country) : null;

                return (
                  <button
                    key={friend.id}
                    onClick={() => handleUserClick(friend.id)}
                    className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={friend.profile_image}
                        name={friend.username}
                        size="md"
                      />
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{friend.username}</span>
                          {country && <span className="text-lg">{country.flag}</span>}
                        </div>
                        {friend.bio && (
                          <p className="text-sm text-gray-600 truncate">{friend.bio}</p>
                        )}
                        {friend.city && (
                          <p className="text-xs text-gray-500">{friend.city}</p>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}
