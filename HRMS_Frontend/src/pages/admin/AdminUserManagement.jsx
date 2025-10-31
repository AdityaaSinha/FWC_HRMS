import React, { useState } from 'react';
import { MOCK_USERS } from '../../mocks/MOCK_USERS';
import { exportUsersToCSV } from '../../utils/csvExportUtils';
import { getDepartmentNames } from '../../utils/departmentData';
import {
  Users,
  Building,
  ShieldAlert,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  UserPlus,
  UserMinus,
  Settings,
  Mail,
  Phone,
  Calendar,
  MapPin,
  X,
  Check,
  AlertTriangle,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

const AdminUserManagement = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock data for dropdowns
  const departments = getDepartmentNames();
  const roles = ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'];
  const statuses = ['Active', 'Inactive', 'Pending'];

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const RoleBadge = ({ role }) => {
    const roleColors = {
      ADMIN: 'bg-red-900 text-red-300 border-red-700',
      HR: 'bg-blue-900 text-blue-300 border-blue-700',
      MANAGER: 'bg-purple-900 text-purple-300 border-purple-700',
      EMPLOYEE: 'bg-gray-900 text-gray-300 border-gray-700'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${roleColors[role] || roleColors.EMPLOYEE}`}>
        {role}
      </span>
    );
  };

  const StatusBadge = ({ status = 'Active' }) => {
    const statusColors = {
      Active: 'bg-green-900 text-green-300 border-green-700',
      Inactive: 'bg-red-900 text-red-300 border-red-700',
      Pending: 'bg-yellow-900 text-yellow-300 border-yellow-700'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color = 'indigo' }) => {
    const colorClasses = {
      indigo: 'text-indigo-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      red: 'text-red-400',
      blue: 'text-blue-400'
    };

    return (
      <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-gray-700 ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  const CreateUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#272B3F] rounded-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Create New User</h3>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
              <select className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500">
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
              <select className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500">
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map(user => user.id));
    }
  };

  const handleExportUsers = () => {
    const dataToExport = selectedUsers.length > 0 
      ? users.filter(user => selectedUsers.includes(user.id))
      : sortedUsers;
    
    exportUsersToCSV(dataToExport, {
      filename: `users_export_${new Date().toISOString().split('T')[0]}.csv`,
      columns: ['id', 'name', 'email', 'role', 'department']
    });
  };

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage users, roles, and permissions across the organization</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button 
            onClick={handleExportUsers}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users className="w-6 h-6" />}
          color="indigo"
        />
        <StatCard
          title="Active Users"
          value={users.filter(u => u.status !== 'Inactive').length}
          icon={<UserPlus className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Departments"
          value={new Set(users.map(u => u.department)).size}
          icon={<Building className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Pending Reviews"
          value="3"
          icon={<ShieldAlert className="w-6 h-6" />}
          color="yellow"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1E2132] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-medium transition-colors">
                Activate
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm font-medium transition-colors">
                Deactivate
              </button>
              <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#272B3F] rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1E2132]">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 bg-[#272B3F] text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}>
                  Name
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Email</th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Role</th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Department</th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Status</th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Last Active</th>
                <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-[#1E2132] transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-600 bg-[#272B3F] text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">{user.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="p-4 text-sm text-gray-300">{user.department}</td>
                  <td className="p-4">
                    <StatusBadge status="Active" />
                  </td>
                  <td className="p-4 text-sm text-gray-400">2 hours ago</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300 p-1"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-[#1E2132] px-6 py-3 flex items-center justify-between border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Showing {sortedUsers.length} of {users.length} users
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateUserModal />}
      
      {/* Quick Actions Panel */}
      <div className="fixed bottom-6 right-6 bg-[#272B3F] rounded-lg p-4 border border-gray-700 shadow-lg">
        <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#1E2132] rounded transition-colors">
            Bulk Import Users
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#1E2132] rounded transition-colors">
            Generate Report
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#1E2132] rounded transition-colors">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
