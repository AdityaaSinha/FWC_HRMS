import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Eye, Download, Upload, Clock, CheckCircle, XCircle, AlertCircle, Users, Search, Filter, MoreHorizontal, BookOpen, Shield, Briefcase, Heart, Globe, Settings, Archive, Star, Calendar, User } from 'lucide-react';

const CompanyPolicies = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Mock policy data
  const policies = [
    {
      id: 1,
      title: 'Code of Conduct',
      description: 'Guidelines for professional behavior and ethical standards',
      category: 'Ethics',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-01-10',
      author: 'HR Department',
      approvedBy: 'CEO',
      effectiveDate: '2024-01-15',
      reviewDate: '2024-07-15',
      acknowledgments: 245,
      totalEmployees: 250,
      priority: 'high',
      tags: ['ethics', 'conduct', 'mandatory']
    },
    {
      id: 2,
      title: 'Remote Work Policy',
      description: 'Guidelines and requirements for remote work arrangements',
      category: 'Work Arrangements',
      status: 'active',
      version: '1.3',
      lastUpdated: '2024-01-08',
      author: 'Operations Team',
      approvedBy: 'COO',
      effectiveDate: '2024-01-10',
      reviewDate: '2024-04-10',
      acknowledgments: 198,
      totalEmployees: 250,
      priority: 'medium',
      tags: ['remote', 'work', 'flexibility']
    },
    {
      id: 3,
      title: 'Data Privacy and Security',
      description: 'Comprehensive data protection and security protocols',
      category: 'Security',
      status: 'active',
      version: '3.0',
      lastUpdated: '2024-01-05',
      author: 'IT Security Team',
      approvedBy: 'CTO',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-06-01',
      acknowledgments: 250,
      totalEmployees: 250,
      priority: 'high',
      tags: ['security', 'privacy', 'compliance', 'mandatory']
    },
    {
      id: 4,
      title: 'Anti-Harassment Policy',
      description: 'Zero-tolerance policy for harassment and discrimination',
      category: 'HR',
      status: 'active',
      version: '1.8',
      lastUpdated: '2023-12-20',
      author: 'HR Department',
      approvedBy: 'CEO',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-12-01',
      acknowledgments: 248,
      totalEmployees: 250,
      priority: 'high',
      tags: ['harassment', 'discrimination', 'mandatory']
    },
    {
      id: 5,
      title: 'Social Media Guidelines',
      description: 'Guidelines for professional social media usage',
      category: 'Communications',
      status: 'draft',
      version: '1.0',
      lastUpdated: '2024-01-12',
      author: 'Marketing Team',
      approvedBy: null,
      effectiveDate: null,
      reviewDate: null,
      acknowledgments: 0,
      totalEmployees: 250,
      priority: 'low',
      tags: ['social media', 'communications', 'guidelines']
    },
    {
      id: 6,
      title: 'Travel and Expense Policy',
      description: 'Guidelines for business travel and expense reimbursement',
      category: 'Finance',
      status: 'under_review',
      version: '2.2',
      lastUpdated: '2024-01-14',
      author: 'Finance Team',
      approvedBy: null,
      effectiveDate: null,
      reviewDate: null,
      acknowledgments: 0,
      totalEmployees: 250,
      priority: 'medium',
      tags: ['travel', 'expenses', 'reimbursement']
    }
  ];

  // Mock policy categories
  const categories = [
    { id: 'ethics', name: 'Ethics & Compliance', icon: Shield, count: 3, color: 'red' },
    { id: 'hr', name: 'Human Resources', icon: Users, count: 5, color: 'blue' },
    { id: 'security', name: 'Security & Privacy', icon: Shield, count: 4, color: 'purple' },
    { id: 'work', name: 'Work Arrangements', icon: Briefcase, count: 2, color: 'green' },
    { id: 'finance', name: 'Finance & Operations', icon: Globe, count: 3, color: 'yellow' },
    { id: 'communications', name: 'Communications', icon: BookOpen, count: 2, color: 'indigo' }
  ];

  // Mock statistics
  const stats = [
    { title: 'Total Policies', value: '24', icon: FileText, color: 'blue', change: '+3' },
    { title: 'Active Policies', value: '18', icon: CheckCircle, color: 'green', change: '+2' },
    { title: 'Pending Review', value: '4', icon: Clock, color: 'yellow', change: '+1' },
    { title: 'Acknowledgment Rate', value: '94.2%', icon: Users, color: 'purple', change: '+2.1%' }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Policy Updated',
      policy: 'Remote Work Policy',
      user: 'Sarah Johnson',
      timestamp: '2024-01-15 10:30 AM',
      type: 'update'
    },
    {
      id: 2,
      action: 'Policy Approved',
      policy: 'Data Privacy and Security',
      user: 'John Smith (CTO)',
      timestamp: '2024-01-15 09:15 AM',
      type: 'approval'
    },
    {
      id: 3,
      action: 'New Policy Created',
      policy: 'Social Media Guidelines',
      user: 'Marketing Team',
      timestamp: '2024-01-14 04:20 PM',
      type: 'creation'
    },
    {
      id: 4,
      action: 'Policy Acknowledged',
      policy: 'Code of Conduct',
      user: '15 employees',
      timestamp: '2024-01-14 02:45 PM',
      type: 'acknowledgment'
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
        case 'archived': return <Archive className="h-3 w-3" />;
        default: return <FileText className="h-3 w-3" />;
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'text-red-400';
        case 'medium': return 'text-yellow-400';
        case 'low': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    const acknowledgmentRate = policy.totalEmployees > 0 ? 
      Math.round((policy.acknowledgments / policy.totalEmployees) * 100) : 0;

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
              {policy.priority === 'high' && (
                <Star className={`h-4 w-4 ${getPriorityColor(policy.priority)}`} />
              )}
            </div>
            <p className="text-gray-400 text-sm mb-3">{policy.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{policy.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
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
            <p className="text-white text-lg font-semibold">{acknowledgmentRate}%</p>
            <p className="text-gray-400 text-xs">Acknowledged</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-semibold">{policy.acknowledgments}</p>
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

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'update': return <Edit className="h-4 w-4 text-blue-400" />;
        case 'approval': return <CheckCircle className="h-4 w-4 text-green-400" />;
        case 'creation': return <Plus className="h-4 w-4 text-purple-400" />;
        case 'acknowledgment': return <Users className="h-4 w-4 text-yellow-400" />;
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
    const matchesCategory = categoryFilter === 'all' || policy.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Company Policies</h1>
            <p className="text-gray-400">Manage and track organizational policies and procedures</p>
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
                  { id: 'policies', label: 'All Policies', icon: BookOpen },
                  { id: 'categories', label: 'Categories', icon: Settings },
                  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
                  { id: 'analytics', label: 'Analytics', icon: Globe }
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Policy Distribution Chart */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Policy Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Policy distribution chart will be displayed here</p>
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
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Plus className="h-6 w-6 text-indigo-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Create New Policy</p>
                      <p className="text-gray-400 text-sm">Draft a new company policy</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Upload className="h-6 w-6 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Import Policy</p>
                      <p className="text-gray-400 text-sm">Upload existing policy document</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Settings className="h-6 w-6 text-purple-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Policy Settings</p>
                      <p className="text-gray-400 text-sm">Configure policy management</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === 'policies' && (
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
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="ethics">Ethics</option>
                    <option value="hr">HR</option>
                    <option value="security">Security</option>
                    <option value="work">Work Arrangements</option>
                    <option value="finance">Finance</option>
                    <option value="communications">Communications</option>
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

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition cursor-pointer">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 bg-${category.color}-500/10 rounded-lg`}>
                          <category.icon className={`h-6 w-6 text-${category.color}-400`} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{category.name}</h4>
                          <p className="text-gray-400 text-sm">{category.count} policies</p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                        View Policies
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approvals Tab */}
            {activeTab === 'approvals' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Policy Approvals</h3>
                  <p className="text-gray-400 mb-6">Manage policy approval workflows and pending reviews</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    View Pending Approvals
                  </button>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Policy Analytics</h3>
                  <p className="text-gray-400 mb-6">Track policy engagement, acknowledgments, and compliance metrics</p>
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
                <span>Create New Policy</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Upload className="h-4 w-4" />
                <span>Import Policy</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Policies</span>
              </button>
            </div>
          </div>

          {/* Policy Categories */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Policy Categories</h3>
            <div className="space-y-3">
              {categories.slice(0, 4).map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <category.icon className={`h-4 w-4 text-${category.color}-400`} />
                    <span className="text-gray-300 text-sm">{category.name}</span>
                  </div>
                  <span className="text-white text-sm">{category.count}</span>
                </div>
              ))}
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

          {/* Compliance Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Overall Compliance</span>
                <span className="flex items-center space-x-1 text-green-400 text-sm">
                  <CheckCircle className="h-3 w-3" />
                  <span>94.2%</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Pending Acknowledgments</span>
                <span className="text-yellow-400 text-sm">15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Overdue Reviews</span>
                <span className="text-red-400 text-sm">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPolicies;
