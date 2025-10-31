import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoleLoginPage from "./pages/RoleLoginPage";
import { CurrencyProvider } from './contexts/CurrencyContext';
import { ToastProvider } from './contexts/ToastContext';

// Admin
import AdminLayout from './layouts/AdminLayout';
import { flatAdminRoutes } from './pages/admin/adminRoutes';

// HR
// --- REMOVED flatHRRoutes ---
import { hrRoutes } from './pages/hr/hrRoutes'; // <-- Import the NESTED routes
import HRLayout from './layouts/HRLayout';
import TestJobsDashboard from './pages/hr/TestJobsDashboard'; // TEMPORARY FOR TESTING
import TestAuth from './pages/TestAuth';
import SimpleTest from './pages/SimpleTest';

// Manager
import ManagerLayout from './layouts/ManagerLayout';
import { flatManagerRoutes } from './pages/manager/managerRoutes';

// Employee
import EmployeeLayout from './layouts/EmployeeLayout';
import { flatEmployeeRoutes } from './pages/employee/employeeRoutes';

// Public Components
import PublicEmployeeDirectory from './pages/PublicEmployeeDirectory';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // check token
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

// This function correctly builds the nested <Route> elements
// from your nested hrRoutes array.
function buildRoutes(routes) {
  return routes.flatMap((mod) => {
    return mod.pages.map((page) => {
      // If the page has children, create a parent route with nested routes
      if (page.children && page.children.length > 0) {
        return (
          <Route
            key={page.path}
            path={page.path}
            element={<page.component />}
          >
            {page.children.map(child => {
              return (
                <Route
                  key={child.path || 'index'} // Use 'index' as key if it's an index route
                  index={child.index}         // This makes it the default child
                  path={child.path}
                  element={<child.component />}
                />
              );
            })}
          </Route>
        );
      } else {
        // If the page has no children, create a simple route
        return (
          <Route
            key={page.path}
            path={page.path}
            element={<page.component />}
          />
        );
      }
    });
  });
}
// --- END OF HELPER FUNCTION ---


export default function App() {
  return (
    <CurrencyProvider>
      <ToastProvider>
        <Router>
        <Routes>
          {/* Login */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login/:role" element={<RoleLoginPage />} />

          {/* Public Employee Directory */}
          <Route path="/directory" element={<PublicEmployeeDirectory />} />

          {/* Admin Routes (Unchanged) */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout />
            }
          >
            {flatAdminRoutes.map(({ path, component: Component }) =>
              path === '' ? (
                <Route index element={<Component />} key="admin-index" />
              ) : (
                <Route path={path} element={<Component />} key={path} />
              )
            )}
          </Route>

          {/* TEMPORARY: Test route to verify routing works */}
          <Route path="/test" element={<div>TEST ROUTE WORKS!</div>} />
          <Route path="/testauth" element={<TestAuth />} />
          <Route path="/simple" element={<SimpleTest />} />
          
          {/* --- HR ROUTES --- */}
          <Route
            path="/hr/*"
            element={
              <HRLayout />
            }
          >
            {/* Enable the proper HR routes */}
            {buildRoutes(hrRoutes)}
          </Route>
          {/* --- END OF HR ROUTES --- */}

          {/* Manager Routes (Unchanged) */}
          <Route
            path="/manager/*"
            element={
              <ManagerLayout />
            }
          >
            {flatManagerRoutes.map(({ path, component: Component }) =>
              path === '' ? (
                <Route index element={<Component />} key="manager-index" />
              ) : (
                <Route path={path} element={<Component />} key={path} />
              )
            )}
          </Route>

          {/* Employee Routes (Unchanged) */}
          <Route
            path="/employee/*"
            element={
              <EmployeeLayout />
            }
          >
            {flatEmployeeRoutes.map(({ path, component: Component }) =>
              path === '' ? (
                <Route index element={<Component />} key="employee-index" />
              ) : (
                <Route path={path} element={<Component />} key={path} />
              )
            )}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Router>
      </ToastProvider>
    </CurrencyProvider>
  );
}