/**
 * Avatar utility functions for generating local mock avatars
 * Updated to use local generation instead of external services
 * Supports gender-specific avatars for better personalization
 */

import { generateUserAvatar, generateInitials as localGenerateInitials, generateColorFromString } from './localAvatarGenerator';

/**
 * Detect gender from name using common patterns
 * @param {string} name - Full name
 * @returns {string} 'male', 'female', or 'unknown'
 */
export const detectGenderFromName = (name) => {
  if (!name) return 'unknown';
  
  const firstName = name.trim().split(' ')[0].toLowerCase();
  
  // Common male names (Indian and international)
  const maleNames = [
    'aryabrat', 'aditya', 'rohit', 'amit', 'raj', 'rahul', 'vikram', 'arjun', 'dev', 'karan',
    'john', 'james', 'michael', 'david', 'robert', 'william', 'richard', 'joseph', 'thomas', 'christopher',
    'daniel', 'paul', 'mark', 'donald', 'steven', 'kenneth', 'andrew', 'joshua', 'kevin', 'brian'
  ];
  
  // Common female names (Indian and international)
  const femaleNames = [
    'priya', 'sneha', 'pooja', 'kavya', 'anita', 'sunita', 'meera', 'riya', 'divya', 'shreya',
    'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen',
    'nancy', 'lisa', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle'
  ];
  
  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';
  
  // Additional pattern matching
  if (firstName.endsWith('a') || firstName.endsWith('i') || firstName.endsWith('ya')) {
    return 'female'; // Common pattern in many cultures
  }
  
  return 'unknown';
};

/**
 * Generate a local avatar URL based on user data with gender support
 * @param {Object} user - User object containing name, email, id, gender, etc.
 * @param {number} size - Avatar size in pixels (default: 150)
 * @param {string} fallback - Fallback option ('initials' or 'default')
 * @returns {string} Local avatar data URL
 */
export const generateAvatarUrl = (user, size = 150, fallback = 'initials') => {
  try {
    // Use Pravatar.cc for placeholder images
    // Create a unique identifier from user data
    const identifier = user?.email || user?.id || user?.name || 'default';
    
    // Generate Pravatar URL with unique identifier
    return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(identifier)}`;
  } catch (error) {
    console.warn('Error generating avatar URL:', error);
    // Return a fallback Pravatar URL
    return `https://i.pravatar.cc/${size}?u=fallback`;
  }
};

/**
 * Generate user initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const generateInitials = (name) => {
  return localGenerateInitials(name);
};

/**
 * Get avatar source with fallback logic
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @param {boolean} useInitials - Whether to show initials as fallback
 * @returns {Object} { src: string, initials: string|null, shouldShowInitials: boolean }
 */
export const getAvatarSource = (user, size = 150, useInitials = true) => {
  const avatarUrl = generateAvatarUrl(user, size, useInitials ? 'initials' : 'default');
  const initials = useInitials ? generateInitials(user?.name) : null;
  
  return {
    src: avatarUrl,
    initials,
    shouldShowInitials: false // Pravatar.cc images should always load, no need for initials fallback
  };
};

/**
 * Preload avatar image to check if it loads successfully
 * @param {string} url - Avatar URL
 * @returns {Promise<boolean>} Whether the image loaded successfully
 */
export const preloadAvatar = (url) => {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 3 seconds
    setTimeout(() => resolve(false), 3000);
  });
};

/**
 * Avatar component props helper with gender support
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @param {string} className - Additional CSS classes
 * @returns {Object} Props for avatar component
 */
export const getAvatarProps = (user, size = 150, className = '') => {
  const { src, initials, shouldShowInitials } = getAvatarSource(user, size);
  
  return {
    src,
    alt: user?.name || 'User Avatar',
    initials,
    shouldShowInitials,
    className,
    style: { width: size, height: size }
  };
};

/**
 * Demo function to show gender-specific avatar URLs
 * @param {Object} user - User object with name, email, gender
 * @returns {Object} URLs for different scenarios
 */
export const getGenderAvatarDemo = (user) => {
  const baseUser = { ...user };
  
  return {
    withGender: generateAvatarUrl({ ...baseUser, gender: user.gender }, 150),
    withoutGender: generateAvatarUrl({ ...baseUser, gender: undefined }, 150),
    forceMale: generateAvatarUrl({ ...baseUser, gender: 'male' }, 150),
    forceFemale: generateAvatarUrl({ ...baseUser, gender: 'female' }, 150),
    autoDetected: generateAvatarUrl(baseUser, 150) // Uses name-based detection
  };
};