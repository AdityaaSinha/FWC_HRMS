import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  Clock,
  User,
  Users,
  Flag,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Paperclip,
  Tag,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  AlertCircle,
  Timer,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Layers,
  FolderOpen,
  FileText,
  Download,
  Share2,
  Bell,
  Settings,
  Star,
  Bookmark,
  Copy,
  Archive,
  RefreshCw,
  Send,
  Upload,
  Link,
  Hash,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  Flag as FlagIcon,
  CheckSquare as CheckSquareIcon,
  Square,
  Minus,
  X,
  Save,
  ArrowUp,
  ArrowDown,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Kanban
} from 'lucide-react';

const EmployeeTasks = () => {
  const [activeView, setActiveView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock data for projects
  const [projects] = useState([
    {
      id: 'proj1',
      name: 'Employee Portal Redesign',
      description: 'Complete redesign of the employee portal with modern UI/UX and enhanced functionality.',
      status: 'in_progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-03-30',
      progress: 65,
      manager: 'Sarah Johnson',
      team: ['Aryabrat Mishra', 'Alex Rivera', 'Jordan Kim', 'Emily Chen'],
      budget: 50000,
      tags: ['Frontend', 'UI/UX', 'React', 'Design'],
      color: '#3B82F6',
      tasksCount: 12,
      completedTasks: 8,
      lastUpdated: '2024-02-15'
    },
    {
      id: 'proj2',
      name: 'API Integration Project',
      description: 'Integration of third-party APIs for enhanced functionality and data synchronization.',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      progress: 25,
      manager: 'Michael Rodriguez',
      team: ['Aryabrat Mishra', 'David Park', 'Lisa Wong'],
      budget: 30000,
      tags: ['Backend', 'API', 'Integration', 'Node.js'],
      color: '#10B981',
      tasksCount: 8,
      completedTasks: 2,
      lastUpdated: '2024-02-10'
    },
    {
      id: 'proj3',
      name: 'Performance Optimization',
      description: 'Optimize application performance and reduce load times across all modules.',
      status: 'completed',
      priority: 'high',
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      progress: 100,
      manager: 'Emily Chen',
      team: ['Aryabrat Mishra', 'Tom Wilson', 'Sarah Kim'],
      budget: 25000,
      tags: ['Performance', 'Optimization', 'Frontend', 'Backend'],
      color: '#8B5CF6',
      tasksCount: 15,
      completedTasks: 15,
      lastUpdated: '2024-01-31'
    }
  ]);

  // Mock data for tasks
  const [tasks] = useState([
    {
      id: 'task1',
      title: 'Design new dashboard layout',
      description: 'Create wireframes and mockups for the new employee dashboard with improved user experience.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Aryabrat Mishra',
      assignedBy: 'Sarah Johnson',
      projectId: 'proj1',
      projectName: 'Employee Portal Redesign',
      dueDate: '2024-02-25',
      createdDate: '2024-02-01',
      startDate: '2024-02-05',
      estimatedHours: 16,
      actualHours: 12,
      progress: 75,
      tags: ['Design', 'UI/UX', 'Dashboard'],
      attachments: [
        { name: 'dashboard_wireframes.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'mockup_v1.fig', size: '5.1 MB', type: 'figma' }
      ],
      comments: [
        {
          id: 'comment1',
          author: 'Sarah Johnson',
          content: 'Great progress on the wireframes! Please consider adding more spacing between elements.',
          timestamp: '2024-02-10T10:30:00Z',
          type: 'feedback'
        },
        {
          id: 'comment2',
          author: 'Aryabrat Mishra',
          content: 'Updated the spacing as requested. Ready for review.',
          timestamp: '2024-02-12T14:15:00Z',
          type: 'update'
        }
      ],
      subtasks: [
        { id: 'sub1', title: 'Create wireframes', completed: true },
        { id: 'sub2', title: 'Design mockups', completed: true },
        { id: 'sub3', title: 'Get stakeholder approval', completed: false },
        { id: 'sub4', title: 'Finalize design system', completed: false }
      ],
      dependencies: [],
      lastUpdated: '2024-02-12'
    },
    {
      id: 'task2',
      title: 'Implement user authentication',
      description: 'Develop secure user authentication system with JWT tokens and role-based access control.',
      status: 'todo',
      priority: 'high',
      assignee: 'Alex Rivera',
      assignedBy: 'Michael Rodriguez',
      projectId: 'proj2',
      projectName: 'API Integration Project',
      dueDate: '2024-03-01',
      createdDate: '2024-02-05',
      startDate: '2024-02-20',
      estimatedHours: 24,
      actualHours: 0,
      progress: 0,
      tags: ['Backend', 'Authentication', 'Security', 'JWT'],
      attachments: [
        { name: 'auth_requirements.docx', size: '1.2 MB', type: 'document' }
      ],
      comments: [],
      subtasks: [
        { id: 'sub5', title: 'Set up JWT middleware', completed: false },
        { id: 'sub6', title: 'Create login endpoint', completed: false },
        { id: 'sub7', title: 'Implement role-based access', completed: false },
        { id: 'sub8', title: 'Add password reset functionality', completed: false }
      ],
      dependencies: ['task3'],
      lastUpdated: '2024-02-05'
    },
    {
      id: 'task3',
      title: 'Database schema optimization',
      description: 'Optimize database queries and improve schema design for better performance.',
      status: 'completed',
      priority: 'medium',
      assignee: 'Aryabrat Mishra',
      assignedBy: 'Emily Chen',
      projectId: 'proj3',
      projectName: 'Performance Optimization',
      dueDate: '2024-01-20',
      createdDate: '2023-12-15',
      startDate: '2024-01-02',
      completedDate: '2024-01-18',
      estimatedHours: 20,
      actualHours: 18,
      progress: 100,
      tags: ['Database', 'Optimization', 'Performance', 'SQL'],
      attachments: [
        { name: 'schema_changes.sql', size: '856 KB', type: 'sql' },
        { name: 'performance_report.pdf', size: '3.2 MB', type: 'pdf' }
      ],
      comments: [
        {
          id: 'comment3',
          author: 'Emily Chen',
          content: 'Excellent work! Query performance improved by 40%.',
          timestamp: '2024-01-19T09:00:00Z',
          type: 'approval'
        }
      ],
      subtasks: [
        { id: 'sub9', title: 'Analyze current queries', completed: true },
        { id: 'sub10', title: 'Optimize slow queries', completed: true },
        { id: 'sub11', title: 'Update indexes', completed: true },
        { id: 'sub12', title: 'Test performance improvements', completed: true }
      ],
      dependencies: [],
      lastUpdated: '2024-01-18'
    },
    {
      id: 'task4',
      title: 'Mobile responsive design',
      description: 'Ensure all components are fully responsive and work seamlessly on mobile devices.',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Jordan Kim',
      assignedBy: 'Sarah Johnson',
      projectId: 'proj1',
      projectName: 'Employee Portal Redesign',
      dueDate: '2024-03-10',
      createdDate: '2024-02-08',
      startDate: '2024-02-12',
      estimatedHours: 32,
      actualHours: 20,
      progress: 60,
      tags: ['Frontend', 'Mobile', 'Responsive', 'CSS'],
      attachments: [
        { name: 'mobile_designs.sketch', size: '4.7 MB', type: 'sketch' }
      ],
      comments: [
        {
          id: 'comment4',
          author: 'Jordan Kim',
          content: 'Working on tablet breakpoints. Mobile looks good so far.',
          timestamp: '2024-02-14T16:45:00Z',
          type: 'update'
        }
      ],
      subtasks: [
        { id: 'sub13', title: 'Mobile breakpoints', completed: true },
        { id: 'sub14', title: 'Tablet breakpoints', completed: false },
        { id: 'sub15', title: 'Touch interactions', completed: false },
        { id: 'sub16', title: 'Cross-device testing', completed: false }
      ],
      dependencies: ['task1'],
      lastUpdated: '2024-02-14'
    },
    {
      id: 'task5',
      title: 'API documentation',
      description: 'Create comprehensive API documentation with examples and integration guides.',
      status: 'todo',
      priority: 'low',
      assignee: 'David Park',
      assignedBy: 'Michael Rodriguez',
      projectId: 'proj2',
      projectName: 'API Integration Project',
      dueDate: '2024-04-01',
      createdDate: '2024-02-10',
      startDate: '2024-03-15',
      estimatedHours: 16,
      actualHours: 0,
      progress: 0,
      tags: ['Documentation', 'API', 'Integration'],
      attachments: [],
      comments: [],
      subtasks: [
        { id: 'sub17', title: 'Document endpoints', completed: false },
        { id: 'sub18', title: 'Add code examples', completed: false },
        { id: 'sub19', title: 'Create integration guide', completed: false },
        { id: 'sub20', title: 'Review and publish', completed: false }
      ],
      dependencies: ['task2'],
      lastUpdated: '2024-02-10'
    },
    {
      id: 'task6',
      title: 'Unit test coverage',
      description: 'Increase unit test coverage to 90% across all modules and components.',
      status: 'overdue',
      priority: 'high',
      assignee: 'Aryabrat Mishra',
      assignedBy: 'Emily Chen',
      projectId: 'proj1',
      projectName: 'Employee Portal Redesign',
      dueDate: '2024-02-10',
      createdDate: '2024-01-20',
      startDate: '2024-01-25',
      estimatedHours: 28,
      actualHours: 15,
      progress: 45,
      tags: ['Testing', 'Quality', 'Jest', 'Coverage'],
      attachments: [
        { name: 'test_plan.md', size: '1.8 MB', type: 'markdown' }
      ],
      comments: [
        {
          id: 'comment5',
          author: 'Emily Chen',
          content: 'This is overdue. Please prioritize and provide an update.',
          timestamp: '2024-02-12T11:00:00Z',
          type: 'urgent'
        }
      ],
      subtasks: [
        { id: 'sub21', title: 'Component tests', completed: true },
        { id: 'sub22', title: 'Utility function tests', completed: true },
        { id: 'sub23', title: 'Integration tests', completed: false },
        { id: 'sub24', title: 'E2E tests', completed: false }
      ],
      dependencies: [],
      lastUpdated: '2024-02-08'
    }
  ]);

  // Mock team members data
  const [teamMembers] = useState([
    { id: 'user1', name: 'Aryabrat Mishra', role: 'Frontend Developer', avatar: '👨‍💻' },
    { id: 'user2', name: 'Alex Rivera', role: 'Backend Developer', avatar: '👩‍💻' },
    { id: 'user3', name: 'Jordan Kim', role: 'UI/UX Designer', avatar: '🎨' },
    { id: 'user4', name: 'Emily Chen', role: 'Senior Developer', avatar: '👩‍🔬' },
    { id: 'user5', name: 'David Park', role: 'DevOps Engineer', avatar: '⚙️' },
    { id: 'user6', name: 'Sarah Johnson', role: 'Project Manager', avatar: '👩‍💼' },
    { id: 'user7', name: 'Michael Rodriguez', role: 'Tech Lead', avatar: '👨‍💼' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'todo': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'overdue': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'planning': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Flag size={14} className="text-red-400" />;
      case 'medium': return <Flag size={14} className="text-yellow-400" />;
      case 'low': return <Flag size={14} className="text-green-400" />;
      default: return <Flag size={14} className="text-gray-400" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-400" />;
      case 'in_progress': return <Timer size={16} className="text-blue-400" />;
      case 'todo': return <Circle size={16} className="text-gray-400" />;
      case 'overdue': return <AlertCircle size={16} className="text-red-400" />;
      case 'planning': return <Clock size={16} className="text-purple-400" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'dueDate':
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'progress':
        aValue = a.progress;
        bValue = b.progress;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const TaskCard = ({ task }) => {
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
    const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
              {getStatusIcon(task.status)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                {task.title}
              </h3>
              <p className="text-sm text-gray-400">
                {task.projectName} • #{task.id.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getPriorityIcon(task.priority)}
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600/20 rounded-lg transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
          {task.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-indigo-400">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                task.status === 'completed' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : isOverdue
                  ? 'bg-gradient-to-r from-red-500 to-pink-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Assignee and Due Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
              <User size={12} className="text-indigo-400" />
            </div>
            <span className="text-sm text-gray-300">{task.assignee}</span>
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
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{task.tags.length - 3}
            </span>
          )}
        </div>

        {/* Subtasks Progress */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Subtasks</span>
              <span className="text-sm text-gray-400">
                {task.subtasks.filter(sub => sub.completed).length}/{task.subtasks.length}
              </span>
            </div>
            <div className="space-y-1">
              {task.subtasks.slice(0, 2).map((subtask, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  {subtask.completed ? (
                    <CheckCircle size={12} className="text-green-400" />
                  ) : (
                    <Circle size={12} className="text-gray-500" />
                  )}
                  <span className={subtask.completed ? 'text-gray-400 line-through' : 'text-gray-300'}>
                    {subtask.title}
                  </span>
                </div>
              ))}
              {task.subtasks.length > 2 && (
                <div className="text-xs text-gray-500 ml-4">
                  +{task.subtasks.length - 2} more subtasks
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ').toUpperCase()}
            </span>
            {task.attachments && task.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Paperclip size={12} />
                {task.attachments.length}
              </div>
            )}
            {task.comments && task.comments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MessageSquare size={12} />
                {task.comments.length}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTask(task)}
              className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm hover:bg-indigo-600/30 transition-colors"
            >
              <Eye size={14} className="inline mr-1" />
              View
            </button>
            {task.status !== 'completed' && (
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

  const ProjectCard = ({ project }) => {
    const progressPercentage = (project.completedTasks / project.tasksCount) * 100;
    
    return (
      <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            ></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{project.name}</h3>
              <p className="text-sm text-gray-400">Managed by {project.manager}</p>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Progress</span>
            <span className="text-sm text-purple-400">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tasks Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Tasks</span>
            <span className="text-sm text-gray-400">
              {project.completedTasks}/{project.tasksCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Team</span>
            <span className="text-sm text-gray-400">{project.team.length} members</span>
          </div>
          <div className="flex items-center gap-1">
            {project.team.slice(0, 4).map((member, index) => {
              const teamMember = teamMembers.find(tm => tm.name === member);
              return (
                <div
                  key={index}
                  className="w-6 h-6 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-xs"
                  title={member}
                >
                  {teamMember ? teamMember.avatar : member.charAt(0)}
                </div>
              );
            })}
            {project.team.length > 4 && (
              <div className="w-6 h-6 bg-gray-600/20 border border-gray-500/30 rounded-full flex items-center justify-center text-xs text-gray-400">
                +{project.team.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-400/10 border border-purple-400/20 rounded text-xs text-purple-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-400/10 border border-gray-400/20 rounded text-xs text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-400">
            Due: {new Date(project.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProject(project)}
              className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-600/30 transition-colors"
            >
              <Eye size={14} className="inline mr-1" />
              View Details
            </button>
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
          <CheckSquare size={36} className="text-indigo-400" />
          Task Management
        </h1>
        <p className="text-gray-400 mt-2">Create, assign, and track tasks and projects</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <CheckSquare size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">{tasks.length}</p>
              <p className="text-sm text-gray-400">Total Tasks</p>
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
                {tasks.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <Timer size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
              <p className="text-sm text-gray-400">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1B1E2B] to-[#2A2D3D] rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 border border-red-500/30 rounded-lg">
              <AlertCircle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {tasks.filter(t => t.status === 'overdue').length}
              </p>
              <p className="text-sm text-gray-400">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-[#1B1E2B] rounded-lg p-1 border border-gray-700/50">
            {[
              { id: 'list', label: 'List', icon: List },
              { id: 'kanban', label: 'Kanban', icon: Kanban },
              { id: 'projects', label: 'Projects', icon: FolderOpen }
            ].map(view => {
              const ViewIcon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeView === view.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                  }`}
                >
                  <ViewIcon size={16} />
                  {view.label}
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
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
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1B1E2B] border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
          
          <button
            onClick={() => setShowTaskModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus size={18} />
            New Task
          </button>
          
          {activeView === 'projects' && (
            <button
              onClick={() => setShowProjectModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              New Project
            </button>
          )}
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['todo', 'in_progress', 'completed', 'overdue'].map(status => (
            <div key={status} className="bg-[#1B1E2B] rounded-xl border border-gray-700/50 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-100 capitalize">
                  {status.replace('_', ' ')}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {tasks.filter(t => t.status === status).length}
                </span>
              </div>
              <div className="space-y-4">
                {tasks
                  .filter(task => task.status === status)
                  .map(task => (
                    <div key={task.id} className="bg-[#2A2D3D] rounded-lg p-4 border border-gray-700/50">
                      <h4 className="text-sm font-medium text-gray-100 mb-2 line-clamp-2">
                        {task.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>{task.assignee}</span>
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-1 py-0.5 bg-indigo-400/10 border border-indigo-400/20 rounded text-xs text-indigo-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {getPriorityIcon(task.priority)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTasks;