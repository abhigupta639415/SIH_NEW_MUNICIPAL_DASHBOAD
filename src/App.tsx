import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import IssuesTable from './components/issues/IssuesTable';
import Reports from './components/reports/Reports';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-government-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'issues':
        return <IssuesTable />;
      case 'reports':
        return <Reports />;
      case 'users':
        return (
          <div className="text-center py-12 font-official">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              User Management
            </h2>
            <p className="text-gray-600">
              User management features coming soon...
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12 font-official">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              System Settings
            </h2>
            <p className="text-gray-600">
              System configuration coming soon...
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-official">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2025 Municipal Corporation. All rights reserved. | Digital India Initiative
            </div>
            <div className="flex items-center space-x-4">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Support: support@municipal.gov.in</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;