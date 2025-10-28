import React from 'react';
import { Users, Building, Briefcase, CheckCircle, Activity, Bell } from 'lucide-react';
import { MOCK_USERS } from '../../mocks/MOCK_USERS';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#1E2132] flex items-center gap-4 rounded-lg px-6 py-5 border border-gray-800 hover:bg-[#25293D] transition">
    <div className={`p-3 rounded-full bg-gray-700 text-${color}-400`}>
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  </div>
);

export default function AdminDashboardHome() {
  const users = MOCK_USERS;
  const totalEmployees = users.length;
  const departments = ['HR', 'Engineering', 'Finance', 'Operations'];
  const openJobRoles = 3;
  const pendingApprovals = 5;
  const activeUsersToday = 28;
  const activeUsersWeek = 134;

  return (
    <div className="p-6 space-y-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Company Overview</h1>
        <p className="text-gray-400 text-sm">A quick snapshot of your organization’s status</p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users size={22} />}
          color="indigo"
        />
        <StatCard
          title="Departments"
          value={departments.length}
          icon={<Building size={22} />}
          color="green"
        />
        <StatCard
          title="Open Job Roles"
          value={openJobRoles}
          icon={<Briefcase size={22} />}
          color="yellow"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals}
          icon={<CheckCircle size={22} />}
          color="blue"
        />
        <StatCard
          title="Active Today"
          value={activeUsersToday}
          icon={<Activity size={22} />}
          color="purple"
        />
        <StatCard
          title="Active This Week"
          value={activeUsersWeek}
          icon={<Activity size={22} />}
          color="pink"
        />
      </div>

      {/* Notifications & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Notifications */}
        <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} className="text-yellow-400" /> System Notifications
          </h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>Policy Update: New remote work policy effective from next month.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>Alert: 2 employee contracts are due for renewal this week.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>Reminder: Annual compliance training deadline is October 30.</span>
            </li>
          </ul>
        </div>

        {/* AI / Analytics Insights */}
        <div className="bg-[#1E2132] p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">AI-Powered Insights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Employee Turnover Prediction: 
              <span className="font-medium text-white"> 7.8% risk in Q4</span>
            </li>
            <li>
              Productivity Index: 
              <span className="font-medium text-white"> Stable (92%)</span>
            </li>
            <li>
              Departmental Engagement: 
              <span className="font-medium text-white"> Engineering highest (96%)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-[#1E2132] rounded-lg border border-gray-800 overflow-hidden">
        <div className="bg-[#272B3F] p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Employees</h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#272B3F]">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase text-gray-400">Name</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-400">Email</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-400">Role</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-400">Department</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2D3D]">
            {users.slice(0, 5).map(user => (
              <tr key={user.id} className="hover:bg-[#2A2D3D]/60 transition-colors">
                <td className="p-4 font-medium text-white">{user.name}</td>
                <td className="p-4 text-sm text-gray-300">{user.email}</td>
                <td className="p-4 text-sm text-gray-300">{user.role}</td>
                <td className="p-4 text-sm text-gray-300">{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
