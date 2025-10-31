import api from './api.js';

// Employee Service - handles all employee-related API calls
const employeeService = {
  // Get all employees with pagination and filters
  getAllEmployees: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.department) queryParams.append('department', params.department);
    if (params.role) queryParams.append('role', params.role);
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/employees${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    
    // Backend returns data directly, wrap it in success format for consistency
    return {
      success: true,
      data: {
        employees: response.employees || [],
        pagination: response.pagination || {}
      }
    };
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    
    return {
      success: true,
      data: response
    };
  },

  // Create new employee (Admin/HR only)
  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    
    return {
      success: true,
      data: response
    };
  },

  // Update employee information
  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    
    return {
      success: true,
      data: response
    };
  },

  // Delete employee (Admin/HR only)
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    
    return {
      success: true,
      data: response
    };
  },

  // Get employee statistics (Admin/HR only)
  getEmployeeStats: async () => {
    const response = await api.get('/employees/stats/overview');
    
    // Backend returns data directly, wrap it in success format for consistency
    return {
      success: true,
      data: response
    };
  },

  // Get employees by department
  getEmployeesByDepartment: async (department, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('department', department);
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/employees?${queryParams.toString()}`;
    const response = await api.get(url);
    
    return {
      success: true,
      data: {
        employees: response.employees || [],
        pagination: response.pagination || {}
      }
    };
  },

  // Get employees by role
  getEmployeesByRole: async (role, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('role', role);
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/employees?${queryParams.toString()}`;
    const response = await api.get(url);
    
    return {
      success: true,
      data: {
        employees: response.employees || [],
        pagination: response.pagination || {}
      }
    };
  },

  // Search employees
  searchEmployees: async (searchTerm, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', searchTerm);
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.department) queryParams.append('department', params.department);
    if (params.role) queryParams.append('role', params.role);
    
    const url = `/employees?${queryParams.toString()}`;
    const response = await api.get(url);
    
    return {
      success: true,
      data: {
        employees: response.employees || [],
        pagination: response.pagination || {}
      }
    };
  },

  // Get employee directory (public access - no authentication required)
  getEmployeeDirectory: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.department) queryParams.append('department', params.department);
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/employees/directory${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    // Use fetch directly instead of api service to avoid authentication headers
    const API_BASE_URL = 'http://localhost:3001/api';
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data in the format expected by the component
    return {
      employees: data.employees || [],
      pagination: data.pagination || {}
    };
  },

  // Search employees (public access)
  searchEmployeesPublic: async (searchTerm, params = {}) => {
    const searchParams = {
      ...params,
      search: searchTerm
    };
    
    return await employeeService.getEmployeeDirectory(searchParams);
  }
};

export default employeeService;