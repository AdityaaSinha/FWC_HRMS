import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical, Download, Upload, RefreshCw, User, Briefcase, GraduationCap, Award, TrendingUp } from 'lucide-react';

const EmployeeLifecycle = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock employee lifecycle data
  const mockEmployees = [
    {
      id: 'emp001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      hireDate: '2023-01-15',
      currentStage: 'active',
      avatar: null,
      lifecycle: [
        { stage: 'application', date: '2022-12-01', status: 'completed', duration: 7 },
        { stage: 'interview', date: '2022-12-08', status: 'completed', duration: 14 },
        { stage: 'offer', date: '2022-12-22', status: 'completed', duration: 10 },
        { stage: 'onboarding', date: '2023-01-15', status: 'completed', duration: 30 },
        { stage: 'probation', date: '2023-02-14', status: 'completed', duration: 90 },
        { stage: 'active', date: '2023-05-15', status: 'current', duration: 245 }
      ],
      performance: { rating: 4.5, reviews: 3 },
      training: { completed: 8, pending: 2 },
      nextReview: '2024-05-15'
    },
    {
      id: 'emp002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      hireDate: '2023-03-01',
      currentStage: 'probation',
      avatar: null,
      lifecycle: [
        { stage: 'application', date: '2023-01-15', status: 'completed', duration: 5 },
        { stage: 'interview', date: '2023-01-20', status: 'completed', duration: 12 },
        { stage: 'offer', date: '2023-02-01', status: 'completed', duration: 14 },
        { stage: 'onboarding', date: '2023-03-01', status: 'completed', duration: 21 },
        { stage: 'probation', date: '2023-03-22', status: 'current', duration: 45 }
      ],
      performance: { rating: 4.2, reviews: 1 },
      training: { completed: 5, pending: 3 },
      nextReview: '2024-03-22'
    },
    {
      id: 'emp003',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      hireDate: '2023-11-01',
      currentStage: 'onboarding',
      avatar: null,
      lifecycle: [
        { stage: 'application', date: '2023-10-01', status: 'completed', duration: 3 },
        { stage: 'interview', date: '2023-10-04', status: 'completed', duration: 8 },
        { stage: 'offer', date: '2023-10-12', status: 'completed', duration: 7 },
        { stage: 'onboarding', date: '2023-11-01', status: 'current', duration: 15 }
      ],
      performance: { rating: null, reviews: 0 },
      training: { completed: 2, pending: 6 },
      nextReview: '2024-02-01'
    },
    {
      id: 'emp004',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      department: 'HR',
      position: 'HR Specialist',
      hireDate: '2022-06-15',
      currentStage: 'exit',
      avatar: null,
      lifecycle: [
        { stage: 'application', date: '2022-05-01', status: 'completed', duration: 4 },
        { stage: 'interview', date: '2022-05-05', status: 'completed', duration: 10 },
        { stage: 'offer', date: '2022-05-15', status: 'completed', duration: 15 },
        { stage: 'onboarding', date: '2022-06-15', status: 'completed', duration: 30 },
        { stage: 'probation', date: '2022-07-15', status: 'completed', duration: 90 },
        { stage: 'active', date: '2022-10-13', status: 'completed', duration: 400 },
        { stage: 'exit', date: '2023-11-17', status: 'current', duration: 14 }
      ],
      performance: { rating: 4.0, reviews: 4 },
      training: { completed: 12, pending: 0 },
      nextReview: null,
      exitReason: 'Career advancement'
    }
  ];

  // Mock statistics
  const mockStats = {
    totalEmployees: 156,
    activeEmployees: 142,
    onboardingEmployees: 8,
    probationEmployees: 6,
    exitingEmployees: 2,
    avgOnboardingTime: 28,
    retentionRate: 94.2,
    avgTimeToHire: 21
  };

  // Lifecycle stages configuration
  const lifecycleStages = [
    { id: 'application', name: 'Application', color: 'blue', icon: User },
    { id: 'interview', name: 'Interview', color: 'purple', icon: Users },
    { id: 'offer', name: 'Offer', color: 'yellow', icon: Briefcase },
    { id: 'onboarding', name: 'Onboarding', color: 'green', icon: GraduationCap },
    { id: 'probation', name: 'Probation', color: 'orange', icon: Clock },
    { id: 'active', name: 'Active', color: 'emerald', icon: CheckCircle },
    { id: 'exit', name: 'Exit', color: 'red', icon: XCircle }
  ];

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend, suffix = '' }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}{suffix}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ stage }) => {
    const stageConfig = lifecycleStages.find(s => s.id === stage) || lifecycleStages[0];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${stageConfig.color}-500/10 text-${stageConfig.color}-400 border border-${stageConfig.color}-500/20`}>
        {stageConfig.name}
      </span>
    );
  };

  const ProgressBar = ({ stages, currentStage }) => {
    const currentIndex = lifecycleStages.findIndex(s => s.id === currentStage);
    
    return (
      <div className="flex items-center space-x-2">
        {lifecycleStages.slice(0, -1).map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const StageIcon = stage.icon;
          
          return (
            <div key={stage.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                isCompleted 
                  ? `bg-${stage.color}-500 border-${stage.color}-500` 
                  : isCurrent 
                    ? `border-${stage.color}-500 bg-${stage.color}-500/10` 
                    : 'border-gray-600 bg-gray-800'
              }`}>
                <StageIcon className={`h-4 w-4 ${
                  isCompleted 
                    ? 'text-white' 
                    : isCurrent 
                      ? `text-${stage.color}-400` 
                      : 'text-gray-400'
                }`} />
              </div>
              {index < lifecycleStages.length - 2 && (
                <div className={`w-8 h-0.5 ${
                  isCompleted ? `bg-${stage.color}-500` : 'bg-gray-600'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || emp.currentStage === selectedStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Lifecycle</h1>
            <p className="text-gray-400 mt-2">Track and manage employee journey from application to exit</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={mockStats.totalEmployees}
            icon={Users}
            color="blue"
            trend={8}
          />
          <StatCard
            title="Active Employees"
            value={mockStats.activeEmployees}
            icon={CheckCircle}
            color="green"
            trend={5}
          />
          <StatCard
            title="Onboarding"
            value={mockStats.onboardingEmployees}
            icon={GraduationCap}
            color="yellow"
            trend={-12}
          />
          <StatCard
            title="Retention Rate"
            value={mockStats.retentionRate}
            suffix="%"
            icon={TrendingUp}
            color="emerald"
            trend={2}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Probation"
            value={mockStats.probationEmployees}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Exiting"
            value={mockStats.exitingEmployees}
            icon={XCircle}
            color="red"
          />
          <StatCard
            title="Avg Onboarding Time"
            value={mockStats.avgOnboardingTime}
            suffix=" days"
            icon={Calendar}
            color="purple"
          />
          <StatCard
            title="Avg Time to Hire"
            value={mockStats.avgTimeToHire}
            suffix=" days"
            icon={Briefcase}
            color="indigo"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: Users },
            { id: 'stages', label: 'Lifecycle Stages', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg">
              {/* Search and Filters */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      value={selectedStage}
                      onChange={(e) => setSelectedStage(e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Stages</option>
                      {lifecycleStages.map(stage => (
                        <option key={stage.id} value={stage.id}>{stage.name}</option>
                      ))}
                    </select>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              {activeTab === 'overview' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Stage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Performance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Next Review</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-medium text-sm">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{employee.name}</div>
                                <div className="text-sm text-gray-400">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{employee.department}</div>
                            <div className="text-sm text-gray-400">{employee.position}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge stage={employee.currentStage} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-32">
                              <ProgressBar stages={employee.lifecycle} currentStage={employee.currentStage} />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {employee.performance.rating ? (
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-white text-sm">{employee.performance.rating}/5</span>
                                <span className="text-gray-400 text-xs ml-1">({employee.performance.reviews} reviews)</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No reviews yet</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">
                              {employee.nextReview ? new Date(employee.nextReview).toLocaleDateString() : 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowDetailsModal(true);
                                }}
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-300">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Lifecycle Stages View */}
              {activeTab === 'stages' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lifecycleStages.map(stage => {
                      const stageEmployees = mockEmployees.filter(emp => emp.currentStage === stage.id);
                      const StageIcon = stage.icon;
                      
                      return (
                        <div key={stage.id} className="bg-gray-750 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg bg-${stage.color}-500/10`}>
                                <StageIcon className={`h-5 w-5 text-${stage.color}-400`} />
                              </div>
                              <div>
                                <h3 className="text-white font-semibold">{stage.name}</h3>
                                <p className="text-gray-400 text-sm">{stageEmployees.length} employees</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {stageEmployees.slice(0, 3).map(employee => (
                              <div key={employee.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-xs">
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="text-white text-sm font-medium">{employee.name}</div>
                                  <div className="text-gray-400 text-xs">{employee.department}</div>
                                </div>
                              </div>
                            ))}
                            {stageEmployees.length > 3 && (
                              <div className="text-center">
                                <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                                  View {stageEmployees.length - 3} more
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Analytics View */}
              {activeTab === 'analytics' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stage Duration Analysis */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Average Stage Duration</h3>
                      <div className="space-y-3">
                        {[
                          { stage: 'Application', avgDays: 5, color: 'blue' },
                          { stage: 'Interview', avgDays: 12, color: 'purple' },
                          { stage: 'Offer', avgDays: 10, color: 'yellow' },
                          { stage: 'Onboarding', avgDays: 25, color: 'green' },
                          { stage: 'Probation', avgDays: 85, color: 'orange' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.stage}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-600 rounded-full h-2">
                                <div 
                                  className={`bg-${item.color}-500 h-2 rounded-full`} 
                                  style={{ width: `${Math.min(item.avgDays / 90 * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm w-12">{item.avgDays}d</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Department Distribution */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Department Distribution</h3>
                      <div className="space-y-3">
                        {[
                          { dept: 'Engineering', count: 45, percentage: 29 },
                          { dept: 'Sales', count: 32, percentage: 21 },
                          { dept: 'Marketing', count: 28, percentage: 18 },
                          { dept: 'Operations', count: 25, percentage: 16 },
                          { dept: 'HR', count: 15, percentage: 10 },
                          { dept: 'Finance', count: 11, percentage: 7 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.dept}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-indigo-500 h-2 rounded-full" 
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm w-8">{item.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Hiring Trends */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Monthly Hiring Trends</h3>
                      <div className="space-y-3">
                        {[
                          { month: 'Jan 2024', hires: 12, color: 'green' },
                          { month: 'Feb 2024', hires: 8, color: 'blue' },
                          { month: 'Mar 2024', hires: 15, color: 'purple' },
                          { month: 'Apr 2024', hires: 10, color: 'yellow' },
                          { month: 'May 2024', hires: 18, color: 'indigo' },
                          { month: 'Jun 2024', hires: 14, color: 'pink' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.month}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-600 rounded-full h-2">
                                <div 
                                  className={`bg-${item.color}-500 h-2 rounded-full`} 
                                  style={{ width: `${item.hires / 20 * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm w-8">{item.hires}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exit Reasons */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Exit Reasons (Last 6 Months)</h3>
                      <div className="space-y-3">
                        {[
                          { reason: 'Career advancement', count: 8, percentage: 40 },
                          { reason: 'Better compensation', count: 5, percentage: 25 },
                          { reason: 'Work-life balance', count: 3, percentage: 15 },
                          { reason: 'Relocation', count: 2, percentage: 10 },
                          { reason: 'Company culture', count: 1, percentage: 5 },
                          { reason: 'Other', count: 1, percentage: 5 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.reason}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm w-8">{item.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add New Employee
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Bulk Import
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export Data
                </button>
              </div>
            </div>

            {/* Stage Summary */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Stage Summary</h3>
              <div className="space-y-3">
                {lifecycleStages.map(stage => {
                  const count = mockEmployees.filter(emp => emp.currentStage === stage.id).length;
                  const StageIcon = stage.icon;
                  
                  return (
                    <div key={stage.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-750">
                      <div className="flex items-center space-x-3">
                        <div className={`p-1 rounded bg-${stage.color}-500/10`}>
                          <StageIcon className={`h-4 w-4 text-${stage.color}-400`} />
                        </div>
                        <span className="text-white text-sm">{stage.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Mike Wilson started onboarding</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Sarah Johnson completed probation</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Lisa Chen initiated exit process</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Employee Lifecycle Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{selectedEmployee.name}</h4>
                    <p className="text-gray-400">{selectedEmployee.position}</p>
                    <p className="text-gray-400">{selectedEmployee.department}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Hire Date</label>
                    <p className="text-white">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Current Stage</label>
                    <div className="mt-1">
                      <StatusBadge stage={selectedEmployee.currentStage} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Next Review</label>
                    <p className="text-white">
                      {selectedEmployee.nextReview ? new Date(selectedEmployee.nextReview).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lifecycle Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Lifecycle Timeline</h4>
                <div className="space-y-4">
                  {selectedEmployee.lifecycle.map((stage, index) => {
                    const stageConfig = lifecycleStages.find(s => s.id === stage.stage);
                    const StageIcon = stageConfig?.icon || User;
                    
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          stage.status === 'completed' 
                            ? `bg-${stageConfig?.color}-500` 
                            : stage.status === 'current'
                              ? `bg-${stageConfig?.color}-500/20 border border-${stageConfig?.color}-500`
                              : 'bg-gray-600'
                        }`}>
                          <StageIcon className={`h-4 w-4 ${
                            stage.status === 'completed' 
                              ? 'text-white' 
                              : `text-${stageConfig?.color}-400`
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-white font-medium">{stageConfig?.name}</h5>
                            <span className="text-gray-400 text-sm">{stage.duration} days</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {stage.status === 'current' ? 'Started' : 'Completed'} on {new Date(stage.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Employee</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Position</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Initial Stage</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="application">Application</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="onboarding">Onboarding</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLifecycle;
