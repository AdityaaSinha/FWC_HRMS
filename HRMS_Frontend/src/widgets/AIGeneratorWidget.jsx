import { useState } from 'react';
import Card from '../components/Card';
import { Icon } from '../components/icon';
import AILoadingSpinner from '../components/AILoadingSpinner';
// import { mockFetchAIGeneration } from '../mocks/mockAPI'; // No longer needed

export default function AIGeneratorWidget() {
  // --- NEW: Add state for all required fields ---
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [keywords, setKeywords] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedJD, setGeneratedJD] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!jobTitle || !department || !keywords) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setGeneratedJD('');
    setError(null);
    
    try {
      // --- CONNECT TO BACKEND ---
      const response = await fetch('http://localhost:3001/api/ai/generate-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobTitle,
          department: department,
          keywords: keywords.split(',').map(k => k.trim()) // Convert string to array
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.text) {
        setGeneratedJD(data.text);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-center mb-4">
        <Icon as="Wand2" size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-xl font-semibold">AI Job Description Generator</h2>
      </div>

      {/* --- UPDATED FORM --- */}
      <div className="space-y-3">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title (e.g., React Developer)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter department (e.g., Engineering)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords (e.g., React, TypeScript, SQL)"
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !jobTitle || !department || !keywords}
          className="flex items-center justify-center w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? <AILoadingSpinner /> : <><Icon as="Wand2" size={18} className="mr-2" /> Generate</>}
        </button>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {generatedJD && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg max-h-48 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm font-sans">{generatedJD}</pre>
        </div>
      )}
    </Card>
  );
}