import { Client, type IMessage } from '@stomp/stompjs';
import { getAccessToken } from '../axiosInstance';
import { STOMP_ENDPOINTS } from './endpoints';
import type { ReadMessagePayload, SendMessagePayload, WebSocketMessage } from './types';

type MessageHandler = (message: WebSocketMessage) => void;

class ChatSocketClient {
  private client: Client | null = null;
  private subscriptions: Map<number, { unsubscribe: () => void }> = new Map();

  connect = (onConnect?: () => void, onError?: (error: string) => void) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      onError?.('No access token available');
      return;
    }

    const baseUrl = (import.meta.env.VITE_API_BASE_URL as string).replace(/^https:/, 'wss:').replace(/^http:/, 'ws:');
    const wsUrl = `${baseUrl}${STOMP_ENDPOINTS.CONNECT}`;

    this.client = new Client({
      brokerURL: wsUrl,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
      onConnect: () => {
        onConnect?.();
      },
      onStompError: (frame) => {
        onError?.(frame.headers['message'] || 'STOMP error');
      },
      onWebSocketError: () => {
        onError?.('WebSocket connection failed');
      },
    });

    this.client.activate();
  };

  disconnect = () => {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.client?.deactivate();
    this.client = null;
  };

  subscribeRoom = (roomId: number, onMessage: MessageHandler) => {
    if (!this.client?.connected) {
      return;
    }

    if (this.subscriptions.has(roomId)) {
      this.unsubscribeRoom(roomId);
    }

    const subscription = this.client.subscribe(STOMP_ENDPOINTS.SUBSCRIBE.ROOM(roomId), (message: IMessage) => {
      const parsed = JSON.parse(message.body) as WebSocketMessage;
      onMessage(parsed);
    });

    this.subscriptions.set(roomId, subscription);
  };

  unsubscribeRoom = (roomId: number) => {
    const subscription = this.subscriptions.get(roomId);
    subscription?.unsubscribe();
    this.subscriptions.delete(roomId);
  };

  sendMessage = (payload: SendMessagePayload) => {
    if (!this.client?.connected) {
      return;
    }

    this.client.publish({
      destination: STOMP_ENDPOINTS.PUBLISH.MESSAGE,
      body: JSON.stringify(payload),
    });
  };

  sendRead = (payload: ReadMessagePayload) => {
    if (!this.client?.connected) {
      return;
    }

    this.client.publish({
      destination: STOMP_ENDPOINTS.PUBLISH.READ,
      body: JSON.stringify(payload),
    });
  };

  get isConnected() {
    return this.client?.connected ?? false;
  }
}

export const chatSocket = new ChatSocketClient();
