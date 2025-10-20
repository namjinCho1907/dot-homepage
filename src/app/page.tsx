'use client';

import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isWelcomeuDropdownOpen, setIsWelcomeuDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWelcomeuDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Head>
        <title>WelcomeU - 한국 거주 외국인을 위한 커뮤니티</title>
        <meta name="description" content="WelcomeU는 한국 거주 외국인들을 위한 커뮤니티 플랫폼입니다. 정보 공유, 친구 만들기, 함께 활동하기 등 다양한 기능을 제공합니다." />
        <meta property="og:title" content="WelcomeU" />
        <meta property="og:description" content="한국 거주 외국인을 위한 커뮤니티" />
        <meta property="og:url" content="https://welcometodot.com" />
        <meta property="og:type" content="website" />
      </Head>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌏</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WelcomeU</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium">회사소개</a>

              {/* WelcomeU 드롭다운 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsWelcomeuDropdownOpen(!isWelcomeuDropdownOpen)}
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium flex items-center"
                >
                  정책
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isWelcomeuDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    <a
                      href="/welcomeu/privacy"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                      onClick={() => setIsWelcomeuDropdownOpen(false)}
                    >
                      개인정보처리방침
                    </a>
                    <a
                      href="/welcomeu/terms"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                      onClick={() => setIsWelcomeuDropdownOpen(false)}
                    >
                      이용약관
                    </a>
                    <a
                      href="/welcomeu/child-safety"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsWelcomeuDropdownOpen(false)}
                    >
                      아동 안전 표준
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  한국 거주 외국인을 위한 커뮤니티
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WelcomeU</span>에서<br/>
                  새로운 친구를<br/>
                  만나보세요
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  한국 생활의 모든 순간을 함께하는 외국인 커뮤니티 플랫폼입니다.
                  정보를 공유하고, 친구를 만들고, 함께 활동하세요.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    App Store
                  </a>
                  <a href="#" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Google Play
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <div className="w-full h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-[40px] shadow-2xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-8xl mb-4">🌏</div>
                      <p className="text-2xl font-semibold">앱 스크린샷</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 top-10 left-10 w-full h-full bg-blue-200 rounded-[40px] opacity-30"></div>
                <div className="absolute -z-20 top-20 left-20 w-full h-full bg-purple-200 rounded-[40px] opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">주요 기능</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WelcomeU가 제공하는 다양한 기능들을 만나보세요
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* 커뮤니티 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">커뮤니티</h3>
              <p className="text-gray-600 leading-relaxed">
                자유롭게 정보를 공유하고 질문하며 소통할 수 있는 커뮤니티 공간
              </p>
            </div>

            {/* 참여하기 */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">참여하기</h3>
              <p className="text-gray-600 leading-relaxed">
                관심사가 비슷한 사람들과 함께 활동하고 새로운 친구를 만나보세요
              </p>
            </div>

            {/* 실시간 채팅 */}
            <div className="p-8 bg-gradient-to-br from-pink-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💌</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">실시간 채팅</h3>
              <p className="text-gray-600 leading-relaxed">
                개인 메시지와 그룹 채팅으로 언제 어디서나 소통하세요
              </p>
            </div>

            {/* 다국어 지원 */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">다국어 지원</h3>
              <p className="text-gray-600 leading-relaxed">
                한국어, 영어, 중국어 등 9개 언어로 편리하게 이용하세요
              </p>
            </div>

            {/* 위치 기반 서비스 */}
            <div className="p-8 bg-gradient-to-br from-yellow-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">위치 기반</h3>
              <p className="text-gray-600 leading-relaxed">
                내 주변의 외국인 친구들과 모임을 찾아보세요
              </p>
            </div>

            {/* 안전한 환경 */}
            <div className="p-8 bg-gradient-to-br from-red-50 to-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">안전한 환경</h3>
              <p className="text-gray-600 leading-relaxed">
                신고 시스템과 차단 기능으로 안전한 커뮤니티를 유지합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <div className="text-xl opacity-90">활성 사용자</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-xl opacity-90">게시글</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">9개</div>
              <div className="text-xl opacity-90">지원 언어</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              지금 시작하세요
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              WelcomeU와 함께 한국에서의 새로운 생활을 시작해보세요
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="inline-flex items-center px-10 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </a>
              <a href="#" className="inline-flex items-center px-10 py-5 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl">🌏</span>
                  <span className="text-2xl font-bold">WelcomeU</span>
                </div>
                <p className="text-gray-400 mb-6">
                  한국 거주 외국인을 위한 커뮤니티 플랫폼
                </p>
                <div className="flex space-x-4">
                  <a href="mailto:cnj1907@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    cnj1907@gmail.com
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">링크</h3>
                <div className="space-y-3">
                  <a href="/about" className="block text-gray-400 hover:text-white transition-colors">회사소개</a>
                  <a href="/welcomeu/privacy" className="block text-gray-400 hover:text-white transition-colors">개인정보처리방침</a>
                  <a href="/welcomeu/terms" className="block text-gray-400 hover:text-white transition-colors">이용약관</a>
                  <a href="/welcomeu/child-safety" className="block text-gray-400 hover:text-white transition-colors">아동 안전 표준</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© 2025 Dot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
