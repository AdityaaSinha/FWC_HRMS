import api from './api';

export const auditLogService = {
  // Get all audit logs with pagination and filtering
  getAuditLogs: async (params = {}) => {
    try {
      console.log('🌐 auditLogService.getAuditLogs called with params:', params);
      console.log('🔗 Making request to:', '/audit-logs');
      
      const response = await api.get('/audit-logs', { params });
      
      console.log('✅ auditLogService response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ auditLogService error:', error);
      console.error('❌ auditLogService error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config
      });
      throw error;
    }
  },

  // Get audit log by ID
  getAuditLogById: async (id) => {
    try {
      const response = await api.get(`/audit-logs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching audit log:', error);
      throw error;
    }
  },

  // Get audit log statistics
  getAuditLogStats: async (params = {}) => {
    try {
      const response = await api.get('/audit-logs/stats', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching audit log stats:', error);
      throw error;
    }
  },

  // Create audit log
  createAuditLog: async (logData) => {
    try {
      const response = await api.post('/audit-logs', logData);
      return response.data;
    } catch (error) {
      console.error('Error creating audit log:', error);
      throw error;
    }
  }
};

export default auditLogService;