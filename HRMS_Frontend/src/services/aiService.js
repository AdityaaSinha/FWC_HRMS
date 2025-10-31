import api from './api.js';

// AI Service - handles all AI-related API calls
const aiService = {
  // Job Description Generator
  generateJobDescription: async (jobData) => {
    try {
      return await api.post('/ai/generate-jd', jobData);
    } catch (error) {
      console.error('Error generating job description:', error);
      throw error;
    }
  },

  // Resume Screening
  screenResume: async (formData) => {
    try {
      const response = await fetch(`${api.baseURL || 'http://localhost:3001/api'}/ai/screen-resume-pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData, // FormData for file upload
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error screening resume:', error);
      throw error;
    }
  },

  // Performance Insights
  getPerformanceInsights: async (employeeId) => {
    try {
      return await api.get(`/ai/performance-insights/${employeeId}`);
    } catch (error) {
      console.error('Error fetching performance insights:', error);
      throw error;
    }
  },

  // Predictive Analytics
  getPredictiveAnalytics: async (analyticsData) => {
    try {
      return await api.post('/ai/predictive-analytics', analyticsData);
    } catch (error) {
      console.error('Error fetching predictive analytics:', error);
      throw error;
    }
  },

  // Sentiment Analysis
  analyzeSentiment: async (sentimentData) => {
    try {
      return await api.post('/ai/sentiment-analysis', sentimentData);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  },

  // Sentiment Trends by Department
  getSentimentTrends: async (department) => {
    try {
      return await api.get(`/ai/sentiment-trends/${department}`);
    } catch (error) {
      console.error('Error fetching sentiment trends:', error);
      throw error;
    }
  },

  // Batch Sentiment Monitoring
  monitorSentiment: async (feedbackBatch) => {
    try {
      return await api.post('/ai/sentiment-monitor', feedbackBatch);
    } catch (error) {
      console.error('Error monitoring sentiment:', error);
      throw error;
    }
  },

  // Export sentiment analysis data
  exportSentimentAnalysis: async (department, format = 'json', dateRange = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment-analysis/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          department,
          format,
          dateRange
        })
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      if (format === 'csv') {
        // Handle CSV download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sentiment-analysis-${department || 'all'}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: 'CSV file downloaded successfully' };
      } else {
        // Handle JSON response
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Export sentiment analysis error:', error);
      throw error;
    }
  },

  // Export performance insights data
  exportPerformanceInsights: async (format = 'json', filters = {}) => {
    try {
      const response = await api.post('/ai/performance-insights/export', {
        format,
        filters,
        timestamp: new Date().toISOString()
      });

      if (format === 'csv' || format === 'txt') {
        // Create and download file
        const blob = new Blob([response.data], { 
          type: format === 'csv' ? 'text/csv' : 'text/plain' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-insights-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: `${format.toUpperCase()} file downloaded successfully` };
      } else {
        // Return JSON data for download
        const dataStr = JSON.stringify(response.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-insights-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: 'JSON file downloaded successfully' };
      }
    } catch (error) {
      console.error('Export performance insights error:', error);
      throw error;
    }
  },

  // Export predictive analytics data
  exportPredictiveAnalytics: async (format = 'json', filters = {}) => {
    try {
      const response = await api.post('/ai/predictive-analytics/export', {
        format,
        filters,
        timestamp: new Date().toISOString()
      });

      if (format === 'csv' || format === 'txt') {
        // Create and download file
        const blob = new Blob([response.data], { 
          type: format === 'csv' ? 'text/csv' : 'text/plain' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `predictive-analytics-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: `${format.toUpperCase()} file downloaded successfully` };
      } else {
        // Return JSON data for download
        const dataStr = JSON.stringify(response.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `predictive-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: 'JSON file downloaded successfully' };
      }
    } catch (error) {
      console.error('Export predictive analytics error:', error);
      throw error;
    }
  },

  // Get AI system status
  getAiSystemStatus: async () => {
    try {
      return await api.get('/ai/system-status');
    } catch (error) {
      console.error('Error fetching AI system status:', error);
      throw error;
    }
  },

  // Get real-time analytics status
  getAnalyticsStatus: async () => {
    try {
      return await api.get('/ai/analytics-status');
    } catch (error) {
      console.error('Error fetching analytics status:', error);
      throw error;
    }
  },

  // Get export status
  getExportStatus: async (exportId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/export-status/${exportId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get export status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get export status error:', error);
      throw error;
    }
  }
};

export default aiService;