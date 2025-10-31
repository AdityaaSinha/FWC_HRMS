import React, { useState } from 'react';
import { generateSmartPravavatarUrl } from '../../utils/pravavatarUtils';
import { generateInitials } from '../../utils/avatarUtils';

/**
 * Reusable Avatar component with Pravatar.cc integration
 * Falls back to initials if image fails to load
 */
const Avatar = ({ 
  user, 
  name, 
  email, 
  size = 40, 
  className = '', 
  showInitials = true,
  usePravatar = true,
  onClick,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Create user object from props if not provided
  const userObj = user || { 
    name: name, 
    email: email || (name ? `${name.toLowerCase().replace(/\s+/g, '.')}@company.com` : null),
    id: props.id
  };
  
  // Generate avatar URL using Pravatar.cc by default
  const avatarUrl = usePravatar ? generateSmartPravavatarUrl(userObj, size) : null;
  const initials = generateInitials(userObj.name || name);
  
  // Show initials if no URL, image failed to load, or still loading
  const shouldShowInitials = showInitials && (!avatarUrl || imageError || !imageLoaded);
  
  const baseClasses = `relative rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden ${className}`;
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';
  
  return (
    <div 
      className={`${baseClasses} ${clickableClasses}`}
      style={{ width: size, height: size, fontSize: `${size * 0.35}px` }}
      onClick={onClick}
      {...props}
    >
      {avatarUrl && !imageError && (
        <img
          src={avatarUrl}
          alt={userObj.name || name || 'User Avatar'}
          className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {shouldShowInitials && (
        <span className={`${imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 select-none`}>
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;