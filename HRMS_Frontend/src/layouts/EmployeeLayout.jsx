import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, X, ChevronDown } from 'lucide-react';
import { employeeRoutes } from '../pages/employee/employeeRoutes';
import Avatar from '../components/common/Avatar';
import { generateSmartPravavatarUrl } from '../utils/pravavatarUtils';
import { UserProvider } from '../contexts/UserContext';

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapsedModules, setCollapsedModules] = useState({});
  
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      let token = localStorage.getItem('token');
      
      // Demo auto-login for Employee Directory
      if (!token) {
        try {
          // Auto-login with a demo employee account
          const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'john.doe@company.com', password: '12' })
          });
          
          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            token = loginData.token;
            localStorage.setItem('token', token);
            localStorage.setItem('role', loginData.user.role);
            localStorage.setItem('userName', loginData.user.name);
          } else {
            navigate('/');
            return;
          }
        } catch (error) {
          console.error('Demo auto-login failed:', error);
          navigate('/');
          return;
        }
      }

      try {
        const response = await fetch('http://localhost:3001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.role !== 'EMPLOYEE') {
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
    setCollapsedModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const isModuleActive = (pages) => {
    return pages.some((p) =>
      p.path === '' ? location.pathname === '/employee' : location.pathname.includes(`/employee/${p.path}`)
    );
  };

  return (
    <div className="flex h-screen bg-[#11131A] text-white">
      {/* Loading state */}
      {loadingUser ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading user data...</p>
          </div>
        </div>
      ) : !currentUser ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center">
            <p className="text-gray-400">Unable to load user data</p>
          </div>
        </div>
      ) : (
        <>
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
            <Avatar
              user={currentUser}
              name={currentUser.name}
              size={32}
              className="border border-gray-700"
            />
            <span className="text-sm font-medium">{currentUser.name}</span>
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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-sm text-gray-400">Welcome back, {currentUser.name}!</span>
              <div className="text-xs text-indigo-400 font-medium">ID: {currentUser.employeeId}</div>
            </div>
            <img
              src={generateSmartPravavatarUrl(currentUser, 32)}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-gray-700"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#11131A] p-6">
          <UserProvider user={currentUser} loading={loadingUser} error={null}>
            <Outlet />
          </UserProvider>
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
        </>
      )}
    </div>
  );
}
