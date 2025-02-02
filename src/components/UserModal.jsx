import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const UserModal = ({ open, handleClose, user, handleLogout, appointments, setAppointments }) => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [nextDonation, setNextDonation] = useState(user?.nextDonation || "Not scheduled");
  const [numDonations, setNumDonations] = useState(user?.numDonations || 0);
  const [earnings, setEarnings] = useState(user?.earnings || 0);

  const handleSaveChanges = () => {
    const updatedUser = {
      username,
      email,
      nextDonation,
      numDonations,
      earnings,
      appointments,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save changes to localStorage
    setEditMode(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        {!editMode ? (
          <Box>
            <Typography variant="h6">Username: {username}</Typography>
            <Typography variant="h6">Email: {email}</Typography>
            <Typography variant="h6">Next Donation: {nextDonation}</Typography>
            <Typography variant="h6">Number of Donations: {numDonations}</Typography>
            <Typography variant="h6">Earnings: {earnings} Blood Coin</Typography>
          </Box>
        ) : (
          <Box>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Next Donation Date"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nextDonation !== "Not scheduled" ? nextDonation : ""}
              onChange={(e) => setNextDonation(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Number of Donations"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={numDonations}
              onChange={(e) => setNumDonations(parseInt(e.target.value))}
            />
            <TextField
              label="Earnings (Blood Coin)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={earnings}
              onChange={(e) => setEarnings(parseFloat(e.target.value))}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)} color="primary">
              Edit Profile
            </Button>
            <Button onClick={handleLogout} color="secondary">
              Log Out
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
