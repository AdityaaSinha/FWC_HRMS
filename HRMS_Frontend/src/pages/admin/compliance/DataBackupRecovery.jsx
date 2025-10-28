import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Settings, Database, HardDrive, Cloud, Shield, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical, Download, Upload, RefreshCw, Activity, Clock, Server, Archive, Zap, Calendar, Play, Pause, RotateCcw } from 'lucide-react';

const DataBackupRecovery = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  // Mock backup data
  const mockBackups = [
    {
      id: 1,
      name: 'Full System Backup',
      type: 'full',
      status: 'completed',
      size: '45.2 GB',
      location: 'AWS S3',
      startTime: '2024-01-15T02:00:00Z',
      endTime: '2024-01-15T04:30:00Z',
      duration: '2h 30m',
      retention: '30 days',
      compression: '65%',
      encryption: true,
      databases: ['users', 'payroll', 'attendance', 'documents'],
      files: 1250000,
      success: true,
      lastVerified: '2024-01-15T05:00:00Z'
    },
    {
      id: 2,
      name: 'Incremental Backup',
      type: 'incremental',
      status: 'running',
      size: '2.8 GB',
      location: 'Local Storage',
      startTime: '2024-01-16T01:00:00Z',
      endTime: null,
      duration: '45m',
      retention: '7 days',
      compression: '72%',
      encryption: true,
      databases: ['users', 'attendance'],
      files: 85000,
      success: null,
      lastVerified: null,
      progress: 68
    },
    {
      id: 3,
      name: 'Database Backup',
      type: 'database',
      status: 'completed',
      size: '12.5 GB',
      location: 'Azure Blob',
      startTime: '2024-01-15T12:00:00Z',
      endTime: '2024-01-15T12:45:00Z',
      duration: '45m',
      retention: '90 days',
      compression: '58%',
      encryption: true,
      databases: ['users', 'payroll', 'attendance', 'documents', 'analytics'],
      files: 0,
      success: true,
      lastVerified: '2024-01-15T13:00:00Z'
    },
    {
      id: 4,
      name: 'Configuration Backup',
      type: 'config',
      status: 'failed',
      size: '125 MB',
      location: 'Google Drive',
      startTime: '2024-01-14T18:00:00Z',
      endTime: '2024-01-14T18:05:00Z',
      duration: '5m',
      retention: '14 days',
      compression: '45%',
      encryption: false,
      databases: [],
      files: 2500,
      success: false,
      lastVerified: null,
      error: 'Network timeout during upload'
    },
    {
      id: 5,
      name: 'Weekly Archive',
      type: 'archive',
      status: 'scheduled',
      size: '78.9 GB',
      location: 'AWS Glacier',
      startTime: '2024-01-21T03:00:00Z',
      endTime: null,
      duration: '4h 15m',
      retention: '365 days',
      compression: '70%',
      encryption: true,
      databases: ['users', 'payroll', 'attendance', 'documents', 'analytics', 'logs'],
      files: 2100000,
      success: null,
      lastVerified: null
    }
  ];

  // Mock statistics
  const mockStats = {
    totalBackups: 156,
    successfulBackups: 142,
    failedBackups: 8,
    runningBackups: 6,
    totalStorage: '2.8 TB',
    usedStorage: '1.9 TB',
    compressionRatio: 68,
    lastFullBackup: '2024-01-15T02:00:00Z',
    nextScheduled: '2024-01-17T02:00:00Z',
    avgBackupTime: '2h 15m',
    successRate: 91.2,
    retentionCompliance: 98.5
  };

  // Mock recovery points
  const mockRecoveryPoints = [
    {
      id: 1,
      timestamp: '2024-01-15T04:30:00Z',
      type: 'full',
      size: '45.2 GB',
      status: 'verified',
      retention: '29 days remaining',
      databases: ['users', 'payroll', 'attendance', 'documents'],
      canRestore: true
    },
    {
      id: 2,
      timestamp: '2024-01-14T04:30:00Z',
      type: 'full',
      size: '44.8 GB',
      status: 'verified',
      retention: '28 days remaining',
      databases: ['users', 'payroll', 'attendance', 'documents'],
      canRestore: true
    },
    {
      id: 3,
      timestamp: '2024-01-13T12:45:00Z',
      type: 'database',
      size: '12.3 GB',
      status: 'verified',
      retention: '87 days remaining',
      databases: ['users', 'payroll', 'attendance'],
      canRestore: true
    },
    {
      id: 4,
      timestamp: '2024-01-12T04:30:00Z',
      type: 'full',
      size: '44.1 GB',
      status: 'corrupted',
      retention: '26 days remaining',
      databases: ['users', 'payroll', 'attendance', 'documents'],
      canRestore: false
    }
  ];

  // Mock backup schedules
  const mockSchedules = [
    {
      id: 1,
      name: 'Daily Incremental',
      type: 'incremental',
      frequency: 'daily',
      time: '01:00',
      enabled: true,
      lastRun: '2024-01-16T01:00:00Z',
      nextRun: '2024-01-17T01:00:00Z',
      retention: '7 days',
      location: 'Local Storage'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      type: 'full',
      frequency: 'weekly',
      time: '02:00',
      enabled: true,
      lastRun: '2024-01-15T02:00:00Z',
      nextRun: '2024-01-22T02:00:00Z',
      retention: '30 days',
      location: 'AWS S3'
    },
    {
      id: 3,
      name: 'Monthly Archive',
      type: 'archive',
      frequency: 'monthly',
      time: '03:00',
      enabled: true,
      lastRun: '2024-01-01T03:00:00Z',
      nextRun: '2024-02-01T03:00:00Z',
      retention: '365 days',
      location: 'AWS Glacier'
    },
    {
      id: 4,
      name: 'Database Backup',
      type: 'database',
      frequency: 'daily',
      time: '12:00',
      enabled: false,
      lastRun: '2024-01-15T12:00:00Z',
      nextRun: null,
      retention: '90 days',
      location: 'Azure Blob'
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
      completed: { color: 'green', label: 'Completed', icon: CheckCircle },
      running: { color: 'blue', label: 'Running', icon: Activity },
      failed: { color: 'red', label: 'Failed', icon: XCircle },
      scheduled: { color: 'yellow', label: 'Scheduled', icon: Clock },
      paused: { color: 'orange', label: 'Paused', icon: Pause },
      verified: { color: 'emerald', label: 'Verified', icon: Shield },
      corrupted: { color: 'red', label: 'Corrupted', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig.scheduled;
    const IconComponent = config.icon;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20 flex items-center space-x-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const TypeBadge = ({ type }) => {
    const typeConfig = {
      full: { color: 'purple', label: 'Full', icon: Database },
      incremental: { color: 'blue', label: 'Incremental', icon: Activity },
      database: { color: 'green', label: 'Database', icon: Server },
      config: { color: 'orange', label: 'Config', icon: Settings },
      archive: { color: 'gray', label: 'Archive', icon: Archive }
    };
    
    const config = typeConfig[type] || typeConfig.full;
    const IconComponent = config.icon;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20 flex items-center space-x-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const LocationBadge = ({ location }) => {
    const locationConfig = {
      'AWS S3': { color: 'orange', icon: Cloud },
      'Azure Blob': { color: 'blue', icon: Cloud },
      'Google Drive': { color: 'green', icon: Cloud },
      'AWS Glacier': { color: 'purple', icon: Archive },
      'Local Storage': { color: 'gray', icon: HardDrive }
    };
    
    const config = locationConfig[location] || locationConfig['Local Storage'];
    const IconComponent = config.icon;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-500/10 text-${config.color}-400 border border-${config.color}-500/20 flex items-center space-x-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{location}</span>
      </span>
    );
  };

  const filteredBackups = mockBackups.filter(backup => {
    const matchesSearch = backup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         backup.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         backup.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || backup.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Data Backup & Recovery</h1>
            <p className="text-gray-400 mt-2">Manage system backups, recovery points, and data protection</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Verify Backups</span>
            </button>
            <button 
              onClick={() => setShowBackupModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Backup</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Backups"
            value={mockStats.totalBackups}
            icon={Database}
            color="blue"
          />
          <StatCard
            title="Success Rate"
            value={mockStats.successRate}
            suffix="%"
            icon={CheckCircle}
            color="green"
            trend={5}
          />
          <StatCard
            title="Storage Used"
            value={mockStats.usedStorage}
            icon={HardDrive}
            color="purple"
          />
          <StatCard
            title="Compression"
            value={mockStats.compressionRatio}
            suffix="%"
            icon={Archive}
            color="orange"
            trend={3}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Successful"
            value={mockStats.successfulBackups}
            icon={CheckCircle}
            color="emerald"
          />
          <StatCard
            title="Failed"
            value={mockStats.failedBackups}
            icon={XCircle}
            color="red"
          />
          <StatCard
            title="Running"
            value={mockStats.runningBackups}
            icon={Activity}
            color="blue"
          />
          <StatCard
            title="Avg Duration"
            value={mockStats.avgBackupTime}
            icon={Clock}
            color="indigo"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: Database },
            { id: 'backups', label: 'Backups', icon: Archive },
            { id: 'recovery', label: 'Recovery Points', icon: RotateCcw },
            { id: 'schedules', label: 'Schedules', icon: Calendar }
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
              {(activeTab === 'backups' || activeTab === 'recovery') && (
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search backups..."
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
                        <option value="completed">Completed</option>
                        <option value="running">Running</option>
                        <option value="failed">Failed</option>
                        <option value="scheduled">Scheduled</option>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Backup Status */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Backup Status</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-white">Successful</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.successfulBackups}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-white">Running</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.runningBackups}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <span className="text-white">Failed</span>
                          </div>
                          <span className="text-white font-medium">{mockStats.failedBackups}</span>
                        </div>
                      </div>
                    </div>

                    {/* Storage Usage */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Capacity</span>
                          <span className="text-white font-medium">{mockStats.totalStorage}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Used Space</span>
                          <span className="text-white font-medium">{mockStats.usedStorage}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{width: '68%'}}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Compression Ratio</span>
                          <span className="text-green-400 font-medium">{mockStats.compressionRatio}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-750 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Backup Activity</h3>
                    <div className="space-y-4">
                      {mockBackups.slice(0, 3).map((backup) => (
                        <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <TypeBadge type={backup.type} />
                            <div>
                              <p className="text-white font-medium">{backup.name}</p>
                              <p className="text-gray-400 text-sm">
                                {backup.size} • {backup.location}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={backup.status} />
                            <p className="text-gray-400 text-sm mt-1">
                              {backup.endTime ? new Date(backup.endTime).toLocaleDateString() : 'In progress'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Scheduled */}
                  <div className="mt-6 bg-gray-750 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Next Scheduled Backup</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Daily Incremental Backup</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(mockStats.nextScheduled).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                        Run Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Backups Tab */}
              {activeTab === 'backups' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Backup</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredBackups.map((backup) => (
                        <tr key={backup.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{backup.name}</div>
                              <div className="text-sm text-gray-400">
                                {backup.endTime ? new Date(backup.endTime).toLocaleDateString() : 'In progress'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <TypeBadge type={backup.type} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <StatusBadge status={backup.status} />
                              {backup.status === 'running' && backup.progress && (
                                <div className="w-20 bg-gray-700 rounded-full h-1">
                                  <div 
                                    className="bg-blue-400 h-1 rounded-full" 
                                    style={{width: `${backup.progress}%`}}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{backup.size}</div>
                            <div className="text-sm text-gray-400">{backup.compression}% compressed</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <LocationBadge location={backup.location} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{backup.duration}</div>
                            <div className="text-sm text-gray-400">{backup.retention}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedBackup(backup);
                                  setShowRestoreModal(true);
                                }}
                                className="text-indigo-400 hover:text-indigo-300"
                                disabled={backup.status !== 'completed'}
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-400 hover:text-green-300">
                                <Download className="h-4 w-4" />
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

              {/* Recovery Points Tab */}
              {activeTab === 'recovery' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {mockRecoveryPoints.map((point) => (
                      <div key={point.id} className="bg-gray-750 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gray-700 rounded-lg">
                              <Database className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="text-white font-medium">
                                  {new Date(point.timestamp).toLocaleString()}
                                </h4>
                                <TypeBadge type={point.type} />
                                <StatusBadge status={point.status} />
                              </div>
                              <p className="text-gray-400 text-sm mb-2">
                                Size: {point.size} • {point.retention}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {point.databases.map((db) => (
                                  <span key={db} className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                                    {db}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedBackup(point);
                                setShowRestoreModal(true);
                              }}
                              disabled={!point.canRestore}
                              className={`px-4 py-2 rounded-lg text-sm ${
                                point.canRestore 
                                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Restore
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedules Tab */}
              {activeTab === 'schedules' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {mockSchedules.map((schedule) => (
                      <div key={schedule.id} className="bg-gray-750 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gray-700 rounded-lg">
                              <Calendar className="h-6 w-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="text-white font-medium">{schedule.name}</h4>
                                <TypeBadge type={schedule.type} />
                                <StatusBadge status={schedule.enabled ? 'completed' : 'paused'} />
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-400">Frequency: </span>
                                  <span className="text-white">{schedule.frequency} at {schedule.time}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Retention: </span>
                                  <span className="text-white">{schedule.retention}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Location: </span>
                                  <LocationBadge location={schedule.location} />
                                </div>
                                <div>
                                  <span className="text-gray-400">Next Run: </span>
                                  <span className="text-white">
                                    {schedule.nextRun ? new Date(schedule.nextRun).toLocaleString() : 'Disabled'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className={`px-4 py-2 rounded-lg text-sm ${
                              schedule.enabled 
                                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}>
                              {schedule.enabled ? 'Pause' : 'Enable'}
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                              Edit
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm">
                              Run Now
                            </button>
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
                  onClick={() => setShowBackupModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Start Backup
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Verify All
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Test Recovery
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Storage Report
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Backup Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Storage Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Good</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-400 text-sm">Slow</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Last Verification</span>
                  <span className="text-white text-sm">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Backup failed</p>
                    <p className="text-xs text-gray-400">Configuration backup - Network timeout</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Storage warning</p>
                    <p className="text-xs text-gray-400">AWS S3 bucket 85% full</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Backup completed</p>
                    <p className="text-xs text-gray-400">Full system backup - 45.2 GB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Backup</h3>
              <button
                onClick={() => setShowBackupModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Backup Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter backup name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Backup Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental Backup</option>
                  <option value="database">Database Only</option>
                  <option value="config">Configuration Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Storage Location</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="local">Local Storage</option>
                  <option value="aws">AWS S3</option>
                  <option value="azure">Azure Blob</option>
                  <option value="google">Google Drive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Retention Period</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="encrypt"
                  className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <label htmlFor="encrypt" className="text-sm text-gray-400">
                  Enable encryption
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="compress"
                  className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <label htmlFor="compress" className="text-sm text-gray-400">
                  Enable compression
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Start Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && selectedBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Restore from Backup</h3>
              <button
                onClick={() => setShowRestoreModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-750 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Selected Backup</h4>
                <p className="text-gray-400 text-sm">{selectedBackup.name}</p>
                <p className="text-gray-400 text-sm">
                  {selectedBackup.size} • {selectedBackup.endTime ? new Date(selectedBackup.endTime).toLocaleString() : 'In progress'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Restore Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="full">Full System Restore</option>
                  <option value="selective">Selective Restore</option>
                  <option value="database">Database Only</option>
                  <option value="files">Files Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Location</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="original">Original Location</option>
                  <option value="alternate">Alternate Location</option>
                  <option value="test">Test Environment</option>
                </select>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">Warning</p>
                    <p className="text-yellow-300 text-sm">
                      This operation will overwrite existing data. Make sure to backup current data before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                Start Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBackupRecovery;
