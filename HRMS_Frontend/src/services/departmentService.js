import { DEPARTMENTS, getDepartmentNames, calculateDepartmentStats } from '../utils/departmentData';

const API_BASE_URL = 'http://localhost:3001/api';

// Service for department-related API calls
export const departmentService = {
  // Get all departments with employee counts
  async getAllDepartments() {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`);
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn('Failed to fetch departments from API, using local data:', error);
      // Fallback to local data
      return DEPARTMENTS.map(dept => ({
        ...dept,
        employeeCount: 0 // Will be calculated locally if needed
      }));
    }
  },

  // Get specific department by ID
  async getDepartmentById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch department');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn('Failed to fetch department from API, using local data:', error);
      // Fallback to local data
      const dept = DEPARTMENTS.find(d => d.id === id || d.name === id);
      return dept ? { ...dept, employeeCount: 0, employees: [] } : null;
    }
  },

  // Get department statistics
  async getDepartmentStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/stats/overview`);
      if (!response.ok) {
        throw new Error('Failed to fetch department stats');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn('Failed to fetch department stats from API:', error);
      // Fallback to basic stats
      return {
        totalDepartments: DEPARTMENTS.length,
        totalEmployees: 0,
        departmentBreakdown: {},
        roleDistribution: {}
      };
    }
  },

  // Get department names (always use local data for consistency)
  getDepartmentNames() {
    return getDepartmentNames();
  },

  // Calculate department stats from user data (local calculation)
  calculateDepartmentStats(users) {
    return calculateDepartmentStats(users);
  },

  // Get local department data (for offline/fallback scenarios)
  getLocalDepartments() {
    return DEPARTMENTS;
  }
};

export default departmentService;