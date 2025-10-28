import ManagerDashboardHome from './ManagerDashboardHome';
import ManagerLeaveRequests from './ManagerLeaveRequests';
import ManagerTeamOverview from './ManagerTeamOverview';
import ManagerPerformanceAnalytics from './ManagerPerformanceAnalytics';
import ManagerProjectManagement from './ManagerProjectManagement';
import ManagerReportingTools from './ManagerReportingTools';
import ManagerCommunicationHub from './ManagerCommunicationHub';
import ManagerDocumentManagement from './ManagerDocumentManagement';
import ManagerPredictiveAnalytics from './ManagerPredictiveAnalytics';

export const managerRoutes = [
  {
    label: 'Manager Portal',
    pages: [
      { name: 'Dashboard', path: '', component: ManagerDashboardHome },
      { name: 'Team Overview', path: 'team-overview', component: ManagerTeamOverview },
      { name: 'Performance Analytics', path: 'performance-analytics', component: ManagerPerformanceAnalytics },
      { name: 'Project Management', path: 'project-management', component: ManagerProjectManagement },
      { name: 'Reporting Tools', path: 'reporting-tools', component: ManagerReportingTools },
      { name: 'Communication Hub', path: 'communication-hub', component: ManagerCommunicationHub },
      { name: 'Document Management', path: 'document-management', component: ManagerDocumentManagement },
      { name: 'Predictive Analytics', path: 'predictive-analytics', component: ManagerPredictiveAnalytics },
      { name: 'Leave Requests', path: 'leave-requests', component: ManagerLeaveRequests },
    ],
  },
];

export const flatManagerRoutes = managerRoutes.flatMap(group => group.pages);
