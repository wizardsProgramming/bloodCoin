import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ bannerText, headerImage }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed", // Keep header fixed at the top
        top: 0, // Ensure it's at the very top
        left: 0,
        height: "200px", // Adjust the height of the banner
        backgroundImage: `url(${headerImage})`, // Background image for the header
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: 1000, // Ensure it's above other content
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Optional shadow effect
      }}
    >
      <Typography
        variant="h5"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background for text readability
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        {bannerText || "Welcome to the Blood Token Platform!"}
      </Typography>
    </Box>
  );
};

export default Header;
