import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Play,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Target,
  BarChart3,
  FileText,
  Video,
  Globe,
  User,
  Building
} from 'lucide-react';

// Mock data for training and development
const mockTrainingData = {
  totalPrograms: 32,
  activePrograms: 24,
  totalEnrollments: 486,
  completionRate: 78,
  trainingPrograms: [
    {
      id: 1,
      title: 'React Development Fundamentals',
      category: 'Technical',
      instructor: 'Sarah Johnson',
      duration: '40 hours',
      format: 'Online',
      enrolled: 45,
      capacity: 50,
      status: 'Active',
      startDate: '2024-12-15',
      endDate: '2025-01-15',
      completionRate: 82,
      rating: 4.7,
      description: 'Comprehensive course covering React fundamentals, hooks, and modern development practices.'
    },
    {
      id: 2,
      title: 'Leadership Excellence Program',
      category: 'Leadership',
      instructor: 'Michael Chen',
      duration: '60 hours',
      format: 'Hybrid',
      enrolled: 28,
      capacity: 30,
      status: 'Active',
      startDate: '2024-12-01',
      endDate: '2025-02-01',
      completionRate: 75,
      rating: 4.9,
      description: 'Advanced leadership training focusing on team management and strategic thinking.'
    },
    {
      id: 3,
      title: 'Data Analytics Bootcamp',
      category: 'Technical',
      instructor: 'Emily Rodriguez',
      duration: '80 hours',
      format: 'Online',
      enrolled: 35,
      capacity: 40,
      status: 'Upcoming',
      startDate: '2024-12-20',
      endDate: '2025-03-20',
      completionRate: 0,
      rating: 4.5,
      description: 'Intensive bootcamp covering data analysis, visualization, and machine learning basics.'
    }
  ],
  trainingCategories: [
    { id: 1, name: 'Technical Skills', programs: 12, color: 'indigo' },
    { id: 2, name: 'Leadership', programs: 8, color: 'green' },
    { id: 3, name: 'Soft Skills', programs: 6, color: 'blue' },
    { id: 4, name: 'Compliance', programs: 4, color: 'yellow' },
    { id: 5, name: 'Professional Development', programs: 2, color: 'purple' }
  ],
  learningPaths: [
    {
      id: 1,
      title: 'Frontend Developer Path',
      description: 'Complete learning path for frontend development',
      courses: 5,
      duration: '120 hours',
      enrolled: 23,
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Management Excellence',
      description: 'Leadership and management skills development',
      courses: 4,
      duration: '80 hours',
      enrolled: 15,
      difficulty: 'Advanced'
    }
  ],
  upcomingTrainings: [
    { id: 1, title: 'Agile Methodology Workshop', date: '2024-12-18', time: '10:00 AM', instructor: 'John Smith' },
    { id: 2, title: 'Communication Skills Seminar', date: '2024-12-20', time: '2:00 PM', instructor: 'Lisa Wang' },
    { id: 3, title: 'Project Management Basics', date: '2024-12-22', time: '9:00 AM', instructor: 'David Brown' }
  ],
  recentActivity: [
    { id: 1, action: 'New enrollment in React Development Fundamentals', time: '2 hours ago' },
    { id: 2, action: 'Leadership Excellence Program completed by John Doe', time: '4 hours ago' },
    { id: 3, action: 'Data Analytics Bootcamp registration opened', time: '1 day ago' },
    { id: 4, action: 'New instructor Sarah Johnson added', time: '2 days ago' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    indigo: 'bg-indigo-900 text-indigo-300 border-indigo-700',
    green: 'bg-green-900 text-green-300 border-green-700',
    yellow: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    blue: 'bg-blue-900 text-blue-300 border-blue-700',
    purple: 'bg-purple-900 text-purple-300 border-purple-700',
    pink: 'bg-pink-900 text-pink-300 border-pink-700'
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function TrainingDevelopment() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleCreateProgram = () => {
    setModalType('create-program');
    setShowModal(true);
  };

  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    setModalType('view-program');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Upcoming': return 'bg-blue-900 text-blue-300';
      case 'Completed': return 'bg-gray-700 text-gray-300';
      case 'Cancelled': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getCategoryColor = (color) => {
    const colorClasses = {
      indigo: 'bg-indigo-900 text-indigo-300',
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      purple: 'bg-purple-900 text-purple-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-gray-400 text-sm">Manage employee training programs and development initiatives</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreateProgram}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Program
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Programs"
          value={mockTrainingData.totalPrograms}
          icon={<BookOpen />}
          color="indigo"
          subtitle="All training programs"
        />
        <StatCard
          title="Active Programs"
          value={mockTrainingData.activePrograms}
          icon={<Play />}
          color="green"
          subtitle="Currently running"
        />
        <StatCard
          title="Total Enrollments"
          value={mockTrainingData.totalEnrollments}
          icon={<Users />}
          color="blue"
          subtitle="All participants"
        />
        <StatCard
          title="Completion Rate"
          value={`${mockTrainingData.completionRate}%`}
          icon={<Award />}
          color="yellow"
          subtitle="Average completion"
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
                  { id: 'programs', label: 'Training Programs', icon: BookOpen },
                  { id: 'paths', label: 'Learning Paths', icon: Target },
                  { id: 'categories', label: 'Categories', icon: Building },
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
                  {/* Active Programs */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Active Programs</h3>
                    <div className="space-y-3">
                      {mockTrainingData.trainingPrograms.filter(p => p.status === 'Active').map((program) => (
                        <div key={program.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{program.title}</p>
                            <p className="text-sm text-gray-400">{program.category} • {program.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">{program.enrolled}/{program.capacity}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-400">{program.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Training Categories */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Training Categories</h3>
                    <div className="space-y-3">
                      {mockTrainingData.trainingCategories.slice(0, 5).map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(category.color)}`}></div>
                            <span className="text-white">{category.name}</span>
                          </div>
                          <span className="text-gray-400">{category.programs} programs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Training Programs Tab */}
            {activeTab === 'programs' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="technical">Technical Skills</option>
                      <option value="leadership">Leadership</option>
                      <option value="soft-skills">Soft Skills</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateProgram}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Create Program
                  </button>
                </div>

                <div className="space-y-4">
                  {mockTrainingData.trainingPrograms.map((program) => (
                    <div key={program.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{program.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(program.status)}`}>
                              {program.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <BookOpen size={14} />
                              <span>{program.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{program.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{program.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe size={14} />
                              <span>{program.format}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{program.description}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Users size={14} className="text-blue-400" />
                              <span className="text-blue-400">{program.enrolled}/{program.capacity} enrolled</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span className="text-yellow-400">{program.rating} rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle size={14} className="text-green-400" />
                              <span className="text-green-400">{program.completionRate}% completion</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewProgram(program)}
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

            {/* Learning Paths Tab */}
            {activeTab === 'paths' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Learning Paths</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Create Learning Path
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockTrainingData.learningPaths.map((path) => (
                    <div key={path.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-white mb-2">{path.title}</h4>
                          <p className="text-sm text-gray-400 mb-3">{path.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300 rounded">
                          {path.difficulty}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-400">Courses</p>
                          <p className="text-white font-medium">{path.courses}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Duration</p>
                          <p className="text-white font-medium">{path.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Enrolled</p>
                          <p className="text-white font-medium">{path.enrolled}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                          View Details
                        </button>
                        <button className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                          Edit
                        </button>
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
                  <h3 className="text-lg font-medium text-white">Training Categories</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTrainingData.trainingCategories.map((category) => (
                    <div key={category.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getCategoryColor(category.color)}`}></div>
                          <h4 className="font-medium text-white">{category.name}</h4>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white mb-1">{category.programs}</p>
                        <p className="text-sm text-gray-400">Programs</p>
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
                  <h3 className="text-lg font-medium text-white mb-2">Training Analytics</h3>
                  <p className="text-gray-400 mb-6">Track training effectiveness, completion rates, and learning outcomes</p>
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
                <span>Create Program</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Target className="h-4 w-4" />
                <span>Create Learning Path</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Users className="h-4 w-4" />
                <span>Manage Enrollments</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
            </div>
          </div>

          {/* Upcoming Trainings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Upcoming Trainings</h3>
            <div className="space-y-3">
              {mockTrainingData.upcomingTrainings.map((training) => (
                <div key={training.id} className="p-3 bg-gray-900 rounded-lg">
                  <p className="font-medium text-white text-sm">{training.title}</p>
                  <p className="text-xs text-gray-400">{training.date} at {training.time}</p>
                  <p className="text-xs text-gray-500">by {training.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockTrainingData.recentActivity.map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="text-gray-300">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
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
              {modalType === 'create-program' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Create Training Program</h3>
                  <p className="text-gray-400 mb-6">Set up a new training program for employee development.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Program
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-program' && selectedProgram && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Program Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedProgram.title}</h4>
                      <p className="text-gray-400">{selectedProgram.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Category</p>
                        <p className="text-white">{selectedProgram.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Instructor</p>
                        <p className="text-white">{selectedProgram.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Duration</p>
                        <p className="text-white">{selectedProgram.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Format</p>
                        <p className="text-white">{selectedProgram.format}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Enrollment</p>
                        <p className="text-white">{selectedProgram.enrolled}/{selectedProgram.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{selectedProgram.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Manage Enrollments
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        View Progress
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