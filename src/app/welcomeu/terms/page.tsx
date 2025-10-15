'use client';

import { useState } from 'react';

export default function WelcomeUTerms() {
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
            WelcomeU 📋
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <a
                href="/welcomeu/privacy"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                개인정보처리방침
              </a>
              <a
                href="/welcomeu/terms"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                이용약관
              </a>
              <a
                href="/welcomeu/child-safety"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                아동 안전 표준
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">WelcomeU 서비스 이용약관</h1>

        {/* 서비스 이용약관 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section id="terms-of-service">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">서비스 이용약관</h1>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-700 leading-relaxed">
                본 약관은 웰컴유(이하 "회사")가 제공하는 웰컴유 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>

                <div className="ml-4 space-y-2">
                  <p>
                    ① "서비스"란 구현되는 단말기(PC, TV, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 "이용자"가 이용할 수 있는 웰컴유 및 웰컴유 관련 제반 서비스를 의미합니다.
                  </p>
                  <p>
                    ② "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                  </p>
                  <p>
                    ③ "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                  </p>
                  <p>
                    ④ "비회원"이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
                </p>
                <p>
                  ② 회사는 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                </p>
                <p>
                  ③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리한 약관의 개정의 경우에는 30일 전부터 공지합니다.
                </p>
                <p>
                  ④ 이용자는 개정된 약관에 동의하지 않을 권리가 있으며, 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다. 다만, 약관 개정 공지 후 7일 이내에 이의를 제기하지 않는 경우 약관 개정에 동의한 것으로 간주합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (회원가입)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
                </p>
                <p>
                  ② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                </p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                  <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                </ul>
                <p>
                  ③ 회원가입계약의 성립시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (회원 탈퇴 및 자격 상실)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.
                </p>
                <p>
                  ② 회원이 다음 각호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
                </p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>가입 신청시에 허위 내용을 등록한 경우</li>
                  <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                  <li>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                </ul>
                <p>
                  ③ 회사가 회원 자격을 제한·정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 회사는 회원자격을 상실시킬 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (회원에 대한 통지)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사가 회원에 대한 통지를 하는 경우, 회원이 회사와 미리 약정하여 지정한 전자우편 주소나 휴대전화 번호로 할 수 있습니다.
                </p>
                <p>
                  ② 회사는 불특정다수 회원에 대한 통지의 경우 1주일이상 서비스 내 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (서비스 제공 및 중단)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                </p>
                <p>
                  ② 제1항에 의한 서비스 중단의 경우에는 회사는 제6조에 정한 방법으로 이용자에게 통지합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (이용자의 의무)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>① 이용자는 다음 행위를 하여서는 안됩니다.</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>신청 또는 변경시 허위 내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>회사가 게시한 정보의 변경</li>
                  <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                  <li>회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위</li>
                  <li>기타 불법적이거나 부당한 행위</li>
                </ul>
                <p>
                  ② 이용자는 관계법, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (저작권의 귀속)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
                </p>
                <p>
                  ② 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                </p>
                <p>
                  ③ 이용자가 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (부적절한 콘텐츠 및 사용자 관리)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사는 안전한 커뮤니티 환경 조성을 위해 부적절한 콘텐츠와 악의적인 사용자에 대해 무관용(zero tolerance) 원칙을 적용합니다.
                </p>
                <p>
                  ② 이용자는 서비스 내에서 다음과 같은 부적절한 콘텐츠를 게시하거나 공유할 수 없습니다.
                </p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>음란물, 성적 콘텐츠 또는 미성년자에게 해로운 내용</li>
                  <li>폭력적이거나 혐오스러운 내용</li>
                  <li>불법적인 활동을 조장하거나 관련된 내용</li>
                  <li>타인을 괴롭히거나 위협하는 내용</li>
                  <li>개인정보 침해, 명예훼손, 사기 등 불법적인 내용</li>
                  <li>스팸, 광고, 또는 상업적 목적의 무단 게시물</li>
                </ul>
                <p>
                  ③ 이용자는 부적절한 콘텐츠나 악의적인 사용자를 발견할 경우 즉시 신고할 수 있으며, 회사는 다음과 같은 조치를 취합니다.
                </p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>신고된 모든 콘텐츠는 24시간 이내에 검토됩니다</li>
                  <li>부적절한 콘텐츠로 확인된 경우 즉시 삭제 조치합니다</li>
                  <li>위반 사용자는 경고, 이용 정지 또는 영구 퇴출될 수 있습니다</li>
                  <li>심각한 위반의 경우 관계 당국에 신고할 수 있습니다</li>
                </ul>
                <p>
                  ④ 이용자는 다른 사용자를 차단할 수 있는 기능을 제공받으며, 차단된 사용자는 해당 이용자의 프로필, 게시물, 댓글 등을 볼 수 없습니다.
                </p>
                <p>
                  ⑤ 회사는 관련 법령 및 본 약관을 위반한 콘텐츠나 사용자에 대해 사전 통보 없이 삭제, 이용 제한 등의 조치를 취할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (분쟁 해결)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
                </p>
                <p>
                  ② 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (준거법 및 관할법원)</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  ① 회사와 이용자간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
                </p>
                <p>
                  ② 회사와 이용자간에 제기된 전자상거래 소송에는 대한민국법을 적용합니다.
                </p>
              </div>
            </section>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 font-medium">
                시행일자: 2025년 1월 1일
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
