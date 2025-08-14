import { Link, useLocation } from "react-router-dom";
import Account from "./Account"; // adjust path if needed

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/youtube-videos", label: "YouTube Videos" },
    { path: "/instagram-videos", label: "Instagram Videos" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-3">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`block px-4 py-2 rounded transition ${
                    location.pathname === link.path
                      ? "bg-pink-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Account (Login/Logout) */}
      <div className="mt-6">
        <Account />
      </div>
    </aside>
  );
};

export default Sidebar;
