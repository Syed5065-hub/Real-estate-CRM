import React from 'react';
import { Users, CheckCircle, Calendar, TrendingUp, DollarSign, Building, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { portal } = useAuth();

  const getStats = () => {
    switch (portal) {
      case 'admin':
        return [
          { 
            label: 'Total Users', 
            value: '1,247', 
            change: '+12%', 
            trend: 'up',
            icon: Users, 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
          },
          { 
            label: 'Active Realtors', 
            value: '89', 
            change: '+8%', 
            trend: 'up',
            icon: CheckCircle, 
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600'
          },
          { 
            label: 'Properties Listed', 
            value: '2,156', 
            change: '+15%', 
            trend: 'up',
            icon: Building, 
            color: 'bg-gradient-to-br from-violet-500 to-violet-600',
            bgColor: 'bg-violet-50',
            textColor: 'text-violet-600'
          },
          { 
            label: 'Monthly Revenue', 
            value: '$125K', 
            change: '+22%', 
            trend: 'up',
            icon: DollarSign, 
            color: 'bg-gradient-to-br from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600'
          },
        ];
      
      case 'realtor':
        return [
          { 
            label: 'Active Leads', 
            value: '47', 
            change: '+18%', 
            trend: 'up',
            icon: Users, 
            color: 'bg-gradient-to-br from-violet-500 to-violet-600',
            bgColor: 'bg-violet-50',
            textColor: 'text-violet-600'
          },
          { 
            label: 'Properties Listed', 
            value: '23', 
            change: '+5%', 
            trend: 'up',
            icon: Building, 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
          },
          { 
            label: 'Meetings Today', 
            value: '6', 
            change: '+2%', 
            trend: 'up',
            icon: Calendar, 
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600'
          },
          { 
            label: 'This Month Sales', 
            value: '$45K', 
            change: '+28%', 
            trend: 'up',
            icon: TrendingUp, 
            color: 'bg-gradient-to-br from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600'
          },
        ];
      
      case 'client':
        return [
          { 
            label: 'Properties Viewed', 
            value: '34', 
            change: '+12%', 
            trend: 'up',
            icon: Building, 
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600'
          },
          { 
            label: 'Shortlisted', 
            value: '7', 
            change: '+3%', 
            trend: 'up',
            icon: CheckCircle, 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
          },
          { 
            label: 'Scheduled Tours', 
            value: '3', 
            change: '+1%', 
            trend: 'up',
            icon: Calendar, 
            color: 'bg-gradient-to-br from-violet-500 to-violet-600',
            bgColor: 'bg-violet-50',
            textColor: 'text-violet-600'
          },
          { 
            label: 'Messages', 
            value: '12', 
            change: '+4%', 
            trend: 'up',
            icon: MessageSquare, 
            color: 'bg-gradient-to-br from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600'
          },
        ];
      
      default:
        return [];
    }
  };

  const getRecentItems = () => {
    switch (portal) {
      case 'admin':
        return {
          title: 'Recent System Activity',
          items: [
            { id: 1, title: 'New realtor registration: Sarah Johnson', priority: 'medium', dueDate: '2 hours ago', status: 'pending' },
            { id: 2, title: 'Property listing approved: Downtown Condo', priority: 'low', dueDate: '4 hours ago', status: 'completed' },
            { id: 3, title: 'Payment processed: $12,500 commission', priority: 'high', dueDate: '6 hours ago', status: 'completed' },
            { id: 4, title: 'User support ticket resolved', priority: 'medium', dueDate: '1 day ago', status: 'completed' },
          ]
        };
      
      case 'realtor':
        return {
          title: 'Recent Tasks',
          items: [
            { id: 1, title: 'Follow up with John Smith - Luxury Condo', priority: 'high', dueDate: 'Today', status: 'pending' },
            { id: 2, title: 'Prepare listing photos for Sunset Villa', priority: 'medium', dueDate: 'Tomorrow', status: 'in-progress' },
            { id: 3, title: 'Schedule virtual tour for downtown apartment', priority: 'high', dueDate: 'Today', status: 'pending' },
            { id: 4, title: 'Update property description for Garden House', priority: 'low', dueDate: 'This week', status: 'pending' },
          ]
        };
      
      case 'client':
        return {
          title: 'Recent Activity',
          items: [
            { id: 1, title: 'Viewed: Modern Downtown Apartment', priority: 'medium', dueDate: '2 hours ago', status: 'viewed' },
            { id: 2, title: 'Shortlisted: Luxury Family Home', priority: 'high', dueDate: '4 hours ago', status: 'shortlisted' },
            { id: 3, title: 'Message from realtor: Tour scheduled', priority: 'high', dueDate: '6 hours ago', status: 'message' },
            { id: 4, title: 'New property match found', priority: 'medium', dueDate: '1 day ago', status: 'match' },
          ]
        };
      
      default:
        return { title: 'Recent Items', items: [] };
    }
  };

  const getContacts = () => {
    switch (portal) {
      case 'admin':
        return {
          title: 'Top Performing Realtors',
          items: [
            { id: 1, name: 'Sarah Johnson', email: 'sarah@realestate.com', status: 'active', metric: '$125K sales', avatar: 'SJ' },
            { id: 2, name: 'Michael Chen', email: 'michael@realestate.com', status: 'active', metric: '$98K sales', avatar: 'MC' },
            { id: 3, name: 'Emily Davis', email: 'emily@realestate.com', status: 'active', metric: '$87K sales', avatar: 'ED' },
            { id: 4, name: 'David Wilson', email: 'david@realestate.com', status: 'active', metric: '$76K sales', avatar: 'DW' },
          ]
        };
      
      case 'realtor':
        return {
          title: 'Recent Leads',
          items: [
            { id: 1, name: 'Alice Cooper', email: 'alice@example.com', status: 'new', metric: 'Budget: $500K', avatar: 'AC' },
            { id: 2, name: 'Bob Martinez', email: 'bob@example.com', status: 'contacted', metric: 'Budget: $750K', avatar: 'BM' },
            { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'qualified', metric: 'Budget: $400K', avatar: 'CW' },
            { id: 4, name: 'Dan Brown', email: 'dan@example.com', status: 'new', metric: 'Budget: $600K', avatar: 'DB' },
          ]
        };
      
      case 'client':
        return {
          title: 'My Realtors',
          items: [
            { id: 1, name: 'Sarah Johnson', email: 'sarah@realestate.com', status: 'active', metric: 'Primary Agent', avatar: 'SJ' },
            { id: 2, name: 'Michael Chen', email: 'michael@realestate.com', status: 'active', metric: 'Specialist', avatar: 'MC' },
          ]
        };
      
      default:
        return { title: 'Contacts', items: [] };
    }
  };

  const stats = getStats();
  const recentItems = getRecentItems();
  const contacts = getContacts();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge badge-error';
      case 'medium': return 'badge badge-warning';
      case 'low': return 'badge badge-success';
      default: return 'badge';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'badge badge-success';
      case 'new': return 'badge badge-primary';
      case 'contacted': return 'badge badge-warning';
      case 'qualified': return 'badge badge-secondary';
      case 'completed': return 'badge badge-success';
      case 'pending': return 'badge badge-warning';
      case 'in-progress': return 'badge badge-primary';
      default: return 'badge';
    }
  };

  const getPortalTitle = () => {
    switch (portal) {
      case 'admin': return 'Admin Dashboard';
      case 'realtor': return 'Realtor Dashboard';
      case 'client': return 'Client Dashboard';
      default: return 'Dashboard';
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${greeting}! Here's what's happening today.`;
  };

  return (
      <div className="min-h-screen bg-white font-[Montserrat,Open_Sans,sans-serif]">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">{getPortalTitle()}</h1>
            <p className="text-gray-600">{getWelcomeMessage()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shadow-md`}>
                    <Icon className={stat.textColor + " h-6 w-6"} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Items */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">{recentItems.title}</h2>
              <button className="text-sm text-violet-600 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentItems.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-black mb-1">{item.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{item.dueDate}</span>
                      <span className={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">{contacts.title}</h2>
              <button className="text-sm text-violet-600 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {contacts.items.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-black">{contact.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{contact.metric}</p>
                  </div>
                  <span className={getStatusBadge(contact.status)}>
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;