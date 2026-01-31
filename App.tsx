
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Layout from './components/Layout';
import AuthView from './views/AuthView';
import DashboardView from './views/DashboardView';
import ConnectView from './views/ConnectView';
import MessengerView from './views/MessengerView';
import TemplateView from './views/TemplateView';
import HistoryView from './views/HistoryView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  // Check initial auth state
  useEffect(() => {
    const session = localStorage.getItem('zapflow_auth');
    if (session) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('zapflow_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('zapflow_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      setView={setCurrentView} 
      onLogout={handleLogout}
    >
      {currentView === AppView.DASHBOARD && <DashboardView />}
      {currentView === AppView.CONNECT && <ConnectView />}
      {currentView === AppView.MESSENGER && <MessengerView />}
      {currentView === AppView.TEMPLATES && <TemplateView />}
      {currentView === AppView.HISTORY && <HistoryView />}
    </Layout>
  );
};

export default App;
