import api from './api.js';

// Candidate Service - handles all candidate-related API calls
const candidateService = {
  // Get all candidates with optional filters
  getAllCandidates: async (params = {}) => {
    try {
      return await api.get('/candidates', { params });
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },

  // Get candidate by ID
  getCandidateById: async (candidateId) => {
    try {
      return await api.get(`/candidates/${candidateId}`);
    } catch (error) {
      console.error('Error fetching candidate:', error);
      throw error;
    }
  },

  // Create a new candidate
  createCandidate: async (candidateData) => {
    try {
      return await api.post('/candidates', candidateData);
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw error;
    }
  },

  // Update candidate
  updateCandidate: async (candidateId, candidateData) => {
    try {
      return await api.put(`/candidates/${candidateId}`, candidateData);
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },

  // Update candidate status
  updateCandidateStatus: async (candidateId, status) => {
    try {
      return await api.patch(`/candidates/${candidateId}/status`, { status });
    } catch (error) {
      console.error('Error updating candidate status:', error);
      throw error;
    }
  },

  // Delete candidate
  deleteCandidate: async (candidateId) => {
    try {
      return await api.delete(`/candidates/${candidateId}`);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  },

  // Get candidate statistics
  getCandidateStats: async () => {
    try {
      return await api.get('/candidates/stats/overview');
    } catch (error) {
      console.error('Error fetching candidate stats:', error);
      throw error;
    }
  }
};

export default candidateService;