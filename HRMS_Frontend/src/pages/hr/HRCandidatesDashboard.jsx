// src/pages/hr/HRCandidatesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Star, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Phone, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Award,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import candidateService from '../../services/candidateService.js';
import interviewService from '../../services/interviewService.js';
import jobService from '../../services/jobService.js';

// Enhanced mock candidates with comprehensive application data (fallback)
const ENHANCED_CANDIDATES = [
  { 
    id: 1, 
    name: 'Rohit Sharma', 
    email: 'rohit@example.com', 
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    role: 'Frontend Developer', 
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    score: 89,
    status: 'interviewed',
    appliedDate: '2024-01-15',
    experience: '5 years',
    education: 'B.S. Computer Science',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
    resumeUrl: '/resumes/rohit-sharma.pdf',
    coverLetter: 'Passionate about creating user-friendly interfaces...',
    interviewDate: '2024-01-25',
    notes: 'Strong technical skills, good communication',
    salary: '$95,000',
    availability: 'Immediate'
  },
  { 
    id: 2, 
    name: 'Sneha Verma', 
    email: 'sneha@example.com', 
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    role: 'HR Executive', 
    jobId: 2,
    jobTitle: 'HR Business Partner',
    score: 92,
    status: 'offer_sent',
    appliedDate: '2024-01-12',
    experience: '7 years',
    education: 'MBA Human Resources',
    skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Compliance'],
    resumeUrl: '/resumes/sneha-verma.pdf',
    coverLetter: 'Experienced HR professional with proven track record...',
    interviewDate: '2024-01-22',
    notes: 'Excellent cultural fit, strong leadership potential',
    salary: '$85,000',
    availability: '2 weeks notice'
  },
  { 
    id: 3, 
    name: 'Aditya Mehra', 
    email: 'aditya@example.com', 
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    role: 'Data Analyst', 
    jobId: 3,
    jobTitle: 'Senior Data Analyst',
    score: 76,
    status: 'in_review',
    appliedDate: '2024-01-18',
    experience: '3 years',
    education: 'M.S. Data Science',
    skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
    resumeUrl: '/resumes/aditya-mehra.pdf',
    coverLetter: 'Data-driven professional seeking to leverage analytics...',
    interviewDate: null,
    notes: 'Good technical background, needs more business experience',
    salary: '$75,000',
    availability: '1 month notice'
  },
  { 
    id: 4, 
    name: 'Maria Garcia', 
    email: 'maria@example.com', 
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    role: 'Marketing Manager', 
    jobId: 4,
    jobTitle: 'Digital Marketing Manager',
    score: 88,
    status: 'new',
    appliedDate: '2024-01-20',
    experience: '6 years',
    education: 'B.A. Marketing',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    resumeUrl: '/resumes/maria-garcia.pdf',
    coverLetter: 'Creative marketing professional with digital expertise...',
    interviewDate: null,
    notes: 'Impressive portfolio, strong results',
    salary: '$80,000',
    availability: 'Immediate'
  },
  { 
    id: 5, 
    name: 'James Wilson', 
    email: 'james@example.com', 
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    role: 'UX Designer', 
    jobId: 5,
    jobTitle: 'Senior UX Designer',
    score: 94,
    status: 'hired',
    appliedDate: '2024-01-10',
    experience: '8 years',
    education: 'B.F.A. Design',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    resumeUrl: '/resumes/james-wilson.pdf',
    coverLetter: 'User-centered designer passionate about creating...',
    interviewDate: '2024-01-20',
    notes: 'Exceptional portfolio, great team fit',
    salary: '$105,000',
    availability: 'Started'
  }
];

// Status configuration
const STATUS_CONFIG = {
  NEW: { label: 'New', color: 'bg-blue-900/30 text-blue-300 border-blue-700', icon: Clock },
  SCREENING: { label: 'Screening', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-700', icon: Eye },
  INTERVIEW: { label: 'Interview', color: 'bg-purple-900/30 text-purple-300 border-purple-700', icon: Calendar },
  OFFERED: { label: 'Offered', color: 'bg-orange-900/30 text-orange-300 border-orange-700', icon: Mail },
  HIRED: { label: 'Hired', color: 'bg-green-900/30 text-green-300 border-green-700', icon: CheckCircle },
  REJECTED: { label: 'Rejected', color: 'bg-red-900/30 text-red-300 border-red-700', icon: XCircle }
};

export default function HRCandidatesDashboard() {
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get('job');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Candidate creation modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appliedForJobId: ''
  });
  
  // Jobs for dropdown
  const [availableJobs, setAvailableJobs] = useState([]);
  
  // API state
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCandidates: 0
  });

  // Fetch candidates from API
  const fetchCandidates = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(jobFilter && { jobId: jobFilter })
      };

      const response = await candidateService.getAllCandidates(params);
      setCandidates(response.candidates || []);
      setPagination({
        currentPage: response.pagination?.currentPage || 1,
        totalPages: response.pagination?.totalPages || 1,
        totalCandidates: response.pagination?.totalCandidates || 0
      });
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to load candidates. Please try again.');
      // Fallback to mock data on error
      setCandidates(ENHANCED_CANDIDATES);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available jobs for candidate creation
  const fetchAvailableJobs = async () => {
    try {
      const response = await jobService.getAllJobs({ status: 'OPEN', limit: 100 });
      setAvailableJobs(response.jobs || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      // Fallback to mock jobs
      setAvailableJobs([
        { id: 1, title: 'Senior Frontend Developer', department: 'Engineering' },
        { id: 2, title: 'Backend Developer', department: 'Engineering' },
        { id: 3, title: 'Product Manager', department: 'Product' },
        { id: 4, title: 'UI/UX Designer', department: 'Design' },
        { id: 5, title: 'Data Analyst', department: 'Analytics' }
      ]);
    }
  };

  // Handle candidate creation
  const handleCreateCandidate = async (e) => {
    e.preventDefault();
    
    if (!createFormData.name || !createFormData.email || !createFormData.appliedForJobId) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    try {
      await candidateService.createCandidate(createFormData);
      
      // Reset form and close modal
      setCreateFormData({
        name: '',
        email: '',
        phone: '',
        appliedForJobId: ''
      });
      setShowCreateModal(false);
      
      // Refresh candidates list
      fetchCandidates(pagination.currentPage);
      
      alert('Candidate created successfully!');
    } catch (err) {
      console.error('Error creating candidate:', err);
      alert('Failed to create candidate. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load candidates on component mount and when filters change
  useEffect(() => {
    fetchCandidates(1);
    fetchAvailableJobs();
  }, [searchTerm, statusFilter, jobFilter]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        fetchCandidates(1);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Filter candidates for display (when using fallback data)
  const filteredCandidates = candidates.filter(candidate => {
    if (candidates === ENHANCED_CANDIDATES) {
      // Apply client-side filtering for mock data
      const matchesJob = !jobFilter || candidate.jobId?.toString() === jobFilter;
      const matchesSearch = !searchTerm || 
        candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      
      return matchesJob && matchesSearch && matchesStatus;
    }
    // For API data, filtering is done server-side
    return true;
  });

  const handleViewApplication = (candidate) => {
    setSelectedCandidate(candidate);
    setShowApplicationModal(true);
  };

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await candidateService.updateCandidateStatus(candidateId, newStatus);
      // Refresh candidates list
      fetchCandidates(pagination.currentPage);
    } catch (err) {
      console.error('Error updating candidate status:', err);
      alert('Failed to update candidate status. Please try again.');
    }
  };

  const handleScheduleInterview = async (candidate) => {
    try {
      // This would open an interview scheduling modal in a real implementation
      console.log('Scheduling interview for candidate:', candidate.id);
      alert('Interview scheduling feature will be implemented in the next phase.');
    } catch (err) {
      console.error('Error scheduling interview:', err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {jobFilter ? 'Job Applications' : 'Candidate Pool'}
          </h2>
          {jobFilter && (
            <p className="text-gray-400">
              Viewing applications for Job ID: {jobFilter}
            </p>
          )}
          {pagination.totalCandidates > 0 && (
            <p className="text-gray-400">
              {pagination.totalCandidates} total candidates
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Candidate
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, email, role, or skills..."
            className="w-full pl-10 pr-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const count = filteredCandidates.filter(c => c.status === status).length;
          const Icon = config.icon;
          return (
            <div key={status} className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">{config.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-gray-400">Loading candidates...</span>
          </div>
        </div>
      )}

      {/* Candidates Table */}
      {!loading && (
        <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-[#23263A] text-gray-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3">Candidate</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Applied</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No candidates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const statusConfig = STATUS_CONFIG[candidate.status] || STATUS_CONFIG.NEW;
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <tr key={candidate.id} className="border-b border-gray-800 hover:bg-[#23263A] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                              <User size={20} className="text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{candidate.name || candidate.firstName + ' ' + candidate.lastName}</h3>
                              <p className="text-sm text-gray-400">{candidate.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-white">{candidate.role || candidate.position}</p>
                            <p className="text-sm text-gray-400">{candidate.jobTitle || candidate.job?.title}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Star size={16} className="text-yellow-400" />
                            <span className="font-medium text-white">{candidate.score || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                            <StatusIcon size={12} />
                            {statusConfig.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {candidate.appliedDate ? new Date(candidate.appliedDate).toLocaleDateString() : 
                           candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {candidate.experience || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewApplication(candidate)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                              title="View Application"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleScheduleInterview(candidate)}
                              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors"
                              title="Schedule Interview"
                            >
                              <Calendar size={16} />
                            </button>
                            <button
                              className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 rounded transition-colors"
                              title="Send Message"
                            >
                              <MessageSquare size={16} />
                            </button>
                            <select
                              value={candidate.status}
                              onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                              className="text-xs bg-[#2A2D3D] border border-gray-700 rounded px-2 py-1 text-white"
                            >
                              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                <option key={key} value={key}>{config.label}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchCandidates(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 bg-[#2A2D3D] border border-gray-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3D4D] transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchCandidates(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 bg-[#2A2D3D] border border-gray-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3D4D] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Application Detail Modal */}
      {showApplicationModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCandidate.name || `${selectedCandidate.firstName} ${selectedCandidate.lastName}`}
                  </h2>
                  <p className="text-gray-400">{selectedCandidate.jobTitle || selectedCandidate.job?.title}</p>
                </div>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail size={16} />
                      <span>{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone size={16} />
                      <span>{selectedCandidate.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={16} />
                      <span>{selectedCandidate.location || selectedCandidate.address || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Application Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      <span>Applied: {selectedCandidate.appliedDate 
                        ? new Date(selectedCandidate.appliedDate).toLocaleDateString()
                        : selectedCandidate.createdAt 
                        ? new Date(selectedCandidate.createdAt).toLocaleDateString()
                        : 'N/A'
                      }</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Briefcase size={16} />
                      <span>Experience: {selectedCandidate.experience || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <GraduationCap size={16} />
                      <span>{selectedCandidate.education || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {(selectedCandidate.skills || selectedCandidate.skillsArray) && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCandidate.skills || selectedCandidate.skillsArray || []).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm border border-indigo-700"
                      >
                        {typeof skill === 'string' ? skill : skill.name || skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedCandidate.coverLetter && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Cover Letter</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300">{selectedCandidate.coverLetter}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCandidate.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Interview Notes</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300">{selectedCandidate.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                {selectedCandidate.resumeUrl && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Download size={16} />
                    Download Resume
                  </button>
                )}
                <button 
                  onClick={() => handleScheduleInterview(selectedCandidate)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Calendar size={16} />
                  Schedule Interview
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  <MessageSquare size={16} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Candidate</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={createFormData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={createFormData.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applied For Job *
                </label>
                <select
                  name="appliedForJobId"
                  value={createFormData.appliedForJobId}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a job position</option>
                  {availableJobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Candidate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
