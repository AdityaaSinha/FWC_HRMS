import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Plus,
  MessageSquare,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Book,
  FileText,
  Video,
  Download,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Tag,
  Calendar,
  Phone,
  Mail,
  Monitor,
  Smartphone,
  Wifi,
  Shield,
  Database,
  Settings,
  Printer,
  Headphones,
  Keyboard,
  Mouse,
  Camera,
  Mic,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  Archive,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Layers,
  FolderOpen,
  Hash,
  Flag,
  Bell,
  Bookmark,
  Share2,
  Copy,
  Upload,
  Link,
  MessageCircle,
  Timer,
  Target,
  Lightbulb,
  Wrench,
  Cpu,
  HardDrive,
  Server,
  Cloud,
  Laptop,
  TabletSmartphone,
  Router,
  Cable,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Bluetooth,
  Usb,
  Gamepad2,
  Projector,
  Tv,
  Radio,
  Webcam,
  Fingerprint,
  QrCode,
  Scan,
  Gauge,
  Thermometer,
  Zap as Lightning,
  Bug,
  AlertTriangle,
  Info,
  CheckSquare,
  Square,
  Circle,
  Minus,
  X,
  Save,
  ArrowUp,
  ArrowDown,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid,
  List
} from 'lucide-react';

const EmployeeHelpDesk = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedKBCategory, setSelectedKBCategory] = useState('all');

  // Mock data for tickets
  const [tickets] = useState([
    {
      id: 'TKT-001',
      title: 'Unable to access company email',
      description: 'I cannot log into my company email account. Getting authentication error when trying to access Outlook.',
      status: 'open',
      priority: 'high',
      category: 'email',
      subcategory: 'authentication',
      requester: 'Aryabrat Mishra',
      assignedTo: 'IT Support Team',
      createdDate: '2024-02-15T09:30:00Z',
      updatedDate: '2024-02-15T14:20:00Z',
      dueDate: '2024-02-16T17:00:00Z',
      tags: ['email', 'outlook', 'authentication', 'urgent'],
      attachments: [
        { name: 'error_screenshot.png', size: '1.2 MB', type: 'image' }
      ],
      comments: [
        {
          id: 'comment1',
          author: 'IT Support',
          content: 'We are looking into this issue. Please try resetting your password first.',
          timestamp: '2024-02-15T10:15:00Z',
          type: 'response'
        },
        {
          id: 'comment2',
          author: 'Aryabrat Mishra',
          content: 'Password reset did not work. Still getting the same error.',
          timestamp: '2024-02-15T14:20:00Z',
          type: 'update'
        }
      ],
      resolution: null,
      satisfaction: null,
      estimatedResolutionTime: '4 hours',
      actualResolutionTime: null
    },
    {
      id: 'TKT-002',
      title: 'Laptop running very slow',
      description: 'My laptop has been running extremely slow for the past few days. Applications take forever to load and the system freezes frequently.',
      status: 'in_progress',
      priority: 'medium',
      category: 'hardware',
      subcategory: 'performance',
      requester: 'Alex Rivera',
      assignedTo: 'John Smith',
      createdDate: '2024-02-14T11:45:00Z',
      updatedDate: '2024-02-15T16:30:00Z',
      dueDate: '2024-02-17T17:00:00Z',
      tags: ['laptop', 'performance', 'slow', 'hardware'],
      attachments: [
        { name: 'system_info.txt', size: '2.4 KB', type: 'text' },
        { name: 'task_manager.png', size: '856 KB', type: 'image' }
      ],
      comments: [
        {
          id: 'comment3',
          author: 'John Smith',
          content: 'I have reviewed your system information. It appears your hard drive is nearly full. Please clean up some space and run a disk cleanup.',
          timestamp: '2024-02-15T16:30:00Z',
          type: 'response'
        }
      ],
      resolution: null,
      satisfaction: null,
      estimatedResolutionTime: '2 hours',
      actualResolutionTime: null
    },
    {
      id: 'TKT-003',
      title: 'Cannot connect to VPN',
      description: 'VPN connection keeps failing when trying to work from home. Error message says "Connection timeout".',
      status: 'resolved',
      priority: 'medium',
      category: 'network',
      subcategory: 'vpn',
      requester: 'Jordan Kim',
      assignedTo: 'Sarah Wilson',
      createdDate: '2024-02-13T08:20:00Z',
      updatedDate: '2024-02-14T10:45:00Z',
      resolvedDate: '2024-02-14T10:45:00Z',
      dueDate: '2024-02-15T17:00:00Z',
      tags: ['vpn', 'network', 'remote', 'connection'],
      attachments: [],
      comments: [
        {
          id: 'comment4',
          author: 'Sarah Wilson',
          content: 'The issue was with your VPN client configuration. I have updated the settings remotely. Please try connecting again.',
          timestamp: '2024-02-14T10:45:00Z',
          type: 'resolution'
        }
      ],
      resolution: 'Updated VPN client configuration and network settings. Connection restored successfully.',
      satisfaction: 5,
      estimatedResolutionTime: '1 hour',
      actualResolutionTime: '45 minutes'
    },
    {
      id: 'TKT-004',
      title: 'Software installation request',
      description: 'Need Adobe Creative Suite installed on my workstation for design work. Please install Photoshop, Illustrator, and InDesign.',
      status: 'pending',
      priority: 'low',
      category: 'software',
      subcategory: 'installation',
      requester: 'Emily Chen',
      assignedTo: 'IT Support Team',
      createdDate: '2024-02-15T13:15:00Z',
      updatedDate: '2024-02-15T13:15:00Z',
      dueDate: '2024-02-20T17:00:00Z',
      tags: ['software', 'adobe', 'installation', 'design'],
      attachments: [
        { name: 'software_request_form.pdf', size: '245 KB', type: 'pdf' }
      ],
      comments: [],
      resolution: null,
      satisfaction: null,
      estimatedResolutionTime: '2 hours',
      actualResolutionTime: null
    },
    {
      id: 'TKT-005',
      title: 'Printer not working',
      description: 'Office printer on 3rd floor is not responding. Shows offline status even though it is powered on.',
      status: 'closed',
      priority: 'low',
      category: 'hardware',
      subcategory: 'printer',
      requester: 'David Park',
      assignedTo: 'Mike Johnson',
      createdDate: '2024-02-12T14:30:00Z',
      updatedDate: '2024-02-13T09:20:00Z',
      resolvedDate: '2024-02-13T09:20:00Z',
      closedDate: '2024-02-13T09:20:00Z',
      dueDate: '2024-02-14T17:00:00Z',
      tags: ['printer', 'hardware', 'offline', '3rd-floor'],
      attachments: [],
      comments: [
        {
          id: 'comment5',
          author: 'Mike Johnson',
          content: 'Printer driver was corrupted. Reinstalled drivers and printer is now working properly.',
          timestamp: '2024-02-13T09:20:00Z',
          type: 'resolution'
        }
      ],
      resolution: 'Reinstalled printer drivers and reset network connection. Printer is now online and functioning normally.',
      satisfaction: 4,
      estimatedResolutionTime: '30 minutes',
      actualResolutionTime: '25 minutes'
    }
  ]);

  // Mock data for knowledge base
  const [knowledgeBase] = useState([
    {
      id: 'kb1',
      title: 'How to Reset Your Password',
      category: 'account',
      subcategory: 'password',
      content: 'Step-by-step guide to reset your company account password.',
      type: 'article',
      views: 1250,
      rating: 4.8,
      lastUpdated: '2024-02-10',
      tags: ['password', 'reset', 'account', 'security'],
      helpful: 95,
      notHelpful: 5,
      steps: [
        'Go to the company login page',
        'Click on "Forgot Password" link',
        'Enter your company email address',
        'Check your email for reset instructions',
        'Follow the link in the email',
        'Create a new strong password',
        'Confirm your new password'
      ]
    },
    {
      id: 'kb2',
      title: 'VPN Setup Guide for Remote Work',
      category: 'network',
      subcategory: 'vpn',
      content: 'Complete guide to set up and configure VPN for secure remote access.',
      type: 'video',
      views: 890,
      rating: 4.6,
      lastUpdated: '2024-02-08',
      tags: ['vpn', 'remote', 'setup', 'network', 'security'],
      helpful: 78,
      notHelpful: 12,
      duration: '8:45',
      videoUrl: '#'
    },
    {
      id: 'kb3',
      title: 'Email Configuration for Mobile Devices',
      category: 'email',
      subcategory: 'mobile',
      content: 'How to configure company email on your smartphone or tablet.',
      type: 'article',
      views: 675,
      rating: 4.5,
      lastUpdated: '2024-02-05',
      tags: ['email', 'mobile', 'configuration', 'smartphone', 'tablet'],
      helpful: 62,
      notHelpful: 8,
      steps: [
        'Open your device email app',
        'Add new account',
        'Select Exchange or IMAP',
        'Enter your company email and password',
        'Configure server settings',
        'Test the connection',
        'Sync your emails'
      ]
    },
    {
      id: 'kb4',
      title: 'Software Installation Requests',
      category: 'software',
      subcategory: 'installation',
      content: 'Process for requesting new software installations on company devices.',
      type: 'article',
      views: 445,
      rating: 4.3,
      lastUpdated: '2024-02-01',
      tags: ['software', 'installation', 'request', 'approval'],
      helpful: 38,
      notHelpful: 7,
      steps: [
        'Fill out software request form',
        'Get manager approval',
        'Submit request to IT',
        'Wait for security review',
        'Schedule installation time',
        'Complete installation',
        'Verify software functionality'
      ]
    },
    {
      id: 'kb5',
      title: 'Troubleshooting Slow Computer Performance',
      category: 'hardware',
      subcategory: 'performance',
      content: 'Common solutions for improving computer performance and speed.',
      type: 'article',
      views: 1120,
      rating: 4.7,
      lastUpdated: '2024-02-12',
      tags: ['performance', 'slow', 'computer', 'troubleshooting', 'optimization'],
      helpful: 89,
      notHelpful: 11,
      steps: [
        'Check available disk space',
        'Run disk cleanup utility',
        'Close unnecessary programs',
        'Check for malware',
        'Update system drivers',
        'Restart your computer',
        'Contact IT if issues persist'
      ]
    }
  ]);

  // Mock data for categories
  const categories = [
    { id: 'email', name: 'Email & Communication', icon: Mail, count: 45 },
    { id: 'hardware', name: 'Hardware Issues', icon: Monitor, count: 32 },
    { id: 'software', name: 'Software & Applications', icon: Settings, count: 28 },
    { id: 'network', name: 'Network & Connectivity', icon: Wifi, count: 23 },
    { id: 'security', name: 'Security & Access', icon: Shield, count: 19 },
    { id: 'account', name: 'Account Management', icon: User, count: 15 },
    { id: 'printer', name: 'Printing & Scanning', icon: Printer, count: 12 },
    { id: 'mobile', name: 'Mobile Devices', icon: Smartphone, count: 8 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'pending': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} className="text-blue-400" />;
      case 'in_progress': return <Clock size={16} className="text-yellow-400" />;
      case 'pending': return <Timer size={16} className="text-purple-400" />;
      case 'resolved': return <CheckCircle size={16} className="text-green-400" />;
      case 'closed': return <XCircle size={16} className="text-gray-400" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    if (categoryData) {
      const IconComponent = categoryData.icon;
      return <IconComponent size={16} className="text-indigo-400" />;
    }
    return <HelpCircle size={16} className="text-gray-400" />;
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const filteredKnowledgeBase = knowledgeBase.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedKBCategory === 'all' || article.category === selectedKBCategory;
    
    return matchesSearch && matchesCategory;
  });

  const TicketCard = ({ ticket }) => {
    const isOverdue = new Date(ticket.dueDate) < new Date() && ticket.status !== 'resolved' && ticket.status !== 'closed';
    const daysUntilDue = Math.ceil((new Date(ticket.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
              {getStatusIcon(ticket.status)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                {ticket.title}
              </h3>
              <p className="text-sm text-gray-400">
                {ticket.id} • {ticket.category}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()}
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
          {ticket.description}
        </p>

        {/* Status and Assignment */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
              <User size={12} className="text-indigo-400" />
            </div>
            <span className="text-sm text-gray-300">{ticket.assignedTo}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Calendar size={14} className={isOverdue ? 'text-red-400' : 'text-gray-400'} />
            <span className={isOverdue ? 'text-red-400' : 'text-gray-400'}>
              {isOverdue ? 'Overdue' : daysUntilDue === 0 ? 'Due today' : `${daysUntilDue}d left`}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ticket.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
            >
              {tag}
            </span>
          ))}
          {ticket.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{ticket.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Paperclip size={12} />
                {ticket.attachments.length}
              </div>
            )}
            {ticket.comments && ticket.comments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MessageSquare size={12} />
                {ticket.comments.length}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTicket(ticket)}
              className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm hover:bg-indigo-600/30 transition-colors"
            >
              <Eye size={14} className="inline mr-1" />
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  const KnowledgeBaseCard = ({ article }) => {
    const IconComponent = article.type === 'video' ? Video : FileText;
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <IconComponent size={16} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-purple-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400">
                {article.category} • {article.type}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <Star size={14} />
            {article.rating}
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
          {article.content}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              {article.views}
            </div>
            {article.type === 'video' && article.duration && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {article.duration}
              </div>
            )}
            <div className="flex items-center gap-1">
              <ThumbsUp size={14} />
              {article.helpful}
            </div>
          </div>
          
          <span className="text-xs text-gray-500">
            Updated {new Date(article.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-400/10 border border-purple-400/20 rounded text-xs text-purple-400"
            >
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
              <ThumbsUp size={16} />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
              <ThumbsDown size={16} />
            </button>
            <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
              <Share2 size={16} />
            </button>
            <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
              <Bookmark size={16} />
            </button>
          </div>
          
          <button className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-600/30 transition-colors">
            <ExternalLink size={14} className="inline mr-1" />
            Read More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
          <HelpCircle size={36} className="text-indigo-400" />
          Help Desk
        </h1>
        <p className="text-gray-400 mt-2">Get IT support, browse knowledge base, and manage tickets</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <MessageSquare size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{tickets.length}</p>
              <p className="text-sm text-gray-400">Total Tickets</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <Clock size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
              </p>
              <p className="text-sm text-gray-400">Active Tickets</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
              <p className="text-sm text-gray-400">Resolved</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <Book size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{knowledgeBase.length}</p>
              <p className="text-sm text-gray-400">KB Articles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-[#1B1E2B] rounded-lg p-1 border border-gray-700/50">
          {[
            { id: 'tickets', label: 'My Tickets', icon: MessageSquare },
            { id: 'knowledge', label: 'Knowledge Base', icon: Book },
            { id: 'categories', label: 'Categories', icon: FolderOpen }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'tickets' ? 'Search tickets...' : 'Search knowledge base...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
          
          {activeTab === 'tickets' && (
            <button
              onClick={() => setShowTicketModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              New Ticket
            </button>
          )}
        </div>
      </div>

      {/* Filters for Tickets */}
      {activeTab === 'tickets' && (
        <div className="flex items-center gap-4 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filters for Knowledge Base */}
      {activeTab === 'knowledge' && (
        <div className="flex items-center gap-4 mb-6">
          <select
            value={selectedKBCategory}
            onChange={(e) => setSelectedKBCategory(e.target.value)}
            className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredKnowledgeBase.map(article => (
            <KnowledgeBaseCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setFilterCategory(category.id);
                  setActiveTab('tickets');
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-lg group-hover:bg-indigo-600/30 transition-colors">
                    <IconComponent size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400">{category.count} articles</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Browse category</span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeHelpDesk;