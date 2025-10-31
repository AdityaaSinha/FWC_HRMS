import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, Users, Building } from 'lucide-react';

export default function HRJobDetailsPage() {
  const { id } = useParams();
  const { jobs } = useOutletContext();
  const navigate = useNavigate();
  
  const job = jobs.find(j => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Job not found</h2>
          <p className="text-gray-400 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/hr/jobs')} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Back to Job List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => navigate('/hr/jobs')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Job List
      </button>

      {/* --- Job Header --- */}
      <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <Building size={16} />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{job.jobType}</span>
              </div>
            </div>
          </div>
          <span 
            className={`px-4 py-2 rounded-full text-sm font-medium
              ${job.status === 'OPEN' 
                ? 'bg-green-800 text-green-300' 
                : 'bg-red-800 text-red-300'
              }
            `}
          >
            {job.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Users size={16} />
            <span>{job.openings} Opening{job.openings !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <DollarSign size={16} />
            <span>{job.salaryRange || 'Salary not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar size={16} />
            <span>Posted: {new Date(job.datePosted).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {/* --- Job Details --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-3">Job Description</h2>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {job.description || 'No description provided.'}
          </p>
        </div>
        
        <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-3">Requirements</h2>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {job.requirements || 'No requirements listed.'}
          </p>
        </div>
      </div>

      {/* --- Benefits Section --- */}
      {job.benefits && (
        <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">Benefits</h2>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{job.benefits}</p>
        </div>
      )}

      {/* --- Posted By Section --- */}
      {job.postedBy && (
        <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">Posted By</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {job.postedBy.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{job.postedBy.name}</p>
              <p className="text-gray-400 text-sm">{job.postedBy.email}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* --- Application Statistics --- */}
      {job.applicationStats && (
        <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Application Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-400">
                {job.applicationStats.totalApplications || 0}
              </div>
              <div className="text-sm text-gray-400">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {job.applicationStats.newApplications || 0}
              </div>
              <div className="text-sm text-gray-400">New</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {job.applicationStats.interviewingApplications || 0}
              </div>
              <div className="text-sm text-gray-400">Interviewing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {job.applicationStats.hiredApplications || 0}
              </div>
              <div className="text-sm text-gray-400">Hired</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}