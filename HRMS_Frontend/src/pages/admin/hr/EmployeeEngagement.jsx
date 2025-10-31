import React, { useState, useEffect, useCallback } from 'react';
import { 
  Heart, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Star,
  ThumbsUp,
  Award,
  Target,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Send,
  FileText,
  Smile,
  Frown,
  Meh,
  Activity,
  TrendingDown,
  Zap,
  Coffee,
  BookOpen,
  Gift,
  Brain,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import aiService from '../../../services/aiService';

// Mock data for employee engagement
const mockEngagementData = {
  totalSurveys: 12,
  activeSurveys: 3,
  totalResponses: 1847,
  engagementScore: 78,
  surveys: [
    {
      id: 1,
      title: 'Q4 Employee Satisfaction Survey',
      type: 'Satisfaction',
      status: 'Active',
      responses: 234,
      targetResponses: 324,
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      avgScore: 4.2,
      description: 'Quarterly survey to measure overall employee satisfaction'
    },
    {
      id: 2,
      title: 'Remote Work Experience',
      type: 'Feedback',
      status: 'Active',
      responses: 189,
      targetResponses: 324,
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      avgScore: 3.8,
      description: 'Understanding employee experience with remote work policies'
    },
    {
      id: 3,
      title: 'Training Effectiveness Survey',
      type: 'Training',
      status: 'Completed',
      responses: 298,
      targetResponses: 324,
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      avgScore: 4.5,
      description: 'Evaluating the effectiveness of recent training programs'
    }
  ],
  engagementMetrics: [
    { id: 1, metric: 'Overall Satisfaction', score: 78, trend: 'up', change: '+5%' },
    { id: 2, metric: 'Work-Life Balance', score: 72, trend: 'up', change: '+3%' },
    { id: 3, metric: 'Career Development', score: 65, trend: 'down', change: '-2%' },
    { id: 4, metric: 'Management Support', score: 81, trend: 'up', change: '+7%' },
    { id: 5, metric: 'Team Collaboration', score: 85, trend: 'up', change: '+4%' },
    { id: 6, metric: 'Recognition & Rewards', score: 58, trend: 'down', change: '-1%' }
  ],
  feedbackCategories: [
    { id: 1, category: 'Positive Feedback', count: 156, icon: ThumbsUp, color: 'green' },
    { id: 2, category: 'Suggestions', count: 89, icon: MessageSquare, color: 'blue' },
    { id: 3, category: 'Concerns', count: 34, icon: AlertCircle, color: 'yellow' },
    { id: 4, category: 'Complaints', count: 12, icon: XCircle, color: 'red' }
  ],
  recentFeedback: [
    { id: 1, employee: 'Anonymous', feedback: 'Great team collaboration on recent project', category: 'Positive', time: '2 hours ago' },
    { id: 2, employee: 'Anonymous', feedback: 'Need better communication tools for remote work', category: 'Suggestion', time: '4 hours ago' },
    { id: 3, employee: 'Anonymous', feedback: 'Excellent training program on new technologies', category: 'Positive', time: '6 hours ago' },
    { id: 4, employee: 'Anonymous', feedback: 'Workload distribution could be improved', category: 'Concern', time: '1 day ago' }
  ],
  engagementInitiatives: [
    { id: 1, title: 'Monthly Team Building', participants: 245, status: 'Active', impact: 'High' },
    { id: 2, title: 'Wellness Wednesday', participants: 189, status: 'Active', impact: 'Medium' },
    { id: 3, title: 'Innovation Hour', participants: 156, status: 'Planning', impact: 'High' },
    { id: 4, title: 'Mentorship Program', participants: 78, status: 'Active', impact: 'High' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle, trend }) => {
  const colorClasses = {
    indigo: 'bg-indigo-900 text-indigo-300 border-indigo-700',
    green: 'bg-green-900 text-green-300 border-green-700',
    yellow: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    blue: 'bg-blue-900 text-blue-300 border-blue-700',
    purple: 'bg-purple-900 text-purple-300 border-purple-700',
    red: 'bg-red-900 text-red-300 border-red-700'
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp size={12} className="text-green-400" />
              ) : (
                <TrendingDown size={12} className="text-red-400" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '+' : ''}5% from last quarter
              </span>
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function EmployeeEngagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  
  // AI Sentiment Analysis State
  const [sentimentData, setSentimentData] = useState(null);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [sentimentError, setSentimentError] = useState(null);
  const [sentimentTrends, setSentimentTrends] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('engineering');
  
  // Dynamic Updates State
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  // Departments list for dynamic selection
  const departments = [
    { id: 'engineering', name: 'Engineering', count: 45 },
    { id: 'marketing', name: 'Marketing', count: 23 },
    { id: 'sales', name: 'Sales', count: 34 },
    { id: 'hr', name: 'Human Resources', count: 12 },
    { id: 'finance', name: 'Finance', count: 18 },
    { id: 'operations', name: 'Operations', count: 28 }
  ];

  // Enhanced fetch function with error handling and loading states
  const fetchSentimentAnalysis = useCallback(async (showLoading = true) => {
    if (showLoading) setSentimentLoading(true);
    setSentimentError(null);
    
    try {
      // Get multiple feedback samples for more comprehensive analysis
      const feedbackSamples = mockEngagementData.recentFeedback.slice(0, 3);
      
      // Analyze multiple feedback items
      const analysisPromises = feedbackSamples.map(feedback => 
        aiService.analyzeSentiment({
          feedbackText: feedback.feedback,
          employeeId: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          source: 'engagement_survey',
          department: selectedDepartment
        })
      );
      
      const analysisResults = await Promise.all(analysisPromises);
      
      // Combine results for comprehensive view
      const combinedAnalysis = {
        feedbackCount: analysisResults.length,
        analyses: analysisResults,
        overallSentiment: calculateOverallSentiment(analysisResults),
        lastUpdated: new Date().toISOString()
      };
      
      setSentimentData(combinedAnalysis);
      
      // Get sentiment trends for selected department
      const trendsResponse = await aiService.getSentimentTrends(selectedDepartment);
      setSentimentTrends(trendsResponse);
      
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
      setSentimentError('Unable to fetch sentiment analysis. Please try again.');
    } finally {
      if (showLoading) setSentimentLoading(false);
    }
  }, [selectedDepartment]);

  // Calculate overall sentiment from multiple analyses
  const calculateOverallSentiment = (analyses) => {
    if (!analyses || analyses.length === 0) return null;
    
    const sentiments = analyses.map(a => a.analysis?.classification).filter(Boolean);
    const confidences = analyses.map(a => parseFloat(a.analysis?.confidence) || 0);
    
    // Calculate weighted average
    const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
    
    // Determine overall sentiment
    const sentimentCounts = sentiments.reduce((acc, sentiment) => {
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, {});
    
    const overallSentiment = Object.keys(sentimentCounts).reduce((a, b) => 
      sentimentCounts[a] > sentimentCounts[b] ? a : b
    );
    
    return {
      classification: overallSentiment,
      confidence: avgConfidence.toFixed(2),
      distribution: sentimentCounts
    };
  };

  // Auto-refresh effect
  useEffect(() => {
    let intervalId;
    
    if (autoRefresh && activeTab === 'sentiment') {
      intervalId = setInterval(() => {
        fetchSentimentAnalysis(false); // Don't show loading for auto-refresh
      }, refreshInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, activeTab, refreshInterval, fetchSentimentAnalysis]);

  // Initial fetch and department change effect
  useEffect(() => {
    if (activeTab === 'sentiment') {
      fetchSentimentAnalysis();
    }
  }, [activeTab, selectedDepartment, fetchSentimentAnalysis]);

  // Export functionality
  const handleExport = async (format = 'pdf') => {
    setIsExporting(true);
    
    try {
      const exportData = {
        department: selectedDepartment,
        sentimentData,
        sentimentTrends,
        exportDate: new Date().toISOString(),
        format
      };

      if (format === 'pdf') {
        await exportToPDF(exportData);
      } else if (format === 'excel') {
        await exportToExcel(exportData);
      } else if (format === 'json') {
        await exportToJSON(exportData);
      }
      
    } catch (error) {
      console.error('Export failed:', error);
      setSentimentError('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Export to PDF
  const exportToPDF = async (data) => {
    // Create a comprehensive PDF report
    const reportContent = generateReportContent(data);
    
    // Use browser's print functionality for PDF generation
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sentiment Analysis Report - ${data.department}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
            .section { margin-bottom: 25px; }
            .metric { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .trend-item { margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
            .positive { color: #10b981; }
            .negative { color: #ef4444; }
            .neutral { color: #f59e0b; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Export to Excel (CSV format)
  const exportToExcel = async (data) => {
    const csvContent = generateCSVContent(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sentiment-analysis-${data.department}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const exportToJSON = async (data) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sentiment-analysis-${data.department}-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate report content for PDF
  const generateReportContent = (data) => {
    const dept = departments.find(d => d.id === data.department);
    return `
      <div class="header">
        <h1>AI Sentiment Analysis Report</h1>
        <h2>${dept?.name || data.department} Department</h2>
        <p>Generated on: ${new Date(data.exportDate).toLocaleDateString()}</p>
      </div>
      
      <div class="section">
        <h3>Overall Sentiment Summary</h3>
        ${data.sentimentData?.overallSentiment ? `
          <div class="metric">
            <strong>Overall Classification:</strong> 
            <span class="${data.sentimentData.overallSentiment.classification}">${data.sentimentData.overallSentiment.classification}</span>
          </div>
          <div class="metric">
            <strong>Confidence Level:</strong> ${data.sentimentData.overallSentiment.confidence}%
          </div>
          <div class="metric">
            <strong>Feedback Analyzed:</strong> ${data.sentimentData.feedbackCount} items
          </div>
        ` : '<p>No sentiment data available</p>'}
      </div>
      
      <div class="section">
        <h3>Department Trends</h3>
        ${data.sentimentTrends?.trends?.map(trend => `
          <div class="trend-item">
            <strong>${trend.period}</strong> - ${trend.feedback_count} feedback items<br>
            Positive: ${trend.positive}% | Neutral: ${trend.neutral}% | Negative: ${trend.negative}%
          </div>
        `).join('') || '<p>No trend data available</p>'}
      </div>
      
      <div class="section">
        <h3>Individual Analysis Results</h3>
        ${data.sentimentData?.analyses?.map((analysis, index) => `
          <div class="trend-item">
            <strong>Analysis ${index + 1}:</strong><br>
            Classification: <span class="${analysis.analysis?.classification}">${analysis.analysis?.classification}</span><br>
            Confidence: ${analysis.analysis?.confidence}<br>
            Feedback: "${analysis.feedbackText}"
          </div>
        `).join('') || '<p>No individual analyses available</p>'}
      </div>
    `;
  };

  // Generate CSV content
  const generateCSVContent = (data) => {
    let csv = 'Department,Date,Analysis Type,Classification,Confidence,Feedback Text\n';
    
    if (data.sentimentData?.analyses) {
      data.sentimentData.analyses.forEach((analysis, index) => {
        csv += `"${data.department}","${new Date(data.exportDate).toLocaleDateString()}","Individual Analysis ${index + 1}","${analysis.analysis?.classification || 'N/A'}","${analysis.analysis?.confidence || 'N/A'}","${analysis.feedbackText?.replace(/"/g, '""') || 'N/A'}"\n`;
      });
    }
    
    if (data.sentimentTrends?.trends) {
      data.sentimentTrends.trends.forEach(trend => {
        csv += `"${data.department}","${trend.period}","Trend Data","Mixed","N/A","Positive: ${trend.positive}% Neutral: ${trend.neutral}% Negative: ${trend.negative}%"\n`;
      });
    }
    
    return csv;
  };

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchSentimentAnalysis(true);
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleCreateSurvey = () => {
    setModalType('create-survey');
    setShowModal(true);
  };

  const handleViewSurvey = (survey) => {
    setSelectedSurvey(survey);
    setModalType('view-survey');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Completed': return 'bg-blue-900 text-blue-300';
      case 'Draft': return 'bg-gray-700 text-gray-300';
      case 'Planning': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getCategoryColor = (color) => {
    const colorClasses = {
      green: 'bg-green-900 text-green-300',
      blue: 'bg-blue-900 text-blue-300',
      yellow: 'bg-yellow-900 text-yellow-300',
      red: 'bg-red-900 text-red-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressPercentage = (responses, target) => {
    return Math.round((responses / target) * 100);
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employee Engagement</h1>
          <p className="text-gray-400 text-sm">Monitor and improve employee satisfaction and engagement</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreateSurvey}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Survey
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Surveys"
          value={mockEngagementData.totalSurveys}
          icon={<FileText />}
          color="indigo"
          subtitle="All time surveys"
        />
        <StatCard
          title="Active Surveys"
          value={mockEngagementData.activeSurveys}
          icon={<Activity />}
          color="green"
          subtitle="Currently running"
        />
        <StatCard
          title="Total Responses"
          value={mockEngagementData.totalResponses.toLocaleString()}
          icon={<MessageSquare />}
          color="blue"
          subtitle="All survey responses"
        />
        <StatCard
          title="Engagement Score"
          value={`${mockEngagementData.engagementScore}%`}
          icon={<Heart />}
          color="purple"
          subtitle="Overall satisfaction"
          trend="up"
        />
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
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'surveys', label: 'Surveys', icon: FileText },
                  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
                  { id: 'sentiment', label: 'AI Sentiment', icon: Brain },
                  { id: 'initiatives', label: 'Initiatives', icon: Zap },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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

            {/* Tab Content */}
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Engagement Metrics */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Engagement Metrics</h3>
                    <div className="space-y-4">
                      {mockEngagementData.engagementMetrics.map((metric) => (
                        <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{metric.metric}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-sm ${getScoreColor(metric.score)}`}>
                                {metric.score}%
                              </span>
                              <div className="flex items-center gap-1">
                                {metric.trend === 'up' ? (
                                  <TrendingUp size={12} className="text-green-400" />
                                ) : (
                                  <TrendingDown size={12} className="text-red-400" />
                                )}
                                <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                  {metric.change}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="w-16 h-2 bg-gray-700 rounded-full">
                            <div 
                              className={`h-full rounded-full ${getScoreColor(metric.score).includes('green') ? 'bg-green-400' : getScoreColor(metric.score).includes('yellow') ? 'bg-yellow-400' : 'bg-red-400'}`}
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Categories */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Feedback Categories</h3>
                    <div className="space-y-3">
                      {mockEngagementData.feedbackCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                                <IconComponent size={16} />
                              </div>
                              <span className="text-white">{category.category}</span>
                            </div>
                            <span className="text-white font-medium">{category.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Surveys Tab */}
            {activeTab === 'surveys' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search surveys..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreateSurvey}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Create Survey
                  </button>
                </div>

                <div className="space-y-4">
                  {mockEngagementData.surveys.map((survey) => (
                    <div key={survey.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{survey.title}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(survey.status)}`}>
                              {survey.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <FileText size={14} />
                              <span>{survey.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{survey.responses}/{survey.targetResponses} responses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} />
                              <span>{survey.avgScore}/5.0 avg score</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{survey.startDate} - {survey.endDate}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{survey.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Response Progress</span>
                              <span>{getProgressPercentage(survey.responses, survey.targetResponses)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${getProgressPercentage(survey.responses, survey.targetResponses)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewSurvey(survey)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Recent Feedback</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <MessageSquare size={16} />
                    View All Feedback
                  </button>
                </div>

                <div className="space-y-4">
                  {mockEngagementData.recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-gray-400">{feedback.employee}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                              feedback.category === 'Positive' ? 'green' :
                              feedback.category === 'Suggestion' ? 'blue' :
                              feedback.category === 'Concern' ? 'yellow' : 'red'
                            )}`}>
                              {feedback.category}
                            </span>
                            <span className="text-xs text-gray-500">{feedback.time}</span>
                          </div>
                          <p className="text-gray-300">{feedback.feedback}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <MessageSquare size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Initiatives Tab */}
            {activeTab === 'initiatives' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Engagement Initiatives</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Create Initiative
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockEngagementData.engagementInitiatives.map((initiative) => (
                    <div key={initiative.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-white">{initiative.title}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(initiative.status)}`}>
                              {initiative.status}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              initiative.impact === 'High' ? 'bg-green-900 text-green-300' :
                              initiative.impact === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {initiative.impact} Impact
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users size={16} />
                        <span>{initiative.participants} participants</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Sentiment Analysis Tab */}
            {activeTab === 'sentiment' && (
              <div className="p-6">
                {/* Header with Enhanced Controls */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Brain className="h-5 w-5 text-indigo-400" />
                      AI Sentiment Analysis
                      {lastUpdated && (
                        <span className="text-xs text-gray-400 ml-2">
                          Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">AI-powered analysis of employee feedback sentiment</p>
                  </div>
                  
                  {/* Dynamic Controls */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500"
                      >
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name} ({dept.count})
                          </option>
                        ))}
                      </select>
                      
                      <button 
                        onClick={handleManualRefresh}
                        disabled={sentimentLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-4 w-4 ${sentimentLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </button>
                    </div>
                    
                    {/* Auto-refresh and Export Controls */}
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
                        <button
                          onClick={toggleAutoRefresh}
                          className={`flex items-center gap-1 text-sm ${autoRefresh ? 'text-green-400' : 'text-gray-400'}`}
                        >
                          {autoRefresh ? <Play size={14} /> : <Pause size={14} />}
                          Auto-refresh
                        </button>
                        {autoRefresh && (
                          <select
                            value={refreshInterval}
                            onChange={(e) => setRefreshInterval(Number(e.target.value))}
                            className="ml-2 px-2 py-1 bg-gray-600 text-white text-xs rounded border-none focus:outline-none"
                          >
                            <option value={15000}>15s</option>
                            <option value={30000}>30s</option>
                            <option value={60000}>1m</option>
                            <option value={300000}>5m</option>
                          </select>
                        )}
                      </div>
                      
                      {/* Export Dropdown */}
                      <div className="relative">
                        <select
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 text-sm"
                        >
                          <option value="pdf">PDF Report</option>
                          <option value="excel">Excel/CSV</option>
                          <option value="json">JSON Data</option>
                        </select>
                      </div>
                      
                      <button 
                        onClick={() => handleExport(exportFormat)}
                        disabled={isExporting || !sentimentData}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {isExporting ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-4 mb-6 p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">
                      {autoRefresh ? 'Live Updates' : 'Manual Mode'}
                    </span>
                  </div>
                  
                  {sentimentData && (
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        {sentimentData.feedbackCount || sentimentData.analyses?.length || 0} items analyzed
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      Next refresh: {autoRefresh ? `${Math.ceil(refreshInterval / 1000)}s` : 'Manual'}
                    </span>
                  </div>
                </div>

                {sentimentError && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>{sentimentError}</span>
                    </div>
                  </div>
                )}

                {sentimentLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing sentiment data...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Enhanced Sentiment Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-900 rounded-lg p-6 border border-green-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <h4 className="text-white font-medium">Positive Sentiment</h4>
                          <Smile className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-green-400 mb-2 relative z-10">
                          {sentimentTrends?.positive_percentage || '68%'}
                        </div>
                        <p className="text-gray-400 text-sm relative z-10">
                          {sentimentTrends?.positive_count || '156'} positive feedback items
                        </p>
                        <div className="mt-3 relative z-10">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: sentimentTrends?.positive_percentage || '68%' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-6 border border-yellow-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <h4 className="text-white font-medium">Neutral Sentiment</h4>
                          <Meh className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-400 mb-2 relative z-10">
                          {sentimentTrends?.neutral_percentage || '22%'}
                        </div>
                        <p className="text-gray-400 text-sm relative z-10">
                          {sentimentTrends?.neutral_count || '51'} neutral feedback items
                        </p>
                        <div className="mt-3 relative z-10">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: sentimentTrends?.neutral_percentage || '22%' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <h4 className="text-white font-medium">Negative Sentiment</h4>
                          <Frown className="h-6 w-6 text-red-400" />
                        </div>
                        <div className="text-2xl font-bold text-red-400 mb-2 relative z-10">
                          {sentimentTrends?.negative_percentage || '10%'}
                        </div>
                        <p className="text-gray-400 text-sm relative z-10">
                          {sentimentTrends?.negative_count || '23'} negative feedback items
                        </p>
                        <div className="mt-3 relative z-10">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: sentimentTrends?.negative_percentage || '10%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall Sentiment Summary */}
                    {sentimentData?.overallSentiment && (
                      <div className="bg-gray-900 rounded-lg p-6 border border-indigo-500/20">
                        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-indigo-400" />
                          Overall Department Sentiment
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className={`text-3xl font-bold mb-2 ${
                              sentimentData.overallSentiment.classification === 'positive' ? 'text-green-400' :
                              sentimentData.overallSentiment.classification === 'negative' ? 'text-red-400' :
                              'text-yellow-400'
                            }`}>
                              {sentimentData.overallSentiment.classification.toUpperCase()}
                            </div>
                            <p className="text-gray-400 text-sm">Overall Classification</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-400 mb-2">
                              {sentimentData.overallSentiment.confidence}%
                            </div>
                            <p className="text-gray-400 text-sm">Confidence Level</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">
                              {sentimentData.feedbackCount || sentimentData.analyses?.length || 0}
                            </div>
                            <p className="text-gray-400 text-sm">Items Analyzed</p>
                          </div>
                        </div>
                        
                        {/* Sentiment Distribution */}
                        {sentimentData.overallSentiment.distribution && (
                          <div className="mt-6">
                            <h5 className="text-white font-medium mb-3">Sentiment Distribution</h5>
                            <div className="flex gap-2">
                              {Object.entries(sentimentData.overallSentiment.distribution).map(([sentiment, count]) => (
                                <div 
                                  key={sentiment}
                                  className={`flex-1 h-8 rounded flex items-center justify-center text-sm font-medium ${
                                    sentiment === 'positive' ? 'bg-green-600' :
                                    sentiment === 'negative' ? 'bg-red-600' :
                                    'bg-yellow-600'
                                  }`}
                                  style={{ 
                                    flexGrow: count,
                                    minWidth: '60px'
                                  }}
                                >
                                  {count}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* AI Analysis Results */}
                    {sentimentData && (
                      <div className="bg-gray-900 rounded-lg p-6">
                        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-indigo-400" />
                          Latest AI Analysis
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-800 rounded-lg">
                            <p className="text-gray-300 mb-3">"{sentimentData.feedbackText}"</p>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-400">Employee ID: {sentimentData.employeeId}</span>
                              <span className={`px-3 py-1 text-xs rounded-full ${
                                sentimentData.analysis?.sentiment === 'positive' ? 'bg-green-900 text-green-300' :
                                sentimentData.analysis?.sentiment === 'negative' ? 'bg-red-900 text-red-300' :
                                'bg-yellow-900 text-yellow-300'
                              }`}>
                                {sentimentData.analysis?.sentiment || 'Neutral'}
                              </span>
                              <span className="text-sm text-gray-400">
                                Confidence: {sentimentData.analysis?.confidence || 'N/A'}
                              </span>
                            </div>
                          </div>
                          
                          {sentimentData.analysis?.key_themes && (
                            <div>
                              <h5 className="text-white font-medium mb-2">Key Themes</h5>
                              <div className="flex flex-wrap gap-2">
                                {sentimentData.analysis.key_themes.map((theme, index) => (
                                  <span key={index} className="px-3 py-1 bg-indigo-900 text-indigo-300 rounded-full text-sm">
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {sentimentData.analysis?.recommendations && (
                            <div>
                              <h5 className="text-white font-medium mb-2">AI Recommendations</h5>
                              <ul className="space-y-1">
                                {sentimentData.analysis.recommendations.map((rec, index) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sentiment Trends */}
                    {sentimentTrends && (
                      <div className="bg-gray-900 rounded-lg p-6">
                        <h4 className="text-white font-medium mb-4">Department Sentiment Trends</h4>
                        <div className="space-y-4">
                          {sentimentTrends.trends?.map((trend, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                              <div>
                                <span className="text-white font-medium">{trend.period}</span>
                                <p className="text-gray-400 text-sm">{trend.feedback_count} feedback items</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-gray-300">{trend.positive}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <span className="text-sm text-gray-300">{trend.neutral}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <span className="text-sm text-gray-300">{trend.negative}%</span>
                                </div>
                              </div>
                            </div>
                          )) || (
                            <p className="text-gray-400 text-center py-4">No trend data available</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Engagement Analytics</h3>
                  <p className="text-gray-400 mb-6">Detailed analytics and insights on employee engagement trends</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    View Analytics Dashboard
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
                <Plus className="h-4 w-4" />
                <span>Create Survey</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <MessageSquare className="h-4 w-4" />
                <span>View Feedback</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Zap className="h-4 w-4" />
                <span>Launch Initiative</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
            </div>
          </div>

          {/* Engagement Score */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Current Engagement</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2.51 * mockEngagementData.engagementScore} 251`}
                    className="text-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{mockEngagementData.engagementScore}%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Overall Satisfaction</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-300">New survey responses received</p>
                <p className="text-gray-500 text-xs">15 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Engagement initiative launched</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Feedback analysis completed</p>
                <p className="text-gray-500 text-xs">4 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Monthly report generated</p>
                <p className="text-gray-500 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {modalType === 'create-survey' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Create New Survey</h3>
                  <p className="text-gray-400 mb-6">Design a new employee engagement survey.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Survey
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-survey' && selectedSurvey && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Survey Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedSurvey.title}</h4>
                      <p className="text-gray-400">{selectedSurvey.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Type</p>
                        <p className="text-white">{selectedSurvey.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedSurvey.status)}`}>
                          {selectedSurvey.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Responses</p>
                        <p className="text-white">{selectedSurvey.responses}/{selectedSurvey.targetResponses}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Average Score</p>
                        <p className="text-white">{selectedSurvey.avgScore}/5.0</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        View Results
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Download Report
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}