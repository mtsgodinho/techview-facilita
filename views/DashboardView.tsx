
import React from 'react';
import { backend } from '../services/mockBackend';
import { MessageSquare, Users, CheckCircle2, Clock } from 'lucide-react';

const DashboardView: React.FC = () => {
  const history = backend.getHistory();
  const templates = backend.getTemplates();

  const stats = [
    { label: 'Enviadas hoje', value: '128', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversas Ativas', value: '42', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Taxa de Entrega', value: '98.5%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Tempo Médio', value: '2 min', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Atividade Recente</h2>
            <button className="text-sm text-indigo-600 font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="divide-y divide-gray-50">
            {history.length > 0 ? (
              history.slice(0, 5).map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold">
                      {item.recipient.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.recipient}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.content}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-400">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">ENTREGUE</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-400 italic">Nenhuma mensagem enviada ainda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Templates Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Seus Modelos</h2>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{templates.length}</p>
              <p className="text-sm text-gray-500">Modelos salvos</p>
            </div>
            <button className="w-full bg-gray-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Criar Novo Modelo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
