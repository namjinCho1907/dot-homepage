export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <nav className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-[30px] flex items-center justify-center">
                <span className="text-white font-semibold text-lg tracking-tight">D</span>
              </div>
              <span className="text-2xl font-medium text-black tracking-tight">Dot</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-gray-600 hover:text-black transition-all duration-300 font-medium tracking-tight">회사소개</a>
              <a href="/linker/privacy" className="text-gray-600 hover:text-black transition-all duration-300 font-medium tracking-tight">개인정보처리방침</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-medium text-black mb-8 tracking-tight leading-tight">
              기술로
              <br />
              <span className="text-[#FF7D29]">
                더 나은 세상을
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              Dot은 사용자에게 의미 있는 기술 솔루션을 제공하는 회사입니다.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-black mb-6 tracking-tight">회사 소개</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              Dot은 사용자 중심의 기술 솔루션을 개발하는 회사입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-16 h-16 bg-[#FF7D29] rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-tight">기술력</h3>
              <p className="text-gray-500 font-light tracking-tight leading-relaxed">
                다양한 기술 스택을 바탕으로 실용적인 솔루션을 제공합니다.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-16 h-16 bg-black rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-tight">사용자 중심</h3>
              <p className="text-gray-500 font-light tracking-tight leading-relaxed">
                사용자의 니즈를 깊이 이해하고, 직관적이고 편리한 서비스를 구현합니다.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[30px] hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-16 h-16 bg-[#FFBF78] rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-medium text-black mb-6 tracking-tight">실행력</h3>
              <p className="text-gray-500 font-light tracking-tight leading-relaxed">
                아이디어부터 출시까지, 효율적인 개발과 배포를 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-black mb-6 tracking-tight">주요 프로젝트</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              Dot에서 개발한 프로젝트를 소개합니다.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-12 rounded-[30px] hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <img src="/linker-icon-pure-white.png" alt="링커 앱 아이콘" className="w-24 h-24 rounded-[20px]" />
                </div>
                <h3 className="text-3xl font-medium text-black mb-6 tracking-tight">데이팅 앱 "링커"</h3>
                <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-light tracking-tight leading-relaxed">
                  사용자 매칭과 실시간 채팅 기능을 제공하는 모바일 데이팅 플랫폼
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-5 py-2 bg-white text-gray-700 text-sm rounded-[30px] border border-gray-200 font-medium tracking-tight">Flutter</span>
                  <span className="px-5 py-2 bg-white text-gray-700 text-sm rounded-[30px] border border-gray-200 font-medium tracking-tight">Spring Boot</span>
                  <span className="px-5 py-2 bg-white text-gray-700 text-sm rounded-[30px] border border-gray-200 font-medium tracking-tight">Firebase</span>
                  <span className="px-5 py-2 bg-white text-gray-700 text-sm rounded-[30px] border border-gray-200 font-medium tracking-tight">MySQL</span>
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
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-[30px] flex items-center justify-center">
                <span className="text-black font-semibold text-xl tracking-tight">D</span>
              </div>
              <span className="text-3xl font-medium tracking-tight">Dot</span>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 items-center justify-center text-gray-300 text-lg">
                <span className="font-light tracking-tight">조남진</span>
                <span className="hidden md:block text-gray-500">·</span>
                <a href="mailto:cnj1907@gmail.com" className="hover:text-[#FF7D29] transition-colors font-light tracking-tight">cnj1907@gmail.com</a>
                <span className="hidden md:block text-gray-500">·</span>
                <span className="font-light tracking-tight">010-2473-3943</span>
                <span className="hidden md:block text-gray-500">·</span>
                <a href="/linker/privacy" className="hover:text-[#FF7D29] transition-colors font-light tracking-tight">링커 개인정보처리방침</a>
              </div>
              <p className="text-gray-500 text-sm font-light tracking-tight">© 2025 Dot All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
