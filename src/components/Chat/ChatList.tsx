'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/lib/chat';
import { ChatRoom } from '@/types';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function ChatList() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { user } = useAuthStore();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 채팅방 목록 실시간 업데이트를 위한 WebSocket
  const { isConnected } = useWebSocket('/ws/chat/rooms/', {
    onMessage: (data) => {
      console.log('📩 [채팅 목록] WebSocket 메시지 수신:', data);

      if (data.type === 'new_message') {
        // 새 메시지가 도착하면 해당 채팅방 정보 업데이트
        setChatRooms((prev) => {
          const roomIndex = prev.findIndex((room) => room.id === data.room_id);
          if (roomIndex !== -1) {
            const updatedRooms = [...prev];
            const room = updatedRooms[roomIndex];

            // 마지막 메시지 업데이트
            room.last_message = data.message;
            room.last_message_at = data.timestamp;

            // 내가 보낸 메시지가 아니면 읽지 않은 개수 증가
            if (data.message.sender.id !== user?.id) {
              room.unread_count = (room.unread_count || 0) + 1;
            }

            // 해당 채팅방을 맨 위로 이동
            updatedRooms.splice(roomIndex, 1);
            updatedRooms.unshift(room);

            return updatedRooms;
          }
          return prev;
        });
      } else if (data.type === 'room_created') {
        // 새 채팅방이 생성되면 목록에 추가
        loadChatRooms();
      } else if (data.type === 'read_status_updated') {
        // 읽음 처리 업데이트
        if (data.user_id === user?.id) {
          setChatRooms((prev) =>
            prev.map((room) =>
              room.id === data.room_id ? { ...room, unread_count: 0 } : room
            )
          );
        }
      }
    },
    onConnect: () => {
      console.log('✅ [채팅 목록] WebSocket 연결됨');
    },
  });

  useEffect(() => {
    loadChatRooms();
  }, []);

  const loadChatRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatService.getChatRooms();
      // API 응답이 배열인지 확인하고, pagination이 있으면 results 사용
      const rooms = Array.isArray(response) ? response : (response.results || []);
      setChatRooms(rooms);
    } catch (error: any) {
      console.error('채팅방 목록 로드 실패:', error);
      if (error.response?.status === 401) {
        setError(t('로그인이 필요합니다'));
      } else {
        setError(t('채팅방 목록을 불러오는데 실패했습니다'));
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return t('방금 전');
    if (diffInMinutes < 60) return `${diffInMinutes}${t('분 전')}`;
    if (diffInHours < 24) return `${diffInHours}${t('시간 전')}`;
    if (diffInDays < 7) return `${diffInDays}${t('일 전')}`;

    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const getDisplayName = (room: ChatRoom) => {
    if (room.name) return room.name;

    if (room.room_type === 'private') {
      // 1:1 채팅방은 상대방 이름 표시
      const otherParticipant = room.participants.find(
        (p) => p.user.id !== user?.id
      );
      return otherParticipant?.user.username || t('알 수 없음');
    }

    return t('채팅방');
  };

  const openChatRoom = (room: ChatRoom) => {
    router.push(`/${locale}/chat/${room.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900">{t('채팅')}</h2>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('로딩 중')}</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-700 mb-2 font-medium">{error}</p>
            <button
              onClick={loadChatRooms}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('다시 시도')}
            </button>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-20 h-20 border-2 border-black rounded-lg flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">{t('채팅방이 없습니다')}</p>
            <div className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                {t('참여형 게시글에 참여하면 채팅방이 생성됩니다')}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => openChatRoom(room)}
                className="mb-2 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* 아이콘 */}
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {room.room_type === 'participation' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      )}
                    </svg>
                  </div>

                  {/* 채팅방 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 truncate">
                        {getDisplayName(room)}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatTime(room.last_message_at)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate">
                        {room.last_message?.content ||
                          (room.room_type === 'participation' ? t('참여형 채팅방') : t('메시지가 없습니다'))}
                      </span>
                      {room.unread_count > 0 && (
                        <div className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold flex-shrink-0 min-w-[20px] text-center">
                          {room.unread_count}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 화살표 아이콘 */}
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
