import React, { useState } from 'react';
import { Play, Pause, Square, Settings, Plus, Edit, Trash2, Copy, Eye, Clock, Zap, GitBranch, Filter, Search, MoreHorizontal, CheckCircle, XCircle, AlertCircle, Users, Mail, Calendar, FileText, Database, Workflow, ArrowRight, ArrowDown } from 'lucide-react';

const AutomatedWorkflows = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // Mock workflow data
  const workflows = [
    {
      id: 1,
      name: 'Employee Onboarding',
      description: 'Automated onboarding process for new employees',
      status: 'active',
      trigger: 'Employee Created',
      lastRun: '2024-01-15 10:30 AM',
      executions: 45,
      successRate: 98,
      category: 'HR',
      steps: 8,
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      name: 'Leave Request Approval',
      description: 'Multi-level approval workflow for leave requests',
      status: 'active',
      trigger: 'Leave Request Submitted',
      lastRun: '2024-01-15 09:15 AM',
      executions: 123,
      successRate: 95,
      category: 'Leave',
      steps: 5,
      estimatedTime: '30 minutes'
    },
    {
      id: 3,
      name: 'Performance Review Cycle',
      description: 'Quarterly performance review automation',
      status: 'paused',
      trigger: 'Scheduled',
      lastRun: '2024-01-10 08:00 AM',
      executions: 12,
      successRate: 100,
      category: 'Performance',
      steps: 12,
      estimatedTime: '1 week'
    },
    {
      id: 4,
      name: 'Expense Report Processing',
      description: 'Automated expense report validation and approval',
      status: 'active',
      trigger: 'Expense Submitted',
      lastRun: '2024-01-15 11:45 AM',
      executions: 89,
      successRate: 92,
      category: 'Finance',
      steps: 6,
      estimatedTime: '1 hour'
    },
    {
      id: 5,
      name: 'Document Expiry Alerts',
      description: 'Notify employees about expiring documents',
      status: 'draft',
      trigger: 'Scheduled',
      lastRun: 'Never',
      executions: 0,
      successRate: 0,
      category: 'Compliance',
      steps: 3,
      estimatedTime: '15 minutes'
    }
  ];

  // Mock trigger types
  const triggerTypes = [
    { id: 'employee_created', name: 'Employee Created', icon: Users, category: 'HR' },
    { id: 'leave_submitted', name: 'Leave Request Submitted', icon: Calendar, category: 'Leave' },
    { id: 'expense_submitted', name: 'Expense Submitted', icon: FileText, category: 'Finance' },
    { id: 'document_uploaded', name: 'Document Uploaded', icon: Database, category: 'Documents' },
    { id: 'scheduled', name: 'Scheduled', icon: Clock, category: 'Time' },
    { id: 'email_received', name: 'Email Received', icon: Mail, category: 'Communication' }
  ];

  // Mock statistics
  const stats = [
    { title: 'Active Workflows', value: '12', icon: Workflow, color: 'blue', change: '+2' },
    { title: 'Total Executions', value: '1,247', icon: Play, color: 'green', change: '+156' },
    { title: 'Success Rate', value: '96.2%', icon: CheckCircle, color: 'emerald', change: '+1.2%' },
    { title: 'Time Saved', value: '48h', icon: Clock, color: 'purple', change: '+8h' }
  ];

  // Mock recent executions
  const recentExecutions = [
    {
      id: 1,
      workflow: 'Employee Onboarding',
      status: 'completed',
      startTime: '2024-01-15 10:30 AM',
      duration: '1h 45m',
      trigger: 'John Doe created'
    },
    {
      id: 2,
      workflow: 'Leave Request Approval',
      status: 'running',
      startTime: '2024-01-15 11:00 AM',
      duration: '15m',
      trigger: 'Sarah Wilson leave request'
    },
    {
      id: 3,
      workflow: 'Expense Report Processing',
      status: 'failed',
      startTime: '2024-01-15 09:45 AM',
      duration: '5m',
      trigger: 'Mike Johnson expense report'
    },
    {
      id: 4,
      workflow: 'Employee Onboarding',
      status: 'completed',
      startTime: '2024-01-15 08:15 AM',
      duration: '2h 10m',
      trigger: 'Emma Davis created'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-green-400 text-sm mt-1">
              {change} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const WorkflowCard = ({ workflow }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-green-400 bg-green-400/10';
        case 'paused': return 'text-yellow-400 bg-yellow-400/10';
        case 'draft': return 'text-gray-400 bg-gray-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'active': return <Play className="h-3 w-3" />;
        case 'paused': return <Pause className="h-3 w-3" />;
        case 'draft': return <Edit className="h-3 w-3" />;
        default: return <Square className="h-3 w-3" />;
      }
    };

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-white font-medium">{workflow.name}</h3>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                {getStatusIcon(workflow.status)}
                <span className="capitalize">{workflow.status}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{workflow.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>{workflow.trigger}</span>
              </span>
              <span className="flex items-center space-x-1">
                <GitBranch className="h-4 w-4" />
                <span>{workflow.steps} steps</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{workflow.estimatedTime}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-white text-lg font-semibold">{workflow.executions}</p>
            <p className="text-gray-400 text-xs">Executions</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-semibold">{workflow.successRate}%</p>
            <p className="text-gray-400 text-xs">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">{workflow.lastRun}</p>
            <p className="text-gray-400 text-xs">Last Run</p>
          </div>
        </div>
      </div>
    );
  };

  const ExecutionRow = ({ execution }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'text-green-400 bg-green-400/10';
        case 'running': return 'text-blue-400 bg-blue-400/10';
        case 'failed': return 'text-red-400 bg-red-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed': return <CheckCircle className="h-4 w-4" />;
        case 'running': return <Play className="h-4 w-4" />;
        case 'failed': return <XCircle className="h-4 w-4" />;
        default: return <AlertCircle className="h-4 w-4" />;
      }
    };

    return (
      <tr className="border-b border-gray-700 hover:bg-gray-800/50">
        <td className="px-6 py-4">
          <div>
            <p className="text-white font-medium">{execution.workflow}</p>
            <p className="text-gray-400 text-sm">{execution.trigger}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
            {getStatusIcon(execution.status)}
            <span className="capitalize">{execution.status}</span>
          </span>
        </td>
        <td className="px-6 py-4 text-gray-300">{execution.startTime}</td>
        <td className="px-6 py-4 text-gray-300">{execution.duration}</td>
        <td className="px-6 py-4">
          <button className="text-indigo-400 hover:text-indigo-300">
            View Details
          </button>
        </td>
      </tr>
    );
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Automated Workflows</h1>
            <p className="text-gray-400">Create and manage automated business processes</p>
          </div>
          <button
            onClick={() => setShowWorkflowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Main Panel */}
        <div className="flex-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: Workflow },
                  { id: 'workflows', label: 'Workflows', icon: GitBranch },
                  { id: 'executions', label: 'Executions', icon: Play },
                  { id: 'triggers', label: 'Triggers', icon: Zap },
                  { id: 'templates', label: 'Templates', icon: FileText }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Workflow Performance Chart */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Workflow Performance</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Performance chart will be displayed here</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentExecutions.slice(0, 4).map((execution) => (
                        <div key={execution.id} className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            execution.status === 'completed' ? 'bg-green-500/10' :
                            execution.status === 'running' ? 'bg-blue-500/10' : 'bg-red-500/10'
                          }`}>
                            {execution.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-400" />}
                            {execution.status === 'running' && <Play className="h-4 w-4 text-blue-400" />}
                            {execution.status === 'failed' && <XCircle className="h-4 w-4 text-red-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{execution.workflow}</p>
                            <p className="text-gray-400 text-xs">{execution.trigger}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-300 text-xs">{execution.startTime}</p>
                            <p className="text-gray-400 text-xs">{execution.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Plus className="h-6 w-6 text-indigo-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Create Workflow</p>
                      <p className="text-gray-400 text-sm">Build a new automated process</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <FileText className="h-6 w-6 text-green-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Use Template</p>
                      <p className="text-gray-400 text-sm">Start from a pre-built template</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition">
                    <Settings className="h-6 w-6 text-purple-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Workflow Settings</p>
                      <p className="text-gray-400 text-sm">Configure global settings</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Workflows Tab */}
            {activeTab === 'workflows' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="draft">Draft</option>
                  </select>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Workflows Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredWorkflows.map((workflow) => (
                    <WorkflowCard key={workflow.id} workflow={workflow} />
                  ))}
                </div>
              </div>
            )}

            {/* Executions Tab */}
            {activeTab === 'executions' && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-6 text-gray-300 font-medium">Workflow</th>
                        <th className="text-left py-3 px-6 text-gray-300 font-medium">Status</th>
                        <th className="text-left py-3 px-6 text-gray-300 font-medium">Start Time</th>
                        <th className="text-left py-3 px-6 text-gray-300 font-medium">Duration</th>
                        <th className="text-left py-3 px-6 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentExecutions.map((execution) => (
                        <ExecutionRow key={execution.id} execution={execution} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Triggers Tab */}
            {activeTab === 'triggers' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {triggerTypes.map((trigger) => (
                    <div key={trigger.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition cursor-pointer">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                          <trigger.icon className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{trigger.name}</h4>
                          <p className="text-gray-400 text-sm">{trigger.category}</p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                        Use Trigger
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Workflow Templates</h3>
                  <p className="text-gray-400 mb-6">Pre-built workflow templates to get you started quickly</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Browse Templates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Plus className="h-4 w-4" />
                <span>Create New Workflow</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Copy className="h-4 w-4" />
                <span>Duplicate Workflow</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <FileText className="h-4 w-4" />
                <span>Import Template</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Workflow Engine</span>
                <span className="flex items-center space-x-1 text-green-400 text-sm">
                  <CheckCircle className="h-3 w-3" />
                  <span>Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Queue Status</span>
                <span className="text-white text-sm">3 pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Last Backup</span>
                <span className="text-white text-sm">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Workflow timeout warning</p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Backup completed successfully</p>
                  <p className="text-gray-500 text-xs">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <XCircle className="h-4 w-4 text-red-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Workflow execution failed</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedWorkflows;
