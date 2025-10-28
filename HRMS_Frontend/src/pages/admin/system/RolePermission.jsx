import React, { useState } from 'react';
import { 
  Users, Shield, Plus, Edit, Trash2, Search, Filter, 
  Settings, Eye, EyeOff, Check, X, Save, AlertCircle,
  UserCheck, Lock, Unlock, Crown, Star, Award
} from 'lucide-react';

const RolePermission = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // Mock data for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      color: 'red',
      permissions: ['all'],
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'HR Manager',
      description: 'Human resources management and employee operations',
      userCount: 5,
      color: 'blue',
      permissions: ['user_management', 'reports', 'policies'],
      createdAt: '2024-01-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Department Manager',
      description: 'Team and project management within department',
      userCount: 12,
      color: 'green',
      permissions: ['team_management', 'projects', 'reports'],
      createdAt: '2024-02-01',
      status: 'active'
    },
    {
      id: 4,
      name: 'Employee',
      description: 'Standard employee access to personal features',
      userCount: 156,
      color: 'gray',
      permissions: ['profile', 'tasks', 'calendar'],
      createdAt: '2024-01-10',
      status: 'active'
    }
  ]);

  // Mock permissions data
  const permissions = [
    { id: 'user_management', name: 'User Management', category: 'Users', description: 'Create, edit, delete users' },
    { id: 'role_management', name: 'Role Management', category: 'System', description: 'Manage roles and permissions' },
    { id: 'reports', name: 'Reports & Analytics', category: 'Analytics', description: 'View and generate reports' },
    { id: 'policies', name: 'Policy Management', category: 'Compliance', description: 'Manage company policies' },
    { id: 'team_management', name: 'Team Management', category: 'Teams', description: 'Manage team members and assignments' },
    { id: 'projects', name: 'Project Management', category: 'Projects', description: 'Create and manage projects' },
    { id: 'profile', name: 'Profile Access', category: 'Personal', description: 'Access personal profile' },
    { id: 'tasks', name: 'Task Management', category: 'Personal', description: 'Manage personal tasks' },
    { id: 'calendar', name: 'Calendar Access', category: 'Personal', description: 'Access calendar features' },
    { id: 'settings', name: 'System Settings', category: 'System', description: 'Configure system settings' },
    { id: 'audit_logs', name: 'Audit Logs', category: 'Security', description: 'View system audit logs' },
    { id: 'backup', name: 'Data Backup', category: 'System', description: 'Manage data backups' }
  ];

  const getRoleIcon = (roleName) => {
    switch (roleName.toLowerCase()) {
      case 'super admin': return <Crown size={18} className="text-red-400" />;
      case 'hr manager': return <UserCheck size={18} className="text-blue-400" />;
      case 'department manager': return <Star size={18} className="text-green-400" />;
      default: return <Users size={18} className="text-gray-400" />;
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Role & Permission Management</h1>
          <p className="text-gray-400 text-sm">Manage user roles and system permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1E2132] p-1 rounded-lg border border-gray-800">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'roles'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#2A2D3D]'
          }`}
        >
          Roles ({roles.length})
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'permissions'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#2A2D3D]'
          }`}
        >
          Permissions ({permissions.length})
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles or permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1E2132] border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button className="bg-[#1E2132] border border-gray-800 px-4 py-2 rounded-lg hover:bg-[#2A2D3D] transition flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Roles Tab Content */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <Shield size={20} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Roles</p>
                  <p className="text-xl font-semibold">{roles.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Users size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xl font-semibold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Lock size={20} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Permissions</p>
                  <p className="text-xl font-semibold">{permissions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Crown size={20} className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Admin Roles</p>
                  <p className="text-xl font-semibold">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 hover:bg-[#25293D] transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getRoleIcon(role.name)}
                    <div>
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <p className="text-sm text-gray-400">{role.userCount} users</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setShowPermissionModal(true);
                      }}
                      className="p-2 hover:bg-[#2A2D3D] rounded-lg transition"
                    >
                      <Settings size={16} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-[#2A2D3D] rounded-lg transition">
                      <Edit size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{role.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${role.color}-400`}></span>
                    <span className="text-xs text-gray-400">Active</span>
                  </div>
                  <span className="text-xs text-gray-400">Created {role.createdAt}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Permissions</span>
                    <span className="text-sm font-medium">{role.permissions.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Permissions Tab Content */}
      {activeTab === 'permissions' && (
        <div className="space-y-4">
          {/* Permissions Table */}
          <div className="bg-[#1E2132] rounded-lg border border-gray-800 overflow-hidden">
            <div className="bg-[#272B3F] p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">System Permissions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#272B3F]">
                  <tr>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Permission</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Category</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Description</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Roles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2D3D]">
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-[#2A2D3D]/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Lock size={16} className="text-indigo-400" />
                          <span className="font-medium">{permission.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs">
                          {permission.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-300">{permission.description}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {roles.filter(role => role.permissions.includes(permission.id) || role.permissions.includes('all')).map(role => (
                            <span key={role.id} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                              {role.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Role</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#2A2D3D] rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-[#272B3F] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter role name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-[#272B3F] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  rows="3"
                  placeholder="Enter role description"
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Management Modal */}
      {showPermissionModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manage Permissions - {selectedRole.name}</h3>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="p-2 hover:bg-[#2A2D3D] rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(permissions.reduce((acc, perm) => {
                if (!acc[perm.category]) acc[perm.category] = [];
                acc[perm.category].push(perm);
                return acc;
              }, {})).map(([category, perms]) => (
                <div key={category} className="bg-[#272B3F] p-4 rounded-lg">
                  <h4 className="font-medium mb-3">{category}</h4>
                  <div className="space-y-2">
                    {perms.map((perm) => (
                      <div key={perm.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{perm.name}</p>
                          <p className="text-xs text-gray-400">{perm.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedRole.permissions.includes(perm.id) || selectedRole.permissions.includes('all')}
                          className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermission;
