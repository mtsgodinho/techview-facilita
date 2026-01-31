
import React, { useState } from 'react';
import { backend } from '../services/mockBackend';
import { MessageType } from '../types';
import { Send, FileText, Image as ImageIcon, Mic, Video, User } from 'lucide-react';

const MessengerView: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<MessageType>(MessageType.TEXT);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSend = async () => {
    if (!recipient || !content) return;
    setSending(true);
    setFeedback(null);

    const success = await backend.sendMessage(recipient, content, type);
    
    if (success) {
      setFeedback({ type: 'success', msg: 'Mensagem enviada com sucesso!' });
      setContent('');
      setRecipient('');
    } else {
      setFeedback({ type: 'error', msg: 'Falha ao enviar. Verifique sua conexão com o WhatsApp.' });
    }
    setSending(false);
  };

  const templates = backend.getTemplates();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center space-x-2">
              <Send className="w-5 h-5 text-indigo-600" />
              <span>Nova Mensagem</span>
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {feedback && (
              <div className={`p-4 rounded-xl text-sm font-medium ${
                feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {feedback.msg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destinatário (com DDD)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Ex: 5511999998888"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tipo de Mídia</label>
                <div className="flex space-x-2">
                  {[
                    { id: MessageType.TEXT, label: 'Texto', icon: FileText },
                    { id: MessageType.AUDIO, label: 'Áudio', icon: Mic },
                    { id: MessageType.VIDEO, label: 'Vídeo', icon: Video },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setType(btn.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        type === btn.id 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <btn.icon className="w-4 h-4" />
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Conteúdo / Mensagem</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <button 
              onClick={handleSend}
              disabled={sending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{sending ? 'Processando...' : 'Disparar Mensagem'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>Usar Modelo</span>
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {templates.length > 0 ? (
              templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setContent(t.content);
                    setType(t.type);
                  }}
                  className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                >
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{t.content}</p>
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">Nenhum modelo cadastrado.</p>
            )}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
          <h4 className="text-sm font-bold text-emerald-800 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Dica de Uso</span>
          </h4>
          <p className="text-xs text-emerald-700 mt-2 leading-relaxed">
            Mensagens de áudio devem estar no formato OGG/OPUS para maior compatibilidade, mas nosso sistema converte automaticamente se necessário.
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default MessengerView;
