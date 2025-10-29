import React from 'react';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';

// Displays a list of top departments and employee counts
export default function DepartmentOverviewCard({ departments = [], isLoading }) {
  return (
    <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800 h-full flex flex-col">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Building size={20} className="text-green-400" /> Department Overview
        </h2>
        {/* Link to a potential full department management page */}
        <Link to="/admin/departments" className="text-sm text-indigo-400 hover:text-indigo-300">
          Manage
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading departments...</div>
      ) :
      /* Empty State */
      departments.length === 0 ? (
         <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No department data available.</div>
      ) : (
        /* Department List */
        <ul className="space-y-3 text-gray-300 text-sm flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {departments.map((dept) => (
            <li key={dept.name} className="flex justify-between items-center hover:bg-white/5 px-2 py-1 rounded">
              <span className="truncate pr-2">{dept.name}</span>
              <span className="font-medium text-white bg-gray-700 px-2 py-0.5 rounded-md text-xs flex-shrink-0">
                {dept.count} Members
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
