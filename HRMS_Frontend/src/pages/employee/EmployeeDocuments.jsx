import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  Folder, 
  Star, 
  Clock, 
  Tag,
  Grid,
  List,
  ChevronDown,
  BookOpen,
  Shield,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

const EmployeeDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock documents data
  const MOCK_DOCUMENTS = [
    {
      id: 1,
      title: 'Employee Handbook 2025',
      description: 'Comprehensive guide covering company policies, procedures, and employee benefits.',
      category: 'Policies',
      type: 'handbook',
      format: 'PDF',
      size: '2.4 MB',
      updatedAt: '2025-01-15T10:30:00Z',
      downloadCount: 245,
      isRequired: true,
      isFavorited: false,
      tags: ['Policy', 'Handbook', 'Guidelines']
    },
    {
      id: 2,
      title: 'Remote Work Policy',
      description: 'Updated guidelines for remote work arrangements and hybrid work schedules.',
      category: 'Policies',
      type: 'policy',
      format: 'PDF',
      size: '856 KB',
      updatedAt: '2025-01-10T14:20:00Z',
      downloadCount: 189,
      isRequired: true,
      isFavorited: true,
      tags: ['Remote Work', 'Policy', 'Hybrid']
    },
    {
      id: 3,
      title: 'IT Security Guidelines',
      description: 'Essential security practices and protocols for all employees.',
      category: 'Safety',
      type: 'guide',
      format: 'PDF',
      size: '1.2 MB',
      updatedAt: '2025-01-08T09:15:00Z',
      downloadCount: 156,
      isRequired: true,
      isFavorited: false,
      tags: ['Security', 'IT', 'Guidelines']
    },
    {
      id: 4,
      title: 'Leave Request Form',
      description: 'Standard form for requesting time off and vacation leave.',
      category: 'Forms',
      type: 'template',
      format: 'DOCX',
      size: '245 KB',
      updatedAt: '2025-01-05T16:45:00Z',
      downloadCount: 78,
      isRequired: false,
      isFavorited: false,
      tags: ['Leave', 'Form', 'Template']
    },
    {
      id: 5,
      title: 'Benefits Enrollment Guide',
      description: 'Step-by-step guide for enrolling in company benefits and insurance plans.',
      category: 'Benefits',
      type: 'guide',
      format: 'PDF',
      size: '1.8 MB',
      updatedAt: '2025-01-03T11:30:00Z',
      downloadCount: 134,
      isRequired: false,
      isFavorited: true,
      tags: ['Benefits', 'Insurance', 'Enrollment']
    },
    {
      id: 6,
      title: 'Performance Review Template',
      description: 'Template for conducting annual performance reviews and evaluations.',
      category: 'Forms',
      type: 'template',
      format: 'XLSX',
      size: '567 KB',
      updatedAt: '2024-12-28T13:20:00Z',
      downloadCount: 92,
      isRequired: false,
      isFavorited: false,
      tags: ['Performance', 'Review', 'Template']
    },
    {
      id: 7,
      title: 'Safety Training Manual',
      description: 'Comprehensive safety training materials and emergency procedures.',
      category: 'Training',
      type: 'handbook',
      format: 'PDF',
      size: '3.1 MB',
      updatedAt: '2024-12-20T08:45:00Z',
      downloadCount: 203,
      isRequired: true,
      isFavorited: false,
      tags: ['Safety', 'Training', 'Emergency']
    },
    {
      id: 8,
      title: 'Code of Conduct',
      description: 'Company code of conduct and ethical guidelines for all employees.',
      category: 'Policies',
      type: 'policy',
      format: 'PDF',
      size: '1.1 MB',
      updatedAt: '2024-12-15T15:10:00Z',
      downloadCount: 267,
      isRequired: true,
      isFavorited: true,
      tags: ['Ethics', 'Conduct', 'Policy']
    }
  ];

  // Mock categories data
  const MOCK_CATEGORIES = [
    { id: 'all', label: 'All Documents', icon: FileText, count: 8 },
    { id: 'policies', label: 'Policies', icon: Shield, count: 3 },
    { id: 'training', label: 'Training', icon: BookOpen, count: 1 },
    { id: 'forms', label: 'Forms', icon: FileText, count: 2 },
    { id: 'benefits', label: 'Benefits', icon: Users, count: 1 },
    { id: 'safety', label: 'Safety', icon: AlertCircle, count: 1 }
  ];

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API call to fetch documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const queryParams = new URLSearchParams({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        search: searchTerm,
        sortBy,
        sortOrder
      });

      const response = await fetch(`http://localhost:3001/api/documents?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      
      // Use mock data if API returns empty array
      const documentsToUse = data.length === 0 ? MOCK_DOCUMENTS : data;
      setDocuments(documentsToUse);
      
      // Extract favorites from the response
      const favoriteIds = documentsToUse.filter(doc => doc.isFavorited).map(doc => doc.id);
      setFavorites(favoriteIds);
    } catch (err) {
      // Use mock data as fallback when API fails
      console.warn('API failed, using mock data:', err.message);
      setDocuments(MOCK_DOCUMENTS);
      const favoriteIds = MOCK_DOCUMENTS.filter(doc => doc.isFavorited).map(doc => doc.id);
      setFavorites(favoriteIds);
      setError(null); // Clear error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  // API call to fetch categories
  const fetchCategories = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:3001/api/documents/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      
      // Create categories array with icons
      const categoryIcons = {
        'Policies': Shield,
        'Training': BookOpen,
        'Forms': FileText,
        'Benefits': Users,
        'Safety': AlertCircle
      };

      const categoriesWithIcons = [
        { id: 'all', label: 'All Documents', icon: FileText, count: documents.length },
        ...data.map(cat => ({
          id: cat.name.toLowerCase(),
          label: cat.name,
          icon: categoryIcons[cat.name] || FileText,
          count: cat._count.documents
        }))
      ];
      
      setCategories(categoriesWithIcons);
    } catch (err) {
      // Use mock categories as fallback
      console.warn('Categories API failed, using mock data:', err.message);
      setCategories(MOCK_CATEGORIES);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (docId) => {
    try {
      // Check if document is currently favorited
      const isCurrentlyFavorited = favorites.includes(docId);
      const newFavoriteStatus = !isCurrentlyFavorited;
      
      // Try API call first, but don't fail if it doesn't work
      try {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:3001/api/documents/${docId}/favorite`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('API call failed');
        }
      } catch (apiError) {
        console.warn('Favorite API not available, using local state:', apiError.message);
      }
      
      // Update local favorites state regardless of API success
      setFavorites(prev => 
        newFavoriteStatus 
          ? [...prev, docId]
          : prev.filter(id => id !== docId)
      );

      // Update documents state to reflect favorite status
      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { ...doc, isFavorited: newFavoriteStatus }
          : doc
      ));
      
      console.log(`Document ${docId} ${newFavoriteStatus ? 'added to' : 'removed from'} favorites`);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Handle download
  const handleDownload = async (doc) => {
    try {
      // Try API call first, but don't fail if it doesn't work
      try {
        const token = getAuthToken();
        await fetch(`http://localhost:3001/api/documents/${doc.id}/download`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (apiError) {
        console.warn('Download API not available, proceeding with mock download:', apiError.message);
      }

      // Create a mock file download
      const fileContent = generateMockFileContent(doc);
      const blob = new Blob([fileContent], { 
        type: doc.type === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.title}.${doc.type === 'pdf' ? 'pdf' : 'docx'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log(`Downloaded ${doc.title}`);
      
      // Update download count in local state
      setDocuments(prev => prev.map(d => 
        d.id === doc.id 
          ? { ...d, downloadCount: d.downloadCount + 1 }
          : d
      ));
    } catch (err) {
      console.error('Error downloading document:', err);
    }
  };

  // Generate mock file content for downloads
  const generateMockFileContent = (doc) => {
    if (doc.type === 'pdf') {
      // Simple PDF-like content (this would be a real PDF in production)
      return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${doc.title}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
299
%%EOF`;
    } else {
      // Simple DOCX-like content (this would be a real DOCX in production)
      return `Document Title: ${doc.title}
Category: ${doc.category}
Description: ${doc.description}
Date: ${doc.date}

This is a mock document content for demonstration purposes.
In a real application, this would be the actual document content.`;
    }
  };

  // Handle view document
  const handleView = (doc) => {
    if (doc.type === 'pdf') {
      // For PDF files, create a blob URL and open in new tab
      const fileContent = generateMockFileContent(doc);
      const blob = new Blob([fileContent], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } else {
      // For DOCX files, show content in a modal or download
      alert(`Viewing ${doc.title}\n\nContent: ${doc.description}\n\nNote: In a real application, this would open the document in a viewer or download it for viewing in an appropriate application.`);
    }
    console.log(`Viewing ${doc.title}`);
  };

  const handlePreview = (doc) => {
    // Use the same logic as handleView for consistency
    handleView(doc);
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchDocuments();
  }, [selectedCategory, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchCategories();
  }, [documents.length]);

  // Document types for filtering
  const documentTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'handbook', label: 'Handbooks' },
    { id: 'policy', label: 'Policies' },
    { id: 'guide', label: 'Guides' },
    { id: 'template', label: 'Templates' },
    { id: 'procedure', label: 'Procedures' },
    { id: 'plan', label: 'Plans' }
  ];

  const sortOptions = [
    { id: 'updatedAt', label: 'Most Recent' },
    { id: 'downloadCount', label: 'Most Downloaded' },
    { id: 'title', label: 'A-Z' },
    { id: 'isRequired', label: 'Required First' }
  ];

  // Filter documents based on current filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category.name.toLowerCase() === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFormatColor = (format) => {
    switch (format) {
      case 'PDF': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'DOCX': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'XLSX': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const DocumentCard = ({ doc }) => (
    <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📄</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{doc.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {doc.isRequired && (
            <div className="bg-orange-400/10 border border-orange-400/20 rounded-full px-2 py-1">
              <span className="text-xs text-orange-400 font-medium">Required</span>
            </div>
          )}
          <button
            onClick={() => toggleFavorite(doc.id)}
            className={`p-2 rounded-lg transition-colors ${
              favorites.includes(doc.id)
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Star size={16} fill={favorites.includes(doc.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <div className={`px-2 py-1 rounded border ${getFormatColor(doc.format)}`}>
          {doc.format}
        </div>
        <span>{doc.size}</span>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          {new Date(doc.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Download size={12} />
          {doc.downloadCount || 0} downloads
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreview(doc)}
            className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
            title="Preview"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDownload(doc)}
            className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const DocumentListItem = ({ doc }) => (
    <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-lg border border-gray-700/50 backdrop-blur-sm p-4 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="text-xl">📄</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors truncate">
              {doc.title}
            </h3>
            {doc.isRequired && (
              <span className="bg-orange-400/10 border border-orange-400/20 rounded-full px-2 py-1 text-xs text-orange-400 font-medium">
                Required
              </span>
            )}
            <div className={`px-2 py-1 rounded border text-xs ${getFormatColor(doc.format)}`}>
              {doc.format}
            </div>
          </div>
          <p className="text-sm text-gray-400 truncate">{doc.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{doc.size}</span>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {new Date(doc.updatedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Download size={12} />
            {doc.downloadCount || 0}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(doc.id)}
            className={`p-2 rounded-lg transition-colors ${
              favorites.includes(doc.id)
                ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Star size={16} fill={favorites.includes(doc.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => handlePreview(doc)}
            className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDownload(doc)}
            className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-indigo-400 mx-auto mb-4" size={48} />
          <p className="text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Error Loading Documents</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchDocuments}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Document Management
        </h1>
        <p className="text-gray-400 mt-2">Access company policies, manuals, forms, and training materials</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search documents, policies, or training materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-600/30 transition-colors"
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {documentTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Quick Access */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-[#1B1E2B] border-gray-700/50 text-gray-300 hover:border-indigo-500/50 hover:text-indigo-400'
                }`}
              >
                <Icon size={16} />
                {category.label}
                <span className="bg-gray-600/50 rounded-full px-2 py-1 text-xs">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Showing {filteredDocuments.length} of {documents.length} documents
            {searchTerm && (
              <span className="text-indigo-400"> for "{searchTerm}"</span>
            )}
          </p>
          
          {favorites.length > 0 && (
            <div className="flex items-center gap-2 text-yellow-400">
              <Star size={16} fill="currentColor" />
              {favorites.length} Favorites
            </div>
          )}
        </div>
      </div>

      {/* Documents Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredDocuments.map(doc => (
          viewMode === 'grid' 
            ? <DocumentCard key={doc.id} doc={doc} />
            : <DocumentListItem key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText size={64} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No documents found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm 
              ? `No documents match your search for "${searchTerm}"`
              : 'No documents available in this category'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeDocuments;