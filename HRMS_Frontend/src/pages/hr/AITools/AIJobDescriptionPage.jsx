// src/pages/hr/AITools/AIJobDescriptionPage.jsx
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function AIJobDescriptionPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const generateJD = () => {
    setResult(
      `Job Title: ${input}\n\nResponsibilities:\n- Lead ${input} initiatives\n- Collaborate with teams\n\nRequirements:\n- 3+ years experience\n- Strong communication skills`
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-6">AI Job Description lalala Generator</h2>

      <div className="bg-[#1B1E2B] border border-gray-800 rounded-xl p-6 space-y-4">
        <textarea
          className="w-full bg-[#23263A] text-gray-200 p-3 rounded-lg text-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter job title (e.g., Frontend Developer)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={generateJD}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Sparkles size={16} /> Generate JD
        </button>

        {result && (
          <pre className="bg-[#23263A] p-4 rounded-lg text-gray-300 text-sm whitespace-pre-wrap border border-gray-700">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
