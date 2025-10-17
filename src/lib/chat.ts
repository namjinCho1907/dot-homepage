import api from './api';
import { ChatRoom, ChatMessage } from '@/types';

class ChatService {
  // 채팅방 목록 조회
  async getChatRooms(): Promise<ChatRoom[]> {
    const response = await api.get('/chat/rooms/');
    return response.data;
  }

  // 특정 채팅방 조회
  async getChatRoom(roomId: number): Promise<ChatRoom> {
    const response = await api.get(`/chat/rooms/${roomId}/`);
    return response.data;
  }

  // 채팅방 메시지 조회
  async getMessages(roomId: number): Promise<ChatMessage[]> {
    const response = await api.get(`/chat/rooms/${roomId}/messages/`);
    return response.data;
  }

  // 메시지 전송
  async sendMessage(roomId: number, content: string): Promise<ChatMessage> {
    const response = await api.post(`/chat/rooms/${roomId}/messages/`, {
      content,
      message_type: 'text',
    });
    return response.data;
  }

  // 1:1 채팅방 생성
  async createPrivateRoom(userId: number): Promise<ChatRoom> {
    const response = await api.post('/chat/create-private-room/', {
      user_id: userId,
    });
    return response.data;
  }

  // 채팅방 나가기
  async leaveRoom(roomId: number): Promise<void> {
    await api.post(`/chat/rooms/${roomId}/leave/`);
  }

  // 채팅방 참여자 목록 조회
  async getParticipants(roomId: number): Promise<any[]> {
    const response = await api.get(`/chat/rooms/${roomId}/participants/`);
    return response.data;
  }
}

export const chatService = new ChatService();
