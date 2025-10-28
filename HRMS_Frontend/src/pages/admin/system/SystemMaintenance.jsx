import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Server, 
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Cpu,
  Search,
  Wifi,
  Lock,
  Unlock,
  Play,
  Pause,
  Square,
  RotateCcw,
  FileText,
  Calendar,
  User,
  Users,
  Bell,
  Mail,
  Phone,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  XCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Code,
  Terminal,
  Bug,
  Zap,
  Target,
  Flag,
  Layers,
  Package,
  Wrench,
  Cog,
  Power,
  PowerOff
} from 'lucide-react';

// Mock data for system maintenance
const mockMaintenanceData = {
  systemHealth: {
    overall: 'Good',
    uptime: '99.8%',
    lastMaintenance: '2024-02-10',
    nextScheduled: '2024-02-25'
  },
  systemStats: {
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkLatency: 12
  },
  maintenanceTasks: [
    {
      id: 1,
      title: 'Database Optimization',
      description: 'Optimize database queries and rebuild indexes for better performance',
      type: 'Database',
      priority: 'High',
      status: 'Scheduled',
      scheduledDate: '2024-02-25',
      estimatedDuration: '2 hours',
      assignedTo: 'System Admin',
      category: 'Performance',
      impact: 'Medium',
      lastRun: '2024-01-25',
      frequency: 'Monthly'
    },
    {
      id: 2,
      title: 'Security Patch Update',
      description: 'Apply latest security patches to all system components',
      type: 'Security',
      priority: 'Critical',
      status: 'In Progress',
      scheduledDate: '2024-02-20',
      estimatedDuration: '4 hours',
      assignedTo: 'Security Team',
      category: 'Security',
      impact: 'High',
      lastRun: '2024-01-20',
      frequency: 'As Needed'
    },
    {
      id: 3,
      title: 'Log File Cleanup',
      description: 'Archive and clean up old log files to free up disk space',
      type: 'Maintenance',
      priority: 'Medium',
      status: 'Completed',
      scheduledDate: '2024-02-15',
      estimatedDuration: '1 hour',
      assignedTo: 'System Admin',
      category: 'Storage',
      impact: 'Low',
      lastRun: '2024-02-15',
      frequency: 'Weekly'
    },
    {
      id: 4,
      title: 'Backup Verification',
      description: 'Verify integrity of system backups and test restore procedures',
      type: 'Backup',
      priority: 'High',
      status: 'Pending',
      scheduledDate: '2024-02-22',
      estimatedDuration: '3 hours',
      assignedTo: 'Backup Team',
      category: 'Data Protection',
      impact: 'Low',
      lastRun: '2024-01-22',
      frequency: 'Monthly'
    }
  ],
  systemServices: [
    { id: 1, name: 'Web Server', status: 'Running', uptime: '15 days', cpu: 25, memory: 512 },
    { id: 2, name: 'Database Server', status: 'Running', uptime: '15 days', cpu: 45, memory: 2048 },
    { id: 3, name: 'Authentication Service', status: 'Running', uptime: '15 days', cpu: 15, memory: 256 },
    { id: 4, name: 'File Storage Service', status: 'Running', uptime: '15 days', cpu: 10, memory: 128 },
    { id: 5, name: 'Email Service', status: 'Warning', uptime: '2 days', cpu: 35, memory: 384 },
    { id: 6, name: 'Notification Service', status: 'Running', uptime: '15 days', cpu: 8, memory: 64 }
  ],
  systemUpdates: [
    {
      id: 1,
      component: 'HRMS Core',
      currentVersion: '2.4.1',
      availableVersion: '2.5.0',
      updateType: 'Major',
      releaseDate: '2024-02-18',
      size: '125 MB',
      critical: false,
      description: 'New features and performance improvements'
    },
    {
      id: 2,
      component: 'Security Module',
      currentVersion: '1.8.3',
      availableVersion: '1.8.4',
      updateType: 'Patch',
      releaseDate: '2024-02-20',
      size: '15 MB',
      critical: true,
      description: 'Critical security fixes'
    },
    {
      id: 3,
      component: 'Reporting Engine',
      currentVersion: '3.2.1',
      availableVersion: '3.3.0',
      updateType: 'Minor',
      releaseDate: '2024-02-16',
      size: '45 MB',
      critical: false,
      description: 'Enhanced reporting capabilities'
    }
  ],
  backupStatus: [
    { id: 1, type: 'Full Backup', lastRun: '2024-02-18 02:00', status: 'Success', size: '2.4 GB', duration: '45 min' },
    { id: 2, type: 'Incremental Backup', lastRun: '2024-02-19 02:00', status: 'Success', size: '156 MB', duration: '8 min' },
    { id: 3, type: 'Database Backup', lastRun: '2024-02-19 03:00', status: 'Success', size: '890 MB', duration: '15 min' },
    { id: 4, type: 'Configuration Backup', lastRun: '2024-02-19 01:00', status: 'Success', size: '12 MB', duration: '2 min' }
  ],
  maintenanceHistory: [
    { id: 1, task: 'Database Optimization', date: '2024-01-25', duration: '2h 15m', status: 'Completed', impact: 'None' },
    { id: 2, task: 'Security Update', date: '2024-01-20', duration: '3h 45m', status: 'Completed', impact: '15min downtime' },
    { id: 3, task: 'Log Cleanup', date: '2024-01-15', duration: '45m', status: 'Completed', impact: 'None' },
    { id: 4, task: 'Backup Verification', date: '2024-01-10', duration: '2h 30m', status: 'Completed', impact: 'None' }
  ],
  recentActivity: [
    { id: 1, action: 'Security patch applied to authentication service', user: 'System', time: '2 hours ago' },
    { id: 2, action: 'Database backup completed successfully', user: 'Backup Service', time: '4 hours ago' },
    { id: 3, action: 'Log cleanup task scheduled', user: 'Admin', time: '6 hours ago' },
    { id: 4, action: 'System health check performed', user: 'Monitor Service', time: '8 hours ago' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle, trend }) => {
  const colorClasses = {
    green: 'bg-green-900 text-green-300 border-green-700',
    blue: 'bg-blue-900 text-blue-300 border-blue-700',
    yellow: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    red: 'bg-red-900 text-red-300 border-red-700',
    purple: 'bg-purple-900 text-purple-300 border-purple-700',
    indigo: 'bg-indigo-900 text-indigo-300 border-indigo-700'
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <ArrowUp size={12} className="text-green-400" />
              ) : trend === 'down' ? (
                <ArrowDown size={12} className="text-red-400" />
              ) : (
                <Minus size={12} className="text-gray-400" />
              )}
              <span className={`text-xs ${
                trend === 'up' ? 'text-green-400' : 
                trend === 'down' ? 'text-red-400' : 
                'text-gray-400'
              }`}>
                {trend === 'up' ? '+5%' : trend === 'down' ? '-2%' : '0%'} from last week
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

const ProgressBar = ({ value, max = 100, color = 'blue' }) => {
  const percentage = (value / max) * 100;
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default function SystemMaintenance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = () => {
    setModalType('create-task');
    setShowModal(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setModalType('view-task');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'bg-green-900 text-green-300';
      case 'Completed': return 'bg-green-900 text-green-300';
      case 'Success': return 'bg-green-900 text-green-300';
      case 'In Progress': return 'bg-blue-900 text-blue-300';
      case 'Scheduled': return 'bg-yellow-900 text-yellow-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      case 'Warning': return 'bg-orange-900 text-orange-300';
      case 'Failed': return 'bg-red-900 text-red-300';
      case 'Error': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-900 text-red-300';
      case 'High': return 'bg-orange-900 text-orange-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Database': return <Database size={16} />;
      case 'Security': return <Shield size={16} />;
      case 'Maintenance': return <Settings size={16} />;
      case 'Backup': return <HardDrive size={16} />;
      case 'Update': return <Download size={16} />;
      default: return <Wrench size={16} />;
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-blue-400';
      case 'Fair': return 'text-yellow-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Maintenance</h1>
          <p className="text-gray-400 text-sm">Monitor system health and manage maintenance tasks</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Report
          </button>
          <button 
            onClick={handleCreateTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            Schedule Task
          </button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="System Health"
          value={mockMaintenanceData.systemHealth.overall}
          icon={<Activity />}
          color="green"
          subtitle={`Uptime: ${mockMaintenanceData.systemHealth.uptime}`}
          trend="up"
        />
        <StatCard
          title="CPU Usage"
          value={`${mockMaintenanceData.systemStats.cpuUsage}%`}
          icon={<Cpu />}
          color="blue"
          subtitle="Average load"
          trend="stable"
        />
        <StatCard
          title="Memory Usage"
          value={`${mockMaintenanceData.systemStats.memoryUsage}%`}
          icon={<HardDrive />}
          color="yellow"
          subtitle="RAM utilization"
          trend="up"
        />
        <StatCard
          title="Disk Usage"
          value={`${mockMaintenanceData.systemStats.diskUsage}%`}
          icon={<HardDrive />}
          color="red"
          subtitle="Storage capacity"
          trend="up"
        />
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Main Panel */}
        <div className="flex-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: Activity },
                  { id: 'tasks', label: 'Maintenance Tasks', icon: Settings },
                  { id: 'services', label: 'System Services', icon: Server },
                  { id: 'updates', label: 'System Updates', icon: Download },
                  { id: 'backups', label: 'Backups', icon: HardDrive }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Performance */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">System Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">CPU Usage</span>
                          <span className="text-sm text-white">{mockMaintenanceData.systemStats.cpuUsage}%</span>
                        </div>
                        <ProgressBar value={mockMaintenanceData.systemStats.cpuUsage} color="blue" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Memory Usage</span>
                          <span className="text-sm text-white">{mockMaintenanceData.systemStats.memoryUsage}%</span>
                        </div>
                        <ProgressBar value={mockMaintenanceData.systemStats.memoryUsage} color="yellow" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Disk Usage</span>
                          <span className="text-sm text-white">{mockMaintenanceData.systemStats.diskUsage}%</span>
                        </div>
                        <ProgressBar value={mockMaintenanceData.systemStats.diskUsage} color="red" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Network Latency</span>
                          <span className="text-sm text-white">{mockMaintenanceData.systemStats.networkLatency}ms</span>
                        </div>
                        <ProgressBar value={mockMaintenanceData.systemStats.networkLatency} max={100} color="green" />
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Maintenance */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Upcoming Maintenance</h3>
                    <div className="space-y-3">
                      {mockMaintenanceData.maintenanceTasks
                        .filter(task => task.status === 'Scheduled' || task.status === 'Pending')
                        .slice(0, 4)
                        .map((task) => (
                        <div key={task.id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(task.type)}
                              <h4 className="font-medium text-white text-sm">{task.title}</h4>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{formatDate(task.scheduledDate)}</span>
                            <span>{task.estimatedDuration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Priorities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={16} />
                    Schedule Task
                  </button>
                </div>

                <div className="space-y-4">
                  {mockMaintenanceData.maintenanceTasks.map((task) => (
                    <div key={task.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getTypeIcon(task.type)}
                            <h3 className="text-lg font-medium text-white">{task.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{task.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Scheduled Date</p>
                              <p className="text-white">{formatDate(task.scheduledDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Duration</p>
                              <p className="text-white">{task.estimatedDuration}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Assigned To</p>
                              <p className="text-white">{task.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Impact</p>
                              <p className="text-white">{task.impact}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewTask(task)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Play size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Services Tab */}
            {activeTab === 'services' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">System Services</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <RefreshCw size={16} />
                    Refresh Status
                  </button>
                </div>

                <div className="space-y-4">
                  {mockMaintenanceData.systemServices.map((service) => (
                    <div key={service.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Server size={20} className="text-blue-400" />
                            <div>
                              <h4 className="text-lg font-medium text-white">{service.name}</h4>
                              <p className="text-sm text-gray-400">Uptime: {service.uptime}</p>
                            </div>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-400">CPU</p>
                            <p className="text-white font-medium">{service.cpu}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Memory</p>
                            <p className="text-white font-medium">{service.memory} MB</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Play size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Pause size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <RotateCcw size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Settings size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Updates Tab */}
            {activeTab === 'updates' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Available Updates</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                      <RefreshCw size={16} />
                      Check Updates
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download size={16} />
                      Install All
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockMaintenanceData.systemUpdates.map((update) => (
                    <div key={update.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package size={20} className="text-blue-400" />
                            <h4 className="text-lg font-medium text-white">{update.component}</h4>
                            {update.critical && (
                              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-red-900 text-red-300">
                                Critical
                              </span>
                            )}
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">
                              {update.updateType}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{update.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Current Version</p>
                              <p className="text-white">{update.currentVersion}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Available Version</p>
                              <p className="text-white">{update.availableVersion}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Release Date</p>
                              <p className="text-white">{formatDate(update.releaseDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Size</p>
                              <p className="text-white">{update.size}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Install
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Backups Tab */}
            {activeTab === 'backups' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Backup Status</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                      <RefreshCw size={16} />
                      Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Play size={16} />
                      Run Backup
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockMaintenanceData.backupStatus.map((backup) => (
                    <div key={backup.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <HardDrive size={20} className="text-green-400" />
                          <div>
                            <h4 className="text-lg font-medium text-white">{backup.type}</h4>
                            <p className="text-sm text-gray-400">Last run: {backup.lastRun}</p>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(backup.status)}`}>
                            {backup.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Size</p>
                            <p className="text-white font-medium">{backup.size}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Duration</p>
                            <p className="text-white font-medium">{backup.duration}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Play size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Download size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                              <Settings size={16} />
                            </button>
                          </div>
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
        <div className="w-80 space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Plus className="h-4 w-4" />
                <span>Schedule Maintenance</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <RefreshCw className="h-4 w-4" />
                <span>System Health Check</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Install Updates</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <HardDrive className="h-4 w-4" />
                <span>Run Backup</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Overall Health</span>
                <span className={`font-medium ${getHealthColor(mockMaintenanceData.systemHealth.overall)}`}>
                  {mockMaintenanceData.systemHealth.overall}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">System Uptime</span>
                <span className="text-green-400 font-medium">{mockMaintenanceData.systemHealth.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Last Maintenance</span>
                <span className="text-white text-sm">{formatDate(mockMaintenanceData.systemHealth.lastMaintenance)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Next Scheduled</span>
                <span className="text-yellow-400 text-sm">{formatDate(mockMaintenanceData.systemHealth.nextScheduled)}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockMaintenanceData.recentActivity.map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="text-gray-300">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-500 text-xs">{activity.user}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {modalType === 'create-task' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Schedule Maintenance Task</h3>
                  <p className="text-gray-400 mb-6">Create a new maintenance task for the system.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Schedule Task
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-task' && selectedTask && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Task Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(selectedTask.type)}
                      <div>
                        <h4 className="font-medium text-white">{selectedTask.title}</h4>
                        <p className="text-sm text-gray-400">{selectedTask.category}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p className="text-white">{selectedTask.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Priority</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                          {selectedTask.priority}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTask.status)}`}>
                          {selectedTask.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Assigned To</p>
                        <p className="text-white">{selectedTask.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Scheduled Date</p>
                        <p className="text-white">{formatDate(selectedTask.scheduledDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Duration</p>
                        <p className="text-white">{selectedTask.estimatedDuration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Impact</p>
                        <p className="text-white">{selectedTask.impact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Frequency</p>
                        <p className="text-white">{selectedTask.frequency}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Description</p>
                      <p className="text-gray-300 text-sm bg-gray-900 p-3 rounded">{selectedTask.description}</p>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit Task
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Start Task
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}