import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelRightClose,
} from 'lucide-react';
import { adminRoutes } from '../pages/admin/adminRoutes';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapsedModules, setCollapsedModules] = useState({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // --- Fetch logged-in user info ---
  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.role !== 'ADMIN') {
            localStorage.removeItem('token');
            navigate('/');
            return;
          }
          setCurrentUser(userData);
        } else {
          if (response.status === 401 || response.status === 404) {
            localStorage.removeItem('token');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    setCurrentUser(null);
    setShowLogoutModal(false);
    navigate('/');
  };

  const toggleModule = (module) => {
    if (isSidebarCollapsed) return;
    setCollapsedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const isModuleActive = (pages) => {
    return pages.some((p) => {
      const fullPath = p.path === '' ? '/admin' : `/admin/${p.path}`;
      return (
        location.pathname === fullPath ||
        (p.path !== '' && location.pathname.startsWith(fullPath))
      );
    });
  };

  const userName = loadingUser ? 'Loading...' : currentUser?.name || 'Admin';
  const userEmail = loadingUser ? '...' : currentUser?.email || 'N/A';
  const userEmployeeId = loadingUser ? '...' : currentUser?.employeeId || 'No ID';
  const userInitials = loadingUser
    ? '?'
    : (currentUser?.name?.split(' ').map((n) => n[0]).join('') || 'A').toUpperCase();

  return (
    <div className="flex h-screen bg-[#11131A] text-white">
      {/* ===== Sidebar ===== */}
      <aside
        className={`flex flex-col bg-[#1B1E2B] border-r border-gray-800 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div
          className={`p-6 border-b border-gray-800 flex items-center ${
            isSidebarCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!isSidebarCollapsed && (
            <h1 className="text-2xl font-bold text-indigo-400 tracking-wide truncate">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-indigo-400 transition-colors"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* ===== Sidebar Navigation ===== */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 custom-scrollbar"
        >
          {adminRoutes.map(({ module, pages }) => {
            const isModuleCollapsed = collapsedModules[module];
            const active = isModuleActive(pages);
            const FirstIcon = pages[0]?.icon;

            return (
              <div key={module}>
                <button
                  onClick={() => toggleModule(module)}
                  className={`flex items-center justify-between w-full text-sm font-bold mb-3 transition ${
                    isSidebarCollapsed ? 'justify-center cursor-default h-10' : 'cursor-pointer'
                  } ${active ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
                  disabled={isSidebarCollapsed}
                >
                  {isSidebarCollapsed && FirstIcon ? <FirstIcon size={20} /> : null}
                  {!isSidebarCollapsed && (
                    <span className="uppercase tracking-wider truncate">{module}</span>
                  )}
                  {!isSidebarCollapsed &&
                    (isModuleCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />)}
                </button>

                {(!isModuleCollapsed || isSidebarCollapsed) && (
                  <div className={`flex flex-col space-y-1 ${isSidebarCollapsed ? '' : 'ml-3'}`}>
                    {pages.map(({ path, label, icon: Icon }) => {
                      const to = path === '' ? '/admin' : `/admin/${path}`;
                      return (
                        <NavLink
                          key={path}
                          to={to}
                          end={path === ''}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                              isSidebarCollapsed ? 'justify-center h-10 w-10 mx-auto' : ''
                            } ${
                              isActive
                                ? 'bg-indigo-600 text-white font-medium shadow-lg'
                                : 'text-gray-300 hover:bg-[#2A2D3D] hover:text-white'
                            }`
                          }
                        >
                          <Icon size={isSidebarCollapsed ? 20 : 18} />
                          {!isSidebarCollapsed && <span className="truncate">{label}</span>}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== Sidebar Footer ===== */}
        <div
          className={`p-4 border-t border-gray-800 flex items-center ${
            isSidebarCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 text-gray-400 overflow-hidden">
              <div className="w-8 h-8 rounded-full border border-gray-600 bg-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">ID: {userEmployeeId}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-gray-400 hover:text-indigo-400 transition flex-shrink-0"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ===== Header with Email + ID ===== */}
        <header className="bg-[#1B1E2B] border-b border-gray-800 p-4 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">Admin Dashboard</h2>
            <p className="text-sm text-gray-400">
              Welcome, <span className="text-white font-medium">{userName}</span> —{' '}
              <span className="text-indigo-400">{userEmail}</span> |{' '}
              <span className="text-gray-500">ID: {userEmployeeId}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gray-600 bg-indigo-600 flex items-center justify-center text-sm font-bold">
              {userInitials}
            </div>
          </div>
        </header>

        {/* ===== Page Content ===== */}
        <div className="flex-1 overflow-y-auto bg-[#11131A] p-6">
          <Outlet context={{ currentUser }} />
        </div>
      </main>

      {/* ===== Logout Modal ===== */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E2132] rounded-xl shadow-xl border border-gray-700 w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition"
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
