import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MoreVertical } from 'lucide-react';

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      status: 'active',
      tags: ['VIP', 'Enterprise'],
      lastContact: '2 days ago',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 234-5678',
      company: 'Digital Marketing Co.',
      status: 'pending',
      tags: ['Lead'],
      lastContact: '1 week ago',
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 345-6789',
      company: 'Creative Agency',
      status: 'active',
      tags: ['Client', 'Recurring'],
      lastContact: '3 days ago',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Startup Hub',
      status: 'inactive',
      tags: ['Prospect'],
      lastContact: '2 weeks ago',
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Enterprise': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Lead': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'Client': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Recurring': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      'Prospect': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-black">Contacts</h1>
          <p className="text-gray-600 text-base mt-1">Manage and view all contacts</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add Contact
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-black placeholder-gray-500 transition"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{contact.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.company}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{contact.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}> 
                {contact.status}
              </span>
              <span className="text-xs text-gray-500">
                Last contact: {contact.lastContact}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag, index) => (
                <span key={index} className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;