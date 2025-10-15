'use client';

import { useState } from 'react';

export default function WelcomeUChildSafety() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">WelcomeU 아동 안전 표준</h1>

        {/* 아동 안전 표준 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section id="child-safety-standards">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">아동 안전 표준 (Child Safety Standards)</h1>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개요</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  도트(이하 "회사")가 운영하는 <strong>WelcomeU</strong> 앱(이하 "서비스")은 모든 사용자, 특히 아동의 안전을 최우선으로 생각합니다.
                  회사는 아동 성적 학대 및 착취(Child Sexual Abuse and Exploitation, CSAE)에 대해 무관용(zero tolerance) 정책을 시행하며,
                  아동을 보호하기 위한 엄격한 표준을 준수합니다.
                </p>
                <p>
                  본 표준은 Google Play의 아동 안전 표준 정책을 준수하기 위해 수립되었으며,
                  WelcomeU 앱에서 아동 성적 학대 콘텐츠(CSAM)를 포함한 모든 형태의 아동 착취를 방지하고 근절하기 위한 회사의 약속입니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. CSAE 및 CSAM 정의</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">CSAE (아동 성적 학대 및 착취)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    아동을 성적으로 착취하거나, 학대하거나, 위험에 빠뜨리는 콘텐츠나 행위를 의미합니다.
                    여기에는 성적 착취를 목적으로 한 아동 그루밍, 아동 성 착취, 아동 성매매 또는 기타 아동 성 착취가 포함됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">CSAM (아동 성적 학대 콘텐츠)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    노골적인 성적 행위에 연루된 미성년자에 관한 사진, 동영상, 컴퓨터 생성 이미지를 포함하되 이에 국한되지 않는
                    모든 시각적 묘사로 구성됩니다. CSAM은 불법이며, WelcomeU 서비스에서 절대 허용되지 않습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 금지 사항</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>WelcomeU 서비스에서 다음과 같은 콘텐츠 및 행위는 엄격히 금지됩니다:</p>

                <ul className="ml-6 list-disc space-y-2">
                  <li>아동을 성적으로 묘사하거나 성적 대상화하는 모든 콘텐츠</li>
                  <li>아동 성적 학대 콘텐츠(CSAM)의 생성, 배포, 소유</li>
                  <li>아동을 착취하거나 위험에 빠뜨리는 행위</li>
                  <li>아동 그루밍 또는 아동과의 부적절한 접촉 시도</li>
                  <li>아동 성 착취 또는 아동 성매매 관련 콘텐츠</li>
                  <li>아동의 안전을 위협하는 개인정보 공개</li>
                  <li>미성년자에게 해로운 콘텐츠 노출</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 사용자 신고 및 모니터링</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  WelcomeU는 사용자가 부적절한 콘텐츠나 행위를 쉽게 신고할 수 있는 시스템을 제공합니다.
                </p>

                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-medium">가. 앱 내 신고 기능</p>
                    <p>
                      WelcomeU 앱 내에서 사용자는 부적절한 콘텐츠, 사용자, 또는 행위를 직접 신고할 수 있습니다.
                      신고 기능은 모든 프로필, 게시물, 댓글에서 접근 가능합니다.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">나. 신고 처리 절차</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>모든 신고는 접수 즉시 검토 대상이 됩니다</li>
                      <li>아동 안전 관련 신고는 최우선으로 처리됩니다</li>
                      <li>신고된 콘텐츠는 24시간 이내에 검토됩니다</li>
                      <li>위반이 확인된 경우 즉시 삭제 및 조치가 이루어집니다</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium">다. 사용자 차단 기능</p>
                    <p>
                      사용자는 다른 사용자를 차단할 수 있으며, 차단된 사용자는 해당 사용자와 상호작용할 수 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. CSAM 근절 노력</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>회사는 CSAM을 근절하기 위해 다음과 같은 조치를 취합니다:</p>

                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>콘텐츠 모니터링:</strong> 서비스 내 업로드되는 콘텐츠를 지속적으로 모니터링하며,
                    의심스러운 콘텐츠를 자동 및 수동으로 검토합니다.
                  </li>
                  <li>
                    <strong>즉각적인 조치:</strong> CSAM이 발견되는 즉시 해당 콘텐츠를 삭제하고
                    관련 사용자 계정을 영구 정지합니다.
                  </li>
                  <li>
                    <strong>관계 당국 협조:</strong> CSAM 또는 아동 착취 사례가 발견되면
                    관련 법집행 기관 및 NCMEC(National Center for Missing & Exploited Children)에 즉시 신고합니다.
                  </li>
                  <li>
                    <strong>예방 조치:</strong> 아동 안전을 위협할 수 있는 기능이나 상호작용을
                    사전에 차단하고 예방합니다.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 위반 시 조치</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>아동 안전 표준을 위반한 사용자에 대해 다음과 같은 조치가 취해집니다:</p>

                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>1차 위반:</strong> 경고 및 콘텐츠 삭제
                  </li>
                  <li>
                    <strong>2차 위반:</strong> 계정 일시 정지 (7일~30일)
                  </li>
                  <li>
                    <strong>심각한 위반 또는 3차 위반:</strong> 계정 영구 정지
                  </li>
                  <li>
                    <strong>CSAM 또는 불법 행위:</strong> 즉시 영구 정지 및 관계 당국 신고
                  </li>
                </ul>

                <p className="mt-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  ⚠️ <strong>중요:</strong> CSAE 또는 CSAM 관련 위반은 사전 경고 없이 즉시 계정 영구 정지 및
                  법적 조치가 취해질 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 아동 안전 법규 준수</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  WelcomeU는 대한민국 및 국제 아동 안전 관련 법규를 준수합니다:
                </p>

                <ul className="ml-6 list-disc space-y-1">
                  <li>아동·청소년의 성보호에 관한 법률</li>
                  <li>정보통신망 이용촉진 및 정보보호 등에 관한 법률</li>
                  <li>개인정보 보호법</li>
                  <li>Google Play 아동 안전 표준 정책</li>
                  <li>COPPA (Children's Online Privacy Protection Act)</li>
                  <li>기타 관련 국내외 법규</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 아동 안전 담당자</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-700">
                  <p className="mb-4">
                    회사는 아동 안전 관련 업무를 총괄하고 책임지는 아동 안전 담당자를 지정하고 있습니다.
                  </p>
                  <div className="space-y-1 bg-white p-4 rounded border border-gray-200">
                    <p><strong>아동 안전 담당자</strong></p>
                    <p>회사명: 도트 (Dot)</p>
                    <p>서비스명: WelcomeU</p>
                    <p>이메일: <a href="mailto:cnj1907@gmail.com" className="text-blue-600 hover:underline">cnj1907@gmail.com</a></p>
                  </div>
                  <p className="mt-4">
                    아동 안전 관련 문의, 신고, 또는 우려 사항이 있으시면 위 연락처로 즉시 문의해 주시기 바랍니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 긴급 신고</h2>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold text-red-900">
                    ⚠️ 아동 학대 또는 위급 상황 발견 시:
                  </p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>즉시 경찰(112) 또는 아동보호전문기관(1577-1391)에 신고해 주세요</li>
                    <li>WelcomeU 앱 내 신고 기능을 통해 즉시 신고해 주세요</li>
                    <li>이메일(cnj1907@gmail.com)로 상세 내용을 제보해 주세요</li>
                  </ul>
                  <p className="mt-3">
                    회사는 모든 신고를 심각하게 받아들이며, 필요한 경우 관계 당국과 협력하여
                    신속하게 대응합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. 표준의 업데이트</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  본 아동 안전 표준은 법규 변경, 정책 개선, 또는 필요에 따라 업데이트될 수 있습니다.
                  중요한 변경 사항이 있을 경우 서비스 내 공지를 통해 사용자에게 알립니다.
                </p>
                <p>
                  최신 아동 안전 표준은 항상 다음 URL에서 확인하실 수 있습니다:
                  <br />
                  <a href="https://welcomeu.site/welcomeu/child-safety" className="text-blue-600 hover:underline">
                    https://welcomeu.site/welcomeu/child-safety
                  </a>
                </p>
              </div>
            </section>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 font-medium">
                시행일자: 2025년 1월 22일
              </p>
              <p className="text-sm text-gray-500 mt-2">
                본 표준은 Google Play 아동 안전 표준 정책을 준수합니다
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
