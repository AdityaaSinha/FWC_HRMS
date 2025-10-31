import api from './api.js';

// Interview Service - handles all interview-related API calls
const interviewService = {
  // Get all interviews with optional filters
  getAllInterviews: async (params = {}) => {
    try {
      return await api.get('/interviews', { params });
    } catch (error) {
      console.error('Error fetching interviews:', error);
      throw error;
    }
  },

  // Get interview by ID
  getInterviewById: async (interviewId) => {
    try {
      return await api.get(`/interviews/${interviewId}`);
    } catch (error) {
      console.error('Error fetching interview:', error);
      throw error;
    }
  },

  // Create a new interview
  createInterview: async (interviewData) => {
    try {
      return await api.post('/interviews', interviewData);
    } catch (error) {
      console.error('Error creating interview:', error);
      throw error;
    }
  },

  // Update interview
  updateInterview: async (interviewId, interviewData) => {
    try {
      return await api.patch(`/interviews/${interviewId}`, interviewData);
    } catch (error) {
      console.error('Error updating interview:', error);
      throw error;
    }
  },

  // Add feedback to interview
  addInterviewFeedback: async (interviewId, feedbackData) => {
    try {
      return await api.patch(`/interviews/${interviewId}/feedback`, feedbackData);
    } catch (error) {
      console.error('Error adding interview feedback:', error);
      throw error;
    }
  },

  // Delete interview
  deleteInterview: async (interviewId) => {
    try {
      return await api.delete(`/interviews/${interviewId}`);
    } catch (error) {
      console.error('Error deleting interview:', error);
      throw error;
    }
  },

  // Get interview statistics
  getInterviewStats: async () => {
    try {
      return await api.get('/interviews/stats/overview');
    } catch (error) {
      console.error('Error fetching interview stats:', error);
      throw error;
    }
  },

  // Check interviewer availability
  checkInterviewerAvailability: async (interviewerId, date) => {
    try {
      return await api.get(`/interviews/availability/${interviewerId}`, { 
        params: { date } 
      });
    } catch (error) {
      console.error('Error checking interviewer availability:', error);
      throw error;
    }
  }
};

export default interviewService;