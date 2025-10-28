import * as LucideIcons from 'lucide-react';

export const Icon = ({ as, size = 20, className = '' }) => {
  const Component = LucideIcons[as] || LucideIcons['Zap'];
  return <Component size={size} className={className} />;
};
