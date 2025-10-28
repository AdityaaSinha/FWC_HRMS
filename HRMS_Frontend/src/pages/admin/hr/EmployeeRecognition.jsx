import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Star, 
  Gift,
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
  Globe,
  Medal,
  Crown,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  Send
} from 'lucide-react';

// Mock data for employee recognition
const mockRecognitionData = {
  totalRecognitions: 342,
  thisMonth: 89,
  activePrograms: 12,
  totalRewards: 156,
  recognitions: [
    {
      id: 1,
      title: 'Outstanding Performance Award',
      recipient: 'John Smith',
      recognizer: 'Sarah Johnson',
      department: 'Sales',
      category: 'Performance Excellence',
      type: 'Award',
      points: 500,
      description: 'Exceeded quarterly sales targets by 150% and mentored 3 junior team members',
      date: '2024-02-15',
      status: 'Approved',
      visibility: 'Public',
      badge: 'gold',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: 'Team Collaboration Champion',
      recipient: 'Alice Brown',
      recognizer: 'Mike Davis',
      department: 'Engineering',
      category: 'Teamwork',
      type: 'Peer Recognition',
      points: 250,
      description: 'Led cross-functional project that improved system efficiency by 40%',
      date: '2024-02-14',
      status: 'Approved',
      visibility: 'Public',
      badge: 'silver',
      likes: 18,
      comments: 5
    },
    {
      id: 3,
      title: 'Innovation Excellence',
      recipient: 'David Wilson',
      recognizer: 'Lisa Chen',
      department: 'Product',
      category: 'Innovation',
      type: 'Spot Recognition',
      points: 300,
      description: 'Developed innovative solution that reduced customer support tickets by 60%',
      date: '2024-02-13',
      status: 'Pending',
      visibility: 'Department',
      badge: 'bronze',
      likes: 12,
      comments: 3
    }
  ],
  recognitionPrograms: [
    {
      id: 1,
      name: 'Employee of the Month',
      description: 'Monthly recognition for outstanding performance',
      type: 'Monthly Award',
      status: 'Active',
      participants: 156,
      budget: 5000,
      spent: 3200,
      criteria: 'Performance, Leadership, Innovation',
      rewards: ['Certificate', 'Bonus', 'Parking Spot']
    },
    {
      id: 2,
      name: 'Peer Appreciation',
      description: 'Peer-to-peer recognition system',
      type: 'Continuous',
      status: 'Active',
      participants: 234,
      budget: 10000,
      spent: 6800,
      criteria: 'Teamwork, Support, Collaboration',
      rewards: ['Points', 'Gift Cards', 'Public Recognition']
    },
    {
      id: 3,
      name: 'Innovation Awards',
      description: 'Quarterly awards for innovative ideas',
      type: 'Quarterly Award',
      status: 'Active',
      participants: 89,
      budget: 15000,
      spent: 8500,
      criteria: 'Creativity, Impact, Implementation',
      rewards: ['Cash Prize', 'Trophy', 'Feature Story']
    }
  ],
  rewardTypes: [
    { id: 1, name: 'Gift Cards', icon: Gift, count: 45, value: '$50-$500', color: 'green' },
    { id: 2, name: 'Extra PTO', icon: Calendar, count: 32, value: '1-3 days', color: 'blue' },
    { id: 3, name: 'Cash Bonus', icon: DollarSign, count: 28, value: '$100-$1000', color: 'yellow' },
    { id: 4, name: 'Public Recognition', icon: Trophy, count: 67, value: 'Company-wide', color: 'purple' },
    { id: 5, name: 'Training Budget', icon: Award, count: 23, value: '$500-$2000', color: 'indigo' },
    { id: 6, name: 'Flexible Hours', icon: Clock, count: 19, value: '1 week', color: 'red' }
  ],
  leaderboard: [
    { rank: 1, name: 'John Smith', department: 'Sales', points: 2450, recognitions: 12, badge: 'gold' },
    { rank: 2, name: 'Alice Brown', department: 'Engineering', points: 2180, recognitions: 10, badge: 'silver' },
    { rank: 3, name: 'David Wilson', department: 'Product', points: 1950, recognitions: 9, badge: 'bronze' },
    { rank: 4, name: 'Sarah Johnson', department: 'Marketing', points: 1720, recognitions: 8, badge: 'none' },
    { rank: 5, name: 'Mike Davis', department: 'Support', points: 1580, recognitions: 7, badge: 'none' }
  ],
  monthlyStats: [
    { month: 'Jan', recognitions: 45, rewards: 28, points: 12500 },
    { month: 'Feb', recognitions: 52, rewards: 34, points: 15200 },
    { month: 'Mar', recognitions: 48, rewards: 31, points: 14100 },
    { month: 'Apr', recognitions: 61, rewards: 39, points: 17800 },
    { month: 'May', recognitions: 58, rewards: 37, points: 16900 }
  ],
  recentActivity: [
    { id: 1, action: 'John Smith received "Outstanding Performance Award"', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, action: 'New peer recognition program launched', user: 'HR Admin', time: '4 hours ago' },
    { id: 3, action: 'Alice Brown redeemed gift card reward', user: 'Alice Brown', time: '6 hours ago' },
    { id: 4, action: 'Monthly leaderboard updated', user: 'System', time: '1 day ago' }
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
                {trend === 'up' ? '+12%' : trend === 'down' ? '-5%' : '0%'} from last month
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function EmployeeRecognition() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRecognition, setSelectedRecognition] = useState(null);

  const handleCreateRecognition = () => {
    setModalType('create-recognition');
    setShowModal(true);
  };

  const handleViewRecognition = (recognition) => {
    setSelectedRecognition(recognition);
    setModalType('view-recognition');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-900 text-green-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      case 'Rejected': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Award': return 'bg-purple-900 text-purple-300';
      case 'Peer Recognition': return 'bg-blue-900 text-blue-300';
      case 'Spot Recognition': return 'bg-green-900 text-green-300';
      case 'Achievement': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-300';
      case 'bronze': return 'text-orange-400';
      default: return 'text-gray-500';
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return <Crown className="w-5 h-5" />;
      case 'silver': return <Medal className="w-5 h-5" />;
      case 'bronze': return <Award className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getRewardColor = (color) => {
    const colorClasses = {
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      purple: 'bg-purple-900 text-purple-300',
      indigo: 'bg-indigo-900 text-indigo-300',
      red: 'bg-red-900 text-red-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
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
          <h1 className="text-3xl font-bold">Employee Recognition</h1>
          <p className="text-gray-400 text-sm">Manage recognition programs and reward outstanding employees</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Report
          </button>
          <button 
            onClick={handleCreateRecognition}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus size={16} />
            Give Recognition
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Recognitions"
          value={mockRecognitionData.totalRecognitions}
          icon={<Award />}
          color="purple"
          subtitle="All time recognitions"
          trend="up"
        />
        <StatCard
          title="This Month"
          value={mockRecognitionData.thisMonth}
          icon={<Trophy />}
          color="blue"
          subtitle="Current month activity"
          trend="up"
        />
        <StatCard
          title="Active Programs"
          value={mockRecognitionData.activePrograms}
          icon={<Star />}
          color="yellow"
          subtitle="Running programs"
          trend="stable"
        />
        <StatCard
          title="Total Rewards"
          value={mockRecognitionData.totalRewards}
          icon={<Gift />}
          color="green"
          subtitle="Rewards distributed"
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
                  { id: 'recognitions', label: 'Recognitions', icon: Award },
                  { id: 'programs', label: 'Programs', icon: Star },
                  { id: 'rewards', label: 'Rewards', icon: Gift },
                  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-400'
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
                  {/* Recognition Programs */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Active Programs</h3>
                    <div className="space-y-3">
                      {mockRecognitionData.recognitionPrograms.slice(0, 3).map((program) => (
                        <div key={program.id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{program.name}</h4>
                            <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                              {program.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{program.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{program.participants} participants</span>
                            <span>Budget: ${program.spent.toLocaleString()}/${program.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Trends */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Monthly Trends</h3>
                    <div className="space-y-4">
                      {mockRecognitionData.monthlyStats.map((stat) => (
                        <div key={stat.month} className="flex items-center justify-between">
                          <span className="text-gray-400 w-12">{stat.month}</span>
                          <div className="flex-1 flex items-center gap-4 ml-4">
                            <div className="flex items-center gap-1">
                              <Award size={12} className="text-purple-400" />
                              <span className="text-xs text-gray-400">{stat.recognitions}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gift size={12} className="text-green-400" />
                              <span className="text-xs text-gray-400">{stat.rewards}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-400" />
                              <span className="text-xs text-gray-400">{stat.points.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recognitions Tab */}
            {activeTab === 'recognitions' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search recognitions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="performance">Performance Excellence</option>
                      <option value="teamwork">Teamwork</option>
                      <option value="innovation">Innovation</option>
                      <option value="leadership">Leadership</option>
                    </select>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="all">All Types</option>
                      <option value="award">Award</option>
                      <option value="peer">Peer Recognition</option>
                      <option value="spot">Spot Recognition</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateRecognition}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Plus size={16} />
                    Give Recognition
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRecognitionData.recognitions.map((recognition) => (
                    <div key={recognition.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={getBadgeColor(recognition.badge)}>
                              {getBadgeIcon(recognition.badge)}
                            </div>
                            <h3 className="text-lg font-medium text-white">{recognition.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(recognition.status)}`}>
                              {recognition.status}
                            </span>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getTypeColor(recognition.type)}`}>
                              {recognition.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>To: {recognition.recipient}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck size={14} />
                              <span>From: {recognition.recognizer}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building size={14} />
                              <span>{recognition.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formatDate(recognition.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} />
                              <span>{recognition.points} points</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{recognition.description}</p>
                          
                          {/* Engagement */}
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <ThumbsUp size={14} />
                              <span>{recognition.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle size={14} />
                              <span>{recognition.comments} comments</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{recognition.visibility}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewRecognition(recognition)}
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

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Recognition Programs</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Plus size={16} />
                    Create Program
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRecognitionData.recognitionPrograms.map((program) => (
                    <div key={program.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{program.name}</h3>
                            <span className="inline-flex px-3 py-1 text-sm rounded-full bg-green-900 text-green-300">
                              {program.status}
                            </span>
                            <span className="inline-flex px-3 py-1 text-sm rounded-full bg-blue-900 text-blue-300">
                              {program.type}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{program.description}</p>
                          
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <p className="text-sm text-gray-400">Participants</p>
                              <p className="text-white font-medium">{program.participants} employees</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Budget Utilization</p>
                              <p className="text-white font-medium">
                                ${program.spent.toLocaleString()} / ${program.budget.toLocaleString()}
                              </p>
                              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${(program.spent / program.budget) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">Criteria</p>
                            <p className="text-gray-300">{program.criteria}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Available Rewards</p>
                            <div className="flex flex-wrap gap-2">
                              {program.rewards.map((reward, index) => (
                                <span key={index} className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                                  {reward}
                                </span>
                              ))}
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
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Settings size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Reward Types</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Plus size={16} />
                    Add Reward Type
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockRecognitionData.rewardTypes.map((reward) => {
                    const IconComponent = reward.icon;
                    return (
                      <div key={reward.id} className="bg-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${getRewardColor(reward.color)}`}>
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{reward.name}</h4>
                              <p className="text-sm text-gray-400">{reward.count} distributed</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-white">
                            <Edit size={16} />
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-400">Value Range</p>
                          <p className="text-white font-medium">{reward.value}</p>
                        </div>
                        
                        <div className="text-center">
                          <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                            Manage Rewards
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Recognition Leaderboard</h3>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500">
                      <option value="monthly">This Month</option>
                      <option value="quarterly">This Quarter</option>
                      <option value="yearly">This Year</option>
                      <option value="all-time">All Time</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockRecognitionData.leaderboard.map((employee) => (
                    <div key={employee.rank} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">#{employee.rank}</span>
                            <div className={getBadgeColor(employee.badge)}>
                              {getBadgeIcon(employee.badge)}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white">{employee.name}</h4>
                            <p className="text-sm text-gray-400">{employee.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-lg font-bold text-purple-400">{employee.points.toLocaleString()}</p>
                              <p className="text-xs text-gray-400">Points</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-blue-400">{employee.recognitions}</p>
                              <p className="text-xs text-gray-400">Recognitions</p>
                            </div>
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
                <span>Give Recognition</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Star className="h-4 w-4" />
                <span>Create Program</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Gift className="h-4 w-4" />
                <span>Manage Rewards</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <BarChart3 className="h-4 w-4" />
                <span>View Analytics</span>
              </button>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Top Performers</h3>
            <div className="space-y-3">
              {mockRecognitionData.leaderboard.slice(0, 3).map((employee) => (
                <div key={employee.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getBadgeColor(employee.badge)}>
                      {getBadgeIcon(employee.badge)}
                    </div>
                    <div>
                      <p className="text-white text-sm">{employee.name}</p>
                      <p className="text-gray-400 text-xs">{employee.department}</p>
                    </div>
                  </div>
                  <span className="text-purple-400 font-medium text-sm">{employee.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockRecognitionData.recentActivity.map((activity) => (
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
              {modalType === 'create-recognition' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Give Recognition</h3>
                  <p className="text-gray-400 mb-6">Recognize an employee for their outstanding contribution.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      Give Recognition
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-recognition' && selectedRecognition && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Recognition Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={getBadgeColor(selectedRecognition.badge)}>
                        {getBadgeIcon(selectedRecognition.badge)}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{selectedRecognition.title}</h4>
                        <p className="text-sm text-gray-400">{selectedRecognition.category}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Recipient</p>
                        <p className="text-white">{selectedRecognition.recipient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Recognizer</p>
                        <p className="text-white">{selectedRecognition.recognizer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white">{selectedRecognition.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Points Awarded</p>
                        <p className="text-white">{selectedRecognition.points} points</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getTypeColor(selectedRecognition.type)}`}>
                          {selectedRecognition.type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRecognition.status)}`}>
                          {selectedRecognition.status}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Description</p>
                      <p className="text-gray-300 text-sm bg-gray-900 p-3 rounded">{selectedRecognition.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>{selectedRecognition.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        <span>{selectedRecognition.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{selectedRecognition.visibility}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Edit Recognition
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Approve
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