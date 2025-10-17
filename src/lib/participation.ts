import { api } from './api';
import { Gathering } from '@/types';

export const participationService = {
  // 참여 프로그램 목록 조회
  async getGatherings(params?: {
    distance?: string;
    country?: string;
  }): Promise<Gathering[]> {
    const response = await api.get('/participation/posts/', { params });
    return response.data.results || response.data;
  },

  // 참여 프로그램 상세 조회
  async getGathering(id: number): Promise<Gathering> {
    const response = await api.get(`/participation/posts/${id}/`);
    return response.data;
  },

  // 참여 프로그램 작성
  async createGathering(data: {
    title: string;
    content: string;
    max_participants?: number;
    allowed_countries?: string[];
  }): Promise<Gathering> {
    const response = await api.post('/participation/posts/', data);
    return response.data;
  },

  // 참여 프로그램 수정
  async updateGathering(id: number, data: Partial<Gathering>): Promise<Gathering> {
    const response = await api.put(`/participation/posts/${id}/`, data);
    return response.data;
  },

  // 참여 프로그램 삭제
  async deleteGathering(id: number): Promise<void> {
    await api.delete(`/participation/posts/${id}/`);
  },

  // 참여하기
  async joinGathering(gatheringId: number): Promise<{ message: string }> {
    const response = await api.post(`/participation/posts/${gatheringId}/join/`);
    return response.data;
  },

  // 참여 취소
  async leaveGathering(gatheringId: number): Promise<{ message: string }> {
    const response = await api.post(`/participation/posts/${gatheringId}/leave/`);
    return response.data;
  },
};
