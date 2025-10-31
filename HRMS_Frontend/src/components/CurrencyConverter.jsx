import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, ArrowRightLeft, TrendingUp, Globe } from 'lucide-react';

const CurrencyConverter = ({ initialAmount = 0, onConvert = () => {} }) => {
  const [amount, setAmount] = useState(initialAmount);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Common currencies for HR/Benefits
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' }
  ];

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const mockExchangeRates = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'USD-JPY': 110.0,
    'USD-CHF': 0.92,
    'USD-SEK': 8.5,
    'USD-NOK': 8.8,
    'USD-DKK': 6.3,
    'EUR-USD': 1.18,
    'EUR-GBP': 0.86,
    'EUR-CAD': 1.47,
    'EUR-AUD': 1.59,
    'EUR-JPY': 129.4,
    'EUR-CHF': 1.08,
    'EUR-SEK': 10.0,
    'EUR-NOK': 10.35,
    'EUR-DKK': 7.44,
    'GBP-USD': 1.37,
    'GBP-EUR': 1.16,
    'GBP-CAD': 1.71,
    'GBP-AUD': 1.85,
    'GBP-JPY': 150.7,
    'GBP-CHF': 1.26,
    'GBP-SEK': 11.64,
    'GBP-NOK': 12.05,
    'GBP-DKK': 8.64
  };

  const getExchangeRate = (from, to) => {
    if (from === to) return 1;
    
    const key = `${from}-${to}`;
    const reverseKey = `${to}-${from}`;
    
    if (mockExchangeRates[key]) {
      return mockExchangeRates[key];
    } else if (mockExchangeRates[reverseKey]) {
      return 1 / mockExchangeRates[reverseKey];
    }
    
    // If direct rate not available, convert through USD
    if (from !== 'USD' && to !== 'USD') {
      const fromToUsd = mockExchangeRates[`${from}-USD`] || (1 / mockExchangeRates[`USD-${from}`]);
      const usdToTo = mockExchangeRates[`USD-${to}`] || (1 / mockExchangeRates[`${to}-USD`]);
      return fromToUsd * usdToTo;
    }
    
    return 1; // Fallback
  };

  const convertCurrency = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const rate = getExchangeRate(fromCurrency, toCurrency);
    const converted = amount * rate;
    
    setExchangeRate(rate);
    setConvertedAmount(converted);
    setLastUpdated(new Date());
    setIsLoading(false);
    
    onConvert({
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount: converted,
      exchangeRate: rate
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value, currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' ? 0 : 2
    }).format(value);
  };

  useEffect(() => {
    if (amount > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Currency Converter</h3>
          <p className="text-sm text-gray-400">Convert salaries and benefits between currencies</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
            <div className="flex gap-2">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <button
                onClick={swapCurrencies}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                title="Swap currencies"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={convertCurrency}
          disabled={isLoading || amount <= 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          {isLoading ? 'Converting...' : 'Convert'}
        </button>

        {/* Results */}
        {convertedAmount > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Converted Amount</span>
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">
                {formatCurrency(amount, fromCurrency)}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(convertedAmount, toCurrency)}
              </div>
              <div className="text-xs text-gray-500">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>
        )}

        {/* Quick Conversion Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Quick Convert</label>
          <div className="grid grid-cols-3 gap-2">
            {[50000, 75000, 100000].map(preset => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
              >
                ${preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;