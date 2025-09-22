'use client';

import { useState } from 'react';

export default function Terms() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* 상단 네비게이션 */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 font-medium text-gray-700"
          >
            링커 📋
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <a
                href="/linker/privacy"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                개인정보처리방침
              </a>
              <a
                href="/linker/terms"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                이용약관
              </a>
              <a
                href="/linker/child-safety"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                아동안전정책
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">링커(Linker) 서비스 이용약관</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관은 Dot(이하 &ldquo;회사&rdquo;)이 제공하는 링커(Linker) 모바일 애플리케이션 및 관련 서비스(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
            <ul className="ml-6 list-disc text-gray-700 space-y-2">
              <li><strong>&ldquo;서비스&rdquo;</strong>란 회사가 제공하는 링커(Linker) 모바일 애플리케이션을 통한 소셜 매칭, 채팅, 위치 기반 서비스 등 일체의 서비스를 의미합니다.</li>
              <li><strong>&ldquo;이용자&rdquo; 또는 &ldquo;회원&rdquo;</strong>이란 이 약관에 동의하고 회사와 서비스 이용계약을 체결한 개인을 의미합니다.</li>
              <li><strong>&ldquo;계정&rdquo;</strong>이란 서비스 이용을 위해 이용자가 설정한 고유한 문자 또는 숫자의 조합을 의미합니다.</li>
              <li><strong>&ldquo;콘텐츠&rdquo;</strong>란 서비스를 통해 이용자가 업로드, 전송, 게시하는 텍스트, 이미지, 영상, 음성 등의 정보를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 이 약관은 서비스 내 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력이 발생합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ③ 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 회사는 다음과 같은 서비스를 제공합니다:
              </p>
              <ul className="ml-6 list-disc text-gray-700 space-y-1">
                <li>위치 기반 소셜 매칭 서비스</li>
                <li>사용자 간 실시간 채팅 서비스</li>
                <li>프로필 및 사진 공유 서비스</li>
                <li>AI 기반 대화 지원 서비스</li>
                <li>기타 회사가 추가로 개발하거나 제휴계약 등을 통해 이용자에게 제공하는 일체의 서비스</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                ② 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사의 업무상이나 기술상의 이유로 서비스가 일시 중단될 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (회원가입 및 계정관리)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 이용자는 회사가 정한 절차에 따라 회원가입을 신청하고, 회사가 이를 승낙함으로써 서비스 이용계약이 체결됩니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 회원가입은 만 18세 이상의 개인만 가능하며, 전화번호 인증을 통해 본인 확인을 진행합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ③ 이용자는 계정의 보안에 대한 책임을 지며, 계정이 도용되지 않도록 관리해야 합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (이용자의 의무)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 이용자는 다음 행위를 하여서는 안 됩니다:
              </p>
              <ul className="ml-6 list-disc text-gray-700 space-y-1">
                <li>타인의 개인정보를 도용하거나 허위 정보를 입력하는 행위</li>
                <li>음란하거나 폭력적인 콘텐츠를 게시하는 행위</li>
                <li>타인을 비방하거나 명예를 손상시키는 행위</li>
                <li>상업적 목적의 광고나 스팸 메시지를 전송하는 행위</li>
                <li>서비스의 안정적 운영을 방해하는 행위</li>
                <li>기타 관련 법령에 위반되는 행위</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                ② 이용자가 위 의무를 위반할 경우, 회사는 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (유료서비스 및 결제)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 회사는 기본 서비스 외에 유료 서비스를 제공할 수 있으며, 이용자는 해당 요금을 지불하고 이용할 수 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 유료서비스의 결제는 앱스토어(App Store, Google Play) 결제시스템을 통해 이루어지며, 각 플랫폼의 환불 정책을 따릅니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ③ 회사는 명시적인 사유 없이 임의로 유료서비스를 중단하지 않습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (개인정보보호)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력하며, 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (지적재산권)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 이용자가 서비스에 게시한 콘텐츠의 저작권은 이용자에게 있으나, 회사는 서비스 운영을 위해 필요한 범위 내에서 이를 사용할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (서비스 이용제한 및 계약해지)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 회사는 이용자가 이 약관을 위반한 경우 사전 통지 없이 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 이용자는 언제든지 계정을 삭제하여 서비스 이용계약을 해지할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (면책조항)</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                ① 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ② 회사는 이용자 간의 거래나 분쟁에 대해 개입하지 않으며, 이에 대한 책임을 지지 않습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                ③ 회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (준거법 및 관할법원)</h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관 및 서비스 이용과 관련된 분쟁은 대한민국 법률에 따라 해결되며, 관할법원은 민사소송법상의 관할법원으로 합니다.
            </p>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              시행일자: 2025년 9월 21일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}