import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Users, Building, ChevronDown, ChevronRight, MoreVertical, Move, Eye, Settings, Download, Upload, RefreshCw } from 'lucide-react';

const DepartmentHierarchy = () => {
  const [activeTab, setActiveTab] = useState('hierarchy');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDepartments, setExpandedDepartments] = useState(['1', '2', '3']);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [viewMode, setViewMode] = useState('tree'); // tree, list, chart

  // Mock department hierarchy data
  const mockDepartments = [
    {
      id: '1',
      name: 'Executive',
      code: 'EXEC',
      manager: 'John CEO',
      managerId: 'emp001',
      employeeCount: 3,
      level: 0,
      parentId: null,
      description: 'Executive leadership team',
      budget: 500000,
      location: 'HQ - Floor 10',
      status: 'active',
      children: [
        {
          id: '2',
          name: 'Engineering',
          code: 'ENG',
          manager: 'Sarah Tech',
          managerId: 'emp002',
          employeeCount: 45,
          level: 1,
          parentId: '1',
          description: 'Software development and technical operations',
          budget: 2500000,
          location: 'HQ - Floor 3-5',
          status: 'active',
          children: [
            {
              id: '4',
              name: 'Frontend Development',
              code: 'FE',
              manager: 'Mike React',
              managerId: 'emp004',
              employeeCount: 15,
              level: 2,
              parentId: '2',
              description: 'User interface and experience development',
              budget: 800000,
              location: 'HQ - Floor 3',
              status: 'active',
              children: []
            },
            {
              id: '5',
              name: 'Backend Development',
              code: 'BE',
              manager: 'Lisa Node',
              managerId: 'emp005',
              employeeCount: 18,
              level: 2,
              parentId: '2',
              description: 'Server-side development and APIs',
              budget: 900000,
              location: 'HQ - Floor 4',
              status: 'active',
              children: []
            },
            {
              id: '6',
              name: 'DevOps',
              code: 'DEVOPS',
              manager: 'Tom Cloud',
              managerId: 'emp006',
              employeeCount: 8,
              level: 2,
              parentId: '2',
              description: 'Infrastructure and deployment automation',
              budget: 600000,
              location: 'HQ - Floor 5',
              status: 'active',
              children: []
            },
            {
              id: '7',
              name: 'QA Testing',
              code: 'QA',
              manager: 'Anna Test',
              managerId: 'emp007',
              employeeCount: 4,
              level: 2,
              parentId: '2',
              description: 'Quality assurance and testing',
              budget: 200000,
              location: 'HQ - Floor 3',
              status: 'active',
              children: []
            }
          ]
        },
        {
          id: '3',
          name: 'Sales & Marketing',
          code: 'SM',
          manager: 'David Sales',
          managerId: 'emp003',
          employeeCount: 28,
          level: 1,
          parentId: '1',
          description: 'Revenue generation and market expansion',
          budget: 1800000,
          location: 'HQ - Floor 6-7',
          status: 'active',
          children: [
            {
              id: '8',
              name: 'Sales',
              code: 'SALES',
              manager: 'Emma Sell',
              managerId: 'emp008',
              employeeCount: 20,
              level: 2,
              parentId: '3',
              description: 'Direct sales and client acquisition',
              budget: 1200000,
              location: 'HQ - Floor 6',
              status: 'active',
              children: []
            },
            {
              id: '9',
              name: 'Marketing',
              code: 'MKT',
              manager: 'Chris Brand',
              managerId: 'emp009',
              employeeCount: 8,
              level: 2,
              parentId: '3',
              description: 'Brand management and digital marketing',
              budget: 600000,
              location: 'HQ - Floor 7',
              status: 'active',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: '10',
      name: 'Operations',
      code: 'OPS',
      manager: 'Rachel Ops',
      managerId: 'emp010',
      employeeCount: 22,
      level: 0,
      parentId: null,
      description: 'Business operations and support functions',
      budget: 1200000,
      location: 'HQ - Floor 8-9',
      status: 'active',
      children: [
        {
          id: '11',
          name: 'Human Resources',
          code: 'HR',
          manager: 'Jennifer People',
          managerId: 'emp011',
          employeeCount: 8,
          level: 1,
          parentId: '10',
          description: 'Employee relations and talent management',
          budget: 400000,
          location: 'HQ - Floor 8',
          status: 'active',
          children: []
        },
        {
          id: '12',
          name: 'Finance',
          code: 'FIN',
          manager: 'Robert Money',
          managerId: 'emp012',
          employeeCount: 10,
          level: 1,
          parentId: '10',
          description: 'Financial planning and accounting',
          budget: 500000,
          location: 'HQ - Floor 9',
          status: 'active',
          children: []
        },
        {
          id: '13',
          name: 'IT Support',
          code: 'IT',
          manager: 'Kevin Fix',
          managerId: 'emp013',
          employeeCount: 4,
          level: 1,
          parentId: '10',
          description: 'Technical support and infrastructure',
          budget: 300000,
          location: 'HQ - Floor 8',
          status: 'active',
          children: []
        }
      ]
    }
  ];

  // Mock statistics
  const mockStats = {
    totalDepartments: 13,
    totalEmployees: 98,
    totalManagers: 13,
    avgDepartmentSize: 7.5,
    maxHierarchyDepth: 3,
    totalBudget: 6800000
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
      active: 'bg-green-500/10 text-green-400 border-green-500/20',
      inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      restructuring: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const toggleDepartment = (deptId) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const renderDepartmentTree = (departments, level = 0) => {
    return departments.map(dept => (
      <div key={dept.id} className="mb-2">
        <div 
          className={`flex items-center p-3 rounded-lg border transition-colors cursor-pointer ${
            selectedDepartment?.id === dept.id
              ? 'bg-indigo-500/10 border-indigo-500/20'
              : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
          }`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => setSelectedDepartment(dept)}
        >
          <div className="flex items-center flex-1">
            {dept.children && dept.children.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDepartment(dept.id);
                }}
                className="mr-2 p-1 hover:bg-gray-600 rounded"
              >
                {expandedDepartments.includes(dept.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
            )}
            {(!dept.children || dept.children.length === 0) && (
              <div className="w-6 mr-2"></div>
            )}
            
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Building className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-white font-medium">{dept.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{dept.code}</span>
                  <StatusBadge status={dept.status} />
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                  <span>Manager: {dept.manager}</span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{dept.employeeCount} employees</span>
                  </span>
                  <span>Budget: ${(dept.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white">
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDepartment(dept);
                setShowEditModal(true);
              }}
              className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {dept.children && dept.children.length > 0 && expandedDepartments.includes(dept.id) && (
          <div className="mt-2">
            {renderDepartmentTree(dept.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getAllDepartments = (departments) => {
    let allDepts = [];
    departments.forEach(dept => {
      allDepts.push(dept);
      if (dept.children && dept.children.length > 0) {
        allDepts = allDepts.concat(getAllDepartments(dept.children));
      }
    });
    return allDepts;
  };

  const filteredDepartments = getAllDepartments(mockDepartments).filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Department Hierarchy</h1>
            <p className="text-gray-400 mt-2">Manage organizational structure and department relationships</p>
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
              <span>Add Department</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Total Departments"
            value={mockStats.totalDepartments}
            icon={Building}
            color="blue"
            trend={8}
          />
          <StatCard
            title="Total Employees"
            value={mockStats.totalEmployees}
            icon={Users}
            color="green"
            trend={12}
          />
          <StatCard
            title="Total Managers"
            value={mockStats.totalManagers}
            icon={Users}
            color="purple"
            trend={-5}
          />
          <StatCard
            title="Avg Dept Size"
            value={mockStats.avgDepartmentSize}
            icon={Users}
            color="yellow"
            trend={3}
          />
          <StatCard
            title="Max Depth"
            value={mockStats.maxHierarchyDepth}
            icon={Building}
            color="indigo"
          />
          <StatCard
            title="Total Budget"
            value={`$${(mockStats.totalBudget / 1000000).toFixed(1)}M`}
            icon={Building}
            color="green"
            trend={15}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'hierarchy', label: 'Hierarchy View', icon: Building },
            { id: 'list', label: 'List View', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: Settings }
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
              {/* Search and Controls */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search departments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="tree">Tree View</option>
                      <option value="list">List View</option>
                      <option value="chart">Org Chart</option>
                    </select>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg border border-gray-600 flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setExpandedDepartments(getAllDepartments(mockDepartments).map(d => d.id))}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandedDepartments([])}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Department Tree */}
              {activeTab === 'hierarchy' && (
                <div className="p-6">
                  {searchQuery ? (
                    <div className="space-y-2">
                      <h3 className="text-white font-medium mb-4">Search Results ({filteredDepartments.length})</h3>
                      {filteredDepartments.map(dept => (
                        <div key={dept.id} className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg">
                          <div className="p-2 bg-indigo-500/10 rounded-lg mr-3">
                            <Building className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-medium">{dept.name}</h3>
                              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{dept.code}</span>
                              <StatusBadge status={dept.status} />
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                              <span>Manager: {dept.manager}</span>
                              <span className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{dept.employeeCount} employees</span>
                              </span>
                              <span>Level: {dept.level}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {renderDepartmentTree(mockDepartments)}
                    </div>
                  )}
                </div>
              )}

              {/* List View */}
              {activeTab === 'list' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-750">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Manager</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employees</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {getAllDepartments(mockDepartments).map((dept) => (
                        <tr key={dept.id} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 bg-indigo-500/10 rounded-lg mr-3">
                                <Building className="h-5 w-5 text-indigo-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{dept.name}</div>
                                <div className="text-sm text-gray-400">{dept.code}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{dept.manager}</div>
                            <div className="text-sm text-gray-400">{dept.managerId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-white">
                              <Users className="h-4 w-4 mr-1" />
                              {dept.employeeCount}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">${(dept.budget / 1000).toFixed(0)}K</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{dept.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={dept.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-indigo-400 hover:text-indigo-300">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-green-400 hover:text-green-300">
                                <Move className="h-4 w-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Analytics View */}
              {activeTab === 'analytics' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department Size Distribution */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Department Size Distribution</h3>
                      <div className="space-y-3">
                        {[
                          { range: '1-5 employees', count: 4, percentage: 31 },
                          { range: '6-15 employees', count: 5, percentage: 38 },
                          { range: '16-25 employees', count: 3, percentage: 23 },
                          { range: '25+ employees', count: 1, percentage: 8 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.range}</span>
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

                    {/* Budget Allocation */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Budget Allocation</h3>
                      <div className="space-y-3">
                        {[
                          { dept: 'Engineering', budget: 2500000, percentage: 37 },
                          { dept: 'Sales & Marketing', budget: 1800000, percentage: 26 },
                          { dept: 'Operations', budget: 1200000, percentage: 18 },
                          { dept: 'Executive', budget: 500000, percentage: 7 },
                          { dept: 'Others', budget: 800000, percentage: 12 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.dept}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm w-16">${(item.budget / 1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hierarchy Depth Analysis */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Hierarchy Depth</h3>
                      <div className="space-y-3">
                        {[
                          { level: 'Level 0 (Root)', count: 2, departments: ['Executive', 'Operations'] },
                          { level: 'Level 1', count: 5, departments: ['Engineering', 'Sales & Marketing', 'HR', 'Finance', 'IT Support'] },
                          { level: 'Level 2', count: 6, departments: ['Frontend', 'Backend', 'DevOps', 'QA', 'Sales', 'Marketing'] }
                        ].map((item, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{item.level}</span>
                              <span className="text-indigo-400">{item.count} departments</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {item.departments.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Manager Span of Control */}
                    <div className="bg-gray-750 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Manager Span of Control</h3>
                      <div className="space-y-3">
                        {[
                          { manager: 'Sarah Tech', department: 'Engineering', reports: 4, employees: 45 },
                          { manager: 'David Sales', department: 'Sales & Marketing', reports: 2, employees: 28 },
                          { manager: 'Rachel Ops', department: 'Operations', reports: 3, employees: 22 },
                          { manager: 'John CEO', department: 'Executive', reports: 2, employees: 3 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div>
                              <div className="text-white font-medium">{item.manager}</div>
                              <div className="text-gray-400 text-sm">{item.department}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">{item.reports} direct reports</div>
                              <div className="text-gray-400 text-sm">{item.employees} total employees</div>
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
            {/* Selected Department Details */}
            {selectedDepartment && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Department Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{selectedDepartment.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Code</label>
                    <p className="text-white">{selectedDepartment.code}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Manager</label>
                    <p className="text-white">{selectedDepartment.manager}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Employees</label>
                    <p className="text-white">{selectedDepartment.employeeCount}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Budget</label>
                    <p className="text-white">${(selectedDepartment.budget / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Location</label>
                    <p className="text-white">{selectedDepartment.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Description</label>
                    <p className="text-white text-sm">{selectedDepartment.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowMoveModal(true)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Move
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Department
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Bulk Import
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export Org Chart
                </button>
              </div>
            </div>

            {/* Recent Changes */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Changes</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">DevOps team created</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Marketing budget updated</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">HR manager changed</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Department</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter department code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Parent Department</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select parent department</option>
                  <option value="1">Executive</option>
                  <option value="2">Engineering</option>
                  <option value="3">Sales & Marketing</option>
                  <option value="10">Operations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Manager</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter manager name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter department description"
                />
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
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Edit Department</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department Name</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.name}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department Code</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.code}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Manager</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.manager}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Budget</label>
                <input
                  type="number"
                  defaultValue={selectedDepartment.budget}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={selectedDepartment.location}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue={selectedDepartment.description}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentHierarchy;
