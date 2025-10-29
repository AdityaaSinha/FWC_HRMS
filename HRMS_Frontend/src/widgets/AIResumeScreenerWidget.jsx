import { useState } from 'react';
import Card from '../components/Card';
import { Icon } from '../components/icon';
import AILoadingSpinner from '../components/AILoadingSpinner';
import { MOCK_JOBS } from '../mocks/MOCK_JOBS'; 

export default function AIResumeScreenerWidget() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState('Drag & Drop Resume or Click to Upload');
  const [error, setError] = useState(null);
  const [jobDescriptionText, setJobDescriptionText] = useState('');

  // --- Handle file upload ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        setResumeFile(null);
        setFileName('Drag & Drop Resume or Click to Upload');
      } else {
        setResumeFile(file);
        setFileName(file.name);
        setError(null);
      }
    }
  };

  // --- Handle job selection ---
  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);

    if (jobId) {
      const job = MOCK_JOBS.find(j => j.id === parseInt(jobId));
      if (job) {
        const fullDescription = `Job Description:\n${job.jobDescription || 'N/A'}\n\nRequirements:\n${job.requirements || 'N/A'}`;
        setJobDescriptionText(fullDescription);
      }
    } else {
      setJobDescriptionText('');
    }
  };

  // --- Handle the AI screening API call ---
  const handleScreenResume = async () => {
    if (!jobDescriptionText || !resumeFile) {
      setError('Please provide a job description and upload a resume PDF.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescriptionText);

    try {
      const response = await fetch('http://localhost:3001/api/ai/screen-resume-pdf', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.rawText) throw new Error('AI returned invalid JSON. Could not parse.');

      // ✅ Ensure all keys exist before saving result
      setResult({
        matchScore: data.matchScore ?? 0,
        summary: data.summary ?? 'No summary provided.',
        keyStrengths: Array.isArray(data.keyStrengths) ? data.keyStrengths : [],
        potentialGaps: Array.isArray(data.potentialGaps) ? data.potentialGaps : [],
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      {/* --- Header --- */}
      <div className="flex items-center mb-4">
        <Icon as="FileText" size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-xl font-semibold">AI Resume Screener</h2>
      </div>

      {/* --- Input Section --- */}
      <div className="space-y-4">
        <select 
          value={selectedJobId}
          onChange={handleJobSelect}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a job to auto-fill description...</option>
          {(MOCK_JOBS ?? []).filter(j => j.status === 'Open').map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>

        <textarea
          rows="5"
          value={jobDescriptionText}
          onChange={(e) => setJobDescriptionText(e.target.value)}
          placeholder="...or paste the job description manually here."
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="flex flex-col items-center justify-center w-full px-3 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
          <Icon as="UploadCloud" size={24} className="mr-3" />
          <span className="text-center text-sm">{fileName}</span>
          <input 
            type="file" 
            className="hidden" 
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </label>
        
        <button
          onClick={handleScreenResume}
          disabled={isLoading || !jobDescriptionText || !resumeFile}
          className="w-full flex justify-center items-center bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <AILoadingSpinner />
          ) : (
            <>
              <Icon as="Zap" size={18} className="mr-2" /> Screen Resume
            </>
          )}
        </button>
      </div>

      {/* --- Error Message --- */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* --- Results Section --- */}
      {result && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Screening Result:</span>
            <span className={`text-2xl font-bold ${parseInt(result.matchScore) >= 85 ? 'text-green-500' : 'text-yellow-500'}`}>
              {result.matchScore}
            </span>
          </div>

          <p className="text-sm mt-2">{result.summary}</p>

          {/* --- Key Strengths --- */}
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Key Strengths:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {(result.keyStrengths ?? []).map((key, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>

          {/* --- Potential Gaps --- */}
          <div className="mt-3">
            <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Potential Gaps:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {(result.potentialGaps ?? []).map((key, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs rounded-full"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
