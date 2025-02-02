import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Typography } from "@mui/material";
import UserModal from "../components/UserModal"; // Ensure UserModal is correctly imported
import ScheduledDates from "../components/ScheduledDates"; // Import ScheduledDates modal
import Header from "../components/Header"; // Import the Header component

const ProfilePage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
    email: "N/A",
    numDonations: 0,
    earnings: 0,
    nextDonation: "Not scheduled", // Make sure the user has a nextDonation field
  };

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]); // Handle appointments separately

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  const handleEditProfileClick = () => {
    setProfileModalOpen(true);
    setAppointmentModalOpen(false); // Close appointment modal if it's open
  };

  const handleAddAppointmentClick = () => {
    setAppointmentModalOpen(true);
    setProfileModalOpen(false); // Close profile modal if it's open
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh", // Allow full height
        paddingTop: "200px",
        backgroundColor: "#0D0D0D",
        overflowY: "auto", // Enable vertical scrolling when content exceeds the height
      }}
    >
      <Header headerImage="./images/bloodCoinIMG.jpg" />

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#1A1A1A",
          color: "#C0C0C0",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#D1001C", fontWeight: "bold" }}>
          Welcome, {storedUser.username}
        </Typography>

        <Box mt={3} textAlign="center">
          <Typography variant="h6">Number of Donations: {storedUser.numDonations}</Typography>
          <Typography variant="h6">Earnings: {storedUser.earnings} Blood Coin</Typography>
          <Typography variant="h6">Next Donation: {storedUser.nextDonation}</Typography>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D1001C",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#A80018",
              },
            }}
            onClick={handleEditProfileClick} // Open profile modal and close appointment modal
          >
            Edit Profile
          </Button>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
            onClick={handleAddAppointmentClick} // Open appointment modal and close profile modal
          >
            Add Appointment
          </Button>
        </Box>

        {/* Profile Modal */}
        <UserModal
          open={profileModalOpen}
          handleClose={() => setProfileModalOpen(false)}
          user={storedUser}
          handleLogout={handleLogout}
          appointments={appointments} // Pass appointments to the modal
          setAppointments={setAppointments} // Allow updates to appointments
        />

        {/* Appointment Modal */}
        <ScheduledDates
          open={appointmentModalOpen}
          handleClose={() => setAppointmentModalOpen(false)}
          appointments={appointments}
          setAppointments={setAppointments}
        />
      </Container>
    </Box>
  );
};

export default ProfilePage;
