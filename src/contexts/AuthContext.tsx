import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant, TenantType } from '../types';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  portal: 'admin' | 'realtor' | 'client' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchPortal: (portal: 'admin' | 'realtor' | 'client') => void;
  canAccessPortal: (portal: 'admin' | 'realtor' | 'client') => boolean;
  getAvailablePortals: () => ('admin' | 'realtor' | 'client')[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [tenant, setTenant] = useState<Tenant | null>(() => {
    const saved = localStorage.getItem('tenant');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [portal, setPortal] = useState<'admin' | 'realtor' | 'client' | null>(() => {
    const saved = localStorage.getItem('portal');
    return (saved as 'admin' | 'realtor' | 'client') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    if (tenant) {
      localStorage.setItem('tenant', JSON.stringify(tenant));
    } else {
      localStorage.removeItem('tenant');
    }
    if (portal) {
      localStorage.setItem('portal', portal);
    } else {
      localStorage.removeItem('portal');
    }
  }, [user, tenant, portal]);

  // Auto-determine portal based on tenant type and user role
  useEffect(() => {
    if (user && tenant && !portal) {
      const availablePortals = getAvailablePortals();
      if (availablePortals.length > 0) {
        // Priority: admin > realtor > client
        if (availablePortals.includes('admin')) {
          setPortal('admin');
        } else if (availablePortals.includes('realtor')) {
          setPortal('realtor');
        } else {
          setPortal('client');
        }
      }
    }
  }, [user, tenant, portal]);

  const login = async (email: string, password: string) => {
    // Mock tenant selection - in real app, this would be determined by the user's organization
    const mockTenantType: TenantType = email.includes('org') ? 'organization' : 'sole_proprietor';
    
    const mockTenant: Tenant = {
      id: mockTenantType === 'organization' ? 'org-1' : 'sole-1',
      name: mockTenantType === 'organization' ? 'Premier Real Estate Group' : 'John Doe Realty',
      type: mockTenantType,
      settings: {
        branding: {
          companyName: mockTenantType === 'organization' ? 'Premier Real Estate Group' : 'John Doe Realty',
          primaryColor: mockTenantType === 'organization' ? '#3B82F6' : '#8B5CF6',
        },
        features: {
          adminPortal: mockTenantType === 'organization',
          realtorPortal: true,
          clientPortal: true,
        },
      },
    };
    
    // Determine user role based on email patterns or default logic
    let userRole: 'admin' | 'realtor' | 'client' = 'realtor'; // default
    if (email.includes('admin') && mockTenantType === 'organization') {
      userRole = 'admin';
    } else if (email.includes('client')) {
      userRole = 'client';
    }
    
    const mockUser: User = {
      id: '1',
      name: userRole === 'admin' ? 'Admin User' : userRole === 'realtor' ? 'John Realtor' : 'Jane Client',
      email,
      role: userRole,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      tenantId: mockTenant.id,
    };
    
    setUser(mockUser);
    setTenant(mockTenant);
    // Portal will be set automatically by useEffect
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    setPortal(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
    localStorage.removeItem('portal');
  };

  const switchPortal = (newPortal: 'admin' | 'realtor' | 'client') => {
    if (!canAccessPortal(newPortal)) {
      return;
    }
    setPortal(newPortal);
  };

  const getAvailablePortals = (): ('admin' | 'realtor' | 'client')[] => {
    if (!tenant) return [];
    
    const portals: ('admin' | 'realtor' | 'client')[] = [];
    
    if (tenant.type === 'organization' && tenant.settings.features?.adminPortal) {
      portals.push('admin');
    }
    if (tenant.settings.features?.realtorPortal) {
      portals.push('realtor');
    }
    if (tenant.settings.features?.clientPortal) {
      portals.push('client');
    }
    
    return portals;
  };

  const canAccessPortal = (portalType: 'admin' | 'realtor' | 'client') => {
    if (!tenant) return false;
    
    switch (portalType) {
      case 'admin':
        return tenant.type === 'organization' && tenant.settings.features?.adminPortal;
      case 'realtor':
        return tenant.settings.features?.realtorPortal;
      case 'client':
        return tenant.settings.features?.clientPortal;
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      tenant, 
      portal, 
      login, 
      logout, 
      switchPortal, 
      canAccessPortal, 
      getAvailablePortals 
    }}>
      {children}
    </AuthContext.Provider>
  );
};