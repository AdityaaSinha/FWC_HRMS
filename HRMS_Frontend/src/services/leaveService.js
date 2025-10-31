import api from './api.js';

// Leave Service - handles all leave request-related API calls
const leaveService = {
  // Get all leave requests (filtered based on user role)
  getAllLeaveRequests: async () => {
    try {
      return await api.get('/leave');
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  },

  // Get pending leave requests (for managers/HR/admin)
  getPendingLeaveRequests: async () => {
    try {
      return await api.get('/leave/pending');
    } catch (error) {
      console.error('Error fetching pending leave requests:', error);
      throw error;
    }
  },

  // Get specific leave request by ID
  getLeaveRequestById: async (id) => {
    try {
      return await api.get(`/leave/${id}`);
    } catch (error) {
      console.error('Error fetching leave request:', error);
      throw error;
    }
  },

  // Create a new leave request
  createLeaveRequest: async (leaveData) => {
    try {
      return await api.post('/leave', leaveData);
    } catch (error) {
      console.error('Error creating leave request:', error);
      throw error;
    }
  },

  // Approve a leave request
  approveLeaveRequest: async (id, managerComments = '') => {
    try {
      return await api.put(`/leave/${id}/approve`, { managerComments });
    } catch (error) {
      console.error('Error approving leave request:', error);
      throw error;
    }
  },

  // Reject a leave request
  rejectLeaveRequest: async (id, managerComments = '') => {
    try {
      return await api.put(`/leave/${id}/reject`, { managerComments });
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      throw error;
    }
  },

  // Cancel a leave request
  cancelLeaveRequest: async (id) => {
    try {
      return await api.delete(`/leave/${id}`);
    } catch (error) {
      console.error('Error cancelling leave request:', error);
      throw error;
    }
  }
};

export default leaveService;