import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  User,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Calendar,
  Star,
  Award,
  Clock,
  Briefcase,
  Globe,
  Camera,
  MoreVertical,
  Loader2
} from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import employeeService from '../../services/employeeService';
import { getDepartmentNames } from '../../utils/departmentData';

const EmployeeDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [favorites, setFavorites] = useState(['emp2', 'emp5']);
  
  // API state
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50, // Show more employees in directory
    total: 0,
    pages: 0
  });

  // Load employees on component mount and when filters change
  useEffect(() => {
    fetchEmployees(1); // Reset to page 1 when filters change
  }, [searchTerm, selectedDepartment]);

  // Load employees on initial mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from API (public access)
  const fetchEmployees = async (page = pagination.page) => {
    try {
      setLoading(true);
      const params = {
        page: page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        department: selectedDepartment !== 'all' ? selectedDepartment : undefined
      };

      console.log('Fetching employees with params:', params); // Debug log
      const response = await employeeService.getEmployeeDirectory(params);
      // Handle the wrapped response structure
      const employeesData = response.data?.employees || response.employees || [];
      const paginationData = response.data?.pagination || response.pagination || {};
      
      console.log('Received employees:', employeesData.length, 'Pagination:', paginationData); // Debug log
      setEmployees(employeesData);
      setPagination(prev => ({
        ...prev,
        page: page, // Update the page in state
        total: paginationData.total || 0,
        pages: paginationData.pages || 0
      }));
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message);
      // Fallback to mock data on error
      setEmployees(MOCK_EMPLOYEES);
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback
  const MOCK_EMPLOYEES = [
    {
      id: 'emp1',
      name: 'Aryabrat Mishra',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York',
      email: 'aryabrat.mishra@company.com',
      phone: '+1 (555) 123-4567',
      avatar: null,
      status: 'online',
      joinDate: '2022-03-15',
      manager: 'Sarah Johnson',
      directReports: 0,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      projects: ['Project Alpha', 'Dashboard Redesign'],
      timezone: 'EST',
      workingHours: '9:00 AM - 6:00 PM',
      bio: 'Passionate full-stack developer with expertise in modern web technologies.',
      achievements: ['Employee of the Month', 'Innovation Award'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/aryabrat',
        github: 'https://github.com/aryabrat'
      }
    },
    {
      id: 'emp2',
      name: 'Sarah Johnson',
      position: 'Engineering Manager',
      department: 'Engineering',
      location: 'New York',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://i.pravatar.cc/150?img=49',
      status: 'online',
      joinDate: '2020-01-10',
      manager: 'David Chen',
      directReports: 8,
      skills: ['Leadership', 'Agile', 'Team Management', 'Strategy'],
      projects: ['Team Expansion', 'Process Optimization'],
      timezone: 'EST',
      workingHours: '8:30 AM - 5:30 PM',
      bio: 'Experienced engineering leader focused on building high-performing teams.',
      achievements: ['Leadership Excellence', 'Team Builder Award'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahjohnson'
      }
    },
    {
      id: 'emp3',
      name: 'Michael Rodriguez',
      position: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      email: 'michael.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      avatar: null,
      status: 'away',
      joinDate: '2021-06-20',
      manager: 'Lisa Park',
      directReports: 2,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      projects: ['Mobile App Redesign', 'Design System v2'],
      timezone: 'PST',
      workingHours: '10:00 AM - 7:00 PM',
      bio: 'Creative designer passionate about user-centered design and accessibility.',
      achievements: ['Design Innovation Award', 'User Choice Award'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michaelrodriguez',
        dribbble: 'https://dribbble.com/michaelr'
      }
    },
    {
      id: 'emp4',
      name: 'Emily Chen',
      position: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      email: 'emily.chen@company.com',
      phone: '+1 (555) 456-7890',
      avatar: null,
      status: 'busy',
      joinDate: '2021-09-05',
      manager: 'Robert Kim',
      directReports: 3,
      skills: ['Product Strategy', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
      projects: ['Q1 Product Launch', 'Market Research Initiative'],
      timezone: 'PST',
      workingHours: '9:00 AM - 6:00 PM',
      bio: 'Strategic product manager with a data-driven approach to product development.',
      achievements: ['Product Launch Excellence', 'Customer Impact Award'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/emilychen'
      }
    },
    {
      id: 'emp5',
      name: 'James Wilson',
      position: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin',
      email: 'james.wilson@company.com',
      phone: '+1 (555) 567-8901',
      avatar: null,
      status: 'online',
      joinDate: '2022-11-12',
      manager: 'Sarah Johnson',
      directReports: 0,
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Monitoring'],
      projects: ['Infrastructure Modernization', 'Security Enhancement'],
      timezone: 'CST',
      workingHours: '8:00 AM - 5:00 PM',
      bio: 'DevOps specialist focused on scalable infrastructure and automation.',
      achievements: ['Technical Excellence', 'Innovation in Automation'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jameswilson',
        github: 'https://github.com/jameswilson'
      }
    },
    {
      id: 'emp6',
      name: 'Lisa Park',
      position: 'Design Director',
      department: 'Design',
      location: 'San Francisco',
      email: 'lisa.park@company.com',
      phone: '+1 (555) 678-9012',
      avatar: null,
      status: 'offline',
      joinDate: '2019-04-08',
      manager: 'David Chen',
      directReports: 6,
      skills: ['Design Leadership', 'Brand Strategy', 'Creative Direction', 'Team Building'],
      projects: ['Brand Refresh', 'Design Team Expansion'],
      timezone: 'PST',
      workingHours: '9:30 AM - 6:30 PM',
      bio: 'Creative leader driving design excellence and brand innovation.',
      achievements: ['Design Leadership Award', 'Brand Excellence Recognition'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/lisapark',
        behance: 'https://behance.net/lisapark'
      }
    }
  ];

  // useEffect hooks for API calls
  useEffect(() => {
    fetchEmployees(pagination.page);
  }, [pagination.page]); // Trigger when page changes

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Reset to page 1 when search/department changes
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchEmployees(1); // Explicitly fetch page 1
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedDepartment]);

  // Get department names from centralized data
  const departmentNames = getDepartmentNames();
  
  const departments = [
    { id: 'all', label: 'All Departments', count: pagination.total },
    ...departmentNames.map(dept => ({
      id: dept,
      label: dept,
      count: employees.filter(e => e.department === dept).length
    }))
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'New York', label: 'New York' },
    { id: 'San Francisco', label: 'San Francisco' },
    { id: 'Austin', label: 'Austin' },
    { id: 'Remote', label: 'Remote' }
  ];

  // Filter employees (only apply client-side filtering when using mock data due to error)
  const filteredEmployees = error ? employees.filter(employee => {
    const employeeName = employee.name || `${employee.firstName} ${employee.lastName}`;
    const employeePosition = employee.position || employee.role?.name || employee.role;
    const employeeSkills = employee.skills || [];
    
    const matchesSearch = employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employeePosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employeeSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || employee.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  }) : employees; // API already filters, so use employees directly

  const toggleFavorite = (empId) => {
    setFavorites(prev => 
      prev.includes(empId) 
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'busy': return 'bg-red-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const EmployeeCard = ({ employee }) => {
    const employeeName = employee.name || `${employee.firstName} ${employee.lastName}`;
    const employeePosition = employee.position || employee.role?.name || employee.role;
    const employeeSkills = employee.skills || [];
    const employeeId = employee.id || employee._id;
    
    return (
    <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar 
              user={employee} 
              name={employeeName} 
              email={employee.email} 
              size={64} 
              className="border-2 border-indigo-500/30"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(employee.status || 'offline')} rounded-full border-2 border-[#1B1E2B]`}></div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
              {employeeName}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{employeePosition}</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Building size={12} />
              {employee.department} • {employee.location || 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(employeeId)}
            className={`p-2 rounded-lg transition-colors ${
              favorites.includes(employeeId)
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Star size={16} fill={favorites.includes(employeeId) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Mail size={14} />
          <a href={`mailto:${employee.email}`} className="hover:text-indigo-400 transition-colors">
            {employee.email}
          </a>
        </div>
        {employee.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Phone size={14} />
            <a href={`tel:${employee.phone}`} className="hover:text-indigo-400 transition-colors">
              {employee.phone}
            </a>
          </div>
        )}
        {(employee.workingHours || employee.timezone) && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={14} />
            {employee.workingHours || '9 AM - 5 PM'} ({employee.timezone || 'UTC'})
          </div>
        )}
      </div>

      {employee.bio && (
        <div className="mb-4">
          <p className="text-sm text-gray-300 line-clamp-2">{employee.bio}</p>
        </div>
      )}

      {employeeSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {employeeSkills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
            >
              {skill}
            </span>
          ))}
          {employeeSkills.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{employeeSkills.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Users size={12} />
            {employee.directReports || 0} reports
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            Joined {employee.joinDate ? new Date(employee.joinDate).getFullYear() : 'N/A'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Send Message">
            <MessageCircle size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors" title="Schedule Meeting">
            <Calendar size={16} />
          </button>
        </div>
      </div>
    </div>
    );
  };

  const EmployeeListItem = ({ employee }) => {
    const employeeName = employee.name || `${employee.firstName} ${employee.lastName}`;
    const employeePosition = employee.position || employee.role?.name || employee.role;
    const employeeSkills = employee.skills || [];
    const employeeId = employee.id || employee._id;
    
    return (
    <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-lg border border-gray-700/50 backdrop-blur-sm p-4 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar 
            user={employee} 
            name={employeeName} 
            email={employee.email} 
            size={48} 
            className="border-2 border-indigo-500/30"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(employee.status || 'offline')} rounded-full border-2 border-[#1B1E2B]`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
              {employeeName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              (employee.status || 'offline') === 'online' ? 'bg-green-400/10 text-green-400' :
              (employee.status || 'offline') === 'away' ? 'bg-yellow-400/10 text-yellow-400' :
              (employee.status || 'offline') === 'busy' ? 'bg-red-400/10 text-red-400' :
              'bg-gray-400/10 text-gray-400'
            }`}>
              {getStatusText(employee.status || 'offline')}
            </span>
          </div>
          <p className="text-sm text-gray-400">{employeePosition} • {employee.department}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <MapPin size={10} />
            {employee.location || 'N/A'}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="hidden md:block">
            <a href={`mailto:${employee.email}`} className="hover:text-indigo-400 transition-colors">
              {employee.email}
            </a>
          </div>
          {employeeSkills.length > 0 && (
            <div className="hidden lg:flex items-center gap-2">
              {employeeSkills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(employeeId)}
            className={`p-2 rounded-lg transition-colors ${
              favorites.includes(employeeId)
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Star size={16} fill={favorites.includes(employeeId) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
            <MessageCircle size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors">
            <Calendar size={16} />
          </button>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Employee Directory
        </h1>
        <p className="text-gray-400 mt-2">Find and connect with your colleagues across the organization</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, position, department, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-600/30 transition-colors"
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowOrgChart(!showOrgChart)}
                className="flex items-center gap-2 px-4 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors"
              >
                <Users size={18} />
                Org Chart
              </button>

              <div className="flex items-center gap-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.label} ({dept.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Department Quick Access */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedDepartment === dept.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-[#1B1E2B] border-gray-700/50 text-gray-300 hover:border-indigo-500/50 hover:text-indigo-400'
              }`}
            >
              <Briefcase size={16} />
              {dept.label}
              <span className="bg-gray-600/50 rounded-full px-2 py-1 text-xs">
                {dept.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Loading employees...
              </span>
            ) : (
              <>
                Showing {filteredEmployees.length} of {pagination.total || employees.length} employees
                {error && <span className="text-red-400 ml-2">(showing cached data)</span>}
                {searchTerm && (
                  <span className="text-indigo-400"> for "{searchTerm}"</span>
                )}
              </>
            )}
          </p>
          
          {favorites.length > 0 && (
            <div className="flex items-center gap-2 text-yellow-400">
              <Star size={16} fill="currentColor" />
              {favorites.length} Favorites
            </div>
          )}
        </div>
      </div>

      {/* Employee Grid/List */}
      {!loading && (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredEmployees.map(employee => {
            const employeeId = employee.id || employee._id;
            return viewMode === 'grid' 
              ? <EmployeeCard key={employeeId} employee={employee} />
              : <EmployeeListItem key={employeeId} employee={employee} />
          })}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 size={48} className="text-indigo-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading employees...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users size={64} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No employees found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm 
              ? `No employees match your search for "${searchTerm}"`
              : 'No employees available in this department or location'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-[#1B1E2B] border border-gray-700/50 rounded-lg text-gray-300 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 bg-[#1B1E2B] border border-gray-700/50 rounded-lg text-gray-300 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Organizational Chart Modal */}
      {showOrgChart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Organizational Chart</h2>
              <button
                onClick={() => setShowOrgChart(false)}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center text-gray-400">
              <Users size={48} className="mx-auto mb-4" />
              <p>Organizational chart visualization would be implemented here</p>
              <p className="text-sm mt-2">This would show the company hierarchy and reporting structure</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDirectory;