import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Settings, Shield, Key, Smartphone, QrCode, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical, Download, Upload, RefreshCw, Users, Activity, Clock, Lock } from 'lucide-react';

const TwoFAManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock 2FA users data
  const mockUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'enabled',
      method: 'app',
      setupDate: '2024-01-10T08:30:00Z',
      lastUsed: '2024-01-15T09:15:00Z',
      backupCodes: 8,
      devices: [
        { id: 1, name: 'iPhone 14', type: 'mobile', lastUsed: '2024-01-15T09:15:00Z' },
        { id: 2, name: 'iPad Pro', type: 'tablet', lastUsed: '2024-01-12T14:20:00Z' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      status: 'enabled',
      method: 'sms',
      setupDate: '2024-01-08T10:45:00Z',
      lastUsed: '2024-01-15T08:30:00Z',
      backupCodes: 10,
      devices: [
        { id: 3, name: 'Samsung Galaxy S23', type: 'mobile', lastUsed: '2024-01-15T08:30:00Z' }
      ]
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'pending',
      method: null,
      setupDate: null,
      lastUsed: null,
      backupCodes: 0,
      devices: []
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'HR',
      role: 'HR Specialist',
      status: 'disabled',
      method: 'app',
      setupDate: '2024-01-05T16:20:00Z',
      lastUsed: '2024-01-10T11:45:00Z',
      backupCodes: 5,
      devices: [
        { id: 4, name: 'Google Pixel 7', type: 'mobile', lastUsed: '2024-01-10T11:45:00Z' }
      ]
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@company.com',
      department: 'Engineering',
      role: 'DevOps Engineer',
      status: 'enabled',
      method: 'hardware',
      setupDate: '2024-01-12T13:10:00Z',
      lastUsed: '2024-01-15T07:20:00Z',
      backupCodes: 10,
      devices: [
        { id: 5, name: 'YubiKey 5', type: 'hardware', lastUsed: '2024-01-15T07:20:00Z' },
        { id: 6, name: 'iPhone 13', type: 'mobile', lastUsed: '2024-01-14T16:30:00Z' }
      ]
    }
  ];

  // Mock statistics
  const mockStats = {
    totalUsers: 245,
    enabledUsers: 189,
    pendingUsers: 34,
    disabledUsers: 22,
    appUsers: 145,
    smsUsers: 32,
    hardwareUsers: 12,
    successRate: 98.5,
    avgSetupTime: 3.2,
    lastWeekLogins: 1250
  };

  // Mock recent activity
  const mockActivity = [
    {
      id: 1,
      type: 'setup',
      user: 'Alice Cooper',
      email: 'alice.cooper@company.com',
      method: 'app',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'success',
      ip: '192.168.1.105'
    },
    {
      id: 2,
      type: 'login',
      user: 'John Smith',
      email: 'john.smith@company.com',
      method: 'app',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'success',
      ip: '192.168.1.100'
    },
    {
      id: 3,
      type: 'backup_used',
      user: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      method: 'backup_code',
      timestamp: '2024-01-15T08:45:00Z',
      status: 'success',
      ip: '192.168.1.102'
    },
    {
      id: 4,
      type: 'failed_attempt',
      user: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      method: 'sms',
      timestamp: '2024-01-15T08:20:00Z',
      status: 'failed',
      ip: '192.168.1.103',
      reason: 'Invalid code'
    },
    {
      id: 5,
      type: 'disable',
      user: 'Emily Davis',
      email: 'emily.davis@company.com',
      method: 'app',
      timestamp: '2024-01-14T15:30:00Z',
      status: 'success',
      ip: '192.168.1.104'
    }
  ];

  // Mock 2FA methods
  const mockMethods = [
    {
      id: 'app',
      name: 'Authenticator App',
      description: 'Use Google Authenticator, Authy, or similar apps',
      icon: Smartphone,
      enabled: true,
      users: 145,
      security: 'High',
      setup: 'Easy'
    },
    {
      id: 'sms',
      name: 'SMS Text Message',
      description: 'Receive codes via SMS to your phone',
      icon: Key,
      enabled: true,
      users: 32,
      security: 'Medium',
      setup: 'Very Easy'
    },
    {
      id: 'hardware',
      name: 'Hardware Token',
      description: 'Use YubiKey or similar hardware tokens',
      icon: Shield,
      enabled: true,
      users: 12,
      security: 'Very High',
      setup: 'Advanced'
    },
    {
      id: 'email',
      name: 'Email Verification',
      description: 'Receive codes via email',
      icon: AlertCircle,
      enabled: false,
      users: 0,
      security: 'Low',
      setup: 'Very Easy'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend, suffix = '' }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}{suffix}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      enabled: { color: 'green', label: 'Enabled' },
      disabled: { color: 'red', label: 'Disabled' },
      pending: { color: 'yellow', label: 'Pending Setup' },
      suspended: { color: 'orange', label: 'Suspended' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20`}>
        {config.label}
      </span>
    );
  };

  const MethodBadge = ({ method }) => {
    const methodConfig = {
      app: { color: 'blue', label: 'App', icon: Smartphone },
      sms: { color: 'green', label: 'SMS', icon: Key },
      hardware: { color: 'purple', label: 'Hardware', icon: Shield },
      email: { color: 'orange', label: 'Email', icon: AlertCircle }
    };
    
    const config = methodConfig[method] || methodConfig.app;
    const IconComponent = config.icon;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20 flex items-center space-x-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const SecurityBadge = ({ level }) => {
    const securityConfig = {
      'Very High': { color: 'emerald', label: 'Very High' },
      'High': { color: 'green', label: 'High' },
      'Medium': { color: 'yellow', label: 'Medium' },
      'Low': { color: 'red', label: 'Low' }
    };
    
    const config = securityConfig[level] || securityConfig.Medium;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20`}>
        {config.label}
      </span>
    );
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Two-Factor Authentication</h1>
            <p className="text-gray-400 mt-2">Manage 2FA settings and user authentication methods</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Sync Status</span>
            </button>
            <button 
              onClick={() => setShowSetupModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Bulk Setup</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="2FA Enabled"
            value={mockStats.enabledUsers}
            icon={CheckCircle}
            color="green"
            trend={15}
          />
          <StatCard
            title="Pending Setup"
            value={mockStats.pendingUsers}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Success Rate"
            value={mockStats.successRate}
            suffix="%"
            icon={Shield}
            color="emerald"
            trend={2}
          />
        </div>

        {/* Method Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="App Users"
            value={mockStats.appUsers}
            icon={Smartphone}
            color="indigo"
          />
          <StatCard
            title="SMS Users"
            value={mockStats.smsUsers}
            icon={Key}
            color="green"
          />
          <StatCard
            title="Hardware Users"
            value={mockStats.hardwareUsers}
            icon={Lock}
            color="purple"
          />
          <StatCard
            title="Avg Setup Time"
            value={mockStats.avgSetupTime}
            suffix=" min"
            icon={Activity}
            color="orange"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'methods', label: 'Methods', icon: Settings },
            { id: 'activity', label: 'Activity', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
              {/* Search and Filters */}
              {(activeTab === 'users' || activeTab === 'activity') && (
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Status</option>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                        <option value="pending">Pending</option>
                      </select>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 flex items-center space-x-2">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status Distribution */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Status Distribution</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-white">Enabled</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-medium">{mockStats.enabledUsers}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({((mockStats.enabledUsers / mockStats.totalUsers) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-white">Pending</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-medium">{mockStats.pendingUsers}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({((mockStats.pendingUsers / mockStats.totalUsers) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <span className="text-white">Disabled</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-medium">{mockStats.disabledUsers}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({((mockStats.disabledUsers / mockStats.totalUsers) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Method Distribution */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Method Distribution</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-4 w-4 text-blue-400" />
                            <span className="text-white">Authenticator App</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.appUsers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Key className="h-4 w-4 text-green-400" />
                            <span className="text-white">SMS</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.smsUsers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Shield className="h-4 w-4 text-purple-400" />
                            <span className="text-white">Hardware Token</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.hardwareUsers}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Trends */}
                  <div className="mt-6 bg-gray-750 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{mockStats.successRate}%</div>
                        <div className="text-sm text-gray-400">Authentication Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{mockStats.avgSetupTime} min</div>
                        <div className="text-sm text-gray-400">Average Setup Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{mockStats.lastWeekLogins}</div>
                        <div className="text-sm text-gray-400">2FA Logins This Week</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Used</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Backup Codes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{user.name}</div>
                                <div className="text-sm text-gray-400">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{user.department}</div>
                            <div className="text-sm text-gray-400">{user.role}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.method ? (
                              <MethodBadge method={user.method} />
                            ) : (
                              <span className="text-gray-400 text-sm">Not set</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">
                              {user.lastUsed ? new Date(user.lastUsed).toLocaleDateString() : 'Never'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Key className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-white text-sm">{user.backupCodes}/10</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowUserModal(true);
                                }}
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-green-400 hover:text-green-300">
                                <RefreshCw className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-300">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Methods Tab */}
              {activeTab === 'methods' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={method.id} className="bg-gray-750 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-3 rounded-lg ${method.enabled ? 'bg-green-500/10' : 'bg-gray-600/10'}`}>
                                <IconComponent className={`h-6 w-6 ${method.enabled ? 'text-green-400' : 'text-gray-400'}`} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                                <p className="text-gray-400 text-sm">{method.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusBadge status={method.enabled ? 'enabled' : 'disabled'} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-white">{method.users}</div>
                              <div className="text-xs text-gray-400">Users</div>
                            </div>
                            <div className="text-center">
                              <SecurityBadge level={method.security} />
                              <div className="text-xs text-gray-400 mt-1">Security</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-white">{method.setup}</div>
                              <div className="text-xs text-gray-400">Setup</div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                              method.enabled 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}>
                              {method.enabled ? 'Disable' : 'Enable'}
                            </button>
                            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm">
                              Configure
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {mockActivity.map((activity) => (
                      <div key={activity.id} className="bg-gray-750 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              activity.status === 'success' ? 'bg-green-500/10' :
                              activity.status === 'failed' ? 'bg-red-500/10' :
                              'bg-blue-500/10'
                            }`}>
                              {activity.type === 'setup' && <Settings className={`h-4 w-4 ${
                                activity.status === 'success' ? 'text-green-400' : 'text-red-400'
                              }`} />}
                              {activity.type === 'login' && <Key className="text-green-400 h-4 w-4" />}
                              {activity.type === 'backup_used' && <Shield className="text-yellow-400 h-4 w-4" />}
                              {activity.type === 'failed_attempt' && <XCircle className="text-red-400 h-4 w-4" />}
                              {activity.type === 'disable' && <AlertCircle className="text-orange-400 h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-medium">
                                  {activity.type === 'setup' && '2FA Setup'}
                                  {activity.type === 'login' && '2FA Login'}
                                  {activity.type === 'backup_used' && 'Backup Code Used'}
                                  {activity.type === 'failed_attempt' && 'Failed Authentication'}
                                  {activity.type === 'disable' && '2FA Disabled'}
                                </h4>
                                <StatusBadge status={activity.status} />
                              </div>
                              <p className="text-gray-400 text-sm mt-1">
                                User: {activity.user} ({activity.email})
                              </p>
                              <p className="text-gray-400 text-sm">
                                Method: <MethodBadge method={activity.method} />
                                {activity.reason && ` - ${activity.reason}`}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">IP: {activity.ip}</p>
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowSetupModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Bulk Setup
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Reminders
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Reset Codes
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Security Report
                </button>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Multiple failed attempts</p>
                    <p className="text-xs text-gray-400">Mike Wilson - 5 attempts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Low backup codes</p>
                    <p className="text-xs text-gray-400">Emily Davis - 2 codes left</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">New device registered</p>
                    <p className="text-xs text-gray-400">John Smith - iPad Pro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">2FA Coverage</span>
                  <span className="text-white font-medium">77%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: '77%'}}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Target</span>
                  <span className="text-green-400 font-medium">90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Bulk 2FA Setup</h3>
              <button
                onClick={() => setShowSetupModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Users</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select user group</option>
                  <option value="all_pending">All Pending Users</option>
                  <option value="department">By Department</option>
                  <option value="role">By Role</option>
                  <option value="custom">Custom Selection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Default Method</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="app">Authenticator App</option>
                  <option value="sms">SMS</option>
                  <option value="hardware">Hardware Token</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Setup Instructions</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Custom instructions for users..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="send_email"
                  className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="send_email" className="text-sm text-gray-400">
                  Send setup instructions via email
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSetupModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Start Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">{selectedUser.name} - 2FA Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">User Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Department</label>
                    <p className="text-white">{selectedUser.department}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Role</label>
                    <p className="text-white">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className="mt-1">
                      <StatusBadge status={selectedUser.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2FA Status */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">2FA Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Method</label>
                    <div className="mt-1">
                      {selectedUser.method ? (
                        <MethodBadge method={selectedUser.method} />
                      ) : (
                        <span className="text-gray-400">Not configured</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Setup Date</label>
                    <p className="text-white">
                      {selectedUser.setupDate ? new Date(selectedUser.setupDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Last Used</label>
                    <p className="text-white">
                      {selectedUser.lastUsed ? new Date(selectedUser.lastUsed).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Backup Codes</label>
                    <p className="text-white">{selectedUser.backupCodes}/10 remaining</p>
                  </div>
                </div>
              </div>

              {/* Registered Devices */}
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Registered Devices</h4>
                {selectedUser.devices.length > 0 ? (
                  <div className="space-y-3">
                    {selectedUser.devices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-600 rounded-lg">
                            {device.type === 'mobile' && <Smartphone className="h-4 w-4 text-blue-400" />}
                            {device.type === 'tablet' && <Smartphone className="h-4 w-4 text-green-400" />}
                            {device.type === 'hardware' && <Shield className="h-4 w-4 text-purple-400" />}
                          </div>
                          <div>
                            <p className="text-white font-medium">{device.name}</p>
                            <p className="text-gray-400 text-sm">
                              Last used: {new Date(device.lastUsed).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No devices registered</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
                Reset 2FA
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Generate Backup Codes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFAManagement;
