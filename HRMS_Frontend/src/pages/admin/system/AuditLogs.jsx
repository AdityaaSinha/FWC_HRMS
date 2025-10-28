import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, XCircle, Clock, User, Calendar, FileText, Shield, Activity, Database, Settings, Users, Lock, Trash2, Edit, Plus, RefreshCw } from 'lucide-react';

const AuditLogs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogDetails, setShowLogDetails] = useState(false);

  // Mock data for audit logs
  const mockLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@company.com',
      userName: 'System Admin',
      action: 'User Created',
      category: 'User Management',
      resource: 'User Account',
      resourceId: 'user_12345',
      severity: 'info',
      status: 'success',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          email: 'john.doe@company.com',
          role: 'Employee',
          department: 'Engineering'
        },
        metadata: {
          sessionId: 'sess_abc123',
          requestId: 'req_xyz789'
        }
      },
      description: 'New user account created for John Doe in Engineering department'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:18',
      user: 'hr.manager@company.com',
      userName: 'Sarah Johnson',
      action: 'Permission Modified',
      category: 'Security',
      resource: 'Role Permissions',
      resourceId: 'role_hr_manager',
      severity: 'warning',
      status: 'success',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          permissions: ['user.create', 'user.edit', 'reports.view'],
          previousPermissions: ['user.edit', 'reports.view']
        },
        metadata: {
          sessionId: 'sess_def456',
          requestId: 'req_uvw012'
        }
      },
      description: 'HR Manager role permissions updated - added user creation permission'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:42',
      user: 'system',
      userName: 'System Process',
      action: 'Database Backup',
      category: 'System',
      resource: 'Database',
      resourceId: 'db_main',
      severity: 'info',
      status: 'success',
      ipAddress: 'localhost',
      userAgent: 'System/1.0',
      details: {
        changes: {
          backupSize: '2.4 GB',
          backupLocation: '/backups/db_main_20240115_142042.sql',
          duration: '45 seconds'
        },
        metadata: {
          jobId: 'backup_job_001',
          scheduledBy: 'system_scheduler'
        }
      },
      description: 'Automated database backup completed successfully'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:15:33',
      user: 'john.doe@company.com',
      userName: 'John Doe',
      action: 'Login Failed',
      category: 'Authentication',
      resource: 'User Session',
      resourceId: 'user_67890',
      severity: 'error',
      status: 'failed',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          reason: 'Invalid password',
          attemptCount: 3,
          lockoutTriggered: false
        },
        metadata: {
          sessionId: null,
          requestId: 'req_ghi345'
        }
      },
      description: 'Failed login attempt - invalid password provided'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:10:15',
      user: 'admin@company.com',
      userName: 'System Admin',
      action: 'Settings Updated',
      category: 'Configuration',
      resource: 'System Settings',
      resourceId: 'settings_security',
      severity: 'warning',
      status: 'success',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          passwordPolicy: {
            minLength: 12,
            requireSpecialChars: true,
            maxAge: 90
          },
          previousPasswordPolicy: {
            minLength: 8,
            requireSpecialChars: false,
            maxAge: 180
          }
        },
        metadata: {
          sessionId: 'sess_jkl678',
          requestId: 'req_mno901'
        }
      },
      description: 'Security settings updated - strengthened password policy'
    },
    {
      id: 6,
      timestamp: '2024-01-15 14:05:28',
      user: 'data.analyst@company.com',
      userName: 'Mike Chen',
      action: 'Report Generated',
      category: 'Reporting',
      resource: 'Analytics Report',
      resourceId: 'report_employee_analytics',
      severity: 'info',
      status: 'success',
      ipAddress: '192.168.1.115',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          reportType: 'Employee Analytics',
          dateRange: '2024-01-01 to 2024-01-15',
          recordCount: 1247,
          exportFormat: 'PDF'
        },
        metadata: {
          sessionId: 'sess_pqr234',
          requestId: 'req_stu567'
        }
      },
      description: 'Employee analytics report generated and exported to PDF'
    },
    {
      id: 7,
      timestamp: '2024-01-15 14:00:12',
      user: 'system',
      userName: 'System Process',
      action: 'Data Cleanup',
      category: 'Maintenance',
      resource: 'Database',
      resourceId: 'db_temp_data',
      severity: 'info',
      status: 'success',
      ipAddress: 'localhost',
      userAgent: 'System/1.0',
      details: {
        changes: {
          recordsDeleted: 15420,
          tablesAffected: ['temp_sessions', 'expired_tokens', 'old_logs'],
          spaceFreed: '1.2 GB'
        },
        metadata: {
          jobId: 'cleanup_job_002',
          scheduledBy: 'system_scheduler'
        }
      },
      description: 'Automated data cleanup completed - removed expired temporary data'
    },
    {
      id: 8,
      timestamp: '2024-01-15 13:55:45',
      user: 'security.admin@company.com',
      userName: 'Alex Wilson',
      action: 'User Suspended',
      category: 'Security',
      resource: 'User Account',
      resourceId: 'user_54321',
      severity: 'critical',
      status: 'success',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: {
        changes: {
          suspensionReason: 'Multiple failed login attempts',
          suspensionDuration: '24 hours',
          previousStatus: 'active'
        },
        metadata: {
          sessionId: 'sess_vwx890',
          requestId: 'req_yza123'
        }
      },
      description: 'User account suspended due to multiple failed login attempts'
    }
  ];

  // Mock data for statistics
  const mockStats = {
    totalLogs: 15420,
    todayLogs: 89,
    criticalEvents: 3,
    failedLogins: 12,
    systemEvents: 45,
    userActions: 67
  };

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend, suffix = '' }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}{suffix}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const SeverityBadge = ({ severity }) => {
    const colors = {
      info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20',
      critical: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      success: 'bg-green-500/10 text-green-400 border-green-500/20',
      failed: 'bg-red-500/10 text-red-400 border-red-500/20',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const CategoryIcon = ({ category }) => {
    const icons = {
      'User Management': Users,
      'Security': Shield,
      'System': Settings,
      'Authentication': Lock,
      'Configuration': Settings,
      'Reporting': FileText,
      'Maintenance': Database
    };
    
    const Icon = icons[category] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowLogDetails(true);
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'security' && ['Security', 'Authentication'].includes(log.category)) ||
                      (activeTab === 'system' && ['System', 'Maintenance', 'Configuration'].includes(log.category)) ||
                      (activeTab === 'user' && log.category === 'User Management') ||
                      (activeTab === 'errors' && log.status === 'failed');
    
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    
    return matchesSearch && matchesTab && matchesSeverity && matchesUser;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
            <p className="text-gray-400 mt-2">Monitor system activities and security events</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Total Logs"
            value={mockStats.totalLogs.toLocaleString()}
            icon={FileText}
            color="blue"
            trend={5}
          />
          <StatCard
            title="Today's Logs"
            value={mockStats.todayLogs}
            icon={Clock}
            color="green"
            trend={12}
          />
          <StatCard
            title="Critical Events"
            value={mockStats.criticalEvents}
            icon={AlertTriangle}
            color="red"
            trend={-25}
          />
          <StatCard
            title="Failed Logins"
            value={mockStats.failedLogins}
            icon={XCircle}
            color="yellow"
            trend={-8}
          />
          <StatCard
            title="System Events"
            value={mockStats.systemEvents}
            icon={Settings}
            color="purple"
            trend={15}
          />
          <StatCard
            title="User Actions"
            value={mockStats.userActions}
            icon={User}
            color="indigo"
            trend={18}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'all', label: 'All Logs', icon: FileText },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'system', label: 'System', icon: Settings },
            { id: 'user', label: 'User Actions', icon: Users },
            { id: 'errors', label: 'Errors', icon: XCircle }
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
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                      showFilters 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-750 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                      <select 
                        value={selectedDateRange}
                        onChange={(e) => setSelectedDateRange(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Severity</label>
                      <select 
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Severities</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">User</label>
                      <select 
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Users</option>
                        <option value="admin@company.com">System Admin</option>
                        <option value="hr.manager@company.com">HR Manager</option>
                        <option value="system">System Process</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{log.timestamp}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-white">{log.userName}</div>
                              <div className="text-sm text-gray-400">{log.user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{log.action}</div>
                          <div className="text-sm text-gray-400">{log.resource}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon category={log.category} />
                            <span className="text-sm text-white">{log.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <SeverityBadge severity={log.severity} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={log.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(log)}
                            className="text-indigo-400 hover:text-indigo-300 mr-3"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {filteredLogs.length} of {mockLogs.length} logs
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">1</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">2</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">3</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export All Logs
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Set Alert Rules
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Archive Old Logs
                </button>
              </div>
            </div>

            {/* Log Categories */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-3">
                {[
                  { name: 'User Management', count: 45, color: 'blue' },
                  { name: 'Security', count: 23, color: 'red' },
                  { name: 'System', count: 67, color: 'green' },
                  { name: 'Authentication', count: 34, color: 'yellow' },
                  { name: 'Configuration', count: 12, color: 'purple' },
                  { name: 'Reporting', count: 18, color: 'indigo' }
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                      <span className="text-white text-sm">{category.name}</span>
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
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Multiple failed logins detected</p>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">High system resource usage</p>
                    <p className="text-xs text-gray-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Database backup completed</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">CPU Usage</span>
                    <span className="text-sm text-white">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Memory Usage</span>
                    <span className="text-sm text-white">67%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Disk Usage</span>
                    <span className="text-sm text-white">23%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Details Modal */}
      {showLogDetails && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Log Details</h3>
                <p className="text-gray-400">{selectedLog.action} - {selectedLog.timestamp}</p>
              </div>
              <button
                onClick={() => setShowLogDetails(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">User:</span>
                      <span className="text-white">{selectedLog.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedLog.user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Action:</span>
                      <span className="text-white">{selectedLog.action}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{selectedLog.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resource:</span>
                      <span className="text-white">{selectedLog.resource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resource ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.resourceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Severity:</span>
                      <SeverityBadge severity={selectedLog.severity} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <StatusBadge status={selectedLog.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Technical Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">IP Address:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.ipAddress}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">User Agent:</span>
                      <span className="text-white text-sm break-all">{selectedLog.userAgent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Session ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.details.metadata.sessionId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Request ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.details.metadata.requestId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-3">Description</h4>
              <p className="text-gray-300 bg-gray-750 p-4 rounded-lg">{selectedLog.description}</p>
            </div>

            {/* Changes */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-3">Changes</h4>
              <div className="bg-gray-750 p-4 rounded-lg">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(selectedLog.details.changes, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowLogDetails(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Export Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
