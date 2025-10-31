import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
  ];

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  const handleCurrencySelect = (currency) => {
    onCurrencyChange(currency.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <Globe size={16} />
        <span className="font-medium">{currentCurrency.code}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
                    currency.code === selectedCurrency 
                      ? 'bg-gray-700 text-indigo-400' 
                      : 'text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-sm text-gray-400 ml-2">{currency.name}</span>
                    </div>
                    <span className="text-gray-400">{currency.symbol}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;