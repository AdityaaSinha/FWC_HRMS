import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, TrendingUp, TrendingDown, AlertTriangle, Target, 
  Users, DollarSign, Calendar, BarChart3, PieChart, 
  Lightbulb, Zap, Clock, CheckCircle, XCircle, 
  ArrowUp, ArrowDown, RefreshCw, Download, Settings,
  Eye, Filter, Search, Star, Info, Play, Activity,
  FileText, FileSpreadsheet, FileImage, ChevronDown
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManagerPredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  
  // Dynamic state variables
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [nextRefresh, setNextRefresh] = useState(30);
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [totalPredictions, setTotalPredictions] = useState(0);
  
  // Export functionality
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Mock data for predictive analytics
  const performanceTrend = [
    { month: 'Jan', actual: 85, predicted: 87, target: 90 },
    { month: 'Feb', actual: 88, predicted: 89, target: 90 },
    { month: 'Mar', actual: 92, predicted: 91, target: 90 },
    { month: 'Apr', actual: 89, predicted: 93, target: 90 },
    { month: 'May', actual: 94, predicted: 95, target: 90 },
    { month: 'Jun', actual: null, predicted: 96, target: 90 },
    { month: 'Jul', actual: null, predicted: 97, target: 90 },
    { month: 'Aug', actual: null, predicted: 95, target: 90 }
  ];

  const turnoverPrediction = [
    { department: 'Engineering', current: 8, predicted: 12, risk: 'medium' },
    { department: 'Sales', current: 15, predicted: 18, risk: 'high' },
    { department: 'Marketing', current: 6, predicted: 7, risk: 'low' },
    { department: 'HR', current: 4, predicted: 5, risk: 'low' },
    { department: 'Finance', current: 3, predicted: 8, risk: 'medium' }
  ];

  const budgetForecast = [
    { category: 'Salaries', allocated: 2400000, predicted: 2520000, variance: 5 },
    { category: 'Benefits', allocated: 480000, predicted: 504000, variance: 5 },
    { category: 'Training', allocated: 120000, predicted: 108000, variance: -10 },
    { category: 'Equipment', allocated: 200000, predicted: 230000, variance: 15 },
    { category: 'Operations', allocated: 300000, predicted: 285000, variance: -5 }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'opportunity',
      priority: 'high',
      title: 'Talent Retention Opportunity',
      description: 'AI analysis suggests implementing flexible work arrangements could reduce turnover by 23% in the Engineering department.',
      confidence: 87,
      impact: 'High',
      timeframe: '3-6 months',
      recommendation: 'Pilot remote work program for senior engineers',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'risk',
      priority: 'high',
      title: 'Budget Overrun Risk',
      description: 'Current spending patterns indicate a 78% probability of exceeding Q2 budget by 12-15%.',
      confidence: 92,
      impact: 'High',
      timeframe: '1-2 months',
      recommendation: 'Implement cost controls on discretionary spending',
      icon: DollarSign,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'trend',
      priority: 'medium',
      title: 'Performance Improvement Trend',
      description: 'Team productivity metrics show consistent upward trend, suggesting 15% improvement by Q3.',
      confidence: 74,
      impact: 'Medium',
      timeframe: '2-3 months',
      recommendation: 'Maintain current training initiatives',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'opportunity',
      priority: 'medium',
      title: 'Skill Gap Analysis',
      description: 'Predictive modeling identifies emerging skill gaps in data analytics across multiple departments.',
      confidence: 81,
      impact: 'Medium',
      timeframe: '6-12 months',
      recommendation: 'Develop comprehensive data literacy program',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const kpiPredictions = [
    {
      name: 'Employee Satisfaction',
      current: 4.2,
      predicted: 4.5,
      target: 4.3,
      trend: 'up',
      confidence: 85,
      unit: '/5'
    },
    {
      name: 'Productivity Index',
      current: 87,
      predicted: 92,
      target: 90,
      trend: 'up',
      confidence: 78,
      unit: '%'
    },
    {
      name: 'Turnover Rate',
      current: 8.5,
      predicted: 6.2,
      target: 7.0,
      trend: 'down',
      confidence: 82,
      unit: '%'
    },
    {
      name: 'Training ROI',
      current: 3.2,
      predicted: 3.8,
      target: 3.5,
      trend: 'up',
      confidence: 71,
      unit: 'x'
    }
  ];

  const riskFactors = [
    { factor: 'Market Volatility', probability: 65, impact: 'High', mitigation: 'Diversify revenue streams' },
    { factor: 'Skill Shortage', probability: 78, impact: 'Medium', mitigation: 'Accelerate training programs' },
    { factor: 'Regulatory Changes', probability: 45, impact: 'Medium', mitigation: 'Monitor compliance updates' },
    { factor: 'Technology Disruption', probability: 82, impact: 'High', mitigation: 'Invest in digital transformation' }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && refreshInterval > 0) {
      interval = setInterval(() => {
        setNextRefresh(prev => {
          if (prev <= 1) {
            handleRefreshData();
            return refreshInterval;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Initialize total predictions on component mount
  useEffect(() => {
    setTotalPredictions(2847);
  }, []);

  // Enhanced refresh function with timestamp and data variation simulation
  const handleRefreshData = useCallback(() => {
    setLastUpdated(new Date());
    setTotalPredictions(prev => prev + Math.floor(Math.random() * 10) - 5);
    
    // Simulate data refresh
    if (liveUpdates) {
      console.log('Refreshing predictive analytics data...');
    }
  }, [liveUpdates]);

  // Export functionality
  const handleExportReport = async (format) => {
    setExportLoading(true);
    setShowExportDropdown(false);
    
    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        timeframe: selectedTimeframe,
        activeTab,
        kpiPredictions,
        performanceTrend,
        turnoverPrediction,
        budgetForecast,
        aiInsights,
        riskFactors,
        totalPredictions,
        lastUpdated: lastUpdated.toISOString()
      };

      let content, filename, mimeType;

      switch (format) {
        case 'json':
          content = JSON.stringify(exportData, null, 2);
          filename = `predictive-analytics-${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'csv':
          // Convert KPI predictions to CSV format
          const csvHeaders = 'Name,Current,Predicted,Target,Trend,Confidence,Unit\n';
          const csvData = kpiPredictions.map(kpi => 
            `"${kpi.name}",${kpi.current},${kpi.predicted},${kpi.target},${kpi.trend},${kpi.confidence},"${kpi.unit}"`
          ).join('\n');
          content = csvHeaders + csvData;
          filename = `predictive-analytics-${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
          break;
        case 'txt':
          content = `Predictive Analytics Report
Generated: ${new Date().toLocaleString()}
Timeframe: ${selectedTimeframe}
Total Predictions: ${totalPredictions}
Last Updated: ${lastUpdated.toLocaleString()}

KPI PREDICTIONS:
${kpiPredictions.map(kpi => 
  `${kpi.name}: Current ${kpi.current}${kpi.unit}, Predicted ${kpi.predicted}${kpi.unit} (${kpi.confidence}% confidence)`
).join('\n')}

AI INSIGHTS:
${aiInsights.map(insight => 
  `${insight.title} (${insight.priority} priority): ${insight.description}`
).join('\n\n')}`;
          filename = `predictive-analytics-${new Date().toISOString().split('T')[0]}.txt`;
          mimeType = 'text/plain';
          break;
        default:
          throw new Error('Unsupported format');
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportLoading(false);
    }
  };

  const generateInsights = () => {
    setIsGeneratingInsights(true);
    setTimeout(() => {
      setIsGeneratingInsights(false);
      handleRefreshData();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Predictive Analytics</h1>
            <p className="text-gray-400">AI-powered workforce predictions and insights</p>
          </div>
          
          {/* Dynamic Controls */}
          <div className="flex items-center space-x-4">
            {/* Total Predictions Counter */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <div className="text-sm text-gray-400">Total Predictions</div>
              <div className="text-xl font-bold text-blue-400">{totalPredictions.toLocaleString()}</div>
            </div>
            
            {/* Last Updated */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <div className="text-sm text-gray-400">Last Updated</div>
              <div className="text-sm font-medium text-green-400">
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
            
            {/* Auto-refresh Toggle */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="autoRefresh" className="text-sm text-gray-300">Auto-refresh</label>
                {autoRefresh && (
                  <span className="text-xs text-blue-400">({nextRefresh}s)</span>
                )}
              </div>
            </div>
            
            {/* Manual Refresh */}
            <button
              onClick={handleRefreshData}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            
            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                disabled={exportLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download size={16} />
                <span>{exportLoading ? 'Exporting...' : 'Export'}</span>
                <ChevronDown size={14} />
              </button>
              
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button
                      onClick={() => handleExportReport('json')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <FileText size={16} />
                      <span>Export as JSON</span>
                    </button>
                    <button
                      onClick={() => handleExportReport('csv')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <FileSpreadsheet size={16} />
                      <span>Export as CSV</span>
                    </button>
                    <button
                      onClick={() => handleExportReport('txt')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <FileImage size={16} />
                      <span>Export as TXT</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the component content would go here */}
        <div className="text-center py-20">
          <Brain size={64} className="mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-2">Predictive Analytics Dashboard</h2>
          <p className="text-gray-400 mb-6">Advanced AI-powered workforce predictions and insights</p>
          
          <button
            onClick={generateInsights}
            disabled={isGeneratingInsights}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            {isGeneratingInsights ? (
              <>
                <Activity size={20} className="animate-spin" />
                <span>Generating Insights...</span>
              </>
            ) : (
              <>
                <Zap size={20} />
                <span>Generate AI Insights</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerPredictiveAnalytics;