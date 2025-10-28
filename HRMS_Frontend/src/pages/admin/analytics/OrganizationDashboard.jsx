import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Building2,
  UserCheck,
  UserX,
  Clock,
  DollarSign,
  Award,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const OrganizationDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for demonstration
  const organizationStats = {
    totalEmployees: 1247,
    activeEmployees: 1198,
    newHires: 23,
    departures: 8,
    departments: 12,
    avgSalary: 75000,
    satisfactionScore: 4.2,
    retentionRate: 94.2
  };

  const departmentData = [
    { name: 'Engineering', employees: 342, budget: 2850000, performance: 92, growth: 8.5 },
    { name: 'Sales', employees: 156, budget: 1200000, performance: 88, growth: 12.3 },
    { name: 'Marketing', employees: 89, budget: 890000, performance: 85, growth: 5.2 },
    { name: 'HR', employees: 45, budget: 450000, performance: 91, growth: 2.1 },
    { name: 'Finance', employees: 67, budget: 670000, performance: 89, growth: 3.8 },
    { name: 'Operations', employees: 234, budget: 1800000, performance: 87, growth: 6.7 },
    { name: 'Legal', employees: 23, budget: 380000, performance: 93, growth: 1.2 },
    { name: 'IT Support', employees: 78, budget: 620000, performance: 90, growth: 4.5 }
  ];

  const performanceMetrics = [
    { month: 'Jan', productivity: 85, satisfaction: 4.1, retention: 94 },
    { month: 'Feb', productivity: 87, satisfaction: 4.2, retention: 93 },
    { month: 'Mar', productivity: 89, satisfaction: 4.3, retention: 95 },
    { month: 'Apr', productivity: 91, satisfaction: 4.2, retention: 94 },
    { month: 'May', productivity: 88, satisfaction: 4.1, retention: 92 },
    { month: 'Jun', productivity: 92, satisfaction: 4.4, retention: 96 }
  ];

  const hiringTrends = [
    { month: 'Jan', hires: 15, departures: 8 },
    { month: 'Feb', hires: 22, departures: 12 },
    { month: 'Mar', hires: 18, departures: 6 },
    { month: 'Apr', hires: 25, departures: 9 },
    { month: 'May', hires: 19, departures: 11 },
    { month: 'Jun', hires: 23, departures: 8 }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', department: 'Engineering', score: 98, projects: 12 },
    { name: 'Michael Chen', department: 'Sales', score: 96, projects: 8 },
    { name: 'Emily Davis', department: 'Marketing', score: 94, projects: 15 },
    { name: 'David Wilson', department: 'Finance', score: 93, projects: 10 },
    { name: 'Lisa Anderson', department: 'Operations', score: 92, projects: 11 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, color = 'indigo' }) => {
    const colorClasses = {
      indigo: 'text-indigo-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      red: 'text-red-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400'
    };

    return (
      <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${
                trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 mr-1" />
                ) : null}
                {change}
              </div>
            )}
          </div>
          <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        </div>
      </div>
    );
  };

  const DepartmentCard = ({ department }) => (
    <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-white">{department.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          department.performance >= 90 
            ? 'bg-green-900 text-green-300'
            : department.performance >= 85
            ? 'bg-yellow-900 text-yellow-300'
            : 'bg-red-900 text-red-300'
        }`}>
          {department.performance}% Performance
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Employees</span>
          <span className="text-white">{department.employees}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Budget</span>
          <span className="text-white">${(department.budget / 1000000).toFixed(1)}M</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Growth</span>
          <span className={`${department.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {department.growth > 0 ? '+' : ''}{department.growth}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Organization Dashboard</h1>
          <p className="text-gray-400">Comprehensive analytics and insights for organizational performance</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#272B3F] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={organizationStats.totalEmployees.toLocaleString()}
          change="+2.3% from last month"
          trend="up"
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Active Employees"
          value={organizationStats.activeEmployees.toLocaleString()}
          change="+1.8% from last month"
          trend="up"
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="New Hires"
          value={organizationStats.newHires}
          change="+15.2% from last month"
          trend="up"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Retention Rate"
          value={`${organizationStats.retentionRate}%`}
          change="+0.5% from last month"
          trend="up"
          icon={Award}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trends */}
        <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />
              Performance Trends
            </h3>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-[#1E2132] border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-700 rounded-t relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-indigo-600 rounded-t absolute bottom-0 w-full transition-all duration-500"
                    style={{ height: `${(metric.productivity / 100) * 200}px` }}
                  ></div>
                  <div 
                    className="bg-green-500 rounded-t absolute bottom-0 w-1/3 right-0 transition-all duration-500"
                    style={{ height: `${(metric.satisfaction / 5) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 mt-2">{metric.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-600 rounded mr-2"></div>
              <span className="text-sm text-gray-400">Productivity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-400">Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Hiring Trends */}
        <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-400" />
            Hiring vs Departures
          </h3>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {hiringTrends.map((trend, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-green-600 rounded-t absolute bottom-0 w-2/5 left-0 transition-all duration-500"
                    style={{ height: `${(trend.hires / 30) * 200}px` }}
                  ></div>
                  <div 
                    className="bg-red-500 rounded-t absolute bottom-0 w-2/5 right-0 transition-all duration-500"
                    style={{ height: `${(trend.departures / 30) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 mt-2">{trend.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
              <span className="text-sm text-gray-400">New Hires</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-sm text-gray-400">Departures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-indigo-400" />
            Department Overview
          </h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filter Departments
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentData.map((department, index) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-indigo-400" />
            Top Performers
          </h3>
          
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{performer.name}</p>
                    <p className="text-sm text-gray-400">{performer.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-400">{performer.score}%</p>
                  <p className="text-xs text-gray-400">{performer.projects} projects</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-400" />
            Key Insights
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-400">Positive Trend</span>
              </div>
              <p className="text-sm text-gray-300">Employee satisfaction has increased by 8% this quarter, with Engineering leading the improvement.</p>
            </div>
            
            <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-yellow-400">Attention Needed</span>
              </div>
              <p className="text-sm text-gray-300">Marketing department shows slower growth compared to other departments. Consider resource reallocation.</p>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-400">Cost Optimization</span>
              </div>
              <p className="text-sm text-gray-300">Current hiring rate is 15% above budget. Consider optimizing recruitment processes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
