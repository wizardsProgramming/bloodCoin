import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";  // Register/Login page
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle the case when logged in
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/profile");  // Redirect to ProfilePage
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        {/* Main route renders ProfilePage if logged in, otherwise HomePage */}
        <Route
          path="/"
          element={isLoggedIn ? <ProfilePage setIsLoggedIn={setIsLoggedIn} /> : <HomePage handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/login" element={<LoginPage handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/profile" element={<ProfilePage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
