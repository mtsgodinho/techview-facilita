
import { WhatsAppSession, MessageTemplate, MessageHistory, MessageType } from '../types';

// This simulates the Node.js backend with Baileys/whatsapp-web.js logic
class MockBackend {
  private templates: MessageTemplate[] = [];
  private history: MessageHistory[] = [];
  private session: WhatsAppSession = { status: 'DISCONNECTED' };

  constructor() {
    this.loadData();
  }

  private loadData() {
    const storedTemplates = localStorage.getItem('zapflow_templates');
    const storedHistory = localStorage.getItem('zapflow_history');
    if (storedTemplates) this.templates = JSON.parse(storedTemplates);
    if (storedHistory) this.history = JSON.parse(storedHistory);
  }

  private saveData() {
    localStorage.setItem('zapflow_templates', JSON.stringify(this.templates));
    localStorage.setItem('zapflow_history', JSON.stringify(this.history));
  }

  async getSession(): Promise<WhatsAppSession> {
    return this.session;
  }

  async connectWhatsApp(): Promise<string> {
    this.session.status = 'CONNECTING';
    // Simulate QR code generation from backend
    this.session.qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ZAPFLOW_MOCK_QR_" + Math.random();
    
    // Simulate automatic connection after 5 seconds
    setTimeout(() => {
      this.session.status = 'CONNECTED';
      this.session.connectedNumber = "+55 11 99999-0000";
      this.session.qrCode = undefined;
    }, 5000);

    return this.session.qrCode;
  }

  async disconnectWhatsApp() {
    this.session = { status: 'DISCONNECTED' };
  }

  async sendMessage(recipient: string, content: string, type: MessageType): Promise<boolean> {
    if (this.session.status !== 'CONNECTED') return false;

    const newHistory: MessageHistory = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user',
      recipient,
      content,
      type,
      timestamp: new Date().toISOString(),
      status: 'SENT'
    };

    this.history.unshift(newHistory);
    this.saveData();
    return true;
  }

  getTemplates(): MessageTemplate[] {
    return this.templates;
  }

  addTemplate(name: string, content: string, category: string, type: MessageType) {
    const template: MessageTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user',
      name,
      content,
      category,
      type
    };
    this.templates.push(template);
    this.saveData();
  }

  deleteTemplate(id: string) {
    this.templates = this.templates.filter(t => t.id !== id);
    this.saveData();
  }

  getHistory(): MessageHistory[] {
    return this.history;
  }
}

export const backend = new MockBackend();
