import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, User, Mail, Calendar, Shield, AlertTriangle, RefreshCw, Send, UserCheck, UserX, Settings, Download } from 'lucide-react';

const AccountActivation = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [activationAction, setActivationAction] = useState('');
  const [bulkAction, setBulkAction] = useState('');

  // Mock data for pending activations
  const mockPendingUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Engineering',
      role: 'Software Developer',
      requestDate: '2024-01-15',
      requestedBy: 'HR Manager',
      status: 'pending',
      priority: 'high',
      documents: ['Resume', 'ID Copy', 'Contract'],
      notes: 'New hire for React development team'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      role: 'Marketing Specialist',
      requestDate: '2024-01-14',
      requestedBy: 'Marketing Director',
      status: 'pending',
      priority: 'medium',
      documents: ['Resume', 'Portfolio'],
      notes: 'Experienced in digital marketing campaigns'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Finance',
      role: 'Financial Analyst',
      requestDate: '2024-01-13',
      requestedBy: 'Finance Manager',
      status: 'pending',
      priority: 'low',
      documents: ['Resume', 'Certifications'],
      notes: 'CPA certified with 5 years experience'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'HR',
      role: 'HR Coordinator',
      requestDate: '2024-01-12',
      requestedBy: 'HR Director',
      status: 'pending',
      priority: 'high',
      documents: ['Resume', 'References', 'Background Check'],
      notes: 'Will handle employee onboarding processes'
    }
  ];

  // Mock data for activated users
  const mockActivatedUsers = [
    {
      id: 5,
      name: 'Alex Wilson',
      email: 'alex.wilson@company.com',
      department: 'IT',
      role: 'System Administrator',
      requestDate: '2024-01-10',
      activatedDate: '2024-01-11',
      activatedBy: 'IT Manager',
      status: 'active',
      lastLogin: '2024-01-15 09:30:00'
    },
    {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@company.com',
      department: 'Sales',
      role: 'Sales Representative',
      requestDate: '2024-01-08',
      activatedDate: '2024-01-09',
      activatedBy: 'Sales Manager',
      status: 'active',
      lastLogin: '2024-01-15 14:20:00'
    }
  ];

  // Mock data for rejected users
  const mockRejectedUsers = [
    {
      id: 7,
      name: 'Tom Anderson',
      email: 'tom.anderson@company.com',
      department: 'Operations',
      role: 'Operations Manager',
      requestDate: '2024-01-05',
      rejectedDate: '2024-01-06',
      rejectedBy: 'HR Director',
      status: 'rejected',
      rejectionReason: 'Incomplete documentation'
    }
  ];

  // Mock statistics
  const mockStats = {
    totalPending: 4,
    totalActivated: 156,
    totalRejected: 8,
    todayActivations: 3,
    avgActivationTime: '2.5 days',
    pendingHighPriority: 2
  };

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend, suffix = '' }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}{suffix}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      active: 'bg-green-500/10 text-green-400 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: 'bg-red-500/10 text-red-400 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const handleActivateUser = (userId, action) => {
    setActivationAction(action);
    setShowActivationModal(true);
  };

  const handleBulkAction = () => {
    if (selectedUsers.length > 0 && bulkAction) {
      console.log(`Performing ${bulkAction} on users:`, selectedUsers);
      setSelectedUsers([]);
      setBulkAction('');
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'pending':
        return mockPendingUsers;
      case 'activated':
        return mockActivatedUsers;
      case 'rejected':
        return mockRejectedUsers;
      default:
        return mockPendingUsers;
    }
  };

  const filteredUsers = getCurrentData().filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Account Activation</h1>
            <p className="text-gray-400 mt-2">Manage user account activation requests and status</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Pending Requests"
            value={mockStats.totalPending}
            icon={Clock}
            color="yellow"
            trend={-15}
          />
          <StatCard
            title="Total Activated"
            value={mockStats.totalActivated}
            icon={CheckCircle}
            color="green"
            trend={8}
          />
          <StatCard
            title="Total Rejected"
            value={mockStats.totalRejected}
            icon={XCircle}
            color="red"
            trend={-25}
          />
          <StatCard
            title="Today's Activations"
            value={mockStats.todayActivations}
            icon={UserCheck}
            color="blue"
            trend={50}
          />
          <StatCard
            title="Avg. Activation Time"
            value={mockStats.avgActivationTime}
            icon={Calendar}
            color="purple"
          />
          <StatCard
            title="High Priority"
            value={mockStats.pendingHighPriority}
            icon={AlertTriangle}
            color="orange"
            trend={-10}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'pending', label: 'Pending Requests', icon: Clock, count: mockStats.totalPending },
            { id: 'activated', label: 'Activated Users', icon: CheckCircle, count: mockStats.totalActivated },
            { id: 'rejected', label: 'Rejected Requests', icon: XCircle, count: mockStats.totalRejected }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
              {/* Search and Filters */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                      showFilters 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-750 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                      <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                      <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Roles</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Marketing Specialist">Marketing Specialist</option>
                        <option value="Financial Analyst">Financial Analyst</option>
                        <option value="HR Coordinator">HR Coordinator</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}

                {/* Bulk Actions */}
                {activeTab === 'pending' && selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-4 mt-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <span className="text-indigo-400 text-sm">{selectedUsers.length} users selected</span>
                    <select 
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Action</option>
                      <option value="activate">Activate Selected</option>
                      <option value="reject">Reject Selected</option>
                      <option value="send_reminder">Send Reminder</option>
                    </select>
                    <button
                      onClick={handleBulkAction}
                      disabled={!bulkAction}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Apply Action
                    </button>
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750">
                    <tr>
                      {activeTab === 'pending' && (
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(filteredUsers.map(user => user.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            className="rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                          />
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request Date</th>
                      {activeTab === 'pending' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-750">
                        {activeTab === 'pending' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                }
                              }}
                              className="rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{user.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{user.requestDate}</div>
                        </td>
                        {activeTab === 'pending' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <PriorityBadge priority={user.priority} />
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-400 hover:text-indigo-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            {activeTab === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleActivateUser(user.id, 'activate')}
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleActivateUser(user.id, 'reject')}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300">
                                  <Send className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {filteredUsers.length} of {getCurrentData().length} users
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">1</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">2</button>
                  <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Bulk Activate
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Reminders
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export Pending
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Department Breakdown</h3>
              <div className="space-y-3">
                {[
                  { name: 'Engineering', pending: 2, color: 'blue' },
                  { name: 'Marketing', pending: 1, color: 'green' },
                  { name: 'Finance', pending: 1, color: 'yellow' },
                  { name: 'HR', pending: 1, color: 'purple' },
                  { name: 'IT', pending: 0, color: 'indigo' },
                  { name: 'Sales', pending: 0, color: 'pink' }
                ].map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${dept.color}-500`}></div>
                      <span className="text-white text-sm">{dept.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{dept.pending}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Alex Wilson activated</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">New request from John Smith</p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Tom Anderson request rejected</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activation Guidelines */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Activation Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verify all required documents</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Confirm department approval</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Check background verification</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Assign appropriate role permissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activation Modal */}
      {showActivationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                {activationAction === 'activate' ? 'Activate User' : 'Reject Request'}
              </h3>
              <button
                onClick={() => setShowActivationModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {activationAction === 'activate' ? 'Activation Notes' : 'Rejection Reason'}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={activationAction === 'activate' ? 'Add any notes for the activation...' : 'Provide reason for rejection...'}
                />
              </div>
              
              {activationAction === 'activate' && (
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-300">Send welcome email to user</span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowActivationModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  activationAction === 'activate'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {activationAction === 'activate' ? 'Activate User' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountActivation;
