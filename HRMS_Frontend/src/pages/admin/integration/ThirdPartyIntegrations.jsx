import React, { useState } from 'react';
import { Search, Plus, Settings, Activity, CheckCircle, AlertTriangle, Clock, Zap, Link, Shield, RefreshCw, Download, Eye, Edit, Trash2, Power } from 'lucide-react';

const ThirdPartyIntegrations = () => {
  const [activeTab, setActiveTab] = useState('integrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  // Mock data for integrations
  const mockIntegrations = [
    {
      id: 1,
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'Communication',
      status: 'active',
      lastSync: '2024-01-15 14:30:00',
      syncFrequency: 'Real-time',
      dataPoints: 1250,
      version: 'v2.1.0',
      icon: '💬',
      features: ['Notifications', 'User Sync', 'Channel Management'],
      health: 'healthy',
      uptime: 99.9,
      lastError: null
    },
    {
      id: 2,
      name: 'Google Workspace',
      description: 'Email, calendar, and document management',
      category: 'Productivity',
      status: 'active',
      lastSync: '2024-01-15 14:25:00',
      syncFrequency: 'Every 15 minutes',
      dataPoints: 3420,
      version: 'v3.2.1',
      icon: '📧',
      features: ['Email Sync', 'Calendar Integration', 'Drive Access'],
      health: 'healthy',
      uptime: 99.8,
      lastError: null
    },
    {
      id: 3,
      name: 'Salesforce',
      description: 'Customer relationship management',
      category: 'CRM',
      status: 'warning',
      lastSync: '2024-01-15 13:45:00',
      syncFrequency: 'Every 30 minutes',
      dataPoints: 890,
      version: 'v1.8.3',
      icon: '☁️',
      features: ['Contact Sync', 'Lead Management', 'Opportunity Tracking'],
      health: 'warning',
      uptime: 97.5,
      lastError: 'Rate limit exceeded'
    },
    {
      id: 4,
      name: 'Microsoft Teams',
      description: 'Video conferencing and collaboration',
      category: 'Communication',
      status: 'inactive',
      lastSync: '2024-01-10 09:30:00',
      syncFrequency: 'Manual',
      dataPoints: 0,
      version: 'v2.0.5',
      icon: '📹',
      features: ['Meeting Integration', 'Chat Sync', 'File Sharing'],
      health: 'error',
      uptime: 0,
      lastError: 'Authentication failed'
    },
    {
      id: 5,
      name: 'Jira',
      description: 'Project management and issue tracking',
      category: 'Project Management',
      status: 'active',
      lastSync: '2024-01-15 14:20:00',
      syncFrequency: 'Every 10 minutes',
      dataPoints: 567,
      version: 'v4.1.2',
      icon: '📋',
      features: ['Issue Tracking', 'Project Sync', 'Sprint Management'],
      health: 'healthy',
      uptime: 99.5,
      lastError: null
    },
    {
      id: 6,
      name: 'Zoom',
      description: 'Video conferencing platform',
      category: 'Communication',
      status: 'active',
      lastSync: '2024-01-15 14:15:00',
      syncFrequency: 'Real-time',
      dataPoints: 234,
      version: 'v1.5.0',
      icon: '🎥',
      features: ['Meeting Scheduling', 'Recording Access', 'Participant Sync'],
      health: 'healthy',
      uptime: 99.7,
      lastError: null
    }
  ];

  // Mock data for integration statistics
  const integrationStats = {
    totalIntegrations: 6,
    activeIntegrations: 4,
    warningIntegrations: 1,
    errorIntegrations: 1,
    totalDataPoints: 6361,
    averageUptime: 97.9,
    lastSyncTime: '2024-01-15 14:30:00'
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      integration: 'Slack',
      action: 'Data Sync Completed',
      status: 'success',
      timestamp: '2024-01-15 14:30:00',
      details: 'Synced 45 new messages and 12 user updates'
    },
    {
      id: 2,
      integration: 'Google Workspace',
      action: 'Calendar Sync',
      status: 'success',
      timestamp: '2024-01-15 14:25:00',
      details: 'Synced 23 calendar events'
    },
    {
      id: 3,
      integration: 'Salesforce',
      action: 'Rate Limit Warning',
      status: 'warning',
      timestamp: '2024-01-15 13:45:00',
      details: 'API rate limit reached, sync delayed'
    },
    {
      id: 4,
      integration: 'Microsoft Teams',
      action: 'Authentication Failed',
      status: 'error',
      timestamp: '2024-01-15 13:30:00',
      details: 'Token expired, re-authentication required'
    },
    {
      id: 5,
      integration: 'Jira',
      action: 'Project Sync',
      status: 'success',
      timestamp: '2024-01-15 14:20:00',
      details: 'Synced 8 projects and 34 issues'
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
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      warning: 'Warning',
      error: 'Error'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const HealthBadge = ({ health }) => {
    const colors = {
      healthy: 'bg-green-500/10 text-green-400 border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    const labels = {
      healthy: 'Healthy',
      warning: 'Warning',
      error: 'Error'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[health]}`}>
        {labels[health]}
      </span>
    );
  };

  const CategoryBadge = ({ category }) => {
    const colors = {
      'Communication': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Productivity': 'bg-green-500/10 text-green-400 border-green-500/20',
      'CRM': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'Project Management': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Analytics': 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
        {category}
      </span>
    );
  };

  const ActivityStatusBadge = ({ status }) => {
    const colors = {
      success: 'bg-green-500/10 text-green-400 border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleConfigureIntegration = (integration) => {
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || integration.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Third-Party Integrations</h1>
            <p className="text-gray-400 mt-2">Manage and monitor external service integrations</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Sync All</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Integration</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Integrations"
            value={integrationStats.totalIntegrations}
            icon={Link}
            color="blue"
            trend={15}
          />
          <StatCard
            title="Active Integrations"
            value={integrationStats.activeIntegrations}
            icon={CheckCircle}
            color="green"
            trend={8}
          />
          <StatCard
            title="Data Points Synced"
            value={integrationStats.totalDataPoints.toLocaleString()}
            icon={Activity}
            color="purple"
            trend={23}
          />
          <StatCard
            title="Average Uptime"
            value={integrationStats.averageUptime}
            suffix="%"
            icon={Zap}
            color="yellow"
            trend={2}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'integrations', label: 'Integrations', icon: Link },
            { id: 'activity', label: 'Activity Log', icon: Activity },
            { id: 'marketplace', label: 'Marketplace', icon: Settings },
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
            {activeTab === 'integrations' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search integrations..."
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
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                </div>

                {/* Integrations Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredIntegrations.map((integration) => (
                      <div key={integration.id} className="bg-gray-750 border border-gray-600 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{integration.icon}</div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                              <p className="text-gray-400 text-sm">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={integration.status} />
                            <button
                              onClick={() => handleConfigureIntegration(integration)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <CategoryBadge category={integration.category} />
                          <HealthBadge health={integration.health} />
                          <span className="text-xs text-gray-400">v{integration.version}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-400 block">Last Sync</span>
                            <span className="text-white">{integration.lastSync}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Frequency</span>
                            <span className="text-white">{integration.syncFrequency}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Data Points</span>
                            <span className="text-white">{integration.dataPoints.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Uptime</span>
                            <span className="text-white">{integration.uptime}%</span>
                          </div>
                        </div>

                        {integration.lastError && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                              <span className="text-red-400 text-sm">{integration.lastError}</span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {integration.features.map((feature, index) => (
                            <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                              <RefreshCw className="h-3 w-3" />
                              <span>Sync</span>
                            </button>
                            <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>View</span>
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <Power className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                  <p className="text-gray-400 text-sm mt-1">Monitor integration activities and events</p>
                </div>
                <div className="divide-y divide-gray-700">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-gray-750">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-medium">{activity.integration}</h4>
                            <ActivityStatusBadge status={activity.status} />
                          </div>
                          <p className="text-gray-300 mb-2">{activity.action}</p>
                          <p className="text-gray-400 text-sm mb-2">{activity.details}</p>
                          <p className="text-gray-500 text-xs">{activity.timestamp}</p>
                        </div>
                        <div className="ml-4">
                          {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
                          {activity.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                          {activity.status === 'error' && <AlertTriangle className="h-5 w-5 text-red-400" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Integration Marketplace</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Trello', category: 'Project Management', icon: '📋', description: 'Visual project management' },
                    { name: 'Dropbox', category: 'Storage', icon: '📦', description: 'Cloud file storage' },
                    { name: 'GitHub', category: 'Development', icon: '🐙', description: 'Code repository management' },
                    { name: 'Stripe', category: 'Payment', icon: '💳', description: 'Payment processing' },
                    { name: 'Mailchimp', category: 'Marketing', icon: '📧', description: 'Email marketing platform' },
                    { name: 'Zendesk', category: 'Support', icon: '🎧', description: 'Customer support platform' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-750 border border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-xl">{item.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-gray-400 text-sm">{item.category}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                        Install
                      </button>
                    </div>
                  ))}
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
                  onClick={() => setShowAddModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Integration
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Sync All
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  View Documentation
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Overall Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-medium">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Connections</span>
                  <span className="text-white font-medium">4/6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Full Sync</span>
                  <span className="text-white font-medium">2 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Data Freshness</span>
                  <span className="text-green-400 font-medium">Fresh</span>
                </div>
              </div>
            </div>

            {/* Integration Categories */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-3">
                {[
                  { name: 'Communication', count: 3, color: 'blue' },
                  { name: 'Productivity', count: 1, color: 'green' },
                  { name: 'CRM', count: 1, color: 'purple' },
                  { name: 'Project Management', count: 1, color: 'orange' }
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-${category.color}-400 rounded-full`}></div>
                      <span className="text-gray-300">{category.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Salesforce rate limit warning</p>
                    <p className="text-xs text-gray-400">45 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Teams authentication failed</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Slack integration updated</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Integration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Integration</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Integration Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select integration type</option>
                  <option value="slack">Slack</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="google">Google Workspace</option>
                  <option value="salesforce">Salesforce</option>
                  <option value="jira">Jira</option>
                  <option value="zoom">Zoom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Integration Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter integration name"
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
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Add Integration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Integration Modal */}
      {showConfigModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedIntegration.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedIntegration.name}</h3>
                  <p className="text-gray-400">{selectedIntegration.description}</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sync Frequency</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="realtime">Real-time</option>
                    <option value="5min">Every 5 minutes</option>
                    <option value="15min">Every 15 minutes</option>
                    <option value="30min">Every 30 minutes</option>
                    <option value="1hour">Every hour</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">API Configuration</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="API Key"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="API Secret"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Webhook URL"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedIntegration.features.map((feature, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-white text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Test Connection
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThirdPartyIntegrations;
