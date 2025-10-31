import React, { useState, useEffect, useMemo } from 'react';
// --- Import Drag-and-Drop and Animation Libraries ---
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';

// --- Import Mocks (Now only used as fallback if API fails) ---
import { MOCK_HR } from '../../mocks/MOCK_HR_DATA';
import { MOCK_CANDIDATES } from '../../mocks/MOCK_CANDIDATES';

// --- Import ALL Your Components ---
import Card from '../../components/Card';
import HRProfileCard from '../../components/hr/HRProfileCard';
import EmploymentSummaryCard from '../../components/hr/EmploymentSummaryCard';
import PayrollOverview from '../../components/hr/PayrollOverview';
import LeaveOverview from '../../components/hr/LeaveOverview';
import UpcomingEvents from '../../components/hr/UpcomingEvents';
import HolidayList from '../../components/hr/HolidayList';
import PerformanceOverview from '../../components/hr/PerformanceOverview';
import NotificationsPanel from '../../components/hr/NotificationsPanel';
import QuickActions from '../../components/hr/QuickActions';
import StatCard from '../../components/StatCard';
import AIGeneratorWidget from '../../widgets/AIGeneratorWidget';
import AIResumeScreenerWidget from '../../widgets/AIResumeScreenerWidget';
import HRCandidatesDashboard from './HRCandidatesDashboard';

// --- Reusable Sortable Card Wrapper (Unchanged) ---
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
};

function SortableCard({ children, id, index, className = '', showHandle = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.2s ease',
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={`relative ${className}`}
    >
      {children}
      {showHandle && (
        <button
          {...attributes}
          {...listeners}
          className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Drag to reorder"
        >
          <MoreVertical size={20} />
        </button>
      )}
    </motion.div>
  );
}

// --- Static Data Preparation (Unchanged) ---
const recentCandidates = MOCK_CANDIDATES.slice(0, 4);

// --- Define the INITIAL order of cards ---
const initialCardOrder = [
  'profile',
  'stat-jobs',
  'stat-candidates',
  'stat-time',
  'ai-jd',
  'ai-screen',
  'recent-candidates',
  'employment',
  'payroll',
  'leave',
  'performance',
  'events',
  'holidays',
  'notifications',
  'actions',
];

// --- The Main Dashboard Component ---
export default function HRDashboardHome() {

  const [stats, setStats] = useState({
    activeJobs: 0,
    newCandidates: 0,
    avgTimeToHire: '0 days',
  });

  // --- UPDATED: Initialize hrUser to null ---
  // This forces the component to show a loading state until data arrives
  const [hrUser, setHrUser] = useState(null);

  const [cardOrder, setCardOrder] = useState(initialCardOrder);

  useEffect(() => {
    // 1. Fetch Dashboard Statistics
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No auth token found for dashboard stats');
          // Fallback to mock data if no token
          setStats({
            totalEmployees: 150,
            activeEmployees: 142,
            newHiresThisMonth: 8,
            departmentCount: 12,
            pendingOnboarding: 3,
            employeeRetention: '94%'
          });
          return;
        }

        const response = await fetch('http://localhost:3001/api/dashboard-stats/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // Fallback to mock data if API fails
        setStats({
          totalEmployees: 150,
          activeEmployees: 142,
          newHiresThisMonth: 8,
          departmentCount: 12,
          pendingOnboarding: 3,
          employeeRetention: '94%'
        });
      }
    };

    // 2. Fetch Logged-in User's Profile
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No auth token found, using mock data.');
          setHrUser(MOCK_HR); // Fallback to mock if no token
          return; // Stop execution
        }

        const response = await fetch('http://localhost:3001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
           // Log detailed error from backend if available
           const errorBody = await response.text();
           console.error(`Failed to fetch user profile: ${response.status} - ${errorBody}`);
           setHrUser(MOCK_HR); // Fallback to mock on API error
           return; // Stop execution
        }

        const dynamicUserData = await response.json();
        console.log("Fetched User Data:", dynamicUserData); // <-- DEBUGGING

        // Merge dynamic data with mock data for fields not in the API yet
        setHrUser(prev => ({
          ...MOCK_HR, // Start with all mock fields (salary, leave, etc.)
          ...dynamicUserData, // Overwrite with real data (name, email, id, etc.)
        }));

      } catch (error) {
        console.error("Error in fetchMe:", error);
        setHrUser(MOCK_HR); // Fallback to mock on any other error
      }
    };

    fetchStats();
    fetchMe();
  }, []);

  // --- UPDATED: useMemo handles null hrUser ---
  // If hrUser is null (loading), we pass MOCK_HR to components temporarily
  const currentHRData = hrUser || MOCK_HR;
  const cardMap = useMemo(() => ({
    'profile': { component: <HRProfileCard hr={currentHRData} />, className: 'lg:col-span-6', noHandle: true },
    'stat-jobs': { component: <StatCard title="Active Jobs" value={stats.activeJobs} icon="Briefcase" color="indigo" />, className: 'lg:col-span-2' },
    'stat-candidates': { component: <StatCard title="New Candidates" value={stats.newCandidates} icon="Users" color="green" />, className: 'lg:col-span-2' },
    'stat-time': { component: <StatCard title="Avg. Time to Hire" value={stats.avgTimeToHire} icon="FileText" color="yellow" />, className: 'lg:col-span-2' },
    'ai-jd': { component: <AIGeneratorWidget />, className: 'lg:col-span-3' },
    'ai-screen': { component: <AIResumeScreenerWidget />, className: 'lg:col-span-3' },
    'recent-candidates': { component: <Card title="Recent Candidates"><HRCandidatesDashboard candidates={recentCandidates} /></Card>, className: 'lg:col-span-6' },
    'employment': { component: <EmploymentSummaryCard hr={currentHRData} />, className: 'lg:col-span-3' },
    // Make sure these components also handle potentially missing mock data if needed
    'payroll': { component: <PayrollOverview salary={currentHRData.salary} />, className: 'lg:col-span-3' },
    'leave': { component: <LeaveOverview leave={currentHRData.leave} />, className: 'lg:col-span-3' },
    'performance': { component: <PerformanceOverview performance={currentHRData.performance} />, className: 'lg:col-span-3' },
    'events': { component: <UpcomingEvents events={currentHRData.upcomingEvents} />, className: 'lg:col-span-3' },
    'holidays': { component: <HolidayList holidays={currentHRData.holidays} />, className: 'lg:col-span-3' },
    'notifications': { component: <NotificationsPanel notifications={currentHRData.notifications} />, className: 'lg:col-span-3' },
    'actions': { component: <QuickActions />, className: 'lg:col-span-3' },
  }), [stats, currentHRData]); // Depend on the potentially mock data

  // --- DND Sensor setup (Unchanged) ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // --- DND handleDragEnd (Unchanged) ---
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCardOrder((items) => {
        const oldIndex = items.findIndex((id) => id === active.id);
        const newIndex = items.findIndex((id) => id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // --- Main Render (Unchanged) ---
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={cardOrder} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">

          {cardOrder.map((id, index) => {
            const cardConfig = cardMap[id];
            if (!cardConfig) return null;

            return (
              <SortableCard
                key={id}
                id={id}
                index={index}
                className={cardConfig.className}
                showHandle={!cardConfig.noHandle && id !== 'profile'}
              >
                {cardConfig.component}
              </SortableCard>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}