'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isLinkerDropdownOpen, setIsLinkerDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLinkerDropdownOpen(false);
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
        <title>Dot.</title>
        <meta name="description" content="점과 점을 잇다. Dot은 사람과 사람을 이어주는 서비스를 제공합니다." />
        <meta property="og:title" content="Dot." />
        <meta property="og:description" content="점과 점을 잇다. Dot은 사람과 사람을 이어주는 서비스를 제공합니다." />
        <meta property="og:url" content="https://welcometodot.com" />
        <meta property="og:type" content="website" />
      </Head>
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
        <nav className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-medium text-white tracking-tight">Dot.</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-tight">회사소개</a>
              
              {/* 링커 드롭다운 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLinkerDropdownOpen(!isLinkerDropdownOpen)}
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-tight flex items-center"
                >
                  링커
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLinkerDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <a
                      href="/linker/terms"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      onClick={() => setIsLinkerDropdownOpen(false)}
                    >
                      이용약관
                    </a>
                    <a
                      href="/linker/privacy"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      onClick={() => setIsLinkerDropdownOpen(false)}
                    >
                      개인정보처리방침
                    </a>
                    <a
                      href="/linker/child-safety"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsLinkerDropdownOpen(false)}
                    >
                      아동안전정책
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-thin text-white mb-8 tracking-tight leading-tight">
              Dot.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              점과 점을 잇다.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-black">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">회사 소개</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              사람과 사람을 이어주는 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800 p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-700">
              <div className="w-16 h-16 bg-[#FF7D29] rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-medium text-white mb-6 tracking-tight">기술력</h3>
              <p className="text-gray-300 font-light tracking-tight leading-relaxed">
                다양한 기술 스택을 바탕으로 실용적인 솔루션을 제공합니다.
              </p>
            </div>
            <div className="bg-gray-800 p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-700">
              <div className="w-16 h-16 bg-white rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-black text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-medium text-white mb-6 tracking-tight">사용자 중심</h3>
              <p className="text-gray-300 font-light tracking-tight leading-relaxed">
                사용자의 니즈를 깊이 이해하고, 직관적이고 편리한 서비스를 구현합니다.
              </p>
            </div>
            <div className="bg-gray-800 p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-700">
              <div className="w-16 h-16 bg-[#FFBF78] rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-black text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-medium text-white mb-6 tracking-tight">실행력</h3>
              <p className="text-gray-300 font-light tracking-tight leading-relaxed">
                아이디어부터 출시까지, 효율적인 개발과 배포를 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">주요 프로젝트</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              Dot에서 개발한 프로젝트를 소개합니다.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* WelcomeU 프로젝트 */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-12 rounded-[30px] hover:shadow-2xl transition-all duration-500 border border-blue-700/50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-5xl">🌏</span>
                </div>
                <h3 className="text-3xl font-medium text-white mb-6 tracking-tight">WelcomeU</h3>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light tracking-tight leading-relaxed">
                  전세계 외국인을 위한 글로벌 커뮤니티 플랫폼. 실시간 채팅, 게시판, 참여 프로그램 등을 제공합니다.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-5 py-2 bg-blue-600/30 text-blue-200 text-sm rounded-[30px] border border-blue-500/50 font-medium tracking-tight">Flutter</span>
                  <span className="px-5 py-2 bg-blue-600/30 text-blue-200 text-sm rounded-[30px] border border-blue-500/50 font-medium tracking-tight">Django</span>
                  <span className="px-5 py-2 bg-blue-600/30 text-blue-200 text-sm rounded-[30px] border border-blue-500/50 font-medium tracking-tight">PostgreSQL</span>
                  <span className="px-5 py-2 bg-blue-600/30 text-blue-200 text-sm rounded-[30px] border border-blue-500/50 font-medium tracking-tight">WebSocket</span>
                  <span className="px-5 py-2 bg-blue-600/30 text-blue-200 text-sm rounded-[30px] border border-blue-500/50 font-medium tracking-tight">Firebase</span>
                </div>
              </div>
            </div>

            {/* 링커 프로젝트 */}
            <div className="bg-gray-800 p-12 rounded-[30px] hover:shadow-2xl transition-all duration-500 border border-gray-700">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-700 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Image src="/linker-icon-pure-white.png" alt="링커 앱 아이콘" width={96} height={96} className="w-24 h-24 rounded-[20px]" />
                </div>
                <h3 className="text-3xl font-medium text-white mb-6 tracking-tight">링커</h3>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light tracking-tight leading-relaxed">
                  사용자 매칭과 실시간 채팅 기능을 제공하는 모바일 데이팅 플랫폼
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-5 py-2 bg-gray-700 text-gray-300 text-sm rounded-[30px] border border-gray-600 font-medium tracking-tight">Flutter</span>
                  <span className="px-5 py-2 bg-gray-700 text-gray-300 text-sm rounded-[30px] border border-gray-600 font-medium tracking-tight">Spring Boot</span>
                  <span className="px-5 py-2 bg-gray-700 text-gray-300 text-sm rounded-[30px] border border-gray-600 font-medium tracking-tight">Firebase</span>
                  <span className="px-5 py-2 bg-gray-700 text-gray-300 text-sm rounded-[30px] border border-gray-600 font-medium tracking-tight">MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-medium tracking-tight">Dot.</span>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col space-y-3 items-center justify-center text-gray-300 text-lg">
                <span className="font-light tracking-tight">대표 조남진</span>
                <a href="mailto:cnj1907@gmail.com" className="hover:text-[#FF7D29] transition-colors font-light tracking-tight">cnj1907@gmail.com</a>
                <span className="font-light tracking-tight">010-2473-3943</span>
              </div>
              <p className="text-gray-400 text-sm font-light tracking-tight">© 2025 Dot All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
