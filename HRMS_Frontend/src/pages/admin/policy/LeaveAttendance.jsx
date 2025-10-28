import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Eye, Settings, CheckCircle, XCircle, AlertCircle, Search, Filter, MoreHorizontal, FileText, Award, TrendingUp, MapPin, Briefcase, Heart, Shield, Globe, User, Star } from 'lucide-react';

const LeaveAttendance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [policyTypeFilter, setPolicyTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Mock leave and attendance policies data
  const policies = [
    {
      id: 1,
      title: 'Annual Leave Policy',
      description: 'Guidelines for annual vacation leave entitlements and approval process',
      type: 'leave',
      category: 'Annual Leave',
      status: 'active',
      version: '3.2',
      lastUpdated: '2024-01-10',
      author: 'HR Department',
      approvedBy: 'HR Director',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-12-31',
      entitlement: '25 days',
      carryOver: '5 days max',
      applicableEmployees: 250,
      priority: 'high',
      tags: ['annual', 'vacation', 'mandatory']
    },
    {
      id: 2,
      title: 'Sick Leave Policy',
      description: 'Medical leave entitlements and documentation requirements',
      type: 'leave',
      category: 'Medical Leave',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-01-08',
      author: 'HR Department',
      approvedBy: 'HR Director',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-06-30',
      entitlement: '15 days',
      carryOver: 'No carry over',
      applicableEmployees: 250,
      priority: 'high',
      tags: ['medical', 'sick', 'mandatory']
    },
    {
      id: 3,
      title: 'Maternity/Paternity Leave',
      description: 'Parental leave policies and benefits for new parents',
      type: 'leave',
      category: 'Parental Leave',
      status: 'active',
      version: '1.8',
      lastUpdated: '2024-01-05',
      author: 'HR Department',
      approvedBy: 'CEO',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-07-01',
      entitlement: '16 weeks (maternity), 4 weeks (paternity)',
      carryOver: 'N/A',
      applicableEmployees: 250,
      priority: 'high',
      tags: ['parental', 'maternity', 'paternity', 'mandatory']
    },
    {
      id: 4,
      title: 'Remote Work Attendance',
      description: 'Attendance tracking and requirements for remote work arrangements',
      type: 'attendance',
      category: 'Remote Work',
      status: 'active',
      version: '2.0',
      lastUpdated: '2024-01-12',
      author: 'Operations Team',
      approvedBy: 'COO',
      effectiveDate: '2024-01-15',
      reviewDate: '2024-04-15',
      entitlement: 'Flexible hours',
      carryOver: 'N/A',
      applicableEmployees: 180,
      priority: 'medium',
      tags: ['remote', 'flexible', 'attendance']
    },
    {
      id: 5,
      title: 'Overtime Policy',
      description: 'Guidelines for overtime work approval and compensation',
      type: 'attendance',
      category: 'Overtime',
      status: 'active',
      version: '1.5',
      lastUpdated: '2024-01-14',
      author: 'HR Department',
      approvedBy: 'HR Director',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-06-01',
      entitlement: '1.5x regular rate',
      carryOver: 'N/A',
      applicableEmployees: 250,
      priority: 'medium',
      tags: ['overtime', 'compensation', 'approval']
    },
    {
      id: 6,
      title: 'Bereavement Leave',
      description: 'Compassionate leave for family bereavement',
      type: 'leave',
      category: 'Compassionate Leave',
      status: 'draft',
      version: '1.0',
      lastUpdated: '2024-01-16',
      author: 'HR Department',
      approvedBy: null,
      effectiveDate: null,
      reviewDate: null,
      entitlement: '5 days',
      carryOver: 'N/A',
      applicableEmployees: 250,
      priority: 'medium',
      tags: ['bereavement', 'compassionate', 'family']
    }
  ];

  // Mock leave types
  const leaveTypes = [
    { id: 'annual', name: 'Annual Leave', icon: Calendar, count: 3, color: 'blue', entitlement: '25 days' },
    { id: 'medical', name: 'Medical Leave', icon: Heart, count: 2, color: 'red', entitlement: '15 days' },
    { id: 'parental', name: 'Parental Leave', icon: Users, count: 1, color: 'purple', entitlement: '16 weeks' },
    { id: 'compassionate', name: 'Compassionate Leave', icon: Shield, count: 1, color: 'yellow', entitlement: '5 days' },
    { id: 'study', name: 'Study Leave', icon: Award, count: 1, color: 'green', entitlement: '10 days' },
    { id: 'unpaid', name: 'Unpaid Leave', icon: Clock, count: 1, color: 'gray', entitlement: 'Unlimited' }
  ];

  // Mock attendance policies
  const attendancePolicies = [
    { id: 'core_hours', name: 'Core Working Hours', icon: Clock, description: '9:00 AM - 5:00 PM', status: 'active' },
    { id: 'flexible', name: 'Flexible Hours', icon: TrendingUp, description: 'Flexible start/end times', status: 'active' },
    { id: 'remote', name: 'Remote Work', icon: Globe, description: 'Work from home policy', status: 'active' },
    { id: 'overtime', name: 'Overtime Rules', icon: Briefcase, description: 'Overtime approval process', status: 'active' }
  ];

  // Mock statistics
  const stats = [
    { title: 'Total Policies', value: '12', icon: FileText, color: 'blue', change: '+2' },
    { title: 'Leave Types', value: '8', icon: Calendar, color: 'green', change: '+1' },
    { title: 'Active Policies', value: '10', icon: CheckCircle, color: 'purple', change: '0' },
    { title: 'Avg Leave Days', value: '18.5', icon: TrendingUp, color: 'yellow', change: '+1.2' }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Policy Updated',
      policy: 'Remote Work Attendance',
      user: 'Operations Team',
      timestamp: '2024-01-16 11:30 AM',
      type: 'update'
    },
    {
      id: 2,
      action: 'New Policy Created',
      policy: 'Bereavement Leave',
      user: 'HR Department',
      timestamp: '2024-01-16 09:45 AM',
      type: 'creation'
    },
    {
      id: 3,
      action: 'Policy Approved',
      policy: 'Overtime Policy',
      user: 'HR Director',
      timestamp: '2024-01-15 02:20 PM',
      type: 'approval'
    },
    {
      id: 4,
      action: 'Leave Request',
      policy: 'Annual Leave Policy',
      user: '12 employees',
      timestamp: '2024-01-15 10:15 AM',
      type: 'request'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-green-400 text-sm mt-1">
              {change} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const PolicyCard = ({ policy }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-green-400 bg-green-400/10';
        case 'draft': return 'text-gray-400 bg-gray-400/10';
        case 'under_review': return 'text-yellow-400 bg-yellow-400/10';
        case 'archived': return 'text-red-400 bg-red-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'active': return <CheckCircle className="h-3 w-3" />;
        case 'draft': return <Edit className="h-3 w-3" />;
        case 'under_review': return <Clock className="h-3 w-3" />;
        case 'archived': return <XCircle className="h-3 w-3" />;
        default: return <FileText className="h-3 w-3" />;
      }
    };

    const getTypeColor = (type) => {
      switch (type) {
        case 'leave': return 'text-blue-400 bg-blue-400/10';
        case 'attendance': return 'text-purple-400 bg-purple-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'leave': return <Calendar className="h-3 w-3" />;
        case 'attendance': return <Clock className="h-3 w-3" />;
        default: return <FileText className="h-3 w-3" />;
      }
    };

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-white font-medium">{policy.title}</h3>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                {getStatusIcon(policy.status)}
                <span className="capitalize">{policy.status.replace('_', ' ')}</span>
              </span>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(policy.type)}`}>
                {getTypeIcon(policy.type)}
                <span className="capitalize">{policy.type}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{policy.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{policy.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>v{policy.version}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{policy.lastUpdated}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-white text-sm font-semibold">{policy.entitlement}</p>
            <p className="text-gray-400 text-xs">Entitlement</p>
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-semibold">{policy.applicableEmployees}</p>
            <p className="text-gray-400 text-xs">Employees</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">{policy.category}</p>
            <p className="text-gray-400 text-xs">Category</p>
          </div>
        </div>

        {/* Tags */}
        {policy.tags && policy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {policy.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const LeaveTypeCard = ({ leaveType }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition cursor-pointer">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 bg-${leaveType.color}-500/10 rounded-lg`}>
          <leaveType.icon className={`h-6 w-6 text-${leaveType.color}-400`} />
        </div>
        <div>
          <h4 className="text-white font-medium">{leaveType.name}</h4>
          <p className="text-gray-400 text-sm">{leaveType.entitlement}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{leaveType.count} policies</span>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
          Manage
        </button>
      </div>
    </div>
  );

  const AttendancePolicyCard = ({ policy }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <policy.icon className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm">{policy.name}</h4>
            <p className="text-gray-400 text-xs">{policy.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          policy.status === 'active' ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'
        }`}>
          {policy.status}
        </span>
      </div>
      <button className="w-full px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-500">
        Configure
      </button>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'update': return <Edit className="h-4 w-4 text-blue-400" />;
        case 'approval': return <CheckCircle className="h-4 w-4 text-green-400" />;
        case 'creation': return <Plus className="h-4 w-4 text-purple-400" />;
        case 'request': return <Calendar className="h-4 w-4 text-yellow-400" />;
        default: return <FileText className="h-4 w-4 text-gray-400" />;
      }
    };

    return (
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-gray-700 rounded-lg">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1">
          <p className="text-white text-sm">{activity.action}</p>
          <p className="text-gray-400 text-sm">{activity.policy}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-500 text-xs">{activity.user}</span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-500 text-xs">{activity.timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = policyTypeFilter === 'all' || policy.type === policyTypeFilter;
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Leave & Attendance Policies</h1>
            <p className="text-gray-400">Manage leave entitlements and attendance requirements</p>
          </div>
          <button
            onClick={() => setShowPolicyModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Policy</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
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
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'leave_policies', label: 'Leave Policies', icon: Calendar },
                  { id: 'attendance', label: 'Attendance', icon: Clock },
                  { id: 'leave_types', label: 'Leave Types', icon: Award },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Leave Distribution Chart */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Leave Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Leave distribution chart will be displayed here</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivities.slice(0, 4).map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Plus className="h-6 w-6 text-indigo-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Create Leave Policy</p>
                      <p className="text-gray-400 text-sm">Add new leave type or policy</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Settings className="h-6 w-6 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Configure Attendance</p>
                      <p className="text-gray-400 text-sm">Set attendance rules and tracking</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">View Analytics</p>
                      <p className="text-gray-400 text-sm">Analyze leave and attendance trends</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Leave Policies Tab */}
            {activeTab === 'leave_policies' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search policies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={policyTypeFilter}
                    onChange={(e) => setPolicyTypeFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    <option value="leave">Leave Policies</option>
                    <option value="attendance">Attendance Policies</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="under_review">Under Review</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Policies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredPolicies.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy} />
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attendancePolicies.map((policy) => (
                    <AttendancePolicyCard key={policy.id} policy={policy} />
                  ))}
                </div>
              </div>
            )}

            {/* Leave Types Tab */}
            {activeTab === 'leave_types' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaveTypes.map((leaveType) => (
                    <LeaveTypeCard key={leaveType.id} leaveType={leaveType} />
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Leave & Attendance Analytics</h3>
                  <p className="text-gray-400 mb-6">Track usage patterns, trends, and compliance metrics</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    View Analytics Dashboard
                  </button>
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
                <span>Create Leave Policy</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Settings className="h-4 w-4" />
                <span>Configure Attendance</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Award className="h-4 w-4" />
                <span>Manage Leave Types</span>
              </button>
            </div>
          </div>

          {/* Leave Types Summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Leave Types</h3>
            <div className="space-y-3">
              {leaveTypes.slice(0, 4).map((type) => (
                <div key={type.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <type.icon className={`h-4 w-4 text-${type.color}-400`} />
                    <span className="text-gray-300 text-sm">{type.name}</span>
                  </div>
                  <span className="text-white text-sm">{type.entitlement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Policy Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Active Policies</span>
                <span className="flex items-center space-x-1 text-green-400 text-sm">
                  <CheckCircle className="h-3 w-3" />
                  <span>10</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Draft Policies</span>
                <span className="text-yellow-400 text-sm">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Under Review</span>
                <span className="text-blue-400 text-sm">0</span>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {recentActivities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="text-gray-300">{activity.policy}</p>
                  <p className="text-gray-500 text-xs">{activity.action} • {activity.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveAttendance;
