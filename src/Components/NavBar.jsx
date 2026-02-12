import React, { useState } from "react";
import { Search, CookingPot, User, Heart, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ handleSearch, user }) => {
  const [input, setInput] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (input.trim()) {
      handleSearch(input.trim());
      navigate(`search/${input}`);
      setInput("");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-blue-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to={"/"}
              className="flex items-center text-2xl font-black text-white hover:text-pink-400 transition duration-300 tracking-widest"
            >
              <CookingPot className="w-7 h-7 mr-2 text-yellow-400 fill-yellow-400" />
              <span className="text-blue-400">Pro</span>Chef
            </Link>

            <form
              onSubmit={searchHandler}
              className="flex-1 max-w-lg mx-4 hidden sm:flex"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search dishes, ingredients, or cuisine..."
                className="w-full px-5 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-600/50 transition placeholder-gray-500 shadow-inner shadow-black/50"
              />
              <button
                type="submit"
                className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-2.5 rounded-r-full hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-lg shadow-blue-800/50 hover:shadow-xl hover:shadow-blue-800/50"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition border border-gray-700"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium hidden md:block">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden animate-slide-down">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">Saved Recipes</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default NavBar;
