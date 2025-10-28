import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

const ManagerPerformanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const [analyticsData] = useState({
    kpis: {
      overallPerformance: 87.5,
      performanceTrend: 5.2,
      teamProductivity: 92.3,
      productivityTrend: -2.1,
      goalCompletion: 78.9,
      goalTrend: 8.7,
      employeeSatisfaction: 4.2,
      satisfactionTrend: 0.3
    },
    departmentPerformance: [
      { name: 'Engineering', performance: 92, trend: 'up', employees: 15, completedGoals: 23, totalGoals: 28 },
      { name: 'Design', performance: 88, trend: 'up', employees: 8, completedGoals: 18, totalGoals: 20 },
      { name: 'Marketing', performance: 85, trend: 'down', employees: 12, completedGoals: 15, totalGoals: 19 },
      { name: 'Analytics', performance: 90, trend: 'up', employees: 6, completedGoals: 12, totalGoals: 14 }
    ],
    performanceDistribution: [
      { range: '90-100%', count: 12, percentage: 29.3 },
      { range: '80-89%', count: 18, percentage: 43.9 },
      { range: '70-79%', count: 8, percentage: 19.5 },
      { range: '60-69%', count: 3, percentage: 7.3 }
    ],
    monthlyTrends: [
      { month: 'Jan', performance: 82, productivity: 85, satisfaction: 3.8 },
      { month: 'Feb', performance: 84, productivity: 87, satisfaction: 3.9 },
      { month: 'Mar', performance: 86, productivity: 89, satisfaction: 4.0 },
      { month: 'Apr', performance: 85, productivity: 88, satisfaction: 4.1 },
      { month: 'May', performance: 87, productivity: 91, satisfaction: 4.2 },
      { month: 'Jun', performance: 88, productivity: 92, satisfaction: 4.2 }
    ],
    topPerformers: [
      { name: 'John Smith', department: 'Engineering', score: 95, improvement: 8 },
      { name: 'Sarah Johnson', department: 'Design', score: 93, improvement: 5 },
      { name: 'Emily Davis', department: 'Marketing', score: 91, improvement: 12 },
      { name: 'Mike Chen', department: 'Analytics', score: 89, improvement: -2 }
    ],
    riskAlerts: [
      { type: 'performance', message: 'Mike Chen performance declined by 5% this month', severity: 'medium' },
      { type: 'goal', message: '3 team members behind on Q2 goals', severity: 'high' },
      { type: 'satisfaction', message: 'Marketing team satisfaction below average', severity: 'medium' }
    ],
    aiInsights: [
      {
        type: 'prediction',
        title: 'Performance Forecast',
        insight: 'Based on current trends, team performance is expected to reach 90% by end of quarter.',
        confidence: 85
      },
      {
        type: 'recommendation',
        title: 'Resource Optimization',
        insight: 'Consider redistributing workload from Engineering to Analytics team for better balance.',
        confidence: 78
      },
      {
        type: 'risk',
        title: 'Burnout Risk',
        insight: '2 team members showing signs of potential burnout based on productivity patterns.',
        confidence: 92
      }
    ]
  });

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleExportReport = () => {
    const reportData = {
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      kpis: analyticsData.kpis,
      departments: analyticsData.departmentPerformance,
      trends: analyticsData.monthlyTrends
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${selectedPeriod}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#11131A] text-gray-200 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
            <p className="text-gray-400">Comprehensive team performance insights and metrics</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E2132] hover:bg-[#252842] border border-gray-700 rounded-lg text-gray-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#1E2132] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-[#1E2132] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="overall">Overall Performance</option>
              <option value="productivity">Productivity</option>
              <option value="goals">Goal Completion</option>
              <option value="satisfaction">Employee Satisfaction</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <BarChart3 size={24} className="text-indigo-400" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.kpis.performanceTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {analyticsData.kpis.performanceTrend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(analyticsData.kpis.performanceTrend)}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsData.kpis.overallPerformance}%</h3>
          <p className="text-gray-400 text-sm">Overall Performance</p>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Zap size={24} className="text-green-400" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.kpis.productivityTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {analyticsData.kpis.productivityTrend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(analyticsData.kpis.productivityTrend)}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsData.kpis.teamProductivity}%</h3>
          <p className="text-gray-400 text-sm">Team Productivity</p>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <Target size={24} className="text-orange-400" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.kpis.goalTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {analyticsData.kpis.goalTrend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(analyticsData.kpis.goalTrend)}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsData.kpis.goalCompletion}%</h3>
          <p className="text-gray-400 text-sm">Goal Completion</p>
        </div>

        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Award size={24} className="text-purple-400" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.kpis.satisfactionTrend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {analyticsData.kpis.satisfactionTrend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(analyticsData.kpis.satisfactionTrend)}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{analyticsData.kpis.employeeSatisfaction}/5</h3>
          <p className="text-gray-400 text-sm">Employee Satisfaction</p>
        </div>
      </div>

      {/* Risk Alerts */}
      {analyticsData.riskAlerts.length > 0 && (
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-orange-400" size={20} />
            <h2 className="text-lg font-semibold text-white">Risk Alerts</h2>
          </div>
          <div className="space-y-3">
            {analyticsData.riskAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'high'
                    ? 'bg-red-900/20 border-red-400'
                    : 'bg-yellow-900/20 border-yellow-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">{alert.message}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.severity === 'high'
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Department Performance</h2>
          <div className="space-y-4">
            {analyticsData.departmentPerformance.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{dept.name}</span>
                    <span className="text-sm text-gray-400">{dept.employees} employees</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-white">{dept.performance}%</span>
                      {dept.trend === 'up' ? (
                        <TrendingUp size={14} className="text-green-400" />
                      ) : (
                        <TrendingDown size={14} className="text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {dept.completedGoals}/{dept.totalGoals} goals
                    </div>
                  </div>
                  <div className="w-20">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          dept.performance >= 90 ? 'bg-green-500' :
                          dept.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${dept.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Performance Distribution</h2>
          <div className="space-y-4">
            {analyticsData.performanceDistribution.map((range, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-sm text-gray-400">{range.range}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="h-3 bg-indigo-500 rounded-full"
                        style={{ width: `${range.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{range.count}</div>
                  <div className="text-xs text-gray-400">{range.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Performance Trends</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {analyticsData.monthlyTrends.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1">
                <div
                  className="bg-blue-500 rounded-t"
                  style={{ height: `${(month.performance / 100) * 150}px` }}
                  title={`Performance: ${month.performance}%`}
                ></div>
                <div
                  className="bg-green-500"
                  style={{ height: `${(month.productivity / 100) * 150}px` }}
                  title={`Productivity: ${month.productivity}%`}
                ></div>
                <div
                  className="bg-yellow-500 rounded-b"
                  style={{ height: `${(month.satisfaction / 5) * 150}px` }}
                  title={`Satisfaction: ${month.satisfaction}/5`}
                ></div>
              </div>
              <span className="text-xs text-gray-400">{month.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-400">Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-400">Productivity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-400">Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Performers</h2>
          <div className="space-y-3">
            {analyticsData.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-white">{performer.name}</div>
                    <div className="text-sm text-gray-400">{performer.department}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{performer.score}%</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    performer.improvement > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {performer.improvement > 0 ? (
                      <TrendingUp size={12} />
                    ) : (
                      <TrendingDown size={12} />
                    )}
                    {Math.abs(performer.improvement)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Powered Insights */}
        <div className="bg-[#1E2132] border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-purple-400" size={20} />
            <h2 className="text-lg font-semibold text-white">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {analyticsData.aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-lg border border-purple-600/30">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{insight.title}</h3>
                  <div className="flex items-center gap-1">
                    <Zap size={14} className="text-purple-400" />
                    <span className="text-xs text-purple-400">{insight.confidence}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{insight.insight}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    insight.type === 'prediction' ? 'bg-blue-600/20 text-blue-400' :
                    insight.type === 'recommendation' ? 'bg-green-600/20 text-green-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {insight.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPerformanceAnalytics;