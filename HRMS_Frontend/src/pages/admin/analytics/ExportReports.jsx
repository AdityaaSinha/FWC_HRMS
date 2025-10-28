import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Building,
  DollarSign,
  Clock,
  Eye,
  Settings,
  RefreshCw,
  Search,
  ChevronDown,
  FileSpreadsheet,
  FileImage,
  Mail,
  Share2,
  Archive,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ExportReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('employee');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('month');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for reports
  const reportTypes = [
    {
      id: 'employee',
      name: 'Employee Reports',
      description: 'Comprehensive employee data and analytics',
      icon: Users,
      templates: ['Employee Directory', 'Performance Summary', 'Attendance Report', 'Salary Report']
    },
    {
      id: 'department',
      name: 'Department Reports',
      description: 'Department-wise analytics and insights',
      icon: Building,
      templates: ['Department Overview', 'Budget Analysis', 'Team Performance', 'Resource Allocation']
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      description: 'Financial analytics and cost analysis',
      icon: DollarSign,
      templates: ['Payroll Summary', 'Cost Analysis', 'Budget vs Actual', 'Expense Reports']
    },
    {
      id: 'compliance',
      name: 'Compliance Reports',
      description: 'Regulatory and compliance tracking',
      icon: FileText,
      templates: ['Audit Trail', 'Policy Compliance', 'Training Records', 'Certification Status']
    }
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: FileText, description: 'Formatted document for printing' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: FileSpreadsheet, description: 'Data analysis and manipulation' },
    { id: 'csv', name: 'CSV File', icon: Archive, description: 'Raw data for external systems' },
    { id: 'image', name: 'Image (PNG)', icon: FileImage, description: 'Charts and visualizations' }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Employee Report',
      type: 'Employee Reports',
      format: 'PDF',
      generatedAt: '2024-01-15 14:30',
      status: 'completed',
      size: '2.4 MB',
      downloads: 12
    },
    {
      id: 2,
      name: 'Q4 Department Analysis',
      type: 'Department Reports',
      format: 'Excel',
      generatedAt: '2024-01-14 09:15',
      status: 'completed',
      size: '1.8 MB',
      downloads: 8
    },
    {
      id: 3,
      name: 'Payroll Summary December',
      type: 'Financial Reports',
      format: 'PDF',
      generatedAt: '2024-01-13 16:45',
      status: 'processing',
      size: '3.1 MB',
      downloads: 0
    },
    {
      id: 4,
      name: 'Compliance Audit Report',
      type: 'Compliance Reports',
      format: 'PDF',
      generatedAt: '2024-01-12 11:20',
      status: 'failed',
      size: '0 MB',
      downloads: 0
    }
  ];

  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Legal', 'IT Support'];

  const StatCard = ({ title, value, icon: Icon, color = 'indigo' }) => {
    const colorClasses = {
      indigo: 'text-indigo-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      red: 'text-red-400',
      blue: 'text-blue-400'
    };

    return (
      <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        </div>
      </div>
    );
  };

  const ReportTypeCard = ({ reportType, isSelected, onSelect }) => {
    const Icon = reportType.icon;
    
    return (
      <div
        onClick={() => onSelect(reportType.id)}
        className={`p-4 rounded-lg border cursor-pointer transition-all ${
          isSelected
            ? 'border-indigo-500 bg-indigo-900/20'
            : 'border-gray-700 bg-[#272B3F] hover:border-gray-600'
        }`}
      >
        <div className="flex items-center mb-3">
          <Icon className={`w-6 h-6 mr-3 ${isSelected ? 'text-indigo-400' : 'text-gray-400'}`} />
          <h3 className="font-semibold text-white">{reportType.name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-3">{reportType.description}</p>
        <div className="flex flex-wrap gap-1">
          {reportType.templates.slice(0, 2).map((template, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              {template}
            </span>
          ))}
          {reportType.templates.length > 2 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
              +{reportType.templates.length - 2} more
            </span>
          )}
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: { color: 'bg-green-900 text-green-300 border-green-700', icon: CheckCircle },
      processing: { color: 'bg-yellow-900 text-yellow-300 border-yellow-700', icon: Clock },
      failed: { color: 'bg-red-900 text-red-300 border-red-700', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.completed;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Add to recent reports or show success message
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Export Reports</h1>
          <p className="text-gray-400">Generate and export comprehensive reports and analytics</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Templates
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Reports"
          value="247"
          icon={FileText}
          color="indigo"
        />
        <StatCard
          title="This Month"
          value="23"
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Processing"
          value="3"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Downloads"
          value="1,234"
          icon={Download}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />
              Select Report Type
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map(reportType => (
                <ReportTypeCard
                  key={reportType.id}
                  reportType={reportType}
                  isSelected={selectedReportType === reportType.id}
                  onSelect={setSelectedReportType}
                />
              ))}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-indigo-400" />
              Report Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Export Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  {exportFormats.map(format => (
                    <option key={format.id} value={format.id}>{format.name}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Departments (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments([...selectedDepartments, dept]);
                          } else {
                            setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                          }
                        }}
                        className="rounded border-gray-600 bg-[#1E2132] text-indigo-600 focus:ring-indigo-500 mr-2"
                      />
                      <span className="text-sm text-gray-300">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports Sidebar */}
        <div className="space-y-6">
          {/* Export Formats Info */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-400" />
              Export Formats
            </h3>
            
            <div className="space-y-3">
              {exportFormats.map(format => {
                const Icon = format.icon;
                return (
                  <div key={format.id} className="flex items-start p-3 bg-[#1E2132] rounded-lg">
                    <Icon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-white text-sm">{format.name}</p>
                      <p className="text-xs text-gray-400">{format.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Archive className="w-5 h-5 mr-2 text-indigo-400" />
                Recent Reports
              </h3>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentReports.map(report => (
                <div key={report.id} className="p-3 bg-[#1E2132] rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white text-sm">{report.name}</h4>
                    <StatusBadge status={report.status} />
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-400">
                    <p>{report.type} • {report.format}</p>
                    <p>Generated: {report.generatedAt}</p>
                    <p>Size: {report.size} • Downloads: {report.downloads}</p>
                  </div>
                  
                  {report.status === 'completed' && (
                    <div className="flex space-x-2 mt-2">
                      <button className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 text-xs flex items-center">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-[#272B3F] rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
          Report Analytics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">156</div>
            <div className="text-sm text-gray-400">Reports Generated This Month</div>
            <div className="text-xs text-green-400 mt-1">+23% from last month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">2.4GB</div>
            <div className="text-sm text-gray-400">Total Data Exported</div>
            <div className="text-xs text-blue-400 mt-1">Across all formats</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">89%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
            <div className="text-xs text-green-400 mt-1">Last 30 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;
