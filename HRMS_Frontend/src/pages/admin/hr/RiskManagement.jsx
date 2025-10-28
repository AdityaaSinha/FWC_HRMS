import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  FileText,
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
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  Building,
  User,
  Settings,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Bell,
  Briefcase,
  DollarSign,
  Scale,
  UserCheck,
  Database,
  Lock,
  Wifi,
  Heart,
  Truck,
  Globe
} from 'lucide-react';

// Mock data for risk management
const mockRiskData = {
  totalRisks: 47,
  highRisks: 12,
  mediumRisks: 23,
  lowRisks: 12,
  mitigatedRisks: 28,
  risks: [
    {
      id: 1,
      title: 'High Employee Turnover Rate',
      description: 'Increasing turnover rate in key departments affecting productivity and knowledge retention',
      category: 'Talent Management',
      severity: 'High',
      probability: 'High',
      impact: 'High',
      status: 'Active',
      owner: 'Sarah Johnson',
      department: 'HR',
      identifiedDate: '2024-01-15',
      lastReviewed: '2024-02-01',
      mitigationPlan: 'Implement retention programs, improve compensation packages, enhance work-life balance',
      riskScore: 85,
      trend: 'increasing'
    },
    {
      id: 2,
      title: 'Data Security Breach Risk',
      description: 'Potential vulnerability in employee data systems and lack of comprehensive security training',
      category: 'Information Security',
      severity: 'High',
      probability: 'Medium',
      impact: 'Very High',
      status: 'Under Review',
      owner: 'Mike Davis',
      department: 'IT',
      identifiedDate: '2024-01-20',
      lastReviewed: '2024-02-05',
      mitigationPlan: 'Upgrade security systems, mandatory security training, implement multi-factor authentication',
      riskScore: 78,
      trend: 'stable'
    },
    {
      id: 3,
      title: 'Compliance Violation Risk',
      description: 'Potential non-compliance with new labor regulations and employment laws',
      category: 'Legal & Compliance',
      severity: 'Medium',
      probability: 'Medium',
      impact: 'High',
      status: 'Mitigated',
      owner: 'Lisa Chen',
      department: 'Legal',
      identifiedDate: '2023-12-10',
      lastReviewed: '2024-01-30',
      mitigationPlan: 'Regular compliance audits, legal training for managers, policy updates',
      riskScore: 45,
      trend: 'decreasing'
    }
  ],
  riskCategories: [
    { id: 1, name: 'Talent Management', count: 12, color: 'red', icon: Users, avgScore: 72 },
    { id: 2, name: 'Information Security', count: 8, color: 'purple', icon: Lock, avgScore: 68 },
    { id: 3, name: 'Legal & Compliance', count: 9, color: 'yellow', icon: Scale, avgScore: 55 },
    { id: 4, name: 'Financial', count: 6, color: 'green', icon: DollarSign, avgScore: 42 },
    { id: 5, name: 'Operational', count: 7, color: 'blue', icon: Settings, avgScore: 58 },
    { id: 6, name: 'Health & Safety', count: 5, color: 'indigo', icon: Heart, avgScore: 38 }
  ],
  riskTrends: [
    { month: 'Jan', high: 8, medium: 15, low: 10 },
    { month: 'Feb', high: 10, medium: 18, low: 12 },
    { month: 'Mar', high: 12, medium: 20, low: 11 },
    { month: 'Apr', high: 11, medium: 22, low: 13 },
    { month: 'May', high: 12, medium: 23, low: 12 }
  ],
  mitigationActions: [
    {
      id: 1,
      riskId: 1,
      action: 'Implement Employee Retention Program',
      assignee: 'Sarah Johnson',
      dueDate: '2024-03-15',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 2,
      riskId: 2,
      action: 'Conduct Security Audit',
      assignee: 'Mike Davis',
      dueDate: '2024-02-28',
      status: 'Completed',
      priority: 'High'
    },
    {
      id: 3,
      riskId: 3,
      action: 'Update Compliance Policies',
      assignee: 'Lisa Chen',
      dueDate: '2024-02-15',
      status: 'Completed',
      priority: 'Medium'
    }
  ],
  recentActivity: [
    { id: 1, action: 'New risk "High Employee Turnover Rate" identified', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, action: 'Risk assessment completed for "Data Security Breach"', user: 'Mike Davis', time: '4 hours ago' },
    { id: 3, action: 'Mitigation plan updated for "Compliance Violation Risk"', user: 'Lisa Chen', time: '6 hours ago' },
    { id: 4, action: 'Risk review meeting scheduled for next week', user: 'Admin', time: '1 day ago' }
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
                <ArrowUp size={12} className="text-red-400" />
              ) : trend === 'down' ? (
                <ArrowDown size={12} className="text-green-400" />
              ) : (
                <Minus size={12} className="text-gray-400" />
              )}
              <span className={`text-xs ${
                trend === 'up' ? 'text-red-400' : 
                trend === 'down' ? 'text-green-400' : 
                'text-gray-400'
              }`}>
                {trend === 'up' ? '+15%' : trend === 'down' ? '-8%' : '0%'} from last month
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function RiskManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRisk, setSelectedRisk] = useState(null);

  const handleCreateRisk = () => {
    setModalType('create-risk');
    setShowModal(true);
  };

  const handleViewRisk = (risk) => {
    setSelectedRisk(risk);
    setModalType('view-risk');
    setShowModal(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very High': return 'bg-red-900 text-red-300';
      case 'High': return 'bg-red-800 text-red-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-green-900 text-green-300';
      case 'Very Low': return 'bg-green-800 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-900 text-red-300';
      case 'Under Review': return 'bg-yellow-900 text-yellow-300';
      case 'Mitigated': return 'bg-green-900 text-green-300';
      case 'Closed': return 'bg-gray-700 text-gray-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getCategoryColor = (color) => {
    const colorClasses = {
      red: 'bg-red-900 text-red-300',
      purple: 'bg-purple-900 text-purple-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      indigo: 'bg-indigo-900 text-indigo-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-blue-400';
    return 'text-green-400';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <ArrowUp size={14} className="text-red-400" />;
      case 'decreasing': return <ArrowDown size={14} className="text-green-400" />;
      case 'stable': return <Minus size={14} className="text-gray-400" />;
      default: return <Minus size={14} className="text-gray-400" />;
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
          <h1 className="text-3xl font-bold">Risk Management</h1>
          <p className="text-gray-400 text-sm">Identify, assess, and mitigate HR-related risks</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Risk Report
          </button>
          <button 
            onClick={handleCreateRisk}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Plus size={16} />
            Identify Risk
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Risks"
          value={mockRiskData.totalRisks}
          icon={<Shield />}
          color="indigo"
          subtitle="All identified risks"
          trend="up"
        />
        <StatCard
          title="High Risk"
          value={mockRiskData.highRisks}
          icon={<AlertTriangle />}
          color="red"
          subtitle="Require immediate attention"
          trend="up"
        />
        <StatCard
          title="Medium Risk"
          value={mockRiskData.mediumRisks}
          icon={<AlertCircle />}
          color="yellow"
          subtitle="Monitor closely"
          trend="stable"
        />
        <StatCard
          title="Low Risk"
          value={mockRiskData.lowRisks}
          icon={<CheckCircle />}
          color="green"
          subtitle="Acceptable level"
          trend="down"
        />
        <StatCard
          title="Mitigated"
          value={mockRiskData.mitigatedRisks}
          icon={<Target />}
          color="blue"
          subtitle="Successfully addressed"
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
                  { id: 'risks', label: 'Risk Register', icon: Shield },
                  { id: 'categories', label: 'Categories', icon: Flag },
                  { id: 'mitigation', label: 'Mitigation Actions', icon: Target },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-400'
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
                  {/* Risk Categories */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Risk Categories</h3>
                    <div className="space-y-3">
                      {mockRiskData.riskCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                                <IconComponent size={16} />
                              </div>
                              <div>
                                <span className="text-white">{category.name}</span>
                                <p className="text-xs text-gray-400">{category.count} risks</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-medium ${getRiskScoreColor(category.avgScore)}`}>
                                {category.avgScore}
                              </span>
                              <p className="text-xs text-gray-400">Avg Score</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Risk Trends */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Risk Trends (Last 5 Months)</h3>
                    <div className="space-y-4">
                      {mockRiskData.riskTrends.map((trend) => (
                        <div key={trend.month} className="flex items-center justify-between">
                          <span className="text-gray-400 w-12">{trend.month}</span>
                          <div className="flex-1 flex items-center gap-2 ml-4">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-xs text-gray-400">{trend.high}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-xs text-gray-400">{trend.medium}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-400">{trend.low}</span>
                            </div>
                          </div>
                          <span className="text-white font-medium w-8 text-right">
                            {trend.high + trend.medium + trend.low}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Risk Register Tab */}
            {activeTab === 'risks' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search risks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <select
                      value={selectedSeverity}
                      onChange={(e) => setSelectedSeverity(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Severity</option>
                      <option value="very-high">Very High</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="talent">Talent Management</option>
                      <option value="security">Information Security</option>
                      <option value="compliance">Legal & Compliance</option>
                      <option value="financial">Financial</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateRisk}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Plus size={16} />
                    Identify Risk
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRiskData.risks.map((risk) => (
                    <div key={risk.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{risk.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getSeverityColor(risk.severity)}`}>
                              {risk.severity}
                            </span>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(risk.status)}`}>
                              {risk.status}
                            </span>
                            {getTrendIcon(risk.trend)}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{risk.owner}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building size={14} />
                              <span>{risk.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flag size={14} />
                              <span>{risk.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>Identified: {formatDate(risk.identifiedDate)}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{risk.description}</p>
                          
                          {/* Risk Score */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Risk Score</span>
                              <span className={getRiskScoreColor(risk.riskScore)}>{risk.riskScore}/100</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  risk.riskScore >= 80 ? 'bg-red-500' :
                                  risk.riskScore >= 60 ? 'bg-yellow-500' :
                                  risk.riskScore >= 40 ? 'bg-blue-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${risk.riskScore}%` }}
                              />
                            </div>
                          </div>

                          {/* Impact & Probability */}
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Target size={14} />
                              <span>Impact: {risk.impact}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity size={14} />
                              <span>Probability: {risk.probability}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>Last Review: {formatDate(risk.lastReviewed)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewRisk(risk)}
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
                  <h3 className="text-lg font-medium text-white">Risk Categories</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockRiskData.riskCategories.map((category) => {
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
                              <p className="text-sm text-gray-400">{category.count} risks</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-white">
                            <Edit size={16} />
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Average Risk Score</span>
                            <span className={getRiskScoreColor(category.avgScore)}>{category.avgScore}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                category.avgScore >= 80 ? 'bg-red-500' :
                                category.avgScore >= 60 ? 'bg-yellow-500' :
                                category.avgScore >= 40 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${category.avgScore}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                            View Risks
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mitigation Actions Tab */}
            {activeTab === 'mitigation' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Mitigation Actions</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <Plus size={16} />
                    Add Action
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRiskData.mitigationActions.map((action) => (
                    <div key={action.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-medium text-white">{action.action}</h4>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(action.status)}`}>
                              {action.status}
                            </span>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getSeverityColor(action.priority)}`}>
                              {action.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>Assigned to: {action.assignee}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>Due: {formatDate(action.dueDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield size={14} />
                              <span>Risk ID: #{action.riskId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Edit size={16} />
                          </button>
                        </div>
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
                  <h3 className="text-lg font-medium text-white mb-2">Risk Analytics</h3>
                  <p className="text-gray-400 mb-6">Comprehensive analytics and insights on risk management</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
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
                <span>Identify Risk</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Target className="h-4 w-4" />
                <span>Create Action Plan</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <BarChart3 className="h-4 w-4" />
                <span>Risk Assessment</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Risk Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">High Risk</span>
                </div>
                <span className="text-white font-medium">{mockRiskData.highRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-400">Medium Risk</span>
                </div>
                <span className="text-white font-medium">{mockRiskData.mediumRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Low Risk</span>
                </div>
                <span className="text-white font-medium">{mockRiskData.lowRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Mitigated</span>
                </div>
                <span className="text-white font-medium">{mockRiskData.mitigatedRisks}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockRiskData.recentActivity.map((activity) => (
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
              {modalType === 'create-risk' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Identify New Risk</h3>
                  <p className="text-gray-400 mb-6">Document a new risk that could impact the organization.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Create Risk
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-risk' && selectedRisk && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Risk Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedRisk.title}</h4>
                      <p className="text-gray-400">{selectedRisk.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Owner</p>
                        <p className="text-white">{selectedRisk.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white">{selectedRisk.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Severity</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedRisk.severity)}`}>
                          {selectedRisk.severity}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRisk.status)}`}>
                          {selectedRisk.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Risk Score</p>
                        <p className={`font-medium ${getRiskScoreColor(selectedRisk.riskScore)}`}>{selectedRisk.riskScore}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Category</p>
                        <p className="text-white">{selectedRisk.category}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Mitigation Plan</p>
                      <p className="text-gray-300 text-sm bg-gray-900 p-3 rounded">{selectedRisk.mitigationPlan}</p>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Edit Risk
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Update Status
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