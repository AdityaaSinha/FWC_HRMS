import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, MapPin, Mail, Phone, Calendar, Building } from 'lucide-react';
import employeeService from '../services/employeeService';

const PublicEmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [departments, setDepartments] = useState([]);

  const ITEMS_PER_PAGE = 12;

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching employees with params:', {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm,
        department: selectedDepartment
      });

      const response = await employeeService.getEmployeeDirectory({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm,
        department: selectedDepartment
      });

      console.log('Employee directory response:', response);

      if (response && response.employees) {
        setEmployees(response.employees);
        setTotalPages(response.pagination?.pages || 1);
        
        // Extract unique departments
        const uniqueDepartments = [...new Set(response.employees.map(emp => emp.department).filter(Boolean))];
        setDepartments(uniqueDepartments);
      } else {
        setEmployees([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employee directory. Please try again later.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Load employees on component mount and when filters change
  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm, selectedDepartment]);

  // Reset to first page when search or filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, selectedDepartment]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentFilter = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800/90 to-blue-800/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Employee Directory
                </h1>
                <p className="text-slate-300 mt-1">Find and connect with team members</p>
              </div>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/50">
              <span className="text-sm text-slate-300">
                {employees.length} employees found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-slate-800/80 to-blue-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentFilter}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 appearance-none transition-all duration-200"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-blue-500"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-700/50 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Employee Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {employees.map((employee) => (
                <div key={employee.id} className="group bg-gradient-to-br from-slate-800/80 to-blue-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-500/50">
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <span className="text-2xl font-bold text-white">
                      {employee.name?.charAt(0)?.toUpperCase() || 'N'}
                    </span>
                  </div>

                  {/* Employee Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors duration-200">
                      {employee.name || 'N/A'}
                    </h3>
                    <p className="text-sm text-slate-400 bg-slate-900/30 px-3 py-1 rounded-full inline-block">
                      {employee.role?.name || 'Employee'}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    {employee.employeeId && (
                      <div className="flex items-center text-slate-300 hover:text-blue-300 transition-colors duration-200">
                        <Building className="h-4 w-4 mr-3 flex-shrink-0 text-blue-400" />
                        <span className="truncate">ID: {employee.employeeId}</span>
                      </div>
                    )}
                    
                    {employee.department && (
                      <div className="flex items-center text-slate-300 hover:text-blue-300 transition-colors duration-200">
                        <MapPin className="h-4 w-4 mr-3 flex-shrink-0 text-indigo-400" />
                        <span className="truncate">{employee.department}</span>
                      </div>
                    )}
                    
                    {employee.email && (
                      <div className="flex items-center text-slate-300 hover:text-blue-300 transition-colors duration-200">
                        <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-purple-400" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                    )}
                    
                    {employee.phone && (
                      <div className="flex items-center text-slate-300 hover:text-blue-300 transition-colors duration-200">
                        <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-green-400" />
                        <span className="truncate">{formatPhone(employee.phone)}</span>
                      </div>
                    )}
                    
                    {employee.joinDate && (
                      <div className="flex items-center text-slate-300 hover:text-blue-300 transition-colors duration-200">
                        <Calendar className="h-4 w-4 mr-3 flex-shrink-0 text-yellow-400" />
                        <span className="truncate">Joined {formatDate(employee.joinDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {employees.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-2xl p-12 backdrop-blur-sm border border-slate-700/50">
                  <Users className="h-16 w-16 text-slate-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-200 mb-4">No employees found</h3>
                  <p className="text-slate-400 max-w-md mx-auto">
                    {searchTerm || selectedDepartment 
                      ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                      : 'No employees are currently available in the directory.'
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-slate-300 bg-slate-800/50 border border-slate-600/50 hover:bg-slate-700/50 hover:text-blue-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PublicEmployeeDirectory;