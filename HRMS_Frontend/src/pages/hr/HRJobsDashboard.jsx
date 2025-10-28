import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
// MOCK_JOBS is no longer needed here

export default function HRJobsDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
      // You could set an error state here
    }
  };

  // --- UPDATED addJob function ---
  const addJob = async (newJob) => {
    try {
      const response = await fetch('http://localhost:3001/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) { // THIS IS THE FIX
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create job');
      }

      const createdJob = await response.json();
      setJobs([createdJob, ...jobs]);
      return { success: true }; // Send success back to the form
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message }; // Send failure back
    }
  };

  // --- UPDATED toggleJobStatus function ---
  const toggleJobStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updatedJob = await response.json();
      setJobs(jobs.map(job => (job.id === id ? updatedJob : job)));
    } catch (error) {
      console.error(error);
    }
  };

  // --- UPDATED editJob function ---
  const editJob = async (id, updatedJobData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJobData),
      });
      if (!response.ok) throw new Error('Failed to edit job');
      const updatedJob = await response.json();
      setJobs(jobs.map(job => (job.id === id ? updatedJob : job)));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  // --- UPDATED archiveJob function ---
  const archiveJob = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  // (duplicateJob logic can be added here similarly)

  return (
    <div className="space-y-6">
      <Outlet context={{ 
        jobs, 
        addJob, 
        toggleJobStatus, 
        editJob, 
        archiveJob 
        // duplicateJob
      }} />
    </div>
  );
}

export function useJobsContext() {
  return useOutletContext();
}