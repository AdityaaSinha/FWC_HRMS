// src/pages/hr/HRHiringWorkflow.jsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Send,
  Download,
  Upload,
  Edit,
  Eye,
  MessageSquare,
  DollarSign,
  Briefcase,
  MapPin,
  Users,
  Award,
  Target,
  TrendingUp,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// Hiring workflow stages
const WORKFLOW_STAGES = [
  { id: 'offer_preparation', name: 'Offer Preparation', color: 'blue' },
  { id: 'offer_sent', name: 'Offer Sent', color: 'orange' },
  { id: 'offer_negotiation', name: 'Negotiation', color: 'yellow' },
  { id: 'offer_accepted', name: 'Offer Accepted', color: 'green' },
  { id: 'background_check', name: 'Background Check', color: 'purple' },
  { id: 'onboarding_prep', name: 'Onboarding Prep', color: 'indigo' },
  { id: 'first_day', name: 'First Day', color: 'emerald' },
  { id: 'completed', name: 'Completed', color: 'green' }
];

// Mock hiring data
const MOCK_HIRING_CANDIDATES = [
  {
    id: 1,
    candidateId: 2,
    name: 'Sneha Verma',
    email: 'sneha@example.com',
    phone: '+1 (555) 234-5678',
    position: 'HR Business Partner',
    department: 'Human Resources',
    hiringManager: 'Sarah Johnson',
    recruiter: 'Mike Chen',
    stage: 'offer_accepted',
    offerDetails: {
      salary: 85000,
      startDate: '2024-02-15',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      offerSentDate: '2024-01-28',
      responseDeadline: '2024-02-05',
      negotiationNotes: 'Requested additional PTO days - approved'
    },
    backgroundCheck: {
      status: 'pending',
      vendor: 'BackgroundCheck Inc.',
      submittedDate: '2024-02-01',
      expectedCompletion: '2024-02-08'
    },
    onboarding: {
      buddyAssigned: 'Jennifer Lee',
      equipmentOrdered: true,
      accessRequests: ['Email', 'HRIS', 'Slack', 'Office Access'],
      documentsNeeded: ['I-9', 'W-4', 'Direct Deposit', 'Emergency Contact'],
      orientationScheduled: '2024-02-15 09:00'
    },
    timeline: [
      { date: '2024-01-25', event: 'Final interview completed', type: 'interview' },
      { date: '2024-01-26', event: 'Reference checks completed', type: 'reference' },
      { date: '2024-01-28', event: 'Offer sent', type: 'offer' },
      { date: '2024-01-30', event: 'Candidate requested salary negotiation', type: 'negotiation' },
      { date: '2024-02-01', event: 'Offer accepted', type: 'acceptance' },
      { date: '2024-02-01', event: 'Background check initiated', type: 'background' }
    ]
  },
  {
    id: 2,
    candidateId: 5,
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+1 (555) 567-8901',
    position: 'Senior UX Designer',
    department: 'Design',
    hiringManager: 'Alex Rivera',
    recruiter: 'Lisa Park',
    stage: 'completed',
    offerDetails: {
      salary: 105000,
      startDate: '2024-01-15',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO', 'Stock Options'],
      offerSentDate: '2024-01-05',
      responseDeadline: '2024-01-12',
      negotiationNotes: 'No negotiations required'
    },
    backgroundCheck: {
      status: 'completed',
      vendor: 'BackgroundCheck Inc.',
      submittedDate: '2024-01-08',
      completedDate: '2024-01-12',
      result: 'Clear'
    },
    onboarding: {
      buddyAssigned: 'Sarah Kim',
      equipmentOrdered: true,
      accessRequests: ['Email', 'Design Tools', 'Figma', 'Slack', 'Office Access'],
      documentsCompleted: ['I-9', 'W-4', 'Direct Deposit', 'Emergency Contact'],
      orientationCompleted: '2024-01-15 09:00',
      firstDayCompleted: true
    },
    timeline: [
      { date: '2024-01-03', event: 'Final interview completed', type: 'interview' },
      { date: '2024-01-04', event: 'Reference checks completed', type: 'reference' },
      { date: '2024-01-05', event: 'Offer sent', type: 'offer' },
      { date: '2024-01-07', event: 'Offer accepted', type: 'acceptance' },
      { date: '2024-01-08', event: 'Background check initiated', type: 'background' },
      { date: '2024-01-12', event: 'Background check completed', type: 'background' },
      { date: '2024-01-15', event: 'First day completed', type: 'onboarding' }
    ]
  },
  {
    id: 3,
    candidateId: 1,
    name: 'Rohit Sharma',
    email: 'rohit@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    hiringManager: 'David Chen',
    recruiter: 'Emma Wilson',
    stage: 'offer_preparation',
    offerDetails: {
      salary: 95000,
      startDate: '2024-02-20',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      draftPrepared: true,
      approvalPending: true
    },
    timeline: [
      { date: '2024-01-30', event: 'Final interview completed', type: 'interview' },
      { date: '2024-02-01', event: 'Reference checks in progress', type: 'reference' }
    ]
  }
];

// Policy compliance checklist
const HIRING_POLICIES = [
  {
    id: 'equal_opportunity',
    name: 'Equal Opportunity Compliance',
    description: 'Ensure hiring process follows EEO guidelines',
    required: true
  },
  {
    id: 'background_check',
    name: 'Background Check Authorization',
    description: 'Obtain proper authorization for background screening',
    required: true
  },
  {
    id: 'reference_verification',
    name: 'Reference Verification',
    description: 'Complete reference checks with previous employers',
    required: true
  },
  {
    id: 'offer_approval',
    name: 'Offer Approval Process',
    description: 'Obtain necessary approvals for compensation package',
    required: true
  },
  {
    id: 'onboarding_checklist',
    name: 'Onboarding Checklist',
    description: 'Complete all onboarding requirements and documentation',
    required: true
  }
];

export default function HRHiringWorkflow() {
  const [searchParams] = useSearchParams();
  const candidateFilter = searchParams.get('candidate');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  // Filter candidates
  const filteredCandidates = MOCK_HIRING_CANDIDATES.filter(candidate => {
    const matchesCandidate = !candidateFilter || candidate.candidateId.toString() === candidateFilter;
    const matchesSearch = !searchTerm || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || candidate.stage === stageFilter;
    
    return matchesCandidate && matchesSearch && matchesStage;
  });

  const getStageConfig = (stageId) => {
    return WORKFLOW_STAGES.find(stage => stage.id === stageId) || WORKFLOW_STAGES[0];
  };

  const getStageProgress = (stageId) => {
    const stageIndex = WORKFLOW_STAGES.findIndex(stage => stage.id === stageId);
    return ((stageIndex + 1) / WORKFLOW_STAGES.length) * 100;
  };

  const handleStageUpdate = (candidateId, newStage) => {
    // In a real app, this would update the backend
    console.log(`Updating candidate ${candidateId} to stage ${newStage}`);
  };

  const renderCandidateCard = (candidate) => {
    const stageConfig = getStageConfig(candidate.stage);
    const progress = getStageProgress(candidate.stage);
    
    return (
      <div key={candidate.id} className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 hover:border-indigo-600 transition-colors">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
              <p className="text-gray-400">{candidate.position}</p>
              <p className="text-sm text-gray-500">{candidate.department}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${stageConfig.color}-900/30 text-${stageConfig.color}-300 border border-${stageConfig.color}-700`}>
            {stageConfig.name}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-${stageConfig.color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-400">Hiring Manager:</span>
            <p className="text-white">{candidate.hiringManager}</p>
          </div>
          <div>
            <span className="text-gray-400">Recruiter:</span>
            <p className="text-white">{candidate.recruiter}</p>
          </div>
          {candidate.offerDetails?.startDate && (
            <>
              <div>
                <span className="text-gray-400">Start Date:</span>
                <p className="text-white">{new Date(candidate.offerDetails.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Salary:</span>
                <p className="text-white">${candidate.offerDetails.salary?.toLocaleString()}</p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCandidate(candidate)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Eye size={14} />
            View Details
          </button>
          
          {candidate.stage === 'offer_preparation' && (
            <button
              onClick={() => {
                setSelectedCandidate(candidate);
                setShowOfferModal(true);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              <Send size={14} />
              Send Offer
            </button>
          )}
          
          {['offer_accepted', 'background_check'].includes(candidate.stage) && (
            <button
              onClick={() => {
                setSelectedCandidate(candidate);
                setShowOnboardingModal(true);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
            >
              <Users size={14} />
              Onboarding
            </button>
          )}
          
          <select
            value={candidate.stage}
            onChange={(e) => handleStageUpdate(candidate.id, e.target.value)}
            className="text-xs bg-[#2A2D3D] border border-gray-700 rounded px-2 py-1 text-white"
          >
            {WORKFLOW_STAGES.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Hiring Workflow</h2>
          <p className="text-gray-400">
            Manage the complete hiring process from offer to onboarding
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={16} />
            Add Candidate
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
            placeholder="Search candidates by name, position, or department..."
            className="w-full pl-10 pr-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-4 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Stages</option>
          {WORKFLOW_STAGES.map(stage => (
            <option key={stage.id} value={stage.id}>{stage.name}</option>
          ))}
        </select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-blue-400" />
            <span className="text-sm text-gray-400">Active Candidates</span>
          </div>
          <p className="text-2xl font-bold text-white">{filteredCandidates.length}</p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Send size={16} className="text-orange-400" />
            <span className="text-sm text-gray-400">Offers Sent</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {filteredCandidates.filter(c => ['offer_sent', 'offer_negotiation', 'offer_accepted'].includes(c.stage)).length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-gray-400">Offers Accepted</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {filteredCandidates.filter(c => ['offer_accepted', 'background_check', 'onboarding_prep', 'first_day', 'completed'].includes(c.stage)).length}
          </p>
        </div>
        
        <div className="bg-[#1B1E2B] p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-purple-400" />
            <span className="text-sm text-gray-400">Completed Hires</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {filteredCandidates.filter(c => c.stage === 'completed').length}
          </p>
        </div>
      </div>

      {/* Workflow Pipeline */}
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hiring Pipeline</h3>
        <div className="flex items-center justify-between">
          {WORKFLOW_STAGES.map((stage, index) => {
            const count = filteredCandidates.filter(c => c.stage === stage.id).length;
            return (
              <div key={stage.id} className="flex items-center">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full bg-${stage.color}-900/30 border-2 border-${stage.color}-700 flex items-center justify-center mb-2`}>
                    <span className={`text-${stage.color}-300 font-bold`}>{count}</span>
                  </div>
                  <p className="text-xs text-gray-400 max-w-20">{stage.name}</p>
                </div>
                {index < WORKFLOW_STAGES.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-700 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-500 text-lg">No candidates found matching your criteria.</p>
          </div>
        ) : (
          filteredCandidates.map(renderCandidateCard)
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && !showOfferModal && !showOnboardingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedCandidate.name}</h2>
                  <p className="text-gray-400">{selectedCandidate.position} - {selectedCandidate.department}</p>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Hiring Timeline</h3>
                <div className="space-y-3">
                  {selectedCandidate.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-white">{event.event}</p>
                        <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer Details */}
              {selectedCandidate.offerDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Offer Details</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400">Salary:</span>
                        <p className="text-white font-medium">${selectedCandidate.offerDetails.salary?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Start Date:</span>
                        <p className="text-white font-medium">
                          {selectedCandidate.offerDetails.startDate ? 
                            new Date(selectedCandidate.offerDetails.startDate).toLocaleDateString() : 
                            'TBD'
                          }
                        </p>
                      </div>
                    </div>
                    {selectedCandidate.offerDetails.negotiationNotes && (
                      <div className="mt-4">
                        <span className="text-gray-400">Negotiation Notes:</span>
                        <p className="text-white">{selectedCandidate.offerDetails.negotiationNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Background Check */}
              {selectedCandidate.backgroundCheck && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Background Check</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <p className="text-white font-medium capitalize">{selectedCandidate.backgroundCheck.status}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Vendor:</span>
                        <p className="text-white font-medium">{selectedCandidate.backgroundCheck.vendor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Onboarding */}
              {selectedCandidate.onboarding && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Onboarding</h3>
                  <div className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400">Buddy:</span>
                        <p className="text-white font-medium">{selectedCandidate.onboarding.buddyAssigned || 'Not assigned'}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Equipment:</span>
                        <p className="text-white font-medium">
                          {selectedCandidate.onboarding.equipmentOrdered ? 'Ordered' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {showOfferModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-2xl w-full">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Send Job Offer</h2>
              <p className="text-gray-400">{selectedCandidate.name} - {selectedCandidate.position}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Salary</label>
                    <input
                      type="number"
                      defaultValue={selectedCandidate.offerDetails?.salary}
                      className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      defaultValue={selectedCandidate.offerDetails?.startDate}
                      className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Any additional terms or notes..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle offer sending
                    setShowOfferModal(false);
                    setSelectedCandidate(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Send Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboardingModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Onboarding Checklist</h2>
              <p className="text-gray-400">{selectedCandidate.name} - {selectedCandidate.position}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Onboarding Tasks */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Pre-boarding Tasks</h3>
                <div className="space-y-3">
                  {[
                    'Send welcome email with first day information',
                    'Order equipment (laptop, monitor, accessories)',
                    'Set up workspace and desk assignment',
                    'Create email account and system access',
                    'Assign onboarding buddy',
                    'Schedule orientation session',
                    'Prepare new hire paperwork'
                  ].map((task, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Required Documents</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['I-9 Form', 'W-4 Tax Form', 'Direct Deposit Form', 'Emergency Contact', 'Handbook Acknowledgment', 'Benefits Enrollment'].map((doc, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-300">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOnboardingModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle onboarding update
                    setShowOnboardingModal(false);
                    setSelectedCandidate(null);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}