import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Building, Calendar, Filter, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>('month');

  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6
    },
    properties: {
      listed: 156,
      sold: 23,
      pending: 12
    },
    agents: {
      active: 15,
      topPerformer: 'Sarah Johnson',
      avgDeals: 8.3
    },
    clients: {
      total: 342,
      new: 45,
      retention: 89.2
    }
  };

  const monthlyData = [
    { month: 'Jan', revenue: 85000, properties: 18, clients: 28 },
    { month: 'Feb', revenue: 92000, properties: 21, clients: 32 },
    { month: 'Mar', revenue: 78000, properties: 15, clients: 25 },
    { month: 'Apr', revenue: 105000, properties: 24, clients: 38 },
    { month: 'May', revenue: 118000, properties: 28, clients: 42 },
    { month: 'Jun', revenue: 125000, properties: 31, clients: 45 }
  ];

  const topAgents = [
    { name: 'Sarah Johnson', sales: 125000, deals: 12, commission: 18750 },
    { name: 'Michael Chen', sales: 98000, deals: 9, commission: 14700 },
    { name: 'Emily Davis', sales: 87000, deals: 8, commission: 13050 },
    { name: 'David Wilson', sales: 76000, deals: 7, commission: 11400 },
    { name: 'Lisa Anderson', sales: 65000, deals: 6, commission: 9750 }
  ];

  const propertyTypes = [
    { type: 'Apartments', count: 45, percentage: 35 },
    { type: 'Houses', count: 38, percentage: 30 },
    { type: 'Condos', count: 32, percentage: 25 },
    { type: 'Townhouses', count: 13, percentage: 10 }
  ];

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Business insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="form-input pl-10 pr-8 appearance-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${analyticsData.revenue.current.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">+{analyticsData.revenue.growth}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Properties Sold</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.properties.sold}</p>
                <p className="text-xs text-gray-500 mt-1">{analyticsData.properties.pending} pending</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.agents.active}</p>
                <p className="text-xs text-gray-500 mt-1">Avg {analyticsData.agents.avgDeals} deals/month</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">New Clients</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.clients.new}</p>
                <p className="text-xs text-gray-500 mt-1">{analyticsData.clients.retention}% retention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <TrendingUp size={16} />
                <span>+27.6% vs last period</span>
              </div>
            </div>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / 125000) * 100}%` }}
                    />
                  </div>
                  <div className="w-20 text-sm font-semibold text-gray-900 text-right">
                    ${(data.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Property Distribution</h3>
            <div className="space-y-4">
              {propertyTypes.map((property, index) => (
                <div key={property.type} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-600">{property.type}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' :
                        index === 1 ? 'bg-gradient-to-r from-violet-500 to-violet-600' :
                        index === 2 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                        'bg-gradient-to-r from-amber-500 to-amber-600'
                      }`}
                      style={{ width: `${property.percentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                    {property.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Agents</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sales Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Deals Closed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {topAgents.map((agent, index) => (
                  <tr key={agent.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="avatar avatar-sm mr-3">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">#{index + 1} Performer</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${agent.sales.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{agent.deals}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-emerald-600">
                        ${agent.commission.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                            style={{ width: `${(agent.sales / 125000) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {Math.round((agent.sales / 125000) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;