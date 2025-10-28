import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, X, ChevronDown } from 'lucide-react';
import { employeeRoutes } from '../pages/employee/employeeRoutes';

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapsedModules, setCollapsedModules] = useState({});

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    navigate('/');
  };

  const toggleModule = (module) => {
    setCollapsedModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const isModuleActive = (pages) => {
    return pages.some((p) =>
      p.path === '' ? location.pathname === '/employee' : location.pathname.includes(`/employee/${p.path}`)
    );
  };

  return (
    <div className="flex h-screen bg-[#11131A] text-white">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col bg-[#1B1E2B] border-r border-gray-800 shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-indigo-400 tracking-wide">Employee Portal</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#2A2D3D] scrollbar-track-[#1B1E2B]">
          {employeeRoutes.map(({ module, pages }) => {
            const isCollapsed = collapsedModules[module];
            const active = isModuleActive(pages);

            return (
              <div key={module}>
                {/* Module header */}
                <button
                  onClick={() => toggleModule(module)}
                  className={`flex items-center justify-between w-full text-sm font-semibold uppercase tracking-wide mb-2 p-2 rounded-lg transition
                    ${active ? 'bg-indigo-600/20 text-indigo-400' : 'text-gray-400 hover:bg-[#2A2D3D] hover:text-gray-200'}`}
                >
                  <span>{module}</span>
                  <span
                    className={`transform transition-transform ${
                      isCollapsed ? 'rotate-0' : 'rotate-180'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {/* Pages */}
                {!isCollapsed && (
                  <div className="flex flex-col space-y-1 ml-4">
                    {pages.map(({ path, label, icon: Icon }) => {
                      const to = path === '' ? '/employee' : `/employee/${path}`;
                      return (
                        <NavLink
                          key={path}
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
                            ${
                              isActive
                                ? 'bg-indigo-600 text-white font-medium'
                                : 'text-gray-400 hover:bg-[#2A2D3D] hover:text-gray-200'
                            }`
                          }
                        >
                          <Icon size={18} /> <span>{label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400">
            <img
              src="https://i.pravatar.cc/32"
              alt="Employee"
              className="w-8 h-8 rounded-full border border-gray-700"
            />
            <span className="text-sm font-medium">Employee</span>
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

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1B1E2B] border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
          <h2 className="text-lg font-semibold text-gray-200">Employee Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome back!</span>
            <img
              src="https://i.pravatar.cc/35"
              alt="Employee Avatar"
              className="w-8 h-8 rounded-full border border-gray-700"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#11131A] p-6">
          <Outlet />
        </div>
      </main>

      {/* Logout modal */}
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
