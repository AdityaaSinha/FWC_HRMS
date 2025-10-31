import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  Key,
  CheckCircle,
  XCircle,
  Settings,
  History,
  RotateCcw,
  Clock,
  User,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { generateSmartPravavatarUrl } from '../../utils/pravavatarUtils';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  
  // Modal states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  
  // History section states
  const [auditLogs, setAuditLogs] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historySearch, setHistorySearch] = useState('');
  const [showHistorySection, setShowHistorySection] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState(null);
  
  // Form data
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    roleType: '', // New field for predefined role types
    permissions: [],
    assignedUsers: [] // New field for user assignments
  });

  // Predefined role types
  const predefinedRoles = [
    { value: 'hr', label: 'HR', description: 'Human resources management and employee oversight' },
    { value: 'admin', label: 'Admin', description: 'Full system access and management capabilities' },
    { value: 'manager', label: 'Manager', description: 'Team leadership and departmental oversight' },
    { value: 'employee', label: 'Employee', description: 'Standard employee access and basic functionality' }
  ];

  const [permissionFormData, setPermissionFormData] = useState({
    name: '',
    description: ''
  });

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Fetch roles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/roles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch roles');
      
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/roles/permissions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch permissions');
      
      const data = await response.json();
      setPermissions(data);
    } catch (err) {
      console.error('Error fetching permissions:', err);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users?limit=100', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.users || data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    // Get current user role from localStorage
    const userRole = localStorage.getItem('role');
    setCurrentUserRole(userRole);
    
    fetchRoles();
    fetchPermissions();
    fetchUsers();
  }, []);

  // Handle role form submission
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = modalMode === 'create' 
        ? 'http://localhost:3001/api/roles'
        : `http://localhost:3001/api/roles/${selectedRole.id}`;
      
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      // Prepare the data with correct field names for the backend
      const requestData = {
        name: roleFormData.name,
        description: roleFormData.description,
        permissionIds: roleFormData.permissions,
        userIds: roleFormData.assignedUsers
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save role');
      }

      setShowRoleModal(false);
      resetRoleForm();
      fetchRoles();
      
      alert(`Role ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle permission form submission
  const handlePermissionSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/roles/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(permissionFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create permission');
      }

      setShowPermissionModal(false);
      resetPermissionForm();
      fetchPermissions();
      
      alert('Permission created successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle delete role
  const handleDeleteRole = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/roles/${selectedRole.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete role');
      }

      setShowDeleteModal(false);
      setSelectedRole(null);
      fetchRoles();
      
      alert('Role deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Reset forms
  const resetRoleForm = () => {
    setRoleFormData({
      name: '',
      description: '',
      roleType: '',
      permissions: [],
      assignedUsers: []
    });
    setSelectedRole(null);
  };

  const resetPermissionForm = () => {
    setPermissionFormData({
      name: '',
      description: ''
    });
  };

  // Open modals
  const openCreateRoleModal = () => {
    resetRoleForm();
    setModalMode('create');
    setShowRoleModal(true);
  };

  const openEditRoleModal = (role) => {
    setSelectedRole(role);
    setRoleFormData({
      name: role.name || '',
      description: role.description || '',
      roleType: role.roleType || '',
      permissions: role.permissions?.map(p => p.id) || [],
      assignedUsers: role.users?.map(u => u.id) || []
    });
    setModalMode('edit');
    setShowRoleModal(true);
  };

  const openViewRoleModal = (role) => {
    setSelectedRole(role);
    setModalMode('view');
    setShowRoleModal(true);
  };

  const openDeleteModal = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const openPermissionModal = () => {
    resetPermissionForm();
    setShowPermissionModal(true);
  };

  // Handle permission selection
  const handlePermissionToggle = (permissionId) => {
    setRoleFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  // Handle user selection
  const handleUserToggle = (userId) => {
    setRoleFormData(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter(id => id !== userId)
        : [...prev.assignedUsers, userId]
    }));
  };

  // Handle role type selection
  const handleRoleTypeChange = (roleType) => {
    const selectedRole = predefinedRoles.find(role => role.value === roleType);
    if (selectedRole) {
      setRoleFormData(prev => ({
        ...prev,
        roleType: roleType,
        name: selectedRole.label,
        description: selectedRole.description
      }));
    } else {
      setRoleFormData(prev => ({
        ...prev,
        roleType: roleType
      }));
    }
  };

  // Fetch audit logs for role management
  const fetchAuditLogs = async (page = 1, search = '') => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/roles/audit-logs?page=${page}&limit=10&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAuditLogs(data.data);
        setHistoryTotal(data.pagination.total);
      } else {
        throw new Error('Failed to fetch audit logs');
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setError('Failed to fetch audit logs');
    } finally {
      setHistoryLoading(false);
    }
  };

  // Handle revert action
  const handleRevertAction = async (auditLogId) => {
    if (!window.confirm('Are you sure you want to revert this action? This cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/roles/revert/${auditLogId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        
        // Refresh data
        await Promise.all([
          fetchRoles(),
          fetchAuditLogs(historyPage, historySearch)
        ]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to revert action');
      }
    } catch (error) {
      console.error('Error reverting action:', error);
      setError(error.message);
    }
  };

  // Toggle history section
  const toggleHistorySection = () => {
    setShowHistorySection(!showHistorySection);
    if (!showHistorySection && auditLogs.length === 0) {
      fetchAuditLogs();
    }
  };

  // Handle history search
  const handleHistorySearch = (searchTerm) => {
    setHistorySearch(searchTerm);
    setHistoryPage(1);
    fetchAuditLogs(1, searchTerm);
  };

  // Handle history pagination
  const handleHistoryPageChange = (newPage) => {
    setHistoryPage(newPage);
    fetchAuditLogs(newPage, historySearch);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'INFO': return 'text-blue-400';
      case 'WARNING': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Get action icon
  const getActionIcon = (action) => {
    switch (action) {
      case 'CREATE_ROLE': return <Plus className="h-4 w-4" />;
      case 'UPDATE_ROLE': return <Edit className="h-4 w-4" />;
      case 'DELETE_ROLE': return <Trash2 className="h-4 w-4" />;
      case 'REVERT_CREATE_ROLE':
      case 'REVERT_UPDATE_ROLE':
      case 'REVERT_DELETE_ROLE': return <RotateCcw className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  // Filter roles based on search and role filter
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRoleFilter = roleFilter === 'all' || 
                             role.name?.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRoleFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Role Management</h1>
          <p className="text-gray-400">Manage system roles and permissions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={toggleHistorySection}
            className={`${
              showHistorySection 
                ? 'bg-yellow-600 hover:bg-yellow-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg`}
          >
            <History className="h-4 w-4" />
            {showHistorySection ? 'Hide History' : 'Show History'}
          </button>
          <button
            onClick={openPermissionModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Key className="h-4 w-4" />
            Add Permission
          </button>
          <button
            onClick={openCreateRoleModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Role
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Roles</p>
              <p className="text-2xl font-bold text-white">{Math.max(4, roles.length)}</p>
            </div>
            <Shield className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Permissions</p>
              <p className="text-2xl font-bold text-green-400">{permissions.length}</p>
            </div>
            <Key className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Roles</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.max(4, roles.length)}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Most Used Role</p>
              <p className="text-lg font-bold text-orange-400">
                {roles.reduce((max, role) => 
                  role.userCount > (max?.userCount || 0) ? role : max, null
                )?.name || 'N/A'}
              </p>
            </div>
            <Settings className="h-8 w-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="HR">HR</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Section */}
      {showHistorySection && (
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <History className="h-5 w-5 text-yellow-400" />
              Role Management History
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={historySearch}
                  onChange={(e) => handleHistorySearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 w-64"
                />
              </div>
            </div>
          </div>

          {historyLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No history records found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getSeverityColor(log.severity)} bg-opacity-20`}>
                        {getActionIcon(log.action)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{log.action.replace(/_/g, ' ')}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(log.severity)} bg-opacity-20`}>
                            {log.severity}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.user?.name || 'Unknown User'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{log.description}</p>
                        
                        {/* Expandable Details */}
                        <button
                          onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                        >
                          {expandedLogId === log.id ? (
                            <>
                              <ChevronUp className="h-3 w-3" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3" />
                              Show Details
                            </>
                          )}
                        </button>
                        
                        {expandedLogId === log.id && log.details && (
                          <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                            <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(JSON.parse(log.details), null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Revert Button */}
                    {(log.action === 'CREATE_ROLE' || log.action === 'UPDATE_ROLE' || log.action === 'DELETE_ROLE') && (
                      <button
                        onClick={() => handleRevertAction(log.id)}
                        className="ml-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                        title="Revert this action"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Revert
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {historyTotal > 10 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                  <div className="text-sm text-gray-400">
                    Showing {((historyPage - 1) * 10) + 1} to {Math.min(historyPage * 10, historyTotal)} of {historyTotal} records
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleHistoryPageChange(historyPage - 1)}
                      disabled={historyPage === 1}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-400">
                      Page {historyPage} of {Math.ceil(historyTotal / 10)}
                    </span>
                    <button
                      onClick={() => handleHistoryPageChange(historyPage + 1)}
                      disabled={historyPage >= Math.ceil(historyTotal / 10)}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-600 transition-all duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-900 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{role.name}</h3>
                    <p className="text-sm text-gray-400">{role.userCount || 0} users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openViewRoleModal(role)}
                    className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    title="View Role"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openEditRoleModal(role)}
                    className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Edit Role"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(role)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Delete Role"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">
                {role.description || 'No description available'}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Permissions:</span>
                  <span className="font-medium text-white">{role.permissions?.length || 0}</span>
                </div>
                
                {role.permissions && role.permissions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-900 text-indigo-300 border border-indigo-700"
                      >
                        {permission.name}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 border border-gray-600">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions List */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Available Permissions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <div>
                  <h4 className="text-sm font-medium text-white">{permission.name}</h4>
                  <p className="text-xs text-gray-400">{permission.description}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {permission.roleCount || 0} roles
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-600 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-200">
                  {modalMode === 'create' ? 'Create New Role' : 
                   modalMode === 'edit' ? 'Edit Role' : 'Role Details'}
                </h3>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              {modalMode === 'view' ? (
                // View Mode
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Role Name</label>
                    <p className="text-sm text-gray-200">{selectedRole?.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <p className="text-sm text-gray-200">{selectedRole?.description || 'No description'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Users Assigned</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedRole?.users && selectedRole.users.length > 0 ? (
                        selectedRole.users.map((user) => (
                          <div key={user.id} className="flex items-center space-x-2 p-2 bg-gray-700 rounded">
                            <img
                              src={generateSmartPravavatarUrl(user, 32)}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-200">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email} • {user.employeeId}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">No users assigned to this role</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedRole?.permissions?.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2 p-2 bg-gray-700 rounded">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-200">{permission.name}</p>
                            <p className="text-xs text-gray-400">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowRoleModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => openEditRoleModal(selectedRole)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Edit Role
                    </button>
                  </div>
                </div>
              ) : (
                // Create/Edit Form
                <form onSubmit={handleRoleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Role Type *
                    </label>
                    <select
                      required
                      value={roleFormData.roleType}
                      onChange={(e) => handleRoleTypeChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                    >
                      <option value="">Select a role type</option>
                      {predefinedRoles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                      {currentUserRole === 'ADMIN' && (
                        <option value="custom">Custom Role</option>
                      )}
                    </select>
                    {currentUserRole !== 'ADMIN' && (
                      <p className="text-xs text-yellow-400 mt-1 flex items-center">
                        <Info className="w-3 h-3 mr-1" />
                        Custom Role creation is restricted to Admin users only
                      </p>
                    )}
                    {roleFormData.roleType && roleFormData.roleType !== 'custom' && (
                      <p className="text-xs text-gray-400 mt-1">
                        {predefinedRoles.find(r => r.value === roleFormData.roleType)?.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={roleFormData.name}
                      onChange={(e) => setRoleFormData({...roleFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                      readOnly={roleFormData.roleType && roleFormData.roleType !== 'custom'}
                    />
                    {roleFormData.roleType && roleFormData.roleType !== 'custom' && (
                      <p className="text-xs text-gray-400 mt-1">
                        Name is auto-filled for predefined roles
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={roleFormData.description}
                      onChange={(e) => setRoleFormData({...roleFormData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                      readOnly={roleFormData.roleType && roleFormData.roleType !== 'custom'}
                    />
                    {roleFormData.roleType && roleFormData.roleType !== 'custom' && (
                      <p className="text-xs text-gray-400 mt-1">
                        Description is auto-filled for predefined roles
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-600 rounded-md p-3 bg-gray-700">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={roleFormData.permissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-200">{permission.name}</p>
                            <p className="text-xs text-gray-400">{permission.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Assign Users
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-600 rounded-md p-3 bg-gray-700">
                      {users.map((user) => (
                        <label key={user.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={roleFormData.assignedUsers.includes(user.id)}
                            onChange={() => handleUserToggle(user.id)}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                          />
                          <div className="flex items-center space-x-2">
                            <img
                              src={generateSmartPravavatarUrl(user, 32)}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-200">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email} • {user.employeeId}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                      {users.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No users available</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRoleModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      {modalMode === 'create' ? 'Create Role' : 'Update Role'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-600 w-96 shadow-lg rounded-md bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-200">Create New Permission</h3>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handlePermissionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Permission Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={permissionFormData.name}
                    onChange={(e) => setPermissionFormData({...permissionFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={permissionFormData.description}
                    onChange={(e) => setPermissionFormData({...permissionFormData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-200"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPermissionModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                  >
                    Create Permission
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-600 w-96 shadow-lg rounded-md bg-gray-800">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-200 mt-4">Delete Role</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete the role <strong className="text-gray-100">{selectedRole?.name}</strong>? 
                  This action cannot be undone.
                </p>
                {selectedRole?.userCount > 0 && (
                  <p className="text-sm text-red-400 mt-2">
                    Warning: This role is assigned to {selectedRole.userCount} user(s).
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRole}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Delete Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default RoleManagement;