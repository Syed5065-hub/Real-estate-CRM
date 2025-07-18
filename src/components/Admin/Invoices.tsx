import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Eye, DollarSign, Calendar, Filter, MoreVertical } from 'lucide-react';

const Invoices: React.FC = () => {
  // Modal and action state
  const [viewInvoice, setViewInvoice] = useState<any | null>(null);
  const [editInvoice, setEditInvoice] = useState<any | null>(null);
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);


  // Download invoice as text file (no PDF dependency)
  const handleDownload = (invoice: any) => {
    const content = `Invoice ID: ${invoice.id}\nClient: ${invoice.client}\nAmount: ${invoice.amount}\nStatus: ${invoice.status}\nDue Date: ${invoice.dueDate}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${invoice.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Edit invoice handler
  const handleEditInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoices(invoices.map((inv: any) => inv.id === editInvoice.id ? editInvoice : inv));
    setEditInvoice(null);
  };

  // Delete invoice handler
  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv: any) => inv.id !== id));
    setShowDeleteId(null);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    status: 'pending',
    dueDate: '',
  });

  const defaultInvoices = [
    {
      id: '1',
      client: 'Acme Corp',
      amount: '1200',
      status: 'pending',
      dueDate: '2025-07-25',
    },
    {
      id: '2',
      client: 'Beta LLC',
      amount: '800',
      status: 'paid',
      dueDate: '2025-07-10',
    },
    {
      id: '3',
      client: 'Gamma Inc',
      amount: '1500',
      status: 'overdue',
      dueDate: '2025-07-01',
    },
  ];

  const [invoices, setInvoices] = useState<any[]>(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : defaultInvoices;
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoices([
      ...invoices,
      {
        id: Date.now().toString(),
        ...newInvoice,
      }
    ]);
    setShowCreateModal(false);
    setNewInvoice({ client: '', amount: '', status: 'pending', dueDate: '' });
  };

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      (invoice.client && invoice.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="h-full bg-white overflow-auto admin-portal">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
            <p className="text-gray-600">Manage and track all invoices</p>
          </div>
          <button
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md font-semibold transition-colors hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} className="mr-2" />
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
        <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-black placeholder-gray-500 transition"
            />
          </div>
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-black transition appearance-none"
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
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="avatar avatar-sm mr-3">
                          {invoice.client && invoice.client.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{invoice.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                          onClick={() => setViewInvoice(invoice)}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-emerald-600 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-50 transition-colors"
                          onClick={() => handleDownload(invoice)}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setShowDeleteId(showDeleteId === invoice.id ? null : invoice.id)}
                            title="More"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {showDeleteId === invoice.id && (
                            <div className="fixed z-50 min-w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg right-8 top-auto mt-2"
                              style={{ right: '20px', top: 'auto' }}
                            >
                              <button
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={() => { setEditInvoice(invoice); setShowDeleteId(null); }}
                              >Edit</button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => setShowDeleteId('delete-' + invoice.id)}
                              >Delete</button>
                            </div>
                          )}
                          {/* Delete confirmation */}
                          {showDeleteId === 'delete-' + invoice.id && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
                              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-2 flex flex-col items-center border border-gray-100">
                                <h3 className="text-2xl font-bold text-black mb-2 text-center w-full">Delete Invoice</h3>
                                <p className="text-gray-700 text-center mb-6">Are you sure you want to delete this invoice?</p>
                                <div className="flex gap-4 justify-center w-full">
                                  <button className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                                  <button className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setShowDeleteId(null)}>Cancel</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
      {/* View Invoice Modal */}
      {viewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-2 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">Invoice Details</h2>
            <div className="w-full space-y-2 text-left">
              <div><b>Invoice ID:</b> {viewInvoice.id}</div>
              <div><b>Client:</b> {viewInvoice.client}</div>
              <div><b>Amount:</b> {viewInvoice.amount}</div>
              <div><b>Status:</b> {viewInvoice.status}</div>
              <div><b>Due Date:</b> {viewInvoice.dueDate ? new Date(viewInvoice.dueDate).toLocaleDateString() : ''}</div>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700" onClick={() => setViewInvoice(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {editInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-2 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Invoice</h2>
            <form onSubmit={handleEditInvoice} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Client</label>
                <input
                  type="text"
                  value={editInvoice.client}
                  onChange={e => setEditInvoice({ ...editInvoice, client: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={editInvoice.amount}
                  onChange={e => setEditInvoice({ ...editInvoice, amount: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={editInvoice.dueDate}
                  onChange={e => setEditInvoice({ ...editInvoice, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editInvoice.status}
                  onChange={e => setEditInvoice({ ...editInvoice, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2 justify-center">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
                <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setEditInvoice(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
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

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-2 sm:mx-0 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">Create Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Client</label>
                <input
                  type="text"
                  value={newInvoice.client}
                  onChange={e => setNewInvoice({ ...newInvoice, client: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newInvoice.status}
                  onChange={e => setNewInvoice({ ...newInvoice, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2 justify-center">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Create</button>
                <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setShowCreateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;