import React, { useState } from 'react';
import { 
  FileText, Folder, Upload, Download, Search, Filter, 
  MoreVertical, Eye, Edit, Trash2, Share2, Lock, 
  Calendar, User, Tag, Star, Clock, CheckCircle,
  FolderPlus, FilePlus, Archive, AlertCircle, Info
} from 'lucide-react';

const ManagerDocumentManagement = () => {
  const [activeView, setActiveView] = useState('grid');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  // Mock data for folders
  const folders = [
    { id: 'all', name: 'All Documents', count: 156, icon: FileText },
    { id: 'policies', name: 'Policies & Procedures', count: 45, icon: Lock },
    { id: 'meetings', name: 'Meeting Minutes', count: 32, icon: Calendar },
    { id: 'reports', name: 'Reports', count: 28, icon: FileText },
    { id: 'contracts', name: 'Contracts', count: 19, icon: FileText },
    { id: 'templates', name: 'Templates', count: 15, icon: FileText },
    { id: 'archived', name: 'Archived', count: 17, icon: Archive }
  ];

  // Mock data for documents
  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'PDF',
      size: '2.4 MB',
      category: 'policies',
      author: 'HR Department',
      lastModified: '2024-01-15',
      status: 'published',
      version: '3.2',
      tags: ['HR', 'Policy', 'Guidelines'],
      description: 'Comprehensive employee handbook covering all company policies and procedures',
      downloads: 234,
      views: 1205,
      starred: true,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150'
    },
    {
      id: 2,
      name: 'Q4 Board Meeting Minutes',
      type: 'DOCX',
      size: '1.8 MB',
      category: 'meetings',
      author: 'Sarah Johnson',
      lastModified: '2024-01-14',
      status: 'draft',
      version: '1.0',
      tags: ['Meeting', 'Board', 'Q4'],
      description: 'Minutes from the Q4 board meeting discussing annual performance and strategy',
      downloads: 12,
      views: 45,
      starred: false,
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=150'
    },
    {
      id: 3,
      name: 'Remote Work Policy',
      type: 'PDF',
      size: '956 KB',
      category: 'policies',
      author: 'Management Team',
      lastModified: '2024-01-13',
      status: 'published',
      version: '2.1',
      tags: ['Policy', 'Remote Work', 'Guidelines'],
      description: 'Updated remote work policy including new hybrid work arrangements',
      downloads: 189,
      views: 567,
      starred: true,
      thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=150'
    },
    {
      id: 4,
      name: 'Performance Review Template',
      type: 'XLSX',
      size: '245 KB',
      category: 'templates',
      author: 'HR Department',
      lastModified: '2024-01-12',
      status: 'published',
      version: '1.5',
      tags: ['Template', 'Performance', 'Review'],
      description: 'Standardized template for conducting employee performance reviews',
      downloads: 78,
      views: 234,
      starred: false,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150'
    },
    {
      id: 5,
      name: 'Budget Allocation Report 2024',
      type: 'PDF',
      size: '3.2 MB',
      category: 'reports',
      author: 'Finance Team',
      lastModified: '2024-01-11',
      status: 'confidential',
      version: '1.0',
      tags: ['Budget', 'Finance', 'Report'],
      description: 'Detailed budget allocation and spending analysis for 2024',
      downloads: 23,
      views: 67,
      starred: true,
      thumbnail: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=150'
    },
    {
      id: 6,
      name: 'Vendor Contract - TechCorp',
      type: 'PDF',
      size: '1.1 MB',
      category: 'contracts',
      author: 'Legal Department',
      lastModified: '2024-01-10',
      status: 'signed',
      version: '2.0',
      tags: ['Contract', 'Vendor', 'Legal'],
      description: 'Service agreement with TechCorp for IT infrastructure support',
      downloads: 8,
      views: 24,
      starred: false,
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=150'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesFolder = selectedFolder === 'all' || doc.category === selectedFolder;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'confidential': return 'bg-red-100 text-red-800';
      case 'signed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': case 'doc': return '📝';
      case 'xlsx': case 'xls': return '📊';
      case 'pptx': case 'ppt': return '📋';
      default: return '📄';
    }
  };

  const DocumentCard = ({ document }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
         onClick={() => setSelectedDocument(document)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getFileIcon(document.type)}</span>
          <div>
            <h3 className="font-medium text-white truncate">{document.name}</h3>
            <p className="text-sm text-gray-400">{document.type.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-600 rounded">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-400 space-y-1">
        <p>Size: {document.size}</p>
        <p>Modified: {document.lastModified}</p>
        <p>By: {document.author}</p>
      </div>
    </div>
  );

  const DocumentListItem = ({ document }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
         onClick={() => setSelectedDocument(document)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{getFileIcon(document.type)}</span>
          <div>
            <h3 className="font-semibold text-white">{document.name}</h3>
            <p className="text-sm text-gray-400">{document.description}</p>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
              <span>By {document.author}</span>
              <span>{document.lastModified}</span>
              <span>{document.size}</span>
              <span className={`px-2 py-1 rounded-full ${getStatusColor(document.status)}`}>
                {document.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {document.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-600 rounded">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-600 rounded">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-600 rounded">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const DocumentModal = ({ document, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getFileIcon(document.type)}</span>
              <div>
                <h2 className="text-xl font-semibold text-white">{document.name}</h2>
                <p className="text-gray-400">{document.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Document Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-gray-300">{document.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-gray-300">{document.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-gray-300">v{document.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Author:</span>
                  <span className="text-gray-300">{document.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Modified:</span>
                  <span className="text-gray-300">{document.lastModified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Downloads:</span>
                  <span className="text-gray-300">{document.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Views:</span>
                  <span className="text-gray-300">{document.views}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              View Document
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Document Management</h1>
          <p className="text-gray-400">Organize and manage your organization's documents, policies, and procedures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Folders</h2>
                <button 
                  onClick={() => setShowNewFolderModal(true)}
                  className="p-1 text-blue-400 hover:bg-gray-700 rounded"
                >
                  <FolderPlus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <folder.icon className="h-4 w-4" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="w-full flex items-center space-x-2 p-2 text-blue-400 hover:bg-gray-700 rounded-lg"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Upload Document</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-green-400 hover:bg-gray-700 rounded-lg">
                  <FilePlus className="h-4 w-4" />
                  <span className="text-sm">Create Document</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-purple-400 hover:bg-gray-700 rounded-lg">
                  <Archive className="h-4 w-4" />
                  <span className="text-sm">Archive Manager</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveView('grid')}
                    className={`p-2 rounded ${activeView === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded ${activeView === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-1">
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Showing {filteredDocuments.length} documents in {folders.find(f => f.id === selectedFolder)?.name}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4">
              <div className={activeView === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-4'
              }>
                {filteredDocuments.map((document) => (
                  activeView === 'grid' 
                    ? <DocumentCard key={document.id} document={document} />
                    : <DocumentListItem key={document.id} document={document} />
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No documents found</h3>
                  <p className="text-gray-500">Try adjusting your search or upload some documents to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Detail Modal */}
        {selectedDocument && (
          <DocumentModal 
            document={selectedDocument} 
            onClose={() => setSelectedDocument(null)} 
          />
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Upload Document</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Folder
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Document File
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      Drop files here or <span className="text-blue-400 cursor-pointer">browse</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDocumentManagement;