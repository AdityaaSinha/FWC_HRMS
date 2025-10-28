// src/pages/hr/HRJobApplicationForm.jsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Upload, 
  Calendar, 
  DollarSign,
  Globe,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Send
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock job data for the application form
const MOCK_JOB_DATA = {
  1: { title: 'Senior Frontend Developer', department: 'Engineering', location: 'New York, NY' },
  2: { title: 'HR Business Partner', department: 'Human Resources', location: 'San Francisco, CA' },
  3: { title: 'Senior Data Analyst', department: 'Analytics', location: 'Austin, TX' },
  4: { title: 'Digital Marketing Manager', department: 'Marketing', location: 'Chicago, IL' },
  5: { title: 'Senior UX Designer', department: 'Design', location: 'Seattle, WA' }
};

// Application policies and requirements
const APPLICATION_POLICIES = [
  {
    id: 'equal_opportunity',
    title: 'Equal Opportunity Employment',
    description: 'We are an equal opportunity employer committed to diversity and inclusion.',
    required: true,
    acknowledged: false
  },
  {
    id: 'background_check',
    title: 'Background Check Authorization',
    description: 'I authorize the company to conduct background checks as part of the hiring process.',
    required: true,
    acknowledged: false
  },
  {
    id: 'drug_screening',
    title: 'Drug Screening Policy',
    description: 'I understand that employment may be contingent upon passing a drug screening.',
    required: true,
    acknowledged: false
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality Agreement',
    description: 'I agree to maintain confidentiality of all company information.',
    required: true,
    acknowledged: false
  },
  {
    id: 'at_will_employment',
    title: 'At-Will Employment',
    description: 'I understand that employment is at-will and can be terminated by either party.',
    required: true,
    acknowledged: false
  }
];

export default function HRJobApplicationForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = MOCK_JOB_DATA[jobId] || { title: 'Unknown Position', department: 'N/A', location: 'N/A' };

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Professional Information
    currentJobTitle: '',
    currentCompany: '',
    totalExperience: '',
    relevantExperience: '',
    expectedSalary: '',
    availabilityDate: '',
    
    // Education
    highestDegree: '',
    fieldOfStudy: '',
    university: '',
    graduationYear: '',
    gpa: '',
    
    // Skills and Certifications
    technicalSkills: '',
    certifications: '',
    languages: '',
    
    // Application Materials
    coverLetter: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    
    // Additional Information
    workAuthorization: '',
    willingToRelocate: '',
    preferredWorkArrangement: '',
    referralSource: '',
    additionalComments: ''
  });

  const [files, setFiles] = useState({
    resume: null,
    coverLetterFile: null,
    portfolio: null,
    transcript: null
  });

  const [policies, setPolicies] = useState(APPLICATION_POLICIES);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileUpload = (fileType, file) => {
    setFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handlePolicyAcknowledgment = (policyId, acknowledged) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === policyId ? { ...policy, acknowledged } : policy
    ));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      case 2: // Professional Information
        if (!formData.totalExperience) newErrors.totalExperience = 'Total experience is required';
        if (!formData.expectedSalary) newErrors.expectedSalary = 'Expected salary is required';
        if (!formData.availabilityDate) newErrors.availabilityDate = 'Availability date is required';
        break;
      case 3: // Education & Skills
        if (!formData.highestDegree) newErrors.highestDegree = 'Highest degree is required';
        if (!formData.technicalSkills) newErrors.technicalSkills = 'Technical skills are required';
        break;
      case 4: // Documents
        if (!files.resume) newErrors.resume = 'Resume is required';
        if (!formData.coverLetter && !files.coverLetterFile) {
          newErrors.coverLetter = 'Cover letter is required (text or file)';
        }
        break;
      case 5: // Policies
        const unacknowledgedPolicies = policies.filter(p => p.required && !p.acknowledged);
        if (unacknowledgedPolicies.length > 0) {
          newErrors.policies = 'All required policies must be acknowledged';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would submit to the backend
      console.log('Application submitted:', { formData, files, policies });
      
      // Redirect to success page or candidates dashboard
      navigate('/hr/candidates?submitted=true');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Job Title
                </label>
                <input
                  type="text"
                  value={formData.currentJobTitle}
                  onChange={(e) => handleInputChange('currentJobTitle', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Company
                </label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Total Years of Experience *
                </label>
                <select
                  value={formData.totalExperience}
                  onChange={(e) => handleInputChange('totalExperience', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.totalExperience ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.totalExperience && <p className="text-red-400 text-sm mt-1">{errors.totalExperience}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relevant Experience
                </label>
                <select
                  value={formData.relevantExperience}
                  onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Salary Range *
                </label>
                <input
                  type="text"
                  value={formData.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                  placeholder="e.g., $80,000 - $100,000"
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.expectedSalary ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.expectedSalary && <p className="text-red-400 text-sm mt-1">{errors.expectedSalary}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Availability Date *
                </label>
                <input
                  type="date"
                  value={formData.availabilityDate}
                  onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.availabilityDate ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.availabilityDate && <p className="text-red-400 text-sm mt-1">{errors.availabilityDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Work Authorization Status
              </label>
              <select
                value={formData.workAuthorization}
                onChange={(e) => handleInputChange('workAuthorization', e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select status</option>
                <option value="citizen">US Citizen</option>
                <option value="permanent_resident">Permanent Resident</option>
                <option value="work_visa">Work Visa (H1B, L1, etc.)</option>
                <option value="student_visa">Student Visa (F1 with OPT/CPT)</option>
                <option value="requires_sponsorship">Requires Sponsorship</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Willing to Relocate?
                </label>
                <select
                  value={formData.willingToRelocate}
                  onChange={(e) => handleInputChange('willingToRelocate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="depends">Depends on location</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Work Arrangement
                </label>
                <select
                  value={formData.preferredWorkArrangement}
                  onChange={(e) => handleInputChange('preferredWorkArrangement', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select preference</option>
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Education & Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Highest Degree *
                </label>
                <select
                  value={formData.highestDegree}
                  onChange={(e) => handleInputChange('highestDegree', e.target.value)}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.highestDegree ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="">Select degree</option>
                  <option value="high_school">High School</option>
                  <option value="associate">Associate's Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                {errors.highestDegree && <p className="text-red-400 text-sm mt-1">{errors.highestDegree}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  University/Institution
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  min="1950"
                  max="2030"
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="number"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  min="0"
                  max="4"
                  step="0.1"
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technical Skills *
              </label>
              <textarea
                value={formData.technicalSkills}
                onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
                placeholder="List your technical skills, programming languages, tools, etc."
                rows={4}
                className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                  errors.technicalSkills ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {errors.technicalSkills && <p className="text-red-400 text-sm mt-1">{errors.technicalSkills}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Certifications
              </label>
              <textarea
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                placeholder="List any relevant certifications"
                rows={3}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Languages
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                placeholder="e.g., English (Native), Spanish (Fluent), French (Conversational)"
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Application Documents</h3>
            
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resume/CV *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.resume ? 'border-red-500' : 'border-gray-600'
              }`}>
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400 mb-2">
                  {files.resume ? files.resume.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition"
                >
                  Choose File
                </label>
              </div>
              {errors.resume && <p className="text-red-400 text-sm mt-1">{errors.resume}</p>}
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cover Letter *
              </label>
              <div className="space-y-4">
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  placeholder="Write your cover letter here..."
                  rows={8}
                  className={`w-full px-3 py-2 bg-[#2A2D3D] border rounded-lg text-white focus:outline-none focus:border-indigo-500 ${
                    errors.coverLetter ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                
                <div className="text-center text-gray-400">
                  <span>OR</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <FileText size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400 mb-2">
                    {files.coverLetterFile ? files.coverLetterFile.name : 'Upload cover letter file'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload('coverLetterFile', e.target.files[0])}
                    className="hidden"
                    id="cover-letter-upload"
                  />
                  <label
                    htmlFor="cover-letter-upload"
                    className="inline-block px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              {errors.coverLetter && <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>}
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio (Optional)
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                placeholder="https://your-portfolio.com"
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How did you hear about this position?
              </label>
              <select
                value={formData.referralSource}
                onChange={(e) => handleInputChange('referralSource', e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select source</option>
                <option value="company_website">Company Website</option>
                <option value="job_board">Job Board (Indeed, LinkedIn, etc.)</option>
                <option value="referral">Employee Referral</option>
                <option value="recruiter">Recruiter</option>
                <option value="social_media">Social Media</option>
                <option value="career_fair">Career Fair</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Additional Comments
              </label>
              <textarea
                value={formData.additionalComments}
                onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                placeholder="Any additional information you'd like to share..."
                rows={4}
                className="w-full px-3 py-2 bg-[#2A2D3D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Policies & Acknowledgments</h3>
            
            <div className="space-y-4">
              {policies.map((policy) => (
                <div key={policy.id} className="bg-[#2A2D3D] p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={policy.id}
                      checked={policy.acknowledged}
                      onChange={(e) => handlePolicyAcknowledgment(policy.id, e.target.checked)}
                      className="mt-1 w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <label htmlFor={policy.id} className="font-medium text-white cursor-pointer">
                        {policy.title} {policy.required && <span className="text-red-400">*</span>}
                      </label>
                      <p className="text-sm text-gray-400 mt-1">{policy.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {errors.policies && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={16} />
                <p className="text-sm">{errors.policies}</p>
              </div>
            )}

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-300 mb-2">Application Review Process</h4>
                  <p className="text-sm text-blue-200">
                    Your application will be reviewed by our HR team within 3-5 business days. 
                    If your qualifications match our requirements, we'll contact you to schedule 
                    an initial interview. Thank you for your interest in joining our team!
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition"
        >
          <ArrowLeft size={20} />
          Back to Job Listings
        </button>
        
        <div className="bg-[#1B1E2B] p-6 rounded-xl border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-2">Job Application</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <Briefcase size={16} />
              {jobData.title}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {jobData.location}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {step}
              </div>
              {step < 5 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-indigo-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Personal</span>
          <span>Professional</span>
          <span>Education</span>
          <span>Documents</span>
          <span>Policies</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-[#1B1E2B] rounded-xl border border-gray-800 p-6 mb-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} />
          Previous
        </button>
        
        {currentStep < 5 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Next
            <ArrowLeft size={16} className="rotate-180" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Application
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}