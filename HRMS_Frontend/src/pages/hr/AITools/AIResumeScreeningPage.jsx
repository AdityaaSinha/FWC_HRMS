// src/pages/hr/AITools/AIResumeScreeningPage.jsx
import React from 'react';
import AIResumeScreenerWidget from '../../../widgets/AIResumeScreenerWidget';

export default function AIResumeScreeningPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          AI Resume Screening
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Upload candidate resumes and job descriptions to get AI-powered screening results with match scores and analysis.
        </p>
        
        <AIResumeScreenerWidget />
      </div>
    </div>
  );
}
