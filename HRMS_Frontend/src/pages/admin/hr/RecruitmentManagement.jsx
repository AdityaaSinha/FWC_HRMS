import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Star,
  Download,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Building,
  Globe,
  UserPlus
} from 'lucide-react';

// Mock data for recruitment
const mockRecruitmentData = {
  totalJobs: 24,
  activeJobs: 18,
  totalApplications: 342,
  interviewsScheduled: 28,
  jobPostings: [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$85,000 - $120,000',
      applications: 45,
      status: 'Active',
      postedDate: '2024-12-01',
      deadline: '2024-12-31',
      description: 'Looking for an experienced React developer to join our frontend team.'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$95,000 - $130,000',
      applications: 32,
      status: 'Active',
      postedDate: '2024-11-28',
      deadline: '2024-12-25',
      description: 'Seeking a strategic product manager to drive product vision and roadmap.'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$75,000 - $105,000',
      applications: 28,
      status: 'Draft',
      postedDate: '2024-12-05',
      deadline: '2024-12-30',
      description: 'Creative UX designer needed to enhance user experience across our platforms.'
    }
  ],
  candidates: [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior React Developer',
      experience: '5 years',
      status: 'Interview Scheduled',
      rating: 4.5,
      appliedDate: '2024-12-03',
      resume: 'sarah_johnson_resume.pdf',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL']
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      position: 'Product Manager',
      experience: '7 years',
      status: 'Under Review',
      rating: 4.2,
      appliedDate: '2024-12-01',
      resume: 'michael_chen_resume.pdf',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      experience: '4 years',
      status: 'Shortlisted',
      rating: 4.8,
      appliedDate: '2024-12-02',
      resume: 'emily_rodriguez_resume.pdf',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    }
  ],
  interviewSchedule: [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      position: 'Senior React Developer',
      interviewer: 'John Smith',
      date: '2024-12-15',
      time: '10:00 AM',
      type: 'Technical',
      status: 'Scheduled'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      interviewer: 'Lisa Wang',
      date: '2024-12-16',
      time: '2:00 PM',
      type: 'Behavioral',
      status: 'Scheduled'
    }
  ],
  recentActivity: [
    { id: 1, action: 'New application received for Senior React Developer', time: '2 hours ago' },
    { id: 2, action: 'Interview scheduled with Sarah Johnson', time: '4 hours ago' },
    { id: 3, action: 'Job posting published: UX Designer', time: '1 day ago' },
    { id: 4, action: 'Candidate Emily Rodriguez moved to shortlist', time: '2 days ago' }
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

export default function RecruitmentManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleCreateJob = () => {
    setModalType('create-job');
    setShowModal(true);
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setModalType('view-candidate');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Draft': return 'bg-yellow-900 text-yellow-300';
      case 'Closed': return 'bg-gray-700 text-gray-300';
      case 'Interview Scheduled': return 'bg-blue-900 text-blue-300';
      case 'Under Review': return 'bg-yellow-900 text-yellow-300';
      case 'Shortlisted': return 'bg-green-900 text-green-300';
      case 'Rejected': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recruitment Management</h1>
          <p className="text-gray-400 text-sm">Manage job postings, candidate applications, and recruitment processes</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreateJob}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Job Postings"
          value={mockRecruitmentData.totalJobs}
          icon={<Briefcase />}
          color="indigo"
          subtitle="All positions"
        />
        <StatCard
          title="Active Jobs"
          value={mockRecruitmentData.activeJobs}
          icon={<Globe />}
          color="green"
          subtitle="Currently hiring"
        />
        <StatCard
          title="Total Applications"
          value={mockRecruitmentData.totalApplications}
          icon={<Users />}
          color="blue"
          subtitle="All candidates"
        />
        <StatCard
          title="Interviews Scheduled"
          value={mockRecruitmentData.interviewsScheduled}
          icon={<Calendar />}
          color="yellow"
          subtitle="This month"
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
                  { id: 'jobs', label: 'Job Postings', icon: Briefcase },
                  { id: 'candidates', label: 'Candidates', icon: Users },
                  { id: 'interviews', label: 'Interviews', icon: Calendar },
                  { id: 'analytics', label: 'Analytics', icon: FileText }
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
                  {/* Recent Job Postings */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Recent Job Postings</h3>
                    <div className="space-y-3">
                      {mockRecruitmentData.jobPostings.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{job.title}</p>
                            <p className="text-sm text-gray-400">{job.department} • {job.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">{job.applications} applications</p>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Candidates */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Top Candidates</h3>
                    <div className="space-y-3">
                      {mockRecruitmentData.candidates.slice(0, 3).map((candidate) => (
                        <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{candidate.name}</p>
                            <p className="text-sm text-gray-400">{candidate.position}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white">{candidate.rating}</span>
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Job Postings Tab */}
            {activeTab === 'jobs' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Departments</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateJob}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Post Job
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRecruitmentData.jobPostings.map((job) => (
                    <div key={job.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{job.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Building size={14} />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign size={14} />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Posted: {job.postedDate}</span>
                            <span>Deadline: {job.deadline}</span>
                            <span className="text-indigo-400">{job.applications} applications</span>
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
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidates Tab */}
            {activeTab === 'candidates' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                      <option value="all">All Status</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="review">Under Review</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockRecruitmentData.candidates.map((candidate) => (
                    <div key={candidate.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-white">{candidate.name}</h3>
                          <p className="text-sm text-gray-400">{candidate.position}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{candidate.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail size={14} />
                          <span>{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone size={14} />
                          <span>{candidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Briefcase size={14} />
                          <span>{candidate.experience} experience</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300 rounded">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                            +{candidate.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewCandidate(candidate)}
                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interviews Tab */}
            {activeTab === 'interviews' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Interview Schedule</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Schedule Interview
                  </button>
                </div>

                <div className="space-y-4">
                  {mockRecruitmentData.interviewSchedule.map((interview) => (
                    <div key={interview.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium text-white">{interview.candidateName}</h4>
                            <p className="text-sm text-gray-400">{interview.position}</p>
                          </div>
                          <div className="text-sm text-gray-400">
                            <p>Interviewer: {interview.interviewer}</p>
                            <p>{interview.type} Interview</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">{interview.date}</p>
                          <p className="text-sm text-gray-400">{interview.time}</p>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
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
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Recruitment Analytics</h3>
                  <p className="text-gray-400 mb-6">Track hiring metrics, conversion rates, and recruitment performance</p>
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
                <span>Post New Job</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Calendar className="h-4 w-4" />
                <span>Schedule Interview</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Candidates</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <FileText className="h-4 w-4" />
                <span>Generate Reports</span>
              </button>
            </div>
          </div>

          {/* Hiring Pipeline */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Hiring Pipeline</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Applications</span>
                <span className="text-white font-medium">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Screening</span>
                <span className="text-yellow-400 font-medium">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Interviews</span>
                <span className="text-blue-400 font-medium">28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Offers</span>
                <span className="text-green-400 font-medium">12</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockRecruitmentData.recentActivity.map((activity) => (
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
              {modalType === 'create-job' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Post New Job</h3>
                  <p className="text-gray-400 mb-6">Create a new job posting to attract candidates.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Job Posting
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-candidate' && selectedCandidate && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Candidate Profile</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedCandidate.name}</h4>
                      <p className="text-gray-400">{selectedCandidate.position}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{selectedCandidate.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">{selectedCandidate.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Experience</p>
                        <p className="text-white">{selectedCandidate.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{selectedCandidate.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Schedule Interview
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Reject
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