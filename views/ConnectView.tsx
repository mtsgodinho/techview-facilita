
import React, { useState, useEffect } from 'react';
import { backend } from '../services/mockBackend';
import { WhatsAppSession } from '../types';
import { RefreshCw, Smartphone, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const ConnectView: React.FC = () => {
  const [session, setSession] = useState<WhatsAppSession>({ status: 'DISCONNECTED' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const s = await backend.getSession();
    setSession(s);
  };

  const handleConnect = async () => {
    setLoading(true);
    await backend.connectWhatsApp();
    
    // Periodically check until connected
    const interval = setInterval(async () => {
      const s = await backend.getSession();
      setSession(s);
      if (s.status === 'CONNECTED') {
        clearInterval(interval);
        setLoading(false);
      }
    }, 1000);
  };

  const handleDisconnect = async () => {
    await backend.disconnectWhatsApp();
    setSession({ status: 'DISCONNECTED' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 md:flex items-center space-x-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
              Gerenciamento de Instância
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Conecte seu WhatsApp</h2>
            <p className="text-gray-500 leading-relaxed">
              O ZapFlow funciona através de uma conexão segura com seu aparelho. 
              Escaneie o QR Code abaixo para sincronizar suas mensagens e começar a enviar através do nosso painel.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Criptografia Ponta-a-Ponta</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Multiusuário Independente</span>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 w-full md:w-64 flex flex-col items-center">
             {session.status === 'DISCONNECTED' && (
               <button 
                onClick={handleConnect}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
               >
                 <Smartphone className="w-5 h-5" />
                 <span>{loading ? 'Preparando...' : 'Gerar QR Code'}</span>
               </button>
             )}

             {session.status === 'CONNECTING' && session.qrCode && (
               <div className="bg-white p-4 rounded-2xl shadow-inner border-2 border-dashed border-indigo-200">
                 <img src={session.qrCode} alt="QR Code" className="w-48 h-48" />
                 <p className="text-center text-xs text-indigo-600 font-bold mt-2 flex items-center justify-center">
                   <RefreshCw className="w-3 h-3 animate-spin mr-1" /> Aguardando Leitura...
                 </p>
               </div>
             )}

             {session.status === 'CONNECTED' && (
               <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                   <CheckCircle className="w-10 h-10 text-emerald-600" />
                 </div>
                 <div>
                   <p className="font-bold text-emerald-700">Dispositivo Conectado</p>
                   <p className="text-sm text-gray-500">{session.connectedNumber}</p>
                 </div>
                 <button 
                  onClick={handleDisconnect}
                  className="text-sm text-red-600 hover:underline font-medium"
                 >
                   Desconectar Agora
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <h4 className="font-bold text-amber-800 text-sm">Atenção</h4>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Mantenha seu celular conectado à internet para que as mensagens sejam disparadas sem interrupções.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start space-x-4">
          <RefreshCw className="w-6 h-6 text-blue-600 shrink-0" />
          <div>
            <h4 className="font-bold text-blue-800 text-sm">Autonomia</h4>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              As sessões são gerenciadas de forma independente no servidor, permitindo que você feche esta aba.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start space-x-4">
          <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
          <div>
            <h4 className="font-bold text-indigo-800 text-sm">Privacidade</h4>
            <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
              Seus dados nunca são armazenados permanentemente fora da sua conta criptografada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectView;
