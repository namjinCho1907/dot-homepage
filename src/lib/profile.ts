import api from './api';
import type { User, UserPhoto, UserPhotoComment } from '@/types';

export const profileService = {
  // 현재 사용자 프로필 조회
  async getCurrentProfile(): Promise<User> {
    const response = await api.get('/accounts/profile/');
    return response.data;
  },

  // 프로필 업데이트
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch('/accounts/profile/', data);
    return response.data;
  },

  // 프로필 이미지 업로드
  async updateProfileImage(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('profile_image', file);
    const response = await api.patch('/accounts/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 프로필 이미지 삭제
  async removeProfileImage(): Promise<User> {
    const response = await api.patch('/accounts/profile/', {
      profile_image: null,
    });
    return response.data;
  },

  // 사용자 사진(스토리) 업로드
  async uploadUserPhoto(file?: File, caption?: string): Promise<UserPhoto> {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    if (caption) {
      formData.append('caption', caption);
    }
    const response = await api.post('/accounts/profile/photos/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 사용자 사진 삭제
  async deleteUserPhoto(photoId: number): Promise<void> {
    await api.delete(`/accounts/profile/photos/${photoId}/`);
  },

  // 사진 캡션 수정
  async updatePhotoCaption(photoId: number, caption: string): Promise<UserPhoto> {
    const response = await api.patch(`/accounts/profile/photos/${photoId}/`, { caption });
    return response.data;
  },

  // 사진 좋아요
  async likeUserPhoto(photoId: number): Promise<void> {
    await api.post(`/accounts/profile/photos/${photoId}/like/`);
  },

  // 사진 좋아요 취소
  async unlikeUserPhoto(photoId: number): Promise<void> {
    await api.delete(`/accounts/profile/photos/${photoId}/like/`);
  },

  // 사진 댓글 조회
  async getUserPhotoComments(photoId: number): Promise<UserPhotoComment[]> {
    const response = await api.get(`/accounts/profile/photos/${photoId}/comments/`);
    return response.data;
  },

  // 사진 댓글 작성
  async addUserPhotoComment(photoId: number, content: string): Promise<UserPhotoComment> {
    const response = await api.post(`/accounts/profile/photos/${photoId}/comments/`, { content });
    return response.data;
  },

  // 사진 댓글 삭제
  async deleteUserPhotoComment(commentId: number): Promise<void> {
    await api.delete(`/accounts/profile/photos/comments/${commentId}/`);
  },

  // 닉네임 중복 체크
  async checkNicknameAvailable(nickname: string): Promise<{ available: boolean; message: string }> {
    try {
      const response = await api.post('/accounts/check-nickname/', { nickname });
      return {
        available: true,
        message: response.data.message || '사용 가능한 닉네임입니다.',
      };
    } catch (error: any) {
      // 400 에러는 중복 또는 형식 오류
      if (error.response?.status === 400) {
        return {
          available: false,
          message: error.response.data.message || error.response.data.error || '이미 사용 중인 닉네임입니다.',
        };
      }
      throw error;
    }
  },

  // 다른 사용자 프로필 조회
  async getUserProfile(userId: number): Promise<User> {
    const response = await api.get(`/accounts/users/${userId}/`);
    return response.data;
  },

  // 친구 요청 보내기
  async sendFriendRequest(userId: number): Promise<{ message: string }> {
    const response = await api.post(`/accounts/friends/send/${userId}/`);
    return response.data;
  },

  // 친구 요청 취소
  async cancelFriendRequest(requestId: number): Promise<{ message: string }> {
    const response = await api.delete(`/accounts/friends/cancel/${requestId}/`);
    return response.data;
  },

  // 사용자 차단
  async blockUser(userId: number): Promise<{ message: string }> {
    const response = await api.post(`/accounts/block/${userId}/`);
    return response.data;
  },

  // 사용자 차단 해제
  async unblockUser(userId: number): Promise<{ message: string }> {
    const response = await api.post(`/accounts/unblock/${userId}/`);
    return response.data;
  },

  // 차단 상태 확인
  async checkBlocked(userId: number): Promise<{ is_blocked: boolean; blocked_by_me: boolean; blocked_me: boolean }> {
    const response = await api.get(`/accounts/check-blocked/${userId}/`);
    return response.data;
  },

  // 사용자 신고
  async reportUser(userId: number, reportType: string, description: string): Promise<{ message: string }> {
    const response = await api.post(`/accounts/report/${userId}/`, {
      report_type: reportType,
      description: description,
    });
    return response.data;
  },

  // 받은 친구 요청 목록 조회
  async getFriendRequests(): Promise<any[]> {
    const response = await api.get('/accounts/friends/requests/');
    return Array.isArray(response.data) ? response.data : (response.data.results || []);
  },

  // 친구 요청 수락
  async acceptFriendRequest(requestId: number): Promise<{ message: string; user?: any }> {
    const response = await api.post(`/accounts/friends/accept/${requestId}/`);
    return response.data;
  },

  // 친구 요청 거절
  async declineFriendRequest(requestId: number): Promise<{ message: string }> {
    const response = await api.post(`/accounts/friends/decline/${requestId}/`);
    return response.data;
  },

  // 친구 목록 조회
  async getFriends(): Promise<User[]> {
    const response = await api.get('/accounts/friends/');
    return Array.isArray(response.data) ? response.data : (response.data.results || []);
  },
};
