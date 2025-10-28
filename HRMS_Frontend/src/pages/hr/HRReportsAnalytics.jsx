// src/pages/hr/HRReportsAnalytics.jsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function HRReportsAnalytics() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-400 mb-6">Reports & Analytics</h2>
      <div className="bg-[#1B1E2B] border border-gray-800 p-8 rounded-xl text-center">
        <BarChart3 size={40} className="mx-auto text-indigo-400 mb-4" />
        <p className="text-gray-400">Charts and hiring funnel insights will appear here soon.</p>
      </div>
    </div>
  );
}
