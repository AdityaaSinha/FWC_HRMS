import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { MOCK_LOGIN } from "../mocks/MOCK_LOGIN"; // --- REMOVED ---
import { motion } from "framer-motion";

export default function RoleLoginPage() {
  const { role } = useParams(); // e.g., 'hr', 'admin'
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // --- UPDATED LOGIN HANDLER ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If status code is 4xx or 5xx, throw error message from backend
        throw new Error(data.error || 'Login failed');
      }

      // Login successful on backend, now check the role
      const actualRole = data.user.role; // e.g., 'HR', 'ADMIN'
      const expectedRole = role.toUpperCase(); // Convert 'hr' to 'HR'

      if (actualRole !== expectedRole) {
        // Correct password, but wrong portal
        throw new Error(`Login successful, but this portal is only for ${role.toUpperCase()} users.`);
      }

      // Role matches! Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", actualRole); // Store the actual role
      localStorage.setItem("userName", data.user.name); // Optional: store name

      // Navigate to the correct dashboard based on the role
      // Make sure these paths match your App.jsx router setup
      switch (actualRole) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'HR':
          navigate('/hr');
          break;
        case 'MANAGER':
          navigate('/manager');
          break;
        case 'EMPLOYEE':
          navigate('/employee');
          break;
        default:
          navigate('/'); // Fallback to role selection
      }

    } catch (err) {
      console.error("Login Error:", err); // Log the full error object
      setError(err.message); // Display error from backend or role check
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0D18] to-[#141A2A] text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1A1D2D]/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/10"
      >
        <h1 className="text-3xl font-bold mb-3 text-center">
          Welcome back,{" "}
          <span className="capitalize text-indigo-400">{role}</span> 👋
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Please sign in to access your dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Disable input while loading
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Disable input while loading
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50"
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-semibold transition-all shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isLoading}
            className="w-full text-sm text-gray-400 hover:text-gray-200 transition mt-3 disabled:opacity-50"
          >
            ← Back to Role Selection
          </button>
        </form>
      </motion.div>
    </div>
  );
}