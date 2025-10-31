import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService.js';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Clock,
  Users,
  User,
  Star,
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Layers,
  FolderOpen,
  Hash,
  Flag,
  Bell,
  Copy,
  Upload,
  Link,
  MessageCircle,
  Timer,
  Target,
  Lightbulb,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  UserPlus,
  Coffee,
  Briefcase,
  GraduationCap,
  Trophy,
  Gift,
  Music,
  Camera,
  Mic,
  Video,
  Headphones,
  Gamepad,
  PartyPopper,
  Cake,
  Pizza,
  Utensils,
  Wine,
  Grid,
  List,
  BookOpen,
  X
} from 'lucide-react';

const EmployeeEvents = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);

  // Load events and user registrations on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      // Temporarily using mock data to show expanded descriptions and SVG images
      console.log('Using mock data for demonstration...');
      
      // Mock data with expanded descriptions
      const mockEvents = [
          {
            id: 1,
            title: "Annual Company Retreat",
            description: "Join us for our highly anticipated annual company retreat at the beautiful Mountain View Resort! This three-day immersive experience is designed to strengthen team bonds, foster innovation, and celebrate our collective achievements. The retreat features a diverse range of activities including interactive team-building challenges, leadership workshops led by industry experts, strategic planning sessions, and recreational activities like hiking, kayaking, and evening campfire gatherings. You'll have the opportunity to collaborate with colleagues from different departments, participate in innovation labs, attend keynote presentations from thought leaders, and enjoy gourmet meals prepared by award-winning chefs. The retreat also includes wellness sessions such as morning yoga, meditation workshops, and spa treatments. This is more than just a corporate event – it's a chance to recharge, reconnect, and return to work with renewed energy and fresh perspectives. All accommodation, meals, and activities are fully covered by the company.",
            category: "team-building",
            date: "2024-03-15",
            time: "09:00",
            location: "Mountain View Resort",
            capacity: 100,
            registered: 45,
            status: "upcoming",
            organizer: "HR Department",
            tags: ["team-building", "networking", "retreat"],
            image: "/api/placeholder/400/200"
          },
          {
            id: 2,
            title: "Leadership Development Workshop",
            description: "Elevate your leadership capabilities with this comprehensive two-day intensive workshop designed for emerging and established leaders. This program combines cutting-edge leadership theory with practical, real-world applications. You'll explore advanced communication strategies, learn to navigate complex decision-making scenarios, and develop skills in emotional intelligence, conflict resolution, and team motivation. The workshop features interactive case studies from Fortune 500 companies, role-playing exercises, 360-degree feedback sessions, and personalized coaching from certified leadership consultants. Key topics include authentic leadership styles, building high-performance teams, managing organizational change, strategic thinking, and creating inclusive work environments. Participants will receive a comprehensive leadership assessment, personalized development plan, and access to our exclusive leadership resource library. The workshop also includes networking opportunities with senior executives and alumni from previous programs. Upon completion, you'll earn a certificate in Leadership Excellence and gain access to our ongoing mentorship program.",
            category: "training",
            date: "2024-03-20",
            time: "14:00",
            location: "Conference Room A",
            capacity: 30,
            registered: 28,
            status: "upcoming",
            organizer: "Learning & Development",
            tags: ["leadership", "professional-development", "workshop"],
            image: "/api/placeholder/400/200"
          },
          {
            id: 3,
            title: "Tech Innovation Summit",
            description: "Immerse yourself in the future of technology at our flagship Tech Innovation Summit, featuring world-renowned speakers, cutting-edge demonstrations, and exclusive previews of emerging technologies. This full-day event brings together industry pioneers, startup founders, venture capitalists, and technology enthusiasts to explore the latest trends in artificial intelligence, machine learning, blockchain, quantum computing, cybersecurity, and sustainable technology solutions. The summit includes keynote presentations from tech leaders at companies like Google, Microsoft, and Tesla, interactive panel discussions on digital transformation, hands-on workshops with the latest development tools, and a startup showcase featuring the most promising new companies. Attendees will have access to exclusive networking sessions, one-on-one meetings with industry experts, and a technology expo featuring live demonstrations of breakthrough innovations. The event also includes specialized tracks for different technical disciplines, career development sessions, and insights into emerging job markets. All participants receive a comprehensive digital resource package, access to recorded sessions, and invitations to exclusive follow-up events throughout the year.",
            category: "professional",
            date: "2024-03-25",
            time: "10:00",
            location: "Main Auditorium",
            capacity: 200,
            registered: 150,
            status: "upcoming",
            organizer: "Technology Team",
            tags: ["technology", "innovation", "summit"],
            image: "/api/placeholder/400/200"
          },
          {
            id: 4,
            title: "Wellness Wednesday: Yoga Session",
            description: "Start your Wednesday with renewed energy and inner peace through our expertly guided yoga session, designed to enhance both physical flexibility and mental clarity. This 90-minute session is suitable for all skill levels, from complete beginners to experienced practitioners. Our certified yoga instructor will guide you through a carefully crafted sequence that includes gentle warm-up stretches, strength-building poses, balance challenges, and deep relaxation techniques. The session focuses on stress reduction, improved posture (especially beneficial for desk workers), enhanced breathing techniques, and mindfulness practices that you can incorporate into your daily routine. We'll explore various yoga styles including Hatha, Vinyasa, and restorative yoga, with modifications provided for different fitness levels and physical limitations. The session takes place in our serene wellness center, complete with calming music, aromatherapy, and natural lighting. All necessary equipment including yoga mats, blocks, and straps are provided. Participants often report improved focus, reduced workplace stress, better sleep quality, and increased overall well-being. The session concludes with a brief meditation and healthy refreshments featuring herbal teas and nutritious snacks.",
            category: "wellness",
            date: "2024-03-13",
            time: "08:00",
            location: "Wellness Center",
            capacity: 25,
            registered: 20,
            status: "upcoming",
            organizer: "Wellness Committee",
            tags: ["wellness", "yoga", "health"],
            image: "/api/placeholder/400/200"
          },
          {
            id: 5,
            title: "Q1 All-Hands Meeting",
            description: "Join our comprehensive quarterly all-hands meeting where we celebrate achievements, share strategic insights, and align on our collective vision for the upcoming quarter. This important company-wide gathering features presentations from our executive leadership team, including detailed performance reviews, financial highlights, market analysis, and strategic initiatives. You'll gain valuable insights into company growth metrics, new product launches, market expansion plans, and upcoming organizational changes. The meeting includes recognition ceremonies for outstanding employee achievements, team accomplishments, and milestone celebrations. We'll also unveil exciting new projects, partnership announcements, and innovation initiatives that will shape our company's future. Interactive Q&A sessions provide opportunities to engage directly with senior leadership, ask questions about company direction, and share feedback on workplace initiatives. The event features department spotlights showcasing innovative projects and success stories from across the organization. Additionally, we'll present updates on employee benefits, professional development opportunities, and workplace enhancement programs. The meeting concludes with networking refreshments and informal discussions with colleagues from different departments, fostering cross-functional collaboration and company-wide community building.",
            category: "company",
            date: "2024-02-28",
            time: "15:00",
            location: "Main Conference Hall",
            capacity: 300,
            registered: 280,
            status: "completed",
            organizer: "Executive Team",
            tags: ["quarterly", "all-hands", "company-update"],
            image: "/api/placeholder/400/200"
          }
        ];

        const mockRegistrations = [
          { eventId: 1, status: "registered" },
          { eventId: 4, status: "registered" }
        ];

        console.log('Using mock data - Events:', mockEvents);
        console.log('Mock event descriptions:', mockEvents.map(e => ({ title: e.title, description: e.description.substring(0, 100) + '...' })));
        setEvents(mockEvents);
        setUserRegistrations(mockRegistrations);
        setError(null); // Clear error since we have fallback data
        setLoading(false);
    };

    loadData();
  }, []);

  // Custom SVG illustrations for different event types
  const getEventIllustration = (category) => {
    const illustrations = {
      'team-building': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="teamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#teamGrad)" />
          <circle cx="120" cy="80" r="25" fill="white" opacity="0.9" />
          <circle cx="200" cy="80" r="25" fill="white" opacity="0.9" />
          <circle cx="280" cy="80" r="25" fill="white" opacity="0.9" />
          <path d="M95 105 Q120 120 145 105" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M175 105 Q200 120 225 105" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M255 105 Q280 120 305 105" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
          <text x="200" y="160" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Team Building</text>
        </svg>
      ),
      'training': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#trainGrad)" />
          <rect x="80" y="40" width="240" height="120" rx="10" fill="white" opacity="0.9" />
          <rect x="100" y="60" width="200" height="80" rx="5" fill="#10B981" opacity="0.3" />
          <circle cx="150" cy="100" r="15" fill="#10B981" />
          <rect x="180" y="90" width="80" height="8" rx="4" fill="#10B981" />
          <rect x="180" y="105" width="60" height="6" rx="3" fill="#10B981" opacity="0.7" />
          <text x="200" y="180" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Training Session</text>
        </svg>
      ),
      'professional': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="profGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#profGrad)" />
          <rect x="100" y="60" width="200" height="80" rx="10" fill="white" opacity="0.9" />
          <rect x="120" y="80" width="160" height="40" rx="5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="140" cy="100" r="8" fill="#8B5CF6" />
          <circle cx="170" cy="100" r="8" fill="#8B5CF6" />
          <circle cx="200" cy="100" r="8" fill="#8B5CF6" />
          <circle cx="230" cy="100" r="8" fill="#8B5CF6" />
          <circle cx="260" cy="100" r="8" fill="#8B5CF6" />
          <text x="200" y="170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Professional</text>
        </svg>
      ),
      'wellness': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="wellnessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#wellnessGrad)" />
          <circle cx="200" cy="100" r="60" fill="white" opacity="0.2" />
          <circle cx="200" cy="100" r="40" fill="white" opacity="0.3" />
          <circle cx="200" cy="100" r="20" fill="white" opacity="0.5" />
          <path d="M170 70 Q200 50 230 70 Q200 90 170 70" fill="white" opacity="0.8" />
          <circle cx="185" cy="75" r="3" fill="#EC4899" />
          <circle cx="215" cy="75" r="3" fill="#EC4899" />
          <path d="M185 85 Q200 95 215 85" stroke="#EC4899" strokeWidth="2" fill="none" />
          <text x="200" y="170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Wellness</text>
        </svg>
      ),
      'social': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#socialGrad)" />
          <circle cx="200" cy="100" r="60" fill="white" opacity="0.2" />
          <circle cx="200" cy="100" r="40" fill="white" opacity="0.3" />
          <circle cx="200" cy="100" r="20" fill="white" opacity="0.5" />
          <path d="M170 70 Q200 50 230 70 Q200 90 170 70" fill="white" opacity="0.8" />
          <circle cx="185" cy="75" r="3" fill="#F59E0B" />
          <circle cx="215" cy="75" r="3" fill="#F59E0B" />
          <path d="M185 85 Q200 95 215 85" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <text x="200" y="170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Social Event</text>
        </svg>
      ),
      'company': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="companyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#companyGrad)" />
          <rect x="120" y="50" width="160" height="100" rx="8" fill="white" opacity="0.9" />
          <rect x="140" y="70" width="120" height="60" rx="4" fill="#0F172A" opacity="0.1" />
          <rect x="160" y="85" width="80" height="6" rx="3" fill="#0F172A" opacity="0.6" />
          <rect x="160" y="95" width="60" height="4" rx="2" fill="#0F172A" opacity="0.4" />
          <rect x="160" y="105" width="70" height="4" rx="2" fill="#0F172A" opacity="0.4" />
          <circle cx="170" cy="120" r="4" fill="#0F172A" opacity="0.6" />
          <circle cx="190" cy="120" r="4" fill="#0F172A" opacity="0.6" />
          <circle cx="210" cy="120" r="4" fill="#0F172A" opacity="0.6" />
          <circle cx="230" cy="120" r="4" fill="#0F172A" opacity="0.6" />
          <text x="200" y="175" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Company Meeting</text>
        </svg>
      ),
      'default': (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#defaultGrad)" />
          <circle cx="200" cy="100" r="50" fill="white" opacity="0.2" />
          <rect x="175" y="75" width="50" height="50" rx="5" fill="white" opacity="0.8" />
          <circle cx="200" cy="100" r="15" fill="#6366F1" />
          <text x="200" y="170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Event</text>
        </svg>
      )
    };
    return illustrations[category] || illustrations['default'];
  };

  // Helper function to check if user is registered for an event
  const isUserRegistered = (eventId) => {
    return userRegistrations.some(reg => reg.eventId === eventId && reg.status === 'CONFIRMED');
  };

  // Handle event registration
  const handleRegisterForEvent = async (eventId) => {
    try {
      await eventService.registerForEvent(eventId);
      
      // Refresh user registrations
      const registrationsResponse = await eventService.getUserRegistrations();
      setUserRegistrations(registrationsResponse.data || []);
      
      // Show success message (you can implement a toast notification here)
      alert('Successfully registered for the event!');
    } catch (err) {
      console.error('Error registering for event:', err);
      
      // Fallback: Update local state for mock data
      const newRegistration = { eventId: eventId, status: 'CONFIRMED' };
      setUserRegistrations(prev => [...prev, newRegistration]);
      
      // Update event registered count
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, registered: event.registered + 1 }
          : event
      ));
      
      alert('Successfully registered for the event! (Mock mode)');
    }
  };

  // Handle event registration cancellation
  const handleCancelRegistration = async (eventId) => {
    try {
      await eventService.cancelRegistration(eventId);
      
      // Refresh user registrations
      const registrationsResponse = await eventService.getUserRegistrations();
      setUserRegistrations(registrationsResponse.data || []);
      
      // Show success message
      alert('Registration cancelled successfully!');
    } catch (err) {
      console.error('Error cancelling registration:', err);
      
      // Fallback: Update local state for mock data
      setUserRegistrations(prev => prev.filter(reg => reg.eventId !== eventId));
      
      // Update event registered count
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, registered: Math.max(0, event.registered - 1) }
          : event
      ));
      
      alert('Registration cancelled successfully! (Mock mode)');
    }
  };

  const categories = [
    { id: 'all', label: 'All Events', icon: List },
    { id: 'team-building', label: 'Team Building', icon: Users },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'training', label: 'Training', icon: GraduationCap },
    { id: 'social', label: 'Social', icon: Coffee }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'conference-a', label: 'Conference Center A' },
    { id: 'conference-b', label: 'Conference Center B' },
    { id: 'training-room', label: 'Training Room' },
    { id: 'wellness-center', label: 'Wellness Center' },
    { id: 'outdoor', label: 'Outdoor Venue' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'all' || 
                           event.location.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegister = (eventId) => {
    const isRegistered = isUserRegistered(eventId);
    if (isRegistered) {
      handleCancelRegistration(eventId);
    } else {
      handleRegisterForEvent(eventId);
    }
  };

  const handleWaitlist = (eventId) => {
    // Handle waitlist logic
    console.log('Joining waitlist for event:', eventId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Discover and register for company events
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Plus size={18} />
                  Request Event
                </button>
              </div>
            </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Registered</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Favorites</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>
 
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
 
          {/* Location Filter */}
          <div className="relative">
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
 
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300 transform hover:scale-105"
            >
              {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        {['upcoming', 'registered', 'past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Events Grid/List */}
      <div className={`grid gap-8 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 ${
              viewMode === 'list' ? 'flex items-center gap-8 p-4' : 'shadow-lg'
            }`}
            onClick={() => handleEventClick(event)}
          >
            <div className={viewMode === 'list' ? 'w-56 h-36 flex-shrink-0' : 'h-52'}>
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl overflow-hidden shadow-inner">
                {getEventIllustration(event.category)}
              </div>
            </div>
            
            <div className="p-8 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110">
                  <Heart size={18} />
                </button>
              </div>
 
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
 
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                    <Users size={14} />
                    {event.registered}/{event.capacity}
                  </div>
                  {event.waitlist > 0 && (
                    <div className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded-full">
                      +{event.waitlist} waitlist
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {event.status === 'ACTIVE' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(event.id);
                      }}
                      className={`px-4 py-2 text-white text-sm rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
                        isUserRegistered(event.id)
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      }`}
                    >
                      {isUserRegistered(event.id) ? 'Cancel Registration' : 'Register'}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWaitlist(event.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Join Waitlist
                    </button>
                  )}
                </div>
              </div>
 
              {/* List View Additional Info */}
              {viewMode === 'list' && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">Organizer: {event.organizer}</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">{event.price}</span>
                    <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500" />
                      4.8
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-600">
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-72 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setShowEventModal(false)}
                className="absolute top-4 right-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>
 
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-full">
                      <Calendar size={16} />
                      {selectedEvent.date}
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-2 rounded-full">
                      <Clock size={16} />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-full">
                      <MapPin size={16} />
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-blue-500 transition-all duration-200 transform hover:scale-110 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-yellow-500 transition-all duration-200 transform hover:scale-110 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>
 
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Event Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {selectedEvent.description}
                    </p>
                  </div>
 
                  {selectedEvent.agenda && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Event Agenda
                      </h3>
                      <div className="space-y-4">
                        {selectedEvent.agenda.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[70px] bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                              {item.time}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                              {item.activity}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
 
                <div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl mb-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Registration Info
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Capacity:</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {selectedEvent.capacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Registered:</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {selectedEvent.registered}
                        </span>
                      </div>
                      {selectedEvent.waitlist > 0 && (
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Waitlist:</span>
                          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                            {selectedEvent.waitlist}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Price:</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {selectedEvent.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Organizer:</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {selectedEvent.organizer}
                        </span>
                      </div>
                    </div>
 
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      {selectedEvent.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleRegister(selectedEvent.id)}
                          className={`w-full px-6 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                            isUserRegistered(selectedEvent.id)
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          }`}
                        >
                          {isUserRegistered(selectedEvent.id) ? 'Cancel Registration' : 'Register for Event'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleWaitlist(selectedEvent.id)}
                          className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Join Waitlist
                        </button>
                      )}
                    </div>
                  </div>
 
                  {selectedEvent.tags && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedEvent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default EmployeeEvents;