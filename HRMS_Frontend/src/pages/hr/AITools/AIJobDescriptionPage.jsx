// src/pages/hr/AITools/AIJobDescriptionPage.jsx
import React from 'react';
import AIGeneratorWidget from '../../../widgets/AIGeneratorWidget';

export default function AIJobDescriptionPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          AI Job Description Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Generate professional job descriptions using AI. Simply provide the job title, department, and key skills.
        </p>
        
        <AIGeneratorWidget />
      </div>
    </div>
  );
}
