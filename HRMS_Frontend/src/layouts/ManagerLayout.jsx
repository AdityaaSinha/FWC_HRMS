import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart2,
  FolderKanban,
  FileText,
  MessageSquare,
  Archive,
  Brain,
  LogOut,
  X,
} from 'lucide-react';

export default function ManagerLayout() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#11131A] text-white">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between bg-[#1B1E2B] border-r border-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2D3D] scrollbar-track-[#1B1E2B]">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-indigo-400 tracking-wide">
              Manager Panel
            </h1>
          </div>

          {/* Nav */}
          <nav className="flex flex-col p-4 space-y-3">
            <NavLink
              to="/manager"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>

            <NavLink
              to="/manager/team-overview"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <Users size={18} /> Team Overview
            </NavLink>

            <NavLink
              to="/manager/performance-analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <BarChart2 size={18} /> Performance Analytics
            </NavLink>

            <NavLink
              to="/manager/project-management"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <FolderKanban size={18} /> Project Management
            </NavLink>

            <NavLink
              to="/manager/reporting-tools"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <FileText size={18} /> Reporting Tools
            </NavLink>

            <NavLink
              to="/manager/communication-hub"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <MessageSquare size={18} /> Communication Hub
            </NavLink>

            <NavLink
              to="/manager/document-management"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <Archive size={18} /> Document Management
            </NavLink>

            <NavLink
              to="/manager/predictive-analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <Brain size={18} /> Predictive Analytics
            </NavLink>

            <NavLink
              to="/manager/leave-requests"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-[#2A2D3D]'
                }`
              }
            >
              <ClipboardList size={18} /> Leave Requests
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400">
            <img
              src="https://i.pravatar.cc/32"
              alt="Manager"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <span className="text-sm font-medium">Manager</span>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-gray-400 hover:text-indigo-400 transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-[#1B1E2B] border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-200">Manager Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome, Manager</span>
            <img
              src="https://i.pravatar.cc/35"
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#11131A] p-6">
          <Outlet />
        </div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E2132] rounded-xl shadow-xl border border-gray-700 w-80 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to logout? You’ll be redirected to the login page.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
