import React, { useState } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

export default function CurrencySelector({ className = '' }) {
  const { selectedCurrency, supportedCurrencies, changeCurrency, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = async (currencyCode) => {
    await changeCurrency(currencyCode);
    setIsOpen(false);
  };

  const currentCurrency = supportedCurrencies[selectedCurrency];

  return (
    <div className={`relative ${className}`}>
      {/* Currency Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 rounded-lg hover:border-indigo-500/50 transition-all duration-300 text-gray-300 hover:text-white min-w-[120px]"
      >
        <Globe size={16} className="text-indigo-400" />
        <span className="text-sm font-medium">
          {currentCurrency?.flag} {selectedCurrency}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] border border-gray-700/50 rounded-xl shadow-2xl z-20 backdrop-blur-sm">
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700/50 mb-2">
                Select Currency
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {Object.entries(supportedCurrencies).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => handleCurrencyChange(code)}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      selectedCurrency === code
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                        : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{info.flag}</span>
                      <div>
                        <div className="text-sm font-medium">{code}</div>
                        <div className="text-xs text-gray-400">{info.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{info.symbol}</span>
                      {selectedCurrency === code && (
                        <Check size={16} className="text-indigo-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-3 py-2 border-t border-gray-700/50 text-xs text-gray-500">
              Exchange rates updated hourly
            </div>
          </div>
        </>
      )}
    </div>
  );
}