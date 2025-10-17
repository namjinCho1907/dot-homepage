import api from './api';
import type { User } from '@/types';

export interface SearchResult {
  id: number;
  username: string;
  profile_image?: string;
  bio?: string;
  country?: string;
  city?: string;
}

export const searchService = {
  // 사용자 검색
  async searchUsers(query: string): Promise<SearchResult[]> {
    const response = await api.get(`/search/users/`, {
      params: { q: query }
    });
    // API가 배열 또는 pagination 객체를 반환할 수 있음
    return Array.isArray(response.data) ? response.data : (response.data.results || []);
  },

  // 인기 검색어 조회
  async getPopularSearches(): Promise<string[]> {
    const response = await api.get('/search/popular/');
    const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
    return data.map((item: any) => item.query);
  },

  // 검색 기록 조회
  async getSearchHistory(): Promise<string[]> {
    const response = await api.get('/search/history/');
    const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
    return data.map((item: any) => item.query);
  },
};
