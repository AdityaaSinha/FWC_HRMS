// Public API configuration and HTTP client for audit logs (no authentication required)
const API_BASE_URL = 'http://localhost:3001/api/public';

// Create HTTP client without authentication
const publicApi = {
  async get(endpoint, options = {}) {
    const { params, ...fetchOptions } = options;
    
    // Build URL with query parameters
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value);
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};

export const publicAuditLogService = {
  // Get all audit logs with pagination and filtering (no auth required)
  getAuditLogs: async (params = {}) => {
    try {
      console.log('🌐 publicAuditLogService.getAuditLogs called with params:', params);
      console.log('🔗 Making request to:', '/audit-logs');
      
      const response = await publicApi.get('/audit-logs', { params });
      
      console.log('✅ publicAuditLogService response:', {
        success: response.success,
        dataLength: response.data?.length,
        pagination: response.pagination,
        error: response.error
      });
      
      return response;
    } catch (error) {
      console.error('❌ publicAuditLogService error:', error);
      console.error('❌ publicAuditLogService error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config
      });
      throw error;
    }
  },

  // Get audit log by ID (no auth required)
  getAuditLogById: async (id) => {
    try {
      const response = await publicApi.get(`/audit-logs/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching audit log:', error);
      throw error;
    }
  },

  // Get audit log statistics (no auth required)
  getAuditLogStats: async (params = {}) => {
    try {
      const response = await publicApi.get('/audit-logs/stats', { params });
      return response;
    } catch (error) {
      console.error('Error fetching audit log stats:', error);
      throw error;
    }
  }
};

export default publicAuditLogService;