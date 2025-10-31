// Centralized Department Data Source
// This file provides consistent department data across the entire application

export const DEPARTMENTS = [
  {
    id: 'human-resources',
    name: 'Human Resources',
    code: 'HR',
    email: 'hr@company.com',
    headOfDepartment: 'Sarah Johnson',
    description: 'Human resources and talent management',
    color: 'green',
    budget: 500000,
    location: 'HQ - Floor 2'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    code: 'ENG',
    email: 'engineering@company.com',
    headOfDepartment: 'John Smith',
    description: 'Software development and technical innovation',
    color: 'blue',
    budget: 2500000,
    location: 'HQ - Floor 3-5'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    code: 'MKT',
    email: 'marketing@company.com',
    headOfDepartment: 'Emily Davis',
    description: 'Brand promotion and customer engagement',
    color: 'purple',
    budget: 800000,
    location: 'HQ - Floor 6'
  },
  {
    id: 'sales',
    name: 'Sales',
    code: 'SALES',
    email: 'sales@company.com',
    headOfDepartment: 'James Thompson',
    description: 'Revenue generation and client acquisition',
    color: 'orange',
    budget: 1200000,
    location: 'HQ - Floor 7'
  },
  {
    id: 'finance',
    name: 'Finance',
    code: 'FIN',
    email: 'finance@company.com',
    headOfDepartment: 'Michael Brown',
    description: 'Financial planning and accounting',
    color: 'yellow',
    budget: 600000,
    location: 'HQ - Floor 8'
  },
  {
    id: 'operations',
    name: 'Operations',
    code: 'OPS',
    email: 'operations@company.com',
    headOfDepartment: 'David Wilson',
    description: 'Business operations and process management',
    color: 'red',
    budget: 900000,
    location: 'HQ - Floor 9'
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    code: 'CS',
    email: 'support@company.com',
    headOfDepartment: 'Nicole Wilson',
    description: 'Customer service and technical support',
    color: 'teal',
    budget: 400000,
    location: 'HQ - Floor 1'
  },
  {
    id: 'product-management',
    name: 'Product Management',
    code: 'PM',
    email: 'product@company.com',
    headOfDepartment: 'Daniel Moore',
    description: 'Product strategy and development oversight',
    color: 'indigo',
    budget: 700000,
    location: 'HQ - Floor 10'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance',
    code: 'QA',
    email: 'qa@company.com',
    headOfDepartment: 'Stephanie Clark',
    description: 'Quality testing and assurance processes',
    color: 'pink',
    budget: 300000,
    location: 'HQ - Floor 4'
  },
  {
    id: 'management',
    name: 'Management',
    code: 'MGMT',
    email: 'management@company.com',
    headOfDepartment: 'Admin User',
    description: 'Executive leadership and strategic oversight',
    color: 'gray',
    budget: 1000000,
    location: 'HQ - Floor 11'
  }
];

// Helper functions for department operations
export const getDepartmentById = (id) => {
  return DEPARTMENTS.find(dept => dept.id === id);
};

export const getDepartmentByName = (name) => {
  return DEPARTMENTS.find(dept => dept.name === name);
};

export const getDepartmentNames = () => {
  return DEPARTMENTS.map(dept => dept.name);
};

export const getDepartmentOptions = () => {
  return DEPARTMENTS.map(dept => ({
    value: dept.name,
    label: dept.name,
    id: dept.id
  }));
};

export const calculateDepartmentStats = (users) => {
  const stats = {};
  
  DEPARTMENTS.forEach(dept => {
    const departmentUsers = users.filter(user => user.department === dept.name);
    stats[dept.name] = {
      ...dept,
      employeeCount: departmentUsers.length,
      employees: departmentUsers
    };
  });
  
  return stats;
};

// Get unique departments from user data (for backward compatibility)
export const getUniqueDepartmentsFromUsers = (users) => {
  const userDepartments = [...new Set(users.map(user => user.department).filter(Boolean))];
  
  // Match with official departments and add any missing ones
  const officialDepts = getDepartmentNames();
  const allDepartments = [...new Set([...officialDepts, ...userDepartments])];
  
  return allDepartments;
};

export default DEPARTMENTS;