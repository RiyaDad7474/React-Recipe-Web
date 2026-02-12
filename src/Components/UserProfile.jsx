import React, { useState } from "react";
import {
  User,
  Heart,
  BookMarked,
  Settings,
  LogOut,
  Camera,
  Award,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = ({ user, onLogout, savedRecipes = [] }) => {
  const [activeTab, setActiveTab] = useState("saved");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Guest User",
    bio: "Passionate home chef exploring flavors from around the world",
    favoritesCuisine: "Italian",
    skillLevel: "Intermediate",
  });

  // Mock stats
  const stats = {
    recipesCooked: 47,
    savedRecipes: savedRecipes.length || 12,
    followers: 234,
    following: 189,
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 right-4">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium hover:bg-white/20 transition">
                <Camera className="w-4 h-4 inline mr-1" />
                Change Cover
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {profileData.name}
                  </h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={onLogout}
                  className="px-6 py-2 bg-red-600/20 text-red-400 rounded-full font-medium hover:bg-red-600/30 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 mb-6 max-w-2xl">{profileData.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <p className="text-2xl font-bold text-white">
                    {stats.recipesCooked}
                  </p>
                </div>
                <p className="text-sm text-gray-400">Recipes Cooked</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <p className="text-2xl font-bold text-white">
                    {stats.savedRecipes}
                  </p>
                </div>
                <p className="text-sm text-gray-400">Saved Recipes</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-green-400" />
                  <p className="text-2xl font-bold text-white">
                    {stats.followers}
                  </p>
                </div>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <p className="text-2xl font-bold text-white">
                    {stats.following}
                  </p>
                </div>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-600/30">
                🏆 Top Chef
              </span>
              <span className="px-4 py-1.5 bg-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-600/30">
                🌱 Health Conscious
              </span>
              <span className="px-4 py-1.5 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium border border-purple-600/30">
                ⚡ Quick Meals Expert
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-900/50 p-1 rounded-full border border-gray-800">
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "saved"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Saved Recipes
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "collections"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BookMarked className="w-4 h-4 inline mr-2" />
            Collections
          </button>
        </div>

        {/* Content */}
        {activeTab === "saved" && (
          <div>
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedRecipes.map((meal, index) => (
                  <Link to={`/recipe/${meal.idMeal}`} key={index}>
                    <div className="relative bg-gray-900 rounded-xl shadow-xl shadow-black/50 overflow-hidden group transform transition duration-500 cursor-pointer border border-gray-800 hover:shadow-blue-600/50">
                      {/* Hover glow*/}
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/80 transition duration-500"></div>
                      <div className="flex justify-center items-center p-5">
                        <img
                          src={meal?.strMealThumb}
                          alt={meal?.strMeal}
                          className="h-60 w-60 rounded-xl border border-yellow-400 transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="text-xl pb-3 font-bold text-gray-100 mb-1 group-hover:text-blue-400 transition duration-300">
                          {meal.strMeal}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-900/50 rounded-3xl border border-gray-800">
                <Heart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  No saved recipes yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start exploring and save your favorite recipes!
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                >
                  Browse Recipes
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "collections" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample collections */}
            {[
              "Quick Weeknight Dinners",
              "Healthy Meal Prep",
              "Italian Favorites",
            ].map((collection, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-600/50 transition cursor-pointer group"
              >
                <div className="h-40 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <BookMarked className="w-12 h-12 text-gray-700 group-hover:text-blue-500 transition" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {collection}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {Math.floor(Math.random() * 10) + 3} recipes
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
