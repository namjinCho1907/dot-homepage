import api from './api';
import type {
  LoginResponse,
  PhoneVerifyRequest,
  PhoneVerifyResponse,
  CodeVerifyRequest,
  RegisterRequest,
  User,
} from '@/types';

export const authService = {
  // 전화번호로 인증번호 전송
  async sendVerificationCode(data: PhoneVerifyRequest): Promise<PhoneVerifyResponse> {
    const response = await api.post('/accounts/send-verification/', data);
    return response.data;
  },

  // 인증번호 확인
  async verifyCode(data: CodeVerifyRequest): Promise<LoginResponse> {
    const response = await api.post('/accounts/verify-phone/', data);
    return response.data;
  },

  // 회원가입
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post('/accounts/register/', data);
    return response.data;
  },

  // Google 로그인
  async googleLogin(accessToken: string): Promise<LoginResponse> {
    const response = await api.post('/accounts/google-oauth-login/', { access_token: accessToken });
    return response.data;
  },

  // Apple 로그인
  async appleLogin(identityToken: string): Promise<LoginResponse> {
    const response = await api.post('/accounts/apple-oauth-login/', { identity_token: identityToken });
    return response.data;
  },

  // 현재 사용자 정보 가져오기
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/accounts/profile/');
    return response.data;
  },

  // 로그아웃
  logout() {
    localStorage.removeItem('access_token');
  },

  // 회원 탈퇴
  async deleteAccount(): Promise<void> {
    await api.delete('/accounts/profile/');
    localStorage.removeItem('access_token');
  },

  // 피드백 제출
  async submitFeedback(content: string): Promise<void> {
    await api.post('/accounts/feedback/', { content });
  },
};
