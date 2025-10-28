import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobsContext } from './HRJobsDashboard';
import { ArrowLeft } from 'lucide-react';

export default function HRJobDetailsPage() {
  const { id } = useParams();
  const { jobs } = useJobsContext();
  const navigate = useNavigate();
  
  const job = jobs.find(j => j.id === parseInt(id));

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div>
      <button 
        onClick={() => navigate('/hr/jobs')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={18} /> Back to Job List
      </button>

      {/* --- Job Header --- */}
      <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">{job.title}</h1>
            <p className="text-lg text-indigo-400">{job.department}</p>
          </div>
          <span 
            className={`px-4 py-1 rounded-full text-sm font-medium
              ${job.status === 'Open' 
                ? 'bg-green-800 text-green-300' 
                : 'bg-red-800 text-red-300'
              }
            `}
          >
            {job.status}
          </span>
        </div>
        <p className="mt-4 text-gray-400">Number of Openings: {job.openings}</p>
      </div>
      
      {/* --- Job Details --- */}
      <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">Job Description</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{job.jobDescription || 'No description provided.'}</p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">Requirements</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{job.requirements || 'No requirements listed.'}</p>
      </div>
      
      {/* --- Candidates Section (SUGGESTION) --- */}
      <div className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-3">Applicants for this Job</h2>
        <p className="text-gray-400">
          (This is where you would list candidates who have applied for "{job.title}")
        </p>
      </div>
    </div>
  );
}