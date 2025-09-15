export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-700 leading-relaxed">
              Dot(&ldquo;회사&rdquo;)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="mt-3 ml-6 list-disc text-gray-700 space-y-1">
              <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증</li>
              <li>매칭 서비스 제공: 사용자 간 매칭, 위치 기반 서비스 제공</li>
              <li>채팅 서비스 제공: 사용자 간 메시지 전송 및 실시간 소통 서비스</li>
              <li>서비스 개선: 서비스 이용 분석, 기능 개선 및 최적화</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">보유기간</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>회원정보:</strong> 회원 탈퇴 시까지</li>
                <li>• <strong>채팅 메시지:</strong> 발송 후 3년</li>
                <li>• <strong>위치 정보:</strong> 매칭 서비스 제공 후 즉시 파기</li>
                <li>• <strong>프로필 사진:</strong> 회원 탈퇴 시까지</li>
                <li>• <strong>서비스 이용기록:</strong> 3개월</li>
                <li>• <strong>부정이용 기록:</strong> 1년</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                ※ 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 처리 항목</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">필수 정보</h3>
                <ul className="ml-6 list-disc text-gray-700 space-y-1">
                  <li>닉네임</li>
                  <li>전화번호 (본인 확인용)</li>
                  <li>프로필 사진</li>
                  <li>위치 정보 (매칭 서비스 제공용)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">선택 정보</h3>
                <ul className="ml-6 list-disc text-gray-700 space-y-1">
                  <li>자기소개</li>
                  <li>관심사</li>
                  <li>추가 프로필 정보</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">자동 수집 정보</h3>
                <ul className="ml-6 list-disc text-gray-700 space-y-1">
                  <li>기기 정보 (푸시 알림용)</li>
                  <li>서비스 이용 기록</li>
                  <li>접속 로그, 쿠키</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="mt-3 ml-6 list-disc text-gray-700 space-y-1">
              <li>정보주체가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보처리 위탁</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Amazon Web Services (AWS):</strong> 서버 호스팅 및 데이터 저장</li>
                <li>• <strong>Google Firebase:</strong> 푸시 알림 서비스</li>
                <li>• <strong>Cool SMS:</strong> SMS 인증 서비스</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
            </p>
            <ul className="ml-6 list-disc text-gray-700 space-y-1">
              <li>개인정보 처리현황 통지요구</li>
              <li>개인정보 열람요구</li>
              <li>개인정보 정정·삭제요구</li>
              <li>개인정보 처리정지요구</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 개인정보의 안전성 확보조치</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </p>
            <ul className="ml-6 list-disc text-gray-700 space-y-1">
              <li>관리적 조치: 개인정보 취급직원의 최소화 및 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보 보호책임자</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-700">
                <p><strong>개인정보 보호책임자</strong></p>
                <p>이메일: privacy@welcometodot.com</p>
                <p>연락처: 010-2473-3943</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보 처리방침 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. 개인정보의 열람청구</h2>
            <p className="text-gray-700 leading-relaxed">
              정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 개인정보보호책임자에게 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
            </p>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              시행일자: 2025년 9월 15일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}