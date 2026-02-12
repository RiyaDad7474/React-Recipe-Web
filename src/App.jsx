import React, { useCallback, useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import RecipeDetailView from "./Components/RecipeDetailView";
import SearchView from "./Components/SearchView";
import CuisineBar from "./Components/Cuisine";
import HomeView from "./Components/HomeView";
import LoginPage from "./Components/LoginPage";
import UserProfile from "./Components/UserProfile";
import RecipeChatbot from "./Components/RecipeChatbot";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("prochef_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const saved = localStorage.getItem("prochef_saved_recipes");
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("prochef_user", JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("prochef_user");
  };

  // Save recipe
  const saveRecipe = (meal) => {
    const isAlreadySaved = savedRecipes.some(
      (recipe) => recipe.idMeal === meal.idMeal,
    );

    let updatedSaved;
    if (isAlreadySaved) {
      // Remove from saved
      updatedSaved = savedRecipes.filter(
        (recipe) => recipe.idMeal !== meal.idMeal,
      );
    } else {
      // Add to saved
      updatedSaved = [...savedRecipes, meal];
    }

    setSavedRecipes(updatedSaved);
    localStorage.setItem("prochef_saved_recipes", JSON.stringify(updatedSaved));
  };

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // filter by category
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe],
  );

  // filter by area
  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe],
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // If user is not logged in, show login page
  if (!user) {
    return (
      <Router>
        <LoginPage onLogin={handleLogin} />
      </Router>
    );
  }

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
          <NavBar handleSearch={handleSearch} user={user} />
          <CuisineBar filterByArea={filterByArea} />
          <Routes>
            <Route
              path="/"
              element={<HomeView filterByCategory={filterByCategory} />}
            />
            <Route
              path="/recipe/:id"
              element={
                <RecipeDetailView
                  savedRecipes={savedRecipes}
                  onSaveRecipe={saveRecipe}
                />
              }
            />
            <Route
              path="/search/:query"
              element={
                <SearchView meals={searchResult} loading={searchLoading} />
              }
            />
            <Route
              path="/profile"
              element={
                <UserProfile
                  user={user}
                  onLogout={handleLogout}
                  savedRecipes={savedRecipes}
                />
              }
            />
          </Routes>

          {/* Chatbot - available on all pages */}
          <RecipeChatbot />
        </div>
      </Router>
    </>
  );
};

export default App;
