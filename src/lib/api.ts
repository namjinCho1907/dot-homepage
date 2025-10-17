import axios from 'axios';

const API_BASE_URL = 'https://api.welcometodot.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log('🔑 [API Request]', config.method?.toUpperCase(), config.url);
    console.log('🔑 [Token]', token ? `${token.substring(0, 20)}...` : 'No token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 로그인 페이지로 리다이렉트
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - 토큰 만료 또는 유효하지 않음');
      console.error('❌ 에러 상세:', error.response?.data);
      console.error('❌ 요청 URL:', error.config?.url);
      console.error('❌ 5초 후 로그인 페이지로 이동합니다...');

      localStorage.removeItem('access_token');

      // 5초 대기 후 리다이렉트 (로그 확인 시간)
      await new Promise(resolve => setTimeout(resolve, 5000));

      // locale-aware 리다이렉트
      const currentPath = window.location.pathname;
      const localeMatch = currentPath.match(/^\/([a-z]{2})\//);
      const locale = localeMatch ? localeMatch[1] : 'ko';
      window.location.href = `/${locale}/login`;
    }
    return Promise.reject(error);
  }
);

export default api;
