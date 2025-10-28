import React, { useState } from 'react';
import { Search, Filter, Eye, Ban, AlertTriangle, MessageSquare, Users, Clock, Shield, Download, RefreshCw } from 'lucide-react';

const ChatModeration = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Mock data for chat messages
  const mockMessages = [
    {
      id: 1,
      sender: 'John Doe',
      department: 'Engineering',
      message: 'Hey team, can we discuss the new project requirements?',
      timestamp: '2024-01-15 10:30 AM',
      channel: 'General',
      flagged: false,
      severity: 'low',
      reports: 0
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      department: 'Marketing',
      message: 'This is completely unacceptable behavior from management!',
      timestamp: '2024-01-15 09:45 AM',
      channel: 'HR-Discussion',
      flagged: true,
      severity: 'high',
      reports: 3
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      department: 'Sales',
      message: 'Great work on the presentation yesterday!',
      timestamp: '2024-01-15 08:15 AM',
      channel: 'Sales-Team',
      flagged: false,
      severity: 'low',
      reports: 0
    },
    {
      id: 4,
      sender: 'Emily Chen',
      department: 'Design',
      message: 'Can someone help me with the design guidelines?',
      timestamp: '2024-01-15 07:30 AM',
      channel: 'Design-Help',
      flagged: false,
      severity: 'low',
      reports: 0
    },
    {
      id: 5,
      sender: 'David Brown',
      department: 'Finance',
      message: 'I think we need to reconsider our budget allocation',
      timestamp: '2024-01-14 04:20 PM',
      channel: 'Finance-Planning',
      flagged: true,
      severity: 'medium',
      reports: 1
    }
  ];

  // Mock data for flagged users
  const mockFlaggedUsers = [
    {
      id: 1,
      name: 'Sarah Wilson',
      department: 'Marketing',
      violations: 5,
      lastViolation: '2024-01-15',
      status: 'warning',
      joinDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'David Brown',
      department: 'Finance',
      violations: 2,
      lastViolation: '2024-01-14',
      status: 'monitored',
      joinDate: '2023-08-20'
    }
  ];

  // Mock data for moderation stats
  const moderationStats = {
    totalMessages: 1247,
    flaggedMessages: 23,
    resolvedReports: 18,
    activeReports: 5,
    bannedUsers: 2,
    warningsSent: 12
  };

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last week
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
      low: 'bg-green-500/10 text-green-400 border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      high: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      warning: 'bg-red-500/10 text-red-400 border-red-500/20',
      monitored: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      active: 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAction = (message, action) => {
    setSelectedMessage(message);
    setShowActionModal(true);
  };

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'flagged' && message.flagged) ||
                         (selectedFilter === 'reports' && message.reports > 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Chat Moderation</h1>
            <p className="text-gray-400 mt-2">Monitor and moderate workplace communications</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Total Messages"
            value={moderationStats.totalMessages.toLocaleString()}
            icon={MessageSquare}
            color="blue"
            trend={12}
          />
          <StatCard
            title="Flagged Messages"
            value={moderationStats.flaggedMessages}
            icon={AlertTriangle}
            color="yellow"
            trend={-5}
          />
          <StatCard
            title="Active Reports"
            value={moderationStats.activeReports}
            icon={Eye}
            color="red"
            trend={8}
          />
          <StatCard
            title="Resolved Reports"
            value={moderationStats.resolvedReports}
            icon={Shield}
            color="green"
            trend={15}
          />
          <StatCard
            title="Banned Users"
            value={moderationStats.bannedUsers}
            icon={Ban}
            color="red"
          />
          <StatCard
            title="Warnings Sent"
            value={moderationStats.warningsSent}
            icon={AlertTriangle}
            color="orange"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'users', label: 'Flagged Users', icon: Users },
            { id: 'reports', label: 'Reports', icon: AlertTriangle }
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
            {activeTab === 'messages' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search messages or users..."
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
                      <option value="all">All Messages</option>
                      <option value="flagged">Flagged Only</option>
                      <option value="reports">With Reports</option>
                    </select>
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                {/* Messages Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Channel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reports</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredMessages.map((message) => (
                        <tr key={message.id} className={`hover:bg-gray-750 ${message.flagged ? 'bg-red-500/5' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{message.sender}</div>
                              <div className="text-sm text-gray-400">{message.department}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white max-w-xs truncate">{message.message}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300">{message.channel}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {message.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <SeverityBadge severity={message.severity} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm ${message.reports > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                              {message.reports}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAction(message, 'view')}
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              {message.flagged && (
                                <button
                                  onClick={() => handleAction(message, 'moderate')}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Ban className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Flagged Users</h3>
                  <p className="text-gray-400 text-sm mt-1">Users with moderation violations</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Violations</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Violation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {mockFlaggedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.department}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-red-400 font-medium">{user.violations}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {user.lastViolation}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={user.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-indigo-400 hover:text-indigo-300">
                                View Details
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                Take Action
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Warning
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                  Temporary Ban
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Message flagged</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Warning sent</p>
                    <p className="text-xs text-gray-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Report resolved</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Moderation Guidelines */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Guidelines</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Review flagged content within 24 hours</p>
                <p>• Document all moderation actions</p>
                <p>• Escalate severe violations to HR</p>
                <p>• Maintain user privacy standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Moderation Action</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Action Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option>Send Warning</option>
                  <option>Delete Message</option>
                  <option>Temporary Ban</option>
                  <option>Permanent Ban</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Reason</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows="3"
                  placeholder="Enter reason for moderation action..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModeration;
