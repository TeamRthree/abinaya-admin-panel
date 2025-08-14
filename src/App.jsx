import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Welcome from "./pages/Welcome"; // 👈 Import
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import YouTubeVideos from "./pages/YouTubeVideos";
import InstagramVideos from "./pages/InstagramVideos";
import Testimonials from "./pages/Testimonials";
import Gallery from "./pages/Gallery";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login"];

  return (
    <div className="flex">
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/login" element={<Login />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/youtube-videos"
    element={
      <ProtectedRoute>
        <YouTubeVideos />
      </ProtectedRoute>
    }
  />
  <Route
    path="/instagram-videos"
    element={
      <ProtectedRoute>
        <InstagramVideos />
      </ProtectedRoute>
    }
  />
  <Route
    path="/testimonials"
    element={
      <ProtectedRoute>
        <Testimonials />
      </ProtectedRoute>
    }
  />
  <Route
    path="/gallery"
    element={
      <ProtectedRoute>
        <Gallery />
      </ProtectedRoute>
    }
  />
</Routes>

      </div>
    </div>
  );
};

export default App;
