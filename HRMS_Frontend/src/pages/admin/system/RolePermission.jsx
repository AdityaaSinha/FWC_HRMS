import React, { useState, useEffect } from 'react';
import {
  Users, Shield, Plus, Edit, Trash2, Search, Filter,
  Settings, Eye, EyeOff, Check, X, Save, AlertCircle,
  UserCheck, Lock, Unlock, Crown, Star, Award, RefreshCw
} from 'lucide-react';

// --- Helper: Role Icon ---
const getRoleIcon = (roleName) => {
  switch (roleName?.toLowerCase()) {
    case 'super admin': return <Crown size={18} className="text-red-400" />;
    case 'hr manager': return <UserCheck size={18} className="text-blue-400" />;
    case 'department manager': return <Star size={18} className="text-green-400" />;
    default: return <Users size={18} className="text-gray-400" />;
  }
};

// --- Helper: API Fetch ---
const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`http://localhost:3001${url}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }
  return data;
};

// --- Component: Create Role Modal ---
const CreateRoleModal = ({ setShow, onRoleCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('gray');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newRole = await apiFetch('/api/admin/roles', {
        method: 'POST',
        body: JSON.stringify({ name, description, color }),
      });
      onRoleCreated(newRole); // Pass new role up to parent
      setShow(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Role</h3>
          <button onClick={() => setShow(false)} className="p-2 hover:bg-[#2A2D3D] rounded-lg transition"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Role Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#272B3F] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter role name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#272B3F] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              rows="3"
              placeholder="Enter role description"
            ></textarea>
          </div>
          {/* You can add a color picker here later */}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShow(false)} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">Cancel</button>
            <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition disabled:opacity-50">
              {isLoading ? <RefreshCw className="w-5 h-5 mx-auto animate-spin" /> : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Component: Manage Permissions Modal ---
const PermissionModal = ({ role, allPermissions, setShow, onPermissionsSaved }) => {
  const [selectedPermissions, setSelectedPermissions] = useState(new Set(role.permissions));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = (permId) => {
    setSelectedPermissions(prev => {
      const next = new Set(prev);
      if (next.has(permId)) {
        next.delete(permId);
      } else {
        next.add(permId);
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedRole = await apiFetch(`/api/admin/roles/${role.id}/permissions`, {
        method: 'PUT',
        body: JSON.stringify({ permissionIds: Array.from(selectedPermissions) }),
      });
      onPermissionsSaved(updatedRole); // Pass updated role to parent
      setShow(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Group permissions by category
  const groupedPermissions = allPermissions.reduce((acc, perm) => {
    (acc[perm.category] = acc[perm.category] || []).push(perm);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold">Manage Permissions - {role.name}</h3>
          <button onClick={() => setShow(false)} className="p-2 hover:bg-[#2A2D3D] rounded-lg transition"><X size={18} /></button>
        </div>
        
        <div className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
          {Object.entries(groupedPermissions).map(([category, perms]) => (
            <div key={category} className="bg-[#272B3F] p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-indigo-400">{category}</h4>
              <div className="space-y-3">
                {perms.map((perm) => (
                  <label key={perm.id} className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{perm.name}</p>
                      <p className="text-xs text-gray-400">{perm.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedPermissions.has(perm.id)}
                      onChange={() => handleToggle(perm.id)}
                      disabled={role.name === 'Super Admin'} // Don't allow editing Super Admin
                      className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 disabled:opacity-50"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4 mt-4 border-t border-gray-700 flex-shrink-0">
          {error && <p className="text-red-400 text-sm flex-1">{error}</p>}
          <button type="button" onClick={() => setShow(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading || role.name === 'Super Admin'} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition disabled:opacity-50">
            {isLoading ? <RefreshCw className="w-5 h-5 mx-auto animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component: Main Page ---
const RolePermission = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // For permission modal
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // --- Dynamic Data State ---
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data on Mount ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [rolesData, permsData] = await Promise.all([
          apiFetch('/api/admin/roles'),
          apiFetch('/api/admin/permissions'),
        ]);
        setRoles(rolesData);
        setPermissions(permsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---
  const handleRoleCreated = (newRole) => {
    // Add the new role to the state list
    setRoles(prev => [
      ...prev,
      { // Format it to match the others
        ...newRole,
        userCount: 0,
        permissions: [],
        createdAt: new Date(newRole.createdAt).toLocaleDateString(),
      }
    ].sort((a, b) => a.name.localeCompare(b.name))); // Keep list sorted
  };

  const handlePermissionsSaved = (updatedRole) => {
    // Find and update the role in the state list
    setRoles(prev => prev.map(r => (r.id === updatedRole.id ? updatedRole : r)));
  };

  // --- Filtering Logic ---
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPermissions = permissions.filter(perm =>
    perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    perm.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    perm.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalRoles: roles.length,
    totalUsers: roles.reduce((sum, role) => sum + (role.userCount || 0), 0),
    totalPermissions: permissions.length,
    adminRoles: roles.filter(r => r.name.toLowerCase().includes('admin')).length,
  };

  // --- Main Render ---
  return (
    <div className="p-6 space-y-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Role & Permission Management</h1>
          <p className="text-gray-400 text-sm">Manage user roles and system permissions</p>
        </div>
        {activeTab === 'roles' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={18} />
            Create Role
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1E2132] p-1 rounded-lg border border-gray-800 w-fit">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'roles' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#2A2D3D]'
          }`}
        >
          Roles ({stats.totalRoles})
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'permissions' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#2A2D3D]'
          }`}
        >
          Permissions ({stats.totalPermissions})
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
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

      {/* Loading & Error States */}
      {isLoading && <p className="text-center text-gray-400">Loading data...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      {/* Roles Tab Content */}
      {!isLoading && !error && activeTab === 'roles' && (
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 rounded-lg"><Shield size={20} className="text-indigo-400" /></div>
                <div><p className="text-sm text-gray-400">Total Roles</p><p className="text-xl font-semibold">{stats.totalRoles}</p></div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600/20 rounded-lg"><Users size={20} className="text-green-400" /></div>
                <div><p className="text-sm text-gray-400">Total Users</p><p className="text-xl font-semibold">{stats.totalUsers}</p></div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg"><Lock size={20} className="text-yellow-400" /></div>
                <div><p className="text-sm text-gray-400">Permissions</p><p className="text-xl font-semibold">{stats.totalPermissions}</p></div>
              </div>
            </div>
            <div className="bg-[#1E2132] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600/20 rounded-lg"><Crown size={20} className="text-red-400" /></div>
                <div><p className="text-sm text-gray-400">Admin Roles</p><p className="text-xl font-semibold">{stats.adminRoles}</p></div>
              </div>
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 hover:bg-[#25293D] transition flex flex-col justify-between">
                <div>
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
                        title="Manage Permissions"
                      >
                        <Settings size={16} className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-[#2A2D3D] rounded-lg transition" title="Edit Role (Not Implemented)">
                        <Edit size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 min-h-[40px]">{role.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${role.color}-400`}></span>
                      <span className="text-xs text-gray-400 capitalize">{role.status}</span>
                    </div>
                    <span className="text-xs text-gray-400">Created {role.createdAt}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Permissions</span>
                      <span className="text-sm font-medium">{role.permissions.includes('all') ? 'All' : role.permissions.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Permissions Tab Content */}
      {!isLoading && !error && activeTab === 'permissions' && (
        <div className="space-y-4">
          <div className="bg-[#1E2132] rounded-lg border border-gray-800 overflow-hidden">
            <div className="bg-[#272B3F] p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">System Permissions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#272B3F]">
                  <tr>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Permission</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Category</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Description</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase text-gray-400">Roles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2D3D]">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-[#2A2D3D]/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Lock size={16} className="text-indigo-400" />
                          <span className="font-medium text-white">{permission.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs">
                          {permission.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-300">{permission.description}</td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {roles.filter(role => role.permissions.includes(permission.id) || role.permissions.includes('all')).map(role => (
                            <span key={role.id} className={`px-2 py-1 bg-${role.color}-700 text-${role.color}-200 rounded text-xs`}>
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

      {/* Modals */}
      {showCreateModal && (
        <CreateRoleModal
          setShow={setShowCreateModal}
          onRoleCreated={handleRoleCreated}
        />
      )}

      {showPermissionModal && selectedRole && (
        <PermissionModal
          role={selectedRole}
          allPermissions={permissions}
          setShow={setShowPermissionModal}
          onPermissionsSaved={handlePermissionsSaved}
        />
      )}
    </div>
  );
};

export default RolePermission;
