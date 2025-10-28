import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupportedCurrencies } from '../utils/currencyConverter';

// Create Currency Context
const CurrencyContext = createContext();

// Currency Provider Component
export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [supportedCurrencies] = useState(getSupportedCurrencies());
  const [isLoading, setIsLoading] = useState(false);

  // Load saved currency preference from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('hrms_preferred_currency');
    if (savedCurrency && supportedCurrencies[savedCurrency]) {
      setSelectedCurrency(savedCurrency);
    }
  }, [supportedCurrencies]);

  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('hrms_preferred_currency', selectedCurrency);
  }, [selectedCurrency]);

  // Function to change currency
  const changeCurrency = async (newCurrency) => {
    if (supportedCurrencies[newCurrency]) {
      setIsLoading(true);
      try {
        setSelectedCurrency(newCurrency);
        // You can add any additional logic here like updating user preferences in backend
      } catch (error) {
        console.error('Error changing currency:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Get currency info for selected currency
  const getCurrentCurrencyInfo = () => {
    return supportedCurrencies[selectedCurrency];
  };

  const contextValue = {
    selectedCurrency,
    supportedCurrencies,
    isLoading,
    changeCurrency,
    getCurrentCurrencyInfo
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook to use currency context
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export default CurrencyContext;