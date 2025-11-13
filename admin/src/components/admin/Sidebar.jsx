import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { GrArticle } from "react-icons/gr";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Helper to detect active link
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between max-h-screen">
      {/* Top Section */}
      <div>
        <div className="text-2xl font-semibold p-6 border-b">Admin Panel</div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="editors"
            className={`flex items-center gap-2 p-2 rounded font-medium transition ${
              isActive("editors")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiUsers /> Editors
          </Link>

          <Link
            to="articles"
            className={`flex items-center gap-2 p-2 rounded font-medium transition ${
              isActive("articles")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <GrArticle /> Uploaded Articles
          </Link>

          <Link
            to="publisedArticle"
            className={`flex items-center gap-2 p-2 rounded font-medium transition ${
              isActive("publisedArticle")
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaBookOpen /> Published Articles
          </Link>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          <FiLogOut className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
