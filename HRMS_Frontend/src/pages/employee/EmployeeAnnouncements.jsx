import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User,
  Pin,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  Zap,
  Building,
  Users,
  Globe,
  FileText,
  Image,
  Video,
  Link,
  Download,
  ExternalLink,
  MoreVertical,
  ThumbsUp,
  Flag
} from 'lucide-react';

const EmployeeAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const [bookmarkedPosts, setBookmarkedPosts] = useState(['ann1', 'ann5']);
  const [likedPosts, setLikedPosts] = useState(['ann2', 'ann4']);
  const [readPosts, setReadPosts] = useState(['ann1', 'ann2', 'ann3']);

  // Mock announcements data
  const [announcements] = useState([
    {
      id: 'ann1',
      title: 'Q1 2024 Company All-Hands Meeting',
      content: 'Join us for our quarterly all-hands meeting where we\'ll discuss company performance, upcoming initiatives, and celebrate team achievements. This is a mandatory meeting for all employees.',
      category: 'company',
      priority: 'high',
      author: {
        name: 'Sarah Johnson',
        role: 'CEO',
        avatar: null,
        department: 'Executive'
      },
      publishedAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      isPinned: true,
      isUrgent: true,
      tags: ['meeting', 'mandatory', 'quarterly', 'all-hands'],
      attachments: [
        { name: 'Q1-Agenda.pdf', type: 'pdf', size: '2.3 MB', url: '#' },
        { name: 'Company-Performance.pptx', type: 'presentation', size: '5.1 MB', url: '#' }
      ],
      engagement: {
        views: 245,
        likes: 32,
        comments: 8,
        shares: 5
      },
      eventDetails: {
        date: '2024-01-25',
        time: '10:00 AM - 11:30 AM',
        location: 'Main Conference Room / Virtual',
        meetingLink: 'https://meet.company.com/allhands-q1'
      },
      readBy: ['emp1', 'emp2', 'emp3'],
      targetAudience: 'all'
    },
    {
      id: 'ann2',
      title: 'New Employee Benefits Package Available',
      content: 'We\'re excited to announce enhanced employee benefits including improved health insurance, dental coverage, and a new wellness program. Open enrollment begins next Monday.',
      category: 'hr',
      priority: 'medium',
      author: {
        name: 'Michael Rodriguez',
        role: 'HR Director',
        avatar: null,
        department: 'Human Resources'
      },
      publishedAt: '2024-01-14T14:30:00Z',
      updatedAt: '2024-01-14T14:30:00Z',
      isPinned: false,
      isUrgent: false,
      tags: ['benefits', 'health', 'wellness', 'enrollment'],
      attachments: [
        { name: 'Benefits-Guide-2024.pdf', type: 'pdf', size: '4.2 MB', url: '#' },
        { name: 'Wellness-Program-Overview.pdf', type: 'pdf', size: '1.8 MB', url: '#' }
      ],
      engagement: {
        views: 189,
        likes: 28,
        comments: 12,
        shares: 3
      },
      actionRequired: {
        deadline: '2024-01-30',
        action: 'Complete benefits enrollment',
        link: '/employee/benefits'
      },
      readBy: ['emp1', 'emp4'],
      targetAudience: 'all'
    },
    {
      id: 'ann3',
      title: 'Office Renovation Schedule - Engineering Floor',
      content: 'The engineering floor will undergo renovation from January 22-26. Temporary workspaces have been arranged on the 3rd floor. Please coordinate with your team leads for seating arrangements.',
      category: 'facilities',
      priority: 'medium',
      author: {
        name: 'Lisa Park',
        role: 'Facilities Manager',
        avatar: null,
        department: 'Operations'
      },
      publishedAt: '2024-01-13T11:15:00Z',
      updatedAt: '2024-01-13T11:15:00Z',
      isPinned: false,
      isUrgent: false,
      tags: ['renovation', 'engineering', 'workspace', 'temporary'],
      attachments: [
        { name: 'Floor-Plan-Temporary.pdf', type: 'pdf', size: '1.2 MB', url: '#' },
        { name: 'Renovation-Timeline.jpg', type: 'image', size: '856 KB', url: '#' }
      ],
      engagement: {
        views: 156,
        likes: 15,
        comments: 6,
        shares: 2
      },
      affectedDepartments: ['Engineering', 'DevOps'],
      readBy: ['emp1', 'emp2', 'emp5'],
      targetAudience: 'department'
    },
    {
      id: 'ann4',
      title: 'Security Update: New VPN Configuration Required',
      content: 'As part of our ongoing security improvements, all employees must update their VPN configuration by January 20th. IT support will be available for assistance.',
      category: 'it',
      priority: 'high',
      author: {
        name: 'James Wilson',
        role: 'IT Security Manager',
        avatar: null,
        department: 'Information Technology'
      },
      publishedAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      isPinned: true,
      isUrgent: true,
      tags: ['security', 'vpn', 'mandatory', 'deadline'],
      attachments: [
        { name: 'VPN-Setup-Guide.pdf', type: 'pdf', size: '3.1 MB', url: '#' },
        { name: 'Security-Policy-Update.pdf', type: 'pdf', size: '2.7 MB', url: '#' }
      ],
      engagement: {
        views: 298,
        likes: 18,
        comments: 22,
        shares: 8
      },
      actionRequired: {
        deadline: '2024-01-20',
        action: 'Update VPN configuration',
        link: '/employee/it-support'
      },
      readBy: ['emp1'],
      targetAudience: 'all'
    },
    {
      id: 'ann5',
      title: 'Employee Recognition: Outstanding Performance Awards',
      content: 'Congratulations to this month\'s outstanding performers! Join us in celebrating their achievements and contributions to our team success.',
      category: 'recognition',
      priority: 'low',
      author: {
        name: 'Emily Chen',
        role: 'People Operations Manager',
        avatar: null,
        department: 'Human Resources'
      },
      publishedAt: '2024-01-11T10:20:00Z',
      updatedAt: '2024-01-11T10:20:00Z',
      isPinned: false,
      isUrgent: false,
      tags: ['recognition', 'awards', 'performance', 'celebration'],
      attachments: [
        { name: 'Award-Winners-January.pdf', type: 'pdf', size: '1.5 MB', url: '#' },
        { name: 'Recognition-Ceremony-Photos.zip', type: 'archive', size: '12.3 MB', url: '#' }
      ],
      engagement: {
        views: 134,
        likes: 45,
        comments: 18,
        shares: 12
      },
      awardees: [
        { name: 'Aryabrat Mishra', department: 'Engineering', award: 'Innovation Excellence' },
        { name: 'Sarah Johnson', department: 'Engineering', award: 'Leadership Excellence' },
        { name: 'Michael Rodriguez', department: 'Design', award: 'Creative Excellence' }
      ],
      readBy: ['emp2', 'emp3', 'emp4'],
      targetAudience: 'all'
    },
    {
      id: 'ann6',
      title: 'New Project Management Tool Rollout',
      content: 'We\'re introducing a new project management platform to improve collaboration and productivity. Training sessions will be conducted next week.',
      category: 'tools',
      priority: 'medium',
      author: {
        name: 'David Chen',
        role: 'Operations Director',
        avatar: null,
        department: 'Operations'
      },
      publishedAt: '2024-01-10T13:30:00Z',
      updatedAt: '2024-01-10T13:30:00Z',
      isPinned: false,
      isUrgent: false,
      tags: ['tools', 'project-management', 'training', 'productivity'],
      attachments: [
        { name: 'Tool-Overview.pdf', type: 'pdf', size: '2.8 MB', url: '#' },
        { name: 'Training-Schedule.pdf', type: 'pdf', size: '1.1 MB', url: '#' }
      ],
      engagement: {
        views: 167,
        likes: 22,
        comments: 9,
        shares: 4
      },
      trainingSchedule: [
        { date: '2024-01-22', time: '2:00 PM - 3:00 PM', audience: 'Managers' },
        { date: '2024-01-23', time: '10:00 AM - 11:00 AM', audience: 'All Staff' },
        { date: '2024-01-24', time: '3:00 PM - 4:00 PM', audience: 'Advanced Users' }
      ],
      readBy: ['emp5'],
      targetAudience: 'all'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Categories', icon: Globe, count: announcements.length },
    { id: 'company', label: 'Company News', icon: Building, count: announcements.filter(a => a.category === 'company').length },
    { id: 'hr', label: 'HR Updates', icon: Users, count: announcements.filter(a => a.category === 'hr').length },
    { id: 'it', label: 'IT & Security', icon: Zap, count: announcements.filter(a => a.category === 'it').length },
    { id: 'facilities', label: 'Facilities', icon: Building, count: announcements.filter(a => a.category === 'facilities').length },
    { id: 'recognition', label: 'Recognition', icon: Star, count: announcements.filter(a => a.category === 'recognition').length },
    { id: 'tools', label: 'Tools & Systems', icon: FileText, count: announcements.filter(a => a.category === 'tools').length }
  ];

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'high', label: 'High Priority', color: 'text-red-400' },
    { id: 'medium', label: 'Medium Priority', color: 'text-yellow-400' },
    { id: 'low', label: 'Low Priority', color: 'text-green-400' }
  ];

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         announcement.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Sort announcements (pinned first, then by date)
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const toggleBookmark = (announcementId) => {
    setBookmarkedPosts(prev => 
      prev.includes(announcementId) 
        ? prev.filter(id => id !== announcementId)
        : [...prev, announcementId]
    );
  };

  const toggleLike = (announcementId) => {
    setLikedPosts(prev => 
      prev.includes(announcementId) 
        ? prev.filter(id => id !== announcementId)
        : [...prev, announcementId]
    );
  };

  const markAsRead = (announcementId) => {
    if (!readPosts.includes(announcementId)) {
      setReadPosts(prev => [...prev, announcementId]);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'company': return Building;
      case 'hr': return Users;
      case 'it': return Zap;
      case 'facilities': return Building;
      case 'recognition': return Star;
      case 'tools': return FileText;
      default: return Info;
    }
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'presentation': return FileText;
      case 'archive': return Download;
      default: return FileText;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const AnnouncementCard = ({ announcement }) => {
    const CategoryIcon = getCategoryIcon(announcement.category);
    const isRead = readPosts.includes(announcement.id);
    const isBookmarked = bookmarkedPosts.includes(announcement.id);
    const isLiked = likedPosts.includes(announcement.id);

    return (
      <div 
        className={`bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group relative ${
          isRead ? 'border-gray-700/50' : 'border-indigo-500/30 shadow-lg shadow-indigo-500/10'
        }`}
        onClick={() => markAsRead(announcement.id)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {announcement.isPinned && (
              <Pin size={16} className="text-yellow-400 fill-current" />
            )}
            {announcement.isUrgent && (
              <AlertCircle size={16} className="text-red-400" />
            )}
            <div className={`p-2 rounded-lg ${getPriorityColor(announcement.priority)}`}>
              <CategoryIcon size={16} />
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isRead && (
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(announcement.id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Title and Content */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
            {announcement.title}
          </h3>
          <p className="text-gray-300 line-clamp-3 leading-relaxed">
            {announcement.content}
          </p>
        </div>

        {/* Tags */}
        {announcement.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {announcement.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
              >
                #{tag}
              </span>
            ))}
            {announcement.tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
                +{announcement.tags.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Attachments */}
        {announcement.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FileText size={14} />
              Attachments ({announcement.attachments.length})
            </h4>
            <div className="space-y-2">
              {announcement.attachments.map((attachment, index) => {
                const AttachmentIcon = getAttachmentIcon(attachment.type);
                return (
                  <div key={index} className="flex items-center gap-3 p-2 bg-[#2A2D3D]/50 rounded-lg border border-gray-700/50">
                    <AttachmentIcon size={16} className="text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{attachment.size}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-indigo-400 transition-colors">
                      <Download size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-indigo-400 transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Required */}
        {announcement.actionRequired && (
          <div className="mb-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Action Required</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">{announcement.actionRequired.action}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Deadline: {new Date(announcement.actionRequired.deadline).toLocaleDateString()}
              </span>
              <button className="px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded text-xs text-yellow-400 hover:bg-yellow-400/30 transition-colors">
                Take Action
              </button>
            </div>
          </div>
        )}

        {/* Author and Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full border border-indigo-500/30 flex items-center justify-center">
              <User size={14} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">{announcement.author.name}</p>
              <p className="text-xs text-gray-500">{announcement.author.role} • {announcement.author.department}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(announcement.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Eye size={12} />
              {announcement.engagement.views}
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50 mt-3">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(announcement.id);
              }}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                isLiked
                  ? 'text-red-400 bg-red-400/10 border border-red-400/20'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
              }`}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-xs">{announcement.engagement.likes + (isLiked ? 1 : 0)}</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
              <MessageCircle size={14} />
              <span className="text-xs">{announcement.engagement.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors">
              <Share2 size={14} />
              <span className="text-xs">{announcement.engagement.shares}</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            Read by {announcement.readBy.length} people
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
          <Megaphone size={36} className="text-indigo-400" />
          Company Announcements
        </h1>
        <p className="text-gray-400 mt-2">Stay updated with the latest news, updates, and important information</p>
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
                placeholder="Search announcements, tags, or authors..."
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

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Bell size={16} />
                {sortedAnnouncements.filter(a => !readPosts.includes(a.id)).length} unread
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {priorities.map(priority => (
                      <option key={priority.id} value={priority.id}>{priority.label}</option>
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
            const CategoryIcon = category.icon;
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
                <CategoryIcon size={16} />
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
            Showing {sortedAnnouncements.length} of {announcements.length} announcements
            {searchTerm && (
              <span className="text-indigo-400"> for "{searchTerm}"</span>
            )}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            {bookmarkedPosts.length > 0 && (
              <div className="flex items-center gap-2 text-yellow-400">
                <Bookmark size={16} fill="currentColor" />
                {bookmarkedPosts.length} Bookmarked
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400">
              <Eye size={16} />
              {readPosts.length} Read
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedAnnouncements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>

      {/* Empty State */}
      {sortedAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone size={64} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No announcements found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm 
              ? `No announcements match your search for "${searchTerm}"`
              : 'No announcements available for the selected filters'
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

export default EmployeeAnnouncements;