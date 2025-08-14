import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api"; // Update path if needed

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        await api.axios.get("/admin/auth-check");
        setIsValid(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
