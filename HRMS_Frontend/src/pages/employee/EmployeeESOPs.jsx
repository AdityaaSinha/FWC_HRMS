import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart, 
  BarChart3, 
  Clock, 
  Award, 
  Target, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Download, 
  Filter, 
  Search,
  Info,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase,
  Building,
  Users,
  Activity,
  LineChart,
  Percent,
  Calculator,
  FileText,
  Bell,
  Settings,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '../../contexts/CurrencyContext';
import { convertCurrency, formatCurrency as formatCurrencyUtil } from '../../utils/currencyConverter';
import CurrencySelector from '../../components/common/CurrencySelector';

const EmployeeESOPs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [showCalculator, setShowCalculator] = useState(false);
  const [convertedData, setConvertedData] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const { selectedCurrency } = useCurrency();

  // Mock ESOP data
  const esopData = {
    totalShares: 2500,
    vestedShares: 1200,
    unvestedShares: 1300,
    currentValue: 125000,
    totalValue: 250000,
    vestingProgress: 48,
    nextVestingDate: '2024-06-15',
    nextVestingShares: 312,
    exercisePrice: 25.00,
    currentStockPrice: 50.00,
    potentialGain: 62500,
    vestingSchedule: [
      { date: '2023-06-15', shares: 625, status: 'vested', value: 31250 },
      { date: '2023-12-15', shares: 575, status: 'vested', value: 28750 },
      { date: '2024-06-15', shares: 312, status: 'pending', value: 15600 },
      { date: '2024-12-15', shares: 313, status: 'pending', value: 15650 },
      { date: '2025-06-15', shares: 337, status: 'pending', value: 16850 },
      { date: '2025-12-15', shares: 338, status: 'pending', value: 16900 }
    ],
    performanceMetrics: {
      stockGrowth: 15.8,
      portfolioReturn: 22.4,
      yearToDateGain: 8750,
      totalReturn: 45600
    }
  };

  // Convert ESOP data when currency changes
  useEffect(() => {
    const convertESOPData = async () => {
      if (!selectedCurrency) return;
      
      setIsConverting(true);
      try {
        const converted = {
          ...esopData,
          currentValue: await convertCurrency(esopData.currentValue, 'USD', selectedCurrency),
          totalValue: await convertCurrency(esopData.totalValue, 'USD', selectedCurrency),
          exercisePrice: await convertCurrency(esopData.exercisePrice, 'USD', selectedCurrency),
          currentStockPrice: await convertCurrency(esopData.currentStockPrice, 'USD', selectedCurrency),
          potentialGain: await convertCurrency(esopData.potentialGain, 'USD', selectedCurrency),
          vestingSchedule: await Promise.all(
            esopData.vestingSchedule.map(async (item) => ({
              ...item,
              value: await convertCurrency(item.value, 'USD', selectedCurrency)
            }))
          ),
          performanceMetrics: {
            ...esopData.performanceMetrics,
            yearToDateGain: await convertCurrency(esopData.performanceMetrics.yearToDateGain, 'USD', selectedCurrency),
            totalReturn: await convertCurrency(esopData.performanceMetrics.totalReturn, 'USD', selectedCurrency)
          }
        };
        setConvertedData(converted);
      } catch (error) {
        console.error('Error converting ESOP data:', error);
        setConvertedData(esopData);
      } finally {
        setIsConverting(false);
      }
    };

    convertESOPData();
  }, [selectedCurrency]);

  const getCurrentData = () => {
    return convertedData || esopData;
  };

  const formatCurrency = (amount) => {
    if (!selectedCurrency) return `$${amount.toLocaleString()}`;
    return formatCurrencyUtil(amount, selectedCurrency);
  };

  // Export functionality
  const handleExportData = () => {
    try {
      const currentData = getCurrentData();
      const exportData = {
        employeeESOPs: {
          summary: {
            totalShares: currentData.totalShares,
            vestedShares: currentData.vestedShares,
            unvestedShares: currentData.unvestedShares,
            currentValue: currentData.currentValue,
            totalValue: currentData.totalValue,
            potentialGain: currentData.potentialGain,
            vestingProgress: currentData.vestingProgress,
            nextVestingDate: currentData.nextVestingDate,
            nextVestingShares: currentData.nextVestingShares,
            exercisePrice: currentData.exercisePrice,
            currentStockPrice: currentData.currentStockPrice
          },
          vestingSchedule: currentData.vestingSchedule,
          performanceMetrics: currentData.performanceMetrics,
          currency: selectedCurrency || 'USD',
          exportDate: new Date().toISOString(),
          exportTime: new Date().toLocaleString()
        }
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ESOP_Data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('ESOP data exported successfully');
    } catch (error) {
      console.error('Error exporting ESOP data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  // Document download functionality
  const handleDocumentDownload = (doc) => {
    try {
      // In a real application, this would download the actual file from a server
      // For now, we'll simulate the download with a mock file
      const mockFileContent = `Document: ${doc.name}\nType: ${doc.type}\nSize: ${doc.size}\nDate: ${doc.date}\n\nThis is a mock document for demonstration purposes.`;
      const dataBlob = new Blob([mockFileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Downloaded: ${doc.name}`);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  const stockHistory = [
    { date: '2023-01', price: 42.50 },
    { date: '2023-02', price: 44.20 },
    { date: '2023-03', price: 41.80 },
    { date: '2023-04', price: 45.60 },
    { date: '2023-05', price: 47.30 },
    { date: '2023-06', price: 46.90 },
    { date: '2023-07', price: 48.75 },
    { date: '2023-08', price: 49.20 },
    { date: '2023-09', price: 47.85 },
    { date: '2023-10', price: 51.40 },
    { date: '2023-11', price: 52.10 },
    { date: '2023-12', price: 50.00 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'vesting', label: 'Vesting Schedule', icon: Calendar },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const renderOverview = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="space-y-6">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-auto-fit gap-4 sm:gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 min-h-[140px] sm:min-h-[160px]"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg transition-all duration-300 hover:bg-green-500/30">
              <DollarSign className="text-green-400" size={20} />
            </div>
            {/* Generated Image 1: Stock Chart */}
            <svg width="50" height="35" viewBox="0 0 60 40" className="text-green-400 sm:w-[60px] sm:h-[40px]">
              <path d="M5 35 Q15 25 25 30 T55 15" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="25" cy="30" r="2" fill="currentColor"/>
              <circle cx="45" cy="20" r="2" fill="currentColor"/>
              <text x="30" y="10" textAnchor="middle" className="text-xs fill-current">↗ 12%</text>
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-xs sm:text-sm">Current Value</p>
            <p className="text-xl sm:text-2xl font-bold text-white break-words">{formatCurrency(currentData.currentValue)}</p>
          </div>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 min-h-[140px] sm:min-h-[160px]"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg transition-all duration-300 hover:bg-blue-500/30">
                <Target className="text-blue-400" size={20} />
              </div>
              {/* Generated Image 2: Progress Ring */}
              <svg width="45" height="45" viewBox="0 0 50 50" className="text-blue-400 sm:w-[50px] sm:h-[50px]">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" 
                  strokeDasharray={`${esopData.vestingProgress * 1.26} 126`} 
                  strokeDashoffset="31.5" 
                  transform="rotate(-90 25 25)"/>
                <text x="25" y="30" textAnchor="middle" className="text-xs fill-current">{esopData.vestingProgress}%</text>
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-xs sm:text-sm">Vested Shares</p>
              <p className="text-xl sm:text-2xl font-bold text-white break-words">{esopData.vestedShares.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 min-h-[140px] sm:min-h-[160px]"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg transition-all duration-300 hover:bg-purple-500/30">
                <TrendingUp className="text-purple-400" size={20} />
              </div>
              {/* Generated Image 3: Gain Arrow */}
              <svg width="50" height="35" viewBox="0 0 60 40" className="text-purple-400 sm:w-[60px] sm:h-[40px]">
                <path d="M10 30 L30 10 L50 15" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M45 10 L50 15 L45 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="10" r="3" fill="currentColor"/>
                <text x="30" y="35" textAnchor="middle" className="text-xs fill-current">+{((esopData.potentialGain/esopData.currentValue)*100).toFixed(1)}%</text>
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-xs sm:text-sm">Potential Gain</p>
              <p className="text-xl sm:text-2xl font-bold text-white break-words">{formatCurrency(currentData.potentialGain)}</p>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-4 sm:p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 min-h-[140px] sm:min-h-[160px]"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg transition-all duration-300 hover:bg-orange-500/30">
              <Clock className="text-orange-400" size={20} />
            </div>
            {/* Generated Image 4: Calendar Timeline */}
            <svg width="50" height="35" viewBox="0 0 60 40" className="text-orange-400 sm:w-[60px] sm:h-[40px]">
              <rect x="10" y="5" width="40" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="5" x2="15" y2="1" stroke="currentColor" strokeWidth="2"/>
              <line x1="25" y1="5" x2="25" y2="1" stroke="currentColor" strokeWidth="2"/>
              <line x1="35" y1="5" x2="35" y2="1" stroke="currentColor" strokeWidth="2"/>
              <line x1="45" y1="5" x2="45" y2="1" stroke="currentColor" strokeWidth="2"/>
              <line x1="10" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="1"/>
              <circle cx="20" cy="20" r="2" fill="currentColor"/>
              <circle cx="30" cy="25" r="2" fill="currentColor"/>
              <circle cx="40" cy="20" r="2" fill="currentColor"/>
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-xs sm:text-sm">Next Vesting</p>
            <p className="text-xl sm:text-2xl font-bold text-white break-words">{new Date(esopData.nextVestingDate).toLocaleDateString()}</p>
          </div>
        </motion.div>
      </div>

      {/* Stock Performance Chart */}
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <LineChart className="text-indigo-400" size={20} />
            Stock Performance
          </h3>
          <div className="flex gap-2">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Chart Placeholder */}
        <div className="h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="text-indigo-400 mx-auto mb-2" size={48} />
            <p className="text-gray-400">Interactive Stock Chart</p>
            <p className="text-sm text-gray-500">Current Price: {formatCurrency(currentData.currentStockPrice)}</p>
          </div>
        </div>
      </div>

      {/* Vesting Progress */}
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Percent className="text-green-400" size={20} />
          Vesting Progress
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-white font-semibold">{esopData.vestingProgress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${esopData.vestingProgress}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{esopData.vestedShares}</div>
              <div className="text-sm text-gray-400">Vested Shares</div>
            </div>
            <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">{esopData.unvestedShares}</div>
              <div className="text-sm text-gray-400">Unvested Shares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const renderVestingSchedule = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="text-indigo-400" size={20} />
            Vesting Schedule
          </h3>
          
          <div className="space-y-4">
            {currentData.vestingSchedule.map((vest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  vest.status === 'vested' 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-gray-700/30 border-gray-600/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      vest.status === 'vested' 
                        ? 'bg-green-500/20' 
                        : 'bg-gray-600/20'
                    }`}>
                      {vest.status === 'vested' ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : (
                        <Clock className="text-gray-400" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{new Date(vest.date).toLocaleDateString()}</p>
                      <p className="text-gray-400 text-sm">{vest.shares} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{formatCurrency(vest.value)}</p>
                    <p className={`text-sm ${
                      vest.status === 'vested' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {vest.status === 'vested' ? 'Vested' : 'Pending'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPerformance = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(currentData.performanceMetrics).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-indigo-400" size={20} />
                <h4 className="text-white font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
              </div>
              <div className="text-2xl font-bold text-white">
                {key.includes('Growth') || key.includes('Return') ? `${value}%` : formatCurrency(value)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-400" size={20} />
            Portfolio Performance
          </h3>
          
          {/* Generated Performance Chart Placeholder */}
          <div className="h-80 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="text-green-400 mx-auto mb-2" size={48} />
              <p className="text-gray-400">Portfolio Performance Chart</p>
              <p className="text-sm text-gray-500">Total Return: +{currentData.performanceMetrics.portfolioReturn}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FileText className="text-indigo-400" size={20} />
          ESOP Documents
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'ESOP Agreement', type: 'PDF', size: '2.4 MB', date: '2023-01-15' },
            { name: 'Vesting Schedule', type: 'PDF', size: '1.2 MB', date: '2023-01-15' },
            { name: 'Stock Option Certificate', type: 'PDF', size: '890 KB', date: '2023-06-15' },
            { name: 'Tax Guidelines', type: 'PDF', size: '1.8 MB', date: '2024-01-01' }
          ].map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-indigo-400" size={20} />
                  <div>
                    <p className="text-white font-medium">{doc.name}</p>
                    <p className="text-gray-400 text-sm">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDocumentDownload(doc)}
                  className="p-2 bg-indigo-500/20 rounded-lg hover:bg-indigo-500/30 transition-colors"
                  title={`Download ${doc.name}`}
                >
                  <Download className="text-indigo-400" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1B1E2B] to-[#2A2D3D] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              Employee Stock Options
            </h1>
            <p className="text-gray-400 mt-1">Track your equity compensation and vesting schedule</p>
          </div>
          
          <div className="flex gap-3">
            <CurrencySelector />
            {isConverting && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
                <span className="text-gray-300 text-sm">Converting...</span>
              </div>
            )}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              Calculator
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-[#1B1E2B]/50 p-2 rounded-xl border border-gray-700/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'vesting' && renderVestingSchedule()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'documents' && renderDocuments()}
        </div>

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calculator className="text-indigo-400" size={20} />
                  ESOP Calculator
                </h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Number of Shares</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                    placeholder="Enter shares"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Exercise Price ($)</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                    placeholder="25.00"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Stock Price ($)</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                    placeholder="50.00"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Potential Gain:</span>
                    <span className="text-green-400 font-bold text-lg">{formatCurrency(62500)}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors">
                  Calculate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeESOPs;