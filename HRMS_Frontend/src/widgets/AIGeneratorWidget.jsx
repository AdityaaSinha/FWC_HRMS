import { useState } from 'react';
import Card from '../components/Card';
import { Icon } from '../components/icon';
import AILoadingSpinner from '../components/AILoadingSpinner';

export default function AIGeneratorWidget() {
  // --- STATE ---
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [keywords, setKeywords] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedJD, setGeneratedJD] = useState('');
  const [error, setError] = useState(null);

  // --- HANDLE GENERATION ---
  const handleGenerate = async () => {
    if (!jobTitle || !department || !keywords) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setGeneratedJD('');
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobTitle,
          department,
          keywords: keywords.split(',').map(k => k.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      // --- HANDLE CLEAN / SAFE RESPONSES ---
      if (data.jobDescription) {
        // Clean any unwanted markdown or artifacts
        const cleanJD = data.jobDescription
          .replace(/```/g, '')
          .replace(/[*_#>-]+/g, '') // remove markdown symbols
          .trim();
        setGeneratedJD(cleanJD);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('No job description received from AI.');
      }
    } catch (err) {
      console.error('AI JD Generation Error:', err);
      setError(err.message || 'Failed to generate job description.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX ---
  return (
    <Card className="flex flex-col">
      <div className="flex items-center mb-4">
        <Icon as="Wand2" size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-xl font-semibold">AI Job Description Generator</h2>
      </div>

      {/* --- INPUT FIELDS --- */}
      <div className="space-y-3">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title (e.g., React Developer)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter department (e.g., Engineering)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords (e.g., React, TypeScript, SQL)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleGenerate}
          disabled={isLoading || !jobTitle || !department || !keywords}
          className="flex items-center justify-center w-full bg-indigo-500 text-white 
                     px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-600 
                     transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <AILoadingSpinner />
          ) : (
            <>
              <Icon as="Wand2" size={18} className="mr-2" /> Generate
            </>
          )}
        </button>
      </div>

      {/* --- ERROR --- */}
      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}

      {/* --- GENERATED OUTPUT --- */}
      {generatedJD && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                        max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600">
          <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed text-gray-800 dark:text-gray-200">
            {generatedJD}
          </pre>
        </div>
      )}
    </Card>
  );
}
