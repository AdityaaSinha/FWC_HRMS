import api from './api';

const twoFactorService = {
  // Setup 2FA for the current user
  setup2FA: async (method = 'totp') => {
    try {
      const response = await api.post('/2fa/setup', { method });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to setup 2FA');
    }
  },

  // Verify and enable 2FA
  verify2FA: async (token) => {
    try {
      const response = await api.post('/2fa/verify', { token });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to verify 2FA');
    }
  },

  // Disable 2FA
  disable2FA: async (token, password = null) => {
    try {
      const response = await api.post('/2fa/disable', { token, password });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to disable 2FA');
    }
  },

  // Get 2FA status for current user
  get2FAStatus: async () => {
    try {
      const response = await api.get('/2fa/status');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get 2FA status');
    }
  },

  // Generate new backup codes
  generateNewBackupCodes: async (token) => {
    try {
      const response = await api.post('/2fa/backup-codes', { token });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to generate backup codes');
    }
  },

  // Verify 2FA token (for login)
  verifyToken: async (userId, token) => {
    try {
      const response = await api.post('/2fa/verify-token', { userId, token });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to verify token');
    }
  },

  // Get 2FA statistics (admin only)
  get2FAStats: async () => {
    try {
      const response = await api.get('/2fa/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get 2FA statistics');
    }
  },

  // Get all users with 2FA status (admin only)
  getAllUsers2FAStatus: async (params = {}) => {
    try {
      console.log('🔄 Making API call to /2fa/users with params:', params);
      const response = await api.get('/2fa/users', { params });
      console.log('✅ API response received:', response);
      return { data: response };
    } catch (error) {
      console.error('❌ API call failed:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        response: error.response
      });
      throw new Error(error.response?.data?.error || error.message || 'Failed to get users 2FA status');
    }
  },

  // Admin: Enable 2FA for a user
  adminEnable2FA: async (userId, method = 'totp') => {
    try {
      const response = await api.post(`/2fa/admin/enable/${userId}`, { method });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to enable 2FA for user');
    }
  },

  // Admin: Disable 2FA for a user
  adminDisable2FA: async (userId) => {
    try {
      const response = await api.post(`/2fa/admin/disable/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to disable 2FA for user');
    }
  }
};

export default twoFactorService;