import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, X, ChevronDown, ChevronRight } from 'lucide-react';
import { adminRoutes } from '../pages/admin/adminRoutes';

export default function AdminLayout() {
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
      p.path === '' ? location.pathname === '/admin' : location.pathname.includes(`/admin/${p.path}`)
    );
  };

  return (
    <div className="flex h-screen bg-[#11131A] text-white">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col bg-[#1B1E2B] border-r border-gray-800">
        {/* Top Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">Admin Panel</h1>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-[#1B1E2B]">
          {adminRoutes.map(({ module, pages }) => {
            const isCollapsed = collapsedModules[module];
            const active = isModuleActive(pages);

            return (
              <div key={module}>
                {/* Module Label */}
                <button
                  onClick={() => toggleModule(module)}
                  className={`flex items-center justify-between w-full text-sm font-bold mb-3 transition 
                    ${active ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <span className="uppercase tracking-wider">{module}</span>
                  {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                </button>

                {/* Module Pages */}
                {!isCollapsed && (
                  <div className="flex flex-col space-y-1 ml-3">
                    {pages.map(({ path, label, icon: Icon }) => {
                      const to = path === '' ? '/admin' : `/admin/${path}`;
                      return (
                        <NavLink
                          key={path}
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-xl transition 
                             ${isActive ? 'bg-indigo-600 text-white font-medium' : 'text-gray-300 hover:bg-[#2A2D3D] hover:text-white'}`
                          }
                        >
                          <Icon size={18} /> <span className="truncate">{label}</span>
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
              alt="Admin"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <span className="text-sm font-medium">Admin</span>
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
        <header className="bg-[#1B1E2B] border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-200">Admin Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome, Admin</span>
            <img
              src="https://i.pravatar.cc/35"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
          </div>
        </header>

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
              <button onClick={() => setShowLogoutModal(false)} className="text-gray-400 hover:text-gray-200">
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
