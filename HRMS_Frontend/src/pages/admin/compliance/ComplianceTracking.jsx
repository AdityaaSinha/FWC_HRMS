import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Clock, FileText, Users, TrendingUp, Download, RefreshCw, Calendar, Shield } from 'lucide-react';

const ComplianceTracking = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState(null);

  // Mock data for compliance requirements
  const mockComplianceRequirements = [
    {
      id: 1,
      title: 'Annual Security Training',
      description: 'Mandatory cybersecurity awareness training for all employees',
      category: 'Security',
      priority: 'high',
      dueDate: '2024-03-15',
      completionRate: 85,
      totalEmployees: 150,
      completedEmployees: 128,
      status: 'in_progress',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'GDPR Data Protection Training',
      description: 'Data protection and privacy compliance training',
      category: 'Privacy',
      priority: 'high',
      dueDate: '2024-02-28',
      completionRate: 92,
      totalEmployees: 150,
      completedEmployees: 138,
      status: 'on_track',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      title: 'Workplace Safety Certification',
      description: 'Annual workplace safety and emergency procedures training',
      category: 'Safety',
      priority: 'medium',
      dueDate: '2024-04-30',
      completionRate: 67,
      totalEmployees: 150,
      completedEmployees: 101,
      status: 'at_risk',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      title: 'Anti-Harassment Training',
      description: 'Workplace harassment prevention and reporting procedures',
      category: 'HR',
      priority: 'high',
      dueDate: '2024-01-31',
      completionRate: 98,
      totalEmployees: 150,
      completedEmployees: 147,
      status: 'completed',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      title: 'Financial Compliance Review',
      description: 'Annual financial reporting and compliance assessment',
      category: 'Finance',
      priority: 'medium',
      dueDate: '2024-06-15',
      completionRate: 45,
      totalEmployees: 25,
      completedEmployees: 11,
      status: 'not_started',
      lastUpdated: '2024-01-10'
    }
  ];

  // Mock data for compliance violations
  const mockViolations = [
    {
      id: 1,
      employee: 'John Smith',
      department: 'Engineering',
      violation: 'Missed mandatory security training deadline',
      severity: 'medium',
      date: '2024-01-10',
      status: 'resolved',
      resolution: 'Training completed with extension'
    },
    {
      id: 2,
      employee: 'Sarah Johnson',
      department: 'Marketing',
      violation: 'Data handling policy violation',
      severity: 'high',
      date: '2024-01-08',
      status: 'pending',
      resolution: null
    },
    {
      id: 3,
      employee: 'Mike Wilson',
      department: 'Sales',
      violation: 'Incomplete harassment training',
      severity: 'low',
      date: '2024-01-05',
      status: 'in_review',
      resolution: 'Under investigation'
    }
  ];

  // Mock data for compliance stats
  const complianceStats = {
    overallCompliance: 87,
    activeRequirements: 12,
    completedRequirements: 8,
    pendingViolations: 5,
    resolvedViolations: 23,
    atRiskEmployees: 15
  };

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

  const StatusBadge = ({ status }) => {
    const colors = {
      completed: 'bg-green-500/10 text-green-400 border-green-500/20',
      on_track: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      at_risk: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      not_started: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
      pending: 'bg-red-500/10 text-red-400 border-red-500/20',
      in_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    
    const labels = {
      completed: 'Completed',
      on_track: 'On Track',
      in_progress: 'In Progress',
      at_risk: 'At Risk',
      not_started: 'Not Started',
      resolved: 'Resolved',
      pending: 'Pending',
      in_review: 'In Review'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {labels[status]}
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

  const SeverityBadge = ({ severity }) => {
    const colors = {
      high: 'bg-red-500/10 text-red-400 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const ProgressBar = ({ percentage, color = 'indigo' }) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const handleViewDetails = (compliance) => {
    setSelectedCompliance(compliance);
    setShowDetailsModal(true);
  };

  const filteredRequirements = mockComplianceRequirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || req.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Compliance Tracking</h1>
            <p className="text-gray-400 mt-2">Monitor and track organizational compliance requirements</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Overall Compliance"
            value={complianceStats.overallCompliance}
            suffix="%"
            icon={Shield}
            color="green"
            trend={5}
          />
          <StatCard
            title="Active Requirements"
            value={complianceStats.activeRequirements}
            icon={FileText}
            color="blue"
            trend={2}
          />
          <StatCard
            title="Completed"
            value={complianceStats.completedRequirements}
            icon={CheckCircle}
            color="green"
            trend={12}
          />
          <StatCard
            title="Pending Violations"
            value={complianceStats.pendingViolations}
            icon={AlertTriangle}
            color="red"
            trend={-8}
          />
          <StatCard
            title="Resolved Violations"
            value={complianceStats.resolvedViolations}
            icon={CheckCircle}
            color="green"
            trend={15}
          />
          <StatCard
            title="At Risk Employees"
            value={complianceStats.atRiskEmployees}
            icon={Users}
            color="orange"
            trend={-3}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'requirements', label: 'Requirements', icon: FileText },
            { id: 'violations', label: 'Violations', icon: AlertTriangle },
            { id: 'reports', label: 'Reports', icon: Calendar }
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
            {activeTab === 'requirements' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search requirements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="at_risk">At Risk</option>
                      <option value="not_started">Not Started</option>
                    </select>
                  </div>
                </div>

                {/* Requirements List */}
                <div className="divide-y divide-gray-700">
                  {filteredRequirements.map((requirement) => (
                    <div key={requirement.id} className="p-6 hover:bg-gray-750">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{requirement.title}</h3>
                            <PriorityBadge priority={requirement.priority} />
                            <StatusBadge status={requirement.status} />
                          </div>
                          <p className="text-gray-400 mb-3">{requirement.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                            <span>Category: {requirement.category}</span>
                            <span>Due: {requirement.dueDate}</span>
                            <span>Progress: {requirement.completedEmployees}/{requirement.totalEmployees} employees</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Completion Rate</span>
                                <span className="text-white font-medium">{requirement.completionRate}%</span>
                              </div>
                              <ProgressBar 
                                percentage={requirement.completionRate} 
                                color={requirement.completionRate >= 90 ? 'green' : requirement.completionRate >= 70 ? 'yellow' : 'red'}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="ml-6">
                          <button
                            onClick={() => handleViewDetails(requirement)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'violations' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Compliance Violations</h3>
                  <p className="text-gray-400 text-sm mt-1">Track and manage compliance violations</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Violation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {mockViolations.map((violation) => (
                        <tr key={violation.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{violation.employee}</div>
                              <div className="text-sm text-gray-400">{violation.department}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white max-w-xs">{violation.violation}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <SeverityBadge severity={violation.severity} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {violation.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={violation.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                              View
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              Resolve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Compliance Overview Chart */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Compliance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Completion by Category</h4>
                      <div className="space-y-3">
                        {['Security', 'Privacy', 'Safety', 'HR', 'Finance'].map((category, index) => {
                          const percentage = [85, 92, 67, 98, 45][index];
                          return (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">{category}</span>
                                <span className="text-white">{percentage}%</span>
                              </div>
                              <ProgressBar percentage={percentage} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Anti-Harassment Training completed</p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Security Training deadline approaching</p>
                            <p className="text-xs text-gray-400">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">Data handling violation reported</p>
                            <p className="text-xs text-gray-400">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-4">
                    {mockComplianceRequirements
                      .filter(req => req.status !== 'completed')
                      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                      .slice(0, 3)
                      .map((requirement) => (
                        <div key={requirement.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${
                              requirement.priority === 'high' ? 'bg-red-500/10' :
                              requirement.priority === 'medium' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                            }`}>
                              <Clock className={`h-4 w-4 ${
                                requirement.priority === 'high' ? 'text-red-400' :
                                requirement.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                              }`} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{requirement.title}</h4>
                              <p className="text-gray-400 text-sm">Due: {requirement.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{requirement.completionRate}%</p>
                            <p className="text-gray-400 text-sm">{requirement.completedEmployees}/{requirement.totalEmployees}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                  Add Requirement
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Reminder
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Compliance Score */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Score</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{complianceStats.overallCompliance}%</div>
                <p className="text-gray-400 text-sm mb-4">Overall Compliance Rate</p>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${complianceStats.overallCompliance}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">High Risk</span>
                  <span className="text-red-400 font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Medium Risk</span>
                  <span className="text-yellow-400 font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Low Risk</span>
                  <span className="text-green-400 font-medium">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedCompliance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedCompliance.title}</h3>
                <p className="text-gray-400 mt-1">{selectedCompliance.description}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Progress</h4>
                <div className="text-2xl font-bold text-white mb-2">{selectedCompliance.completionRate}%</div>
                <ProgressBar percentage={selectedCompliance.completionRate} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Completion</h4>
                <div className="text-2xl font-bold text-white">
                  {selectedCompliance.completedEmployees}/{selectedCompliance.totalEmployees}
                </div>
                <p className="text-gray-400 text-sm">employees completed</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{selectedCompliance.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Priority:</span>
                <PriorityBadge priority={selectedCompliance.priority} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <StatusBadge status={selectedCompliance.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Due Date:</span>
                <span className="text-white">{selectedCompliance.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated:</span>
                <span className="text-white">{selectedCompliance.lastUpdated}</span>
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
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceTracking;
