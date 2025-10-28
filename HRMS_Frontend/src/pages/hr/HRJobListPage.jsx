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
import { useNavigate } from 'react-router-dom';
import { useJobsContext } from './HRJobsDashboard';

// --- Department Tabs ---
// In a real app, you might fetch this from the database
const TABS = ['All', 'Engineering', 'HR', 'Marketing', 'Sales', 'Design', 'Archived'];

// --- Mock Application Data ---
const MOCK_APPLICATIONS = {
  1: { total: 45, new: 12, inReview: 18, interviewed: 10, hired: 3, rejected: 2 },
  2: { total: 32, new: 8, inReview: 15, interviewed: 6, hired: 2, rejected: 1 },
  3: { total: 28, new: 5, inReview: 12, interviewed: 8, hired: 1, rejected: 2 },
  4: { total: 67, new: 20, inReview: 25, interviewed: 15, hired: 4, rejected: 3 },
  5: { total: 23, new: 7, inReview: 10, interviewed: 4, hired: 1, rejected: 1 },
};

// --- Policy Compliance Status ---
const POLICY_STATUS = {
  1: { eeoCompliant: true, backgroundCheck: true, drugTest: false, references: true },
  2: { eeoCompliant: true, backgroundCheck: false, drugTest: true, references: true },
  3: { eeoCompliant: true, backgroundCheck: true, drugTest: true, references: false },
  4: { eeoCompliant: true, backgroundCheck: true, drugTest: true, references: true },
  5: { eeoCompliant: false, backgroundCheck: true, drugTest: false, references: true },
};

// --- Status Badge Helper Component ---
// This now handles all 3 statuses from your database schema
function StatusBadge({ status }) {
  const statusStyles = {
    OPEN: 'bg-green-800 text-green-300',
    CLOSED: 'bg-red-800 text-red-300',
    ARCHIVED: 'bg-yellow-800 text-yellow-300',
  };
  
  const styles = statusStyles[status] || 'bg-gray-700 text-gray-300';
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

// --- Application Stats Component ---
function ApplicationStats({ jobId }) {
  const stats = MOCK_APPLICATIONS[jobId] || { total: 0, new: 0, inReview: 0, interviewed: 0, hired: 0, rejected: 0 };
  
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-700 min-w-[85px] text-center">
        <div className="text-blue-300 font-semibold text-base">{stats.total}</div>
        <div className="text-gray-400 text-xs truncate">Total</div>
      </div>
      <div className="bg-green-900/30 p-3 rounded-lg border border-green-700 min-w-[85px] text-center">
        <div className="text-green-300 font-semibold text-base">{stats.new}</div>
        <div className="text-gray-400 text-xs truncate">New</div>
      </div>
      <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-700 min-w-[85px] text-center">
        <div className="text-yellow-300 font-semibold text-base">{stats.inReview}</div>
        <div className="text-gray-400 text-xs truncate">Review</div>
      </div>
    </div>
  );
}

// --- Policy Compliance Component ---
function PolicyCompliance({ jobId }) {
  const policy = POLICY_STATUS[jobId] || { eeoCompliant: false, backgroundCheck: false, drugTest: false, references: false };
  
  const policies = [
    { key: 'eeoCompliant', label: 'EEO', status: policy.eeoCompliant },
    { key: 'backgroundCheck', label: 'Background', status: policy.backgroundCheck },
    { key: 'drugTest', label: 'Drug Test', status: policy.drugTest },
    { key: 'references', label: 'References', status: policy.references },
  ];
  
  return (
    <div className="flex flex-wrap gap-1 justify-start">
      {policies.map(({ key, label, status }) => (
        <div
          key={key}
          className={`px-2 py-1 rounded text-xs font-medium flex items-center justify-center min-w-[32px] ${
            status 
              ? 'bg-green-900/30 text-green-300 border border-green-700' 
              : 'bg-red-900/30 text-red-300 border border-red-700'
          }`}
          title={`${label}: ${status ? 'Compliant' : 'Not Compliant'}`}
        >
          {status ? <CheckSquare size={12} /> : <AlertCircle size={12} />}
        </div>
      ))}
    </div>
  );
}

// --- Main Page Component ---
export default function HRJobListPage() {
  const { jobs, toggleJobStatus, archiveJob, duplicateJob } = useJobsContext();
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

  // --- Filter + Search Logic ---
  const filteredJobs = jobs
    .filter(job => {
      // Robust filtering to prevent crashes
      const jobStatus = job?.status || 'ARCHIVED'; // Default to archived if no status
      
      // Tab Filtering
      if (activeTab === 'All') return jobStatus !== 'ARCHIVED';
      if (activeTab === 'Archived') return jobStatus === 'ARCHIVED';
      
      // Department Filtering (and hide archived)
      return job?.department === activeTab && jobStatus !== 'ARCHIVED';
    })
    .filter(job => {
      // Search Filtering with Optional Chaining (?.). 
      // This prevents the 'toLowerCase of undefined' crash.
      const titleMatch = job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const deptMatch = job?.department?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return titleMatch || deptMatch;
    })
    .filter(job => {
      // Application Status Filtering
      if (applicationFilter === 'All') return true;
      
      const stats = MOCK_APPLICATIONS[job.id] || { total: 0, new: 0, inReview: 0, interviewed: 0, hired: 0, rejected: 0 };
      
      switch (applicationFilter) {
        case 'Has Applications':
          return stats.total > 0;
        case 'New Applications':
          return stats.new > 0;
        case 'In Review':
          return stats.inReview > 0;
        case 'No Applications':
          return stats.total === 0;
        default:
          return true;
      }
    });

  // --- Action Handlers ---
  const handleArchive = (id, title) => {
    if (window.confirm(`Are you sure you want to archive the job "${title}"?`)) {
      archiveJob(id);
    }
  };

  const handleToggleStatus = (job) => {
    // We get the *new* status to send to the API
    const newStatus = job.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    toggleJobStatus(job.id, newStatus);
  };

  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Job Listings</h1>
        <button 
          onClick={() => navigate('/hr/jobs/create')}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusCircle size={18} /> Add Job
        </button>
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
        
        {/* Search Bar */}
        <div className="relative flex-shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or dept..."
            className="bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2 pl-10 w-full md:w-64"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* --- Job List Table --- */}
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-gray-300 table-fixed min-w-[1200px]">
          <thead className="bg-[#23263A] text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-4 py-3 w-[220px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Title</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowTitleDropdown(!showTitleDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Title"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showTitleDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showTitleDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[180px]">
                        {['All', 'Senior Positions', 'Junior Positions', 'Manager Positions', 'Developer Roles', 'Designer Roles'].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => {
                              // Add title filter logic here if needed
                              setShowTitleDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 w-[140px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Department</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Department"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showDepartmentDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showDepartmentDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                        {['All', 'Engineering', 'HR', 'Marketing', 'Sales', 'Design'].map((dept) => (
                          <button
                            key={dept}
                            onClick={() => {
                              setActiveTab(dept);
                              setShowDepartmentDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                              activeTab === dept ? 'bg-blue-900/30 text-blue-300' : 'text-gray-300'
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 w-[280px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Applications</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowApplicationDropdown(!showApplicationDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Applications"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showApplicationDropdown ? 'rotate-180' : ''}`} />
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
                              applicationFilter === filter ? 'bg-blue-900/30 text-blue-300' : 'text-gray-300'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 w-[160px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Policy Status</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowPolicyDropdown(!showPolicyDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Policy Status"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showPolicyDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showPolicyDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                        {['All', 'Fully Compliant', 'Partially Compliant', 'Non-Compliant', 'Pending Review'].map((policy) => (
                          <button
                            key={policy}
                            onClick={() => {
                              // Add policy filter logic here if needed
                              setShowPolicyDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                          >
                            {policy}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 w-[120px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Date Posted</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Date Posted"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showDateDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-[#1B1E2B] border border-gray-700 rounded-lg shadow-lg z-20 min-w-[160px]">
                        {['All', 'Today', 'This Week', 'This Month', 'Last 3 Months', 'Older'].map((date) => (
                          <button
                            key={date}
                            onClick={() => {
                              // Add date filter logic here if needed
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="px-4 py-3 w-[100px] relative">
                <div className="flex items-center justify-between">
                  <span className="truncate">Status</span>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Filter Status"
                    >
                      <ChevronDown size={14} className={`transform transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
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
                      <p className="text-sm text-gray-400 truncate leading-tight" title={job.location}>
                        <span className="inline-flex items-center">
                          📍 {job.location}
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
                  <td className="px-4 py-5 w-[280px] align-top">
                    <div className="overflow-hidden">
                      <ApplicationStats jobId={job.id} />
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[160px] align-top">
                    <div className="overflow-hidden">
                      <PolicyCompliance jobId={job.id} />
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[120px] text-sm text-gray-400 align-top">
                    <div className="overflow-hidden">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-800/50 rounded text-xs font-medium border border-gray-700/50 truncate" title={new Date(job.datePosted).toLocaleDateString()}>
                        📅 {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[100px] align-top">
                    <div className="overflow-hidden">
                      <StatusBadge status={job.status} />
                    </div>
                  </td>
                  <td className="px-4 py-5 w-[180px] align-top">
                    <div className="flex items-start gap-1 overflow-x-auto pb-1">
                      <button
                        onClick={() => navigate(`/hr/jobs/${job.id}`)}
                        className="p-2.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent hover:border-blue-700/50"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/hr/candidates?job=${job.id}`)}
                        className="p-2.5 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent hover:border-green-700/50"
                        title="View Applications"
                      >
                        <Users size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/hr/jobs/${job.id}/edit`)}
                        className="p-2.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/30 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent hover:border-yellow-700/50"
                        title="Edit Job"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(job)}
                        className={`p-2.5 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent ${
                          job.status === 'OPEN' 
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30 hover:border-red-700/50' 
                            : 'text-green-400 hover:text-green-300 hover:bg-green-900/30 hover:border-green-700/50'
                        }`}
                        title={job.status === 'OPEN' ? 'Close Job' : 'Open Job'}
                      >
                        {job.status === 'OPEN' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </button>
                      <button
                        onClick={() => duplicateJob(job.id)}
                        className="p-2.5 text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent hover:border-purple-700/50"
                        title="Duplicate Job"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => handleArchive(job.id, job.title)}
                        className="p-2.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700/30 rounded-lg transition-all duration-200 flex-shrink-0 border border-transparent hover:border-gray-600/50"
                        title="Archive Job"
                      >
                        <Trash2 size={16} />
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
              <p className="text-2xl font-bold text-white">{filteredJobs.length}</p>
              <p className="text-sm text-gray-400">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <Users className="text-green-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">
                {Object.values(MOCK_APPLICATIONS).reduce((sum, app) => sum + app.total, 0)}
              </p>
              <p className="text-sm text-gray-400">Total Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-yellow-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">
                {Object.values(MOCK_APPLICATIONS).reduce((sum, app) => sum + app.hired, 0)}
              </p>
              <p className="text-sm text-gray-400">Successful Hires</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-purple-400" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">
                {Object.values(POLICY_STATUS).filter(policy => 
                  policy.eeoCompliant && policy.backgroundCheck && policy.drugTest && policy.references
                ).length}
              </p>
              <p className="text-sm text-gray-400">Fully Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
