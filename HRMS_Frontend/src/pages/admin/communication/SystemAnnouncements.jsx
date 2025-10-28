import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  Bell,
  Send,
  Save,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Target,
  Globe,
  Building,
  UserCheck,
  BarChart3
} from 'lucide-react';

const SystemAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      content: 'The HRMS system will undergo scheduled maintenance on Saturday, January 20th from 2:00 AM to 6:00 AM EST.',
      type: 'maintenance',
      priority: 'high',
      status: 'active',
      targetAudience: 'all_employees',
      createdBy: 'Admin',
      createdAt: '2024-01-15T10:30:00Z',
      scheduledAt: '2024-01-20T02:00:00Z',
      expiresAt: '2024-01-21T06:00:00Z',
      views: 1247,
      acknowledged: 892
    },
    {
      id: 2,
      title: 'New Leave Policy Updates',
      content: 'We have updated our leave policy to include additional mental health days. Please review the updated policy in the employee handbook.',
      type: 'policy',
      priority: 'medium',
      status: 'active',
      targetAudience: 'all_employees',
      createdBy: 'HR Manager',
      createdAt: '2024-01-14T14:20:00Z',
      scheduledAt: '2024-01-15T09:00:00Z',
      expiresAt: '2024-02-15T23:59:59Z',
      views: 2156,
      acknowledged: 1834
    },
    {
      id: 3,
      title: 'Holiday Schedule 2024',
      content: 'The official holiday schedule for 2024 has been published. Please check your calendar and plan your time off accordingly.',
      type: 'general',
      priority: 'low',
      status: 'scheduled',
      targetAudience: 'all_employees',
      createdBy: 'Admin',
      createdAt: '2024-01-13T16:45:00Z',
      scheduledAt: '2024-01-25T08:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      views: 0,
      acknowledged: 0
    },
    {
      id: 4,
      title: 'Security Training Mandatory',
      content: 'All employees must complete the cybersecurity training module by January 31st. Failure to complete may result in system access restrictions.',
      type: 'security',
      priority: 'high',
      status: 'active',
      targetAudience: 'all_employees',
      createdBy: 'Security Team',
      createdAt: '2024-01-12T11:15:00Z',
      scheduledAt: '2024-01-13T08:00:00Z',
      expiresAt: '2024-01-31T23:59:59Z',
      views: 1876,
      acknowledged: 1234
    },
    {
      id: 5,
      title: 'Welcome New Team Members',
      content: 'Please join us in welcoming our new team members who joined this month. Introduction sessions will be held in the main conference room.',
      type: 'general',
      priority: 'low',
      status: 'expired',
      targetAudience: 'all_employees',
      createdBy: 'HR Manager',
      createdAt: '2024-01-01T09:00:00Z',
      scheduledAt: '2024-01-02T09:00:00Z',
      expiresAt: '2024-01-10T23:59:59Z',
      views: 987,
      acknowledged: 756
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend = null }) => {
    const colorClasses = {
      indigo: 'text-indigo-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      red: 'text-red-400',
      blue: 'text-blue-400'
    };

    return (
      <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend && (
              <p className={`text-xs mt-1 ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: 'bg-green-900 text-green-300 border-green-700', icon: CheckCircle },
      scheduled: { color: 'bg-blue-900 text-blue-300 border-blue-700', icon: Clock },
      expired: { color: 'bg-red-900 text-red-300 border-red-700', icon: XCircle },
      draft: { color: 'bg-yellow-900 text-yellow-300 border-yellow-700', icon: Edit }
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const priorityConfig = {
      high: { color: 'bg-red-900 text-red-300 border-red-700', icon: AlertCircle },
      medium: { color: 'bg-yellow-900 text-yellow-300 border-yellow-700', icon: AlertCircle },
      low: { color: 'bg-gray-900 text-gray-300 border-gray-700', icon: AlertCircle }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const TypeBadge = ({ type }) => {
    const typeConfig = {
      maintenance: { color: 'bg-orange-900 text-orange-300 border-orange-700', icon: Settings },
      policy: { color: 'bg-purple-900 text-purple-300 border-purple-700', icon: Building },
      security: { color: 'bg-red-900 text-red-300 border-red-700', icon: AlertCircle },
      general: { color: 'bg-blue-900 text-blue-300 border-blue-700', icon: Bell }
    };

    const config = typeConfig[type] || typeConfig.general;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || announcement.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Announcements</h1>
          <p className="text-gray-400">Manage and broadcast system-wide announcements</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Announcements"
          value="24"
          icon={Megaphone}
          color="indigo"
          trend={{ positive: true, value: '+3 this week' }}
        />
        <StatCard
          title="Active Announcements"
          value="8"
          icon={CheckCircle}
          color="green"
          trend={{ positive: false, value: '-2 from last week' }}
        />
        <StatCard
          title="Total Views"
          value="12.4K"
          icon={Eye}
          color="blue"
          trend={{ positive: true, value: '+15%' }}
        />
        <StatCard
          title="Acknowledgment Rate"
          value="87%"
          icon={UserCheck}
          color="yellow"
          trend={{ positive: true, value: '+5%' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Announcements List */}
        <div className="lg:col-span-3">
          <div className="bg-[#272B3F] rounded-lg border border-gray-700">
            {/* Search and Filters */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1E2132] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
                  </select>
                  
                  <button className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Announcements Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1E2132]">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Title</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Priority</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Views</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Acknowledged</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Created</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnnouncements.map((announcement) => (
                    <tr key={announcement.id} className="border-t border-gray-700 hover:bg-[#1E2132]/50">
                      <td className="p-4">
                        <div>
                          <h3 className="font-medium text-white mb-1">{announcement.title}</h3>
                          <p className="text-sm text-gray-400 truncate max-w-xs">
                            {announcement.content}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <TypeBadge type={announcement.type} />
                      </td>
                      <td className="p-4">
                        <PriorityBadge priority={announcement.priority} />
                      </td>
                      <td className="p-4">
                        <StatusBadge status={announcement.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-gray-300">
                          <Eye className="w-4 h-4 mr-1" />
                          {announcement.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-300">
                          {announcement.acknowledged}/{announcement.views}
                          <div className="text-xs text-gray-400">
                            ({Math.round((announcement.acknowledged / announcement.views) * 100)}%)
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-300">
                          {formatDate(announcement.createdAt)}
                        </div>
                        <div className="text-xs text-gray-400">
                          by {announcement.createdBy}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-indigo-400" />
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <Send className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Send Test Announcement</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <BarChart3 className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">View Analytics</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <Upload className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Bulk Import</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <Download className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Export Data</span>
              </button>
            </div>
          </div>

          {/* Announcement Types */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-indigo-400" />
              Announcement Types
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 text-orange-400 mr-3" />
                  <span className="text-white">Maintenance</span>
                </div>
                <span className="text-gray-400 text-sm">3</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-purple-400 mr-3" />
                  <span className="text-white">Policy</span>
                </div>
                <span className="text-gray-400 text-sm">8</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-3" />
                  <span className="text-white">Security</span>
                </div>
                <span className="text-gray-400 text-sm">5</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 text-blue-400 mr-3" />
                  <span className="text-white">General</span>
                </div>
                <span className="text-gray-400 text-sm">8</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-400" />
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">New announcement created</span>
                  <span className="text-gray-400">2m ago</span>
                </div>
                <p className="text-gray-400 text-xs">System Maintenance Scheduled</p>
              </div>
              
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">Announcement acknowledged</span>
                  <span className="text-gray-400">5m ago</span>
                </div>
                <p className="text-gray-400 text-xs">Security Training by 45 employees</p>
              </div>
              
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">Announcement expired</span>
                  <span className="text-gray-400">1h ago</span>
                </div>
                <p className="text-gray-400 text-xs">Welcome New Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnnouncements;
