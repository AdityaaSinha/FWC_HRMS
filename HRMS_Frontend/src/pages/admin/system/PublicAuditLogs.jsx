import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, XCircle, Clock, User, Calendar, FileText, Shield, Activity, Database, Settings, Users, Lock, Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import publicAuditLogService from '../../../services/publicAuditLogService';

const PublicAuditLogs = () => {
  console.log('🚀 PublicAuditLogs component rendered (NO AUTH REQUIRED)');
  
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

  // Fetch audit logs from PUBLIC API (no auth required)
  const fetchAuditLogs = async () => {
    console.log('🔍 fetchAuditLogs called (PUBLIC API)');
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

      console.log('📤 PUBLIC API params:', params);
      console.log('🔍 Fetching audit logs with detailed params (PUBLIC):', {
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery,
        severity: selectedSeverity,
        category: getCategoryFromTab(activeTab),
        dateRange: selectedDateRange,
        user: selectedUser
      });

      const response = await publicAuditLogService.getAuditLogs(params);
      console.log('📥 PUBLIC API response:', response);
      console.log('✅ Public audit logs response details:', {
        success: response.success,
        dataLength: response.data?.length,
        pagination: response.pagination,
        error: response.error
      });
      
      if (response.success) {
        setAuditLogs(response.data || []);
        setPagination(prev => ({
          ...prev,
          total: response.pagination?.total || 0,
          pages: response.pagination?.pages || 0,
          totalPages: response.pagination?.pages || 0
        }));
        console.log('✅ Audit logs set successfully:', response.data?.length || 0, 'logs');
      } else {
        console.error('❌ API returned error:', response.error);
        setError(response.error || 'Failed to fetch audit logs');
        setAuditLogs([]);
      }
    } catch (error) {
      console.error('❌ fetchAuditLogs error:', error);
      setError(`Failed to fetch audit logs: ${error.message}`);
      setAuditLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from PUBLIC API (no auth required)
  const fetchStats = async () => {
    console.log('📊 fetchStats called (PUBLIC API)');
    try {
      const response = await publicAuditLogService.getAuditLogStats();
      console.log('📊 Stats response (PUBLIC):', response);
      
      if (response.success) {
        setStats(response.data || {});
        console.log('✅ Stats set successfully:', response.data);
      } else {
        console.error('❌ Stats API returned error:', response.error);
        setStats({});
      }
    } catch (error) {
      console.error('❌ fetchStats error:', error);
      setStats({});
    }
  };

  // Helper functions
  const getCategoryFromTab = (tab) => {
    const categoryMap = {
      'all': undefined,
      'auth': 'AUTHENTICATION',
      'user': 'USER_MANAGEMENT',
      'role': 'ROLE_MANAGEMENT',
      'system': 'SYSTEM',
      'security': 'SECURITY',
      'data': 'DATA_MANAGEMENT'
    };
    return categoryMap[tab];
  };

  const getDateRange = (range) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'today':
        return {
          startDate: today.toISOString(),
          endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        };
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return {
          startDate: weekAgo.toISOString(),
          endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        };
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return {
          startDate: monthAgo.toISOString(),
          endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        };
      default:
        return {};
    }
  };

  // Event handlers
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowLogDetails(true);
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    console.log('🔄 useEffect triggered for fetchAuditLogs (PUBLIC)');
    fetchAuditLogs();
  }, [pagination.page, searchQuery, selectedSeverity, activeTab, selectedDateRange]);

  useEffect(() => {
    console.log('🔄 useEffect triggered for fetchStats (PUBLIC)');
    fetchStats();
  }, []);

  // Severity badge component
  const SeverityBadge = ({ severity }) => {
    const severityConfig = {
      'LOW': { color: 'bg-green-500', icon: CheckCircle },
      'MEDIUM': { color: 'bg-yellow-500', icon: AlertTriangle },
      'HIGH': { color: 'bg-orange-500', icon: AlertTriangle },
      'CRITICAL': { color: 'bg-red-500', icon: XCircle }
    };
    
    const config = severityConfig[severity] || severityConfig['LOW'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {severity}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'SUCCESS': { color: 'bg-green-500', icon: CheckCircle },
      'FAILURE': { color: 'bg-red-500', icon: XCircle },
      'PENDING': { color: 'bg-yellow-500', icon: Clock },
      'IN_PROGRESS': { color: 'bg-blue-500', icon: Activity }
    };
    
    const config = statusConfig[status] || statusConfig['SUCCESS'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  // Category icon component
  const CategoryIcon = ({ category }) => {
    const iconMap = {
      'AUTHENTICATION': Shield,
      'USER_MANAGEMENT': Users,
      'ROLE_MANAGEMENT': Lock,
      'SYSTEM': Settings,
      'SECURITY': Shield,
      'DATA_MANAGEMENT': Database,
      'default': Activity
    };
    
    const Icon = iconMap[category] || iconMap['default'];
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Public Audit Logs</h1>
            <p className="text-gray-400">Monitor system activities and security events (No authentication required)</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Events</p>
                <p className="text-2xl font-semibold text-white">{stats.totalLogs || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Success Rate</p>
                <p className="text-2xl font-semibold text-white">
                  {stats.statusCounts?.SUCCESS ? 
                    Math.round((stats.statusCounts.SUCCESS / stats.totalLogs) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Critical Events</p>
                <p className="text-2xl font-semibold text-white">{stats.severityCounts?.CRITICAL || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Today's Events</p>
                <p className="text-2xl font-semibold text-white">{stats.todayCount || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Severity</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Severities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Users</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg mb-6">
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', label: 'All Events', icon: Activity },
                  { id: 'auth', label: 'Authentication', icon: Shield },
                  { id: 'user', label: 'User Management', icon: Users },
                  { id: 'role', label: 'Role Management', icon: Lock },
                  { id: 'system', label: 'System', icon: Settings },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'data', label: 'Data', icon: Database }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-indigo-500 text-indigo-400'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
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
                          <div className="flex items-center">
                            <CategoryIcon category={log.category} />
                            <span className="ml-2 text-sm text-white">{log.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <SeverityBadge severity={log.severity} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={log.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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

          {/* Notice */}
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-100 mb-2">Public Access</h3>
            <p className="text-blue-200 text-sm">
              This is a public view of audit logs that doesn't require authentication. 
              All sensitive information is filtered for security purposes.
            </p>
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
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Basic Information</h4>
                  <div className="space-y-3 bg-gray-750 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Timestamp:</span>
                      <span className="text-white">{new Date(selectedLog.timestamp).toLocaleString()}</span>
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
                  <div className="space-y-3 bg-gray-750 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-400">IP Address:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.ipAddress || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">User Agent:</span>
                      <span className="text-white text-sm break-all">{selectedLog.userAgent || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">User Information</h4>
                  <div className="space-y-3 bg-gray-750 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-400">User ID:</span>
                      <span className="text-white font-mono text-sm">{selectedLog.userId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{selectedLog.user?.name || 'System'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedLog.user?.email || 'system@hrms.com'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Employee ID:</span>
                      <span className="text-white">{selectedLog.user?.employeeId || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedLog.description && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">Description</h4>
                <div className="bg-gray-750 p-4 rounded-lg">
                  <p className="text-gray-300">{selectedLog.description}</p>
                </div>
              </div>
            )}

            {/* Details */}
            {selectedLog.details && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">Additional Details</h4>
                <div className="bg-gray-750 p-4 rounded-lg">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-x-auto">
                    {typeof selectedLog.details === 'string' 
                      ? selectedLog.details 
                      : JSON.stringify(selectedLog.details, null, 2)
                    }
                  </pre>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
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

export default PublicAuditLogs;