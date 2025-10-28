import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  X,
  Eye,
  Trash2,
  RefreshCw,
  FileSpreadsheet,
  Database
} from 'lucide-react';

const BulkUserImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFilters, setExportFilters] = useState({
    department: '',
    role: '',
    status: 'all'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const fileInputRef = useRef(null);

  // Mock data for demonstration
  const importHistory = [
    {
      id: 1,
      fileName: 'employees_batch_1.csv',
      date: '2024-01-15',
      status: 'completed',
      totalRecords: 150,
      successfulRecords: 148,
      failedRecords: 2,
      importedBy: 'Admin User'
    },
    {
      id: 2,
      fileName: 'new_hires_q1.xlsx',
      date: '2024-01-10',
      status: 'completed',
      totalRecords: 75,
      successfulRecords: 75,
      failedRecords: 0,
      importedBy: 'HR Manager'
    },
    {
      id: 3,
      fileName: 'contractors_list.csv',
      date: '2024-01-08',
      status: 'failed',
      totalRecords: 25,
      successfulRecords: 0,
      failedRecords: 25,
      importedBy: 'Admin User'
    }
  ];

  const exportHistory = [
    {
      id: 1,
      fileName: 'all_employees_2024.csv',
      date: '2024-01-15',
      format: 'CSV',
      records: 1250,
      size: '2.4 MB',
      exportedBy: 'Admin User'
    },
    {
      id: 2,
      fileName: 'hr_department.xlsx',
      date: '2024-01-12',
      format: 'Excel',
      records: 45,
      size: '156 KB',
      exportedBy: 'HR Manager'
    }
  ];

  const sampleData = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'Engineering', role: 'Developer' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'Marketing', role: 'Manager' },
    { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', department: 'Sales', role: 'Representative' }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportFile(file);
      // Simulate file preview
      setPreviewData(sampleData);
    }
  };

  const handleImport = () => {
    if (!importFile) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportResults({
            total: previewData.length,
            successful: previewData.length - 1,
            failed: 1,
            errors: ['Row 2: Invalid email format']
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = () => {
    // Simulate export
    const fileName = `employees_export_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    console.log(`Exporting ${fileName} with filters:`, exportFilters);
    
    // In a real app, this would trigger a download
    alert(`Export started: ${fileName}`);
  };

  const downloadTemplate = () => {
    // Simulate template download
    console.log('Downloading CSV template...');
    alert('CSV template downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#1E2132] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bulk User Import/Export</h1>
        <p className="text-gray-400">Manage user data in bulk with import and export functionality</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-[#272B3F] p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'import'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Import Users
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'export'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <Download className="w-4 h-4 inline mr-2" />
          Export Users
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1E2132]'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          History
        </button>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          {/* Import Instructions */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-indigo-400" />
              Import Instructions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-300">Supported Formats</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• CSV files (.csv)</li>
                  <li>• Excel files (.xlsx, .xls)</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Maximum records: 5,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-300">Required Columns</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• firstName (required)</li>
                  <li>• lastName (required)</li>
                  <li>• email (required, unique)</li>
                  <li>• department (required)</li>
                  <li>• role (required)</li>
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
            <h3 className="text-lg font-semibold mb-4">Upload File</h3>
            
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!importFile ? (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag and drop your file here, or</p>
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
                  <p className="text-gray-400 text-sm">{(importFile.size / 1024).toFixed(1)} KB</p>
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
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
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
                {importResults.errors.length > 0 && (
                  <div>
                    <h5 className="font-medium text-red-400 mb-2">Errors:</h5>
                    <ul className="text-sm text-gray-400 space-y-1">
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
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Start Import
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          {/* Export Configuration */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-indigo-400" />
              Export Configuration
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Department Filter</label>
                <select
                  value={exportFilters.department}
                  onChange={(e) => setExportFilters({...exportFilters, department: e.target.value})}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Role Filter</label>
                <select
                  value={exportFilters.role}
                  onChange={(e) => setExportFilters({...exportFilters, role: e.target.value})}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">All Roles</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="analyst">Analyst</option>
                  <option value="representative">Representative</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status Filter</label>
                <select
                  value={exportFilters.status}
                  onChange={(e) => setExportFilters({...exportFilters, status: e.target.value})}
                  className="w-full bg-[#1E2132] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
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

          {/* Export Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
                <Users className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            
            <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-green-400">1,198</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Inactive Users</p>
                  <p className="text-2xl font-bold text-yellow-400">35</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            
            <div className="bg-[#272B3F] rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Users</p>
                  <p className="text-2xl font-bold text-orange-400">14</p>
                </div>
                <RefreshCw className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Import History */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Import History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {importHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700 hover:bg-[#1E2132]">
                      <td className="py-3 px-4 text-white">{item.fileName}</td>
                      <td className="py-3 px-4 text-gray-400">{item.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {item.successfulRecords}/{item.totalRecords}
                      </td>
                      <td className="py-3 px-4 text-gray-400">{item.importedBy}</td>
                      <td className="py-3 px-4">
                        <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export History */}
          <div className="bg-[#272B3F] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Export History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">File Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Format</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Records</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Exported By</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exportHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700 hover:bg-[#1E2132]">
                      <td className="py-3 px-4 text-white">{item.fileName}</td>
                      <td className="py-3 px-4 text-gray-400">{item.date}</td>
                      <td className="py-3 px-4 text-gray-400">{item.format}</td>
                      <td className="py-3 px-4 text-gray-400">{item.records}</td>
                      <td className="py-3 px-4 text-gray-400">{item.size}</td>
                      <td className="py-3 px-4 text-gray-400">{item.exportedBy}</td>
                      <td className="py-3 px-4">
                        <button className="text-indigo-400 hover:text-indigo-300 text-sm mr-2">
                          Download
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#272B3F] rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">File Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 px-3 font-medium text-gray-300">First Name</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-300">Last Name</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-300">Email</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-300">Department</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-300">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 px-3 text-white">{row.firstName}</td>
                      <td className="py-2 px-3 text-white">{row.lastName}</td>
                      <td className="py-2 px-3 text-gray-400">{row.email}</td>
                      <td className="py-2 px-3 text-gray-400">{row.department}</td>
                      <td className="py-2 px-3 text-gray-400">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              Showing {previewData.length} rows (preview only)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUserImportExport;
