import React, { useState } from "react";
import {
  CookingPot,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Apple,
} from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login - in production, this would call your authentication API
    const user = {
      name: formData.name || formData.email.split("@")[0],
      email: formData.email,
    };
    onLogin(user);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-blue-950 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4">
            <CookingPot
              className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-bounce"
              style={{ animationDuration: "2s" }}
            />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="text-blue-400">Pro</span>Chef
          </h1>
          <p className="text-gray-400 text-sm">
            Your culinary adventure starts here
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/50 p-8 transform transition-all duration-500 hover:shadow-blue-900/50">
          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-8 bg-gray-800/50 p-1 rounded-full">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-full font-semibold transition-all duration-300 ${
                !isSignUp
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-full font-semibold transition-all duration-300 ${
                isSignUp
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="animate-slide-down">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-700 bg-gray-800"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/50 hover:shadow-blue-600/70 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                onLogin({ name: "Google User", email: "user@gmail.com" })
              }
              className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
            >
              <Chrome className="w-5 h-5" />
              <span className="font-medium">Google</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onLogin({ name: "Apple User", email: "user@icloud.com" })
              }
              className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300"
            >
              <Apple className="w-5 h-5" />
              <span className="font-medium">Apple</span>
            </button>
          </div>

          {/* Guest Mode */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() =>
                onLogin({ name: "Guest", email: "guest@prochef.com" })
              }
              className="text-gray-400 hover:text-white transition text-sm underline"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
