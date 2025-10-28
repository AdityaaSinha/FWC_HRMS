import React, { useState } from 'react';
import { 
  Brain, TrendingUp, TrendingDown, AlertTriangle, Target, 
  Users, DollarSign, Calendar, BarChart3, PieChart, 
  Lightbulb, Zap, Clock, CheckCircle, XCircle, 
  ArrowUp, ArrowDown, RefreshCw, Download, Settings,
  Eye, Filter, Search, Star, Info, Play
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManagerPredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

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

  const generateInsights = () => {
    setIsGeneratingInsights(true);
    setTimeout(() => {
      setIsGeneratingInsights(false);
    }, 3000);
  };

  const KPICard = ({ kpi }) => (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{kpi.name}</h3>
        <div className={`p-2 rounded-full ${kpi.trend === 'up' ? 'bg-green-900' : 'bg-red-900'}`}>
          {kpi.trend === 'up' ? (
            <ArrowUp className="h-4 w-4 text-green-400" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-400" />
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Current</span>
          <span className="text-lg font-bold text-white">{kpi.current}{kpi.unit}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Predicted</span>
          <span className={`text-lg font-bold ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {kpi.predicted}{kpi.unit}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Target</span>
          <span className="text-lg font-bold text-blue-400">{kpi.target}{kpi.unit}</span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Confidence</span>
            <span className="font-medium text-white">{kpi.confidence}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${kpi.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const InsightCard = ({ insight }) => (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-gray-700 ${insight.color}`}>
            <insight.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                insight.priority === 'high' ? 'bg-red-900 text-red-300' :
                insight.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-green-900 text-green-300'
              }`}>
                {insight.priority} priority
              </span>
              <span className="text-sm text-gray-400">{insight.confidence}% confidence</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-300">
          <Star className="h-5 w-5" />
        </button>
      </div>
      
      <p className="text-gray-300 mb-4">{insight.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-400">Impact:</span>
          <span className="ml-2 font-medium text-white">{insight.impact}</span>
        </div>
        <div>
          <span className="text-gray-400">Timeframe:</span>
          <span className="ml-2 font-medium text-white">{insight.timeframe}</span>
        </div>
      </div>
      
      <div className="bg-blue-900 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">Recommendation</span>
        </div>
        <p className="text-sm text-blue-200">{insight.recommendation}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Predictive Analytics</h1>
              <p className="text-gray-400">AI-powered insights and predictions for strategic decision making</p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
              </select>
              <button 
                onClick={generateInsights}
                disabled={isGeneratingInsights}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isGeneratingInsights ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4 mr-2" />
                )}
                {isGeneratingInsights ? 'Generating...' : 'Generate Insights'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'predictions', label: 'Predictions', icon: TrendingUp },
              { id: 'insights', label: 'AI Insights', icon: Brain },
              { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiPredictions.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>

            {/* Performance Trend Chart */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Performance Trend & Predictions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                  <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeWidth={2} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Forecast */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Budget Forecast Analysis</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-white">Category</th>
                      <th className="text-right py-3 px-4 font-semibold text-white">Allocated</th>
                      <th className="text-right py-3 px-4 font-semibold text-white">Predicted</th>
                      <th className="text-right py-3 px-4 font-semibold text-white">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetForecast.map((item, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-white">{item.category}</td>
                        <td className="py-3 px-4 text-right text-white">${item.allocated.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-white">${item.predicted.toLocaleString()}</td>
                        <td className={`py-3 px-4 text-right font-medium ${
                          item.variance > 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {item.variance > 0 ? '+' : ''}{item.variance}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {/* Turnover Prediction */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Employee Turnover Predictions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {turnoverPrediction.map((dept, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <h3 className="font-semibold text-white mb-2">{dept.department}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Current:</span>
                        <span className="font-medium text-white">{dept.current}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Predicted:</span>
                        <span className="font-medium text-white">{dept.predicted}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Risk Level:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dept.risk === 'high' ? 'bg-red-900 text-red-300' :
                          dept.risk === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {dept.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Trends */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Seasonal Performance Patterns</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="predicted" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">AI-Generated Insights</h2>
                <button 
                  onClick={generateInsights}
                  disabled={isGeneratingInsights}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                >
                  {isGeneratingInsights ? 'Generating...' : 'Generate New Insights'}
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Risk Analysis Tab */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Risk Factor Analysis</h2>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{risk.factor}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.impact === 'High' ? 'bg-red-900 text-red-300' :
                          'bg-yellow-900 text-yellow-300'
                        }`}>
                          {risk.impact} Impact
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-400">Probability</span>
                        <div className="mt-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-white">{risk.probability}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                risk.probability > 70 ? 'bg-red-500' :
                                risk.probability > 50 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${risk.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-sm text-gray-400">Mitigation Strategy</span>
                        <p className="text-sm text-white mt-1">{risk.mitigation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerPredictiveAnalytics;