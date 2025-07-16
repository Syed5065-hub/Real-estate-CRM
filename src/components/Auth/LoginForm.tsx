import React, { useState } from 'react';
import { Building2, User, Users, Smartphone, Shield, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantType, setTenantType] = useState<'organization' | 'sole_proprietor'>('organization');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const getPortalFeatures = () => {
    if (tenantType === 'organization') {
      return [
        { 
          icon: Shield, 
          name: 'Admin Portal', 
          description: 'User management, analytics, and system administration',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50'
        },
        { 
          icon: TrendingUp, 
          name: 'Realtor Portal', 
          description: 'Lead tracking, property management, and client relations',
          color: 'text-violet-600',
          bgColor: 'bg-violet-50'
        },
        { 
          icon: Smartphone, 
          name: 'Client Portal', 
          description: 'Browse properties, shortlist favorites, and connect',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50'
        },
      ];
    } else {
      return [
        { 
          icon: TrendingUp, 
          name: 'Realtor Portal', 
          description: 'Lead tracking, property management, and client relations',
          color: 'text-violet-600',
          bgColor: 'bg-violet-50'
        },
        { 
          icon: Smartphone, 
          name: 'Client Portal', 
          description: 'Browse properties, shortlist favorites, and connect',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50'
        },
      ];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const emailWithTenant = tenantType === 'organization' ? `${email.split('@')[0]}+org@${email.split('@')[1] || 'example.com'}` : email;
      await login(emailWithTenant, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Real Estate CRM</h1>
            <p className="text-gray-600">Choose your account type to continue</p>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Account Type
            </label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setTenantType('organization')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  tenantType === 'organization'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-gray-900">Real Estate Organization</h3>
                    <p className="text-sm text-gray-600">Full admin, realtor, and client portals</p>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setTenantType('sole_proprietor')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  tenantType === 'sole_proprietor'
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-gray-900">Sole Proprietor Realtor</h3>
                    <p className="text-sm text-gray-600">Realtor and client portals only</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Available Features */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Available Features
            </label>
            <div className="space-y-3">
              {getPortalFeatures().map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={`flex items-start gap-4 p-4 ${feature.bgColor} rounded-xl`}>
                    <div className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                `Sign in to ${tenantType === 'organization' ? 'Real Estate CRM' : 'Realtor Platform'}`
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Demo:</strong> Use any email/password combination to sign in
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Organization:</strong> admin@company.com</p>
              <p><strong>Sole Proprietor:</strong> realtor@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;