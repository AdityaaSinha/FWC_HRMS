import React, { useState, useEffect, useCallback } from 'react';
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
  Activity,
  Play,
  Pause,
  Settings,
  FileText,
  FileSpreadsheet,
  FileJson
} from 'lucide-react';
import aiService from '../../services/aiService';

const ManagerPerformanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  
  // Dynamic update states
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [nextRefresh, setNextRefresh] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [totalAnalyzedItems, setTotalAnalyzedItems] = useState(0);
  
  // Export states
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [showExportDropdown, setShowExportDropdown] = useState(false);

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
    // Remove aiInsights from mock data since we'll fetch it from AI
  });

  // Fetch AI insights for performance analytics
  const fetchAiInsights = async () => {
    setAiLoading(true);
    setAiError(null);
    
    try {
      // Get insights for a sample employee (in real app, this would be dynamic)
      const response = await aiService.getPerformanceInsights('123');
      
      if (response && response.aiInsights) {
        // Parse the AI response and format it for display
        const insights = [];
        
        // Add employee context information
        if (response.employeeData) {
          insights.push({
            type: 'info',
            title: `Performance Analysis for ${response.employeeData.name}`,
            insight: `Department: ${response.employeeData.department || 'N/A'} | Role: ${response.employeeData.role || 'N/A'} | Performance Score: ${response.employeeData.performanceScore || 'N/A'}`,
            confidence: 100
          });
        }
        
        // Add performance forecast
        if (response.aiInsights.performanceForecast) {
          insights.push({
            type: 'prediction',
            title: 'Performance Forecast',
            insight: response.aiInsights.performanceForecast,
            confidence: response.aiInsights.confidence || 85
          });
        }
        
        // Add recommendations
        if (response.aiInsights.recommendations && response.aiInsights.recommendations.length > 0) {
          response.aiInsights.recommendations.forEach((rec, index) => {
            insights.push({
              type: 'recommendation',
              title: `Recommendation ${index + 1}`,
              insight: rec,
              confidence: response.aiInsights.confidence || 80
            });
          });
        }
        
        // Add risk alerts
        if (response.aiInsights.riskFactors && response.aiInsights.riskFactors.length > 0) {
          response.aiInsights.riskFactors.forEach((risk, index) => {
            insights.push({
              type: 'risk',
              title: `Risk Alert ${index + 1}`,
              insight: risk,
              confidence: response.aiInsights.confidence || 90
            });
          });
        }
        
        // Add generation timestamp
        if (response.generatedAt) {
          insights.push({
            type: 'info',
            title: 'Analysis Generated',
            insight: `Last updated: ${new Date(response.generatedAt).toLocaleString()}`,
            confidence: 100
          });
        }
        
        setAiInsights(insights);
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      setAiError('Failed to load AI insights. Please try again.');
      // Fallback to some default insights
      setAiInsights([
        {
          type: 'info',
          title: 'AI Insights Unavailable',
          insight: 'Unable to generate AI insights at this time. Please check your connection and try again.',
          confidence: 0
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Load AI insights on component mount
  useEffect(() => {
    fetchAiInsights();
    // Initialize total analyzed items
    setTotalAnalyzedItems(1247); // Starting value
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && refreshInterval > 0) {
      interval = setInterval(() => {
        handleRefreshData();
      }, refreshInterval * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  // Countdown timer for next refresh
  useEffect(() => {
    let countdown;
    if (autoRefresh && refreshInterval > 0) {
      let timeLeft = refreshInterval;
      countdown = setInterval(() => {
        timeLeft -= 1;
        setNextRefresh(timeLeft);
        if (timeLeft <= 0) {
          timeLeft = refreshInterval;
        }
      }, 1000);
    } else {
      setNextRefresh(null);
    }
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [autoRefresh, refreshInterval, lastUpdated]);

  // Enhanced refresh function with timestamp update
  const handleRefreshData = useCallback(() => {
    setIsLoading(true);
    setLastUpdated(new Date());
    
    // Simulate data refresh with random variations
    const randomVariation = () => Math.random() * 4 - 2; // -2 to +2
    
    // Update total analyzed items
    setTotalAnalyzedItems(prev => prev + Math.floor(Math.random() * 5) + 1);
    
    // Refresh AI insights
    fetchAiInsights();
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Enhanced export functionality
  const handleExportReport = async (format = exportFormat) => {
    setExportLoading(true);
    setShowExportDropdown(false);
    
    try {
      const reportData = {
        title: 'Performance Analytics Report',
        period: selectedPeriod,
        department: selectedDepartment,
        generatedAt: new Date().toISOString(),
        lastUpdated: lastUpdated.toISOString(),
        totalAnalyzedItems,
        kpis: analyticsData.kpis,
        departments: analyticsData.departmentPerformance,
        trends: analyticsData.monthlyTrends,
        topPerformers: analyticsData.topPerformers,
        riskAlerts: analyticsData.riskAlerts,
        aiInsights: aiInsights.map(insight => ({
          type: insight.type,
          title: insight.title,
          insight: insight.insight,
          confidence: insight.confidence
        }))
      };

      let blob, filename, mimeType;

      switch (format) {
        case 'json':
          blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
          filename = `performance-analytics-${selectedPeriod}-${Date.now()}.json`;
          mimeType = 'application/json';
          break;
        
        case 'csv':
          // Convert to CSV format
          const csvData = [
            ['Metric', 'Value', 'Trend'],
            ['Overall Performance', `${analyticsData.kpis.overallPerformance}%`, `${analyticsData.kpis.performanceTrend}%`],
            ['Team Productivity', `${analyticsData.kpis.teamProductivity}%`, `${analyticsData.kpis.productivityTrend}%`],
            ['Goal Completion', `${analyticsData.kpis.goalCompletion}%`, `${analyticsData.kpis.goalTrend}%`],
            ['Employee Satisfaction', `${analyticsData.kpis.employeeSatisfaction}/5`, `${analyticsData.kpis.satisfactionTrend}`],
            [],
            ['Department', 'Performance', 'Employees', 'Goals Completed', 'Total Goals'],
            ...analyticsData.departmentPerformance.map(dept => [
              dept.name, `${dept.performance}%`, dept.employees, dept.completedGoals, dept.totalGoals
            ])
          ].map(row => row.join(',')).join('\n');
          
          blob = new Blob([csvData], { type: 'text/csv' });
          filename = `performance-analytics-${selectedPeriod}-${Date.now()}.csv`;
          mimeType = 'text/csv';
          break;
        
        case 'pdf':
          // For PDF, we'll create a formatted text version
          const pdfContent = `
PERFORMANCE ANALYTICS REPORT
Generated: ${new Date().toLocaleString()}
Period: ${selectedPeriod}
Department: ${selectedDepartment}
Last Updated: ${lastUpdated.toLocaleString()}
Total Analyzed Items: ${totalAnalyzedItems}

KEY PERFORMANCE INDICATORS
Overall Performance: ${analyticsData.kpis.overallPerformance}% (${analyticsData.kpis.performanceTrend > 0 ? '+' : ''}${analyticsData.kpis.performanceTrend}%)
Team Productivity: ${analyticsData.kpis.teamProductivity}% (${analyticsData.kpis.productivityTrend > 0 ? '+' : ''}${analyticsData.kpis.productivityTrend}%)
Goal Completion: ${analyticsData.kpis.goalCompletion}% (${analyticsData.kpis.goalTrend > 0 ? '+' : ''}${analyticsData.kpis.goalTrend}%)
Employee Satisfaction: ${analyticsData.kpis.employeeSatisfaction}/5 (${analyticsData.kpis.satisfactionTrend > 0 ? '+' : ''}${analyticsData.kpis.satisfactionTrend})

DEPARTMENT PERFORMANCE
${analyticsData.departmentPerformance.map(dept => 
  `${dept.name}: ${dept.performance}% (${dept.employees} employees, ${dept.completedGoals}/${dept.totalGoals} goals)`
).join('\n')}

TOP PERFORMERS
${analyticsData.topPerformers.map((performer, index) => 
  `${index + 1}. ${performer.name} (${performer.department}): ${performer.score}% (${performer.improvement > 0 ? '+' : ''}${performer.improvement}%)`
).join('\n')}

AI INSIGHTS
${aiInsights.map(insight => 
  `${insight.title}: ${insight.insight} (Confidence: ${insight.confidence}%)`
).join('\n')}
          `;
          
          blob = new Blob([pdfContent], { type: 'text/plain' });
          filename = `performance-analytics-${selectedPeriod}-${Date.now()}.txt`;
          mimeType = 'text/plain';
          break;
        
        default:
          throw new Error('Unsupported export format');
      }

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Show success message
      console.log(`Report exported successfully as ${format.toUpperCase()}`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportLoading(false);
    }
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      setLastUpdated(new Date());
    }
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-[#11131A] text-gray-200 p-6">
      {/* Header with Dynamic Controls */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <p>Comprehensive team performance insights and metrics</p>
              {liveUpdates && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Updates</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Dynamic Control Panel */}
          <div className="flex items-center gap-3">
            {/* Auto-refresh controls */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1E2132] border border-gray-700 rounded-lg">
              <button
                onClick={toggleAutoRefresh}
                className={`flex items-center gap-1 text-sm ${
                  autoRefresh ? 'text-green-400' : 'text-gray-400'
                }`}
              >
                {autoRefresh ? <Pause size={14} /> : <Play size={14} />}
                Auto-refresh
              </button>
              {autoRefresh && nextRefresh !== null && (
                <span className="text-xs text-gray-500">
                  {nextRefresh}s
                </span>
              )}
            </div>

            {/* Refresh interval selector */}
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="bg-[#1E2132] border border-gray-700 rounded-lg px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
              disabled={!autoRefresh}
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
              <option value={300}>5m</option>
            </select>

            {/* Manual refresh button */}
            <button
              onClick={handleRefreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E2132] hover:bg-[#252842] border border-gray-700 rounded-lg text-gray-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>

            {/* Enhanced Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                disabled={exportLoading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                Export
                {exportLoading && <RefreshCw size={14} className="animate-spin" />}
              </button>
              
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E2132] border border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      onClick={() => handleExportReport('json')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <FileJson size={16} />
                      Export as JSON
                    </button>
                    <button
                      onClick={() => handleExportReport('csv')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <FileSpreadsheet size={16} />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportReport('pdf')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <FileText size={16} />
                      Export as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-6 p-3 bg-[#1E2132] border border-gray-700 rounded-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300">
                Last Updated: {formatTime(lastUpdated)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-green-400" />
              <span className="text-sm text-gray-300">
                Analyzed Items: {totalAnalyzedItems.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-400" />
              <span className="text-sm text-gray-300">
                Status: {isLoading ? 'Updating...' : 'Ready'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">
              {autoRefresh ? `Auto-refresh: ${refreshInterval}s` : 'Manual refresh'}
            </span>
          </div>
        </div>

        {/* Filters with Department Selection */}
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
          
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-[#1E2132] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="analytics">Analytics</option>
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="text-purple-400" size={20} />
              <h2 className="text-lg font-semibold text-white">AI Insights</h2>
            </div>
            {aiLoading && (
              <div className="flex items-center gap-2 text-purple-400">
                <RefreshCw className="animate-spin" size={16} />
                <span className="text-sm">Generating insights...</span>
              </div>
            )}
          </div>
          
          {aiError && (
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-600/30 mb-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={16} />
                <span className="text-sm">{aiError}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-lg border border-purple-600/30">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{insight.title}</h3>
                    {insight.confidence > 0 && (
                      <div className="flex items-center gap-1">
                        <Zap size={14} className="text-purple-400" />
                        <span className="text-xs text-purple-400">{insight.confidence}%</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">{insight.insight}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      insight.type === 'prediction' ? 'bg-blue-600/20 text-blue-400' :
                      insight.type === 'recommendation' ? 'bg-green-600/20 text-green-400' :
                      insight.type === 'risk' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {insight.type}
                    </span>
                  </div>
                </div>
              ))
            ) : !aiLoading && (
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30 text-center">
                <Brain className="mx-auto text-gray-500 mb-2" size={24} />
                <p className="text-gray-400 text-sm">No AI insights available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPerformanceAnalytics;