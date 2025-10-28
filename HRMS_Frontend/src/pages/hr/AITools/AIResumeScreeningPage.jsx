// src/pages/hr/AITools/AIResumeScreeningPage.jsx
import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function AIResumeScreeningPage() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => setFile(e.target.files[0]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-indigo-400 mb-6">AI Resume Screening</h2>

      <div className="bg-[#1B1E2B] border border-gray-800 rounded-xl p-8 text-center">
        <UploadCloud size={48} className="mx-auto text-indigo-400 mb-4" />
        <p className="text-gray-300 mb-4">
          Upload candidate resumes (PDF/DOCX). The AI will analyze skills and suggest matches.
        </p>
        <input type="file" onChange={handleUpload} className="text-sm mb-4" />
        {file && (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle2 size={18} /> <span>{file.name} uploaded</span>
          </div>
        )}
      </div>
    </div>
  );
}
