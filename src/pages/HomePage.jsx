import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";
import Header from "../components/Header"; // Import the Header component

const HomePage = ({ handleLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ username, password }));
    setError(""); // Clear any previous errors
    navigate("/login");  // Redirect to login page after successful registration
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/register"); // Redirect to register page after logout
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <Box
      sx={{
        backgroundColor: "#0D0D0D", // Dark background for the page
        minHeight: "100vh", // Ensure the page fills the entire viewport height
        paddingTop: "200px", // Make room for the fixed header
      }}
    >
      {/* Header with banner image */}
      <Header
        bannerText="Join the Blood Donation Community"
        headerImage="./images/bloodCoinIMG.jpg" // Replace with your banner image URL
      />

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#1A1A1A", // Slightly lighter black for contrast
          color: "#C0C0C0", // Silver text color
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)", // Crimson glow
          textAlign: "center", // Center text inside
          marginTop: "40px", // Space from the header
        }}
      >
        {!isLoggedIn ? (
          <>
            {/* Register section */}
            <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
              Register
            </Typography>

            <Box mt={2}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#1A1A1A",
                  color: "#C0C0C0",
                  border: "1px solid #333",
                  borderRadius: "5px",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#1A1A1A",
                  color: "#C0C0C0",
                  border: "1px solid #333",
                  borderRadius: "5px",
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#1A1A1A",
                  color: "#C0C0C0",
                  border: "1px solid #333",
                  borderRadius: "5px",
                }}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleRegister}
                sx={{
                  backgroundColor: "#D1001C", // Crimson Button
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#A80018", // Darker crimson hover
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </>
        ) : (
          <>
            {/* Profile section */}
            <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
              Welcome, {JSON.parse(localStorage.getItem("user")).username}
            </Typography>
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#D1001C", // Crimson Button
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#A80018", // Darker crimson hover
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
