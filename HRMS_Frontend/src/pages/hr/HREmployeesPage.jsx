import React, { useState, useEffect } from 'react';
import { MOCK_USERS } from '../../mocks/MOCK_USERS';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  UserCheck,
  Eye,
  Edit,
  MoreHorizontal,
  X,
  Badge,
  Clock,
  DollarSign,
  Award,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../../contexts/CurrencyContext';
import { convertCurrency, formatCurrency as formatCurrencyUtil } from '../../utils/currencyConverter';

import { generateAvatarUrl, generateInitials } from '../../utils/avatarUtils';
import employeeService from '../../services/employeeService';

// Enhanced mock data with more employee details
const ENHANCED_EMPLOYEES = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@company.com', 
    role: 'HR Manager', 
    department: 'Human Resources',
    employeeId: 'EMP001',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2022-01-15',
    status: 'Active',
    avatar: 'AJ',
    gender: 'female', // Added gender
    salary: '$85,000',
    manager: 'Sarah Wilson',
    skills: ['Recruitment', 'Employee Relations', 'Policy Development'],
    projects: ['Q4 Hiring Drive', 'Employee Handbook Update'],
    performance: 'Excellent',
    lastLogin: '2024-01-15 09:30 AM'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@company.com', 
    role: 'Senior Developer', 
    department: 'Engineering',
    employeeId: 'EMP002',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    joinDate: '2021-03-22',
    status: 'Active',
    avatar: 'BS',
    gender: 'male', // Added gender
    salary: '$120,000',
    manager: 'Tech Lead',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    projects: ['HRMS Frontend', 'API Optimization'],
    performance: 'Outstanding',
    lastLogin: '2024-01-15 08:45 AM'
  },
  { 
    id: 3, 
    name: 'Carol White', 
    email: 'carol@company.com', 
    role: 'UX Designer', 
    department: 'Design',
    employeeId: 'EMP003',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    joinDate: '2022-07-10',
    status: 'Active',
    avatar: 'CW',
    gender: 'female', // Added gender
    salary: '$75,000',
    manager: 'Design Director',
    skills: ['Figma', 'User Research', 'Prototyping'],
    projects: ['Mobile App Redesign', 'Design System'],
    performance: 'Good',
    lastLogin: '2024-01-14 05:20 PM'
  },
  { 
    id: 4, 
    name: 'David Brown', 
    email: 'david@company.com', 
    role: 'Financial Analyst', 
    department: 'Finance',
    employeeId: 'EMP004',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    joinDate: '2021-11-05',
    status: 'Active',
    avatar: 'DB',
    salary: '$70,000',
    manager: 'Finance Manager',
    skills: ['Excel', 'Financial Modeling', 'Data Analysis'],
    projects: ['Budget Planning 2024', 'Cost Analysis'],
    performance: 'Good',
    lastLogin: '2024-01-15 07:15 AM'
  },
  { 
    id: 5, 
    name: 'Emma Wilson', 
    email: 'emma@company.com', 
    role: 'Marketing Specialist', 
    department: 'Marketing',
    employeeId: 'EMP005',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
    joinDate: '2023-02-14',
    status: 'Active',
    avatar: 'EW',
    salary: '$65,000',
    manager: 'Marketing Director',
    skills: ['Digital Marketing', 'Content Creation', 'SEO'],
    projects: ['Brand Campaign', 'Social Media Strategy'],
    performance: 'Excellent',
    lastLogin: '2024-01-15 10:00 AM'
  },
  { 
    id: 6, 
    name: 'Frank Davis', 
    email: 'frank@company.com', 
    role: 'Operations Manager', 
    department: 'Operations',
    employeeId: 'EMP006',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA',
    joinDate: '2020-09-18',
    status: 'Active',
    avatar: 'FD',
    salary: '$90,000',
    manager: 'COO',
    skills: ['Process Optimization', 'Team Management', 'Logistics'],
    projects: ['Workflow Automation', 'Vendor Management'],
    performance: 'Outstanding',
    lastLogin: '2024-01-15 06:30 AM'
  }
];

const StatusBadge = ({ status }) => {
  const statusColors = {
    Active: 'bg-green-900/30 text-green-400 border-green-700',
    Inactive: 'bg-red-900/30 text-red-400 border-red-700',
    'On Leave': 'bg-yellow-900/30 text-yellow-400 border-yellow-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.Active}`}>
      {status}
    </span>
  );
};

const DepartmentBadge = ({ department }) => {
  const departmentColors = {
    'Human Resources': 'bg-blue-900/30 text-blue-400',
    'Engineering': 'bg-purple-900/30 text-purple-400',
    'Design': 'bg-pink-900/30 text-pink-400',
    'Finance': 'bg-green-900/30 text-green-400',
    'Marketing': 'bg-orange-900/30 text-orange-400',
    'Operations': 'bg-indigo-900/30 text-indigo-400'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${departmentColors[department] || 'bg-gray-700 text-gray-300'}`}>
      {department}
    </span>
  );
};

const Avatar = ({ name, avatar, user, size = 40 }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Generate avatar URL using the utility function
  const avatarUrl = generateAvatarUrl(user || { name, email: `${name?.toLowerCase().replace(/\s+/g, '.')}@company.com` }, size);
  const initials = generateInitials(name);
  
  // Show initials if no URL, image failed to load, or still loading
  const showInitials = !avatarUrl || imageError || !imageLoaded;
  
  return (
    <div className={`relative rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden`} 
         style={{ width: size, height: size, fontSize: `${size * 0.35}px` }}>
      {avatarUrl && !imageError && (
        <img
          src={avatarUrl}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {showInitials && (
        <span className={`${imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
          {initials}
        </span>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color = "indigo" }) => {
  const colorClasses = {
    indigo: "text-indigo-400",
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400"
  };

  return (
    <motion.div 
      className="bg-[#1E2132] rounded-lg p-6 border border-gray-800 hover:bg-[#25293D] transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-800 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default function HREmployeesPage() {
  console.log('🔍 HREmployeesPage component is mounting!', new Date().toISOString());
  
  // State variables
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [convertedEmployees, setConvertedEmployees] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    department: '',
    roleId: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departmentStats: [],
    roleStats: []
  });

  const { selectedCurrency } = useCurrency();

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (selectedDepartment && selectedDepartment !== 'All') {
        params.department = selectedDepartment;
      }
      
      const response = await employeeService.getAllEmployees(params);
      
      if (response.success) {
        setEmployees(response.data.employees || []);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination?.total || 0,
          pages: response.data.pagination?.pages || 0
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError(error.message || 'Failed to load employees');
      // Fallback to mock data on error
      setEmployees(ENHANCED_EMPLOYEES);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee statistics
  const fetchStats = async () => {
    try {
      const response = await employeeService.getEmployeeStats();
      
      if (response.success) {
        setStats({
          totalEmployees: response.data.totalEmployees || 0,
          activeEmployees: response.data.activeEmployees || 0,
          departmentStats: response.data.departmentStats || [],
          roleStats: response.data.roleStats || []
        });
      }
    } catch (error) {
      console.error('Error fetching employee stats:', error);
      // Use fallback stats
      setStats({
        totalEmployees: ENHANCED_EMPLOYEES.length,
        activeEmployees: ENHANCED_EMPLOYEES.filter(emp => emp.status === 'Active').length,
        departmentStats: [],
        roleStats: []
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, []);

  // Fetch employees when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.page === 1) {
        fetchEmployees();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedDepartment]);

  // Fetch employees when page changes
  useEffect(() => {
    if (pagination.page > 1) {
      fetchEmployees();
    }
  }, [pagination.page]);

  // Handle create employee form
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    
    try {
      setIsCreating(true);
      
      const response = await employeeService.createEmployee(createFormData);
      
      if (response.success) {
        // Reset form
        setCreateFormData({
          employeeId: '',
          name: '',
          email: '',
          password: '',
          department: '',
          roleId: ''
        });
        
        // Close modal
        setShowCreateModal(false);
        
        // Refresh employee list
        await fetchEmployees();
        await fetchStats();
        
        // Show success message (you can add a toast notification here)
        console.log('Employee created successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to create employee');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      // Show error message (you can add a toast notification here)
      alert('Error creating employee: ' + error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Available roles (from seed data)
  const availableRoles = [
    { id: 1, name: 'ADMIN', label: 'Administrator' },
    { id: 2, name: 'HR', label: 'HR Manager' },
    { id: 3, name: 'MANAGER', label: 'Manager' },
    { id: 4, name: 'EMPLOYEE', label: 'Employee' }
  ];

  // Available departments
  const availableDepartments = [
    'Human Resources',
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Operations',
    'Customer Support',
    'Product Management',
    'Quality Assurance',
    'Management'
  ];

  // Convert employee salaries when currency changes
  useEffect(() => {
    const convertEmployeeSalaries = async () => {
      if (!selectedCurrency) return;
      
      setIsConverting(true);
      try {
        const converted = await Promise.all(
          employees.map(async (employee) => {
            // Extract numeric value from salary string (e.g., "$85,000" -> 85000)
            const salaryMatch = employee.salary.match(/[\d,]+/);
            const salaryAmount = salaryMatch ? parseFloat(salaryMatch[0].replace(/,/g, '')) : 0;
            
            const convertedAmount = await convertCurrency(salaryAmount, 'USD', selectedCurrency.code);
            const formattedSalary = formatCurrencyUtil(convertedAmount, selectedCurrency.code);
            
            return {
              ...employee,
              salary: formattedSalary,
              originalSalary: employee.salary
            };
          })
        );
        setConvertedEmployees(converted);
      } catch (error) {
        console.error('Error converting salaries:', error);
        setConvertedEmployees(employees);
      } finally {
        setIsConverting(false);
      }
    };

    convertEmployeeSalaries();
  }, [employees, selectedCurrency]);

  const getCurrentEmployees = () => {
    return convertedEmployees.length > 0 ? convertedEmployees : employees;
  };

  const departments = ['All', ...new Set(employees.map(emp => emp.department))];
  
  const currentEmployees = getCurrentEmployees();
  
  // Only apply client-side filtering if using mock data (when error occurred)
  const filteredEmployees = error ? currentEmployees.filter(employee => {
    const matchesSearch = (employee.name || employee.firstName + ' ' + employee.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.employeeId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.role || employee.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.skills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (employee.projects || []).some(project => project.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  }) : currentEmployees; // Use API-filtered data when no error

  const totalEmployees = stats.totalEmployees || employees.length;
  const activeEmployees = stats.activeEmployees || employees.filter(emp => emp.status === 'Active').length;
  const departmentCount = stats.departmentStats?.length || new Set(employees.map(emp => emp.department)).size;

  return (
    <div className="p-6 space-y-6 text-white min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Employee Management</h1>
          <p className="text-gray-400 mt-1">Manage and view all employee information</p>
        </div>
        <div className="flex items-center gap-4">
          {isConverting && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
              Converting...
            </div>
          )}
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
          >
            <UserCheck size={20} />
            Add Employee
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users size={24} />}
          color="indigo"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={<UserCheck size={24} />}
          color="green"
        />
        <StatCard
          title="Departments"
          value={departmentCount}
          icon={<Building size={24} />}
          color="blue"
        />
        <StatCard
          title="New This Month"
          value="3"
          icon={<Calendar size={24} />}
          color="purple"
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-[#1E2132] rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees by name, email, ID, role, skills, or projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-10 pr-8 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Display total count and error message */}
        <div className="mt-4 flex items-center justify-between">
          {pagination.total > 0 && (
            <p className="text-sm text-gray-400">
              Showing {filteredEmployees.length} of {pagination.total} employees
            </p>
          )}
          {error && (
            <div className="text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-lg border border-red-800">
              {error} (showing cached data)
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-[#1E2132] rounded-lg border border-gray-800 p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="text-gray-400">Loading employees...</p>
          </div>
        </div>
      )}

      {/* Employee Table */}
      {!loading && (
        <div className="bg-[#1E2132] rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#272B3F]">
              <tr>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Employee</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Contact</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Department</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Location</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Join Date</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Status</th>
                <th className="p-4 text-xs font-semibold uppercase text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2D3D]">
              {filteredEmployees.map(employee => (
                <motion.tr
                  key={employee.id || employee._id}
                  className="hover:bg-[#2A2D3D]/60 transition-colors cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(42, 45, 61, 0.6)" }}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        name={employee.name || `${employee.firstName} ${employee.lastName}`} 
                        avatar={employee.avatar} 
                        user={employee} 
                        size={40} 
                      />
                      <div>
                        <div className="font-medium text-white">
                          {employee.name || `${employee.firstName} ${employee.lastName}`}
                        </div>
                        <div className="text-sm text-gray-400">{employee.employeeId}</div>
                        <div className="text-sm text-gray-500">{employee.role?.name || employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail size={14} />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={14} />
                        {employee.phone || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <DepartmentBadge department={employee.department} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin size={14} />
                      {employee.location || 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar size={14} />
                      {employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && !loading && (
          <div className="p-8 text-center text-gray-400">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No employees found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Page {pagination.page} of {pagination.pages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-3 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-sm text-gray-400 text-center mt-4">
          Showing {filteredEmployees.length} of {totalEmployees} employees
        </div>
        </div>
      )}

      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              className="bg-[#1E2132] rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <Avatar 
                    name={selectedEmployee.name || `${selectedEmployee.firstName} ${selectedEmployee.lastName}`} 
                    avatar={selectedEmployee.avatar} 
                    user={selectedEmployee} 
                    size={60} 
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedEmployee.name || `${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    </h2>
                    <p className="text-gray-400">{selectedEmployee.role?.name || selectedEmployee.position}</p>
                    <p className="text-sm text-gray-500">{selectedEmployee.employeeId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <UserCheck className="text-indigo-400" size={20} />
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="text-gray-400" size={16} />
                        <span className="text-gray-300">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-gray-400" size={16} />
                        <span className="text-gray-300">{selectedEmployee.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="text-gray-400" size={16} />
                        <span className="text-gray-300">{selectedEmployee.location || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="text-gray-400" size={16} />
                        <DepartmentBadge department={selectedEmployee.department} />
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-gray-400" size={16} />
                        <span className="text-gray-300">
                          Joined {selectedEmployee.joinDate ? new Date(selectedEmployee.joinDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="text-gray-400" size={16} />
                        <StatusBadge status={selectedEmployee.status} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <DollarSign className="text-green-400" size={20} />
                      Employment Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="text-gray-400" size={16} />
                        <span className="text-gray-300">Salary: {selectedEmployee.salary || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-gray-400" size={16} />
                        <span className="text-gray-300">Manager: {selectedEmployee.manager || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-gray-400" size={16} />
                        <span className="text-gray-300">Performance: {selectedEmployee.performance || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-gray-400" size={16} />
                        <span className="text-gray-300">Last Login: {selectedEmployee.lastLogin || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                {/* Skills */}
                {(selectedEmployee.skills && selectedEmployee.skills.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="text-purple-400" size={20} />
                      Skills & Expertise
                    </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  </div>
                )}

                {/* Current Projects */}
                {(selectedEmployee.projects && selectedEmployee.projects.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Building className="text-blue-400" size={20} />
                      Current Projects
                    </h3>
                    <div className="space-y-2">
                      {selectedEmployee.projects.map((project, index) => (
                        <div
                          key={index}
                          className="p-3 bg-[#0F1117] rounded-lg border border-gray-700"
                        >
                          <span className="text-gray-300">{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <motion.button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit size={18} />
                    Edit Employee
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={18} />
                    Send Message
                  </motion.button>
                </div>
                </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Employee Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="bg-[#1E2132] rounded-lg border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="text-indigo-400" size={24} />
                    Create New Employee
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleCreateEmployee} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Employee ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Employee ID *
                      </label>
                      <input
                        type="text"
                        name="employeeId"
                        value={createFormData.employeeId}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g., EMP001"
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={createFormData.name}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g., John Smith"
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={createFormData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g., john.smith@company.com"
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={createFormData.password}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter password"
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Department *
                      </label>
                      <select
                        name="department"
                        value={createFormData.department}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Select Department</option>
                        {availableDepartments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role *
                      </label>
                      <select
                        name="roleId"
                        value={createFormData.roleId}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-[#0F1117] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Select Role</option>
                        {availableRoles.map(role => (
                          <option key={role.id} value={role.id}>{role.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6 border-t border-gray-800">
                    <motion.button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isCreating}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: isCreating ? 1 : 1.02 }}
                      whileTap={{ scale: isCreating ? 1 : 0.98 }}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserCheck size={18} />
                          Create Employee
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}