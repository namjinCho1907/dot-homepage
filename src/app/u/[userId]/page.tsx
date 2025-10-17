'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface UserProfile {
  id: number;
  username: string;
  profile_image?: string;
  bio?: string;
  country?: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('kr'); // 기본값 한국

  useEffect(() => {
    // 모바일 기기 감지
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // 사용자 국가 코드 감지 (브라우저 언어 설정에서)
    const getCountryCode = () => {
      const locale = navigator.language || navigator.languages?.[0] || 'en-US';
      const code = locale.split('-')[1]?.toLowerCase() || 'kr'; // 기본값 한국
      return code;
    };

    const detectedCountryCode = getCountryCode();
    setCountryCode(detectedCountryCode);

    // 프로필 데이터 로드
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.welcometodot.com/api/accounts/users/public/${userId}/`);
        if (!response.ok) throw new Error('Profile not found');
        const data = await response.json();
        setProfile(data);
        setLoading(false);

        // 모바일이면 앱 딥링크 시도 (share_code 사용)
        if (isMobile) {
          // 딥링크 시도 - share_code 또는 user_id 사용
          const deepLink = `welcomeu://u/${userId}`;
          window.location.href = deepLink;

          // 2초 후에도 페이지에 있으면 앱스토어로 이동
          setTimeout(() => {
            if (isIOS) {
              // 사용자 국가에 맞는 앱스토어 링크
              window.location.href = `https://apps.apple.com/${detectedCountryCode}/app/welcomeu/id6753156461`;
            } else if (isAndroid) {
              // Google Play는 자동으로 국가 감지
              window.location.href = 'https://play.google.com/store/apps/details?id=com.namjin.welcomeuApp';
            }
          }, 2000);
        }
      } catch (err) {
        setError('프로필을 찾을 수 없습니다');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">프로필을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">😕</h1>
          <p className="text-gray-600">{error || '프로필을 찾을 수 없습니다'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-6">
            {profile.profile_image ? (
              <Image
                src={profile.profile_image}
                alt={profile.username}
                width={120}
                height={120}
                className="rounded-full border-4 border-purple-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {profile.username[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {profile.username}
            </h1>
            {profile.country && (
              <p className="text-gray-600 mb-4">🌍 {profile.country}</p>
            )}
            {profile.bio && (
              <p className="text-gray-700 mb-6 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>

          {/* WelcomeU 로고 */}
          <div className="text-center pt-6 border-t border-gray-200">
            <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
              <span className="text-2xl">🌏</span>
              <span>WelcomeU</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              한국 거주 외국인을 위한 커뮤니티
            </p>
          </div>
        </div>

        {/* 앱 다운로드 버튼 */}
        <div className="space-y-3">
          <a
            href={`https://apps.apple.com/${countryCode}/app/welcomeu/id6753156461`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>App Store에서 다운로드</span>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.namjin.welcomeuApp"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span>Google Play에서 다운로드</span>
            </div>
          </a>
        </div>

        {/* 설명 텍스트 */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {profile.username}님과 친구가 되려면 WelcomeU 앱을 다운로드하세요
        </p>
      </div>
    </div>
  );
}
