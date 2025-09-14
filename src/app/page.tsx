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
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              기술로
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                더 나은 세상을
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Dot은 사용자에게 의미 있는 기술 솔루션을 제공하는 회사입니다.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">회사 소개</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dot은 사용자 중심의 기술 솔루션을 개발하는 회사입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">기술력</h3>
              <p className="text-gray-600">
                다양한 기술 스택을 바탕으로 실용적인 솔루션을 제공합니다.
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">실행력</h3>
              <p className="text-gray-600">
                아이디어부터 출시까지, 효율적인 개발과 배포를 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">주요 프로젝트</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dot에서 개발한 프로젝트를 소개합니다.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <img src="/linker-icon-pure-white.png" alt="링커 앱 아이콘" className="w-20 h-20" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">데이팅 앱 &ldquo;링커&rdquo;</h3>
                <p className="text-gray-600 mb-6">
                  사용자 매칭과 실시간 채팅 기능을 제공하는 모바일 데이팅 플랫폼
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Flutter</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Spring Boot</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Firebase</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">Dot.</span>
            </div>
            <div className="text-center space-y-2">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0 items-center justify-center text-gray-300 text-sm">
                <span>조남진</span>
                <span className="hidden md:block">|</span>
                <a href="mailto:cnj1907@gmail.com" className="hover:text-white transition-colors">cnj1907@gmail.com</a>
                <span className="hidden md:block">|</span>
                <span>010-2473-3943</span>
              </div>
              <p className="text-gray-400 text-sm">© 2025 Dot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
