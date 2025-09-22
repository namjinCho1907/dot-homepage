'use client';

import { useState } from 'react';

export default function ChildSafety() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">링커(Linker) 아동 안전 표준 정책</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-red-900 mb-3">🛡️ 아동 보호 원칙</h2>
              <p className="text-red-800">
                링커는 아동의 안전을 최우선으로 하며, 아동 성적 학대 및 착취(CSAE) 콘텐츠를 절대 용납하지 않습니다.
                본 서비스는 만 18세 이상만 이용 가능하며, 아동 보호를 위한 엄격한 정책을 시행합니다.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">1. 서비스 이용 제한</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">연령 제한</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• <strong>만 18세 이상</strong>만 서비스 이용 가능</li>
                  <li>• 가입 시 전화번호 인증을 통한 본인 확인 필수</li>
                  <li>• 미성년자 발견 시 즉시 계정 삭제</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">2. 금지 행위 및 콘텐츠</h2>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-3">절대 금지 사항</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• 아동 성적 학대 또는 착취 관련 콘텐츠 게시, 공유, 전송</li>
                  <li>• 미성년자를 대상으로 한 부적절한 접근 또는 유인 행위</li>
                  <li>• 아동 포르노그래피 또는 관련 이미지/영상 콘텐츠</li>
                  <li>• 미성년자의 개인정보 수집 또는 공유</li>
                  <li>• 아동을 성적 대상화하는 모든 형태의 콘텐츠</li>
                  <li>• 미성년자와의 오프라인 만남 주선 또는 시도</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">3. 신고 및 대응 시스템</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">📱 앱 내 신고</h3>
                  <ul className="text-green-800 space-y-1">
                    <li>• 채팅방 내 신고 버튼</li>
                    <li>• 프로필 신고 기능</li>
                    <li>• 부적절한 콘텐츠 신고</li>
                    <li>• 익명 신고 가능</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">📧 직접 신고</h3>
                  <ul className="text-blue-800 space-y-1">
                    <li>• <strong>이메일:</strong> cnj1907@gmail.com</li>
                    <li>• <strong>제목:</strong> [긴급] 아동 안전 신고</li>
                    <li>• <strong>대응:</strong> 24시간 이내</li>
                    <li>• <strong>비상 연락:</strong> 010-2473-3943</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">⚡ 즉시 대응 절차</h3>
                <ol className="text-yellow-800 space-y-1">
                  <li>1. <strong>신고 접수:</strong> 즉시 확인 및 기록</li>
                  <li>2. <strong>긴급 조치:</strong> 해당 계정 즉시 정지</li>
                  <li>3. <strong>조사 진행:</strong> 전문팀 투입하여 사실 확인</li>
                  <li>4. <strong>법적 대응:</strong> 필요시 수사기관 신고</li>
                  <li>5. <strong>결과 통보:</strong> 신고자에게 처리 결과 안내</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">4. 콘텐츠 모니터링 시스템</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">🤖 자동 탐지 시스템</h3>
                <ul className="text-purple-800 space-y-1">
                  <li>• AI 기반 이미지 및 텍스트 분석</li>
                  <li>• 부적절한 콘텐츠 실시간 탐지</li>
                  <li>• 의심 행동 패턴 모니터링</li>
                  <li>• 자동 차단 및 관리자 알림</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">👥 전문 관리팀</h3>
                <ul className="text-gray-800 space-y-1">
                  <li>• 24시간 콘텐츠 모니터링</li>
                  <li>• 신고 내용 전문 검토</li>
                  <li>• 정기적 시스템 점검 및 개선</li>
                  <li>• 법 집행기관과 협력 체계 구축</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">5. 처벌 조치</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-semibold text-red-900 mb-3">즉시 영구 퇴출</h3>
                <ul className="text-red-800 space-y-1">
                  <li>• 아동 성적 학대 및 착취 관련 모든 행위</li>
                  <li>• 계정 영구 삭제 및 서비스 이용 금지</li>
                  <li>• 수사기관 신고 및 법적 조치</li>
                  <li>• 관련 계정 정보 법 집행기관 제공</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">6. 아동 안전 담당자</h2>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <div className="text-blue-800">
                <p className="mb-4"><strong>담당자:</strong> 조남진 (대표이사)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>이메일:</strong> cnj1907@gmail.com</p>
                    <p><strong>연락처:</strong> 010-2473-3943</p>
                  </div>
                  <div>
                    <p><strong>대응 시간:</strong> 24시간 (긴급시)</p>
                    <p><strong>정기 업무:</strong> 평일 09:00-18:00</p>
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  ※ 아동 안전 관련 신고는 최우선으로 처리되며, 접수 즉시 담당자에게 알림이 전송됩니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">7. 법적 준수 사항</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">준수 법령</h3>
                <ul className="text-gray-800 space-y-1">
                  <li>• 아동·청소년의 성보호에 관한 법률</li>
                  <li>• 정보통신망 이용촉진 및 정보보호 등에 관한 법률</li>
                  <li>• 개인정보보호법</li>
                  <li>• Google Play 개발자 정책</li>
                  <li>• 국제 아동 보호 관련 규정</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">8. 사용자 교육 및 인식 개선</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">📚 안전 교육</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• 온라인 안전 수칙 안내</li>
                  <li>• 의심스러운 행동 인식 방법</li>
                  <li>• 신고 방법 및 절차 교육</li>
                  <li>• 정기적인 안전 공지사항 발송</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-red-900 mb-3">🚨 긴급 신고</h2>
            <p className="text-red-800 mb-4">
              아동 안전과 관련된 긴급한 상황을 발견하셨다면 즉시 신고해 주세요.
            </p>
            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-gray-900 mb-2">24시간 긴급 신고</p>
              <p className="text-gray-800">📧 cnj1907@gmail.com</p>
              <p className="text-gray-800">📞 010-2473-3943</p>
              <p className="text-sm text-gray-600 mt-2">
                * 신고 시 &ldquo;[긴급] 아동 안전 신고&rdquo;로 제목을 명시해 주세요.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">
              <strong>시행일자:</strong> 2025년 1월 1일
            </p>
            <p className="text-gray-600">
              <strong>최종 수정일:</strong> 2025년 1월 1일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}