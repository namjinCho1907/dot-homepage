export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Dot.</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">회사소개</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">서비스</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">연락처</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              혁신적인 기술로
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                미래를 연결합니다
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Dot은 최신 AI 기술과 모바일 앱 개발을 통해 사용자들에게 새로운 경험을 제공하는 혁신적인 기술 회사입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                프로젝트 문의
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                포트폴리오 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">회사 소개</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dot은 사용자 중심의 혁신적인 기술 솔루션을 개발하는 스타트업입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">혁신적인 기술</h3>
              <p className="text-gray-600">
                최신 AI 기술과 모바일 개발 역량을 바탕으로 창의적인 솔루션을 제공합니다.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">사용자 중심</h3>
              <p className="text-gray-600">
                사용자의 니즈를 깊이 이해하고, 직관적이고 편리한 서비스를 구현합니다.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">빠른 실행력</h3>
              <p className="text-gray-600">
                아이디어부터 출시까지, 신속한 개발과 배포로 시장에 빠르게 대응합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">주요 서비스</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dot이 제공하는 다양한 기술 서비스를 만나보세요.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">모바일 앱 개발</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Flutter를 활용한 크로스 플랫폼 모바일 앱 개발로 iOS와 Android를 동시에 지원합니다.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• 크로스 플랫폼 개발 (Flutter)</li>
                <li>• 실시간 채팅 시스템</li>
                <li>• 푸시 알림 서비스</li>
                <li>• 사용자 인증 및 보안</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI 기술 통합</h3>
              </div>
              <p className="text-gray-600 mb-4">
                OpenAI GPT와 같은 최신 AI 기술을 활용하여 지능적인 서비스를 제공합니다.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• GPT 기반 대화형 AI</li>
                <li>• 개인화된 매칭 알고리즘</li>
                <li>• 자연어 처리</li>
                <li>• 데이터 분석 및 인사이트</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">연락처</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              프로젝트 문의나 협업 제안이 있으시면 언제든 연락해 주세요.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">연락 정보</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-600">📧</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">이메일</p>
                        <p className="text-gray-600">contact@welcometodot.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-green-600">🌐</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">웹사이트</p>
                        <p className="text-gray-600">www.welcometodot.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">주요 프로젝트</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">AI 기반 데이팅 앱 &ldquo;링커&rdquo;</h4>
                    <p className="text-gray-600 text-sm">
                      GPT 기술을 활용한 지능적인 매칭과 대화 기능을 제공하는 혁신적인 데이팅 플랫폼
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">프로젝트 문의</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">메시지</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                    메시지 보내기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">Dot.</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2024 Dot. All rights reserved.</p>
              <p className="text-gray-400 text-sm">혁신적인 기술로 미래를 연결합니다.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
