import React, { useState } from 'react';
import { Search, Plus, Key, Activity, Shield, AlertTriangle, CheckCircle, Clock, Settings, RefreshCw, Download, Eye, EyeOff, Copy, Trash2, Edit } from 'lucide-react';

const APIManagement = () => {
  const [activeTab, setActiveTab] = useState('keys');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState({});

  // Mock data for API keys
  const mockAPIKeys = [
    {
      id: 1,
      name: 'HR Dashboard API',
      key: 'hrms_live_sk_1234567890abcdef',
      description: 'Main API key for HR dashboard operations',
      status: 'active',
      permissions: ['read', 'write', 'delete'],
      lastUsed: '2024-01-15 14:30:00',
      createdAt: '2024-01-01 09:00:00',
      expiresAt: '2024-12-31 23:59:59',
      requestCount: 15420,
      environment: 'production'
    },
    {
      id: 2,
      name: 'Mobile App API',
      key: 'hrms_live_sk_abcdef1234567890',
      description: 'API key for mobile application integration',
      status: 'active',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-15 12:15:00',
      createdAt: '2024-01-05 10:30:00',
      expiresAt: '2024-06-30 23:59:59',
      requestCount: 8750,
      environment: 'production'
    },
    {
      id: 3,
      name: 'Testing Environment',
      key: 'hrms_test_sk_fedcba0987654321',
      description: 'API key for development and testing',
      status: 'inactive',
      permissions: ['read'],
      lastUsed: '2024-01-10 16:45:00',
      createdAt: '2024-01-01 09:00:00',
      expiresAt: '2024-03-31 23:59:59',
      requestCount: 2340,
      environment: 'testing'
    },
    {
      id: 4,
      name: 'Third Party Integration',
      key: 'hrms_live_sk_9876543210fedcba',
      description: 'API key for external service integrations',
      status: 'expired',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-01 08:00:00',
      createdAt: '2023-12-01 09:00:00',
      expiresAt: '2024-01-14 23:59:59',
      requestCount: 5680,
      environment: 'production'
    }
  ];

  // Mock data for API usage analytics
  const apiUsageStats = {
    totalRequests: 32190,
    successfulRequests: 31045,
    failedRequests: 1145,
    averageResponseTime: 245,
    activeKeys: 2,
    expiredKeys: 1,
    totalKeys: 4
  };

  // Mock data for recent API activity
  const recentActivity = [
    {
      id: 1,
      endpoint: '/api/v1/employees',
      method: 'GET',
      status: 200,
      responseTime: 120,
      timestamp: '2024-01-15 14:30:15',
      apiKey: 'HR Dashboard API',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      endpoint: '/api/v1/departments',
      method: 'POST',
      status: 201,
      responseTime: 340,
      timestamp: '2024-01-15 14:28:45',
      apiKey: 'Mobile App API',
      ip: '192.168.1.105'
    },
    {
      id: 3,
      endpoint: '/api/v1/attendance',
      method: 'GET',
      status: 500,
      responseTime: 1200,
      timestamp: '2024-01-15 14:25:30',
      apiKey: 'HR Dashboard API',
      ip: '192.168.1.100'
    },
    {
      id: 4,
      endpoint: '/api/v1/payroll',
      method: 'PUT',
      status: 200,
      responseTime: 280,
      timestamp: '2024-01-15 14:20:10',
      apiKey: 'Mobile App API',
      ip: '192.168.1.105'
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
    const colors = {
      active: 'bg-green-500/10 text-green-400 border-green-500/20',
      inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      expired: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      expired: 'Expired'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const EnvironmentBadge = ({ environment }) => {
    const colors = {
      production: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      testing: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      development: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[environment]}`}>
        {environment.charAt(0).toUpperCase() + environment.slice(1)}
      </span>
    );
  };

  const MethodBadge = ({ method }) => {
    const colors = {
      GET: 'bg-green-500/10 text-green-400 border-green-500/20',
      POST: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      DELETE: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[method]}`}>
        {method}
      </span>
    );
  };

  const StatusCodeBadge = ({ status }) => {
    const getColor = (code) => {
      if (code >= 200 && code < 300) return 'bg-green-500/10 text-green-400 border-green-500/20';
      if (code >= 400 && code < 500) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      if (code >= 500) return 'bg-red-500/10 text-red-400 border-red-500/20';
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColor(status)}`}>
        {status}
      </span>
    );
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleViewKey = (key) => {
    setSelectedKey(key);
    setShowKeyModal(true);
  };

  const filteredKeys = mockAPIKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         key.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || key.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">API Management</h1>
            <p className="text-gray-400 mt-2">Manage API keys, monitor usage, and track performance</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create API Key</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Requests"
            value={apiUsageStats.totalRequests.toLocaleString()}
            icon={Activity}
            color="blue"
            trend={12}
          />
          <StatCard
            title="Success Rate"
            value={Math.round((apiUsageStats.successfulRequests / apiUsageStats.totalRequests) * 100)}
            suffix="%"
            icon={CheckCircle}
            color="green"
            trend={3}
          />
          <StatCard
            title="Avg Response Time"
            value={apiUsageStats.averageResponseTime}
            suffix="ms"
            icon={Clock}
            color="yellow"
            trend={-8}
          />
          <StatCard
            title="Active Keys"
            value={apiUsageStats.activeKeys}
            icon={Key}
            color="indigo"
            trend={0}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'keys', label: 'API Keys', icon: Key },
            { id: 'activity', label: 'Activity Logs', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: Settings },
            { id: 'security', label: 'Security', icon: Shield }
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
            {activeTab === 'keys' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search API keys..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                {/* API Keys List */}
                <div className="divide-y divide-gray-700">
                  {filteredKeys.map((key) => (
                    <div key={key.id} className="p-6 hover:bg-gray-750">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{key.name}</h3>
                            <StatusBadge status={key.status} />
                            <EnvironmentBadge environment={key.environment} />
                          </div>
                          <p className="text-gray-400 mb-3">{key.description}</p>
                          
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 text-sm">API Key:</span>
                              <div className="flex items-center space-x-2">
                                <code className="bg-gray-700 px-2 py-1 rounded text-sm text-white">
                                  {visibleKeys[key.id] ? key.key : '••••••••••••••••••••••••••••••••'}
                                </code>
                                <button
                                  onClick={() => toggleKeyVisibility(key.id)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  {visibleKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                <button
                                  onClick={() => copyToClipboard(key.key)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                            <div>
                              <span className="block">Requests</span>
                              <span className="text-white font-medium">{key.requestCount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="block">Last Used</span>
                              <span className="text-white font-medium">{key.lastUsed}</span>
                            </div>
                            <div>
                              <span className="block">Created</span>
                              <span className="text-white font-medium">{key.createdAt}</span>
                            </div>
                            <div>
                              <span className="block">Expires</span>
                              <span className="text-white font-medium">{key.expiresAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 flex space-x-2">
                          <button
                            onClick={() => handleViewKey(key)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Recent API Activity</h3>
                  <p className="text-gray-400 text-sm mt-1">Monitor real-time API requests and responses</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Endpoint</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Response Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">API Key</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {recentActivity.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm text-white bg-gray-700 px-2 py-1 rounded">{activity.endpoint}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <MethodBadge method={activity.method} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusCodeBadge status={activity.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {activity.responseTime}ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {activity.apiKey}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {activity.timestamp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Usage Chart */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">API Usage Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Requests by Endpoint</h4>
                      <div className="space-y-3">
                        {[
                          { endpoint: '/api/v1/employees', requests: 8500, percentage: 35 },
                          { endpoint: '/api/v1/departments', requests: 6200, percentage: 25 },
                          { endpoint: '/api/v1/attendance', requests: 4800, percentage: 20 },
                          { endpoint: '/api/v1/payroll', requests: 3600, percentage: 15 },
                          { endpoint: '/api/v1/reports', requests: 1200, percentage: 5 }
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{item.endpoint}</span>
                              <span className="text-white">{item.requests.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Response Time Distribution</h4>
                      <div className="space-y-3">
                        {[
                          { range: '< 100ms', count: 18500, percentage: 60 },
                          { range: '100-300ms', count: 9200, percentage: 30 },
                          { range: '300-500ms', count: 2400, percentage: 8 },
                          { range: '> 500ms', count: 600, percentage: 2 }
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{item.range}</span>
                              <span className="text-white">{item.count.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Analysis */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Error Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">1,145</div>
                      <p className="text-gray-400">Total Errors</p>
                      <p className="text-red-400 text-sm">3.6% error rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">892</div>
                      <p className="text-gray-400">4xx Errors</p>
                      <p className="text-yellow-400 text-sm">Client errors</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-2">253</div>
                      <p className="text-gray-400">5xx Errors</p>
                      <p className="text-orange-400 text-sm">Server errors</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Create New Key
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Test API
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  View Documentation
                </button>
              </div>
            </div>

            {/* API Health */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">API Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400 font-medium">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avg Response</span>
                  <span className="text-white font-medium">245ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rate Limit</span>
                  <span className="text-yellow-400 font-medium">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-medium">Healthy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">High error rate detected</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">API key renewed successfully</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Rate limit exceeded</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Create API Key</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Key Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter key name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Environment</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="production">Production</option>
                  <option value="testing">Testing</option>
                  <option value="development">Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Permissions</label>
                <div className="space-y-2">
                  {['read', 'write', 'delete'].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-white capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIManagement;
