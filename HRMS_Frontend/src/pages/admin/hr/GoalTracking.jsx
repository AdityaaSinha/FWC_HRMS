import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Award,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  XCircle,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Flag,
  Zap,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
  Building,
  User,
  FileText,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// Mock data for goal tracking
const mockGoalData = {
  totalGoals: 156,
  activeGoals: 89,
  completedGoals: 45,
  overdue: 22,
  goals: [
    {
      id: 1,
      title: 'Increase Sales Revenue by 25%',
      description: 'Achieve 25% growth in quarterly sales revenue through improved customer acquisition',
      owner: 'John Smith',
      department: 'Sales',
      type: 'Performance',
      priority: 'High',
      status: 'In Progress',
      progress: 68,
      startDate: '2024-01-01',
      dueDate: '2024-03-31',
      category: 'Revenue',
      milestones: 4,
      completedMilestones: 3
    },
    {
      id: 2,
      title: 'Complete Leadership Training Program',
      description: 'Finish advanced leadership certification program to enhance management skills',
      owner: 'Sarah Johnson',
      department: 'HR',
      type: 'Development',
      priority: 'Medium',
      status: 'In Progress',
      progress: 45,
      startDate: '2024-01-15',
      dueDate: '2024-04-15',
      category: 'Training',
      milestones: 6,
      completedMilestones: 2
    },
    {
      id: 3,
      title: 'Reduce Customer Support Response Time',
      description: 'Decrease average response time to customer inquiries from 4 hours to 2 hours',
      owner: 'Mike Davis',
      department: 'Support',
      type: 'Operational',
      priority: 'High',
      status: 'Completed',
      progress: 100,
      startDate: '2023-12-01',
      dueDate: '2024-02-29',
      category: 'Efficiency',
      milestones: 3,
      completedMilestones: 3
    }
  ],
  goalCategories: [
    { id: 1, name: 'Revenue', count: 23, color: 'green', icon: TrendingUp },
    { id: 2, name: 'Training', count: 18, color: 'blue', icon: Award },
    { id: 3, name: 'Efficiency', count: 15, color: 'purple', icon: Zap },
    { id: 4, name: 'Quality', count: 12, color: 'yellow', icon: Star },
    { id: 5, name: 'Innovation', count: 8, color: 'indigo', icon: Trophy }
  ],
  departmentProgress: [
    { department: 'Sales', totalGoals: 34, completed: 18, inProgress: 12, overdue: 4, avgProgress: 72 },
    { department: 'Marketing', totalGoals: 28, completed: 15, inProgress: 10, overdue: 3, avgProgress: 68 },
    { department: 'Engineering', totalGoals: 42, completed: 22, inProgress: 16, overdue: 4, avgProgress: 75 },
    { department: 'HR', totalGoals: 25, completed: 12, inProgress: 9, overdue: 4, avgProgress: 65 },
    { department: 'Support', totalGoals: 27, completed: 16, inProgress: 8, overdue: 3, avgProgress: 78 }
  ],
  recentActivity: [
    { id: 1, action: 'Goal "Increase Sales Revenue" updated to 68% progress', user: 'John Smith', time: '2 hours ago' },
    { id: 2, action: 'New goal "Improve Code Quality" created', user: 'Alice Brown', time: '4 hours ago' },
    { id: 3, action: 'Goal "Customer Support Response Time" marked as completed', user: 'Mike Davis', time: '6 hours ago' },
    { id: 4, action: 'Milestone achieved for "Leadership Training Program"', user: 'Sarah Johnson', time: '1 day ago' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle, trend }) => {
  const colorClasses = {
    indigo: 'bg-indigo-900 text-indigo-300 border-indigo-700',
    green: 'bg-green-900 text-green-300 border-green-700',
    yellow: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    blue: 'bg-blue-900 text-blue-300 border-blue-700',
    purple: 'bg-purple-900 text-purple-300 border-purple-700',
    red: 'bg-red-900 text-red-300 border-red-700'
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
                {trend === 'up' ? '+8%' : trend === 'down' ? '-3%' : '0%'} from last month
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function GoalTracking() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleCreateGoal = () => {
    setModalType('create-goal');
    setShowModal(true);
  };

  const handleViewGoal = (goal) => {
    setSelectedGoal(goal);
    setModalType('view-goal');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-900 text-green-300';
      case 'In Progress': return 'bg-blue-900 text-blue-300';
      case 'Not Started': return 'bg-gray-700 text-gray-300';
      case 'Overdue': return 'bg-red-900 text-red-300';
      case 'On Hold': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-900 text-red-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getCategoryColor = (color) => {
    const colorClasses = {
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      purple: 'bg-purple-900 text-purple-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      indigo: 'bg-indigo-900 text-indigo-300',
      red: 'bg-red-900 text-red-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <h1 className="text-3xl font-bold">Goal Tracking</h1>
          <p className="text-gray-400 text-sm">Set, track, and achieve organizational and individual goals</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreateGoal}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Goal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Goals"
          value={mockGoalData.totalGoals}
          icon={<Target />}
          color="indigo"
          subtitle="All goals created"
          trend="up"
        />
        <StatCard
          title="Active Goals"
          value={mockGoalData.activeGoals}
          icon={<Activity />}
          color="blue"
          subtitle="Currently in progress"
          trend="up"
        />
        <StatCard
          title="Completed Goals"
          value={mockGoalData.completedGoals}
          icon={<CheckCircle />}
          color="green"
          subtitle="Successfully achieved"
          trend="up"
        />
        <StatCard
          title="Overdue Goals"
          value={mockGoalData.overdue}
          icon={<AlertCircle />}
          color="red"
          subtitle="Past due date"
          trend="down"
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
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'goals', label: 'Goals', icon: Target },
                  { id: 'categories', label: 'Categories', icon: Flag },
                  { id: 'departments', label: 'Departments', icon: Building },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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

            {/* Tab Content */}
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Goal Categories */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Goal Categories</h3>
                    <div className="space-y-3">
                      {mockGoalData.goalCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                                <IconComponent size={16} />
                              </div>
                              <span className="text-white">{category.name}</span>
                            </div>
                            <span className="text-white font-medium">{category.count} goals</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Department Progress */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Department Progress</h3>
                    <div className="space-y-4">
                      {mockGoalData.departmentProgress.slice(0, 4).map((dept) => (
                        <div key={dept.department} className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">{dept.department}</span>
                            <span className="text-sm text-gray-400">{dept.avgProgress}% avg</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{dept.completed} completed</span>
                            <span>{dept.inProgress} in progress</span>
                            <span className="text-red-400">{dept.overdue} overdue</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(dept.avgProgress)}`}
                              style={{ width: `${dept.avgProgress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search goals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Status</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateGoal}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Create Goal
                  </button>
                </div>

                <div className="space-y-4">
                  {mockGoalData.goals.map((goal) => (
                    <div key={goal.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{goal.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(goal.status)}`}>
                              {goal.status}
                            </span>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getPriorityColor(goal.priority)}`}>
                              {goal.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{goal.owner}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building size={14} />
                              <span>{goal.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flag size={14} />
                              <span>{goal.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formatDate(goal.startDate)} - {formatDate(goal.dueDate)}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{goal.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Milestones */}
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <CheckCircle size={14} />
                              <span>{goal.completedMilestones}/{goal.milestones} milestones</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewGoal(goal)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Goal Categories</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockGoalData.goalCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={category.id} className="bg-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${getCategoryColor(category.color)}`}>
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{category.name}</h4>
                              <p className="text-sm text-gray-400">{category.count} goals</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-white">
                            <Edit size={16} />
                          </button>
                        </div>
                        
                        <div className="text-center">
                          <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                            View Goals
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Departments Tab */}
            {activeTab === 'departments' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Department Progress</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <BarChart3 size={16} />
                    View Detailed Report
                  </button>
                </div>

                <div className="space-y-4">
                  {mockGoalData.departmentProgress.map((dept) => (
                    <div key={dept.department} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-white">{dept.department}</h4>
                          <p className="text-sm text-gray-400">{dept.totalGoals} total goals</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{dept.avgProgress}%</p>
                          <p className="text-sm text-gray-400">Average Progress</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-medium text-green-400">{dept.completed}</p>
                          <p className="text-xs text-gray-400">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-blue-400">{dept.inProgress}</p>
                          <p className="text-xs text-gray-400">In Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-red-400">{dept.overdue}</p>
                          <p className="text-xs text-gray-400">Overdue</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-400">{dept.totalGoals - dept.completed - dept.inProgress - dept.overdue}</p>
                          <p className="text-xs text-gray-400">Not Started</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getProgressColor(dept.avgProgress)}`}
                          style={{ width: `${dept.avgProgress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Goal Analytics</h3>
                  <p className="text-gray-400 mb-6">Comprehensive analytics and insights on goal performance</p>
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
                <span>Create Goal</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Target className="h-4 w-4" />
                <span>Set Milestone</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <BarChart3 className="h-4 w-4" />
                <span>View Reports</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          {/* Goal Status Summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Goal Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Completed</span>
                </div>
                <span className="text-white font-medium">{mockGoalData.completedGoals}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">In Progress</span>
                </div>
                <span className="text-white font-medium">{mockGoalData.activeGoals}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">Overdue</span>
                </div>
                <span className="text-white font-medium">{mockGoalData.overdue}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-400">Not Started</span>
                </div>
                <span className="text-white font-medium">{mockGoalData.totalGoals - mockGoalData.activeGoals - mockGoalData.completedGoals - mockGoalData.overdue}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockGoalData.recentActivity.map((activity) => (
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
              {modalType === 'create-goal' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Create New Goal</h3>
                  <p className="text-gray-400 mb-6">Set up a new goal for tracking progress and achievements.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Goal
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-goal' && selectedGoal && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Goal Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedGoal.title}</h4>
                      <p className="text-gray-400">{selectedGoal.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Owner</p>
                        <p className="text-white">{selectedGoal.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white">{selectedGoal.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Priority</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedGoal.priority)}`}>
                          {selectedGoal.priority}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedGoal.status)}`}>
                          {selectedGoal.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Progress</p>
                        <p className="text-white">{selectedGoal.progress}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Milestones</p>
                        <p className="text-white">{selectedGoal.completedMilestones}/{selectedGoal.milestones}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Edit Goal
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Update Progress
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