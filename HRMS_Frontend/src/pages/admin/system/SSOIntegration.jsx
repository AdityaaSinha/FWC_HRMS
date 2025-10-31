import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Settings, Shield, Key, Globe, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical, Download, Upload, RefreshCw, Link, Unlink, Users, Activity, Clock, Server } from 'lucide-react';

const SSOIntegration = () => {
  const [activeTab, setActiveTab] = useState('providers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Mock SSO providers data
  const mockProviders = [
    {
      id: 'google',
      name: 'Google Workspace',
      type: 'SAML',
      status: 'active',
      users: 145,
      lastSync: '2024-01-15T10:30:00Z',
      domain: 'company.com',
      icon: '🔍',
      config: {
        entityId: 'https://accounts.google.com/o/saml2',
        ssoUrl: 'https://accounts.google.com/o/saml2/idp',
        certificate: 'MIICXjCCAcegAwIBAgIBADANBgkqhkiG9w0BAQ0FADCBhzELMAkGA1UEBhMCVVMx...',
        attributeMapping: {
          email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
          firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
          lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
        }
      },
      stats: {
        successfulLogins: 1250,
        failedLogins: 15,
        avgResponseTime: 245
      }
    },
    {
      id: 'azure',
      name: 'Microsoft Azure AD',
      type: 'OIDC',
      status: 'active',
      users: 89,
      lastSync: '2024-01-15T09:45:00Z',
      domain: 'company.onmicrosoft.com',
      icon: '🔷',
      config: {
        clientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        clientSecret: '***hidden***',
        tenantId: 'tenant-id-here',
        redirectUri: 'https://hrms.company.com/auth/callback'
      },
      stats: {
        successfulLogins: 890,
        failedLogins: 8,
        avgResponseTime: 180
      }
    },
    {
      id: 'okta',
      name: 'Okta',
      type: 'SAML',
      status: 'inactive',
      users: 0,
      lastSync: null,
      domain: 'company.okta.com',
      icon: '🔐',
      config: {
        entityId: 'http://www.okta.com/exk1234567890abcdef',
        ssoUrl: 'https://company.okta.com/app/company_hrms_1/exk1234567890abcdef/sso/saml',
        certificate: null
      },
      stats: {
        successfulLogins: 0,
        failedLogins: 0,
        avgResponseTime: 0
      }
    },
    {
      id: 'ldap',
      name: 'Active Directory LDAP',
      type: 'LDAP',
      status: 'active',
      users: 234,
      lastSync: '2024-01-15T11:00:00Z',
      domain: 'ad.company.local',
      icon: '🏢',
      config: {
        server: 'ldap://ad.company.local:389',
        baseDn: 'DC=company,DC=local',
        bindDn: 'CN=hrms-service,OU=Service Accounts,DC=company,DC=local',
        userFilter: '(&(objectClass=user)(!(objectClass=computer)))',
        groupFilter: '(objectClass=group)'
      },
      stats: {
        successfulLogins: 2340,
        failedLogins: 45,
        avgResponseTime: 120
      }
    }
  ];

  // Mock statistics
  const mockStats = {
    totalProviders: 4,
    activeProviders: 3,
    totalUsers: 468,
    ssoLogins: 4480,
    avgResponseTime: 186,
    successRate: 97.8,
    lastSync: '2024-01-15T11:00:00Z'
  };

  // Mock recent activity
  const mockActivity = [
    {
      id: 1,
      type: 'login',
      user: 'john.smith@company.com',
      provider: 'Google Workspace',
      timestamp: '2024-01-15T10:45:00Z',
      status: 'success',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      type: 'sync',
      provider: 'Microsoft Azure AD',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'success',
      details: '89 users synchronized'
    },
    {
      id: 3,
      type: 'login',
      user: 'sarah.johnson@company.com',
      provider: 'Active Directory LDAP',
      timestamp: '2024-01-15T10:15:00Z',
      status: 'failed',
      error: 'Invalid credentials'
    },
    {
      id: 4,
      type: 'config',
      provider: 'Okta',
      timestamp: '2024-01-15T09:30:00Z',
      status: 'updated',
      details: 'Certificate updated'
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
      active: { color: 'green', label: 'Active' },
      inactive: { color: 'red', label: 'Inactive' },
      pending: { color: 'yellow', label: 'Pending' },
      error: { color: 'red', label: 'Error' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20`}>
        {config.label}
      </span>
    );
  };

  const TypeBadge = ({ type }) => {
    const typeConfig = {
      SAML: { color: 'blue', label: 'SAML 2.0' },
      OIDC: { color: 'purple', label: 'OpenID Connect' },
      LDAP: { color: 'orange', label: 'LDAP' },
      OAuth: { color: 'green', label: 'OAuth 2.0' }
    };
    
    const config = typeConfig[type] || typeConfig.SAML;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20`}>
        {config.label}
      </span>
    );
  };

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || provider.type.toLowerCase() === selectedProvider.toLowerCase();
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">SSO Integration</h1>
            <p className="text-gray-400 mt-2">Manage single sign-on providers and authentication settings</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Config</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Sync All</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Provider</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Providers"
            value={mockStats.totalProviders}
            icon={Server}
            color="blue"
          />
          <StatCard
            title="Active Providers"
            value={mockStats.activeProviders}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="SSO Users"
            value={mockStats.totalUsers}
            icon={Users}
            color="purple"
            trend={12}
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

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="SSO Logins"
            value={mockStats.ssoLogins}
            icon={Key}
            color="indigo"
            trend={8}
          />
          <StatCard
            title="Avg Response Time"
            value={mockStats.avgResponseTime}
            suffix="ms"
            icon={Activity}
            color="yellow"
          />
          <StatCard
            title="Last Sync"
            value="2 min ago"
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Domains"
            value="4"
            icon={Globe}
            color="pink"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'providers', label: 'Providers', icon: Server },
            { id: 'activity', label: 'Activity Logs', icon: Activity },
            { id: 'settings', label: 'Settings', icon: Settings }
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
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search providers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Types</option>
                      <option value="saml">SAML</option>
                      <option value="oidc">OpenID Connect</option>
                      <option value="ldap">LDAP</option>
                      <option value="oauth">OAuth</option>
                    </select>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Providers List */}
              {activeTab === 'providers' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Success Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Sync</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredProviders.map((provider) => (
                        <tr key={provider.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3 text-lg">
                                {provider.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{provider.name}</div>
                                <div className="text-sm text-gray-400">{provider.domain}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <TypeBadge type={provider.type} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={provider.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-white text-sm">{provider.users}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">
                              {provider.stats.successfulLogins > 0 
                                ? `${((provider.stats.successfulLogins / (provider.stats.successfulLogins + provider.stats.failedLogins)) * 100).toFixed(1)}%`
                                : 'N/A'
                              }
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">
                              {provider.lastSync ? new Date(provider.lastSync).toLocaleString() : 'Never'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedConfig(provider);
                                  setShowConfigModal(true);
                                }}
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                <Settings className="h-4 w-4" />
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

              {/* Activity Logs */}
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
                              {activity.type === 'login' && <Key className={`h-4 w-4 ${
                                activity.status === 'success' ? 'text-green-400' :
                                activity.status === 'failed' ? 'text-red-400' :
                                'text-blue-400'
                              }`} />}
                              {activity.type === 'sync' && <RefreshCw className="h-4 w-4 text-blue-400" />}
                              {activity.type === 'config' && <Settings className="h-4 w-4 text-purple-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-medium">
                                  {activity.type === 'login' && `Login ${activity.status}`}
                                  {activity.type === 'sync' && 'User Synchronization'}
                                  {activity.type === 'config' && 'Configuration Updated'}
                                </h4>
                                <StatusBadge status={activity.status} />
                              </div>
                              <p className="text-gray-400 text-sm mt-1">
                                {activity.user && `User: ${activity.user}`}
                                {activity.provider && `Provider: ${activity.provider}`}
                                {activity.details && activity.details}
                                {activity.error && `Error: ${activity.error}`}
                              </p>
                              {activity.ip && (
                                <p className="text-gray-500 text-xs mt-1">IP: {activity.ip}</p>
                              )}
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

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Global SSO Settings */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Global SSO Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-white font-medium">Enable SSO</label>
                            <p className="text-gray-400 text-sm">Allow users to authenticate via SSO providers</p>
                          </div>
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                            Enabled
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-white font-medium">Force SSO</label>
                            <p className="text-gray-400 text-sm">Require SSO authentication for all users</p>
                          </div>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">
                            Disabled
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-white font-medium">Auto-provision Users</label>
                            <p className="text-gray-400 text-sm">Automatically create accounts for new SSO users</p>
                          </div>
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                            Enabled
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Session Settings */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Session Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Session Timeout (minutes)</label>
                          <input
                            type="number"
                            defaultValue="480"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Max Concurrent Sessions</label>
                          <input
                            type="number"
                            defaultValue="3"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Allowed Domains</label>
                          <textarea
                            rows="3"
                            defaultValue="company.com&#10;subsidiary.com&#10;partner.org"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter allowed domains, one per line"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Blocked IP Ranges</label>
                          <textarea
                            rows="2"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter blocked IP ranges, one per line"
                          />
                        </div>
                      </div>
                    </div>
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
                  onClick={() => setShowAddModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Provider
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Sync All Users
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Test Connection
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export Logs
                </button>
              </div>
            </div>

            {/* Provider Status */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Provider Status</h3>
              <div className="space-y-3">
                {mockProviders.map(provider => (
                  <div key={provider.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-750">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{provider.icon}</div>
                      <div>
                        <span className="text-white text-sm font-medium">{provider.name}</span>
                        <div className="text-xs text-gray-400">{provider.users} users</div>
                      </div>
                    </div>
                    <StatusBadge status={provider.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Certificate expiring soon</p>
                    <p className="text-xs text-gray-400">Google Workspace - 30 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Failed login attempts</p>
                    <p className="text-xs text-gray-400">15 attempts in last hour</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Sync completed</p>
                    <p className="text-xs text-gray-400">Azure AD - 89 users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Provider Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add SSO Provider</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Provider Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select provider type</option>
                  <option value="saml">SAML 2.0</option>
                  <option value="oidc">OpenID Connect</option>
                  <option value="ldap">LDAP</option>
                  <option value="oauth">OAuth 2.0</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Provider Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter provider name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Domain</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter provider description"
                />
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
                Add Provider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">{selectedConfig.name} Configuration</h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Provider Name</label>
                    <input
                      type="text"
                      defaultValue={selectedConfig.name}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Domain</label>
                    <input
                      type="text"
                      defaultValue={selectedConfig.domain}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Configuration Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Configuration</h4>
                <div className="space-y-4">
                  {selectedConfig.type === 'SAML' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Entity ID</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.entityId}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">SSO URL</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.ssoUrl}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Certificate</label>
                        <textarea
                          rows="4"
                          defaultValue={selectedConfig.config.certificate}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedConfig.type === 'OIDC' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Client ID</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.clientId}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Client Secret</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            defaultValue={selectedConfig.config.clientSecret}
                            className="w-full px-3 py-2 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tenant ID</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.tenantId}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}

                  {selectedConfig.type === 'LDAP' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Server URL</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.server}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Base DN</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.baseDn}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bind DN</label>
                        <input
                          type="text"
                          defaultValue={selectedConfig.config.bindDn}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}
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
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
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

export default SSOIntegration;
