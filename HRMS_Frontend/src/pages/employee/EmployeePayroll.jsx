import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Download, Eye, Calendar, TrendingUp, PieChart, CreditCard, Shield, Gift, Calculator, Award, Target } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { convertCurrency, formatCurrency as formatCurrencyUtil } from '../../utils/currencyConverter';
import CurrencySelector from '../../components/common/CurrencySelector';

const MOCK_PAYROLL_DATA = {
  currentSalary: {
    basic: 50000,
    hra: 20000,
    allowances: 15000,
    deductions: 8500,
    netSalary: 76500,
    currency: 'INR'
  },
  salarySlips: [
    { month: 'December 2024', gross: 85000, deductions: 8500, net: 76500, status: 'paid', date: '2024-12-01' },
    { month: 'November 2024', gross: 85000, deductions: 8500, net: 76500, status: 'paid', date: '2024-11-01' },
    { month: 'October 2024', gross: 85000, deductions: 8500, net: 76500, status: 'paid', date: '2024-10-01' },
    { month: 'September 2024', gross: 85000, deductions: 8500, net: 76500, status: 'paid', date: '2024-09-01' }
  ],
  taxDocuments: [
    { name: 'Form 16 - 2024', type: 'Tax Certificate', date: '2024-04-15', size: '2.3 MB' },
    { name: 'TDS Certificate Q3', type: 'TDS', date: '2024-01-15', size: '1.8 MB' },
    { name: 'Investment Declaration', type: 'Declaration', date: '2024-03-20', size: '1.2 MB' }
  ],
  benefits: {
    healthInsurance: { coverage: '5,00,000', premium: '12,000', status: 'active' },
    providentFund: { contribution: '6,000', employer: '6,000', total: '2,40,000' },
    gratuity: { eligible: true, amount: '1,25,000' },
    leaveEncashment: { available: 15, value: '45,000' }
  },
  yearlyBreakdown: [
    { month: 'Jan', gross: 85000, net: 76500 },
    { month: 'Feb', gross: 85000, net: 76500 },
    { month: 'Mar', gross: 85000, net: 76500 },
    { month: 'Apr', gross: 85000, net: 76500 },
    { month: 'May', gross: 85000, net: 76500 },
    { month: 'Jun', gross: 85000, net: 76500 },
    { month: 'Jul', gross: 85000, net: 76500 },
    { month: 'Aug', gross: 85000, net: 76500 },
    { month: 'Sep', gross: 85000, net: 76500 },
    { month: 'Oct', gross: 85000, net: 76500 },
    { month: 'Nov', gross: 85000, net: 76500 },
    { month: 'Dec', gross: 85000, net: 76500 }
  ]
};

export default function EmployeePayroll() {
  const [payrollData, setPayrollData] = useState(MOCK_PAYROLL_DATA);
  const [convertedData, setConvertedData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isConverting, setIsConverting] = useState(false);
  const { selectedCurrency } = useCurrency();

  // Convert payroll data when currency changes
  useEffect(() => {
    const convertPayrollData = async () => {
      if (selectedCurrency === payrollData.currentSalary.currency) {
        setConvertedData(null);
        return;
      }

      setIsConverting(true);
      try {
        const converted = {
          currentSalary: {
            basic: await convertCurrency(payrollData.currentSalary.basic, payrollData.currentSalary.currency, selectedCurrency),
            hra: await convertCurrency(payrollData.currentSalary.hra, payrollData.currentSalary.currency, selectedCurrency),
            allowances: await convertCurrency(payrollData.currentSalary.allowances, payrollData.currentSalary.currency, selectedCurrency),
            deductions: await convertCurrency(payrollData.currentSalary.deductions, payrollData.currentSalary.currency, selectedCurrency),
            netSalary: await convertCurrency(payrollData.currentSalary.netSalary, payrollData.currentSalary.currency, selectedCurrency),
            currency: selectedCurrency
          },
          salarySlips: await Promise.all(payrollData.salarySlips.map(async (slip) => ({
            ...slip,
            gross: await convertCurrency(slip.gross, payrollData.currentSalary.currency, selectedCurrency),
            deductions: await convertCurrency(slip.deductions, payrollData.currentSalary.currency, selectedCurrency),
            net: await convertCurrency(slip.net, payrollData.currentSalary.currency, selectedCurrency)
          }))),
          yearlyBreakdown: await Promise.all(payrollData.yearlyBreakdown.map(async (month) => ({
            ...month,
            gross: await convertCurrency(month.gross, payrollData.currentSalary.currency, selectedCurrency),
            net: await convertCurrency(month.net, payrollData.currentSalary.currency, selectedCurrency)
          })))
        };
        setConvertedData(converted);
      } catch (error) {
        console.error('Error converting currency:', error);
      } finally {
        setIsConverting(false);
      }
    };

    convertPayrollData();
  }, [selectedCurrency, payrollData]);

  const formatCurrency = (amount) => {
    const currency = convertedData?.currentSalary.currency || payrollData.currentSalary.currency;
    return formatCurrencyUtil(amount, currency);
  };

  const getCurrentData = () => {
    return convertedData || payrollData;
  };

  const tabs = [
    { id: 'overview', label: 'Salary Overview', icon: DollarSign },
    { id: 'slips', label: 'Salary Slips', icon: FileText },
    { id: 'tax', label: 'Tax Documents', icon: Calculator },
    { id: 'benefits', label: 'Benefits', icon: Gift },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const renderOverview = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="space-y-8">
        {/* Currency Selector */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-100">Payroll Overview</h2>
          <div className="flex items-center gap-4">
            {isConverting && (
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                Converting...
              </div>
            )}
            <CurrencySelector />
          </div>
        </div>

        {/* Current Salary Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salary Components */}
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <DollarSign className="text-green-400" size={20} />
              Salary Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30">
                <span className="text-gray-300">Basic Salary</span>
                <span className="text-green-400 font-semibold">{formatCurrency(currentData.currentSalary.basic)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-500/30">
                <span className="text-gray-300">HRA</span>
                <span className="text-blue-400 font-semibold">{formatCurrency(currentData.currentSalary.hra)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
                <span className="text-gray-300">Allowances</span>
                <span className="text-purple-400 font-semibold">{formatCurrency(currentData.currentSalary.allowances)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg border border-red-500/30">
                <span className="text-gray-300">Deductions</span>
                <span className="text-red-400 font-semibold">-{formatCurrency(currentData.currentSalary.deductions)}</span>
              </div>
              
              <div className="border-t border-gray-700/50 pt-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                  <span className="text-gray-100 font-semibold">Net Salary</span>
                  <span className="text-yellow-400 font-bold text-xl">{formatCurrency(currentData.currentSalary.netSalary)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Visualization */}
          <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
              <PieChart className="text-indigo-400" size={20} />
              Salary Distribution
            </h3>
            
            <div className="space-y-6">
              {/* Visual representation */}
              <div className="relative">
                <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div className="bg-green-500" style={{ width: '58.8%' }}></div>
                    <div className="bg-blue-500" style={{ width: '23.5%' }}></div>
                    <div className="bg-purple-500" style={{ width: '17.7%' }}></div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Basic Salary (58.8%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">HRA (23.5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Allowances (17.7%)</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{formatCurrency(currentData.currentSalary.netSalary * 12)}</div>
                  <div className="text-sm text-gray-400">Annual CTC</div>
                </div>
                <div className="text-center p-4 bg-[#2A2D3D]/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{formatCurrency(currentData.currentSalary.deductions * 12)}</div>
                  <div className="text-sm text-gray-400">Annual Deductions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
            <Calendar className="text-indigo-400" size={20} />
            Recent Payments
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(convertedData?.salarySlips || payrollData.salarySlips).slice(0, 4).map((slip, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-lg p-4 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{slip.month}</span>
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                    {slip.status}
                  </span>
                </div>
                <div className="text-lg font-semibold text-indigo-400">{formatCurrency(slip.net)}</div>
                <div className="text-xs text-gray-500">Paid on {new Date(slip.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSalarySlips = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <FileText className="text-indigo-400" size={20} />
            Salary Slips
          </h3>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
            <Download size={16} />
            Download All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Month</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Gross Salary</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Deductions</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Net Salary</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(currentData.salarySlips || payrollData.salarySlips).map((slip, index) => (
                <tr key={index} className="border-b border-gray-700/30 hover:bg-[#2A2D3D]/30 transition-colors">
                  <td className="py-4 px-4 text-gray-200 font-medium">{slip.month}</td>
                  <td className="py-4 px-4 text-gray-200">{formatCurrency(slip.gross)}</td>
                  <td className="py-4 px-4 text-red-400">{formatCurrency(slip.deductions)}</td>
                  <td className="py-4 px-4 text-green-400 font-semibold">{formatCurrency(slip.net)}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                      {slip.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTaxDocuments = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            <Calculator className="text-indigo-400" size={20} />
            Tax Documents
          </h3>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
            Request Document
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payrollData.taxDocuments.map((doc, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-600/20 rounded-lg">
                    <FileText className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">{doc.name}</h4>
                    <p className="text-sm text-gray-400">{doc.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{doc.date}</span>
                <span>{doc.size}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Eye size={14} />
                  View
                </button>
                <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Summary */}
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Target className="text-purple-400" size={20} />
          Tax Summary (FY 2024-25)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-lg border border-red-500/30">
            <div className="text-2xl font-bold text-red-400">₹1,02,000</div>
            <div className="text-sm text-gray-400">Total Tax Deducted</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">₹1,50,000</div>
            <div className="text-sm text-gray-400">Tax Savings</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400">₹25,000</div>
            <div className="text-sm text-gray-400">Expected Refund</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Insurance */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Shield className="text-green-400" size={20} />
            Health Insurance
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Coverage Amount</span>
              <span className="text-green-400 font-semibold">₹{payrollData.benefits.healthInsurance.coverage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Annual Premium</span>
              <span className="text-gray-200">₹{payrollData.benefits.healthInsurance.premium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status</span>
              <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                {payrollData.benefits.healthInsurance.status}
              </span>
            </div>
          </div>
        </div>

        {/* Provident Fund */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <CreditCard className="text-blue-400" size={20} />
            Provident Fund
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Your Contribution</span>
              <span className="text-blue-400 font-semibold">₹{payrollData.benefits.providentFund.contribution}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Employer Contribution</span>
              <span className="text-gray-200">₹{payrollData.benefits.providentFund.employer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Balance</span>
              <span className="text-green-400 font-semibold">₹{payrollData.benefits.providentFund.total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gratuity */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Award className="text-purple-400" size={20} />
            Gratuity
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Eligibility</span>
              <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                Eligible
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Amount</span>
              <span className="text-purple-400 font-semibold">₹{payrollData.benefits.gratuity.amount}</span>
            </div>
          </div>
        </div>

        {/* Leave Encashment */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Calendar className="text-yellow-400" size={20} />
            Leave Encashment
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available Days</span>
              <span className="text-yellow-400 font-semibold">{payrollData.benefits.leaveEncashment.available} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Encashment Value</span>
              <span className="text-green-400 font-semibold">₹{payrollData.benefits.leaveEncashment.value}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Yearly Earnings Chart */}
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <TrendingUp className="text-indigo-400" size={20} />
          Yearly Earnings Trend
        </h3>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {payrollData.yearlyBreakdown.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500"
                style={{ height: `${(month.net / 85000) * 100}%`, minHeight: '8px' }}
              ></div>
              <div className="mt-2 text-xs text-gray-400">{month.month}</div>
              <div className="text-xs text-gray-300 font-medium">₹{(month.net / 1000).toFixed(0)}k</div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">₹9.18L</div>
          <div className="text-gray-400">Annual CTC</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl border border-blue-500/30 p-6 text-center">
          <div className="text-3xl font-bold text-blue-400">₹8.16L</div>
          <div className="text-gray-400">Take Home</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30 p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">₹1.02L</div>
          <div className="text-gray-400">Total Deductions</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30 p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400">₹1.50L</div>
          <div className="text-gray-400">Tax Savings</div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'slips': return renderSalarySlips();
      case 'tax': return renderTaxDocuments();
      case 'benefits': return renderBenefits();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Payroll & Benefits
        </h1>
        <p className="text-gray-400 mt-2">Manage your salary, benefits, and tax information</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#2A2D3D]/50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {renderTabContent()}
      </div>
    </div>
  );
}