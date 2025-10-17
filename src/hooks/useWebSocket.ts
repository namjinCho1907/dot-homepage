import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface UseWebSocketOptions {
  onMessage?: (data: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

// Cloud Run 직접 URL 사용 (Firebase Hosting은 WebSocket 미지원)
const WS_BASE_URL = 'wss://welcomeu-api-xkxkkmidlq-du.a.run.app';

export function useWebSocket(endpoint: string, options: UseWebSocketOptions = {}) {
  const {
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    autoReconnect = true,
    reconnectInterval = 3000,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false); // 연결 중 상태를 ref로 관리
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // 콜백 함수들을 ref에 저장하여 dependency 문제 해결
  const onMessageRef = useRef(onMessage);
  const onConnectRef = useRef(onConnect);
  const onDisconnectRef = useRef(onDisconnect);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onConnectRef.current = onConnect;
    onDisconnectRef.current = onDisconnect;
    onErrorRef.current = onError;
  }, [onMessage, onConnect, onDisconnect, onError]);

  const connect = useCallback(() => {
    // 이미 연결 중이거나 연결되어 있으면 재연결하지 않음
    if (isConnectingRef.current) {
      console.log('⚠️ [WebSocket] 이미 연결 중, 재연결 스킵');
      return;
    }

    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      console.log('⚠️ [WebSocket] 이미 연결되어 있음, 재연결 스킵');
      return;
    }

    isConnectingRef.current = true;

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('❌ [WebSocket] 토큰이 없습니다');
        isConnectingRef.current = false;
        setConnectionError('인증 토큰이 없습니다');
        return;
      }

      // WebSocket URL 구성 (토큰을 쿼리 파라미터로 추가)
      const wsUrl = `${WS_BASE_URL}${endpoint}?token=${token}`;
      console.log('🔌 [WebSocket] 연결 시도:', endpoint);

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ [WebSocket] 연결 성공:', endpoint);
        isConnectingRef.current = false;
        setIsConnected(true);
        setConnectionError(null);
        onConnectRef.current?.();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📩 [WebSocket] 메시지 수신:', data);
          onMessageRef.current?.(data);
        } catch (error) {
          console.error('❌ [WebSocket] 메시지 파싱 실패:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ [WebSocket] 에러:', error);
        isConnectingRef.current = false;
        setConnectionError('WebSocket 연결 에러');
        onErrorRef.current?.(error);
      };

      ws.onclose = (event) => {
        console.log('🔌 [WebSocket] 연결 종료:', event.code, event.reason);
        isConnectingRef.current = false;
        setIsConnected(false);
        wsRef.current = null;
        onDisconnectRef.current?.();

        // 자동 재연결
        if (autoReconnect && event.code !== 1000) {
          console.log(`🔄 [WebSocket] ${reconnectInterval}ms 후 재연결 시도...`);
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };
    } catch (error) {
      console.error('❌ [WebSocket] 연결 실패:', error);
      isConnectingRef.current = false;
      setConnectionError('WebSocket 연결 실패');
    }
  }, [endpoint, autoReconnect, reconnectInterval]);

  const disconnect = useCallback(() => {
    isConnectingRef.current = false;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      console.log('🔌 [WebSocket] 연결 종료 요청:', endpoint);
      wsRef.current.close(1000, 'Client disconnect');
      wsRef.current = null;
    }
  }, [endpoint]);

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      console.log('📤 [WebSocket] 메시지 전송:', data);
      wsRef.current.send(message);
    } else {
      console.warn('⚠️ [WebSocket] 연결되지 않음, 메시지 전송 불가');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionError,
    sendMessage,
    disconnect,
    reconnect: connect,
  };
}
