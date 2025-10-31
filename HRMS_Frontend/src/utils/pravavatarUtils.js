/**
 * Pravatar.cc utility functions for generating realistic avatar URLs
 * Pravatar.cc provides a free service for placeholder avatars
 */

/**
 * Generate a Pravatar.cc URL based on user data
 * @param {Object} user - User object containing name, email, id, etc.
 * @param {number} size - Avatar size in pixels (default: 150)
 * @returns {string} Pravatar.cc URL
 */
export const generatePravavatarUrl = (user, size = 150) => {
  // Use email as seed if available, otherwise use name or id
  const seed = user?.email || user?.name || user?.id || 'default';
  
  // Create a simple hash from the seed to ensure consistent avatars
  const hash = seed.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Use the hash to select a consistent avatar (Pravatar has 70+ avatars)
  const avatarId = (hash % 70) + 1;
  
  return `https://i.pravatar.cc/${size}?img=${avatarId}`;
};

/**
 * Generate Pravatar URL with gender preference
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @param {string} gender - 'male', 'female', or 'random'
 * @returns {string} Pravatar.cc URL
 */
export const generateGenderPravavatarUrl = (user, size = 150, gender = 'random') => {
  const seed = user?.email || user?.name || user?.id || 'default';
  const hash = seed.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  let avatarId;
  
  if (gender === 'male') {
    // Male avatar IDs (approximate range)
    const maleIds = [1, 3, 5, 7, 8, 11, 12, 14, 15, 17, 18, 19, 20, 22, 24, 25, 26, 28, 30, 31, 33, 34, 36, 37, 39, 40, 41, 43, 45, 46, 47, 48, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 66, 67, 68, 69, 70];
    avatarId = maleIds[hash % maleIds.length];
  } else if (gender === 'female') {
    // Female avatar IDs (approximate range)
    const femaleIds = [2, 4, 6, 9, 10, 13, 16, 21, 23, 27, 29, 32, 35, 38, 42, 44, 49, 50, 55, 62, 65];
    avatarId = femaleIds[hash % femaleIds.length];
  } else {
    // Random avatar
    avatarId = (hash % 70) + 1;
  }
  
  return `https://i.pravatar.cc/${size}?img=${avatarId}`;
};

/**
 * Detect gender from name and generate appropriate Pravatar URL
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @returns {string} Pravatar.cc URL
 */
export const generateSmartPravavatarUrl = (user, size = 150) => {
  const name = user?.name || '';
  const firstName = name.trim().split(' ')[0].toLowerCase();
  
  // Common male names
  const maleNames = [
    'aryabrat', 'aditya', 'rohit', 'amit', 'raj', 'rahul', 'vikram', 'arjun', 'dev', 'karan',
    'john', 'james', 'michael', 'david', 'robert', 'william', 'richard', 'joseph', 'thomas', 'christopher',
    'daniel', 'paul', 'mark', 'donald', 'steven', 'kenneth', 'andrew', 'joshua', 'kevin', 'brian', 'alex', 'jordan'
  ];
  
  // Common female names
  const femaleNames = [
    'priya', 'sneha', 'pooja', 'kavya', 'anita', 'sunita', 'meera', 'riya', 'divya', 'shreya',
    'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen',
    'nancy', 'lisa', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle', 'emily'
  ];
  
  let gender = 'random';
  
  if (maleNames.includes(firstName)) {
    gender = 'male';
  } else if (femaleNames.includes(firstName)) {
    gender = 'female';
  } else if (firstName.endsWith('a') || firstName.endsWith('i') || firstName.endsWith('ya')) {
    gender = 'female'; // Common pattern in many cultures
  }
  
  return generateGenderPravavatarUrl(user, size, gender);
};

/**
 * Get avatar URL with fallback to local generator
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @param {boolean} usePravatar - Whether to use Pravatar.cc (default: true)
 * @returns {string} Avatar URL
 */
export const getAvatarUrl = (user, size = 150, usePravatar = true) => {
  if (usePravatar) {
    return generateSmartPravavatarUrl(user, size);
  }
  
  // Fallback to local generator if needed
  const { generateUserAvatar } = require('./localAvatarGenerator');
  return generateUserAvatar(user, size, 'person');
};

/**
 * Convert existing avatar data to Pravatar URLs
 * @param {Array} users - Array of user objects with avatar properties
 * @param {number} size - Avatar size
 * @returns {Array} Users with updated Pravatar URLs
 */
export const convertToPravavatarUrls = (users, size = 150) => {
  return users.map(user => ({
    ...user,
    avatar: generateSmartPravavatarUrl(user, size)
  }));
};