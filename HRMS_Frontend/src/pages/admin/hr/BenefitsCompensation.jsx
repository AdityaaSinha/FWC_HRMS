import React, { useState } from 'react';
import { 
  DollarSign, 
  Heart, 
  Shield, 
  Car, 
  Home,
  GraduationCap,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Users,
  Calendar,
  FileText,
  Building,
  Award,
  Target,
  BarChart3,
  Briefcase,
  Clock
} from 'lucide-react';
import CurrencySelector from '../../../components/CurrencySelector';

// Mock data for benefits and compensation
const mockBenefitsData = {
  totalPackages: 18,
  activePackages: 15,
  totalBeneficiaries: 324,
  totalBudget: 2450000,
  benefitPackages: [
    {
      id: 1,
      name: 'Executive Package',
      category: 'Leadership',
      employees: 12,
      monthlyCost: 8500,
      status: 'Active',
      benefits: ['Health Insurance', 'Dental', 'Vision', 'Life Insurance', 'Stock Options', 'Company Car'],
      description: 'Comprehensive benefits package for executive level employees'
    },
    {
      id: 2,
      name: 'Standard Employee Package',
      category: 'Full-time',
      employees: 245,
      monthlyCost: 4200,
      status: 'Active',
      benefits: ['Health Insurance', 'Dental', 'Vision', 'Life Insurance', 'Retirement Plan'],
      description: 'Standard benefits package for full-time employees'
    },
    {
      id: 3,
      name: 'Contractor Package',
      category: 'Contract',
      employees: 67,
      monthlyCost: 1800,
      status: 'Active',
      benefits: ['Health Insurance', 'Professional Development'],
      description: 'Basic benefits package for contract employees'
    }
  ],
  benefitTypes: [
    { id: 1, name: 'Health Insurance', icon: Heart, cost: 450, employees: 298, color: 'red' },
    { id: 2, name: 'Dental Insurance', icon: Shield, cost: 85, employees: 276, color: 'blue' },
    { id: 3, name: 'Vision Insurance', icon: Eye, cost: 35, employees: 254, color: 'green' },
    { id: 4, name: 'Life Insurance', icon: Shield, cost: 125, employees: 289, color: 'purple' },
    { id: 5, name: 'Retirement Plan', icon: TrendingUp, cost: 320, employees: 267, color: 'indigo' },
    { id: 6, name: 'Company Car', icon: Car, cost: 650, employees: 45, color: 'yellow' }
  ],
  compensationStructure: [
    {
      id: 1,
      level: 'Entry Level',
      minSalary: 45000,
      maxSalary: 65000,
      employees: 89,
      avgSalary: 55000,
      bonus: '5-10%'
    },
    {
      id: 2,
      level: 'Mid Level',
      minSalary: 65000,
      maxSalary: 95000,
      employees: 156,
      avgSalary: 78000,
      bonus: '10-15%'
    },
    {
      id: 3,
      level: 'Senior Level',
      minSalary: 95000,
      maxSalary: 140000,
      employees: 67,
      avgSalary: 115000,
      bonus: '15-25%'
    },
    {
      id: 4,
      level: 'Executive',
      minSalary: 140000,
      maxSalary: 250000,
      employees: 12,
      avgSalary: 185000,
      bonus: '25-40%'
    }
  ],
  recentActivity: [
    { id: 1, action: 'New health insurance provider added', time: '2 hours ago' },
    { id: 2, action: 'Executive package updated with stock options', time: '4 hours ago' },
    { id: 3, action: 'Quarterly compensation review completed', time: '1 day ago' },
    { id: 4, action: 'New dental plan enrollment opened', time: '2 days ago' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle }) => {
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
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function BenefitsCompensation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCreatePackage = () => {
    setModalType('create-package');
    setShowModal(true);
  };

  const handleViewPackage = (pkg) => {
    setSelectedPackage(pkg);
    setModalType('view-package');
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900 text-green-300';
      case 'Inactive': return 'bg-gray-700 text-gray-300';
      case 'Pending': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getBenefitColor = (color) => {
    const colorClasses = {
      red: 'bg-red-900 text-red-300',
      blue: 'bg-blue-900 text-blue-300',
      green: 'bg-green-900 text-green-300',
      purple: 'bg-purple-900 text-purple-300',
      indigo: 'bg-indigo-900 text-indigo-300',
      yellow: 'bg-yellow-900 text-yellow-300'
    };
    return colorClasses[color] || 'bg-gray-700 text-gray-300';
  };

  // Exchange rates (mock data - in real app, fetch from API)
  const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45
  };

  const formatCurrency = (amount, currency = selectedCurrency) => {
    const convertedAmount = amount * exchangeRates[currency];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2
    }).format(convertedAmount);
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Benefits & Compensation</h1>
          <p className="text-gray-400 text-sm">Manage employee benefits and compensation packages</p>
        </div>
        <div className="flex gap-3">
          <CurrencySelector 
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreatePackage}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Package
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Packages"
          value={mockBenefitsData.totalPackages}
          icon={<Award />}
          color="indigo"
          subtitle="All benefit packages"
        />
        <StatCard
          title="Active Packages"
          value={mockBenefitsData.activePackages}
          icon={<CheckCircle />}
          color="green"
          subtitle="Currently active"
        />
        <StatCard
          title="Total Beneficiaries"
          value={mockBenefitsData.totalBeneficiaries}
          icon={<Users />}
          color="blue"
          subtitle="Enrolled employees"
        />
        <StatCard
          title="Annual Budget"
          value={formatCurrency(mockBenefitsData.totalBudget)}
          icon={<DollarSign />}
          color="yellow"
          subtitle="Total benefits cost"
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
                  { id: 'packages', label: 'Benefit Packages', icon: Award },
                  { id: 'benefits', label: 'Benefit Types', icon: Heart },
                  { id: 'compensation', label: 'Compensation', icon: DollarSign },
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
                  {/* Popular Benefits */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Popular Benefits</h3>
                    <div className="space-y-3">
                      {mockBenefitsData.benefitTypes.slice(0, 4).map((benefit) => {
                        const IconComponent = benefit.icon;
                        return (
                          <div key={benefit.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getBenefitColor(benefit.color)}`}>
                                <IconComponent size={16} />
                              </div>
                              <div>
                                <p className="font-medium text-white">{benefit.name}</p>
                                <p className="text-sm text-gray-400">{benefit.employees} employees</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-white">{formatCurrency(benefit.cost)}</p>
                              <p className="text-xs text-gray-400">per month</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compensation Overview */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Compensation Overview</h3>
                    <div className="space-y-3">
                      {mockBenefitsData.compensationStructure.map((level) => (
                        <div key={level.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{level.level}</p>
                            <p className="text-sm text-gray-400">{level.employees} employees</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">{formatCurrency(level.avgSalary)}</p>
                            <p className="text-xs text-gray-400">avg salary</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Benefit Packages Tab */}
            {activeTab === 'packages' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search packages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="leadership">Leadership</option>
                      <option value="full-time">Full-time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleCreatePackage}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={16} />
                    Create Package
                  </button>
                </div>

                <div className="space-y-4">
                  {mockBenefitsData.benefitPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">{pkg.name}</h3>
                            <span className={`inline-flex px-3 py-1 text-sm rounded-full ${getStatusColor(pkg.status)}`}>
                              {pkg.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Building size={14} />
                              <span>{pkg.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{pkg.employees} employees</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign size={14} />
                              <span>{formatCurrency(pkg.monthlyCost)}/month</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{pkg.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.benefits.slice(0, 4).map((benefit, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300 rounded">
                                {benefit}
                              </span>
                            ))}
                            {pkg.benefits.length > 4 && (
                              <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                                +{pkg.benefits.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleViewPackage(pkg)}
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

            {/* Benefit Types Tab */}
            {activeTab === 'benefits' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Benefit Types</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Benefit Type
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockBenefitsData.benefitTypes.map((benefit) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={benefit.id} className="bg-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${getBenefitColor(benefit.color)}`}>
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{benefit.name}</h4>
                              <p className="text-sm text-gray-400">{benefit.employees} enrolled</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-white">
                            <Edit size={16} />
                          </button>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white mb-1">{formatCurrency(benefit.cost)}</p>
                          <p className="text-sm text-gray-400">per month</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Compensation Tab */}
            {activeTab === 'compensation' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Compensation Structure</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Level
                  </button>
                </div>

                <div className="space-y-4">
                  {mockBenefitsData.compensationStructure.map((level) => (
                    <div key={level.id} className="bg-gray-900 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <h4 className="text-lg font-medium text-white">{level.level}</h4>
                            <span className="px-3 py-1 text-sm bg-indigo-900 text-indigo-300 rounded">
                              {level.employees} employees
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-6">
                            <div>
                              <p className="text-sm text-gray-400">Min Salary</p>
                              <p className="text-lg font-medium text-white">{formatCurrency(level.minSalary)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Max Salary</p>
                              <p className="text-lg font-medium text-white">{formatCurrency(level.maxSalary)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Average Salary</p>
                              <p className="text-lg font-medium text-white">{formatCurrency(level.avgSalary)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Bonus Range</p>
                              <p className="text-lg font-medium text-white">{level.bonus}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                            <Edit size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Benefits & Compensation Analytics</h3>
                  <p className="text-gray-400 mb-6">Track benefit utilization, cost analysis, and compensation trends</p>
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
                <span>Create Package</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Heart className="h-4 w-4" />
                <span>Add Benefit Type</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <DollarSign className="h-4 w-4" />
                <span>Update Compensation</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Monthly Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Health Insurance</span>
                <span className="text-white font-medium">$134,100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Retirement Plans</span>
                <span className="text-white font-medium">$85,440</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Life Insurance</span>
                <span className="text-white font-medium">$36,125</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Other Benefits</span>
                <span className="text-white font-medium">$28,750</span>
              </div>
              <div className="border-t border-gray-700 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-indigo-400 font-bold">$284,415</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockBenefitsData.recentActivity.map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="text-gray-300">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {modalType === 'create-package' && (
                <>
                  <h3 className="text-lg font-medium text-white mb-4">Create Benefit Package</h3>
                  <p className="text-gray-400 mb-6">Set up a new benefits package for employees.</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Create Package
                    </button>
                  </div>
                </>
              )}
              
              {modalType === 'view-package' && selectedPackage && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Package Details</h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">{selectedPackage.name}</h4>
                      <p className="text-gray-400">{selectedPackage.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Category</p>
                        <p className="text-white">{selectedPackage.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Employees</p>
                        <p className="text-white">{selectedPackage.employees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Monthly Cost</p>
                        <p className="text-white">{formatCurrency(selectedPackage.monthlyCost)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(selectedPackage.status)}`}>
                          {selectedPackage.status}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Included Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPackage.benefits.map((benefit, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300 rounded">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Edit Package
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        View Enrollments
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