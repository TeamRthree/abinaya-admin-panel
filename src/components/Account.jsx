import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Adjust path if needed

const Account = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleLogout = async () => {
    try {
      await api.axios.post("/admin/logout"); // Sanctum logout
    } catch (error) {
      console.error("Logout failed (probably token expired):", error.message);
    } finally {
      localStorage.removeItem("adminToken");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center gap-4">
      {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Account;
