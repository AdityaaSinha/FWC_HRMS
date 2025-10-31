# 🎨 Frontend Documentation - FWC HRMS

## Overview

The FWC HRMS frontend is built with React 19.1.1 and Vite 7.1.11, providing a modern, responsive, and performant user interface. The application follows component-based architecture with role-based access control and real-time data updates.

## Technology Stack

- **React 19.1.1** - UI library with modern hooks
- **Vite 7.1.11** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Papa Parse** - CSV parsing
- **Framer Motion** - Animation library

## Project Structure

```
HRMS_Frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # Favicon
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/       # Generic components
│   │   ├── forms/        # Form components
│   │   └── charts/       # Chart components
│   ├── pages/            # Route-based pages
│   │   ├── admin/        # Admin pages
│   │   ├── hr/           # HR pages
│   │   ├── manager/      # Manager pages
│   │   └── employee/     # Employee pages
│   ├── services/         # API services
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind configuration
```

## Component Architecture

### Component Hierarchy

```
App
├── AuthProvider
├── ThemeProvider
├── Router
│   ├── PublicRoutes
│   │   ├── Login
│   │   ├── Register
│   │   └── ForgotPassword
│   └── ProtectedRoutes
│       ├── AdminRoutes
│       │   ├── AdminDashboard
│       │   ├── UserManagement
│       │   └── SystemSettings
│       ├── HRRoutes
│       │   ├── HRDashboard
│       │   ├── EmployeeManagement
│       │   └── RecruitmentManagement
│       ├── ManagerRoutes
│       │   ├── ManagerDashboard
│       │   ├── TeamManagement
│       │   └── PerformanceAnalytics
│       └── EmployeeRoutes
│           ├── EmployeeDashboard
│           ├── LeaveManagement
│           └── ProfileManagement
```

### Core Components

#### 1. Layout Components

**Sidebar Component**
```jsx
// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  
  const getMenuItems = () => {
    switch (user.roleId) {
      case 1: return adminMenuItems;
      case 2: return hrMenuItems;
      case 3: return managerMenuItems;
      case 4: return employeeMenuItems;
      default: return [];
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg">
      <nav className="mt-8">
        {getMenuItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
```

**Header Component**
```jsx
// src/components/common/Header.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          FWC HRMS
        </h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          
          <div className="flex items-center space-x-2">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </span>
          </div>
          
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
```

#### 2. Form Components

**Input Component**
```jsx
// src/components/forms/Input.jsx
import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
```

**Button Component**
```jsx
// src/components/forms/Button.jsx
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
```

#### 3. Chart Components

**Performance Chart**
```jsx
// src/components/charts/PerformanceChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

## Routing System

### Route Configuration

```jsx
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import pages
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import HRDashboard from './pages/hr/HRDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={[1]}>
                <AdminRoutes />
              </ProtectedRoute>
            } />
            
            <Route path="/hr/*" element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <HRRoutes />
              </ProtectedRoute>
            } />
            
            <Route path="/manager/*" element={
              <ProtectedRoute allowedRoles={[1, 2, 3]}>
                <ManagerRoutes />
              </ProtectedRoute>
            } />
            
            <Route path="/employee/*" element={
              <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
                <EmployeeRoutes />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Protected Route Component

```jsx
// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.roleId)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```

## State Management

### Context Providers

#### Authentication Context

```jsx
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Theme Context

```jsx
// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Custom Hooks

#### useApi Hook

```jsx
// src/hooks/useApi.jsx
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
```

#### useForm Hook

```jsx
// src/hooks/useForm.jsx
import { useState } from 'react';

export const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = values[field];
      
      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = `${field} is required`;
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`;
      } else if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field] = 'Invalid email format';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset
  };
};
```

## Services Layer

### API Service

```jsx
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

### Auth Service

```jsx
// src/services/authService.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
```

## Styling Guidelines

### Tailwind CSS Configuration

```js
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Component Styling Patterns

```jsx
// Consistent spacing and colors
const cardClasses = "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6";
const buttonPrimary = "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors";
const inputClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
```

## Performance Optimization

### Code Splitting

```jsx
// Lazy loading for route components
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const HRDashboard = lazy(() => import('./pages/hr/HRDashboard'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

### Memoization

```jsx
// Memoize expensive components
import React, { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data, filters }) => {
  const processedData = useMemo(() => {
    return data.filter(item => 
      filters.every(filter => filter.test(item))
    );
  }, [data, filters]);

  return <div>{/* Render processed data */}</div>;
});
```

## Testing Guidelines

### Component Testing

```jsx
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../forms/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## Build and Deployment

### Build Configuration

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
```

### Environment Variables

```env
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=FWC HRMS
VITE_APP_VERSION=1.0.0

# .env.production
VITE_API_URL=https://api.fwc-hrms.com/api
VITE_APP_NAME=FWC HRMS
VITE_APP_VERSION=1.0.0
```

## Development Guidelines

### Code Standards
- Use TypeScript for type safety (optional but recommended)
- Follow ESLint and Prettier configurations
- Use meaningful component and variable names
- Write comprehensive JSDoc comments
- Implement proper error boundaries
- Use consistent file naming conventions

### Best Practices
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper loading and error states
- Use React.memo for performance optimization
- Follow accessibility guidelines (WCAG)
- Implement proper form validation
- Use semantic HTML elements