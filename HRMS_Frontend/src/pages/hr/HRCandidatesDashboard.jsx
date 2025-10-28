// src/pages/hr/HRCandidatesDashboard.jsx
import React, { useState } from 'react';
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
  Trash2
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// Enhanced mock candidates with comprehensive application data
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
  new: { label: 'New', color: 'bg-blue-900/30 text-blue-300 border-blue-700', icon: Clock },
  in_review: { label: 'In Review', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-700', icon: Eye },
  interviewed: { label: 'Interviewed', color: 'bg-purple-900/30 text-purple-300 border-purple-700', icon: Calendar },
  offer_sent: { label: 'Offer Sent', color: 'bg-orange-900/30 text-orange-300 border-orange-700', icon: Mail },
  hired: { label: 'Hired', color: 'bg-green-900/30 text-green-300 border-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-900/30 text-red-300 border-red-700', icon: XCircle }
};

export default function HRCandidatesDashboard() {
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get('job');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Filter candidates based on job ID from URL params and other filters
  const filteredCandidates = ENHANCED_CANDIDATES.filter(candidate => {
    const matchesJob = !jobFilter || candidate.jobId.toString() === jobFilter;
    const matchesSearch = !searchTerm || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesJob && matchesSearch && matchesStatus;
  });

  const handleViewApplication = (candidate) => {
    setSelectedCandidate(candidate);
    setShowApplicationModal(true);
  };

  const handleStatusChange = (candidateId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Updating candidate ${candidateId} status to ${newStatus}`);
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
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

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

      {/* Candidates Table */}
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
                  const statusConfig = STATUS_CONFIG[candidate.status];
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <tr key={candidate.id} className="border-b border-gray-800 hover:bg-[#23263A] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{candidate.name}</h3>
                            <p className="text-sm text-gray-400">{candidate.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{candidate.role}</p>
                          <p className="text-sm text-gray-400">{candidate.jobTitle}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-400" />
                          <span className="font-medium text-white">{candidate.score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon size={12} />
                          {statusConfig.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(candidate.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {candidate.experience}
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
      </div>

      {/* Application Detail Modal */}
      {showApplicationModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedCandidate.name}</h2>
                  <p className="text-gray-400">{selectedCandidate.jobTitle}</p>
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
                      <span>{selectedCandidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={16} />
                      <span>{selectedCandidate.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Application Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      <span>Applied: {new Date(selectedCandidate.appliedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Briefcase size={16} />
                      <span>Experience: {selectedCandidate.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <GraduationCap size={16} />
                      <span>{selectedCandidate.education}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm border border-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cover Letter</h3>
                <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300">{selectedCandidate.coverLetter}</p>
                </div>
              </div>

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
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Download size={16} />
                  Download Resume
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
    </div>
  );
}
