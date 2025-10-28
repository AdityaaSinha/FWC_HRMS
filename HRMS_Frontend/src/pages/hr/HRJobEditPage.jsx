import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobsContext } from './HRJobsDashboard';
import { ArrowLeft } from 'lucide-react';

export default function HRJobEditPage() {
  const { id } = useParams();
  const { jobs, editJob } = useJobsContext();
  const navigate = useNavigate();
  
  // Find the job to edit
  const jobToEdit = jobs.find(j => j.id === parseInt(id));

  // Form state, initialized with the job's data
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [openings, setOpenings] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  // Pre-fill the form once the component loads
  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title);
      setDepartment(jobToEdit.department);
      setOpenings(jobToEdit.openings);
      setJobDescription(jobToEdit.jobDescription || '');
      setRequirements(jobToEdit.requirements || '');
    }
  }, [jobToEdit]);

  if (!jobToEdit) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white">Job not found</h1>
        <button 
          onClick={() => navigate('/hr/jobs')} 
          className="flex items-center gap-2 text-gray-400 hover:text-white mt-4"
        >
          <ArrowLeft size={18} /> Back to Job List
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobData = {
      title,
      department,
      openings: parseInt(openings, 10),
      jobDescription,
      requirements,
    };
    editJob(jobToEdit.id, updatedJobData);
    navigate('/hr/jobs'); // Go back to the job list
  };

  return (
    <div>
      <button 
        onClick={() => navigate('/hr/jobs')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={18} /> Back to Job List
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Edit Job: {jobToEdit.title}
      </h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="p-6 bg-[#1B1E2B] rounded-xl border border-gray-800 space-y-4"
      >
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-[#2A2D3D] border-gray-700 rounded-lg text-white p-2"
            required
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
              className="mt-1 block w-full bg-[#2A2D3D] border-gray-700 rounded-lg text-white p-2"
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
              className="mt-1 block w-full bg-[#2A2D3D] border-gray-700 rounded-lg text-white p-2"
              min="1"
              required
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
            className="mt-1 block w-full bg-[#2A2D3D] border-gray-700 rounded-lg text-white p-2"
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
            className="mt-1 block w-full bg-[#2A2D3D] border-gray-700 rounded-lg text-white p-2"
            placeholder="List key qualifications, skills, and experience..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}