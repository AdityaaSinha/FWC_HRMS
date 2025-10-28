import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Eye, Settings, CheckCircle, XCircle, AlertCircle, Search, Filter, MoreHorizontal, FileText, Award, TrendingUp, Target, Star, BarChart3, PieChart, Activity, User, Briefcase, Trophy, Zap, ArrowRight } from 'lucide-react';

const PerformanceCycles = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [cycleStatusFilter, setCycleStatusFilter] = useState('all');
  const [cycleTypeFilter, setCycleTypeFilter] = useState('all');
  const [showCycleModal, setShowCycleModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);

  // Mock performance cycles data
  const performanceCycles = [
    {
      id: 1,
      title: 'Annual Performance Review 2024',
      description: 'Comprehensive annual performance evaluation for all employees',
      type: 'annual',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      reviewPeriod: 'January 2024 - December 2024',
      participants: 250,
      completedReviews: 180,
      pendingReviews: 70,
      manager: 'HR Department',
      template: 'Standard Annual Review',
      goals: 5,
      competencies: 8,
      progress: 72,
      priority: 'high',
      tags: ['annual', 'comprehensive', 'mandatory']
    },
    {
      id: 2,
      title: 'Q1 2024 Quarterly Check-in',
      description: 'First quarter performance check-in and goal alignment',
      type: 'quarterly',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      reviewPeriod: 'January 2024 - March 2024',
      participants: 250,
      completedReviews: 250,
      pendingReviews: 0,
      manager: 'Department Heads',
      template: 'Quarterly Check-in',
      goals: 3,
      competencies: 5,
      progress: 100,
      priority: 'medium',
      tags: ['quarterly', 'check-in', 'goals']
    },
    {
      id: 3,
      title: 'Mid-Year Performance Review',
      description: 'Mid-year comprehensive performance assessment',
      type: 'mid-year',
      status: 'planning',
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      reviewPeriod: 'January 2024 - June 2024',
      participants: 250,
      completedReviews: 0,
      pendingReviews: 250,
      manager: 'HR Department',
      template: 'Mid-Year Review',
      goals: 4,
      competencies: 6,
      progress: 0,
      priority: 'high',
      tags: ['mid-year', 'assessment', 'development']
    },
    {
      id: 4,
      title: 'New Hire 90-Day Review',
      description: '90-day performance evaluation for new employees',
      type: 'probationary',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      reviewPeriod: '90 Days from Start Date',
      participants: 15,
      completedReviews: 8,
      pendingReviews: 7,
      manager: 'Direct Supervisors',
      template: 'Probationary Review',
      goals: 2,
      competencies: 4,
      progress: 53,
      priority: 'medium',
      tags: ['probationary', 'new-hire', '90-day']
    },
    {
      id: 5,
      title: 'Leadership Development Cycle',
      description: 'Performance cycle focused on leadership competencies',
      type: 'development',
      status: 'draft',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      reviewPeriod: 'March 2024 - August 2024',
      participants: 35,
      completedReviews: 0,
      pendingReviews: 35,
      manager: 'L&D Team',
      template: 'Leadership Assessment',
      goals: 6,
      competencies: 10,
      progress: 0,
      priority: 'medium',
      tags: ['leadership', 'development', 'competencies']
    },
    {
      id: 6,
      title: 'Project-Based Performance Review',
      description: 'Performance evaluation based on specific project outcomes',
      type: 'project',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      reviewPeriod: 'Project Duration',
      participants: 45,
      completedReviews: 20,
      pendingReviews: 25,
      manager: 'Project Managers',
      template: 'Project Review',
      goals: 3,
      competencies: 5,
      progress: 44,
      priority: 'medium',
      tags: ['project', 'outcome-based', 'team']
    }
  ];

  // Mock cycle types
  const cycleTypes = [
    { id: 'annual', name: 'Annual Review', icon: Calendar, count: 1, color: 'blue', duration: '12 months' },
    { id: 'quarterly', name: 'Quarterly Check-in', icon: BarChart3, count: 4, color: 'green', duration: '3 months' },
    { id: 'mid-year', name: 'Mid-Year Review', icon: Target, count: 1, color: 'purple', duration: '6 months' },
    { id: 'probationary', name: 'Probationary Review', icon: User, count: 1, color: 'yellow', duration: '90 days' },
    { id: 'development', name: 'Development Cycle', icon: Trophy, count: 1, color: 'red', duration: 'Variable' },
    { id: 'project', name: 'Project Review', icon: Briefcase, count: 1, color: 'indigo', duration: 'Project-based' }
  ];

  // Mock performance templates
  const performanceTemplates = [
    { id: 'standard', name: 'Standard Annual Review', icon: FileText, description: 'Comprehensive annual evaluation', usage: 85 },
    { id: 'quarterly', name: 'Quarterly Check-in', icon: Clock, description: 'Quick quarterly assessment', usage: 92 },
    { id: 'leadership', name: 'Leadership Assessment', icon: Trophy, description: 'Leadership competency evaluation', usage: 78 },
    { id: 'technical', name: 'Technical Skills Review', icon: Zap, description: 'Technical competency assessment', usage: 65 }
  ];

  // Mock statistics
  const stats = [
    { title: 'Active Cycles', value: '4', icon: Activity, color: 'blue', change: '+1' },
    { title: 'Total Participants', value: '595', icon: Users, color: 'green', change: '+25' },
    { title: 'Completed Reviews', value: '458', icon: CheckCircle, color: 'purple', change: '+180' },
    { title: 'Avg Completion Rate', value: '76%', icon: TrendingUp, color: 'yellow', change: '+5%' }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Cycle Started',
      cycle: 'Project-Based Performance Review',
      user: 'Project Managers',
      timestamp: '2024-01-16 10:30 AM',
      type: 'start'
    },
    {
      id: 2,
      action: 'Reviews Completed',
      cycle: 'Q1 2024 Quarterly Check-in',
      user: '25 employees',
      timestamp: '2024-01-16 09:15 AM',
      type: 'completion'
    },
    {
      id: 3,
      action: 'Cycle Created',
      cycle: 'Leadership Development Cycle',
      user: 'L&D Team',
      timestamp: '2024-01-15 03:45 PM',
      type: 'creation'
    },
    {
      id: 4,
      action: 'Template Updated',
      cycle: 'Standard Annual Review',
      user: 'HR Department',
      timestamp: '2024-01-15 11:20 AM',
      type: 'update'
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
              {change} from last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const CycleCard = ({ cycle }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-green-400 bg-green-400/10';
        case 'completed': return 'text-blue-400 bg-blue-400/10';
        case 'planning': return 'text-yellow-400 bg-yellow-400/10';
        case 'draft': return 'text-gray-400 bg-gray-400/10';
        case 'paused': return 'text-red-400 bg-red-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'active': return <Activity className="h-3 w-3" />;
        case 'completed': return <CheckCircle className="h-3 w-3" />;
        case 'planning': return <Clock className="h-3 w-3" />;
        case 'draft': return <Edit className="h-3 w-3" />;
        case 'paused': return <XCircle className="h-3 w-3" />;
        default: return <FileText className="h-3 w-3" />;
      }
    };

    const getTypeColor = (type) => {
      switch (type) {
        case 'annual': return 'text-blue-400 bg-blue-400/10';
        case 'quarterly': return 'text-green-400 bg-green-400/10';
        case 'mid-year': return 'text-purple-400 bg-purple-400/10';
        case 'probationary': return 'text-yellow-400 bg-yellow-400/10';
        case 'development': return 'text-red-400 bg-red-400/10';
        case 'project': return 'text-indigo-400 bg-indigo-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'annual': return <Calendar className="h-3 w-3" />;
        case 'quarterly': return <BarChart3 className="h-3 w-3" />;
        case 'mid-year': return <Target className="h-3 w-3" />;
        case 'probationary': return <User className="h-3 w-3" />;
        case 'development': return <Trophy className="h-3 w-3" />;
        case 'project': return <Briefcase className="h-3 w-3" />;
        default: return <FileText className="h-3 w-3" />;
      }
    };

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-white font-medium">{cycle.title}</h3>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cycle.status)}`}>
                {getStatusIcon(cycle.status)}
                <span className="capitalize">{cycle.status}</span>
              </span>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(cycle.type)}`}>
                {getTypeIcon(cycle.type)}
                <span className="capitalize">{cycle.type.replace('-', ' ')}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{cycle.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{cycle.reviewPeriod}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{cycle.participants} participants</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{cycle.manager}</span>
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

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className="text-white text-sm font-medium">{cycle.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${cycle.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-white text-sm font-semibold">{cycle.completedReviews}</p>
            <p className="text-gray-400 text-xs">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-sm font-semibold">{cycle.pendingReviews}</p>
            <p className="text-gray-400 text-xs">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 text-sm font-semibold">{cycle.goals}</p>
            <p className="text-gray-400 text-xs">Goals</p>
          </div>
          <div className="text-center">
            <p className="text-purple-400 text-sm font-semibold">{cycle.competencies}</p>
            <p className="text-gray-400 text-xs">Competencies</p>
          </div>
        </div>

        {/* Tags */}
        {cycle.tags && cycle.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {cycle.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CycleTypeCard = ({ cycleType }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition cursor-pointer">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 bg-${cycleType.color}-500/10 rounded-lg`}>
          <cycleType.icon className={`h-6 w-6 text-${cycleType.color}-400`} />
        </div>
        <div>
          <h4 className="text-white font-medium">{cycleType.name}</h4>
          <p className="text-gray-400 text-sm">{cycleType.duration}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{cycleType.count} cycles</span>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
          Create
        </button>
      </div>
    </div>
  );

  const TemplateCard = ({ template }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <template.icon className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm">{template.name}</h4>
            <p className="text-gray-400 text-xs">{template.description}</p>
          </div>
        </div>
        <span className="text-indigo-400 text-sm font-medium">{template.usage}%</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-1 mb-3">
        <div 
          className="bg-indigo-600 h-1 rounded-full"
          style={{ width: `${template.usage}%` }}
        ></div>
      </div>
      <button className="w-full px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-500">
        Use Template
      </button>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'start': return <Activity className="h-4 w-4 text-green-400" />;
        case 'completion': return <CheckCircle className="h-4 w-4 text-blue-400" />;
        case 'creation': return <Plus className="h-4 w-4 text-purple-400" />;
        case 'update': return <Edit className="h-4 w-4 text-yellow-400" />;
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
          <p className="text-gray-400 text-sm">{activity.cycle}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-500 text-xs">{activity.user}</span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-500 text-xs">{activity.timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  const filteredCycles = performanceCycles.filter(cycle => {
    const matchesSearch = cycle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cycle.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = cycleStatusFilter === 'all' || cycle.status === cycleStatusFilter;
    const matchesType = cycleTypeFilter === 'all' || cycle.type === cycleTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Performance Cycles</h1>
            <p className="text-gray-400">Manage performance review cycles and evaluations</p>
          </div>
          <button
            onClick={() => setShowCycleModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Cycle</span>
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
                  { id: 'cycles', label: 'Performance Cycles', icon: Activity },
                  { id: 'templates', label: 'Templates', icon: Award },
                  { id: 'cycle_types', label: 'Cycle Types', icon: Target },
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
                  {/* Performance Trends Chart */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Performance Trends</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Performance trends chart will be displayed here</p>
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
                      <p className="text-white font-medium">Create Performance Cycle</p>
                      <p className="text-gray-400 text-sm">Start a new review cycle</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Award className="h-6 w-6 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Manage Templates</p>
                      <p className="text-gray-400 text-sm">Create and edit review templates</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">View Analytics</p>
                      <p className="text-gray-400 text-sm">Analyze performance data</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Cycles Tab */}
            {activeTab === 'cycles' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search cycles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={cycleStatusFilter}
                    onChange={(e) => setCycleStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="planning">Planning</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                  </select>
                  <select
                    value={cycleTypeFilter}
                    onChange={(e) => setCycleTypeFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    <option value="annual">Annual</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="mid-year">Mid-Year</option>
                    <option value="probationary">Probationary</option>
                    <option value="development">Development</option>
                    <option value="project">Project</option>
                  </select>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Cycles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCycles.map((cycle) => (
                    <CycleCard key={cycle.id} cycle={cycle} />
                  ))}
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performanceTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </div>
            )}

            {/* Cycle Types Tab */}
            {activeTab === 'cycle_types' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cycleTypes.map((cycleType) => (
                    <CycleTypeCard key={cycleType.id} cycleType={cycleType} />
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Performance Analytics</h3>
                  <p className="text-gray-400 mb-6">Track completion rates, trends, and performance insights</p>
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
                <span>Create Performance Cycle</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Award className="h-4 w-4" />
                <span>Manage Templates</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Target className="h-4 w-4" />
                <span>Set Goals & Objectives</span>
              </button>
            </div>
          </div>

          {/* Cycle Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Cycle Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Active Cycles</span>
                <span className="flex items-center space-x-1 text-green-400 text-sm">
                  <Activity className="h-3 w-3" />
                  <span>4</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Completed Cycles</span>
                <span className="text-blue-400 text-sm">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Planning Phase</span>
                <span className="text-yellow-400 text-sm">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Draft Cycles</span>
                <span className="text-gray-400 text-sm">1</span>
              </div>
            </div>
          </div>

          {/* Performance Templates */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Popular Templates</h3>
            <div className="space-y-3">
              {performanceTemplates.slice(0, 3).map((template) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <template.icon className="h-4 w-4 text-indigo-400" />
                    <span className="text-gray-300 text-sm">{template.name}</span>
                  </div>
                  <span className="text-indigo-400 text-sm">{template.usage}%</span>
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
                  <p className="text-gray-300">{activity.cycle}</p>
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

export default PerformanceCycles;
