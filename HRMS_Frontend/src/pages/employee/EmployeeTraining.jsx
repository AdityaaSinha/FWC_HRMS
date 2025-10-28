import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  Pause,
  CheckCircle,
  Clock,
  Star,
  Award,
  Users,
  Calendar,
  BarChart3,
  Target,
  TrendingUp,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Bookmark,
  Share2,
  MoreVertical,
  User,
  Globe,
  Video,
  FileText,
  Headphones,
  Monitor,
  Smartphone,
  Trophy,
  Brain,
  Lightbulb,
  Zap,
  Flag,
  Timer
} from 'lucide-react';

const EmployeeTraining = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [bookmarkedCourses, setBookmarkedCourses] = useState(['course2', 'course5']);
  const [enrolledCourses, setEnrolledCourses] = useState(['course1', 'course3', 'course4']);

  // Mock training data
  const [courses] = useState([
    {
      id: 'course1',
      title: 'Advanced React Development',
      description: 'Master advanced React concepts including hooks, context, performance optimization, and modern patterns.',
      category: 'technical',
      level: 'advanced',
      duration: '8 hours',
      modules: 12,
      instructor: {
        name: 'Sarah Johnson',
        role: 'Senior Frontend Engineer',
        avatar: null,
        rating: 4.9
      },
      thumbnail: null,
      rating: 4.8,
      enrollments: 234,
      completions: 189,
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Performance'],
      skills: ['React Hooks', 'Context API', 'Performance Optimization', 'Testing'],
      prerequisites: ['Basic React', 'JavaScript ES6+'],
      format: 'video',
      language: 'English',
      certificate: true,
      cpdPoints: 8,
      lastUpdated: '2024-01-10',
      progress: 65,
      status: 'in_progress',
      estimatedCompletion: '2024-01-25',
      nextLesson: 'Module 8: Performance Optimization',
      learningPath: 'Frontend Development Mastery'
    },
    {
      id: 'course2',
      title: 'Leadership Fundamentals',
      description: 'Develop essential leadership skills including team management, communication, and strategic thinking.',
      category: 'leadership',
      level: 'intermediate',
      duration: '6 hours',
      modules: 8,
      instructor: {
        name: 'Michael Rodriguez',
        role: 'Leadership Coach',
        avatar: null,
        rating: 4.7
      },
      thumbnail: null,
      rating: 4.6,
      enrollments: 156,
      completions: 134,
      tags: ['Leadership', 'Management', 'Communication', 'Strategy'],
      skills: ['Team Leadership', 'Strategic Thinking', 'Communication', 'Decision Making'],
      prerequisites: ['Basic Management Experience'],
      format: 'mixed',
      language: 'English',
      certificate: true,
      cpdPoints: 6,
      lastUpdated: '2024-01-08',
      progress: 0,
      status: 'not_started',
      estimatedCompletion: null,
      nextLesson: 'Module 1: Introduction to Leadership',
      learningPath: 'Management Excellence'
    },
    {
      id: 'course3',
      title: 'Data Analysis with Python',
      description: 'Learn data analysis techniques using Python, pandas, and visualization libraries.',
      category: 'technical',
      level: 'intermediate',
      duration: '10 hours',
      modules: 15,
      instructor: {
        name: 'Emily Chen',
        role: 'Data Scientist',
        avatar: null,
        rating: 4.8
      },
      thumbnail: null,
      rating: 4.7,
      enrollments: 198,
      completions: 145,
      tags: ['Python', 'Data Analysis', 'Pandas', 'Visualization'],
      skills: ['Python Programming', 'Data Manipulation', 'Statistical Analysis', 'Data Visualization'],
      prerequisites: ['Basic Python', 'Statistics Fundamentals'],
      format: 'video',
      language: 'English',
      certificate: true,
      cpdPoints: 10,
      lastUpdated: '2024-01-12',
      progress: 30,
      status: 'in_progress',
      estimatedCompletion: '2024-02-05',
      nextLesson: 'Module 5: Data Cleaning Techniques',
      learningPath: 'Data Science Fundamentals'
    },
    {
      id: 'course4',
      title: 'Cybersecurity Awareness',
      description: 'Essential cybersecurity knowledge for all employees including threat recognition and best practices.',
      category: 'security',
      level: 'beginner',
      duration: '3 hours',
      modules: 6,
      instructor: {
        name: 'James Wilson',
        role: 'Security Specialist',
        avatar: null,
        rating: 4.9
      },
      thumbnail: null,
      rating: 4.9,
      enrollments: 456,
      completions: 398,
      tags: ['Security', 'Awareness', 'Best Practices', 'Compliance'],
      skills: ['Threat Recognition', 'Password Security', 'Email Security', 'Data Protection'],
      prerequisites: [],
      format: 'interactive',
      language: 'English',
      certificate: true,
      cpdPoints: 3,
      lastUpdated: '2024-01-15',
      progress: 100,
      status: 'completed',
      estimatedCompletion: null,
      nextLesson: null,
      learningPath: 'Security Fundamentals',
      completedDate: '2024-01-18'
    },
    {
      id: 'course5',
      title: 'Project Management Essentials',
      description: 'Learn project management methodologies, tools, and best practices for successful project delivery.',
      category: 'business',
      level: 'intermediate',
      duration: '7 hours',
      modules: 10,
      instructor: {
        name: 'Lisa Park',
        role: 'Project Manager',
        avatar: null,
        rating: 4.6
      },
      thumbnail: null,
      rating: 4.5,
      enrollments: 167,
      completions: 123,
      tags: ['Project Management', 'Agile', 'Scrum', 'Planning'],
      skills: ['Project Planning', 'Risk Management', 'Agile Methodologies', 'Team Coordination'],
      prerequisites: ['Basic Business Knowledge'],
      format: 'video',
      language: 'English',
      certificate: true,
      cpdPoints: 7,
      lastUpdated: '2024-01-09',
      progress: 0,
      status: 'not_started',
      estimatedCompletion: null,
      nextLesson: 'Module 1: Project Management Fundamentals',
      learningPath: 'Business Excellence'
    },
    {
      id: 'course6',
      title: 'Design Thinking Workshop',
      description: 'Hands-on workshop covering design thinking methodology and creative problem-solving techniques.',
      category: 'design',
      level: 'beginner',
      duration: '5 hours',
      modules: 8,
      instructor: {
        name: 'Alex Rivera',
        role: 'UX Designer',
        avatar: null,
        rating: 4.7
      },
      thumbnail: null,
      rating: 4.6,
      enrollments: 89,
      completions: 67,
      tags: ['Design Thinking', 'Creativity', 'Problem Solving', 'Innovation'],
      skills: ['Design Thinking', 'User Empathy', 'Ideation', 'Prototyping'],
      prerequisites: [],
      format: 'workshop',
      language: 'English',
      certificate: true,
      cpdPoints: 5,
      lastUpdated: '2024-01-11',
      progress: 0,
      status: 'not_started',
      estimatedCompletion: null,
      nextLesson: 'Module 1: Introduction to Design Thinking',
      learningPath: 'Creative Innovation'
    }
  ]);

  const [learningPaths] = useState([
    {
      id: 'path1',
      title: 'Frontend Development Mastery',
      description: 'Complete learning path for frontend developers',
      courses: ['course1', 'course6'],
      duration: '13 hours',
      level: 'intermediate',
      progress: 32,
      enrolled: true
    },
    {
      id: 'path2',
      title: 'Management Excellence',
      description: 'Leadership and management skills development',
      courses: ['course2', 'course5'],
      duration: '13 hours',
      level: 'intermediate',
      progress: 0,
      enrolled: false
    },
    {
      id: 'path3',
      title: 'Data Science Fundamentals',
      description: 'Foundation in data analysis and science',
      courses: ['course3'],
      duration: '10 hours',
      level: 'intermediate',
      progress: 30,
      enrolled: true
    }
  ]);

  const [certifications] = useState([
    {
      id: 'cert1',
      title: 'Cybersecurity Awareness Certificate',
      course: 'Cybersecurity Awareness',
      earnedDate: '2024-01-18',
      validUntil: '2025-01-18',
      credentialId: 'CSA-2024-001',
      status: 'active'
    },
    {
      id: 'cert2',
      title: 'Advanced React Development',
      course: 'Advanced React Development',
      earnedDate: null,
      validUntil: null,
      credentialId: null,
      status: 'in_progress',
      progress: 65
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Categories', icon: Globe, count: courses.length },
    { id: 'technical', label: 'Technical', icon: Monitor, count: courses.filter(c => c.category === 'technical').length },
    { id: 'leadership', label: 'Leadership', icon: Users, count: courses.filter(c => c.category === 'leadership').length },
    { id: 'business', label: 'Business', icon: BarChart3, count: courses.filter(c => c.category === 'business').length },
    { id: 'security', label: 'Security', icon: Flag, count: courses.filter(c => c.category === 'security').length },
    { id: 'design', label: 'Design', icon: Lightbulb, count: courses.filter(c => c.category === 'design').length }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner', color: 'text-green-400' },
    { id: 'intermediate', label: 'Intermediate', color: 'text-yellow-400' },
    { id: 'advanced', label: 'Advanced', color: 'text-red-400' }
  ];

  const statuses = [
    { id: 'all', label: 'All Courses' },
    { id: 'not_started', label: 'Not Started' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const toggleBookmark = (courseId) => {
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'not_started': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video': return Video;
      case 'interactive': return Monitor;
      case 'workshop': return Users;
      case 'mixed': return FileText;
      default: return BookOpen;
    }
  };

  const CourseCard = ({ course }) => {
    const isBookmarked = bookmarkedCourses.includes(course.id);
    const isEnrolled = enrolledCourses.includes(course.id);
    const FormatIcon = getFormatIcon(course.format);

    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getLevelColor(course.level)}`}>
              <BookOpen size={20} />
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                {course.level.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(course.id)}
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

        {/* Course Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-300 line-clamp-2 leading-relaxed mb-3">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <FormatIcon size={14} />
              {course.modules} modules
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} fill="currentColor" className="text-yellow-400" />
              {course.rating}
            </div>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && course.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Progress</span>
              <span className="text-sm text-indigo-400">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            {course.nextLesson && (
              <p className="text-xs text-gray-400 mt-2">Next: {course.nextLesson}</p>
            )}
          </div>
        )}

        {/* Status Badge */}
        {isEnrolled && (
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
              {course.status === 'not_started' ? 'Not Started' :
               course.status === 'in_progress' ? 'In Progress' :
               course.status === 'completed' ? 'Completed' : course.status}
            </span>
          </div>
        )}

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {course.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-[#2A2D3D]/50 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full border border-indigo-500/30 flex items-center justify-center">
            <User size={14} className="text-indigo-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300">{course.instructor.name}</p>
            <p className="text-xs text-gray-500">{course.instructor.role}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-yellow-400">
            <Star size={12} fill="currentColor" />
            {course.instructor.rating}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Users size={12} />
              {course.enrollments} enrolled
            </div>
            {course.certificate && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Award size={12} />
                Award
              </div>
            )}
            <div className="flex items-center gap-1">
              <Award size={12} />
              {course.cpdPoints} CPD
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isEnrolled ? (
              course.status === 'completed' ? (
                <button className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  <CheckCircle size={16} className="inline mr-2" />
                  Completed
                </button>
              ) : (
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors">
                  <Play size={16} className="inline mr-2" />
                  Continue
                </button>
              )
            ) : (
              <button
                onClick={() => enrollInCourse(course.id)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const LearningPathCard = ({ path }) => {
    const pathCourses = courses.filter(course => path.courses.includes(course.id));
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <Target size={24} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100">{path.title}</h3>
              <p className="text-gray-400 text-sm">{path.description}</p>
            </div>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
            {path.level.toUpperCase()}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Progress</span>
            <span className="text-sm text-purple-400">{path.progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${path.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Course List */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Courses ({pathCourses.length})</h4>
          <div className="space-y-2">
            {pathCourses.map((course, index) => (
              <div key={course.id} className="flex items-center gap-3 p-2 bg-[#2A2D3D]/50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center text-xs text-purple-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.duration}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {enrolledCourses.includes(course.id) ? 
                    course.status === 'completed' ? 
                      <CheckCircle size={16} className="text-green-400" /> :
                      <Clock size={16} className="text-blue-400" />
                    : <span>Not started</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {path.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={12} />
              {pathCourses.length} courses
            </div>
          </div>
          
          <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            path.enrolled 
              ? 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}>
            {path.enrolled ? 'Continue Path' : 'Start Path'}
          </button>
        </div>
      </div>
    );
  };

  const CertificationCard = ({ cert }) => {
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-yellow-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <Award size={24} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{cert.title}</h3>
              <p className="text-gray-400 text-sm">{cert.course}</p>
            </div>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            cert.status === 'active' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
            cert.status === 'in_progress' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
            'bg-gray-400/10 text-gray-400 border border-gray-400/20'
          }`}>
            {cert.status === 'active' ? 'Active' : 
             cert.status === 'in_progress' ? 'In Progress' : 'Expired'}
          </span>
        </div>

        {cert.status === 'in_progress' && cert.progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Progress</span>
              <span className="text-sm text-blue-400">{cert.progress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${cert.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm">
          {cert.earnedDate && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Earned Date:</span>
              <span className="text-gray-300">{new Date(cert.earnedDate).toLocaleDateString()}</span>
            </div>
          )}
          {cert.validUntil && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Valid Until:</span>
              <span className="text-gray-300">{new Date(cert.validUntil).toLocaleDateString()}</span>
            </div>
          )}
          {cert.credentialId && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Credential ID:</span>
              <span className="text-gray-300 font-mono text-xs">{cert.credentialId}</span>
            </div>
          )}
        </div>

        {cert.status === 'active' && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
            <button className="flex-1 px-3 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm hover:bg-yellow-600/30 transition-colors">
              <Download size={14} className="inline mr-2" />
              Download
            </button>
            <button className="flex-1 px-3 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm hover:bg-indigo-600/30 transition-colors">
              <Share2 size={14} className="inline mr-2" />
              Share
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#1B1E2B] to-[#11131A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
          <BookOpen size={36} className="text-indigo-400" />
          Training & Development
        </h1>
        <p className="text-gray-400 mt-2">Enhance your skills with our comprehensive learning platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <BookOpen size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-400">Enrolled Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {courses.filter(c => enrolledCourses.includes(c.id) && c.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <Award size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {certifications.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-400">Certificates</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {courses.filter(c => enrolledCourses.includes(c.id)).reduce((acc, c) => acc + c.cpdPoints, 0)}
              </p>
              <p className="text-sm text-gray-400">CPD Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex items-center gap-1 bg-[#1B1E2B] rounded-lg p-1 border border-gray-700/50 w-fit">
          {[
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'paths', label: 'Learning Paths', icon: Target },
            { id: 'certificates', label: 'Certificates', icon: Award }
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
                <TabIcon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filters (only for courses) */}
      {activeTab === 'courses' && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses, skills, or instructors..."
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                    >
                      {levels.map(level => (
                        <option key={level.id} value={level.id}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-[#2A2D3D]/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500/50"
                    >
                      {statuses.map(status => (
                        <option key={status.id} value={status.id}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Quick Access (only for courses) */}
      {activeTab === 'courses' && (
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
      )}

      {/* Content based on active tab */}
      {activeTab === 'courses' && (
        <>
          {/* Results Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                Showing {filteredCourses.length} of {courses.length} courses
                {searchTerm && (
                  <span className="text-indigo-400"> for "{searchTerm}"</span>
                )}
              </p>
              
              {bookmarkedCourses.length > 0 && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Bookmark size={16} fill="currentColor" />
                  {bookmarkedCourses.length} Bookmarked
                </div>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={64} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm 
                  ? `No courses match your search for "${searchTerm}"`
                  : 'No courses available for the selected filters'
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
        </>
      )}

      {activeTab === 'paths' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map(path => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map(cert => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTraining;