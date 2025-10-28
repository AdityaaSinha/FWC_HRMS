// Currency Converter Utility
// Supports real-time exchange rates and multiple currencies

const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' }
};

// Cache for exchange rates
let exchangeRatesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Free API for exchange rates (using exchangerate-api.com)
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

/**
 * Fetch exchange rates from API
 * @param {string} baseCurrency - Base currency code (default: USD)
 * @returns {Promise<Object>} Exchange rates object
 */
async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return fallback rates if API fails
    return getFallbackRates(baseCurrency);
  }
}

/**
 * Get cached exchange rates or fetch new ones
 * @param {string} baseCurrency - Base currency code
 * @returns {Promise<Object>} Exchange rates object
 */
async function getExchangeRates(baseCurrency = 'USD') {
  const now = Date.now();
  
  // Check if cache is valid
  if (exchangeRatesCache && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    return exchangeRatesCache;
  }
  
  // Fetch new rates
  const rates = await fetchExchangeRates(baseCurrency);
  exchangeRatesCache = rates;
  lastFetchTime = now;
  
  return rates;
}

/**
 * Fallback exchange rates (approximate values)
 * Used when API is unavailable
 */
function getFallbackRates(baseCurrency = 'USD') {
  const fallbackRates = {
    USD: { USD: 1, EUR: 0.85, GBP: 0.73, INR: 83.12, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, SGD: 1.35 },
    EUR: { USD: 1.18, EUR: 1, GBP: 0.86, INR: 98.0, JPY: 129.5, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.6, SGD: 1.59 },
    GBP: { USD: 1.37, EUR: 1.16, GBP: 1, INR: 113.9, JPY: 150.7, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.84, SGD: 1.85 },
    INR: { USD: 0.012, EUR: 0.010, GBP: 0.0088, INR: 1, JPY: 1.32, CAD: 0.015, AUD: 0.016, CHF: 0.011, CNY: 0.078, SGD: 0.016 }
  };
  
  return fallbackRates[baseCurrency] || fallbackRates.USD;
}

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {Promise<number>} Converted amount
 */
export async function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  try {
    // Get exchange rates with USD as base
    const rates = await getExchangeRates('USD');
    
    // Convert to USD first, then to target currency
    let usdAmount = amount;
    if (fromCurrency !== 'USD') {
      usdAmount = amount / rates[fromCurrency];
    }
    
    // Convert from USD to target currency
    let convertedAmount = usdAmount;
    if (toCurrency !== 'USD') {
      convertedAmount = usdAmount * rates[toCurrency];
    }
    
    return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Currency conversion error:', error);
    return amount; // Return original amount if conversion fails
  }
}

/**
 * Format currency amount with proper symbol and locale
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @param {string} locale - Locale for formatting (optional)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  
  if (!currencyInfo) {
    return `${amount} ${currency}`;
  }
  
  try {
    // Use Intl.NumberFormat for proper formatting
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2
    });
    
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting
    return `${currencyInfo.symbol}${amount.toLocaleString()}`;
  }
}

/**
 * Get currency information
 * @param {string} currency - Currency code
 * @returns {Object} Currency information object
 */
export function getCurrencyInfo(currency) {
  return SUPPORTED_CURRENCIES[currency] || { symbol: currency, name: currency, flag: '💱' };
}

/**
 * Get list of all supported currencies
 * @returns {Object} Object with currency codes as keys and info as values
 */
export function getSupportedCurrencies() {
  return SUPPORTED_CURRENCIES;
}

/**
 * Convert multiple amounts in an object
 * @param {Object} amounts - Object with amount properties
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {Promise<Object>} Object with converted amounts
 */
export async function convertMultipleAmounts(amounts, fromCurrency, toCurrency) {
  const converted = {};
  
  for (const [key, value] of Object.entries(amounts)) {
    if (typeof value === 'number') {
      converted[key] = await convertCurrency(value, fromCurrency, toCurrency);
    } else {
      converted[key] = value;
    }
  }
  
  return converted;
}

/**
 * Get exchange rate between two currencies
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {Promise<number>} Exchange rate
 */
export async function getExchangeRate(fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return 1;
  }
  
  const convertedAmount = await convertCurrency(1, fromCurrency, toCurrency);
  return convertedAmount;
}

export default {
  convertCurrency,
  formatCurrency,
  getCurrencyInfo,
  getSupportedCurrencies,
  convertMultipleAmounts,
  getExchangeRate
};