import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Star,
  ThumbsUp,
  Award,
  Target,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Send,
  FileText,
  Smile,
  Frown,
  Meh,
  Activity,
  TrendingDown,
  Zap,
  Coffee,
  BookOpen,
  Gift
} from 'lucide-react';

// Mock data for employee engagement
const mockEngagementData = {
  totalSurveys: 12,
  activeSurveys: 3,
  totalResponses: 1847,
  engagementScore: 78,
  surveys: [
    {
      id: 1,
      title: 'Q4 Employee Satisfaction Survey',
      type: 'Satisfaction',
      status: 'Active',
      responses: 234,
      targetResponses: 324,
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      avgScore: 4.2,
      description: 'Quarterly survey to measure overall employee satisfaction'
    },
    {
      id: 2,
      title: 'Remote Work Experience',
      type: 'Feedback',
      status: 'Active',
      responses: 189,
      targetResponses: 324,
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      avgScore: 3.8,
      description: 'Understanding employee experience with remote work policies'
    },
    {
      id: 3,
      title: 'Training Effectiveness Survey',
      type: 'Training',
      status: 'Completed',
      responses: 298,
      targetResponses: 324,
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      avgScore: 4.5,
      description: 'Evaluating the effectiveness of recent training programs'
    }
  ],
  engagementMetrics: [
    { id: 1, metric: 'Overall Satisfaction', score: 78, trend: 'up', change: '+5%' },
    { id: 2, metric: 'Work-Life Balance', score: 72, trend: 'up', change: '+3%' },
    { id: 3, metric: 'Career Development', score: 65, trend: 'down', change: '-2%' },
    { id: 4, metric: 'Management Support', score: 81, trend: 'up', change: '+7%' },
    { id: 5, metric: 'Team Collaboration', score: 85, trend: 'up', change: '+4%' },
    { id: 6, metric: 'Recognition & Rewards', score: 58, trend: 'down', change: '-1%' }
  ],
  feedbackCategories: [
    { id: 1, category: 'Positive Feedback', count: 156, icon: ThumbsUp, color: 'green' },
    { id: 2, category: 'Suggestions', count: 89, icon: MessageSquare, color: 'blue' },
    { id: 3, category: 'Concerns', count: 34, icon: AlertCircle, color: 'yellow' },
    { id: 4, category: 'Complaints', count: 12, icon: XCircle, color: 'red' }
  ],
  recentFeedback: [
    { id: 1, employee: 'Anonymous', feedback: 'Great team collaboration on recent project', category: 'Positive', time: '2 hours ago' },
    { id: 2, employee: 'Anonymous', feedback: 'Need better communication tools for remote work', category: 'Suggestion', time: '4 hours ago' },
    { id: 3, employee: 'Anonymous', feedback: 'Excellent training program on new technologies', category: 'Positive', time: '6 hours ago' },
    { id: 4, employee: 'Anonymous', feedback: 'Workload distribution could be improved', category: 'Concern', time: '1 day ago' }
  ],
  engagementInitiatives: [
    { id: 1, title: 'Monthly Team Building', participants: 245, status: 'Active', impact: 'High' },
    { id: 2, title: 'Wellness Wednesday', participants: 189, status: 'Active', impact: 'Medium' },
    { id: 3, title: 'Innovation Hour', participants: 156, status: 'Planning', impact: 'High' },
    { id: 4, title: 'Mentorship Program', participants: 78, status: 'Active', impact: 'High' }
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
                <TrendingUp size={12} className="text-green-400" />
              ) : (
                <TrendingDown size={12} className="text-red-400" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '+' : ''}5% from last quarter
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function EmployeeEngagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const handleCreateSurvey = () => {
    setModalType('create-survey');
    setShowModal(true);
  };

  const handleViewSurvey = (survey) => {
    setSelectedSurvey(survey);
    setModalType('view-survey');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Completed': return 'bg-blue-900 text-blue-300';
      case 'Draft': return 'bg-gray-700 text-gray-300';
      case 'Planning': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getCategoryColor = (color) => {
    const colorClasses = {
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      red: 'bg-red-900 text-red-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressPercentage = (responses, target) => {
    return Math.round((responses / target) * 100);
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Engagement</h1>
          <p className="text-gray-400 text-sm">Monitor and improve employee satisfaction and engagement</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreateSurvey}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Survey
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Surveys"
          value={mockEngagementData.totalSurveys}
          icon={<FileText />}
          color="indigo"
          subtitle="All time surveys"
        />
        <StatCard
          title="Active Surveys"
          value={mockEngagementData.activeSurveys}
          icon={<Activity />}
          color="green"
          subtitle="Currently running"
        />
        <StatCard
          title="Total Responses"
          value={mockEngagementData.totalResponses.toLocaleString()}
          icon={<MessageSquare />}
          color="blue"
          subtitle="All survey responses"
        />
        <StatCard
          title="Engagement Score"
          value={`${mockEngagementData.engagementScore}%`}
          icon={<Heart />}
          color="purple"
          subtitle="Overall satisfaction"
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
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'surveys', label: 'Surveys', icon: FileText },
                  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
                  { id: 'initiatives', label: 'Initiatives', icon: Zap },
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
                  {/* Engagement Metrics */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Engagement Metrics</h3>
                    <div className="space-y-4">
                      {mockEngagementData.engagementMetrics.map((metric) => (
                        <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{metric.metric}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-sm ${getScoreColor(metric.score)}`}>
                                {metric.score}%
                              </span>
                              <div className="flex items-center gap-1">
                                {metric.trend === 'up' ? (
                                  <TrendingUp size={12} className="text-green-400" />
                                ) : (
                                  <TrendingDown size={12} className="text-red-400" />
                                )}
                                <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                  {metric.change}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="w-16 h-2 bg-gray-700 rounded-full">
                            <div 
                              className={`h-full rounded-full ${getScoreColor(metric.score).includes('green') ? 'bg-green-400' : getScoreColor(metric.score).includes('yellow') ? 'bg-yellow-400' : 'bg-red-400'}`}
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Categories */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Feedback Categories</h3>
                    <div className="space-y-3">
                      {mockEngagementData.feedbackCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                                <IconComponent size={16} />
                              </div>
                              <span className="text-white">{category.category}</span>
                            </div>
                            <span className="text-white font-medium">{category.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Surveys Tab */}
            {activeTab === 'surveys' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search surveys..."
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
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateSurvey}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Create Survey
                  </button>
                </div>

                <div className="space-y-4">
                  {mockEngagementData.surveys.map((survey) => (
                    <div key={survey.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{survey.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(survey.status)}`}>
                              {survey.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <FileText size={14} />
                              <span>{survey.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{survey.responses}/{survey.targetResponses} responses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} />
                              <span>{survey.avgScore}/5.0 avg score</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{survey.startDate} - {survey.endDate}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{survey.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Response Progress</span>
                              <span>{getProgressPercentage(survey.responses, survey.targetResponses)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${getProgressPercentage(survey.responses, survey.targetResponses)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewSurvey(survey)}
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

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Recent Feedback</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <MessageSquare size={16} />
                    View All Feedback
                  </button>
                </div>

                <div className="space-y-4">
                  {mockEngagementData.recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-gray-400">{feedback.employee}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                              feedback.category === 'Positive' ? 'green' :
                              feedback.category === 'Suggestion' ? 'blue' :
                              feedback.category === 'Concern' ? 'yellow' : 'red'
                            )}`}>
                              {feedback.category}
                            </span>
                            <span className="text-xs text-gray-500">{feedback.time}</span>
                          </div>
                          <p className="text-gray-300">{feedback.feedback}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <MessageSquare size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Initiatives Tab */}
            {activeTab === 'initiatives' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Engagement Initiatives</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Create Initiative
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockEngagementData.engagementInitiatives.map((initiative) => (
                    <div key={initiative.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-white">{initiative.title}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(initiative.status)}`}>
                              {initiative.status}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              initiative.impact === 'High' ? 'bg-green-900 text-green-300' :
                              initiative.impact === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {initiative.impact} Impact
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users size={16} />
                        <span>{initiative.participants} participants</span>
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
                  <h3 className="text-lg font-medium text-white mb-2">Engagement Analytics</h3>
                  <p className="text-gray-400 mb-6">Detailed analytics and insights on employee engagement trends</p>
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
                <span>Create Survey</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <MessageSquare className="h-4 w-4" />
                <span>View Feedback</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Zap className="h-4 w-4" />
                <span>Launch Initiative</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
            </div>
          </div>

          {/* Engagement Score */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Current Engagement</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2.51 * mockEngagementData.engagementScore} 251`}
                    className="text-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{mockEngagementData.engagementScore}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Overall Satisfaction</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-300">New survey responses received</p>
                <p className="text-gray-500 text-xs">15 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Engagement initiative launched</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Feedback analysis completed</p>
                <p className="text-gray-500 text-xs">4 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Monthly report generated</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {modalType === 'create-survey' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Create New Survey</h3>
                  <p className="text-gray-400 mb-6">Design a new employee engagement survey.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Survey
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-survey' && selectedSurvey && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Survey Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedSurvey.title}</h4>
                      <p className="text-gray-400">{selectedSurvey.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p className="text-white">{selectedSurvey.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedSurvey.status)}`}>
                          {selectedSurvey.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Responses</p>
                        <p className="text-white">{selectedSurvey.responses}/{selectedSurvey.targetResponses}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Average Score</p>
                        <p className="text-white">{selectedSurvey.avgScore}/5.0</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        View Results
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Download Report
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