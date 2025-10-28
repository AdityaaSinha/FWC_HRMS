import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Settings,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  TestTube,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Server,
  Shield,
  Key,
  Globe,
  Phone,
  Bell,
  Clock,
  BarChart3,
  FileText,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const EmailSMSSettings = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Email Configuration State
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@company.com',
    smtpPassword: '',
    encryption: 'tls',
    fromName: 'Company HRMS',
    fromEmail: 'noreply@company.com',
    replyTo: 'support@company.com',
    maxRetries: 3,
    timeout: 30
  });

  // SMS Configuration State
  const [smsConfig, setSmsConfig] = useState({
    provider: 'twilio',
    apiKey: '',
    apiSecret: '',
    fromNumber: '+1234567890',
    webhookUrl: 'https://api.company.com/sms/webhook',
    maxRetries: 3,
    timeout: 30
  });

  // Mock data for templates and statistics
  const emailTemplates = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to {{company_name}}',
      type: 'onboarding',
      status: 'active',
      lastModified: '2024-01-15',
      usage: 156
    },
    {
      id: 2,
      name: 'Password Reset',
      subject: 'Reset Your Password',
      type: 'security',
      status: 'active',
      lastModified: '2024-01-14',
      usage: 89
    },
    {
      id: 3,
      name: 'Leave Approval',
      subject: 'Leave Request {{status}}',
      type: 'notification',
      status: 'active',
      lastModified: '2024-01-13',
      usage: 234
    },
    {
      id: 4,
      name: 'Payroll Notification',
      subject: 'Your Payslip is Ready',
      type: 'payroll',
      status: 'draft',
      lastModified: '2024-01-12',
      usage: 0
    }
  ];

  const smsTemplates = [
    {
      id: 1,
      name: 'OTP Verification',
      message: 'Your OTP is {{otp}}. Valid for 5 minutes.',
      type: 'security',
      status: 'active',
      lastModified: '2024-01-15',
      usage: 445
    },
    {
      id: 2,
      name: 'Meeting Reminder',
      message: 'Meeting reminder: {{meeting_title}} at {{time}}',
      type: 'notification',
      status: 'active',
      lastModified: '2024-01-14',
      usage: 123
    },
    {
      id: 3,
      name: 'Emergency Alert',
      message: 'URGENT: {{message}}',
      type: 'alert',
      status: 'active',
      lastModified: '2024-01-13',
      usage: 12
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color = 'indigo', trend = null }) => {
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
            {trend && (
              <p className={`text-xs mt-1 ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: 'bg-green-900 text-green-300 border-green-700', icon: CheckCircle },
      draft: { color: 'bg-yellow-900 text-yellow-300 border-yellow-700', icon: Clock },
      inactive: { color: 'bg-red-900 text-red-300 border-red-700', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleTestConnection = async (type) => {
    setIsTestingConnection(true);
    setTestResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResult({
        success,
        message: success 
          ? `${type === 'email' ? 'Email' : 'SMS'} connection successful!`
          : `${type === 'email' ? 'Email' : 'SMS'} connection failed. Please check your settings.`
      });
      setIsTestingConnection(false);
    }, 2000);
  };

  const handleSaveConfig = (type) => {
    // Simulate save operation
    console.log(`Saving ${type} configuration...`);
  };

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Email & SMS Settings</h1>
          <p className="text-gray-400">Configure email and SMS communication settings</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Emails Sent Today"
          value="1,247"
          icon={Mail}
          color="indigo"
          trend={{ positive: true, value: '+12%' }}
        />
        <StatCard
          title="SMS Sent Today"
          value="456"
          icon={MessageSquare}
          color="green"
          trend={{ positive: true, value: '+8%' }}
        />
        <StatCard
          title="Delivery Rate"
          value="98.5%"
          icon={CheckCircle}
          color="blue"
          trend={{ positive: true, value: '+0.3%' }}
        />
        <StatCard
          title="Failed Deliveries"
          value="23"
          icon={XCircle}
          color="red"
          trend={{ positive: false, value: '-5%' }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-[#272B3F] rounded-lg border border-gray-700">
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center ${
                  activeTab === 'email'
                    ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-900/20'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Configuration
              </button>
              <button
                onClick={() => setActiveTab('sms')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center ${
                  activeTab === 'sms'
                    ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-900/20'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS Configuration
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center ${
                  activeTab === 'templates'
                    ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-900/20'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </button>
            </div>

            <div className="p-6">
              {/* Email Configuration */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Server className="w-5 h-5 mr-2 text-indigo-400" />
                      SMTP Configuration
                    </h3>
                    {testResult && (
                      <div className={`flex items-center px-3 py-1 rounded-lg ${
                        testResult.success ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {testResult.success ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                        {testResult.message}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Host</label>
                      <input
                        type="text"
                        value={emailConfig.smtpHost}
                        onChange={(e) => setEmailConfig({...emailConfig, smtpHost: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
                      <input
                        type="text"
                        value={emailConfig.smtpPort}
                        onChange={(e) => setEmailConfig({...emailConfig, smtpPort: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="587"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input
                        type="email"
                        value={emailConfig.smtpUsername}
                        onChange={(e) => setEmailConfig({...emailConfig, smtpUsername: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="noreply@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={emailConfig.smtpPassword}
                          onChange={(e) => setEmailConfig({...emailConfig, smtpPassword: e.target.value})}
                          className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:border-indigo-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Encryption</label>
                      <select
                        value={emailConfig.encryption}
                        onChange={(e) => setEmailConfig({...emailConfig, encryption: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">From Name</label>
                      <input
                        type="text"
                        value={emailConfig.fromName}
                        onChange={(e) => setEmailConfig({...emailConfig, fromName: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Company HRMS"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <button
                      onClick={() => handleTestConnection('email')}
                      disabled={isTestingConnection}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <TestTube className="w-4 h-4 mr-2" />
                          Test Connection
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleSaveConfig('email')}
                      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </button>
                  </div>
                </div>
              )}

              {/* SMS Configuration */}
              {activeTab === 'sms' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-indigo-400" />
                      SMS Provider Configuration
                    </h3>
                    {testResult && (
                      <div className={`flex items-center px-3 py-1 rounded-lg ${
                        testResult.success ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {testResult.success ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                        {testResult.message}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">SMS Provider</label>
                      <select
                        value={smsConfig.provider}
                        onChange={(e) => setSmsConfig({...smsConfig, provider: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="twilio">Twilio</option>
                        <option value="aws-sns">AWS SNS</option>
                        <option value="nexmo">Nexmo</option>
                        <option value="messagebird">MessageBird</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">From Number</label>
                      <input
                        type="text"
                        value={smsConfig.fromNumber}
                        onChange={(e) => setSmsConfig({...smsConfig, fromNumber: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="+1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                      <input
                        type="text"
                        value={smsConfig.apiKey}
                        onChange={(e) => setSmsConfig({...smsConfig, apiKey: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Your API Key"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Secret</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={smsConfig.apiSecret}
                          onChange={(e) => setSmsConfig({...smsConfig, apiSecret: e.target.value})}
                          className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:border-indigo-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
                      <input
                        type="url"
                        value={smsConfig.webhookUrl}
                        onChange={(e) => setSmsConfig({...smsConfig, webhookUrl: e.target.value})}
                        className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        placeholder="https://api.company.com/sms/webhook"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <button
                      onClick={() => handleTestConnection('sms')}
                      disabled={isTestingConnection}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <TestTube className="w-4 h-4 mr-2" />
                          Test Connection
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleSaveConfig('sms')}
                      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </button>
                  </div>
                </div>
              )}

              {/* Templates */}
              {activeTab === 'templates' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-indigo-400" />
                      Message Templates
                    </h3>
                    <button
                      onClick={() => setShowTemplateModal(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Template
                    </button>
                  </div>

                  {/* Email Templates */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-4 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Templates
                    </h4>
                    <div className="space-y-3">
                      {emailTemplates.map(template => (
                        <div key={template.id} className="bg-[#1E2132] rounded-lg p-4 border border-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-white">{template.name}</h5>
                              <p className="text-sm text-gray-400">{template.subject}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusBadge status={template.status} />
                              <button className="text-gray-400 hover:text-gray-300">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>Type: {template.type}</span>
                            <span>Used {template.usage} times</span>
                            <span>Modified: {template.lastModified}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SMS Templates */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-4 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS Templates
                    </h4>
                    <div className="space-y-3">
                      {smsTemplates.map(template => (
                        <div key={template.id} className="bg-[#1E2132] rounded-lg p-4 border border-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-white">{template.name}</h5>
                              <p className="text-sm text-gray-400">{template.message}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusBadge status={template.status} />
                              <button className="text-gray-400 hover:text-gray-300">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>Type: {template.type}</span>
                            <span>Used {template.usage} times</span>
                            <span>Modified: {template.lastModified}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-indigo-400" />
              Connection Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-white">Email Service</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Connected</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1E2132] rounded-lg">
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-white">SMS Service</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-indigo-400" />
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <Send className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Send Test Email</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <MessageSquare className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Send Test SMS</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <BarChart3 className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">View Analytics</span>
              </button>
              
              <button className="w-full bg-[#1E2132] hover:bg-gray-700 p-3 rounded-lg text-left transition-colors flex items-center">
                <Download className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-white">Export Logs</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-400" />
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">Email sent successfully</span>
                  <span className="text-gray-400">2m ago</span>
                </div>
                <p className="text-gray-400 text-xs">Welcome email to john.doe@company.com</p>
              </div>
              
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">SMS delivered</span>
                  <span className="text-gray-400">5m ago</span>
                </div>
                <p className="text-gray-400 text-xs">OTP verification to +1234567890</p>
              </div>
              
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">Template updated</span>
                  <span className="text-gray-400">1h ago</span>
                </div>
                <p className="text-gray-400 text-xs">Modified "Welcome Email" template</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSMSSettings;
