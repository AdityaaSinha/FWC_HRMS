import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobsContext } from './HRJobsDashboard';
import { ArrowLeft } from 'lucide-react';

export default function HRCreateJobPage() {
  const { addJob } = useJobsContext();
  const navigate = useNavigate();

  // State for the form fields
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [openings, setOpenings] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic frontend validation
    if (!title) {
      setError('Job title is required.');
      return;
    }
    if (!department) {
      setError('Department is required.');
      return;
    }

    setIsLoading(true); // Start loading

    const newJob = {
      title,
      department,
      openings: parseInt(openings, 10),
      jobDescription,
      requirements,
    };
    
    // Check the result from the backend
    const result = await addJob(newJob);
    
    setIsLoading(false); // Stop loading

    if (result.success) {
      navigate('/hr/jobs'); // Go back to the job list
    } else {
      // Show the error from the backend
      setError(result.error || 'An unknown error occurred.');
    }
  };

  return (
    <div>
      <button 
        onClick={() => navigate('/hr/jobs')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={18} /> Back to Job List
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Create New Job</h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 space-y-4"
      >
        {/* --- ALL YOUR FORM FIELDS ARE HERE --- */}

        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2"
          />
        </div>

        {/* Department & Openings (Side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2"
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Design</option>
            </select>
          </div>
          <div>
            <label htmlFor="openings" className="block text-sm font-medium text-gray-300">Openings</label>
            <input
              type="number"
              id="openings"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              className="mt-1 block w-full bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2"
              min="1"
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300">Job Description</label>
          <textarea
            id="jobDescription"
            rows="5"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-1 block w-full bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2"
            placeholder="Enter a summary of the role..."
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-300">Requirements</label>
          <textarea
            id="requirements"
            rows="5"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="mt-1 block w-full bg-[#2A2D3D] border border-gray-700 rounded-lg text-white p-2"
            placeholder="List key qualifications, skills, and experience..."
          ></textarea>
        </div>
        
        {/* --- END OF FORM FIELDS --- */}

        {/* Submit Button + Error Message */}
        <div className="flex justify-end items-center gap-4 pt-2">
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
}