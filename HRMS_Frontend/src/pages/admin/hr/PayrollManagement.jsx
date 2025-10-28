import React, { useState } from 'react';
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  PieChart,
  BarChart3
} from 'lucide-react';

// Mock data for payroll
const mockPayrollData = {
  totalPayroll: 2450000,
  employeesProcessed: 156,
  pendingApprovals: 8,
  averageSalary: 15705,
  payrollCycles: [
    {
      id: 1,
      period: 'December 2024',
      status: 'Processing',
      totalAmount: 2450000,
      employeeCount: 156,
      dueDate: '2024-12-31',
      processedDate: null
    },
    {
      id: 2,
      period: 'November 2024',
      status: 'Completed',
      totalAmount: 2380000,
      employeeCount: 154,
      dueDate: '2024-11-30',
      processedDate: '2024-11-28'
    },
    {
      id: 3,
      period: 'October 2024',
      status: 'Completed',
      totalAmount: 2420000,
      employeeCount: 155,
      dueDate: '2024-10-31',
      processedDate: '2024-10-29'
    }
  ],
  salaryStructures: [
    {
      id: 1,
      name: 'Senior Developer',
      baseSalary: 85000,
      allowances: 15000,
      deductions: 12000,
      netSalary: 88000,
      employeeCount: 12
    },
    {
      id: 2,
      name: 'Project Manager',
      baseSalary: 95000,
      allowances: 18000,
      deductions: 15000,
      netSalary: 98000,
      employeeCount: 8
    },
    {
      id: 3,
      name: 'HR Specialist',
      baseSalary: 65000,
      allowances: 10000,
      deductions: 9000,
      netSalary: 66000,
      employeeCount: 6
    }
  ],
  deductionTypes: [
    { id: 1, name: 'Income Tax', type: 'Tax', rate: 18, isPercentage: true },
    { id: 2, name: 'Health Insurance', type: 'Insurance', rate: 500, isPercentage: false },
    { id: 3, name: 'Provident Fund', type: 'Savings', rate: 12, isPercentage: true },
    { id: 4, name: 'Professional Tax', type: 'Tax', rate: 200, isPercentage: false }
  ],
  allowanceTypes: [
    { id: 1, name: 'House Rent Allowance', type: 'Housing', rate: 40, isPercentage: true },
    { id: 2, name: 'Transport Allowance', type: 'Transport', rate: 1600, isPercentage: false },
    { id: 3, name: 'Medical Allowance', type: 'Medical', rate: 1250, isPercentage: false },
    { id: 4, name: 'Special Allowance', type: 'Special', rate: 15, isPercentage: true }
  ],
  recentActivity: [
    { id: 1, action: 'Payroll processed for November 2024', user: 'HR Admin', time: '2 hours ago' },
    { id: 2, action: 'Salary structure updated for Senior Developer', user: 'HR Manager', time: '1 day ago' },
    { id: 3, action: 'New deduction type added: Professional Development', user: 'Finance Team', time: '2 days ago' },
    { id: 4, action: 'Bonus calculation completed for Q4', user: 'HR Admin', time: '3 days ago' }
  ]
};

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const colorClasses = {
    indigo: 'bg-indigo-900 text-indigo-300 border-indigo-700',
    green: 'bg-green-900 text-green-300 border-green-700',
    yellow: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    blue: 'bg-blue-900 text-blue-300 border-blue-700',
    purple: 'bg-purple-900 text-purple-300 border-purple-700',
    pink: 'bg-pink-900 text-pink-300 border-pink-700'
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

export default function PayrollManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleCreatePayroll = () => {
    setModalType('create');
    setShowModal(true);
  };

  const handleEditStructure = (structure) => {
    setModalType('edit');
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6 bg-[#11131A] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-gray-400 text-sm">Manage salary calculations, deductions, and payroll processing</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
            <Download size={16} />
            Export Reports
          </button>
          <button 
            onClick={handleCreatePayroll}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Monthly Payroll"
          value={`$${mockPayrollData.totalPayroll.toLocaleString()}`}
          icon={<DollarSign />}
          color="indigo"
          subtitle="Current month"
        />
        <StatCard
          title="Employees Processed"
          value={mockPayrollData.employeesProcessed}
          icon={<Users />}
          color="green"
          subtitle="Active employees"
        />
        <StatCard
          title="Pending Approvals"
          value={mockPayrollData.pendingApprovals}
          icon={<Clock />}
          color="yellow"
          subtitle="Awaiting review"
        />
        <StatCard
          title="Average Salary"
          value={`$${mockPayrollData.averageSalary.toLocaleString()}`}
          icon={<TrendingUp />}
          color="blue"
          subtitle="Per employee"
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
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'cycles', label: 'Payroll Cycles', icon: Calendar },
                  { id: 'structures', label: 'Salary Structures', icon: Building },
                  { id: 'deductions', label: 'Deductions', icon: Calculator },
                  { id: 'allowances', label: 'Allowances', icon: CreditCard },
                  { id: 'analytics', label: 'Analytics', icon: PieChart }
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
                  {/* Recent Payroll Cycles */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Recent Payroll Cycles</h3>
                    <div className="space-y-3">
                      {mockPayrollData.payrollCycles.slice(0, 3).map((cycle) => (
                        <div key={cycle.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{cycle.period}</p>
                            <p className="text-sm text-gray-400">{cycle.employeeCount} employees</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">${cycle.totalAmount.toLocaleString()}</p>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              cycle.status === 'Completed' 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {cycle.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Salary Distribution */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Salary Distribution</h3>
                    <div className="space-y-3">
                      {mockPayrollData.salaryStructures.map((structure) => (
                        <div key={structure.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{structure.name}</p>
                            <p className="text-sm text-gray-400">{structure.employeeCount} employees</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">${structure.netSalary.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Net salary</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payroll Cycles Tab */}
            {activeTab === 'cycles' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search cycles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="all">All Periods</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    New Cycle
                  </button>
                </div>

                <div className="space-y-4">
                  {mockPayrollData.payrollCycles.map((cycle) => (
                    <div key={cycle.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium text-white">{cycle.period}</h3>
                            <p className="text-sm text-gray-400">
                              {cycle.employeeCount} employees • Due: {cycle.dueDate}
                            </p>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-sm rounded-full ${
                            cycle.status === 'Completed' 
                              ? 'bg-green-900 text-green-300' 
                              : cycle.status === 'Processing'
                              ? 'bg-yellow-900 text-yellow-300'
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {cycle.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-white">${cycle.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Total amount</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Salary Structures Tab */}
            {activeTab === 'structures' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Salary Structures</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Structure
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockPayrollData.salaryStructures.map((structure) => (
                    <div key={structure.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-white">{structure.name}</h4>
                        <button 
                          onClick={() => handleEditStructure(structure)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Base Salary:</span>
                          <span className="text-white">${structure.baseSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Allowances:</span>
                          <span className="text-green-400">+${structure.allowances.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deductions:</span>
                          <span className="text-red-400">-${structure.deductions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-2">
                          <span className="text-gray-400 font-medium">Net Salary:</span>
                          <span className="text-white font-medium">${structure.netSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Employees:</span>
                          <span className="text-blue-400">{structure.employeeCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deductions Tab */}
            {activeTab === 'deductions' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Deduction Types</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Deduction
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPayrollData.deductionTypes.map((deduction) => (
                    <div key={deduction.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{deduction.name}</h4>
                        <span className="px-2 py-1 text-xs bg-red-900 text-red-300 rounded">
                          {deduction.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-white font-medium">
                          {deduction.isPercentage ? `${deduction.rate}%` : `$${deduction.rate}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allowances Tab */}
            {activeTab === 'allowances' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Allowance Types</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus size={16} />
                    Add Allowance
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPayrollData.allowanceTypes.map((allowance) => (
                    <div key={allowance.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{allowance.name}</h4>
                        <span className="px-2 py-1 text-xs bg-green-900 text-green-300 rounded">
                          {allowance.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-white font-medium">
                          {allowance.isPercentage ? `${allowance.rate}%` : `$${allowance.rate}`}
                        </span>
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
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Payroll Analytics</h3>
                  <p className="text-gray-400 mb-6">Comprehensive payroll insights and cost analysis</p>
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
                <Calculator className="h-4 w-4" />
                <span>Calculate Payroll</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <FileText className="h-4 w-4" />
                <span>Generate Payslips</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Tax Reports</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <CreditCard className="h-4 w-4" />
                <span>Bank Transfer Setup</span>
              </button>
            </div>
          </div>

          {/* Payroll Status */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Current Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">December Payroll</span>
                <span className="text-yellow-400 text-sm">Processing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tax Calculations</span>
                <span className="text-green-400 text-sm">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Bank Transfers</span>
                <span className="text-gray-400 text-sm">Pending</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockPayrollData.recentActivity.map((activity) => (
                <div key={activity.id} className="text-sm">
                  <p className="text-gray-300">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.user} • {activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4">
              {modalType === 'create' ? 'Process New Payroll' : 'Edit Salary Structure'}
            </h3>
            <p className="text-gray-400 mb-6">
              {modalType === 'create' 
                ? 'Start processing payroll for the selected period.' 
                : 'Update salary structure details.'}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                {modalType === 'create' ? 'Start Processing' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}