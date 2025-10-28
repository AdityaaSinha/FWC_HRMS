import React from 'react';
// We don't need MoreVertical here anymore
// import { MoreVertical } from 'lucide-react'; 

export default function Card({ title, children, className = '' }) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 h-full flex flex-col ${className}`}
    >
      {title && (
        // --- THIS BLOCK IS CHANGED ---
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          {/* The <button> with the MoreVertical icon was here. 
            It has been REMOVED. 
            It will now be added by the SortableCard wrapper.
          */}
        </div>
        // --- END OF CHANGE ---
      )}
      <div className="flex-grow"> 
        {children}
      </div>
    </div>
  );
}