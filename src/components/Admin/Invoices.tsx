import React, { useState } from 'react';
import { Search, Plus, Download, Eye, DollarSign, Calendar, Filter, MoreVertical } from 'lucide-react';

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const invoices = [
    {
      id: 'INV-001',
      clientName: 'Alice Cooper',
      amount: '$12,500',
      status: 'paid',
      dueDate: '2024-01-15',
      issueDate: '2024-01-01',
      property: 'Downtown Apartment',
      type: 'commission',
      realtor: 'Sarah Johnson'
    },
    {
      id: 'INV-002',
      clientName: 'Bob Martinez',
      amount: '$8,750',
      status: 'pending',
      dueDate: '2024-01-20',
      issueDate: '2024-01-05',
      property: 'Suburban Villa',
      type: 'service',
      realtor: 'Michael Chen'
    },
    {
      id: 'INV-003',
      clientName: 'Carol White',
      amount: '$15,000',
      status: 'overdue',
      dueDate: '2024-01-10',
      issueDate: '2023-12-25',
      property: 'Marina Condo',
      type: 'commission',
      realtor: 'Emily Davis'
    },
    {
      id: 'INV-004',
      clientName: 'Dan Brown',
      amount: '$3,200',
      status: 'paid',
      dueDate: '2024-01-18',
      issueDate: '2024-01-03',
      property: 'Heritage Townhouse',
      type: 'consultation',
      realtor: 'David Wilson'
    },
    {
      id: 'INV-005',
      clientName: 'Eva Green',
      amount: '$22,000',
      status: 'pending',
      dueDate: '2024-01-25',
      issueDate: '2024-01-10',
      property: 'Luxury Penthouse',
      type: 'commission',
      realtor: 'Sarah Johnson'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'commission': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'service': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'consultation': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => 
    sum + parseFloat(invoice.amount.replace('$', '').replace(',', '')), 0
  );

  const paidAmount = filteredInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace('$', '').replace(',', '')), 0);

  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
            <p className="text-gray-600">Manage and track all invoices</p>
          </div>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => alert('Create Invoice button clicked!')}
          >
            <Plus size={20} />
            Create Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">${paidAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input pl-10 pr-8 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-gray-500">{invoice.property}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="avatar avatar-sm mr-3">
                          {invoice.clientName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.clientName}</div>
                          <div className="text-sm text-gray-500">{invoice.realtor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{invoice.amount}</div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(invoice.type)}`}>
                        {invoice.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                          onClick={() => alert(`View invoice: ${invoice.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-emerald-600 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-50 transition-colors"
                          onClick={() => alert(`Download invoice: ${invoice.id}`)}
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => alert(`More actions for invoice: ${invoice.id}`)}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-500">No invoices match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;