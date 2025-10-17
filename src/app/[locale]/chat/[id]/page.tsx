'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/lib/chat';
import { ChatMessage } from '@/types';
import Avatar from '@/components/ui/Avatar';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function ChatRoomPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const roomId = parseInt(params.id as string);
  const { user } = useAuthStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [roomName, setRoomName] = useState('채팅방');
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket 연결
  const { isConnected, sendMessage: sendWsMessage } = useWebSocket(
    `/ws/chat/${roomId}/`,
    {
      onMessage: (data) => {
        console.log('📩 [채팅방] WebSocket 메시지 수신:', data);

        if (data.type === 'chat_message') {
          // 새 메시지 추가
          const newMessage: ChatMessage = {
            id: data.message.id,
            sender: data.message.sender,
            content: data.message.content,
            message_type: data.message.message_type,
            read_count: 0,
            created_at: data.message.created_at,
          };

          setMessages((prev) => {
            // 중복 메시지 방지
            if (prev.some((m) => m.id === newMessage.id)) {
              return prev;
            }
            return [...prev, newMessage];
          });
        }
      },
      onConnect: () => {
        console.log('✅ [채팅방] WebSocket 연결됨');
        // 연결되면 읽음 처리
        sendWsMessage({ type: 'mark_read' });
      },
      onDisconnect: () => {
        console.log('🔌 [채팅방] WebSocket 연결 종료');
      },
    }
  );

  useEffect(() => {
    loadChatRoom();
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatRoom = async () => {
    try {
      const room = await chatService.getChatRoom(roomId);
      // 채팅방 이름 설정
      if (room.name) {
        setRoomName(room.name);
      } else if (room.room_type === 'private') {
        const otherParticipant = room.participants.find(
          (p) => p.user.id !== user?.id
        );
        setRoomName(otherParticipant?.user.username || '채팅방');
      }
    } catch (error) {
      console.error('채팅방 로드 실패:', error);
    }
  };

  const loadMessages = async () => {
    try {
      if (loading) setLoading(true);
      const response = await chatService.getMessages(roomId);
      // API 응답이 배열인지 확인하고, pagination이 있으면 results 사용
      let data = Array.isArray(response) ? response : (response.results || []);
      // 백엔드에서 최신순으로 오므로 역순으로 정렬 (오래된 메시지가 위로)
      setMessages([...data].reverse());
    } catch (error) {
      console.error('메시지 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || sending || !isConnected) return;

    const content = messageText.trim();
    setMessageText('');
    setSending(true);

    try {
      // WebSocket으로 메시지 전송
      sendWsMessage({
        type: 'chat_message',
        content: content,
      });
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      alert(t('메시지 전송에 실패했습니다'));
      setMessageText(content); // 실패하면 텍스트 복구
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeaveRoom = async () => {
    if (!confirm(t('정말 채팅방을 나가시겠습니까?'))) return;

    try {
      await chatService.leaveRoom(roomId);
      alert(t('채팅방을 나갔습니다'));
      router.push(`/${locale}/chat`);
    } catch (error: any) {
      alert(error.response?.data?.error || t('채팅방 나가기에 실패했습니다'));
    }
  };

  const handleReport = async (reportType: string, description: string) => {
    try {
      // TODO: 채팅방 신고 API 구현
      alert(t('신고가 접수되었습니다'));
      setShowReportModal(false);
    } catch (error: any) {
      alert(error.response?.data?.error || t('신고에 실패했습니다'));
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (messageDay.getTime() === today.getTime()) {
      return `${hours}:${minutes}`;
    } else {
      return `${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}`;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-3 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{roomName}</h1>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-600 hover:text-gray-900 relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleLeaveRoom}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  {t('채팅방 나가기')}
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowReportModal(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('채팅방 신고')}
                </button>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">{t('로딩 중')}</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>{t('아직 메시지가 없습니다')}</p>
              <p className="text-sm mt-1">{t('첫 메시지를 보내보세요')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => {
              const isMe = message.sender && user && message.sender.id === user.id;
              const isSystem = message.message_type === 'system' || !message.sender;

              if (isSystem) {
                // 시스템 메시지
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="px-4 py-2 bg-gray-200 rounded-full text-xs text-gray-600 italic">
                      {message.content}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* 프로필 이미지 */}
                  {!isMe && (
                    <Avatar
                      src={message.sender?.profile_image}
                      name={message.sender?.username || 'User'}
                      size="sm"
                    />
                  )}

                  {/* 메시지 내용 */}
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    {!isMe && (
                      <span className="text-xs text-gray-500 mb-1 px-1">
                        {message.sender?.username}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isMe
                          ? 'bg-black text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {formatTime(message.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={t('메시지를 입력하세요')}
            className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={!messageText.trim() || sending}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}
    </div>
  );
}

// Report Modal Component
function ReportModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (type: string, description: string) => void;
}) {
  const t = useTranslations();
  const [reportType, setReportType] = useState('spam');
  const [description, setDescription] = useState('');

  const reportTypes = [
    { value: 'spam', label: t('스팸/광고') },
    { value: 'abuse', label: t('욕설/비방') },
    { value: 'inappropriate', label: t('부적절한 콘텐츠') },
    { value: 'harassment', label: t('괴롭힘') },
    { value: 'impersonation', label: t('사칭') },
    { value: 'other', label: t('기타') },
  ];

  const handleSubmit = () => {
    if (!description.trim()) {
      alert(t('신고 사유를 입력해주세요'));
      return;
    }
    onSubmit(reportType, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('채팅방 신고')}</h3>

        {/* Report Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('신고 유형')}
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {reportTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('신고 사유')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('자세한 신고 사유를 입력해주세요')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {t('취소')}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('신고하기')}
          </button>
        </div>
      </div>
    </div>
  );
}
