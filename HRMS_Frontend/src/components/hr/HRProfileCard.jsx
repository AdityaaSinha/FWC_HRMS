import React from "react";

export default function HRProfileCard({ hr }) {
  // --- NEW: Handle loading state ---
  // If 'hr' data hasn't arrived from the API yet, show a placeholder
  if (!hr || !hr.name) { // Check for hr.name as a sign that data is loaded
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex justify-between items-center animate-pulse">
        <div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
      </div>
    );
  }

  // --- Generate initials safely ---
  const nameParts = hr.name?.split(" ") || ["?", "?"];
  const initials = `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`.toUpperCase();


  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row justify-between sm:items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back , {hr.name} 👋
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
          {hr.role} • {hr.department}
        </p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
          {/* --- UPDATED TO SHOW employeeId --- */}
          <p>Employee ID: {hr.employeeId} | Joined: {hr.joinDate}</p>
          <p>Email: {hr.email}</p>
        </div>
      </div>
      <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-6">
        <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-700">
          {initials}
        </div>
      </div>
    </div>
  );
}