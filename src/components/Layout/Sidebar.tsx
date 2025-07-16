import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  UserCheck, 
  Building,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Video,
  BarChart3,
  LogOut,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { user, tenant, portal, logout, canAccessPortal, getAvailablePortals, switchPortal } = useAuth();

  const availablePortals = getAvailablePortals();
  const canSwitchPortals = availablePortals.length > 1;

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    switch (portal) {
      case 'admin':
        if (!canAccessPortal('admin')) return [];
        return [
          ...commonItems.slice(0, 1),
          { id: 'contacts', label: 'Contacts', icon: Users },
          { id: 'users', label: 'User Management', icon: UserCheck },
          { id: 'invoices', label: 'Invoices', icon: FileText },
          { id: 'payroll', label: 'Payroll', icon: DollarSign },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ...commonItems.slice(1),
        ];
      
      case 'realtor':
        if (!canAccessPortal('realtor')) return [];
        return [
          ...commonItems.slice(0, 1),
          { id: 'leads', label: 'Lead Tracking', icon: TrendingUp },
          { id: 'properties', label: 'Properties', icon: Building },
          { id: 'chat', label: 'Messages', icon: MessageSquare },
          { id: 'meetings', label: 'Meetings', icon: Calendar },
          { id: 'virtual-tours', label: 'Virtual Tours', icon: Video },
          ...commonItems.slice(1),
        ];
      
      case 'client':
        if (!canAccessPortal('client')) return [];
        return [
          { id: 'client-view', label: 'Browse Properties', icon: Building },
          { id: 'shortlisted', label: 'Shortlisted', icon: Home },
          { id: 'meetings', label: 'My Meetings', icon: Calendar },
          ...commonItems.slice(1),
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const getPortalGradient = () => {
    switch (portal) {
      case 'admin': return 'from-indigo-500 to-blue-600';
      case 'realtor': return 'from-violet-500 to-purple-600';
      case 'client': return 'from-emerald-500 to-green-600';
      default: return 'from-indigo-500 to-blue-600';
    }
  };

  const getPortalBadgeColor = () => {
    switch (portal) {
      case 'admin': return 'bg-indigo-100 text-indigo-700';
      case 'realtor': return 'bg-violet-100 text-violet-700';
      case 'client': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-indigo-100 text-indigo-700';
    }
  };

  const getActiveItemColor = () => {
    switch (portal) {
      case 'admin': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'realtor': return 'bg-violet-50 text-violet-600 border-violet-200';
      case 'client': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-indigo-50 text-indigo-600 border-indigo-200';
    }
  };

  const getTenantTypeLabel = () => {
    return tenant?.type === 'organization' ? 'Organization' : 'Sole Proprietor';
  };

  return (
    <div className="w-72 bg-white border-r border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPortalGradient()} flex items-center justify-center shadow-lg`}>
            <Building className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {tenant?.settings.branding?.companyName || 'RealEstate CRM'}
            </h1>
            <p className="text-xs text-gray-500 truncate">{getTenantTypeLabel()}</p>
          </div>
        </div>
        
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getPortalBadgeColor()}`}>
          <div className={`w-2 h-2 rounded-full ${
            portal === 'admin' ? 'bg-indigo-500' : 
            portal === 'realtor' ? 'bg-violet-500' : 'bg-emerald-500'
          }`} />
          {(portal ?? 'admin').charAt(0).toUpperCase() + (portal ?? 'admin').slice(1)} Portal
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Portal Switcher */}
        {canSwitchPortals && (
          <div className="mb-6 pb-4 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Switch Portal
            </p>
            <div className="space-y-1">
              {availablePortals.map((portalType) => (
                <button
                  key={portalType}
                  onClick={() => switchPortal(portalType)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    portal === portalType
                      ? `${portalType === 'admin' ? 'bg-indigo-50 text-indigo-600' :
                          portalType === 'realtor' ? 'bg-violet-50 text-violet-600' :
                          'bg-emerald-50 text-emerald-600'}`
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {portalType.charAt(0).toUpperCase() + portalType.slice(1)} Portal
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-medium ${
                isActive ? `active ${getActiveItemColor()} border` : ''
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-50 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white font-medium">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;