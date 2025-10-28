// src/pages/hr/HRDepartmentsPage.jsx
import React, { useState } from 'react';
import { Building2, Mail, Users, Send, Eye, EyeOff, ArrowLeft, Search, Phone, MapPin, Calendar, UserCheck, Edit, Badge, Clock, DollarSign, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HRDepartmentsPage() {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [viewingDepartment, setViewingDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = [
    {
      id: 'engineering',
      name: 'Engineering',
      email: 'engineering@company.com',
      headOfDepartment: 'John Smith',
      employeeCount: 45,
      description: 'Software development and technical innovation',
      color: 'blue'
    },
    {
      id: 'hr',
      name: 'HR',
      email: 'hr@company.com',
      headOfDepartment: 'Sarah Johnson',
      employeeCount: 12,
      description: 'Human resources and talent management',
      color: 'green'
    },
    {
      id: 'finance',
      name: 'Finance',
      email: 'finance@company.com',
      headOfDepartment: 'Michael Brown',
      employeeCount: 18,
      description: 'Financial planning and accounting',
      color: 'yellow'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      email: 'marketing@company.com',
      headOfDepartment: 'Emily Davis',
      employeeCount: 22,
      description: 'Brand promotion and customer engagement',
      color: 'purple'
    },
    {
      id: 'operations',
      name: 'Operations',
      email: 'operations@company.com',
      headOfDepartment: 'David Wilson',
      employeeCount: 35,
      description: 'Business operations and process management',
      color: 'red'
    },
    {
      id: 'design',
      name: 'Design',
      email: 'design@company.com',
      headOfDepartment: 'Jessica Chen',
      employeeCount: 15,
      description: 'UI/UX design and creative solutions',
      color: 'pink'
    }
  ];

  // Enhanced employee data
  const employees = [
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice@company.com', 
      role: 'HR Manager', 
      department: 'HR',
      employeeId: 'EMP001',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2022-01-15',
      status: 'Active',
      avatar: 'AJ',
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
      joinDate: '2021-03-20',
      status: 'Active',
      avatar: 'BS',
      salary: '$120,000',
      manager: 'John Smith',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      projects: ['Mobile App Redesign', 'API Optimization'],
      performance: 'Outstanding',
      lastLogin: '2024-01-15 08:45 AM'
    },
    { 
      id: 3, 
      name: 'Carol Davis', 
      email: 'carol@company.com', 
      role: 'Financial Analyst', 
      department: 'Finance',
      employeeId: 'EMP003',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      joinDate: '2023-06-10',
      status: 'Active',
      avatar: 'CD',
      salary: '$75,000',
      manager: 'Michael Brown',
      skills: ['Financial Modeling', 'Excel', 'SAP', 'Data Analysis'],
      projects: ['Budget Planning 2024', 'Cost Optimization'],
      performance: 'Good',
      lastLogin: '2024-01-14 05:20 PM'
    },
    { 
      id: 4, 
      name: 'David Wilson', 
      email: 'david@company.com', 
      role: 'Marketing Specialist', 
      department: 'Marketing',
      employeeId: 'EMP004',
      phone: '+1 (555) 456-7890',
      location: 'Los Angeles, CA',
      joinDate: '2022-09-05',
      status: 'Active',
      avatar: 'DW',
      salary: '$68,000',
      manager: 'Emily Davis',
      skills: ['Digital Marketing', 'SEO', 'Content Creation', 'Analytics'],
      projects: ['Brand Campaign Q1', 'Social Media Strategy'],
      performance: 'Good',
      lastLogin: '2024-01-15 10:15 AM'
    },
    { 
      id: 5, 
      name: 'Eva Martinez', 
      email: 'eva@company.com', 
      role: 'Operations Manager', 
      department: 'Operations',
      employeeId: 'EMP005',
      phone: '+1 (555) 567-8901',
      location: 'Austin, TX',
      joinDate: '2021-11-12',
      status: 'Active',
      avatar: 'EM',
      salary: '$95,000',
      manager: 'David Wilson',
      skills: ['Process Improvement', 'Project Management', 'Lean Six Sigma'],
      projects: ['Workflow Automation', 'Quality Assurance'],
      performance: 'Excellent',
      lastLogin: '2024-01-15 07:30 AM'
    },
    { 
      id: 6, 
      name: 'Frank Thompson', 
      email: 'frank@company.com', 
      role: 'DevOps Engineer', 
      department: 'Engineering',
      employeeId: 'EMP006',
      phone: '+1 (555) 678-9012',
      location: 'Seattle, WA',
      joinDate: '2023-02-28',
      status: 'Active',
      avatar: 'FT',
      salary: '$110,000',
      manager: 'John Smith',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
      projects: ['Infrastructure Upgrade', 'Security Enhancement'],
      performance: 'Good',
      lastLogin: '2024-01-15 09:00 AM'
    },
    { 
      id: 7, 
      name: 'Jessica Chen', 
      email: 'jessica@company.com', 
      role: 'Design Director', 
      department: 'Design',
      employeeId: 'EMP007',
      phone: '+1 (555) 789-0123',
      location: 'Portland, OR',
      joinDate: '2021-08-15',
      status: 'Active',
      avatar: 'JC',
      salary: '$105,000',
      manager: 'Sarah Wilson',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Design Systems'],
      projects: ['Brand Redesign', 'Mobile App UI'],
      performance: 'Outstanding',
      lastLogin: '2024-01-15 08:15 AM'
    },
    { 
      id: 8, 
      name: 'Alex Rivera', 
      email: 'alex@company.com', 
      role: 'UX Designer', 
      department: 'Design',
      employeeId: 'EMP008',
      phone: '+1 (555) 890-1234',
      location: 'Denver, CO',
      joinDate: '2022-11-20',
      status: 'Active',
      avatar: 'AR',
      salary: '$78,000',
      manager: 'Jessica Chen',
      skills: ['User Research', 'Prototyping', 'Wireframing', 'Usability Testing'],
      projects: ['User Journey Mapping', 'Dashboard Redesign'],
      performance: 'Good',
      lastLogin: '2024-01-15 09:45 AM'
    }
  ];

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDepartments.length === departments.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(departments.map(dept => dept.id));
    }
  };

  const handleSendEmail = () => {
    if (selectedDepartments.length === 0) {
      alert('Please select at least one department');
      return;
    }
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    const selectedDepts = departments.filter(dept => selectedDepartments.includes(dept.id));
    const emailList = selectedDepts.map(dept => dept.email).join(', ');
    
    // In a real application, this would send the email via API
    alert(`Email would be sent to: ${emailList}\n\nSubject: ${emailSubject}\n\nMessage: ${emailMessage}`);
    
    // Reset form
    setEmailSubject('');
    setEmailMessage('');
    setSelectedDepartments([]);
    setShowEmailForm(false);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'border-blue-500 bg-blue-500/10 text-blue-400',
      green: 'border-green-500 bg-green-500/10 text-green-400',
      yellow: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
      purple: 'border-purple-500 bg-purple-500/10 text-purple-400',
      red: 'border-red-500 bg-red-500/10 text-red-400',
      pink: 'border-pink-500 bg-pink-500/10 text-pink-400'
    };
    return colorMap[color] || 'border-indigo-500 bg-indigo-500/10 text-indigo-400';
  };

  // Filter employees by department and search term
  const getFilteredEmployees = (departmentName) => {
    return employees.filter(emp => {
      const matchesDepartment = emp.department === departmentName;
      const matchesSearch = searchTerm === '' || 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  };

  // Handle viewing department employees
  const handleViewEmployees = (department) => {
    setViewingDepartment(department);
    setSearchTerm('');
  };

  // Handle back to departments
  const handleBackToDepartments = () => {
    setViewingDepartment(null);
    setSearchTerm('');
    setSelectedEmployee(null);
  };

  // Handle employee click
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // Employee Detail Modal Component
  const EmployeeDetailModal = ({ employee, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1B1E2B] border border-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {employee.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
                <p className="text-indigo-400">{employee.role}</p>
                <p className="text-gray-400">{employee.department}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-300">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-300">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-300">{employee.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge size={16} className="text-gray-400" />
                  <span className="text-gray-300">ID: {employee.employeeId}</span>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Employment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-300">Joined: {employee.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck size={16} className="text-gray-400" />
                  <span className="text-green-400">{employee.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-gray-300">{employee.salary}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-gray-300">Manager: {employee.manager}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={16} className="text-gray-400" />
                  <span className="text-gray-300">Performance: {employee.performance}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-300">Last Login: {employee.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm border border-indigo-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Current Projects</h3>
              <div className="space-y-2">
                {employee.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <span className="text-gray-300">{project}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
            <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <Edit size={16} />
              Edit Employee
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
              <Mail size={16} />
              Send Message
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // If viewing a specific department's employees
  if (viewingDepartment) {
    const filteredEmployees = getFilteredEmployees(viewingDepartment.name);
    
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToDepartments}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-indigo-400">
              {viewingDepartment.name} Department Employees
            </h2>
            <p className="text-gray-400">{filteredEmployees.length} employees found</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees by name, email, ID, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1B1E2B] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Employee Table */}
        <div className="bg-[#1B1E2B] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2A2D3D] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEmployees.map((employee) => (
                  <motion.tr
                    key={employee.id}
                    className="hover:bg-[#2A2D3D] transition-colors cursor-pointer"
                    onClick={() => handleEmployeeClick(employee)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                          {employee.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-white">{employee.name}</div>
                          <div className="text-sm text-gray-400">{employee.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{employee.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-300">{employee.email}</div>
                        <div className="text-gray-400">{employee.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs border border-green-600/30">
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {employee.joinDate}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No employees found matching your search.</p>
            </div>
          )}
        </div>

        {/* Employee Detail Modal */}
        {selectedEmployee && (
          <EmployeeDetailModal
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-indigo-400">Department Management</h2>
        <div className="flex gap-3">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            {selectedDepartments.length === departments.length ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={() => setShowEmailForm(!showEmailForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-2"
          >
            <Mail size={16} />
            {showEmailForm ? <EyeOff size={16} /> : <Eye size={16} />}
            {showEmailForm ? 'Hide Email' : 'Send Email'}
          </button>
        </div>
      </div>

      {/* Email Form */}
      {showEmailForm && (
        <div className="bg-[#1B1E2B] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Send Email to Departments</h3>
          <div className="space-y-4">
            {/* To Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
              <div className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white min-h-[40px] flex items-center">
                {selectedDepartments.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedDepartments.map(deptId => {
                      const dept = departments.find(d => d.id === deptId);
                      return (
                        <span
                          key={deptId}
                          className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded text-sm border border-indigo-600/30 flex items-center gap-1"
                        >
                          {dept.email}
                          <button
                            onClick={() => handleDepartmentSelect(deptId)}
                            className="text-indigo-300 hover:text-white ml-1"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-500">Select departments to add email addresses</span>
                )}
              </div>
            </div>

            {/* CC Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">CC</label>
              <input
                type="text"
                placeholder="Enter CC email addresses (comma separated)"
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* BCC Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">BCC</label>
              <input
                type="text"
                placeholder="Enter BCC email addresses (comma separated)"
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter email subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter your message..."
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                {selectedDepartments.length} department(s) selected
              </span>
              <button
                onClick={handleSendEmail}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Send size={16} />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className={`bg-[#1B1E2B] border-2 rounded-xl p-6 transition-all cursor-pointer ${
              selectedDepartments.includes(dept.id)
                ? `${getColorClasses(dept.color)} border-opacity-100`
                : 'border-gray-800 hover:border-indigo-600'
            }`}
            onClick={() => handleDepartmentSelect(dept.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getColorClasses(dept.color)}`}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{dept.name}</h3>
                  <p className="text-sm text-gray-400">{dept.description}</p>
                </div>
              </div>
              {selectedDepartments.includes(dept.id) && (
                <div className={`w-6 h-6 rounded-full ${getColorClasses(dept.color)} flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">{dept.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-400" />
                <span 
                  className="text-indigo-400 hover:text-indigo-300 cursor-pointer underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewEmployees(dept);
                  }}
                >
                  {dept.employeeCount} employees
                </span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-sm text-gray-400">Head of Department</p>
                <p className="text-sm font-medium text-white">{dept.headOfDepartment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Departments Summary */}
      {selectedDepartments.length > 0 && (
        <div className="bg-[#1B1E2B] border border-indigo-600 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-indigo-400 mb-2">Selected Departments ({selectedDepartments.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDepartments.map(deptId => {
              const dept = departments.find(d => d.id === deptId);
              return (
                <span
                  key={deptId}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(dept.color)}`}
                >
                  {dept.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
