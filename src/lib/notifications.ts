import api from './api';
import type { Notification } from '@/types';

export const notificationService = {
  // 알림 목록 조회
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/accounts/notifications/');
    return response.data;
  },

  // 읽지 않은 알림 개수 조회
  async getUnreadCount(): Promise<number> {
    const response = await api.get('/accounts/notifications/unread-count/');
    return response.data.count;
  },

  // 알림 읽음 처리
  async markAsRead(notificationId: number): Promise<void> {
    await api.patch(`/accounts/notifications/${notificationId}/`, {
      is_read: true,
    });
  },

  // 모든 알림 읽음 처리
  async markAllAsRead(): Promise<void> {
    await api.post('/accounts/notifications/mark-all-read/');
  },

  // 알림 삭제
  async deleteNotification(notificationId: number): Promise<void> {
    await api.delete(`/accounts/notifications/${notificationId}/`);
  },
};
