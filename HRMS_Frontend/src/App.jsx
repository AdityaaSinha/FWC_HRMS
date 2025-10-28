import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoleLoginPage from "./pages/RoleLoginPage";
import { CurrencyProvider } from './contexts/CurrencyContext';

// Admin
import AdminLayout from './layouts/AdminLayout';
import { flatAdminRoutes } from './pages/admin/adminRoutes';

// HR
// --- REMOVED flatHRRoutes ---
import { hrRoutes } from './pages/hr/hrRoutes'; // <-- Import the NESTED routes
import HRLayout from './layouts/HRLayout';

// Manager
import ManagerLayout from './layouts/ManagerLayout';
import { flatManagerRoutes } from './pages/manager/managerRoutes';

// Employee
import EmployeeLayout from './layouts/EmployeeLayout';
import { flatEmployeeRoutes } from './pages/employee/employeeRoutes';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // check token
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

//
// --- ADD THIS HELPER FUNCTION ---
//
// This function correctly builds the nested <Route> elements
// from your nested hrRoutes array.
function buildRoutes(routes) {
  return routes.flatMap((mod) =>
    mod.pages.map((page) => (
      <Route
        key={page.path}
        path={page.path}
        element={<page.component />}
      >
        {/* If the page has children, render them as nested Routes! */}
        {page.children && page.children.map(child => (
          <Route
            key={child.path || 'index'} // Use 'index' as key if it's an index route
            index={child.index}         // This makes it the default child
            path={child.path}
            element={<child.component />}
          />
        ))}
      </Route>
    ))
  );
}
// --- END OF HELPER FUNCTION ---


export default function App() {
  return (
    <CurrencyProvider>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login/:role" element={<RoleLoginPage />} />

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

          {/* --- HR ROUTES (THIS IS THE FIX) --- */}
          <Route
            path="/hr/*"
            element={
              <HRLayout />
            }
          >
            {/* We now call buildRoutes instead of mapping flatHRRoutes */}
            {buildRoutes(hrRoutes)}
          </Route>
          {/* --- END OF HR ROUTES FIX --- */}

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
    </CurrencyProvider>
  );
}