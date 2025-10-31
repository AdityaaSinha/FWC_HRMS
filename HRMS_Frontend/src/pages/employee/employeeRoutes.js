import { Home, Calendar, MessageCircle, User, Clock, DollarSign, Bell, Users, Megaphone, FileText, BookOpen, Target, CheckSquare, HelpCircle, CalendarDays, TrendingUp, History } from 'lucide-react';
import EmployeeDashboardHome from './EmployeeDashboardHome';
import EmployeeLeaveApply from './EmployeeLeaveApply';
import EmployeeLeaveHistory from './EmployeeLeaveHistory';
import EmployeeChatbot from './EmployeeChatbot';
import EmployeeProfile from './EmployeeProfile';
import EmployeeAttendance from './EmployeeAttendance';
import EmployeePayroll from './EmployeePayroll';
import EmployeeNotifications from './EmployeeNotifications';
import EmployeeDirectory from './EmployeeDirectory';
import EmployeeAnnouncements from './EmployeeAnnouncements';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeTraining from './EmployeeTraining';
import EmployeePerformance from './EmployeePerformance';
import EmployeeTasks from './EmployeeTasks';
import EmployeeHelpDesk from './EmployeeHelpDesk';
import EmployeeEvents from './EmployeeEvents';
import EmployeeESOPs from './EmployeeESOPs';

export const employeeRoutes = [
  {
    module: 'Main',
    pages: [
      { path: '', label: 'Dashboard', icon: Home, component: EmployeeDashboardHome },
      { path: 'profile', label: 'My Profile', icon: User, component: EmployeeProfile },
      { path: 'notifications', label: 'Notifications', icon: Bell, component: EmployeeNotifications },
      { path: 'directory', label: 'Employee Directory', icon: Users, component: EmployeeDirectory },
    ],
  },
  {
    module: 'Leave & Attendance',
    pages: [
      { path: 'leave-apply', label: 'Apply for Leave', icon: Calendar, component: EmployeeLeaveApply },
      { path: 'leave-history', label: 'Leave History', icon: History, component: EmployeeLeaveHistory },
      { path: 'attendance', label: 'Attendance', icon: Clock, component: EmployeeAttendance },
    ],
  },
  {
    module: 'Payroll & Benefits',
    pages: [
      { path: 'payroll', label: 'Payroll', icon: DollarSign, component: EmployeePayroll },
      { path: 'esops', label: 'ESOPs', icon: TrendingUp, component: EmployeeESOPs },
    ],
  },
  {
    module: 'Communication',
    pages: [
      { path: 'chatbot', label: 'AI Chatbot', icon: MessageCircle, component: EmployeeChatbot },
      { path: 'announcements', label: 'Company Announcements', icon: Megaphone, component: EmployeeAnnouncements },
    ],
  },
  {
    module: 'Resources',
    pages: [
      { path: 'documents', label: 'Document Library', icon: FileText, component: EmployeeDocuments },
      { path: 'training', label: 'Training & Development', icon: BookOpen, component: EmployeeTraining },
      { path: 'performance', label: 'Performance Management', icon: Target, component: EmployeePerformance },
      { path: 'tasks', label: 'Task Management', icon: CheckSquare, component: EmployeeTasks },
      { path: 'events', label: 'Event Management', icon: CalendarDays, component: EmployeeEvents },
      { path: 'help-desk', label: 'Help Desk', icon: HelpCircle, component: EmployeeHelpDesk },
    ],
  }
];

export const flatEmployeeRoutes = employeeRoutes.flatMap(({ pages }) => pages);
