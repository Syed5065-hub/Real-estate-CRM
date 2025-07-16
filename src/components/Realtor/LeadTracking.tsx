import React, { useState } from 'react';
import { Search, Plus, Phone, Mail, Calendar, DollarSign, Filter } from 'lucide-react';
import { Lead } from '../../types';

const LeadTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Alice Cooper',
      email: 'alice@example.com',
      phone: '+1 (555) 123-4567',
      status: 'new',
      source: 'Website',
      budget: '$500,000',
      preferences: {
        propertyType: 'Apartment',
        location: 'Downtown',
        bedrooms: 2,
        maxPrice: 500000,
      },
      assignedTo: 'realtor-1',
      createdAt: '2024-01-15T10:00:00Z',
      lastActivity: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Bob Martinez',
      email: 'bob@example.com',
      phone: '+1 (555) 234-5678',
      status: 'contacted',
      source: 'Referral',
      budget: '$750,000',
      preferences: {
        propertyType: 'House',
        location: 'Suburbs',
        bedrooms: 4,
        maxPrice: 750000,
      },
      assignedTo: 'realtor-1',
      createdAt: '2024-01-14T14:30:00Z',
      lastActivity: '2024-01-16T09:15:00Z',
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      phone: '+1 (555) 345-6789',
      status: 'qualified',
      source: 'Social Media',
      budget: '$400,000',
      preferences: {
        propertyType: 'Condo',
        location: 'Marina',
        bedrooms: 2,
        maxPrice: 400000,
      },
      assignedTo: 'realtor-1',
      createdAt: '2024-01-13T16:45:00Z',
      lastActivity: '2024-01-17T11:30:00Z',
    },
    {
      id: '4',
      name: 'Dan Brown',
      email: 'dan@example.com',
      phone: '+1 (555) 456-7890',
      status: 'converted',
      source: 'Cold Call',
      budget: '$600,000',
      preferences: {
        propertyType: 'Townhouse',
        location: 'Heritage District',
        bedrooms: 3,
        maxPrice: 600000,
      },
      assignedTo: 'realtor-1',
      createdAt: '2024-01-12T08:20:00Z',
      lastActivity: '2024-01-18T15:45:00Z',
    },
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'qualified': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'converted': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'lost': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSourceColor = (source: string) => {
    const colors = {
      'Website': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Referral': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Social Media': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Cold Call': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <div className="p-6 space-y-6 font-[Montserrat,Open_Sans,sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-black">Lead Tracking</h1>
          <p className="text-gray-600 text-base mt-1">Manage and track all your leads</p>
        </div>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
          onClick={() => alert('Add Lead button clicked!')}
        >
          <Plus size={20} />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-black placeholder-gray-500"
          />
        </div>
        <div className="relative w-full sm:w-56">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-black appearance-none"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-black">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.email}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}> 
                {lead.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={16} />
                <span>Budget: {lead.budget}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Looking for: {lead.preferences.bedrooms} bed {lead.preferences.propertyType}</p>
                <p>Location: {lead.preferences.location}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getSourceColor(lead.source)}`}> 
                {lead.source}
              </span>
              <span className="text-xs text-gray-500">
                Last activity: {new Date(lead.lastActivity).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-purple-50 text-purple-600 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow"
                onClick={() => alert(`Call lead: ${lead.name}`)}
              >
                <Phone size={16} />
                Call
              </button>
              <button
                className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow"
                onClick={() => alert(`Email lead: ${lead.name}`)}
              >
                <Mail size={16} />
                Email
              </button>
              <button
                className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow"
                onClick={() => alert(`Meet lead: ${lead.name}`)}
              >
                <Calendar size={16} />
                Meet
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No leads found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default LeadTracking;