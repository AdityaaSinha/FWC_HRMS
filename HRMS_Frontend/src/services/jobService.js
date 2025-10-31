import api from './api.js';

// Job Service - handles all job-related API calls
const jobService = {
  // Get all jobs with optional filters and pagination
  getAllJobs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.department) queryParams.append('department', params.department);
    if (params.location) queryParams.append('location', params.location);
    
    const url = `/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  },

  // Get a single job by ID with detailed information
  getJobById: async (id) => {
    return api.get(`/jobs/${id}`);
  },

  // Create a new job
  createJob: async (jobData) => {
    return api.post('/jobs', jobData);
  },

  // Update an existing job
  updateJob: async (id, jobData) => {
    return api.put(`/jobs/${id}`, jobData);
  },

  // Update job status
  updateJobStatus: async (id, status) => {
    return api.put(`/jobs/${id}/status`, { status });
  },

  // Archive/Delete a job
  archiveJob: async (id) => {
    return api.delete(`/jobs/${id}`);
  },

  // Duplicate a job
  duplicateJob: async (id) => {
    return api.post(`/jobs/${id}/duplicate`);
  },

  // Get job application statistics overview
  getJobStats: async () => {
    return api.get('/jobs/stats/overview');
  },

  // Get job applications for a specific job
  getJobApplications: async (jobId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);
    
    const url = `/candidates?jobId=${jobId}${queryParams.toString() ? `&${queryParams.toString()}` : ''}`;
    return api.get(url);
  }
};

export default jobService;