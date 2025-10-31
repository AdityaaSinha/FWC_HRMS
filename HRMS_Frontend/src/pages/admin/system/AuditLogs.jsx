import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, XCircle, Clock, User, Calendar, FileText, Shield, Activity, Database, Settings, Users, Lock, Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import publicAuditLogService from '../../../services/publicAuditLogService';
import DebugAuth from '../../../components/DebugAuth';

const AuditLogs = () => {
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogDetails, setShowLogDetails] = useState(false);
  
  // API state
  const [auditLogs, setAuditLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [error, setError] = useState(null);

  // Fetch audit logs from API
  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        severity: selectedSeverity !== 'all' ? selectedSeverity : undefined,
        category: getCategoryFromTab(activeTab)
      };

      // Add date range filter
      if (selectedDateRange !== 'all') {
        const dateRange = getDateRange(selectedDateRange);
        if (dateRange.startDate) params.startDate = dateRange.startDate;
        if (dateRange.endDate) params.endDate = dateRange.endDate;
      }

      const response = await publicAuditLogService.getAuditLogs(params);
      
      if (response.success) {
        setAuditLogs(response.data);
        // Only update pagination properties that don't trigger useEffect
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages,
          limit: response.pagination.limit
          // Don't update 'page' here to avoid infinite loop
        }));
      } else {
        setError('Failed to fetch audit logs');
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setError('Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch audit log statistics
  const fetchStats = async () => {
    try {
      const response = await publicAuditLogService.getAuditLogStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Helper function to get category from active tab
  const getCategoryFromTab = (tab) => {
    switch (tab) {
      case 'security': return 'Security';
      case 'system': return 'System';
      case 'user': return 'User Management';
      case 'errors': return undefined; // Will filter by status instead
      default: return undefined;
    }
  };

  // Helper function to get date range
  const getDateRange = (range) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'today':
        return { startDate: today.toISOString(), endDate: now.toISOString() };
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return { startDate: weekAgo.toISOString(), endDate: now.toISOString() };
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return { startDate: monthAgo.toISOString(), endDate: now.toISOString() };
      default:
        return {};
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchAuditLogs();
  }, [pagination.page, searchQuery, selectedSeverity, activeTab, selectedDateRange]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    fetchAuditLogs();
    fetchStats();
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
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
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
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
            value={stats.totalLogs?.toLocaleString() || '0'}
            icon={FileText}
            color="blue"
            trend={5}
          />
          <StatCard
            title="Today's Logs"
            value={stats.todayLogs || '0'}
            icon={Clock}
            color="green"
            trend={12}
          />
          <StatCard
            title="Critical Events"
            value={stats.criticalEvents || '0'}
            icon={AlertTriangle}
            color="red"
            trend={-25}
          />
          <StatCard
            title="Failed Logins"
            value={stats.failedLogins || '0'}
            icon={XCircle}
            color="yellow"
            trend={-8}
          />
          <StatCard
            title="System Events"
            value={stats.systemEvents || '0'}
            icon={Settings}
            color="purple"
            trend={15}
          />
          <StatCard
            title="User Actions"
            value={stats.userActions || '0'}
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
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="flex items-center justify-center">
                            <RefreshCw className="h-6 w-6 text-gray-400 animate-spin mr-2" />
                            <span className="text-gray-400">Loading audit logs...</span>
                          </div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-red-400">{error}</div>
                        </td>
                      </tr>
                    ) : auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-gray-400">No audit logs found</div>
                        </td>
                      </tr>
                    ) : (
                      auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{new Date(log.timestamp).toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                                  <User className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{log.user?.name || 'System'}</div>
                                <div className="text-sm text-gray-400">{log.user?.email || 'system@hrms.com'}</div>
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {auditLogs.length} of {pagination.total || 0} logs
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, pagination.totalPages || 1) }, (_, i) => {
                    const pageNum = Math.max(1, pagination.page - 2) + i;
                    if (pageNum > (pagination.totalPages || 1)) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded text-sm ${
                          pageNum === pagination.page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= (pagination.totalPages || 1)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
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
                <p className="text-gray-400">{selectedLog.action} - {new Date(selectedLog.timestamp).toLocaleString()}</p>
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
                      <span className="text-white">{selectedLog.user?.name || 'System'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedLog.user?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Employee ID:</span>
                      <span className="text-white">{selectedLog.user?.employeeId || 'N/A'}</span>
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
                      <span className="text-white">{selectedLog.resource || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resource ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.resourceId || 'N/A'}</span>
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
                      <span className="text-white font-mono text-sm">{selectedLog.ipAddress || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">User Agent:</span>
                      <span className="text-white text-sm break-all">{selectedLog.userAgent || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timestamp:</span>
                      <span className="text-white font-mono text-sm">{new Date(selectedLog.timestamp).toISOString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Log ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white mb-3">Description</h4>
              <p className="text-gray-300 bg-gray-750 p-4 rounded-lg">{selectedLog.description || 'No description available'}</p>
            </div>

            {/* Additional Details */}
            {selectedLog.details && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">Additional Details</h4>
                <div className="bg-gray-750 p-4 rounded-lg">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {typeof selectedLog.details === 'string' 
                      ? selectedLog.details 
                      : JSON.stringify(selectedLog.details, null, 2)
                    }
                  </pre>
                </div>
              </div>
            )}

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
