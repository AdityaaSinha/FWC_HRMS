import api from './api.js';

// Hiring Workflow Service - handles all hiring workflow-related API calls
const hiringWorkflowService = {
  // Get hiring pipeline overview
  getHiringPipeline: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.jobId) queryParams.append('jobId', params.jobId);
    if (params.department) queryParams.append('department', params.department);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    
    const url = `/hiring-workflow/pipeline${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  },

  // Advance candidate to next stage
  advanceCandidate: async (candidateId, data = {}) => {
    return api.patch(`/hiring-workflow/candidate/${candidateId}/advance`, data);
  },

  // Reject candidate
  rejectCandidate: async (candidateId, data) => {
    return api.patch(`/hiring-workflow/candidate/${candidateId}/reject`, data);
  },

  // Get hiring workflow statistics
  getHiringStats: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.timeframe) queryParams.append('timeframe', params.timeframe);
    if (params.department) queryParams.append('department', params.department);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    
    const url = `/hiring-workflow/stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  },

  // Get hiring bottlenecks analysis
  getHiringBottlenecks: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.department) queryParams.append('department', params.department);
    if (params.jobId) queryParams.append('jobId', params.jobId);
    
    const url = `/hiring-workflow/bottlenecks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  },

  // Get conversion rates between stages
  getConversionRates: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.jobId) queryParams.append('jobId', params.jobId);
    if (params.department) queryParams.append('department', params.department);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    
    const url = `/hiring-workflow/conversion-rates${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return api.get(url);
  }
};

export default hiringWorkflowService;