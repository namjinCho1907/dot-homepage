'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import BoardList from '@/components/Board/BoardList';
import ParticipationList from '@/components/Participation/ParticipationList';
import ProfileScreen from '@/components/Profile/ProfileScreen';
import ChatList from '@/components/Chat/ChatList';
import { searchService } from '@/lib/search';
import { getCountryByCode } from '@/lib/countries';
import { Newspaper, Users, Search, Mail, User } from 'lucide-react';

// 화면 컴포넌트들
const BoardScreen = () => {
  return <BoardList />;
};

const ParticipationScreen = () => {
  return <ParticipationList />;
};

const SearchScreen = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const results = await searchService.searchUsers(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: number) => {
    router.push(`/${locale}/profile/${userId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900 mb-3">{t('사용자 검색')}</h2>

        {/* Search Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder={t('닉네임으로 검색')}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('검색 중') : t('검색')}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!searched ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-medium">{t('닉네임으로 사용자를 검색하세요')}</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('검색 중')}</div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium mb-2">{t('검색 결과가 없습니다')}</p>
            <p className="text-sm">{t('다른 키워드로 검색해보세요')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {searchResults.map((user) => {
              const country = user.country ? getCountryByCode(user.country) : null;

              return (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Profile Image */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {user.profile_image ? (
                        <img src={user.profile_image} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 truncate">{user.username}</span>
                        {country && (
                          <span className="text-lg">{country.flag}</span>
                        )}
                      </div>
                      {user.bio && (
                        <p className="text-sm text-gray-600 truncate">{user.bio}</p>
                      )}
                      {user.city && (
                        <p className="text-xs text-gray-500">{user.city}</p>
                      )}
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatScreen = () => {
  return <ChatList />;
};


function MainPageContent() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const { user } = useAuthStore();

  // URL에서 탭 파라미터 읽기 (프로필은 탭 4)
  const initialTab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState(initialTab ? parseInt(initialTab) : 0);

  // URL 파라미터가 변경될 때 탭 업데이트
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab !== null) {
      setCurrentTab(parseInt(tab));
    }
  }, [searchParams]);

  // 프로필 완성 여부 체크
  useEffect(() => {
    if (user) {
      const isProfileIncomplete =
        user.username === user.phone_number || !user.country || user.country === 'OTHER';

      if (isProfileIncomplete) {
        router.push(`/${locale}/profile-setup`);
      }
    }
  }, [user, router, locale]);

  const tabs = [
    { id: 0, label: '게시판', icon: Newspaper },
    { id: 1, label: '참여', icon: Users },
    { id: 2, label: '검색', icon: Search },
    { id: 3, label: '채팅', icon: Mail, badge: 0 },
    { id: 4, label: '프로필', icon: User, badge: 0 },
  ];

  const screens = [
    <BoardScreen key="board" />,
    <ParticipationScreen key="participation" />,
    <SearchScreen key="search" />,
    <ChatScreen key="chat" />,
    <ProfileScreen key="profile" />,
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {screens[currentTab]}
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-[#E5E5E5] bg-white">
        <div className="safe-area-inset-bottom h-[60px] flex items-center justify-around px-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 max-w-[80px] transition-colors"
              >
                {/* Icon with Badge */}
                <div className="relative mb-1">
                  <IconComponent
                    size={24}
                    className={isActive ? 'text-black' : 'text-[#737373]'}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center bg-red-500 rounded-full">
                      <span className="text-white text-[10px] font-bold leading-none">
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] ${
                    isActive
                      ? 'font-semibold text-black'
                      : 'font-normal text-[#737373]'
                  }`}
                >
                  {t(tab.label)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <MainPageContent />
    </Suspense>
  );
}
