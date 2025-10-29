import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Download,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Trash2, // Note: Trash2 icon isn't used in the history, but kept in imports
  RefreshCw,
  FileSpreadsheet,
  Database,
  UserPlus,
} from 'lucide-react';
import Papa from 'papaparse'; // Import Papaparse for CSV handling

// --- Component: Manual User Form (Dynamic) ---
// This component registers a single user.
const ManualUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    department: '',
    role: 'EMPLOYEE', // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' }); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: '', type: '' });
    const token = localStorage.getItem('token'); // Get auth token

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token for auth
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      // Success
      setStatus({ message: 'User created successfully!', type: 'success' });
      // Clear the form
      setFormData({
        name: '',
        email: '',
        password: '',
        employeeId: '',
        department: '',
        role: 'EMPLOYEE',
      });
    } catch (err) {
      setStatus({ message: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <UserPlus className="w-5 h-5 mr-2 text-indigo-400" />
        Add Single User Manually
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Initial Password (min. 6 chars)"
          className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1E2132] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="HR">HR</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Creating User...' : 'Create User'}
          </button>
          {status.message && (
            <span className={`text-sm text-right ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status.message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
// --- End of ManualUserForm Component ---


// --- Main BulkUserImportExport Component ---
const BulkUserImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFilters, setExportFilters] = useState({ department: '', role: '' }); // Simplified, 'status' not on User
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]); // Will hold parsed CSV data
  const fileInputRef = useRef(null);

  // --- Dynamic state for history ---
  const [importHistory, setImportHistory] = useState([]);
  const [exportHistory, setExportHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // --- Fetch history when tab is clicked ---
  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    const token = localStorage.getItem('token');
    try {
      const [importRes, exportRes] = await Promise.allSettled([
        fetch('http://localhost:3001/api/admin/history/imports', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/admin/history/exports', {
           headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (importRes.status === 'fulfilled' && importRes.value.ok) {
        setImportHistory(await importRes.value.json());
      } else {
        console.error("Failed to fetch import history");
      }

      if (exportRes.status === 'fulfilled' && exportRes.value.ok) {
        setExportHistory(await exportRes.value.json());
      } else {
        console.error("Failed to fetch export history");
      }
      
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // --- Parse CSV file on select ---
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
         alert("Invalid file type. Please upload a .csv file.");
         return;
      }
      setImportFile(file);
      setImportResults(null);
      setPreviewData([]);
      
      // Use Papaparse to read the CSV file
      Papa.parse(file, {
        header: true, // Assumes first row is headers
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed CSV data:", results.data);
          if (!results.data.length || !results.meta.fields.includes('email')) {
             alert("Invalid CSV format. Must include 'email' header.");
             setImportFile(null);
             return;
          }
          setPreviewData(results.data); // Store parsed data
        },
        error: (error) => {
          console.error("CSV Parse Error:", error);
          alert("Failed to parse CSV file. Check console for errors.");
          setImportFile(null);
        }
      });
    }
  };

  // --- Handle REAL Bulk Import ---
  const handleImport = async () => {
    if (!importFile || previewData.length === 0) return;
    
    setIsImporting(true);
    setImportProgress(0);
    setImportResults(null);
    const token = localStorage.getItem('token');
    
    // Simulate progress (backend call is atomic)
    const interval = setInterval(() => {
      setImportProgress(prev => (prev < 90 ? prev + 10 : 90));
    }, 200);

    try {
      const response = await fetch('http://localhost:3001/api/admin/users/bulk-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName: importFile.name,
          users: previewData, // Send the parsed CSV data
        }),
      });

      clearInterval(interval);
      setImportProgress(100);
      
      const results = await response.json();
      if (!response.ok) throw new Error(results.error || 'Import failed');
      
      setImportResults(results); // Set real results from backend
    } catch (error) {
      console.error("Import Error:", error);
      clearInterval(interval);
      setIsImporting(false);
      setImportResults({
        total: previewData.length,
        successful: 0,
        failed: previewData.length,
        errors: [error.message]
      });
    } finally {
      // Don't set importing to false here, let the results show
      // Clear file and preview
      setImportFile(null);
      setPreviewData([]);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    }
  };

  // --- Handle REAL Export ---
  const handleExport = async () => {
    const token = localStorage.getItem('token');
    // Build query string from filters, ignoring empty ones
    const filters = {};
    if (exportFilters.department) filters.department = exportFilters.department;
    if (exportFilters.role) filters.role = exportFilters.role;
    const query = new URLSearchParams(filters).toString();
    
    try {
      const response = await fetch(`http://localhost:3001/api/admin/users/export?${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users for export');
      }
      
      if (data.length === 0) {
        alert('No users found matching the selected filters.');
        return;
      }
      
      // Convert JSON data to CSV string
      const csv = Papa.unparse(data);
      
      // Create and trigger download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      const fileName = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // TODO: Log this successful export to the database via another API call
      
    } catch (error) {
      console.error("Export Error:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  // --- Download CSV Template ---
  const downloadTemplate = () => {
    // Headers must match the bulk import logic in the backend
    const csvTemplate = "name,email,password,employeeId,department,role\n" +
                        "John Doe,john.doe@example.com,Password123,E1001,Engineering,EMPLOYEE\n" +
                        "Jane Smith,jane.smith@example.com,Password456,M1002,Marketing,MANAGER\n";
                        
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bulk User Import/Export</h1>
        <p className="text-gray-400">Manage user data in bulk or add users individually.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-[#272B3F] p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'import' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Import Users
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'export' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <Download className="w-4 h-4 inline mr-2" />
          Export Users
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          History
        </button>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          
          {/* Manual User Form */}
          <ManualUserForm />

          {/* Import Instructions */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-indigo-400" />
              Bulk Import Instructions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-300">Supported Formats</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• CSV files (.csv) only</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-300">Required Columns</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• name (required)</li>
                  <li>• email (required, unique)</li>
                  <li>• password (required, plain text)</li>
                  <li>• employeeId (required, unique)</li>
                  <li>• department (optional)</li>
                  <li>• role (optional, e.g., EMPLOYEE, MANAGER)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={downloadTemplate}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download CSV Template
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Bulk Upload File</h3>
            
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!importFile ? (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag and drop your .csv file here, or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Browse Files
                  </button>
                </div>
              ) : (
                <div>
                  <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-white font-medium">{importFile.name}</p>
                  <p className="text-gray-400 text-sm">{(importFile.size / 1024).toFixed(1)} KB | {previewData.length} records found</p>
                  <div className="flex justify-center space-x-2 mt-4">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setImportFile(null);
                        setPreviewData([]);
                        setImportResults(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <X className="w-4 h-4 inline mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Import Progress */}
            {isImporting && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Importing users...</span>
                  <span>{importProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Import Results */}
            {importResults && (
              <div className="mt-6 bg-[#1E2132] rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium mb-3 flex items-center">
                  {importResults.failed > 0 ? <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" /> : <CheckCircle className="w-5 h-5 mr-2 text-green-400" />}
                  Import Results
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{importResults.total}</div>
                    <div className="text-sm text-gray-400">Total Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{importResults.successful}</div>
                    <div className="text-sm text-gray-400">Successful</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{importResults.failed}</div>
                    <div className="text-sm text-gray-400">Failed</div>
                  </div>
                </div>
                {importResults.errors && importResults.errors.length > 0 && (
                  <div>
                    <h5 className="font-medium text-red-400 mb-2">Errors:</h5>
                    <ul className="text-sm text-gray-400 space-y-1 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {importResults.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Import Button */}
            {importFile && !isImporting && !importResults && (
              <div className="mt-6">
                <button
                  onClick={handleImport}
                  disabled={previewData.length === 0}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Start Import ({previewData.length} records)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-indigo-400" />
              Export Configuration
            </h3>
            <div className="grid md:grid-cols-3 gap-6"> {/* Changed to 3 cols */}
              <div>
                <label className="block text-sm font-medium mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="csv">CSV</option>
                  {/* <option value="xlsx" disabled>Excel (XLSX) - Not available</option> */}
                  {/* <option value="json" disabled>JSON - Not available</option> */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department Filter</label>
                <input
                  type="text"
                  value={exportFilters.department}
                  onChange={(e) => setExportFilters({...exportFilters, department: e.target.value})}
                  placeholder="e.g., Engineering"
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role Filter</label>
                <select
                  value={exportFilters.role}
                  onChange={(e) => setExportFilters({...exportFilters, role: e.target.value})}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">All Roles</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="MANAGER">Manager</option>
                  <option value="HR">HR</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleExport}
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Export Users
              </button>
            </div>
          </div>
          {/* ... (Static export stats cards) ... */}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Import History</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">File Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Records</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Imported By</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingHistory ? (
                     <tr><td colSpan="6" className="text-center py-4 text-gray-400">Loading history...</td></tr>
                  ) : importHistory.length === 0 ? (
                     <tr><td colSpan="6" className="text-center py-4 text-gray-400">No import history found.</td></tr>
                  ) : (
                    importHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-700 hover:bg-[#1E2132]">
                        <td className="py-3 px-4 text-white truncate max-w-xs">{item.fileName}</td>
                        <td className="py-3 px-4 text-gray-400">{item.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'completed' ? 'bg-green-900 text-green-300' :
                            item.status === 'partial' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{item.successfulRecords} / {item.totalRecords}</td>
                        <td className="py-3 px-4 text-gray-400">{item.importedBy}</td>
                        <td className="py-3 px-4">
                          {item.failedRecords > 0 ? (
                            <button className="text-red-400 hover:text-red-300 text-sm" onClick={() => alert(`Errors:\n${item.errors.join('\n')}`)}>
                              View ({item.failedRecords})
                            </button>
                          ) : (
                            'N/A'
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* ... (Export history table, still uses mock data) ... */}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#272B3F] rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col border border-gray-700">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h3 className="text-lg font-semibold">File Preview ({previewData.length} records)</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    {previewData.length > 0 && Object.keys(previewData[0]).map(key => (
                       <th key={key} className="text-left py-2 px-3 font-medium text-gray-300 capitalize sticky top-0 bg-[#272B3F]">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                         <td key={i} className="py-2 px-3 text-white truncate max-w-[200px]">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-400 flex-shrink-0">
              Showing {previewData.length > 0 ? previewData.length : 0} rows (preview only)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUserImportExport;

