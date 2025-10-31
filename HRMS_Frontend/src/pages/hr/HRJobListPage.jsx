import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  XCircle, 
  CheckCircle, 
  Copy, 
  Trash2,
  Users,
  Eye,
  Calendar,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  ChevronDown
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

// --- Department Tabs ---
// In a real app, you might fetch this from the database
const TABS = ['All', 'Engineering', 'HR', 'Marketing', 'Sales', 'Design', 'Archived'];

// --- Application Stats Component ---
const ApplicationStats = ({ job }) => {
  // Use real data from the job's applicationStats if available, otherwise show 0
  const stats = job.applicationStats || {
    totalApplications: 0,
    newApplications: 0,
    interviewingApplications: 0,
    hiredApplications: 0,
    rejectedApplications: 0,
    recentApplications: 0
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1 bg-blue-900/30 px-2 py-1 rounded text-xs">
        <Users size={12} className="text-blue-400" />
        <span className="text-blue-300 font-medium">{stats.totalApplications}</span>
        <span className="text-gray-400">Total</span>
      </div>
      {stats.newApplications > 0 && (
        <div className="flex items-center gap-1 bg-green-900/30 px-2 py-1 rounded text-xs">
          <AlertCircle size={12} className="text-green-400" />
          <span className="text-green-300 font-medium">{stats.newApplications}</span>
          <span className="text-gray-400">New</span>
        </div>
      )}
      {stats.interviewingApplications > 0 && (
        <div className="flex items-center gap-1 bg-yellow-900/30 px-2 py-1 rounded text-xs">
          <Calendar size={12} className="text-yellow-400" />
          <span className="text-yellow-300 font-medium">{stats.interviewingApplications}</span>
          <span className="text-gray-400">Interview</span>
        </div>
      )}
      {stats.hiredApplications > 0 && (
        <div className="flex items-center gap-1 bg-purple-900/30 px-2 py-1 rounded text-xs">
          <CheckCircle size={12} className="text-purple-400" />
          <span className="text-purple-300 font-medium">{stats.hiredApplications}</span>
          <span className="text-gray-400">Hired</span>
        </div>
      )}
    </div>
  );
};

// --- Policy Compliance Component ---
const PolicyCompliance = ({ job }) => {
  // For now, we'll show a simplified compliance status based on job data
  // In a real implementation, this would come from a separate compliance API
  const hasCompliance = job.requirements && job.jobDescription;
  
  return (
    <div className="flex flex-wrap gap-1">
      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
        hasCompliance ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
      }`}>
        <CheckSquare size={12} />
        <span className="font-medium">
          {hasCompliance ? 'Complete' : 'Incomplete'}
        </span>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function HRJobListPage() {
  const { 
    jobs, 
    loading,
    addJob, 
    toggleJobStatus, 
    editJob, 
    archiveJob,
    duplicateJob
  } = useOutletContext();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('All');
  const [showApplicationDropdown, setShowApplicationDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [showPolicyDropdown, setShowPolicyDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);



  // Filter jobs based on active tab and search
  const filteredJobs = jobs.filter(job => {
    // Tab filtering
    if (activeTab !== 'All' && job.department !== activeTab) {
      return false;
    }
    
    // Search filtering
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Application filter
    if (applicationFilter !== 'All') {
      const stats = job.applicationStats || { totalApplications: 0, newApplications: 0 };
      switch (applicationFilter) {
        case 'Has Applications':
          return stats.totalApplications > 0;
        case 'New Applications':
          return stats.newApplications > 0;
        case 'In Review':
          return stats.interviewingApplications > 0;
        case 'No Applications':
          return stats.totalApplications === 0;
        default:
          return true;
      }
    }
    
    return true;
  });

  // Calculate dynamic summary statistics from real job data
  const summaryStats = {
    activeJobs: jobs.filter(job => job.status === 'OPEN').length,
    totalApplications: jobs.reduce((sum, job) => sum + (job.applicationStats?.totalApplications || 0), 0),
    newApplications: jobs.reduce((sum, job) => sum + (job.applicationStats?.newApplications || 0), 0),
    hiredCandidates: jobs.reduce((sum, job) => sum + (job.applicationStats?.hiredApplications || 0), 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Job Listings</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/hr/jobs/create')}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusCircle size={18} /> Add Job
          </button>
        </div>
      </div>
      
      {/* --- Filters & Search --- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        {/* Filter Tabs */}
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab === tab 
                  ? 'border-b-2 border-indigo-500 text-indigo-400' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#1B1E2B] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* --- Job Table --- */}
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#23263A] border-b border-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[220px]">Job Title & Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[140px]">
                <div className="relative">
                  <button
                    onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Department <ChevronDown size={14} />
                  </button>
                  {showDepartmentDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[140px]">
                      {['All', 'Engineering', 'HR', 'Marketing', 'Sales', 'Design'].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            setActiveTab(dept);
                            setShowDepartmentDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                            activeTab === dept ? 'text-indigo-400 bg-gray-700' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[100px]">Openings</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[280px]">
                <div className="relative">
                  <button
                    onClick={() => setShowApplicationDropdown(!showApplicationDropdown)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Applications <ChevronDown size={14} />
                  </button>
                  {showApplicationDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                      {['All', 'Has Applications', 'New Applications', 'In Review', 'No Applications'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setApplicationFilter(filter);
                            setShowApplicationDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                            applicationFilter === filter ? 'text-indigo-400 bg-gray-700' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[160px]">
                <div className="relative">
                  <button
                    onClick={() => setShowPolicyDropdown(!showPolicyDropdown)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Compliance <ChevronDown size={14} />
                  </button>
                  {showPolicyDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                      {['All', 'Complete', 'Incomplete'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            // Add policy filter logic here if needed
                            setShowPolicyDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[120px]">
                <div className="relative">
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Date Posted <ChevronDown size={14} />
                  </button>
                  {showDateDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                      {['All', 'Today', 'This Week', 'This Month'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            // Add date filter logic here if needed
                            setShowDateDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-[100px]">
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Status <ChevronDown size={14} />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                      {['All', 'Open', 'Closed', 'Draft'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            // Add status filter logic here if needed
                            setShowStatusDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 w-[180px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No jobs found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => {
                return (
                <tr key={job.id} className="border-b border-gray-800 hover:bg-[#23263A] transition-colors">
                  <td className="px-4 py-5 w-[220px] align-top">
                    <div className="overflow-hidden space-y-1">
                      <h3 className="font-semibold text-white truncate leading-tight" title={job.title}>
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-400 truncate leading-tight" title="Remote">
                        <span className="inline-flex items-center">
                          📍 Remote
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[140px] align-top">
                    <div className="overflow-hidden">
                      <span className="inline-block px-3 py-1.5 bg-indigo-900/40 text-indigo-300 rounded-md text-sm font-medium border border-indigo-700/50 truncate max-w-full" title={job.department}>
                        {job.department}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[100px] align-top">
                    <div className="overflow-hidden">
                      <span className="inline-block px-3 py-1.5 bg-blue-900/40 text-blue-300 rounded-md text-sm font-medium border border-blue-700/50 truncate max-w-full" title={`${job.openings || 0} openings`}>
                        {job.openings || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[280px] align-top">
                    <div className="overflow-hidden">
                      <ApplicationStats job={job} />
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[160px] align-top">
                    <div className="overflow-hidden">
                      <PolicyCompliance job={job} />
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[120px] text-sm text-gray-400 align-top">
                    <div className="overflow-hidden">
                      <span className="truncate block" title={new Date(job.datePosted).toLocaleDateString()}>
                        {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[100px] align-top">
                    <div className="overflow-hidden">
                      <span 
                        className={`inline-block px-3 py-1.5 rounded-md text-sm font-medium truncate max-w-full
                          ${job.status === 'OPEN' 
                            ? 'bg-green-900/40 text-green-300 border border-green-700/50' 
                            : job.status === 'CLOSED'
                            ? 'bg-red-900/40 text-red-300 border border-red-700/50'
                            : 'bg-gray-900/40 text-gray-300 border border-gray-700/50'
                          }
                        `}
                        title={job.status}
                      >
                        {job.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[180px] align-top">
                    <div className="flex gap-2 overflow-hidden">
                      <button 
                        onClick={() => navigate(`/hr/jobs/${job.id}`)}
                        className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex-shrink-0"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => navigate(`/hr/jobs/${job.id}/edit`)}
                        className="flex items-center justify-center w-8 h-8 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors flex-shrink-0"
                        title="Edit Job"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => toggleJobStatus(job.id, job.status === 'OPEN' ? 'CLOSED' : 'OPEN')}
                        className={`flex items-center justify-center w-8 h-8 rounded transition-colors flex-shrink-0 ${
                          job.status === 'OPEN' 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        title={job.status === 'OPEN' ? 'Close Job' : 'Open Job'}
                      >
                        {job.status === 'OPEN' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                      </button>
                      <button 
                        onClick={() => duplicateJob && duplicateJob(job.id)}
                        className="flex items-center justify-center w-8 h-8 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors flex-shrink-0"
                        title="Duplicate Job"
                      >
                        <Copy size={14} />
                      </button>
                      <button 
                        onClick={() => archiveJob(job.id)}
                        className="flex items-center justify-center w-8 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors flex-shrink-0"
                        title="Archive Job"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- Summary Statistics --- */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{summaryStats.activeJobs}</p>
              <p className="text-sm text-gray-400">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <Users className="text-green-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{summaryStats.totalApplications}</p>
              <p className="text-sm text-gray-400">Total Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-yellow-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{summaryStats.newApplications}</p>
              <p className="text-sm text-gray-400">New Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-purple-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{summaryStats.hiredCandidates}</p>
              <p className="text-sm text-gray-400">Hired Candidates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
