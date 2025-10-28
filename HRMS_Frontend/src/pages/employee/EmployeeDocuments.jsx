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
      setDocuments(data);
      
      // Extract favorites from the response
      const favoriteIds = data.filter(doc => doc.isFavorited).map(doc => doc.id);
      setFavorites(favoriteIds);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching documents:', err);
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
      console.error('Error fetching categories:', err);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (docId) => {
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
        throw new Error('Failed to toggle favorite');
      }

      const result = await response.json();
      
      // Update local favorites state
      setFavorites(prev => 
        result.isFavorited 
          ? [...prev, docId]
          : prev.filter(id => id !== docId)
      );

      // Update documents state to reflect favorite status
      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { ...doc, isFavorited: result.isFavorited }
          : doc
      ));
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Handle download
  const handleDownload = async (doc) => {
    try {
      const token = getAuthToken();
      
      // Record the download
      await fetch(`http://localhost:3001/api/documents/${doc.id}/download`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Simulate file download (in real implementation, this would download the actual file)
      console.log(`Downloading ${doc.title}`);
      
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

  const handlePreview = (doc) => {
    // Simulate preview (in real implementation, this would open the document)
    console.log(`Previewing ${doc.title}`);
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