/**
 * CSV Export Utilities for HRMS
 * Provides functions to export user data and other entities to CSV format
 */

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert
 * @param {Array} columns - Array of column definitions with header and key
 * @param {Object} options - Export options
 * @returns {string} CSV string
 */
export const convertToCSV = (data, columns, options = {}) => {
  const {
    includeHeaders = true,
    delimiter = ',',
    enclosure = '"',
    dateFormat = 'YYYY-MM-DD'
  } = options;

  // Helper function to escape CSV values
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // If value contains delimiter, newline, or enclosure, wrap in enclosure
    if (stringValue.includes(delimiter) || 
        stringValue.includes('\n') || 
        stringValue.includes('\r') || 
        stringValue.includes(enclosure)) {
      return enclosure + stringValue.replace(new RegExp(enclosure, 'g'), enclosure + enclosure) + enclosure;
    }
    
    return stringValue;
  };

  // Helper function to format values
  const formatValue = (value, column) => {
    if (value === null || value === undefined) return '';
    
    // Handle arrays (like skills, projects)
    if (Array.isArray(value)) {
      return value.join('; ');
    }
    
    // Handle dates
    if (column.type === 'date' && value) {
      const date = new Date(value);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
    
    // Handle currency
    if (column.type === 'currency' && value) {
      return String(value).replace(/[$,]/g, ''); // Remove $ and commas for raw number
    }
    
    return String(value);
  };

  let csvContent = '';
  
  // Add headers
  if (includeHeaders) {
    const headers = columns.map(col => escapeCSVValue(col.header));
    csvContent += headers.join(delimiter) + '\n';
  }
  
  // Add data rows
  data.forEach(row => {
    const values = columns.map(col => {
      const value = col.key.includes('.') 
        ? col.key.split('.').reduce((obj, key) => obj?.[key], row)
        : row[col.key];
      
      return escapeCSVValue(formatValue(value, col));
    });
    
    csvContent += values.join(delimiter) + '\n';
  });
  
  return csvContent;
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content string
 * @param {string} filename - Filename for download
 */
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Export user data to CSV
 * @param {Array} users - Array of user objects
 * @param {Object} options - Export options
 */
export const exportUsersToCSV = (users, options = {}) => {
  const {
    filename = `users_export_${new Date().toISOString().split('T')[0]}.csv`,
    includePersonalInfo = true,
    includeWorkInfo = true,
    includePerformanceInfo = false,
    includeSystemInfo = false
  } = options;

  // Define column configurations
  const baseColumns = [
    { header: 'Employee ID', key: 'employeeId', type: 'text' },
    { header: 'Name', key: 'name', type: 'text' },
    { header: 'Email', key: 'email', type: 'text' }
  ];

  const personalColumns = [
    { header: 'Phone', key: 'phone', type: 'text' },
    { header: 'Location', key: 'location', type: 'text' },
    { header: 'Gender', key: 'gender', type: 'text' }
  ];

  const workColumns = [
    { header: 'Role', key: 'role', type: 'text' },
    { header: 'Department', key: 'department', type: 'text' },
    { header: 'Manager', key: 'manager', type: 'text' },
    { header: 'Join Date', key: 'joinDate', type: 'date' },
    { header: 'Status', key: 'status', type: 'text' },
    { header: 'Salary', key: 'salary', type: 'currency' }
  ];

  const performanceColumns = [
    { header: 'Performance', key: 'performance', type: 'text' },
    { header: 'Skills', key: 'skills', type: 'array' },
    { header: 'Projects', key: 'projects', type: 'array' }
  ];

  const systemColumns = [
    { header: 'Last Login', key: 'lastLogin', type: 'text' },
    { header: 'User ID', key: 'id', type: 'text' }
  ];

  // Build columns array based on options
  let columns = [...baseColumns];
  
  if (includePersonalInfo) {
    columns = [...columns, ...personalColumns];
  }
  
  if (includeWorkInfo) {
    columns = [...columns, ...workColumns];
  }
  
  if (includePerformanceInfo) {
    columns = [...columns, ...performanceColumns];
  }
  
  if (includeSystemInfo) {
    columns = [...columns, ...systemColumns];
  }

  // Convert to CSV and download
  const csvContent = convertToCSV(users, columns);
  downloadCSV(csvContent, filename);
  
  return {
    success: true,
    recordsExported: users.length,
    filename,
    columns: columns.length
  };
};

/**
 * Export filtered user data to CSV
 * @param {Array} users - Array of user objects
 * @param {Object} filters - Filter criteria
 * @param {Object} exportOptions - Export options
 */
export const exportFilteredUsersToCSV = (users, filters = {}, exportOptions = {}) => {
  // Apply filters
  let filteredUsers = [...users];
  
  if (filters.department && filters.department !== 'all') {
    filteredUsers = filteredUsers.filter(user => 
      user.department?.toLowerCase().includes(filters.department.toLowerCase())
    );
  }
  
  if (filters.role && filters.role !== 'all') {
    filteredUsers = filteredUsers.filter(user => 
      user.role?.toLowerCase().includes(filters.role.toLowerCase())
    );
  }
  
  if (filters.status && filters.status !== 'all') {
    filteredUsers = filteredUsers.filter(user => 
      user.status?.toLowerCase() === filters.status.toLowerCase()
    );
  }
  
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.employeeId?.toLowerCase().includes(searchLower)
    );
  }
  
  // Generate filename with filter info
  const filterSuffix = Object.keys(filters).length > 0 ? '_filtered' : '';
  const defaultFilename = `users_export${filterSuffix}_${new Date().toISOString().split('T')[0]}.csv`;
  
  return exportUsersToCSV(filteredUsers, {
    filename: defaultFilename,
    ...exportOptions
  });
};

/**
 * Get export statistics
 * @param {Array} users - Array of user objects
 * @returns {Object} Export statistics
 */
export const getExportStats = (users) => {
  const stats = {
    totalUsers: users.length,
    departments: [...new Set(users.map(u => u.department).filter(Boolean))].length,
    roles: [...new Set(users.map(u => u.role).filter(Boolean))].length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    inactiveUsers: users.filter(u => u.status !== 'Active').length
  };
  
  return stats;
};

export default {
  convertToCSV,
  downloadCSV,
  exportUsersToCSV,
  exportFilteredUsersToCSV,
  getExportStats
};