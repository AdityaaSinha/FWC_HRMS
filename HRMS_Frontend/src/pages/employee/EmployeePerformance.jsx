import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Search, 
  Filter, 
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  MessageSquare,
  Award,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  MoreVertical,
  User,
  ChevronRight,
  ChevronDown,
  Flag,
  Zap,
  Lightbulb,
  Brain,
  Trophy,
  Medal,
  Bookmark,
  Timer,
  ArrowUp,
  ArrowDown,
  Minus,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bell,
  Settings,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'lucide-react';

const EmployeePerformance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'professional',
    priority: 'medium',
    targetDate: '',
    metrics: []
  });

  // Mock performance data
  const [performanceOverview] = useState({
    currentRating: 4.2,
    previousRating: 3.8,
    trend: 'up',
    completedGoals: 8,
    totalGoals: 12,
    feedbackReceived: 15,
    reviewsCompleted: 3,
    skillsImproved: 5,
    achievements: 4
  });

  const [goals] = useState([
    {
      id: 'goal1',
      title: 'Complete Advanced React Certification',
      description: 'Obtain certification in advanced React development concepts including hooks, context, and performance optimization.',
      category: 'professional',
      priority: 'high',
      status: 'in_progress',
      progress: 75,
      targetDate: '2024-03-15',
      createdDate: '2024-01-10',
      assignedBy: 'Sarah Johnson',
      assignedByRole: 'Team Lead',
      metrics: [
        { name: 'Course Completion', target: 100, current: 75, unit: '%' },
        { name: 'Practice Projects', target: 3, current: 2, unit: 'projects' }
      ],
      milestones: [
        { name: 'Complete Course Modules', completed: true, date: '2024-01-25' },
        { name: 'Submit Practice Projects', completed: true, date: '2024-02-10' },
        { name: 'Pass Final Assessment', completed: false, date: '2024-03-01' },
        { name: 'Receive Certification', completed: false, date: '2024-03-15' }
      ],
      tags: ['React', 'Frontend', 'Certification', 'Technical'],
      notes: 'Making good progress. Need to focus on performance optimization module.',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'goal2',
      title: 'Improve Team Collaboration Skills',
      description: 'Enhance communication and collaboration skills through active participation in team meetings and cross-functional projects.',
      category: 'soft_skills',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      targetDate: '2024-02-28',
      createdDate: '2023-12-01',
      assignedBy: 'Michael Rodriguez',
      assignedByRole: 'Manager',
      metrics: [
        { name: 'Team Meeting Participation', target: 90, current: 95, unit: '%' },
        { name: 'Cross-team Projects', target: 2, current: 3, unit: 'projects' },
        { name: 'Peer Feedback Score', target: 4.0, current: 4.3, unit: '/5' }
      ],
      milestones: [
        { name: 'Join Cross-functional Team', completed: true, date: '2023-12-15' },
        { name: 'Lead Team Meeting', completed: true, date: '2024-01-10' },
        { name: 'Complete Collaboration Workshop', completed: true, date: '2024-02-05' },
        { name: 'Receive Peer Feedback', completed: true, date: '2024-02-28' }
      ],
      tags: ['Communication', 'Teamwork', 'Leadership', 'Soft Skills'],
      notes: 'Excellent progress in team collaboration. Received positive feedback from peers.',
      lastUpdated: '2024-02-28',
      completedDate: '2024-02-28'
    },
    {
      id: 'goal3',
      title: 'Increase Code Review Participation',
      description: 'Actively participate in code reviews to improve code quality and share knowledge with team members.',
      category: 'technical',
      priority: 'medium',
      status: 'in_progress',
      progress: 60,
      targetDate: '2024-04-30',
      createdDate: '2024-01-15',
      assignedBy: 'Emily Chen',
      assignedByRole: 'Senior Developer',
      metrics: [
        { name: 'Reviews Completed', target: 50, current: 30, unit: 'reviews' },
        { name: 'Quality Score', target: 4.5, current: 4.2, unit: '/5' }
      ],
      milestones: [
        { name: 'Complete 20 Reviews', completed: true, date: '2024-02-01' },
        { name: 'Achieve 4.0+ Quality Score', completed: true, date: '2024-02-15' },
        { name: 'Complete 40 Reviews', completed: false, date: '2024-03-15' },
        { name: 'Achieve 4.5+ Quality Score', completed: false, date: '2024-04-30' }
      ],
      tags: ['Code Review', 'Quality', 'Technical', 'Mentoring'],
      notes: 'Good progress on review quantity. Focus on providing more detailed feedback.',
      lastUpdated: '2024-02-15'
    },
    {
      id: 'goal4',
      title: 'Develop Public Speaking Skills',
      description: 'Improve presentation and public speaking abilities through internal presentations and external conferences.',
      category: 'personal',
      priority: 'low',
      status: 'not_started',
      progress: 0,
      targetDate: '2024-06-30',
      createdDate: '2024-02-01',
      assignedBy: 'Self',
      assignedByRole: 'Personal Development',
      metrics: [
        { name: 'Presentations Given', target: 5, current: 0, unit: 'presentations' },
        { name: 'Confidence Rating', target: 4.0, current: 2.5, unit: '/5' }
      ],
      milestones: [
        { name: 'Join Toastmasters', completed: false, date: '2024-03-01' },
        { name: 'Give First Presentation', completed: false, date: '2024-04-01' },
        { name: 'Present at Team Meeting', completed: false, date: '2024-05-01' },
        { name: 'Speak at Conference', completed: false, date: '2024-06-30' }
      ],
      tags: ['Public Speaking', 'Presentation', 'Personal Development'],
      notes: 'Need to start working on this goal. Consider joining local speaking groups.',
      lastUpdated: '2024-02-01'
    }
  ]);

  const [reviews] = useState([
    {
      id: 'review1',
      type: 'quarterly',
      period: 'Q4 2023',
      date: '2024-01-15',
      reviewer: 'Sarah Johnson',
      reviewerRole: 'Team Lead',
      status: 'completed',
      overallRating: 4.2,
      categories: [
        { name: 'Technical Skills', rating: 4.5, feedback: 'Excellent technical abilities with strong problem-solving skills.' },
        { name: 'Communication', rating: 4.0, feedback: 'Good communication skills, could improve in presenting complex ideas.' },
        { name: 'Teamwork', rating: 4.3, feedback: 'Great team player, always willing to help colleagues.' },
        { name: 'Initiative', rating: 3.8, feedback: 'Shows good initiative, could take on more leadership opportunities.' },
        { name: 'Quality of Work', rating: 4.4, feedback: 'Consistently delivers high-quality work with attention to detail.' }
      ],
      strengths: [
        'Strong technical problem-solving abilities',
        'Reliable and consistent work quality',
        'Good collaboration with team members',
        'Quick learner with new technologies'
      ],
      areasForImprovement: [
        'Public speaking and presentation skills',
        'Taking more leadership initiatives',
        'Mentoring junior team members'
      ],
      goals: ['goal1', 'goal2'],
      nextReviewDate: '2024-04-15'
    },
    {
      id: 'review2',
      type: 'annual',
      period: '2023',
      date: '2024-01-30',
      reviewer: 'Michael Rodriguez',
      reviewerRole: 'Manager',
      status: 'completed',
      overallRating: 4.0,
      categories: [
        { name: 'Technical Skills', rating: 4.2, feedback: 'Strong technical foundation with room for advanced concepts.' },
        { name: 'Communication', rating: 3.8, feedback: 'Improving communication skills, more confident in team discussions.' },
        { name: 'Teamwork', rating: 4.1, feedback: 'Excellent team collaboration and support for colleagues.' },
        { name: 'Initiative', rating: 3.7, feedback: 'Good initiative shown, encourage more proactive approach.' },
        { name: 'Quality of Work', rating: 4.3, feedback: 'High-quality deliverables with minimal revisions needed.' }
      ],
      strengths: [
        'Consistent high-quality work delivery',
        'Strong technical foundation',
        'Excellent team collaboration',
        'Adaptable to changing requirements'
      ],
      areasForImprovement: [
        'Proactive communication with stakeholders',
        'Leadership and mentoring skills',
        'Strategic thinking and planning'
      ],
      goals: ['goal3', 'goal4'],
      nextReviewDate: '2025-01-30'
    }
  ]);

  const [feedback] = useState([
    {
      id: 'feedback1',
      type: 'peer',
      from: 'Alex Rivera',
      fromRole: 'Frontend Developer',
      date: '2024-02-10',
      category: 'collaboration',
      rating: 4.5,
      message: 'Great collaboration on the recent project. Your technical insights were very valuable and you were always available to help when needed.',
      tags: ['Collaboration', 'Technical Skills', 'Helpfulness'],
      isAnonymous: false,
      project: 'E-commerce Redesign'
    },
    {
      id: 'feedback2',
      type: 'manager',
      from: 'Sarah Johnson',
      fromRole: 'Team Lead',
      date: '2024-02-05',
      category: 'performance',
      rating: 4.2,
      message: 'Excellent work on the React optimization project. The performance improvements were significant and well-documented. Keep up the great work!',
      tags: ['Performance', 'Documentation', 'Technical Excellence'],
      isAnonymous: false,
      project: 'Performance Optimization'
    },
    {
      id: 'feedback3',
      type: 'peer',
      from: 'Anonymous',
      fromRole: 'Team Member',
      date: '2024-01-28',
      category: 'communication',
      rating: 3.8,
      message: 'Good technical skills but could improve on explaining complex concepts to non-technical team members. Overall positive contribution to the team.',
      tags: ['Communication', 'Technical Skills', 'Improvement'],
      isAnonymous: true,
      project: 'API Integration'
    },
    {
      id: 'feedback4',
      type: 'subordinate',
      from: 'Jordan Kim',
      fromRole: 'Junior Developer',
      date: '2024-01-20',
      category: 'mentoring',
      rating: 4.7,
      message: 'Amazing mentor! Always patient with questions and provides clear explanations. Really helped me understand React concepts better.',
      tags: ['Mentoring', 'Patience', 'Teaching', 'React'],
      isAnonymous: false,
      project: 'Onboarding Support'
    }
  ]);

  const [achievements] = useState([
    {
      id: 'achievement1',
      title: 'Code Quality Champion',
      description: 'Maintained 95%+ code review approval rate for 6 months',
      category: 'technical',
      earnedDate: '2024-01-15',
      icon: '🏆',
      points: 100,
      rarity: 'gold'
    },
    {
      id: 'achievement2',
      title: 'Team Player',
      description: 'Received 10+ positive peer feedback in a quarter',
      category: 'collaboration',
      earnedDate: '2024-02-01',
      icon: '🤝',
      points: 75,
      rarity: 'silver'
    },
    {
      id: 'achievement3',
      title: 'Quick Learner',
      description: 'Completed 3 technical certifications in 6 months',
      category: 'learning',
      earnedDate: '2023-12-20',
      icon: '🎓',
      points: 150,
      rarity: 'gold'
    },
    {
      id: 'achievement4',
      title: 'Innovation Driver',
      description: 'Proposed and implemented process improvement',
      category: 'innovation',
      earnedDate: '2024-01-30',
      icon: '💡',
      points: 125,
      rarity: 'gold'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'not_started': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'overdue': return 'text-red-400 bg-red-400/10 border-red-400/20';
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'technical': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'professional': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'soft_skills': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'personal': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'gold': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'silver': return 'text-gray-300 bg-gray-300/10 border-gray-300/20';
      case 'bronze': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const GoalCard = ({ goal }) => {
    const isOverdue = new Date(goal.targetDate) < new Date() && goal.status !== 'completed';
    const statusColor = isOverdue ? getStatusColor('overdue') : getStatusColor(goal.status);

    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getCategoryColor(goal.category)}`}>
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-400">
                Assigned by {goal.assignedBy} • {goal.assignedByRole}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
              {goal.priority.toUpperCase()}
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {goal.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-indigo-400">{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                goal.status === 'completed' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : isOverdue
                  ? 'bg-gradient-to-r from-red-500 to-pink-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Metrics */}
        {goal.metrics && goal.metrics.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Key Metrics</h4>
            <div className="grid grid-cols-1 gap-2">
              {goal.metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-[#2A2D3D]/50 rounded-lg">
                  <span className="text-sm text-gray-300">{metric.name}</span>
                  <span className="text-sm text-indigo-400">
                    {metric.current}/{metric.target} {metric.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status and Date */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {isOverdue ? 'OVERDUE' : goal.status.replace('_', ' ').toUpperCase()}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Calendar size={14} />
            Due: {new Date(goal.targetDate).toLocaleDateString()}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {goal.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
            >
              {tag}
            </span>
          ))}
          {goal.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{goal.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-400">
            Updated: {new Date(goal.lastUpdated).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedGoal(goal)}
              className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm hover:bg-indigo-600/30 transition-colors"
            >
              <Eye size={14} className="inline mr-1" />
              View Details
            </button>
            {goal.status !== 'completed' && (
              <button className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-600/30 transition-colors">
                <Edit size={14} className="inline mr-1" />
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ReviewCard = ({ review }) => {
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <FileText size={24} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100">
                {review.type.charAt(0).toUpperCase() + review.type.slice(1)} Review
              </h3>
              <p className="text-sm text-gray-400">
                {review.period} • by {review.reviewer}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} fill="currentColor" className="text-yellow-400" />
              <span className="text-lg font-semibold text-gray-100">{review.overallRating}</span>
            </div>
          </div>
        </div>

        {/* Rating Categories */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Performance Categories</h4>
          <div className="space-y-2">
            {review.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-[#2A2D3D]/50 rounded-lg">
                <span className="text-sm text-gray-300">{category.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < category.rating ? 'currentColor' : 'none'}
                        className={i < category.rating ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-yellow-400 font-medium">{category.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1">
              <ThumbsUp size={14} />
              Strengths
            </h4>
            <ul className="space-y-1">
              {review.strengths.slice(0, 3).map((strength, index) => (
                <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
                  <CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center gap-1">
              <TrendingUp size={14} />
              Areas for Improvement
            </h4>
            <ul className="space-y-1">
              {review.areasForImprovement.slice(0, 3).map((area, index) => (
                <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
                  <AlertCircle size={12} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-400">
            Reviewed: {new Date(review.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-600/30 transition-colors">
              <Eye size={14} className="inline mr-1" />
              View Full Review
            </button>
            <button className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm hover:bg-indigo-600/30 transition-colors">
              <Download size={14} className="inline mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FeedbackCard = ({ feedback }) => {
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-green-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg">
              <MessageSquare size={20} className="text-green-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-100">
                  {feedback.isAnonymous ? 'Anonymous' : feedback.from}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">{feedback.fromRole}</span>
              </div>
              <p className="text-xs text-gray-400">
                {feedback.project} • {new Date(feedback.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span className="text-sm font-medium text-gray-100">{feedback.rating}</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          "{feedback.message}"
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {feedback.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-400/10 border border-green-400/20 rounded text-xs text-green-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feedback.category)}`}>
            {feedback.type.toUpperCase()} FEEDBACK
          </span>
          <button className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-600/30 transition-colors">
            <MessageSquare size={14} className="inline mr-1" />
            Respond
          </button>
        </div>
      </div>
    );
  };

  const AchievementCard = ({ achievement }) => {
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-yellow-500/50 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${getRarityColor(achievement.rarity)}`}>
            <span className="text-2xl">{achievement.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100">{achievement.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">
                {achievement.points} points • {new Date(achievement.earnedDate).toLocaleDateString()}
              </span>
            </div>
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
          <Target size={36} className="text-indigo-400" />
          Performance Management
        </h1>
        <p className="text-gray-400 mt-2">Track your goals, reviews, feedback, and achievements</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
              <Star size={20} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                {performanceOverview.currentRating}
                {performanceOverview.trend === 'up' ? (
                  <ArrowUp size={16} className="text-green-400" />
                ) : performanceOverview.trend === 'down' ? (
                  <ArrowDown size={16} className="text-red-400" />
                ) : (
                  <Minus size={16} className="text-gray-400" />
                )}
              </p>
              <p className="text-sm text-gray-400">Overall Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg">
              <Target size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {performanceOverview.completedGoals}/{performanceOverview.totalGoals}
              </p>
              <p className="text-sm text-gray-400">Goals Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <MessageSquare size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{performanceOverview.feedbackReceived}</p>
              <p className="text-sm text-gray-400">Feedback Received</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{performanceOverview.achievements}</p>
              <p className="text-sm text-gray-400">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex items-center gap-1 bg-[#1B1E2B] rounded-lg p-1 border border-gray-700/50 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'goals', label: 'Goals', icon: Target },
            { id: 'reviews', label: 'Reviews', icon: FileText },
            { id: 'feedback', label: 'Feedback', icon: MessageSquare },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
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

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-gradient-to-r from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Activity size={24} className="text-indigo-400" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm text-gray-300">Completed goal: "Improve Team Collaboration Skills"</span>
                <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                <MessageSquare size={16} className="text-blue-400" />
                <span className="text-sm text-gray-300">Received feedback from Alex Rivera</span>
                <span className="text-xs text-gray-500 ml-auto">5 days ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#2A2D3D]/50 rounded-lg">
                <Trophy size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-300">Earned "Innovation Driver" achievement</span>
                <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Goal Progress</h3>
              <div className="space-y-3">
                {goals.slice(0, 3).map(goal => (
                  <div key={goal.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 truncate">{goal.title}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-700/50 rounded-full h-1">
                        <div 
                          className="bg-indigo-500 h-1 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-indigo-400 w-8">{goal.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Feedback</h3>
              <div className="space-y-3">
                {feedback.slice(0, 3).map(fb => (
                  <div key={fb.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-600/20 border border-green-500/30 rounded-full flex items-center justify-center">
                      <MessageSquare size={12} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 line-clamp-2">{fb.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {fb.isAnonymous ? 'Anonymous' : fb.from} • {new Date(fb.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <>
          {/* Goals Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-100">My Goals</h2>
              <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-400 text-sm">
                {goals.length} Total
              </span>
            </div>
            <button
              onClick={() => setShowGoalModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              Add Goal
            </button>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'reviews' && (
        <>
          {/* Reviews Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-100">Performance Reviews</h2>
              <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                {reviews.length} Reviews
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'feedback' && (
        <>
          {/* Feedback Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-100">Feedback</h2>
              <span className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                {feedback.length} Received
              </span>
            </div>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <MessageSquare size={18} />
              Request Feedback
            </button>
          </div>

          {/* Feedback Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {feedback.map(fb => (
              <FeedbackCard key={fb.id} feedback={fb} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'achievements' && (
        <>
          {/* Achievements Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-100">Achievements</h2>
              <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm">
                {achievements.length} Earned
              </span>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeePerformance;