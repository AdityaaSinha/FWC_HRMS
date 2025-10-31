import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Sparkles,
  Brain,
  FolderKanban,
  Settings,
} from 'lucide-react';

import HRDashboardHome from './HRDashboardHome';
import HRCandidatesDashboard from './HRCandidatesDashboard';

// --- NEW/UPDATED IMPORTS ---
import TestJobsDashboard from './TestJobsDashboard';     // TEMPORARY TEST COMPONENT
import HRJobsDashboard from './HRJobsDashboard';     // The parent layout component
import HRJobListPage from './HRJobListPage';       // The job list page
import HRCreateJobPage from './HRCreateJobPage';   // The create form page
import HRJobDetailsPage from './HRJobDetailsPage';   // The job details page
// --- END NEW IMPORTS ---

import AIResumeScreeningPage from './AITools/AIResumeScreeningPage';
import AIJobDescriptionPage from './AITools/AIJobDescriptionPage';
import HRReportsAnalytics from './HRReportsAnalytics';
import HRDepartmentsPage from './HRDepartmentsPage';
import HRUserRolesPage from './HRUserRolesPage';
import HRJobEditPage from './HRJobEditPage';
import HREmployeesPage from './HREmployeesPage';
import HRJobApplicationForm from './HRJobApplicationForm';
import HRHiringWorkflow from './HRHiringWorkflow';
import HRInterviewScheduler from './HRInterviewScheduler';
import HRCandidateEvaluation from './HRCandidateEvaluation';

export const hrRoutes = [
  {
    module: 'Dashboard',
    pages: [
      {
        path: '',
        label: 'Home',
        icon: LayoutDashboard,
        component: HRDashboardHome,
      },
    ],
  },
  {
    module: 'Jobs',
    pages: [
      {
        path: 'jobs', 
        label: 'Job Listings',
        icon: Briefcase,
        component: HRJobsDashboard, // BACK TO ORIGINAL COMPONENT
        
        children: [
          {
            index: true, 
            component: HRJobListPage,
          },
          {
            path: 'create', 
            label: 'Create Job', 
            component: HRCreateJobPage,
          },
          {
            path: ':id', 
            label: 'Job Details', 
            component: HRJobDetailsPage,
          },
          { // <-- 2. ADD THE NEW EDIT ROUTE
            path: ':id/edit', 
            label: 'Edit Job', 
            component: HRJobEditPage,
          },
          {
            path: 'apply/:jobId',
            label: 'Job Application',
            component: HRJobApplicationForm,
          },
        ]
      },
    ],
  },
  {
    module: 'Employees',
    pages: [
      {
        path: 'employees',
        label: 'Employees',
        icon: Users,
        component: HREmployeesPage,
      },
    ],
  },
  {
    module: 'Candidates',
    pages: [
      {
        path: 'candidates',
        label: 'Candidate Pool',
        icon: Users,
        component: HRCandidatesDashboard,
      },
    ],
  },
  {
    module: 'Hiring',
    pages: [
      {
        path: 'hiring/workflow',
        label: 'Hiring Workflow',
        icon: FolderKanban,
        component: HRHiringWorkflow,
      },
      {
        path: 'hiring/interviews',
        label: 'Interview Scheduler',
        icon: Users,
        component: HRInterviewScheduler,
      },
      {
        path: 'hiring/evaluations',
        label: 'Candidate Evaluation',
        icon: FileText,
        component: HRCandidateEvaluation,
      },
    ],
  },
  {
    module: 'AI Tools',
    pages: [
      {
        path: 'ai/resume-screening',
        label: 'AI Resume Screening',
        icon: Brain,
        component: AIResumeScreeningPage,
      },
      {
        path: 'ai/jd-generator',
        label: 'Job Description Generator',
        icon: Sparkles,
        component: AIJobDescriptionPage,
      },
    ],
  },
  {
    module: 'Reports & Analytics',
    pages: [
      {
        path: 'reports',
        label: 'Hiring Funnel & Insights',
        icon: FileText,
        component: HRReportsAnalytics,
      },
    ],
  },
  {
    module: 'Settings',
    pages: [
      {
        path: 'departments',
        label: 'Departments',
        icon: FolderKanban,
        component: HRDepartmentsPage,
      },
      {
        path: 'users',
        label: 'HR Roles & Permissions',
        icon: Settings,
        component: HRUserRolesPage,
      },
    ],
  },
];

// --- UPDATED FLATTENED ROUTES FUNCTION ---
// This function now understands the `children` array
// and creates the correct paths for React Router.

function flattenRoutes(routes) {
  let flat = [];

  routes.forEach((mod) => {
    mod.pages.forEach((page) => {
      // 1. Add the parent page itself
      flat.push({
        path: page.path,
        component: page.component,
        exact: !page.children, // Parent routes aren't exact
      });

      // 2. Add all child pages, if they exist
      if (page.children) {
        page.children.forEach((child) => {
          flat.push({
            // If it's an 'index' route, its path is the same as the parent
            // Otherwise, join the paths (e.g., 'jobs' + '/' + 'create')
            path: child.index ? page.path : `${page.path}/${child.path}`,
            component: child.component,
            exact: true, // Child routes are always exact
          });
        });
      }
    });
  });

  return flat;
}

// This exported constant is now correct
export const flatHRRoutes = flattenRoutes(hrRoutes);