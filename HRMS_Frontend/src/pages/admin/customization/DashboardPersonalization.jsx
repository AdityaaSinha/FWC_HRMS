import React, { useState } from 'react';
import { Search, Plus, Settings, Eye, Edit, Trash2, Save, RotateCcw, Layout, Grid, BarChart3, Users, Calendar, Bell, FileText, Clock, Target, TrendingUp, Activity, Palette, Monitor, Smartphone, Tablet } from 'lucide-react';

const DashboardPersonalization = () => {
  const [activeTab, setActiveTab] = useState('layouts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  // Mock data for dashboard layouts
  const mockLayouts = [
    {
      id: 1,
      name: 'Executive Dashboard',
      description: 'High-level overview for executives and managers',
      type: 'template',
      category: 'Executive',
      isDefault: true,
      lastModified: '2024-01-15 14:30:00',
      author: 'System',
      usage: 45,
      widgets: [
        { id: 'stats', name: 'Key Statistics', type: 'stats', position: { x: 0, y: 0, w: 12, h: 2 } },
        { id: 'chart1', name: 'Employee Growth', type: 'chart', position: { x: 0, y: 2, w: 6, h: 4 } },
        { id: 'chart2', name: 'Department Overview', type: 'chart', position: { x: 6, y: 2, w: 6, h: 4 } },
        { id: 'recent', name: 'Recent Activities', type: 'list', position: { x: 0, y: 6, w: 8, h: 4 } },
        { id: 'alerts', name: 'System Alerts', type: 'alerts', position: { x: 8, y: 6, w: 4, h: 4 } }
      ],
      theme: 'dark',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4'
      }
    },
    {
      id: 2,
      name: 'HR Manager View',
      description: 'Focused on HR operations and employee management',
      type: 'custom',
      category: 'HR',
      isDefault: false,
      lastModified: '2024-01-14 09:15:00',
      author: 'Sarah Johnson',
      usage: 23,
      widgets: [
        { id: 'employee-stats', name: 'Employee Statistics', type: 'stats', position: { x: 0, y: 0, w: 12, h: 2 } },
        { id: 'attendance', name: 'Attendance Overview', type: 'chart', position: { x: 0, y: 2, w: 8, h: 4 } },
        { id: 'leave-requests', name: 'Leave Requests', type: 'list', position: { x: 8, y: 2, w: 4, h: 4 } },
        { id: 'performance', name: 'Performance Metrics', type: 'chart', position: { x: 0, y: 6, w: 6, h: 4 } },
        { id: 'recruitment', name: 'Recruitment Pipeline', type: 'kanban', position: { x: 6, y: 6, w: 6, h: 4 } }
      ],
      theme: 'dark',
      colors: {
        primary: '#10b981',
        secondary: '#f59e0b',
        accent: '#ef4444'
      }
    },
    {
      id: 3,
      name: 'Analytics Focus',
      description: 'Data-driven dashboard with comprehensive analytics',
      type: 'template',
      category: 'Analytics',
      isDefault: false,
      lastModified: '2024-01-13 16:45:00',
      author: 'System',
      usage: 18,
      widgets: [
        { id: 'kpi-grid', name: 'KPI Grid', type: 'stats', position: { x: 0, y: 0, w: 12, h: 3 } },
        { id: 'trend-chart', name: 'Trend Analysis', type: 'chart', position: { x: 0, y: 3, w: 8, h: 5 } },
        { id: 'metrics', name: 'Key Metrics', type: 'metrics', position: { x: 8, y: 3, w: 4, h: 5 } },
        { id: 'heatmap', name: 'Activity Heatmap', type: 'heatmap', position: { x: 0, y: 8, w: 12, h: 4 } }
      ],
      theme: 'dark',
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        accent: '#f59e0b'
      }
    },
    {
      id: 4,
      name: 'Team Lead Dashboard',
      description: 'Team-focused view for project and people management',
      type: 'custom',
      category: 'Management',
      isDefault: false,
      lastModified: '2024-01-12 11:20:00',
      author: 'Mike Chen',
      usage: 31,
      widgets: [
        { id: 'team-stats', name: 'Team Statistics', type: 'stats', position: { x: 0, y: 0, w: 12, h: 2 } },
        { id: 'project-status', name: 'Project Status', type: 'kanban', position: { x: 0, y: 2, w: 6, h: 6 } },
        { id: 'team-performance', name: 'Team Performance', type: 'chart', position: { x: 6, y: 2, w: 6, h: 3 } },
        { id: 'upcoming-tasks', name: 'Upcoming Tasks', type: 'list', position: { x: 6, y: 5, w: 6, h: 3 } },
        { id: 'calendar', name: 'Team Calendar', type: 'calendar', position: { x: 0, y: 8, w: 12, h: 4 } }
      ],
      theme: 'dark',
      colors: {
        primary: '#f59e0b',
        secondary: '#10b981',
        accent: '#ef4444'
      }
    }
  ];

  // Mock data for available widgets
  const availableWidgets = [
    { id: 'stats', name: 'Statistics Cards', icon: BarChart3, category: 'Analytics', description: 'Display key metrics and KPIs' },
    { id: 'chart', name: 'Charts & Graphs', icon: TrendingUp, category: 'Analytics', description: 'Various chart types for data visualization' },
    { id: 'list', name: 'Data Lists', icon: FileText, category: 'Data', description: 'Tabular data and lists' },
    { id: 'calendar', name: 'Calendar View', icon: Calendar, category: 'Scheduling', description: 'Calendar and event display' },
    { id: 'kanban', name: 'Kanban Board', icon: Layout, category: 'Project', description: 'Task and project management boards' },
    { id: 'alerts', name: 'Alert Panel', icon: Bell, category: 'Notifications', description: 'System alerts and notifications' },
    { id: 'users', name: 'User Management', icon: Users, category: 'HR', description: 'Employee and user information' },
    { id: 'activity', name: 'Activity Feed', icon: Activity, category: 'Social', description: 'Recent activities and updates' },
    { id: 'clock', name: 'Time Tracker', icon: Clock, category: 'Time', description: 'Time tracking and attendance' },
    { id: 'goals', name: 'Goals & Targets', icon: Target, category: 'Performance', description: 'Goal tracking and progress' },
    { id: 'metrics', name: 'Metric Panels', icon: Grid, category: 'Analytics', description: 'Custom metric displays' },
    { id: 'heatmap', name: 'Heatmap', icon: Activity, category: 'Analytics', description: 'Data heatmap visualization' }
  ];

  // Mock data for themes and colors
  const themes = [
    { id: 'dark', name: 'Dark Theme', preview: 'bg-gray-900' },
    { id: 'light', name: 'Light Theme', preview: 'bg-white' },
    { id: 'blue', name: 'Blue Theme', preview: 'bg-blue-900' },
    { id: 'green', name: 'Green Theme', preview: 'bg-green-900' }
  ];

  const colorPalettes = [
    { name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4' },
    { name: 'Green', primary: '#10b981', secondary: '#f59e0b', accent: '#ef4444' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#06b6d4', accent: '#f59e0b' },
    { name: 'Orange', primary: '#f59e0b', secondary: '#10b981', accent: '#ef4444' },
    { name: 'Red', primary: '#ef4444', secondary: '#f59e0b', accent: '#10b981' },
    { name: 'Cyan', primary: '#06b6d4', secondary: '#8b5cf6', accent: '#10b981' }
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

  const TypeBadge = ({ type }) => {
    const colors = {
      template: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      custom: 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[type]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const CategoryBadge = ({ category }) => {
    const colors = {
      Executive: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      HR: 'bg-green-500/10 text-green-400 border-green-500/20',
      Analytics: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      Management: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
        {category}
      </span>
    );
  };

  const handlePreviewLayout = (layout) => {
    setSelectedLayout(layout);
    setShowPreview(true);
  };

  const filteredLayouts = mockLayouts.filter(layout => 
    layout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    layout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    layout.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Personalization</h1>
            <p className="text-gray-400 mt-2">Customize dashboard layouts, themes, and widgets</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Layout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Layouts"
            value={mockLayouts.length}
            icon={Layout}
            color="blue"
            trend={12}
          />
          <StatCard
            title="Active Users"
            value="117"
            icon={Users}
            color="green"
            trend={8}
          />
          <StatCard
            title="Widget Types"
            value={availableWidgets.length}
            icon={Grid}
            color="purple"
            trend={15}
          />
          <StatCard
            title="Customizations"
            value="89"
            icon={Palette}
            color="yellow"
            trend={23}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'layouts', label: 'Layouts', icon: Layout },
            { id: 'widgets', label: 'Widgets', icon: Grid },
            { id: 'themes', label: 'Themes', icon: Palette },
            { id: 'settings', label: 'Settings', icon: Settings }
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
            {activeTab === 'layouts' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search layouts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="all">All Categories</option>
                      <option value="executive">Executive</option>
                      <option value="hr">HR</option>
                      <option value="analytics">Analytics</option>
                      <option value="management">Management</option>
                    </select>
                  </div>
                </div>

                {/* Layouts Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredLayouts.map((layout) => (
                      <div key={layout.id} className="bg-gray-750 border border-gray-600 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{layout.name}</h3>
                              {layout.isDefault && (
                                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-full text-xs font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{layout.description}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <TypeBadge type={layout.type} />
                              <CategoryBadge category={layout.category} />
                            </div>
                          </div>
                        </div>

                        {/* Layout Preview */}
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-12 gap-1 h-24">
                            {layout.widgets.map((widget, index) => (
                              <div
                                key={index}
                                className="bg-indigo-500/20 border border-indigo-500/30 rounded"
                                style={{
                                  gridColumn: `span ${Math.min(widget.position.w, 12)}`,
                                  gridRow: `span ${Math.min(widget.position.h, 6)}`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-400 block">Author</span>
                            <span className="text-white">{layout.author}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Usage</span>
                            <span className="text-white">{layout.usage} users</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Widgets</span>
                            <span className="text-white">{layout.widgets.length} widgets</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Last Modified</span>
                            <span className="text-white">{layout.lastModified}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handlePreviewLayout(layout)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                            >
                              <Eye className="h-3 w-3" />
                              <span>Preview</span>
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                              Use Layout
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </button>
                            {!layout.isDefault && (
                              <button className="text-gray-400 hover:text-red-400">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'widgets' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Available Widgets</h3>
                  <p className="text-gray-400 text-sm mt-1">Drag and drop widgets to customize your dashboard</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableWidgets.map((widget) => (
                      <div key={widget.id} className="bg-gray-750 border border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-move">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <widget.icon className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{widget.name}</h4>
                            <p className="text-gray-400 text-xs">{widget.category}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{widget.description}</p>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm">
                          Add Widget
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'themes' && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Theme Customization</h3>
                  <p className="text-gray-400 text-sm mt-1">Customize the look and feel of your dashboard</p>
                </div>
                <div className="p-6 space-y-8">
                  {/* Theme Selection */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Base Theme</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {themes.map((theme) => (
                        <div key={theme.id} className="border border-gray-600 rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                          <div className={`w-full h-16 ${theme.preview} rounded-lg mb-3 border border-gray-600`}></div>
                          <p className="text-white text-sm font-medium">{theme.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Palettes */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Color Palette</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {colorPalettes.map((palette, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                          <div className="flex space-x-2 mb-3">
                            <div className="w-8 h-8 rounded" style={{ backgroundColor: palette.primary }}></div>
                            <div className="w-8 h-8 rounded" style={{ backgroundColor: palette.secondary }}></div>
                            <div className="w-8 h-8 rounded" style={{ backgroundColor: palette.accent }}></div>
                          </div>
                          <p className="text-white text-sm font-medium">{palette.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Custom Colors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                        <div className="flex space-x-2">
                          <input type="color" defaultValue="#6366f1" className="w-12 h-10 rounded border border-gray-600" />
                          <input type="text" defaultValue="#6366f1" className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Color</label>
                        <div className="flex space-x-2">
                          <input type="color" defaultValue="#8b5cf6" className="w-12 h-10 rounded border border-gray-600" />
                          <input type="text" defaultValue="#8b5cf6" className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Accent Color</label>
                        <div className="flex space-x-2">
                          <input type="color" defaultValue="#06b6d4" className="w-12 h-10 rounded border border-gray-600" />
                          <input type="text" defaultValue="#06b6d4" className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                        </div>
                      </div>
                    </div>
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
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Create New Layout
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Import Layout
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Export Current
                </button>
              </div>
            </div>

            {/* Layout Statistics */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Layout Usage</h3>
              <div className="space-y-4">
                {mockLayouts.slice(0, 4).map((layout) => (
                  <div key={layout.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{layout.name}</p>
                      <p className="text-gray-400 text-xs">{layout.usage} users</p>
                    </div>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${(layout.usage / 50) * 100}%` }}
                      ></div>
                    </div>
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
                    <p className="text-sm text-white">New layout created</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Theme updated</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Widget added</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Preview */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Device Preview</h3>
              <div className="flex space-x-2 mb-4">
                {[
                  { id: 'desktop', icon: Monitor, label: 'Desktop' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet' },
                  { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                ].map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setPreviewDevice(device.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded text-sm ${
                      previewDevice === device.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <device.icon className="h-3 w-3" />
                    <span>{device.label}</span>
                  </button>
                ))}
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className={`bg-gray-600 rounded mx-auto ${
                  previewDevice === 'desktop' ? 'w-full h-20' :
                  previewDevice === 'tablet' ? 'w-3/4 h-16' :
                  'w-1/2 h-12'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Layout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Layout</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Layout Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter layout name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select category</option>
                  <option value="executive">Executive</option>
                  <option value="hr">HR</option>
                  <option value="analytics">Analytics</option>
                  <option value="management">Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Base Template</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Start from scratch</option>
                  <option value="executive">Executive Dashboard</option>
                  <option value="hr">HR Manager View</option>
                  <option value="analytics">Analytics Focus</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Create Layout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedLayout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedLayout.name}</h3>
                <p className="text-gray-400">{selectedLayout.description}</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
              <div className="grid grid-cols-12 gap-4 h-96">
                {selectedLayout.widgets.map((widget, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center justify-center"
                    style={{
                      gridColumn: `span ${widget.position.w}`,
                      gridRow: `span ${widget.position.h}`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-gray-400 mb-2">
                        {widget.type === 'stats' && <BarChart3 className="h-8 w-8 mx-auto" />}
                        {widget.type === 'chart' && <TrendingUp className="h-8 w-8 mx-auto" />}
                        {widget.type === 'list' && <FileText className="h-8 w-8 mx-auto" />}
                        {widget.type === 'calendar' && <Calendar className="h-8 w-8 mx-auto" />}
                        {widget.type === 'kanban' && <Layout className="h-8 w-8 mx-auto" />}
                        {widget.type === 'alerts' && <Bell className="h-8 w-8 mx-auto" />}
                      </div>
                      <p className="text-white text-sm font-medium">{widget.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Use This Layout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPersonalization;
