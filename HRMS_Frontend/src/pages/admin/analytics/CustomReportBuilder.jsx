import React, { useState } from 'react';
import { Search, Plus, Save, Download, Eye, Settings, BarChart3, PieChart, LineChart, Table, Filter, Calendar, Users, Building, DollarSign, Clock, Target, TrendingUp, Layers, Database, Zap, RefreshCw, Copy, Trash2, Edit, Play } from 'lucide-react';

const CustomReportBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedDataSource, setSelectedDataSource] = useState('employees');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedVisualization, setSelectedVisualization] = useState('table');
  const [reportName, setReportName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedReports, setSavedReports] = useState([]);

  // Mock data sources
  const dataSources = [
    { id: 'employees', name: 'Employees', icon: Users, description: 'Employee data and profiles', count: 1250 },
    { id: 'departments', name: 'Departments', icon: Building, description: 'Department structure and hierarchy', count: 45 },
    { id: 'attendance', name: 'Attendance', icon: Clock, description: 'Time tracking and attendance records', count: 15000 },
    { id: 'payroll', name: 'Payroll', icon: DollarSign, description: 'Salary and compensation data', count: 8500 },
    { id: 'performance', name: 'Performance', icon: Target, description: 'Performance reviews and ratings', count: 3200 },
    { id: 'recruitment', name: 'Recruitment', icon: Users, description: 'Hiring and recruitment metrics', count: 890 }
  ];

  // Mock available fields based on data source
  const availableFields = {
    employees: [
      { id: 'name', label: 'Full Name', type: 'text' },
      { id: 'email', label: 'Email', type: 'text' },
      { id: 'department', label: 'Department', type: 'category' },
      { id: 'position', label: 'Position', type: 'text' },
      { id: 'salary', label: 'Salary', type: 'number' },
      { id: 'hire_date', label: 'Hire Date', type: 'date' },
      { id: 'status', label: 'Status', type: 'category' },
      { id: 'location', label: 'Location', type: 'category' }
    ],
    departments: [
      { id: 'name', label: 'Department Name', type: 'text' },
      { id: 'manager', label: 'Manager', type: 'text' },
      { id: 'employee_count', label: 'Employee Count', type: 'number' },
      { id: 'budget', label: 'Budget', type: 'number' },
      { id: 'location', label: 'Location', type: 'category' }
    ]
  };

  // Mock visualization types
  const visualizationTypes = [
    { id: 'table', name: 'Table', icon: Table, description: 'Tabular data display' },
    { id: 'bar', name: 'Bar Chart', icon: BarChart3, description: 'Compare values across categories' },
    { id: 'pie', name: 'Pie Chart', icon: PieChart, description: 'Show proportions of a whole' },
    { id: 'line', name: 'Line Chart', icon: LineChart, description: 'Show trends over time' }
  ];

  // Mock saved reports
  const mockSavedReports = [
    {
      id: 1,
      name: 'Employee Demographics Report',
      description: 'Breakdown of employees by department and location',
      dataSource: 'employees',
      createdDate: '2024-01-15',
      lastRun: '2024-01-20',
      visualization: 'bar',
      status: 'active'
    },
    {
      id: 2,
      name: 'Monthly Attendance Summary',
      description: 'Attendance patterns and trends by department',
      dataSource: 'attendance',
      createdDate: '2024-01-10',
      lastRun: '2024-01-19',
      visualization: 'line',
      status: 'active'
    },
    {
      id: 3,
      name: 'Salary Analysis Report',
      description: 'Compensation analysis across different roles',
      dataSource: 'payroll',
      createdDate: '2024-01-08',
      lastRun: '2024-01-18',
      visualization: 'table',
      status: 'draft'
    }
  ];

  // Mock statistics
  const stats = [
    { title: 'Total Reports', value: '24', icon: BarChart3, color: 'blue' },
    { title: 'Data Sources', value: '6', icon: Database, color: 'green' },
    { title: 'Active Reports', value: '18', icon: Play, color: 'purple' },
    { title: 'Scheduled Reports', value: '12', icon: Clock, color: 'orange' }
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

  const addField = (field) => {
    if (!selectedFields.find(f => f.id === field.id)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const removeField = (fieldId) => {
    setSelectedFields(selectedFields.filter(f => f.id !== fieldId));
  };

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: '',
      operator: 'equals',
      value: ''
    };
    setSelectedFilters([...selectedFilters, newFilter]);
  };

  const updateFilter = (filterId, key, value) => {
    setSelectedFilters(selectedFilters.map(filter => 
      filter.id === filterId ? { ...filter, [key]: value } : filter
    ));
  };

  const removeFilter = (filterId) => {
    setSelectedFilters(selectedFilters.filter(f => f.id !== filterId));
  };

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Custom Report Builder</h1>
        <p className="text-gray-400">Create custom reports with drag-and-drop interface and advanced analytics</p>
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
                  { id: 'builder', label: 'Report Builder', icon: Layers },
                  { id: 'saved', label: 'Saved Reports', icon: Save },
                  { id: 'templates', label: 'Templates', icon: Copy }
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

            {/* Report Builder Tab */}
            {activeTab === 'builder' && (
              <div className="p-6">
                {/* Report Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter report name..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Data Source Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">1. Select Data Source</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        onClick={() => setSelectedDataSource(source.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition ${
                          selectedDataSource === source.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <source.icon className={`h-5 w-5 ${
                            selectedDataSource === source.id ? 'text-indigo-400' : 'text-gray-400'
                          }`} />
                          <h4 className="font-medium text-white">{source.name}</h4>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{source.description}</p>
                        <p className="text-xs text-gray-500">{source.count.toLocaleString()} records</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">2. Select Fields</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Available Fields */}
                    <div>
                      <h4 className="font-medium text-gray-300 mb-3">Available Fields</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {availableFields[selectedDataSource]?.map((field) => (
                          <div
                            key={field.id}
                            onClick={() => addField(field)}
                            className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500"
                          >
                            <div>
                              <span className="text-white font-medium">{field.label}</span>
                              <span className="text-xs text-gray-400 ml-2">({field.type})</span>
                            </div>
                            <Plus className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Fields */}
                    <div>
                      <h4 className="font-medium text-gray-300 mb-3">Selected Fields</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg"
                          >
                            <div>
                              <span className="text-white font-medium">{field.label}</span>
                              <span className="text-xs text-indigo-400 ml-2">({field.type})</span>
                            </div>
                            <button
                              onClick={() => removeField(field.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {selectedFields.length === 0 && (
                          <div className="text-center py-8 text-gray-400">
                            No fields selected. Click on available fields to add them.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">3. Add Filters (Optional)</h3>
                    <button
                      onClick={addFilter}
                      className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Filter</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedFilters.map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-lg">
                        <select
                          value={filter.field}
                          onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}
                          className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        >
                          <option value="">Select Field</option>
                          {availableFields[selectedDataSource]?.map((field) => (
                            <option key={field.id} value={field.id}>{field.label}</option>
                          ))}
                        </select>
                        <select
                          value={filter.operator}
                          onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                          className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        >
                          <option value="equals">Equals</option>
                          <option value="contains">Contains</option>
                          <option value="greater_than">Greater Than</option>
                          <option value="less_than">Less Than</option>
                        </select>
                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                          placeholder="Filter value..."
                          className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                        />
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visualization Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">4. Choose Visualization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {visualizationTypes.map((viz) => (
                      <div
                        key={viz.id}
                        onClick={() => setSelectedVisualization(viz.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition ${
                          selectedVisualization === viz.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-center">
                          <viz.icon className={`h-8 w-8 mx-auto mb-2 ${
                            selectedVisualization === viz.id ? 'text-indigo-400' : 'text-gray-400'
                          }`} />
                          <h4 className="font-medium text-white mb-1">{viz.name}</h4>
                          <p className="text-xs text-gray-400">{viz.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Report</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            )}

            {/* Saved Reports Tab */}
            {activeTab === 'saved' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search reports..."
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus className="h-4 w-4" />
                    <span>New Report</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {mockSavedReports.map((report) => (
                    <div key={report.id} className="p-4 bg-gray-700 border border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-medium">{report.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{report.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Created: {report.createdDate}</span>
                            <span>Last Run: {report.lastRun}</span>
                            <span>Type: {report.visualization}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <Copy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Report Templates</h3>
                  <p className="text-gray-400 mb-6">Pre-built report templates to get you started quickly</p>
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
                <Zap className="h-4 w-4" />
                <span>Generate Report</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh Data</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Settings className="h-4 w-4" />
                <span>Report Settings</span>
              </button>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Available Data Sources</h3>
            <div className="space-y-2">
              {dataSources.slice(0, 4).map((source) => (
                <div key={source.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <source.icon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{source.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{source.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-300">Employee Demographics Report generated</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">New data source connected</p>
                <p className="text-gray-500 text-xs">5 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Monthly report scheduled</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReportBuilder;
