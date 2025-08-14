import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Dashboard = () => {
  

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>
        
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
