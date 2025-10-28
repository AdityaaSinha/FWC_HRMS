// src/pages/admin/adminRoutes.js
import { LayoutDashboard, Users, Settings, FileText, Shield, Archive, Zap, Layers } from 'lucide-react';

// Dashboard
import AdminDashboardHome from './AdminDashboardHome';

// System & Access Control
import RolePermission from './system/RolePermission';
import AuditLogs from './system/AuditLogs';
import TwoFAManagement from './system/TwoFAManagement';
import SSOIntegration from './system/SSOIntegration';

// User & Department
import BulkUserImportExport from './user/BulkUserImportExport';
import AccountActivation from './user/AccountActivation';
import DepartmentHierarchy from './user/DepartmentHierarchy';
import EmployeeLifecycle from './user/EmployeeLifecycle';

// Analytics & Insights
import OrganizationDashboard from './analytics/OrganizationDashboard';
import CustomReportBuilder from './analytics/CustomReportBuilder';
import ExportReports from './analytics/ExportReports';

// Policy & Configuration
import CompanyPolicies from './policy/CompanyPolicies';
import LeaveAttendance from './policy/LeaveAttendance';
import PerformanceCycles from './policy/PerformanceCycles';

// Communication
import SystemAnnouncements from './communication/SystemAnnouncements';
import EmailSMSSettings from './communication/EmailSMSSettings';
import ChatModeration from './communication/ChatModeration';

// Compliance & Security
import DocumentManagement from './compliance/DocumentManagement';
import DataBackupRecovery from './compliance/DataBackupRecovery';
import ComplianceTracking from './compliance/ComplianceTracking';

// Integration & Automation
import ThirdPartyIntegrations from './integration/ThirdPartyIntegrations';
import AutomatedWorkflows from './integration/AutomatedWorkflows';
import APIManagement from './integration/APIManagement';

// Customization
import ThemeBrand from './customization/ThemeBrand';
import DashboardPersonalization from './customization/DashboardPersonalization';
import NotificationTemplates from './customization/NotificationTemplates';

// HR Management
import PayrollManagement from './hr/PayrollManagement';
import RecruitmentManagement from './hr/RecruitmentManagement';
import TrainingDevelopment from './hr/TrainingDevelopment';
import BenefitsCompensation from './hr/BenefitsCompensation';
import EmployeeEngagement from './hr/EmployeeEngagement';
import GoalTracking from './hr/GoalTracking';
import RiskManagement from './hr/RiskManagement';
import EmployeeRecognition from './hr/EmployeeRecognition';

// System Maintenance
import SystemMaintenance from './system/SystemMaintenance';

export const adminRoutes = [
  {
    module: 'Dashboard',
    pages: [
      { path: '', label: 'Home', icon: LayoutDashboard, component: AdminDashboardHome },
    ],
  },
  {
    module: 'System & Access Control',
    pages: [
      { path: 'system/role-permission', label: 'Role & Permission', icon: Users, component: RolePermission },
      { path: 'system/audit-logs', label: 'Audit Logs', icon: FileText, component: AuditLogs },
      { path: 'system/2fa', label: '2FA Management', icon: Shield, component: TwoFAManagement },
      { path: 'system/sso', label: 'SSO Integration', icon: Settings, component: SSOIntegration },
      { path: 'system/maintenance', label: 'System Maintenance', icon: Settings, component: SystemMaintenance },
    ],
  },
  {
    module: 'User & Department',
    pages: [
      { path: 'user/bulk-import-export', label: 'Bulk User Import/Export', icon: Users, component: BulkUserImportExport },
      { path: 'user/account-activation', label: 'Account Activation', icon: Users, component: AccountActivation },
      { path: 'user/department-hierarchy', label: 'Department Hierarchy', icon: Users, component: DepartmentHierarchy },
      { path: 'user/employee-lifecycle', label: 'Employee Lifecycle', icon: Users, component: EmployeeLifecycle },
    ],
  },
  {
    module: 'Analytics & Insights',
    pages: [
      { path: 'analytics/organization-dashboard', label: 'Organization Dashboard', icon: Layers, component: OrganizationDashboard },
      { path: 'analytics/custom-report-builder', label: 'Custom Report Builder', icon: FileText, component: CustomReportBuilder },
      { path: 'analytics/export-reports', label: 'Export Reports', icon: Archive, component: ExportReports },
    ],
  },
  {
    module: 'Policy & Configuration',
    pages: [
      { path: 'policy/company-policies', label: 'Company Policies', icon: FileText, component: CompanyPolicies },
      { path: 'policy/leave-attendance', label: 'Leave & Attendance', icon: FileText, component: LeaveAttendance },
      { path: 'policy/performance-cycles', label: 'Performance Cycles', icon: FileText, component: PerformanceCycles },
    ],
  },
  {
    module: 'Communication',
    pages: [
      { path: 'communication/system-announcements', label: 'System Announcements', icon: Zap, component: SystemAnnouncements },
      { path: 'communication/email-sms-settings', label: 'Email/SMS Settings', icon: Zap, component: EmailSMSSettings },
      { path: 'communication/chat-moderation', label: 'Chat Moderation', icon: Zap, component: ChatModeration },
    ],
  },
  {
    module: 'Compliance & Security',
    pages: [
      { path: 'compliance/document-management', label: 'Document Management', icon: Shield, component: DocumentManagement },
      { path: 'compliance/data-backup-recovery', label: 'Data Backup & Recovery', icon: Shield, component: DataBackupRecovery },
      { path: 'compliance/compliance-tracking', label: 'Compliance Tracking', icon: Shield, component: ComplianceTracking },
    ],
  },
  {
    module: 'Integration & Automation',
    pages: [
      { path: 'integration/third-party', label: 'Third-Party Integrations', icon: Layers, component: ThirdPartyIntegrations },
      { path: 'integration/automated-workflows', label: 'Automated Workflows', icon: Layers, component: AutomatedWorkflows },
      { path: 'integration/api-management', label: 'API Management', icon: Layers, component: APIManagement },
    ],
  },
  {
    module: 'Customization',
    pages: [
      { path: 'customization/theme-brand', label: 'Theme & Brand', icon: Settings, component: ThemeBrand },
      { path: 'customization/dashboard-personalization', label: 'Dashboard Personalization', icon: Settings, component: DashboardPersonalization },
      { path: 'customization/notification-templates', label: 'Notification Templates', icon: Settings, component: NotificationTemplates },
    ],
  },
  {
    module: 'HR Management',
    pages: [
      { path: 'hr/payroll', label: 'Payroll Management', icon: Users, component: PayrollManagement },
      { path: 'hr/recruitment', label: 'Recruitment Management', icon: Users, component: RecruitmentManagement },
      { path: 'hr/training', label: 'Training & Development', icon: Users, component: TrainingDevelopment },
      { path: 'hr/benefits', label: 'Benefits & Compensation', icon: Users, component: BenefitsCompensation },
      { path: 'hr/engagement', label: 'Employee Engagement', icon: Users, component: EmployeeEngagement },
      { path: 'hr/goals', label: 'Goal Tracking', icon: Users, component: GoalTracking },
      { path: 'hr/risk', label: 'Risk Management', icon: Shield, component: RiskManagement },
      { path: 'hr/recognition', label: 'Employee Recognition', icon: Users, component: EmployeeRecognition },
    ],
  },
];

// Flattened routes for easier routing
export const flatAdminRoutes = adminRoutes.flatMap((mod) => mod.pages);
