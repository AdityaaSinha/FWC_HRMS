import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building, Briefcase, CheckCircle } from 'lucide-react';

// Import Child Components used in this dashboard
import DepartmentOverviewCard from '../../components/admin/DeparmentOverviewCard'
import QuickActionsCard from '../../components/admin/QuickActionsCard';
// --- Ensure this component exists and is imported ---
import TinyLineChartCard from '../../components/admin/TinyLineChartCard';
// ---

// StatCard component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#1E2132] flex items-center gap-4 rounded-lg px-6 py-5 border border-gray-800 hover:bg-[#25293D] transition">
     <div className={`p-3 rounded-full bg-gray-700 text-${color}-400`}>{icon}</div>
     <div>
       <div className="text-sm text-gray-400">{title}</div>
       <div className="text-2xl font-semibold text-white">{value ?? '...'}</div>
     </div>
   </div>
);

// Main Dashboard Component
export default function AdminDashboardHome() {
  // State for all dynamic data points
  const [stats, setStats] = useState({});
  const [departments, setDepartments] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  // --- State for chart data ---
  const [dailyActivity, setDailyActivity] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  // ---

  // Loading states
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingDepts, setIsLoadingDepts] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  // --- Loading states for charts ---
  const [isLoadingDaily, setIsLoadingDaily] = useState(true);
  const [isLoadingWeekly, setIsLoadingWeekly] = useState(true);
  // ---

  const [error, setError] = useState(null);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      // Reset states
      setIsLoadingStats(true);
      setIsLoadingDepts(true);
      setIsLoadingEmployees(true);
      // --- Reset chart loading states ---
      setIsLoadingDaily(true);
      setIsLoadingWeekly(true);
      // ---
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found. Please log in.');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Define fetch promises (including activity endpoints)
        const fetchPromises = [
          fetch('http://localhost:3001/api/admin/dashboard-stats', { headers }),
          fetch('http://localhost:3001/api/admin/department-overview', { headers }),
          fetch('http://localhost:3001/api/admin/recent-employees', { headers }),
          // --- Fetch activity data ---
          fetch('http://localhost:3001/api/admin/activity/daily', { headers }),
          fetch('http://localhost:3001/api/admin/activity/weekly', { headers })
          // ---
        ];

        const results = await Promise.allSettled(fetchPromises);
        const [statsRes, deptsRes, employeesRes, dailyRes, weeklyRes] = results; // Destructure results

        // Process Stats
        if (statsRes.status === 'fulfilled' && statsRes.value.ok) setStats(await statsRes.value.json());
        else { console.error("Stats fetch failed:", statsRes.reason || statsRes.value?.statusText); setError(prev => prev ? `${prev}, Stats` : 'Stats'); }
        setIsLoadingStats(false);

        // Process Departments
        if (deptsRes.status === 'fulfilled' && deptsRes.value.ok) setDepartments(await deptsRes.value.json());
        else { console.error("Depts fetch failed:", deptsRes.reason || deptsRes.value?.statusText); setError(prev => prev ? `${prev}, Depts` : 'Depts'); }
        setIsLoadingDepts(false);

        // Process Employees
        if (employeesRes.status === 'fulfilled' && employeesRes.value.ok) setRecentEmployees(await employeesRes.value.json());
        else { console.error("Employees fetch failed:", employeesRes.reason || employeesRes.value?.statusText); setError(prev => prev ? `${prev}, Employees` : 'Employees'); }
        setIsLoadingEmployees(false);

        // --- Process Daily Activity ---
        if (dailyRes.status === 'fulfilled' && dailyRes.value.ok) setDailyActivity(await dailyRes.value.json());
        else { console.error("Daily activity fetch failed:", dailyRes.reason || dailyRes.value?.statusText); setError(prev => prev ? `${prev}, Daily Activity` : 'Daily Activity'); }
        setIsLoadingDaily(false);
        // ---

        // --- Process Weekly Activity ---
        if (weeklyRes.status === 'fulfilled' && weeklyRes.value.ok) setWeeklyActivity(await weeklyRes.value.json());
        else { console.error("Weekly activity fetch failed:", weeklyRes.reason || weeklyRes.value?.statusText); setError(prev => prev ? `${prev}, Weekly Activity` : 'Weekly Activity'); }
        setIsLoadingWeekly(false);
        // ---

      } catch (err) {
        console.error("Dashboard fetch setup error:", err);
        setError(err.message);
        // Ensure all loading states are false
        setIsLoadingStats(false); setIsLoadingDepts(false); setIsLoadingEmployees(false);
        setIsLoadingDaily(false); setIsLoadingWeekly(false);
      }
    };

    fetchData();
  }, []);

  // Error display
  if (error) {
     return <div className="p-6 text-red-400">Error loading parts of the dashboard ({error}). Please check console or try again.</div>;
  }

  // --- JSX Structure ---
  return (
    <div className="p-6 space-y-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Company Overview</h1>
        <p className="text-gray-400 text-sm">A quick snapshot of your organization’s status</p>
      </div>

      {/* Top Row (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={stats.totalEmployees} icon={<Users size={22} />} color="indigo" />
        <StatCard title="Open Job Roles" value={stats.openJobRoles} icon={<Briefcase size={22} />} color="yellow" />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={<CheckCircle size={22} />} color="blue" />
        <StatCard title="Departments" value={stats.departmentCount} icon={<Building size={22} />} color="green" />
      </div>

      {/* --- Middle Row (Depts + CHARTS ADDED HERE) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Overview */}
        <DepartmentOverviewCard departments={departments} isLoading={isLoadingDepts} />

        {/* Login Activity Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TinyLineChartCard
              title="Logins (Last 24 Hours)"
              data={dailyActivity}
              dataKey="logins" // Key in data objects holding the count
              isLoading={isLoadingDaily}
              color="#a78bfa" // Purple
            />
            <TinyLineChartCard
              title="Logins (Last 7 Days)"
              data={weeklyActivity}
              dataKey="logins" // Key in data objects holding the count
              isLoading={isLoadingWeekly}
              color="#f472b6" // Pink
            />
        </div>
      </div>
      {/* --- END Middle Row --- */}


      {/* Third Row (Actions + Recent Employees) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <QuickActionsCard />

        {/* Recent Employees Table */}
        <div className="lg:col-span-2 bg-[#1E2132] rounded-lg border border-gray-800 overflow-hidden flex flex-col">
          <div className="bg-[#272B3F] p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
            <h2 className="text-lg font-semibold">Recent Employees</h2>
            <Link to="/admin/employees" className="text-sm text-indigo-400 hover:text-indigo-300">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            {(isLoadingEmployees && recentEmployees.length === 0) ? (
              <div className="p-4 text-center text-gray-400 h-full flex items-center justify-center">Loading...</div>
            ) : (!isLoadingEmployees && recentEmployees.length === 0) ? (
              <div className="p-4 text-center text-gray-400 h-full flex items-center justify-center">No recent employees found.</div>
            ) : (
                <table className="w-full text-left min-w-[600px]">
                  {/* ... table thead ... */}
                  <thead className="bg-[#272B3F]">
                     <tr>
                       <th className="p-4 text-xs font-semibold uppercase text-gray-400 sticky top-0 bg-[#272B3F]">Name</th>
                       <th className="p-4 text-xs font-semibold uppercase text-gray-400 sticky top-0 bg-[#272B3F]">Email</th>
                       <th className="p-4 text-xs font-semibold uppercase text-gray-400 sticky top-0 bg-[#272B3F]">Role</th>
                       <th className="p-4 text-xs font-semibold uppercase text-gray-400 sticky top-0 bg-[#272B3F]">Department</th>
                     </tr>
                  </thead>
                  {/* ... table tbody ... */}
                  <tbody className="divide-y divide-[#2A2D3D]">
                    {recentEmployees.map(user => (
                      <tr key={user.id} className="hover:bg-[#2A2D3D]/60 transition-colors">
                        <td className="p-4 font-medium text-white">{user.name}</td>
                        <td className="p-4 text-sm text-gray-300">{user.email}</td>
                        <td className="p-4 text-sm text-gray-300 capitalize">{user.role.toLowerCase()}</td>
                        <td className="p-4 text-sm text-gray-300">{user.department || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}