/**
 * Local Mock Avatar Generator
 * Generates SVG-based avatars without external dependencies
 * Supports initials, geometric patterns, and color variations
 */

/**
 * Generate a consistent color based on a string identifier
 * @param {string} identifier - String to generate color from
 * @returns {Object} { background: string, text: string }
 */
export const generateColorFromString = (identifier) => {
  if (!identifier) identifier = 'default';
  
  // Create a simple hash from the identifier
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Predefined color palette for consistent, professional avatars
  const colorPalettes = [
    { bg: '#3B82F6', text: '#FFFFFF' }, // Blue
    { bg: '#10B981', text: '#FFFFFF' }, // Emerald
    { bg: '#8B5CF6', text: '#FFFFFF' }, // Violet
    { bg: '#F59E0B', text: '#FFFFFF' }, // Amber
    { bg: '#EF4444', text: '#FFFFFF' }, // Red
    { bg: '#06B6D4', text: '#FFFFFF' }, // Cyan
    { bg: '#84CC16', text: '#FFFFFF' }, // Lime
    { bg: '#EC4899', text: '#FFFFFF' }, // Pink
    { bg: '#6366F1', text: '#FFFFFF' }, // Indigo
    { bg: '#14B8A6', text: '#FFFFFF' }, // Teal
    { bg: '#F97316', text: '#FFFFFF' }, // Orange
    { bg: '#A855F7', text: '#FFFFFF' }, // Purple
  ];
  
  const index = Math.abs(hash) % colorPalettes.length;
  return colorPalettes[index];
};

/**
 * Generate initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const generateInitials = (name) => {
  if (!name) return 'U';
  
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

/**
 * Generate a geometric pattern SVG background
 * @param {string} identifier - String to generate pattern from
 * @param {number} size - Size of the avatar
 * @returns {string} SVG pattern elements
 */
export const generateGeometricPattern = (identifier, size) => {
  if (!identifier) identifier = 'default';
  
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
    hash = hash & hash;
  }
  
  const patterns = [
    // Circles pattern
    () => {
      const circles = [];
      for (let i = 0; i < 3; i++) {
        const cx = (hash * (i + 1)) % size;
        const cy = (hash * (i + 2)) % size;
        const r = 8 + (hash % 12);
        circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,0.1)" />`);
      }
      return circles.join('');
    },
    
    // Rectangles pattern
    () => {
      const rects = [];
      for (let i = 0; i < 4; i++) {
        const x = (hash * (i + 1)) % (size - 20);
        const y = (hash * (i + 3)) % (size - 20);
        const width = 10 + (hash % 15);
        const height = 10 + (hash % 15);
        rects.push(`<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="rgba(255,255,255,0.08)" />`);
      }
      return rects.join('');
    },
    
    // Triangles pattern
    () => {
      const triangles = [];
      for (let i = 0; i < 3; i++) {
        const x1 = (hash * (i + 1)) % size;
        const y1 = (hash * (i + 2)) % size;
        const x2 = x1 + 15;
        const y2 = y1;
        const x3 = x1 + 7.5;
        const y3 = y1 + 13;
        triangles.push(`<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="rgba(255,255,255,0.06)" />`);
      }
      return triangles.join('');
    }
  ];
  
  const patternIndex = Math.abs(hash) % patterns.length;
  return patterns[patternIndex]();
};

/**
 * Generate a person silhouette pattern
 * @param {string} identifier - Unique identifier for consistent generation
 * @param {number} size - Avatar size
 * @returns {string} SVG person silhouette
 */
const generatePersonSilhouette = (identifier, size) => {
  const hash = identifier.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Different person silhouette styles
  const silhouettes = [
    // Professional person with suit
    () => `
      <g fill="rgba(255,255,255,0.15)">
        <!-- Head -->
        <circle cx="${centerX}" cy="${size * 0.3}" r="${size * 0.12}" />
        <!-- Body -->
        <rect x="${centerX - size * 0.08}" y="${size * 0.42}" width="${size * 0.16}" height="${size * 0.25}" rx="${size * 0.02}" />
        <!-- Shoulders -->
        <rect x="${centerX - size * 0.12}" y="${size * 0.42}" width="${size * 0.24}" height="${size * 0.08}" rx="${size * 0.02}" />
        <!-- Collar -->
        <polygon points="${centerX - size * 0.04},${size * 0.42} ${centerX + size * 0.04},${size * 0.42} ${centerX},${size * 0.48}" fill="rgba(255,255,255,0.1)" />
      </g>
    `,
    
    // Casual person
    () => `
      <g fill="rgba(255,255,255,0.15)">
        <!-- Head -->
        <circle cx="${centerX}" cy="${size * 0.28}" r="${size * 0.11}" />
        <!-- Body -->
        <ellipse cx="${centerX}" cy="${size * 0.55}" rx="${size * 0.1}" ry="${size * 0.2}" />
        <!-- Arms -->
        <ellipse cx="${centerX - size * 0.15}" cy="${size * 0.5}" rx="${size * 0.03}" ry="${size * 0.12}" />
        <ellipse cx="${centerX + size * 0.15}" cy="${size * 0.5}" rx="${size * 0.03}" ry="${size * 0.12}" />
      </g>
    `,
    
    // Modern avatar style
    () => `
      <g fill="rgba(255,255,255,0.15)">
        <!-- Head with hair -->
        <circle cx="${centerX}" cy="${size * 0.3}" r="${size * 0.13}" />
        <path d="M ${centerX - size * 0.13} ${size * 0.25} Q ${centerX} ${size * 0.15} ${centerX + size * 0.13} ${size * 0.25}" fill="rgba(255,255,255,0.1)" />
        <!-- Torso -->
        <path d="M ${centerX - size * 0.1} ${size * 0.43} Q ${centerX} ${size * 0.4} ${centerX + size * 0.1} ${size * 0.43} L ${centerX + size * 0.08} ${size * 0.65} L ${centerX - size * 0.08} ${size * 0.65} Z" />
      </g>
    `
  ];
  
  const silhouetteIndex = Math.abs(hash) % silhouettes.length;
  return silhouettes[silhouetteIndex]();
};
/**
 * @param {Object} options - Avatar generation options
 * @param {string} options.identifier - Unique identifier (email, id, name)
 * @param {string} options.name - Display name for initials
 * @param {number} options.size - Avatar size in pixels
 * @param {string} options.type - Avatar type: 'initials', 'geometric', 'minimal'
 * @returns {string} Data URL containing SVG avatar
 */
export const generateLocalAvatar = ({ 
  identifier = 'default', 
  name = '', 
  size = 150, 
  type = 'person' 
}) => {
  const colors = generateColorFromString(identifier);
  const initials = generateInitials(name || identifier);
  
  let svgContent = '';
  
  switch (type) {
    case 'person':
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="person-grad-${identifier}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors.bg}aa;stop-opacity:1" />
            </linearGradient>
            <radialGradient id="person-radial-${identifier}" cx="50%" cy="30%" r="70%">
              <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:1" />
            </radialGradient>
          </defs>
          <rect width="${size}" height="${size}" fill="url(#person-grad-${identifier})" />
          <rect width="${size}" height="${size}" fill="url(#person-radial-${identifier})" />
          ${generatePersonSilhouette(identifier, size)}
          <text x="50%" y="85%" text-anchor="middle" dy="0.35em" 
                font-family="system-ui, -apple-system, sans-serif" 
                font-size="${size * 0.2}" 
                font-weight="500" 
                fill="${colors.text}" 
                opacity="0.8">
            ${initials}
          </text>
        </svg>
      `;
      break;
      
    case 'geometric':
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-${identifier}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors.bg}dd;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${size}" height="${size}" fill="url(#grad-${identifier})" />
          ${generateGeometricPattern(identifier, size)}
          <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
                font-family="system-ui, -apple-system, sans-serif" 
                font-size="${size * 0.4}" 
                font-weight="600" 
                fill="${colors.text}">
            ${initials}
          </text>
        </svg>
      `;
      break;
      
    case 'minimal':
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${colors.bg}" />
          <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
                font-family="system-ui, -apple-system, sans-serif" 
                font-size="${size * 0.35}" 
                font-weight="500" 
                fill="${colors.text}">
            ${initials}
          </text>
        </svg>
      `;
      break;
      
    default: // 'initials'
      svgContent = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-${identifier}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors.bg}cc;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${size}" height="${size}" fill="url(#bg-${identifier})" />
          <circle cx="${size/2}" cy="${size/2}" r="${size * 0.45}" fill="rgba(255,255,255,0.05)" />
          <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
                font-family="system-ui, -apple-system, sans-serif" 
                font-size="${size * 0.4}" 
                font-weight="600" 
                fill="${colors.text}">
            ${initials}
          </text>
        </svg>
      `;
  }
  
  // Convert SVG to data URL
  const encodedSvg = encodeURIComponent(svgContent.trim());
  return `data:image/svg+xml,${encodedSvg}`;
};

/**
 * Generate avatar with user data
 * @param {Object} user - User object with name, email, id, etc.
 * @param {number} size - Avatar size
 * @param {string} type - Avatar type
 * @returns {string} Data URL for avatar
 */
export const generateUserAvatar = (user, size = 150, type = 'person') => {
  const identifier = user?.email || user?.id || user?.name || 'anonymous';
  const name = user?.name || user?.email || 'User';
  
  return generateLocalAvatar({
    identifier,
    name,
    size,
    type
  });
};

/**
 * Generate avatar props for React components
 * @param {Object} user - User object
 * @param {number} size - Avatar size
 * @param {string} type - Avatar type
 * @param {string} className - CSS classes
 * @returns {Object} Props for img element
 */
export const getLocalAvatarProps = (user, size = 150, type = 'person', className = '') => {
  const src = generateUserAvatar(user, size, type);
  const alt = user?.name || 'User Avatar';
  
  return {
    src,
    alt,
    className: `${className}`.trim(),
    style: { width: size, height: size }
  };
};

/**
 * Preload check for local avatars (always returns true since they're generated locally)
 * @param {string} dataUrl - Data URL of the avatar
 * @returns {Promise<boolean>} Always resolves to true
 */
export const preloadLocalAvatar = (dataUrl) => {
  return Promise.resolve(true);
};

export default {
  generateLocalAvatar,
  generateUserAvatar,
  getLocalAvatarProps,
  generateColorFromString,
  generateInitials,
  preloadLocalAvatar
};