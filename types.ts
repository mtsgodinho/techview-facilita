
export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  CONNECT = 'CONNECT',
  MESSENGER = 'MESSENGER',
  TEMPLATES = 'TEMPLATES',
  HISTORY = 'HISTORY'
}

export enum MessageType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WhatsAppSession {
  status: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED';
  qrCode?: string;
  connectedNumber?: string;
}

export interface MessageTemplate {
  id: string;
  userId: string;
  name: string;
  content: string;
  category: string;
  type: MessageType;
}

export interface MessageHistory {
  id: string;
  userId: string;
  recipient: string;
  content: string;
  type: MessageType;
  timestamp: string;
  status: 'SENT' | 'FAILED';
}
