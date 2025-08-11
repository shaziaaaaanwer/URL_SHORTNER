import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice"; // adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: "/" });
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide hover:text-blue-600 transition-colors"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
{/*                 {user?.name && (
                  <span className="hidden sm:inline text-gray-600 text-sm">
                    Hi, <span className="font-semibold">{user.name}</span>
                  </span>
                )} */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
