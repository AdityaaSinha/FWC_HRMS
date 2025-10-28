import React, { useState } from 'react';
import { Search, Plus, Save, Download, Eye, Settings, Mail, MessageSquare, Bell, Edit, Copy, Trash2, Filter, Calendar, Users, Building, Clock, Target, Send, FileText, Code, Palette, Zap, RefreshCw, Play, Pause } from 'lucide-react';

const NotificationTemplates = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: 'email',
    subject: '',
    content: '',
    variables: []
  });

  // Mock template categories
  const categories = [
    { id: 'all', name: 'All Templates', icon: FileText, count: 24 },
    { id: 'email', name: 'Email', icon: Mail, count: 12 },
    { id: 'sms', name: 'SMS', icon: MessageSquare, count: 6 },
    { id: 'push', name: 'Push Notifications', icon: Bell, count: 6 }
  ];

  // Mock notification templates
  const mockTemplates = [
    {
      id: 1,
      name: 'Welcome Email',
      category: 'email',
      type: 'Onboarding',
      subject: 'Welcome to {{company_name}}!',
      content: 'Dear {{employee_name}}, Welcome to our team! We are excited to have you join us.',
      status: 'active',
      lastModified: '2024-01-20',
      usageCount: 145,
      variables: ['company_name', 'employee_name', 'start_date']
    },
    {
      id: 2,
      name: 'Leave Approval',
      category: 'email',
      type: 'Leave Management',
      subject: 'Leave Request Approved',
      content: 'Your leave request from {{start_date}} to {{end_date}} has been approved.',
      status: 'active',
      lastModified: '2024-01-19',
      usageCount: 89,
      variables: ['employee_name', 'start_date', 'end_date', 'leave_type']
    },
    {
      id: 3,
      name: 'Meeting Reminder',
      category: 'sms',
      type: 'Meetings',
      subject: '',
      content: 'Reminder: You have a meeting at {{meeting_time}} in {{location}}.',
      status: 'active',
      lastModified: '2024-01-18',
      usageCount: 234,
      variables: ['employee_name', 'meeting_time', 'location', 'meeting_title']
    },
    {
      id: 4,
      name: 'Task Assignment',
      category: 'push',
      type: 'Task Management',
      subject: 'New Task Assigned',
      content: 'You have been assigned a new task: {{task_title}}',
      status: 'active',
      lastModified: '2024-01-17',
      usageCount: 167,
      variables: ['employee_name', 'task_title', 'due_date', 'priority']
    },
    {
      id: 5,
      name: 'Birthday Wishes',
      category: 'email',
      type: 'Employee Engagement',
      subject: 'Happy Birthday {{employee_name}}!',
      content: 'Wishing you a very happy birthday! Hope you have a wonderful day.',
      status: 'draft',
      lastModified: '2024-01-16',
      usageCount: 52,
      variables: ['employee_name', 'company_name']
    },
    {
      id: 6,
      name: 'Payroll Alert',
      category: 'sms',
      type: 'Payroll',
      subject: '',
      content: 'Your salary for {{month}} has been processed and will be credited today.',
      status: 'active',
      lastModified: '2024-01-15',
      usageCount: 312,
      variables: ['employee_name', 'month', 'amount']
    }
  ];

  // Mock statistics
  const stats = [
    { title: 'Total Templates', value: '24', icon: FileText, color: 'blue' },
    { title: 'Active Templates', value: '18', icon: Play, color: 'green' },
    { title: 'Draft Templates', value: '6', icon: Edit, color: 'yellow' },
    { title: 'Monthly Usage', value: '1.2K', icon: Send, color: 'purple' }
  ];

  // Mock available variables
  const availableVariables = [
    { name: 'employee_name', description: 'Employee full name' },
    { name: 'company_name', description: 'Company name' },
    { name: 'department', description: 'Employee department' },
    { name: 'manager_name', description: 'Manager name' },
    { name: 'start_date', description: 'Start date' },
    { name: 'end_date', description: 'End date' },
    { name: 'current_date', description: 'Current date' },
    { name: 'location', description: 'Office location' }
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateForm({
      name: template.name,
      category: template.category,
      subject: template.subject,
      content: template.content,
      variables: template.variables
    });
    setShowEditor(true);
  };

  const handleSaveTemplate = () => {
    // Save template logic here
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Notification Templates</h1>
        <p className="text-gray-400">Manage email, SMS, and push notification templates for automated communications</p>
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
                  { id: 'templates', label: 'Templates', icon: FileText },
                  { id: 'editor', label: 'Template Editor', icon: Edit },
                  { id: 'variables', label: 'Variables', icon: Code },
                  { id: 'settings', label: 'Settings', icon: Settings }
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

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search templates..."
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowEditor(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Template</span>
                  </button>
                </div>

                {/* Category Filters */}
                <div className="flex space-x-2 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition ${
                        selectedCategory === category.id
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">{category.count}</span>
                    </button>
                  ))}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredTemplates.map((template) => (
                    <div key={template.id} className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-medium">{template.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              template.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {template.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{template.type}</p>
                          {template.subject && (
                            <p className="text-gray-300 text-sm mb-2 font-medium">
                              Subject: {template.subject}
                            </p>
                          )}
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {template.content}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => setShowPreview(template)}
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditTemplate(template)}
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usageCount} times</span>
                        <span>Modified {template.lastModified}</span>
                      </div>
                      
                      {template.variables.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <p className="text-xs text-gray-400 mb-2">Variables:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.variables.map((variable) => (
                              <span
                                key={variable}
                                className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                              >
                                {`{{${variable}}}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Template Editor Tab */}
            {activeTab === 'editor' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {selectedTemplate ? 'Edit Template' : 'Create New Template'}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Template Name
                        </label>
                        <input
                          type="text"
                          value={templateForm.name}
                          onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                          placeholder="Enter template name..."
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={templateForm.category}
                          onChange={(e) => setTemplateForm({...templateForm, category: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="email">Email</option>
                          <option value="sms">SMS</option>
                          <option value="push">Push Notification</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject (for email and push) */}
                    {(templateForm.category === 'email' || templateForm.category === 'push') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject Line
                        </label>
                        <input
                          type="text"
                          value={templateForm.subject}
                          onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                          placeholder="Enter subject line..."
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message Content
                      </label>
                      <textarea
                        value={templateForm.content}
                        onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                        placeholder="Enter message content..."
                        rows={8}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleSaveTemplate}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Template</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Send className="h-4 w-4" />
                        <span>Test Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Variables Tab */}
            {activeTab === 'variables' && (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Available Variables</h3>
                  <p className="text-gray-400">Use these variables in your templates to personalize messages</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableVariables.map((variable) => (
                    <div key={variable.name} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-indigo-400 font-mono text-sm">
                          {`{{${variable.name}}}`}
                        </code>
                        <button className="text-gray-400 hover:text-white">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{variable.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Template Settings</h3>
                  <p className="text-gray-400 mb-6">Configure global template settings and preferences</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Configure Settings
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
                <span>New Template</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Copy className="h-4 w-4" />
                <span>Duplicate Template</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Send className="h-4 w-4" />
                <span>Test Template</span>
              </button>
            </div>
          </div>

          {/* Template Categories */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Template Categories</h3>
            <div className="space-y-2">
              {categories.slice(1).map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-300">Welcome Email template updated</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">New SMS template created</p>
                <p className="text-gray-500 text-xs">5 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Leave Approval template used</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTemplates;
