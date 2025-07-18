import React, { useState, useEffect } from 'react';
import { Search, Plus, Shield, Edit, Trash2, Filter } from 'lucide-react';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: 'admin' | 'realtor' | 'client';
    department: string;
  }>({
    name: '',
    email: '',
    role: 'admin',
    department: '',
  });
  const [editUser, setEditUser] = useState<any>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const handleDeleteUser = (id: string) => {
    setDeleteUserId(id);
  };
  const confirmDeleteUser = () => {
    if (deleteUserId) {
      setUsers(users.filter(u => u.id !== deleteUserId));
      setDeleteUserId(null);
    }
  };
  const cancelDeleteUser = () => {
    setDeleteUserId(null);
  };

  const handleEditUser = (user: any) => {
    setEditUser(user);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === editUser.id ? { ...u, ...editUser } : u));
    setEditUser(null);
  };
  const defaultUsers: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2 hours ago',
      department: 'IT',
      createdAt: '2024-01-01T00:00:00Z',
      tenantId: 'tenant-1',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'realtor',
      status: 'active',
      lastLogin: '1 day ago',
      department: 'Sales',
      createdAt: '2024-01-02T00:00:00Z',
      tenantId: 'tenant-1',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@company.com',
      role: 'realtor',
      status: 'inactive',
      lastLogin: '1 week ago',
      department: 'Sales',
      createdAt: '2024-01-03T00:00:00Z',
      tenantId: 'tenant-2',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'client',
      status: 'active',
      lastLogin: '3 hours ago',
      createdAt: '2024-01-04T00:00:00Z',
      tenantId: 'tenant-2',
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david@company.com',
      role: 'client',
      status: 'pending',
      lastLogin: '2 weeks ago',
      department: 'Support',
      createdAt: '2024-01-05T00:00:00Z',
      tenantId: 'tenant-3',
    },
  ];

  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'realtor': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'client': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.department) return;
    setUsers([
      ...users,
      {
        id: (users.length + 1).toString(),
        ...newUser,
        status: 'active',
        lastLogin: 'just now',
        createdAt: new Date().toISOString(),
        tenantId: `tenant-${users.length + 1}`,
      }
    ]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'admin', department: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-black">User Management</h1>
          <p className="text-gray-600 text-base mt-1">Manage and control all users</p>
        </div>
        <button
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md font-semibold transition-colors hover:bg-blue-700"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} className="mr-2" />
          Add User
        </button>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={newUser.department}
                  onChange={e => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  required
                />
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'realtor' | 'client' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                >
                  <option value="admin">Admin</option>
                  <option value="realtor">Realtor</option>
                  <option value="client">Client</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
                  <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setShowAddModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-black placeholder-gray-500 transition"
          />
        </div>
        <div className="relative w-full sm:w-56">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-black appearance-none transition"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="realtor">Realtor</option>
            <option value="client">Client</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden rounded-lg bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100 rounded-t-lg">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-black">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      <Shield size={12} className="mr-1" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.department || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={16} />
                      </button>
      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-2 flex flex-col items-center border border-gray-100">
            <h3 className="text-2xl font-bold text-black mb-2 text-center w-full">Delete User</h3>
                        <p className="text-gray-700 text-center mb-6">Are you sure you want to delete this user?</p>
            <div className="flex gap-4 justify-center w-full">
              <button onClick={confirmDeleteUser} className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700">Delete</button>
              <button onClick={cancelDeleteUser} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-2 sm:mx-0 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2 sm:mb-4 text-center">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={editUser.department}
                  onChange={e => setEditUser({ ...editUser, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  value={editUser.role}
                  onChange={e => setEditUser({ ...editUser, role: e.target.value as 'admin' | 'realtor' | 'client' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="realtor">Realtor</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2 justify-center">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Update</button>
                <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setEditUser(null)}>Cancel</button>
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;