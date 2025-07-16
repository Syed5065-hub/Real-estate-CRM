import React, { useState } from 'react';
import { Search, Plus, Download, Calendar, DollarSign, Users, TrendingUp, Filter } from 'lucide-react';

const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState<string>('current');

  const payrollData = [
    {
      id: 'PAY-001',
      employeeName: 'Sarah Johnson',
      role: 'Senior Realtor',
      baseSalary: 75000,
      commission: 12500,
      bonus: 2000,
      deductions: 1200,
      netPay: 88300,
      payPeriod: 'January 2024',
      status: 'paid',
      payDate: '2024-01-31'
    },
    {
      id: 'PAY-002',
      employeeName: 'Michael Chen',
      role: 'Realtor',
      baseSalary: 65000,
      commission: 8750,
      bonus: 1000,
      deductions: 950,
      netPay: 73800,
      payPeriod: 'January 2024',
      status: 'paid',
      payDate: '2024-01-31'
    },
    {
      id: 'PAY-003',
      employeeName: 'Emily Davis',
      role: 'Junior Realtor',
      baseSalary: 55000,
      commission: 6200,
      bonus: 500,
      deductions: 800,
      netPay: 60900,
      payPeriod: 'January 2024',
      status: 'pending',
      payDate: '2024-02-01'
    },
    {
      id: 'PAY-004',
      employeeName: 'David Wilson',
      role: 'Realtor',
      baseSalary: 68000,
      commission: 9500,
      bonus: 1500,
      deductions: 1100,
      netPay: 77900,
      payPeriod: 'January 2024',
      status: 'processing',
      payDate: '2024-02-01'
    },
    {
      id: 'PAY-005',
      employeeName: 'Lisa Anderson',
      role: 'Admin Assistant',
      baseSalary: 45000,
      commission: 0,
      bonus: 300,
      deductions: 600,
      netPay: 44700,
      payPeriod: 'January 2024',
      status: 'paid',
      payDate: '2024-01-31'
    }
  ];

  const filteredPayroll = payrollData.filter(payroll => {
    const matchesSearch = payroll.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payroll.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payroll.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalPayroll = filteredPayroll.reduce((sum, payroll) => sum + payroll.netPay, 0);
  const totalCommissions = filteredPayroll.reduce((sum, payroll) => sum + payroll.commission, 0);
  const totalBonuses = filteredPayroll.reduce((sum, payroll) => sum + payroll.bonus, 0);

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll</h1>
            <p className="text-gray-600">Manage employee compensation and payments</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Download size={20} />
              Export
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Process Payroll
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Commissions</p>
                <p className="text-2xl font-bold text-gray-900">${totalCommissions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Bonuses</p>
                <p className="text-2xl font-bold text-gray-900">${totalBonuses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Employees</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPayroll.length}</p>
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
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="form-input pl-10 pr-8 appearance-none"
            >
              <option value="current">Current Period</option>
              <option value="previous">Previous Period</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Base Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Bonus
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Net Pay
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pay Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredPayroll.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="avatar avatar-sm mr-3">
                          {payroll.employeeName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{payroll.employeeName}</div>
                          <div className="text-sm text-gray-500">{payroll.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${(payroll.baseSalary / 12).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Monthly</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-emerald-600">
                        ${payroll.commission.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-violet-600">
                        ${payroll.bonus.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${payroll.netPay.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        -{payroll.deductions.toLocaleString()} deductions
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payroll.status)}`}>
                        {payroll.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payroll.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPayroll.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No payroll data found</h3>
            <p className="text-gray-500">No payroll records match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;