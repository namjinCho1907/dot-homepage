'use client';

import { useState } from 'react';

export default function WelcomeUPrivacy() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">WelcomeU 개인정보처리방침</h1>

        {/* 개인정보처리방침 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section id="privacy-policy">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">개인정보처리방침</h1>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  웰컴유(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-medium">가. 회원 가입 및 관리</p>
                    <p>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.</p>
                  </div>

                  <div>
                    <p className="font-medium">나. 서비스 제공</p>
                    <p>커뮤니티 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.</p>
                  </div>

                  <div>
                    <p className="font-medium">다. 마케팅 및 광고에의 활용</p>
                    <p>신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공을 목적으로 개인정보를 처리합니다.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보의 항목</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">가. 필수 항목</h3>
                  <ul className="ml-6 list-disc text-gray-700 space-y-1">
                    <li>전화번호</li>
                    <li>사용자명(닉네임)</li>
                    <li>국적</li>
                    <li>프로필 사진(선택)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">나. 자동 수집 항목</h3>
                  <ul className="ml-6 list-disc text-gray-700 space-y-1">
                    <li>서비스 이용 기록</li>
                    <li>접속 로그</li>
                    <li>쿠키</li>
                    <li>접속 IP 정보</li>
                    <li>기기 정보</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-medium">가. 회원 탈퇴 시까지</p>
                    <p>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</p>
                  </div>

                  <div>
                    <p className="font-medium">나. 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우</p>
                    <p>해당 수사·조사 종료 시까지</p>
                  </div>

                  <div>
                    <p className="font-medium">다. 서비스 이용에 따른 채권·채무관계 잔존 시</p>
                    <p>해당 채권·채무관계 정산 시까지</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-700 leading-relaxed">
                회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보의 파기절차 및 방법</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-medium">가. 파기절차</p>
                    <p>이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
                  </div>

                  <div>
                    <p className="font-medium">나. 파기방법</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>전자적 파일 형태: 기록을 재생할 수 없도록 로우레밸포맷(Low Level Format) 등의 방법을 이용하여 파기</li>
                      <li>기록물, 인쇄물, 서면 등: 분쇄하거나 소각하여 파기</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>

                <ul className="ml-6 list-disc space-y-1">
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리정지 요구</li>
                </ul>

                <p className="mt-3">
                  권리 행사는 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보의 안전성 확보조치</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>

                <ul className="ml-6 list-disc space-y-1">
                  <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                  <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보 보호책임자</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-700">
                  <p className="mb-4">
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                  </p>
                  <div className="space-y-1">
                    <p><strong>개인정보 보호책임자</strong></p>
                    <p>이름: Dot.</p>
                    <p>이메일: cnj1907@gmail.com</p>
                  </div>
                  <p className="mt-4">
                    정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보 처리방침의 변경</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  이 개인정보 처리방침은 2025년 1월 1일부터 적용됩니다.
                </p>
                <p>
                  이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
                </p>
                <ul className="ml-6 list-disc">
                  <li>시행일자: 2025년 1월 1일</li>
                  <li>공고일자: 2025년 1월 1일</li>
                </ul>
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
