import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ClientView from './components/Client/ClientView';
import Shortlisted from './components/Client/Shortlisted';
import LeadTracking from './components/Realtor/LeadTracking';
import PropertyListings from './components/Realtor/PropertyListings';
import Chat from './components/Realtor/Chat';
import VirtualTours from './components/Realtor/VirtualTours';
import UserManagement from './components/Admin/UserManagement';
import Contacts from './components/Contacts/Contacts';
import Invoices from './components/Admin/Invoices';
import Payroll from './components/Admin/Payroll';
import Analytics from './components/Admin/Analytics';
import Settings from './components/Shared/Settings';
import Meetings from './components/Shared/Meetings';

function AppContent() {
  const { user, tenant, portal, canAccessPortal } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  // Move useEffect to top level - hooks must always be called in the same order
  React.useEffect(() => {
    if (user && portal && !canAccessPortal(portal)) {
      // Find first available portal
      const availablePortals = ['realtor', 'client', 'admin'].filter(p => 
        canAccessPortal(p as 'admin' | 'realtor' | 'client')
      );
      if (availablePortals.length > 0) {
        // This would trigger a portal switch in a real app
        console.warn(`Portal ${portal} not available, should redirect to ${availablePortals[0]}`);
      }
    }
  }, [portal, canAccessPortal, user]);

  if (!user) {
    return <LoginForm />;
  }

  // Show loading state while portal is being determined
  if (!portal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your workspace...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    // Admin Portal Views
    if (portal === 'admin' && canAccessPortal('admin')) {
      switch (currentView) {
        case 'dashboard': return <Dashboard />;
        case 'users': return <UserManagement />;
        case 'contacts': return <Contacts />;
        case 'invoices': return <Invoices />;
        case 'payroll': return <Payroll />;
        case 'analytics': return <Analytics />;
        case 'settings': return <Settings />;
        default: return <Dashboard />;
      }
    }

    // Realtor Portal Views
    if (portal === 'realtor' && canAccessPortal('realtor')) {
      switch (currentView) {
        case 'dashboard': return <Dashboard />;
        case 'leads': return <LeadTracking />;
        case 'properties': return <PropertyListings />;
        case 'chat': return <Chat />;
        case 'meetings': return <Meetings />;
        case 'virtual-tours': return <VirtualTours />;
        case 'settings': return <Settings />;
        default: return <Dashboard />;
      }
    }

    // Client Portal Views
    if (portal === 'client' && canAccessPortal('client')) {
      switch (currentView) {
        case 'dashboard': return <Dashboard />;
        case 'client-view': return <ClientView />;
        case 'shortlisted': return <Shortlisted />;
        case 'meetings': return <Meetings />;
        case 'settings': return <Settings />;
        default: return <ClientView />;
      }
    }

    // Fallback for unauthorized access
    return (
      <div className="h-full flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">
          You don't have permission to access this portal.
        </p>
          <p className="text-sm text-gray-500">
          Tenant Type: {tenant?.type === 'organization' ? 'Real Estate Organization' : 'Sole Proprietor'}
        </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg">
          <nav className="flex justify-around py-2">
            {portal === 'admin' && canAccessPortal('admin') && [
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'users', label: 'Users' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'settings', label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                  currentView === item.id
                    ? 'text-indigo-600'
                    : 'text-gray-600'
                }`}
              >
                <div className="w-6 h-6" />
                {item.label}
              </button>
            ))}
            
            {portal === 'realtor' && canAccessPortal('realtor') && [
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'leads', label: 'Leads' },
              { id: 'properties', label: 'Properties' },
              { id: 'chat', label: 'Chat' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                  currentView === item.id
                    ? 'text-violet-600'
                    : 'text-gray-600'
                }`}
              >
                <div className="w-6 h-6" />
                {item.label}
              </button>
            ))}
            
            {portal === 'client' && canAccessPortal('client') && [
              { id: 'client-view', label: 'Browse' },
              { id: 'shortlisted', label: 'Saved' },
              { id: 'meetings', label: 'Meetings' },
              { id: 'settings', label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                  currentView === item.id
                    ? 'text-emerald-600'
                    : 'text-gray-600'
                }`}
              >
                <div className="w-6 h-6" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;