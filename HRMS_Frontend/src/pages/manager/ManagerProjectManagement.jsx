import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Plus,
  Calendar,
  Users,
  Clock,
  Target,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  MoreVertical,
  Filter,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  Flag,
  DollarSign,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react';
import Avatar from '../../components/common/Avatar';

const ManagerProjectManagement = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock project data
  const [projects] = useState([
    {
      id: 1,
      name: 'Dashboard Redesign',
      description: 'Complete overhaul of the admin dashboard with modern UI/UX',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-03-30',
      budget: 50000,
      spent: 32500,
      manager: 'John Smith',
      team: [
        { name: 'Sarah Johnson', role: 'UI Designer', user: { id: 'sarah-johnson', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' } },
        { name: 'Mike Chen', role: 'Frontend Dev', user: { id: 'mike-chen', name: 'Mike Chen', email: 'mike.chen@company.com' } },
        { name: 'Emily Davis', role: 'UX Researcher', user: { id: 'emily-davis', name: 'Emily Davis', email: 'emily.davis@company.com' } }
      ],
      milestones: [
        { name: 'Research & Planning', completed: true, date: '2024-01-30' },
        { name: 'Design System', completed: true, date: '2024-02-15' },
        { name: 'Component Development', completed: false, date: '2024-03-01' },
        { name: 'Testing & QA', completed: false, date: '2024-03-20' },
        { name: 'Deployment', completed: false, date: '2024-03-30' }
      ],
      tasks: {
        total: 45,
        completed: 29,
        inProgress: 12,
        pending: 4
      },
      riskLevel: 'medium'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      status: 'planning',
      priority: 'high',
      progress: 15,
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      budget: 120000,
      spent: 18000,
      manager: 'Sarah Johnson',
      team: [
        { name: 'John Smith', role: 'Tech Lead', user: { id: 'john-smith', name: 'John Smith', email: 'john.smith@company.com' } },
        { name: 'Mike Chen', role: 'Mobile Dev', user: { id: 'mike-chen', name: 'Mike Chen', email: 'mike.chen@company.com' } }
      ],
      milestones: [
        { name: 'Requirements Gathering', completed: true, date: '2024-02-15' },
        { name: 'Architecture Design', completed: false, date: '2024-03-01' },
        { name: 'MVP Development', completed: false, date: '2024-04-15' },
        { name: 'Beta Testing', completed: false, date: '2024-05-15' },
        { name: 'App Store Release', completed: false, date: '2024-06-15' }
      ],
      tasks: {
        total: 78,
        completed: 12,
        inProgress: 8,
        pending: 58
      },
      riskLevel: 'low'
    },
    {
      id: 3,
      name: 'Data Analytics Platform',
      description: 'Advanced analytics platform with real-time reporting capabilities',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      startDate: '2023-10-01',
      endDate: '2024-01-31',
      budget: 80000,
      spent: 75000,
      manager: 'Mike Chen',
      team: [
        { name: 'Emily Davis', role: 'Data Scientist', user: { id: 'emily-davis', name: 'Emily Davis', email: 'emily.davis@company.com' } },
        { name: 'John Smith', role: 'Backend Dev', user: { id: 'john-smith', name: 'John Smith', email: 'john.smith@company.com' } }
      ],
      milestones: [
        { name: 'Data Architecture', completed: true, date: '2023-11-01' },
        { name: 'ETL Pipeline', completed: true, date: '2023-12-01' },
        { name: 'Dashboard Development', completed: true, date: '2024-01-15' },
        { name: 'Testing & Optimization', completed: true, date: '2024-01-25' },
        { name: 'Production Deployment', completed: true, date: '2024-01-31' }
      ],
      tasks: {
        total: 56,
        completed: 56,
        inProgress: 0,
        pending: 0
      },
      riskLevel: 'low'
    },
    {
      id: 4,
      name: 'Security Audit & Compliance',
      description: 'Comprehensive security review and compliance implementation',
      status: 'on-hold',
      priority: 'high',
      progress: 30,
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      budget: 60000,
      spent: 18000,
      manager: 'Emily Davis',
      team: [
        { name: 'John Smith', role: 'Security Lead', avatar: 'https://i.pravatar.cc/150?img=25' }
      ],
      milestones: [
        { name: 'Security Assessment', completed: true, date: '2024-01-15' },
        { name: 'Vulnerability Analysis', completed: false, date: '2024-02-15' },
        { name: 'Compliance Framework', completed: false, date: '2024-03-15' },
        { name: 'Implementation', completed: false, date: '2024-04-15' },
        { name: 'Final Audit', completed: false, date: '2024-04-30' }
      ],
      tasks: {
        total: 32,
        completed: 10,
        inProgress: 2,
        pending: 20
      },
      riskLevel: 'high'
    }
  ]);

  const statusColors = {
    'planning': 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'completed': 'bg-green-100 text-green-700',
    'on-hold': 'bg-red-100 text-red-700'
  };

  const priorityColors = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-red-600'
  };

  const riskColors = {
    'low': 'bg-green-100 text-green-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'high': 'bg-red-100 text-red-700'
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleExportProjects = () => {
    const csvContent = [
      ['Project Name', 'Status', 'Progress', 'Budget', 'Spent', 'Team Size', 'Risk Level'],
      ...projects.map(project => [
        project.name,
        project.status,
        project.progress + '%',
        '$' + project.budget.toLocaleString(),
        '$' + project.spent.toLocaleString(),
        project.team.length,
        project.riskLevel
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Management</h1>
          <p className="text-gray-400">Track and manage all your projects in one place</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportProjects}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <FolderOpen className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Projects</p>
              <p className="text-xl font-bold text-white">{projectStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 rounded-lg">
              <Activity className="text-yellow-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-xl font-bold text-white">{projectStats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-xl font-bold text-white">{projectStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <Pause className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">On Hold</p>
              <p className="text-xl font-bold text-white">{projectStats.onHold}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <DollarSign className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Budget</p>
              <p className="text-xl font-bold text-white">${(projectStats.totalBudget / 1000)}K</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <TrendingUp className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Budget Used</p>
              <p className="text-xl font-bold text-white">
                {Math.round((projectStats.totalSpent / projectStats.totalBudget) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {project.team.length} members
                  </div>
                  <div className={`flex items-center gap-1 ${priorityColors[project.priority]}`}>
                    <Flag size={14} />
                    {project.priority}
                  </div>
                </div>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-700 rounded">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-medium text-white">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    project.progress === 100 ? 'bg-green-500' :
                    project.progress >= 70 ? 'bg-blue-500' :
                    project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Budget Information */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Budget</span>
                <span className="text-sm font-medium text-white">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (project.spent / project.budget) > 0.9 ? 'bg-red-500' :
                    (project.spent / project.budget) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Team Avatars */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, index) => (
                  <Avatar
                    key={index}
                    user={member.user}
                    name={member.name}
                    size={32}
                    className="rounded-full border-2 border-gray-800"
                    title={`${member.name} - ${member.role}`}
                  />
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs font-medium text-gray-300">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${riskColors[project.riskLevel]}`}>
                {project.riskLevel} risk
              </span>
            </div>

            {/* Task Summary */}
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{project.tasks.completed}</div>
                  <div className="text-xs text-gray-400">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400">{project.tasks.inProgress}</div>
                  <div className="text-xs text-gray-400">In Progress</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-400">{project.tasks.pending}</div>
                  <div className="text-xs text-gray-400">Pending</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-400">{project.tasks.total}</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewProject(project)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
              >
                <Eye size={14} />
                View Details
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-sm">
                <Edit size={14} />
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-sm">
                <BarChart3 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedProject.name}</h2>
                  <p className="text-gray-400">{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Overview */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Project Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[selectedProject.status]}`}>
                        {selectedProject.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Priority:</span>
                      <span className={`font-medium ${priorityColors[selectedProject.priority]}`}>
                        {selectedProject.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progress:</span>
                      <span className="font-medium text-white">{selectedProject.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-white">{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-white">{new Date(selectedProject.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white">${selectedProject.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Spent:</span>
                      <span className="text-white">${selectedProject.spent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar
                          user={member.user}
                          name={member.name}
                          size={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-white mb-3">Project Milestones</h3>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-600'
                        }`}>
                          {milestone.completed && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${milestone.completed ? 'text-white' : 'text-gray-400'}`}>
                            {milestone.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(milestone.date).toLocaleDateString()}
                          </div>
                        </div>
                        {milestone.completed && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Edit Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full border border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Create New Project</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter project description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Budget</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter budget"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerProjectManagement;