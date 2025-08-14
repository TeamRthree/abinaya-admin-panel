import React, { useState } from "react";
import api from "../api/api"; // Update path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.axios.post("/admin/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        // Store token
        localStorage.setItem("adminToken", res.data.token);

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setError(res.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm relative"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        {error && (
          <div className="absolute -top-14 w-full left-1/2 transform -translate-x-1/2 text-sm bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded shadow">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
