// src/pages/hr/HRCandidateEvaluation.jsx
import React, { useState } from 'react';
import { 
  User, 
  Star, 
  TrendingUp, 
  Award, 
  Target, 
  MessageSquare,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  Download,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';

// Evaluation criteria
const EVALUATION_CRITERIA = [
  {
    id: 'technical_skills',
    name: 'Technical Skills',
    icon: Code,
    weight: 30,
    subcriteria: [
      'Programming Languages',
      'Frameworks & Libraries',
      'System Design',
      'Problem Solving',
      'Code Quality'
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    weight: 20,
    subcriteria: [
      'Verbal Communication',
      'Written Communication',
      'Presentation Skills',
      'Active Listening',
      'Clarity of Thought'
    ]
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving',
    icon: Lightbulb,
    weight: 25,
    subcriteria: [
      'Analytical Thinking',
      'Creative Solutions',
      'Decision Making',
      'Critical Thinking',
      'Adaptability'
    ]
  },
  {
    id: 'cultural_fit',
    name: 'Cultural Fit',
    icon: Heart,
    weight: 15,
    subcriteria: [
      'Team Collaboration',
      'Company Values Alignment',
      'Work Style',
      'Attitude',
      'Growth Mindset'
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership Potential',
    icon: Users,
    weight: 10,
    subcriteria: [
      'Initiative',
      'Mentoring Ability',
      'Vision',
      'Influence',
      'Accountability'
    ]
  }
];

// Mock evaluation data
const MOCK_EVALUATIONS = [
  {
    id: 1,
    candidateId: 1,
    candidateName: 'Rohit Sharma',
    candidateEmail: 'rohit@example.com',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    evaluationDate: '2024-02-15',
    status: 'completed',
    overallScore: 4.2,
    recommendation: 'hire',
    evaluators: [
      {
        id: 1,
        name: 'David Chen',
        role: 'Engineering Manager',
        email: 'david@company.com',
        scores: {
          technical_skills: 4.5,
          communication: 4.0,
          problem_solving: 4.2,
          cultural_fit: 4.0,
          leadership: 3.8
        },
        feedback: {
          strengths: ['Strong React/TypeScript skills', 'Good system design knowledge', 'Clear communication'],
          concerns: ['Limited leadership experience', 'Could improve testing practices'],
          notes: 'Solid technical candidate with good potential for growth.',
          recommendation: 'hire'
        },
        submittedAt: '2024-02-15T16:30:00Z'
      },
      {
        id: 2,
        name: 'Sarah Kim',
        role: 'Senior Developer',
        email: 'sarah@company.com',
        scores: {
          technical_skills: 4.3,
          communication: 4.2,
          problem_solving: 4.0,
          cultural_fit: 4.3,
          leadership: 3.5
        },
        feedback: {
          strengths: ['Excellent problem-solving approach', 'Team player', 'Quick learner'],
          concerns: ['Needs more experience with microservices'],
          notes: 'Would be a great addition to the team.',
          recommendation: 'hire'
        },
        submittedAt: '2024-02-15T17:15:00Z'
      }
    ],
    interviews: [
      { type: 'technical', date: '2024-02-14', interviewer: 'David Chen' },
      { type: 'behavioral', date: '2024-02-15', interviewer: 'Sarah Kim' }
    ],
    finalNotes: 'Strong candidate with excellent technical skills and good cultural fit. Recommend for hire.',
    createdAt: '2024-02-14T09:00:00Z'
  },
  {
    id: 2,
    candidateId: 2,
    candidateName: 'Sneha Verma',
    candidateEmail: 'sneha@example.com',
    position: 'HR Business Partner',
    department: 'Human Resources',
    evaluationDate: '2024-02-16',
    status: 'in_progress',
    overallScore: null,
    recommendation: null,
    evaluators: [
      {
        id: 3,
        name: 'Sarah Johnson',
        role: 'HR Director',
        email: 'sarah.j@company.com',
        scores: {
          technical_skills: 4.0,
          communication: 4.5,
          problem_solving: 4.2,
          cultural_fit: 4.4,
          leadership: 4.0
        },
        feedback: {
          strengths: ['Excellent communication skills', 'Strong HR background', 'Cultural fit'],
          concerns: ['Limited HRIS experience'],
          notes: 'Great candidate with strong potential.',
          recommendation: 'hire'
        },
        submittedAt: '2024-02-16T15:30:00Z'
      }
    ],
    interviews: [
      { type: 'behavioral', date: '2024-02-16', interviewer: 'Sarah Johnson' }
    ],
    finalNotes: null,
    createdAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 3,
    candidateId: 5,
    candidateName: 'James Wilson',
    candidateEmail: 'james@example.com',
    position: 'Senior UX Designer',
    department: 'Design',
    evaluationDate: '2024-02-17',
    status: 'pending',
    overallScore: null,
    recommendation: null,
    evaluators: [],
    interviews: [
      { type: 'portfolio', date: '2024-02-17', interviewer: 'Alex Rivera' }
    ],
    finalNotes: null,
    createdAt: '2024-02-17T09:00:00Z'
  }
];

// Mock evaluators
const MOCK_EVALUATORS = [
  { id: 1, name: 'David Chen', role: 'Engineering Manager', department: 'Engineering' },
  { id: 2, name: 'Sarah Kim', role: 'Senior Developer', department: 'Engineering' },
  { id: 3, name: 'Sarah Johnson', role: 'HR Director', department: 'HR' },
  { id: 4, name: 'Alex Rivera', role: 'Design Director', department: 'Design' },
  { id: 5, name: 'Jessica Chen', role: 'Senior Designer', department: 'Design' },
  { id: 6, name: 'Mike Chen', role: 'Recruiter', department: 'HR' }
];

export default function HRCandidateEvaluation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter evaluations
  const filteredEvaluations = MOCK_EVALUATIONS.filter(evaluation => {
    const matchesSearch = !searchTerm || 
      evaluation.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || evaluation.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      in_progress: 'blue',
      completed: 'green',
      rejected: 'red'
    };
    return colors[status] || 'gray';
  };

  const getRecommendationColor = (recommendation) => {
    const colors = {
      hire: 'green',
      reject: 'red',
      maybe: 'yellow',
      hold: 'orange'
    };
    return colors[recommendation] || 'gray';
  };

  const calculateOverallScore = (evaluators) => {
    if (!evaluators.length) return 0;
    
    const totalScore = evaluators.reduce((sum, evaluator) => {
      const criteriaScores = Object.values(evaluator.scores);
      const avgScore = criteriaScores.reduce((a, b) => a + b, 0) / criteriaScores.length;
      return sum + avgScore;
    }, 0);
    
    return totalScore / evaluators.length;
  };

  const renderScoreBar = (score, maxScore = 5) => {
    const percentage = (score / maxScore) * 100;
    const color = score >= 4 ? 'green' : score >= 3 ? 'yellow' : 'red';
    
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-700 rounded-full h-2">
          <div 
            className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-white font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  const renderEvaluationCard = (evaluation) => {
    const statusColor = getStatusColor(evaluation.status);
    const overallScore = evaluation.overallScore || calculateOverallScore(evaluation.evaluators);
    
    return (
      <div key={evaluation.id} className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 hover:border-indigo-600 transition-colors">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{evaluation.candidateName}</h3>
              <p className="text-gray-400">{evaluation.position}</p>
              <p className="text-sm text-gray-500">{evaluation.department}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-900/30 text-${statusColor}-300 border border-${statusColor}-700`}>
              {evaluation.status.replace('_', ' ')}
            </div>
            {evaluation.recommendation && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${getRecommendationColor(evaluation.recommendation)}-900/30 text-${getRecommendationColor(evaluation.recommendation)}-300 border border-${getRecommendationColor(evaluation.recommendation)}-700`}>
                {evaluation.recommendation}
              </div>
            )}
          </div>
        </div>

        {/* Score Overview */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Overall Score</span>
            <span className="text-sm text-gray-400">{overallScore.toFixed(1)}/5.0</span>
          </div>
          {renderScoreBar(overallScore)}
        </div>

        {/* Progress */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-400">Evaluators:</span>
            <p className="text-white">{evaluation.evaluators.length} completed</p>
          </div>
          <div>
            <span className="text-gray-400">Interviews:</span>
            <p className="text-white">{evaluation.interviews.length} conducted</p>
          </div>
          <div>
            <span className="text-gray-400">Date:</span>
            <p className="text-white">{new Date(evaluation.evaluationDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-400">Created:</span>
            <p className="text-white">{new Date(evaluation.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedEvaluation(evaluation)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Eye size={14} />
            View Details
          </button>
          
          {evaluation.status !== 'completed' && (
            <button
              onClick={() => {
                setSelectedEvaluation(evaluation);
                setShowScoreModal(true);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              <Star size={14} />
              Add Score
            </button>
          )}
          
          <button
            onClick={() => {
              setSelectedEvaluation(evaluation);
              setShowEvaluationModal(true);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
          >
            <Edit size={14} />
            Edit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Candidate Evaluation</h2>
          <p className="text-gray-400">
            Comprehensive evaluation and scoring system with multiple reviewers
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export Report
          </button>
          <button
            onClick={() => setShowEvaluationModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={16} />
            New Evaluation
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by candidate name or position..."
            className="w-full pl-10 pr-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-blue-400" />
            <span className="text-sm text-gray-400">Total Evaluations</span>
          </div>
          <p className="text-2xl font-bold text-white">{MOCK_EVALUATIONS.length}</p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-orange-400" />
            <span className="text-sm text-gray-400">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {MOCK_EVALUATIONS.filter(e => e.status === 'in_progress').length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {MOCK_EVALUATIONS.filter(e => e.status === 'completed').length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-purple-400" />
            <span className="text-sm text-gray-400">Avg Score</span>
          </div>
          <p className="text-2xl font-bold text-white">4.1</p>
        </div>
      </div>

      {/* Evaluation Criteria Overview */}
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Evaluation Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {EVALUATION_CRITERIA.map(criteria => {
            const IconComponent = criteria.icon;
            return (
              <div key={criteria.id} className="text-center">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconComponent size={24} className="text-indigo-400" />
                </div>
                <h4 className="text-white font-medium mb-1">{criteria.name}</h4>
                <p className="text-sm text-gray-400">{criteria.weight}% weight</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evaluations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvaluations.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-500 text-lg">No evaluations found matching your criteria.</p>
          </div>
        ) : (
          filteredEvaluations.map(renderEvaluationCard)
        )}
      </div>

      {/* Evaluation Detail Modal */}
      {selectedEvaluation && !showEvaluationModal && !showScoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedEvaluation.candidateName}</h2>
                  <p className="text-gray-400">{selectedEvaluation.position} - {selectedEvaluation.department}</p>
                </div>
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-4 mt-4">
                {['overview', 'scores', 'feedback', 'timeline'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition ${
                      activeTab === tab 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Overall Assessment</h3>
                    <div className="bg-[#2A2D3D] p-6 rounded-lg border border-gray-700">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-center mb-4">
                            <div className="text-4xl font-bold text-white mb-2">
                              {(selectedEvaluation.overallScore || calculateOverallScore(selectedEvaluation.evaluators)).toFixed(1)}
                            </div>
                            <div className="text-gray-400">Overall Score</div>
                          </div>
                          {selectedEvaluation.recommendation && (
                            <div className="text-center">
                              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium bg-${getRecommendationColor(selectedEvaluation.recommendation)}-900/30 text-${getRecommendationColor(selectedEvaluation.recommendation)}-300 border border-${getRecommendationColor(selectedEvaluation.recommendation)}-700`}>
                                Recommendation: {selectedEvaluation.recommendation.toUpperCase()}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-3">Evaluation Progress</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Evaluators:</span>
                              <span className="text-white">{selectedEvaluation.evaluators.length} completed</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Interviews:</span>
                              <span className="text-white">{selectedEvaluation.interviews.length} conducted</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Status:</span>
                              <span className="text-white capitalize">{selectedEvaluation.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Evaluators */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Evaluators</h3>
                    <div className="space-y-3">
                      {selectedEvaluation.evaluators.map(evaluator => (
                        <div key={evaluator.id} className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{evaluator.name}</p>
                                <p className="text-sm text-gray-400">{evaluator.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-medium">
                                {(Object.values(evaluator.scores).reduce((a, b) => a + b, 0) / Object.values(evaluator.scores).length).toFixed(1)}/5.0
                              </p>
                              <p className="text-sm text-gray-400">
                                {new Date(evaluator.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'scores' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Detailed Scores</h3>
                  
                  {EVALUATION_CRITERIA.map(criteria => {
                    const scores = selectedEvaluation.evaluators.map(e => e.scores[criteria.id]).filter(Boolean);
                    const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                    
                    return (
                      <div key={criteria.id} className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                          <criteria.icon size={20} className="text-indigo-400" />
                          <h4 className="text-white font-medium">{criteria.name}</h4>
                          <span className="text-sm text-gray-400">({criteria.weight}% weight)</span>
                        </div>
                        
                        <div className="mb-3">
                          {renderScoreBar(avgScore)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedEvaluation.evaluators.map(evaluator => (
                            <div key={evaluator.id} className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm">{evaluator.name}:</span>
                              <span className="text-white font-medium">{evaluator.scores[criteria.id]?.toFixed(1) || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Evaluator Feedback</h3>
                  
                  {selectedEvaluation.evaluators.map(evaluator => (
                    <div key={evaluator.id} className="bg-[#2A2D3D] p-6 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{evaluator.name}</p>
                          <p className="text-sm text-gray-400">{evaluator.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-white font-medium mb-2">Strengths:</h5>
                          <ul className="text-gray-300 space-y-1">
                            {evaluator.feedback.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium mb-2">Areas for Improvement:</h5>
                          <ul className="text-gray-300 space-y-1">
                            {evaluator.feedback.concerns.map((concern, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium mb-2">Additional Notes:</h5>
                          <p className="text-gray-300">{evaluator.feedback.notes}</p>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${getRecommendationColor(evaluator.feedback.recommendation)}-900/30 text-${getRecommendationColor(evaluator.feedback.recommendation)}-300 border border-${getRecommendationColor(evaluator.feedback.recommendation)}-700`}>
                            {evaluator.feedback.recommendation.toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(evaluator.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Evaluation Timeline</h3>
                  
                  <div className="space-y-4">
                    {/* Creation */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plus size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Evaluation Created</p>
                        <p className="text-sm text-gray-400">
                          {new Date(selectedEvaluation.createdAt).toLocaleDateString()} at {new Date(selectedEvaluation.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Interviews */}
                    {selectedEvaluation.interviews.map((interview, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Interview Conducted</p>
                          <p className="text-sm text-gray-400">
                            {interview.type} interview with {interview.interviewer} on {new Date(interview.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Evaluations */}
                    {selectedEvaluation.evaluators.map(evaluator => (
                      <div key={evaluator.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Evaluation Submitted</p>
                          <p className="text-sm text-gray-400">
                            {evaluator.name} submitted evaluation on {new Date(evaluator.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Score Modal */}
      {showScoreModal && selectedEvaluation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Add Evaluation Score</h2>
              <p className="text-gray-400">{selectedEvaluation.candidateName} - {selectedEvaluation.position}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Evaluator</label>
                  <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                    <option value="">Select evaluator...</option>
                    {MOCK_EVALUATORS.map(evaluator => (
                      <option key={evaluator.id} value={evaluator.id}>
                        {evaluator.name} - {evaluator.role}
                      </option>
                    ))}
                  </select>
                </div>
                
                {EVALUATION_CRITERIA.map(criteria => (
                  <div key={criteria.id}>
                    <div className="flex items-center gap-3 mb-3">
                      <criteria.icon size={20} className="text-indigo-400" />
                      <h4 className="text-white font-medium">{criteria.name}</h4>
                      <span className="text-sm text-gray-400">({criteria.weight}% weight)</span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          className="p-3 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white hover:bg-indigo-600 hover:border-indigo-500 transition"
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {criteria.name} Notes
                      </label>
                      <textarea
                        rows={2}
                        className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                        placeholder={`Comments about ${criteria.name.toLowerCase()}...`}
                      />
                    </div>
                  </div>
                ))}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Overall Recommendation</label>
                  <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                    <option value="">Select recommendation...</option>
                    <option value="hire">Hire</option>
                    <option value="maybe">Maybe</option>
                    <option value="hold">Hold</option>
                    <option value="reject">Reject</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Comments</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Any additional feedback or observations..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowScoreModal(false);
                    setSelectedEvaluation(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScoreModal(false);
                    setSelectedEvaluation(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Evaluation Modal */}
      {showEvaluationModal && !selectedEvaluation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-2xl w-full">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Create New Evaluation</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Candidate</label>
                  <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                    <option value="">Select candidate...</option>
                    <option value="1">Rohit Sharma - Senior Frontend Developer</option>
                    <option value="2">Sneha Verma - HR Business Partner</option>
                    <option value="5">James Wilson - Senior UX Designer</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      placeholder="Job position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                    <select className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                      <option value="">Select department...</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Evaluators</label>
                  <div className="max-h-32 overflow-y-auto border border-gray-700 rounded-lg p-2 bg-[#2A2D3D]">
                    {MOCK_EVALUATORS.map(evaluator => (
                      <label key={evaluator.id} className="flex items-center gap-2 p-2 hover:bg-[#1B1E2B] rounded">
                        <input type="checkbox" className="text-indigo-600" />
                        <span className="text-white">{evaluator.name}</span>
                        <span className="text-sm text-gray-400">({evaluator.role})</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Evaluation Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Any special instructions or notes for evaluators..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Create Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}