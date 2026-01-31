
import React, { useState } from 'react';
import { backend } from '../services/mockBackend';
import { MessageType } from '../types';
import { Plus, Trash2, Tag, FileText, Mic, Video } from 'lucide-react';

const TemplateView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<MessageType>(MessageType.TEXT);

  const handleSave = () => {
    if (!name || !content) return;
    backend.addTemplate(name, content, category || 'Geral', type);
    setName('');
    setContent('');
    setCategory('');
    setShowModal(false);
  };

  const templates = backend.getTemplates();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Modelos</h2>
          <p className="text-gray-500">Agilize seu atendimento com mensagens pré-definidas.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center space-x-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Modelo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {t.category}
              </span>
              <button 
                onClick={() => backend.deleteTemplate(t.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-4 flex-1">{t.content}</p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-2 text-xs text-gray-400">
               {t.type === MessageType.TEXT && <FileText className="w-3 h-3" />}
               {t.type === MessageType.AUDIO && <Mic className="w-3 h-3" />}
               {t.type === MessageType.VIDEO && <Video className="w-3 h-3" />}
               <span className="capitalize">{t.type.toLowerCase()}</span>
            </div>
          </div>
        ))}

        {templates.length === 0 && (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
             <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
               <Tag className="w-10 h-10 text-gray-300" />
             </div>
             <h3 className="text-lg font-bold text-gray-400">Sem modelos ainda</h3>
             <p className="text-sm text-gray-400 max-w-xs mt-2">
               Crie seu primeiro modelo de mensagem para acelerar o processo de envio.
             </p>
          </div>
        )}
      </div>

      {/* Modal Mock */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Criar Modelo</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="p-6 space-y-4">
              <input 
                type="text" 
                placeholder="Nome do Modelo (ex: Boas Vindas)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input 
                type="text" 
                placeholder="Categoria (ex: Vendas)"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex space-x-2">
                  {[MessageType.TEXT, MessageType.AUDIO, MessageType.VIDEO].map(m => (
                    <button 
                      key={m}
                      onClick={() => setType(m)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        type === m ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
              </div>
              <textarea 
                rows={5}
                placeholder="Mensagem..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <button 
                onClick={handleSave}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
              >
                Salvar Modelo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateView;
