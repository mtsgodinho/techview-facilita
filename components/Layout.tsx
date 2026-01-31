
import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  QrCode, 
  Send, 
  FileText, 
  History, 
  LogOut,
  Zap
} from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, onLogout, children }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Resumo', icon: LayoutDashboard },
    { id: AppView.CONNECT, label: 'Conexão', icon: QrCode },
    { id: AppView.MESSENGER, label: 'Enviar Mensagem', icon: Send },
    { id: AppView.TEMPLATES, label: 'Modelos', icon: FileText },
    { id: AppView.HISTORY, label: 'Histórico', icon: History },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-900">ZapFlow</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair do App</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            {navItems.find(i => i.id === currentView)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Logado como</p>
              <p className="text-sm font-medium">atendimento@exemplo.com</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
