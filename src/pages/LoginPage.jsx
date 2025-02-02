import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import Header from "../components/Header"; // Import the Header component

const LoginPage = ({ handleLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.username !== username || user.password !== password) {
      setError("Invalid credentials");
      return;
    }
    handleLoginSuccess();  // Trigger login success
    navigate("/profile"); // Redirect to profile page after login
  };

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
        bannerText="Welcome Back to the Blood Donation Community"
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
        <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
          Login
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
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#D1001C", // Crimson Button
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#A80018", // Darker crimson hover
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
