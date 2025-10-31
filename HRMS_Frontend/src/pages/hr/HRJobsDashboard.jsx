import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import jobService from '../../services/jobService';

export default function HRJobsDashboard() {
  console.log('🚨🚨🚨 CRITICAL DEBUG: HRJobsDashboard is MOUNTING!!! 🚨🚨🚨', new Date().toISOString());
  console.log('🚨🚨🚨 If you see this, the component is working! 🚨🚨🚨');
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🔄 HRJobsDashboard useEffect triggered!');
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      console.log('🔄 Starting to fetch jobs from API...');
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('🔑 Token exists:', !!token);
      
      const response = await fetch('http://localhost:3001/api/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Jobs data received:', data);
      
      // The API returns { jobs: [...], totalCount, hasMore }
      // We need to extract the jobs array
      const jobsArray = data.jobs || data; // Fallback to data if it's already an array
      console.log('📊 Number of jobs:', jobsArray.length);
      setJobs(jobsArray);
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATED addJob function ---
  const addJob = async (newJob) => {
    try {
      const createdJob = await jobService.createJob(newJob);
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
      const updatedJob = await jobService.updateJobStatus(id, newStatus);
      setJobs(jobs.map(job => (job.id === id ? updatedJob : job)));
    } catch (error) {
      console.error(error);
    }
  };

  // --- UPDATED editJob function ---
  const editJob = async (id, updatedJobData) => {
    try {
      const updatedJob = await jobService.updateJob(id, updatedJobData);
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
      await jobService.archiveJob(id);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  // --- UPDATED duplicateJob function ---
  const duplicateJob = async (id) => {
    try {
      const duplicatedJob = await jobService.duplicateJob(id);
      setJobs([duplicatedJob, ...jobs]); // Add to the beginning of the list
    } catch (error) {
      console.error('Error duplicating job:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Outlet context={{ 
        jobs, 
        loading,
        addJob, 
        toggleJobStatus, 
        editJob, 
        archiveJob,
        duplicateJob
      }} />
    </div>
  );
}

export function useJobsContext() {
  return useOutletContext();
}