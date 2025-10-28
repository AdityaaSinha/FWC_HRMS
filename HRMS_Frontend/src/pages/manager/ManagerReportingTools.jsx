import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FileText, Download, Filter, Calendar, TrendingUp, 
  DollarSign, Users, Briefcase, Eye, RefreshCw 
} from 'lucide-react';

const ManagerReportingTools = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock data for financial reports
  const financialData = [
    { month: 'Jan', revenue: 85000, expenses: 62000, profit: 23000 },
    { month: 'Feb', revenue: 92000, expenses: 68000, profit: 24000 },
    { month: 'Mar', revenue: 88000, expenses: 65000, profit: 23000 },
    { month: 'Apr', revenue: 95000, expenses: 70000, profit: 25000 },
    { month: 'May', revenue: 102000, expenses: 75000, profit: 27000 },
    { month: 'Jun', revenue: 98000, expenses: 72000, profit: 26000 }
  ];

  const budgetData = [
    { category: 'Salaries', allocated: 450000, spent: 425000 },
    { category: 'Operations', allocated: 120000, spent: 115000 },
    { category: 'Marketing', allocated: 80000, spent: 75000 },
    { category: 'Technology', allocated: 100000, spent: 95000 },
    { category: 'Training', allocated: 50000, spent: 45000 }
  ];

  // Mock data for employee reports
  const performanceData = [
    { department: 'Engineering', avgScore: 4.2, employees: 25 },
    { department: 'Sales', avgScore: 4.0, employees: 18 },
    { department: 'Marketing', avgScore: 4.3, employees: 12 },
    { department: 'HR', avgScore: 4.1, employees: 8 },
    { department: 'Finance', avgScore: 4.4, employees: 10 }
  ];

  const attendanceData = [
    { month: 'Jan', present: 95, absent: 5, late: 8 },
    { month: 'Feb', present: 93, absent: 7, late: 12 },
    { month: 'Mar', present: 96, absent: 4, late: 6 },
    { month: 'Apr', present: 94, absent: 6, late: 10 },
    { month: 'May', present: 97, absent: 3, late: 5 },
    { month: 'Jun', present: 95, absent: 5, late: 9 }
  ];

  // Mock data for project reports
  const projectStatusData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#3B82F6' },
    { name: 'On Hold', value: 15, color: '#F59E0B' },
    { name: 'Cancelled', value: 10, color: '#EF4444' }
  ];

  const projectTimelineData = [
    { project: 'Website Redesign', planned: 30, actual: 28, status: 'Completed' },
    { project: 'Mobile App', planned: 45, actual: 50, status: 'In Progress' },
    { project: 'CRM Integration', planned: 25, actual: 22, status: 'Completed' },
    { project: 'Data Migration', planned: 35, actual: 40, status: 'In Progress' },
    { project: 'Security Audit', planned: 20, actual: 18, status: 'Completed' }
  ];

  const reportTemplates = {
    financial: [
      { id: 1, name: 'Monthly P&L Statement', description: 'Profit and Loss overview', lastGenerated: '2024-01-15' },
      { id: 2, name: 'Budget vs Actual Report', description: 'Budget performance analysis', lastGenerated: '2024-01-14' },
      { id: 3, name: 'Cash Flow Statement', description: 'Cash flow analysis', lastGenerated: '2024-01-13' },
      { id: 4, name: 'Cost Center Analysis', description: 'Department-wise cost breakdown', lastGenerated: '2024-01-12' }
    ],
    employee: [
      { id: 5, name: 'Performance Review Summary', description: 'Employee performance metrics', lastGenerated: '2024-01-15' },
      { id: 6, name: 'Attendance Report', description: 'Employee attendance analysis', lastGenerated: '2024-01-14' },
      { id: 7, name: 'Training Completion Report', description: 'Training program progress', lastGenerated: '2024-01-13' },
      { id: 8, name: 'Turnover Analysis', description: 'Employee retention metrics', lastGenerated: '2024-01-12' }
    ],
    project: [
      { id: 9, name: 'Project Status Dashboard', description: 'Overall project health', lastGenerated: '2024-01-15' },
      { id: 10, name: 'Resource Utilization Report', description: 'Team resource allocation', lastGenerated: '2024-01-14' },
      { id: 11, name: 'Timeline Performance', description: 'Project delivery analysis', lastGenerated: '2024-01-13' },
      { id: 12, name: 'Budget Tracking Report', description: 'Project budget vs actual', lastGenerated: '2024-01-12' }
    ]
  };

  const handleGenerateReport = (reportId) => {
    setSelectedReport(reportId);
    // Simulate report generation
    setTimeout(() => {
      setSelectedReport(null);
      alert('Report generated successfully!');
    }, 2000);
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ReportCard = ({ report, onGenerate, isGenerating }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{report.name}</h3>
          <p className="text-gray-400 mb-4">{report.description}</p>
          <p className="text-sm text-gray-500">Last generated: {report.lastGenerated}</p>
        </div>
        <FileText className="h-8 w-8 text-blue-400" />
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onGenerate(report.id)}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Eye className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
          <Download className="h-4 w-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reporting Tools</h1>
          <p className="text-gray-400">Generate and analyze comprehensive business reports</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-1">
              {[
                { id: 'financial', label: 'Financial Reports', icon: DollarSign },
                { id: 'employee', label: 'Employee Reports', icon: Users },
                { id: 'project', label: 'Project Reports', icon: Briefcase }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Financial Reports Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-8">
            {/* Financial KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="$560K"
                change={8.2}
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatCard
                title="Total Expenses"
                value="$412K"
                change={-2.1}
                icon={DollarSign}
                color="bg-red-500"
              />
              <StatCard
                title="Net Profit"
                value="$148K"
                change={12.5}
                icon={TrendingUp}
                color="bg-blue-500"
              />
              <StatCard
                title="Profit Margin"
                value="26.4%"
                change={3.2}
                icon={TrendingUp}
                color="bg-purple-500"
              />
            </div>

            {/* Financial Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Budget vs Actual</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allocated" fill="#10B981" name="Allocated" />
                    <Bar dataKey="spent" fill="#F59E0B" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Financial Report Templates */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Financial Report Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.financial.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onGenerate={handleGenerateReport}
                    isGenerating={selectedReport === report.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Employee Reports Tab */}
        {activeTab === 'employee' && (
          <div className="space-y-8">
            {/* Employee KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Employees"
                value="73"
                change={5.2}
                icon={Users}
                color="bg-blue-500"
              />
              <StatCard
                title="Avg Performance"
                value="4.2/5"
                change={3.1}
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatCard
                title="Attendance Rate"
                value="95.2%"
                change={1.8}
                icon={Calendar}
                color="bg-purple-500"
              />
              <StatCard
                title="Turnover Rate"
                value="8.5%"
                change={-2.3}
                icon={Users}
                color="bg-orange-500"
              />
            </div>

            {/* Employee Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="#3B82F6" name="Avg Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Attendance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="present" stroke="#10B981" name="Present %" />
                    <Line type="monotone" dataKey="absent" stroke="#EF4444" name="Absent %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Employee Report Templates */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Employee Report Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.employee.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onGenerate={handleGenerateReport}
                    isGenerating={selectedReport === report.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Reports Tab */}
        {activeTab === 'project' && (
          <div className="space-y-8">
            {/* Project KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Active Projects"
                value="12"
                change={8.3}
                icon={Briefcase}
                color="bg-blue-500"
              />
              <StatCard
                title="Completed Projects"
                value="45"
                change={15.2}
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatCard
                 title="On-Time Delivery"
                 value="87%"
                 change={5.1}
                 icon={Calendar}
                 color="bg-purple-500"
               />
               <StatCard
                 title="Budget Utilization"
                 value="92%"
                 change={-3.2}
                 icon={DollarSign}
                 color="bg-orange-500"
               />
            </div>

            {/* Project Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Timeline Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="project" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#3B82F6" name="Planned Days" />
                    <Bar dataKey="actual" fill="#F59E0B" name="Actual Days" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Project Report Templates */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Project Report Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.project.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onGenerate={handleGenerateReport}
                    isGenerating={selectedReport === report.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerReportingTools;