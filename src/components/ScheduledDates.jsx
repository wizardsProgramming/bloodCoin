import React, { useState } from "react";
import { Button, Box, Typography, TextField, Modal, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Delete } from "@mui/icons-material";

const ScheduledDates = ({ open, handleClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleAddAppointment = () => {
    if (!selectedDate) {
      setError("Please select a date for the appointment.");
      return;
    }
    const newAppointment = { id: Date.now(), date: selectedDate, description };
    setAppointments([...appointments, newAppointment]);
    setSelectedDate(null);
    setDescription("");
    setError("");
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleRescheduleAppointment = (id, newDate, newDescription) => {
    // Update the appointments by filtering out the old appointment and adding the new one
    setAppointments((prevAppointments) => {
      // Remove the old appointment
      const updatedAppointments = prevAppointments.filter((appointment) => appointment.id !== id);
  
      // Add the new rescheduled appointment
      const newAppointment = { id: Date.now(), date: newDate, description: newDescription };
      return [...updatedAppointments, newAppointment];
    });
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "#1A1A1A",
          color: "#C0C0C0",
          borderRadius: "12px",
          padding: { xs: "20px", sm: "30px" },
          boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)",
          maxWidth: 500,
          margin: "auto",
          marginTop: "150px",
          textAlign: "center",
          overflowY: "auto", // Enable scrolling if content overflows
          maxHeight: "80vh", // Limit the modal height
        }}
      >
        <Typography variant="h4" sx={{ color: "#D1001C", fontWeight: "bold" }}>
          Scheduled Dates
        </Typography>

        <Box mt={3}>
          <DatePicker
            label="Select Appointment Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <TextField
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#1A1A1A",
          }}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#D1001C",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#A80018",
            },
            marginTop: 2,
            padding: { xs: "8px 12px", sm: "10px 20px" },
          }}
          onClick={handleAddAppointment}
        >
          Add Appointment
        </Button>

        <Box
          mt={3}
          sx={{
            maxHeight: "300px", // Limit the height of the appointments section
            overflowY: "auto", // Enable scrolling if content overflows
            paddingRight: "8px", // Add padding to the right to prevent scrollbar clipping
          }}
        >
          <Typography variant="h6" sx={{ color: "#C0C0C0" }}>
            Your Appointments
          </Typography>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Box
                key={appointment.id}
                sx={{
                  backgroundColor: "#1A1A1A",
                  color: "#C0C0C0",
                  borderRadius: "12px",
                  padding: { xs: "12px", sm: "15px" },
                  marginTop: "10px",
                  boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.4)",
                }}
              >
                <Typography variant="body1">
                  {appointment.date.toLocaleString()}
                </Typography>
                <Typography variant="body2">{appointment.description || "No description"}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "#D1001C",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#A80018",
                      },
                    }}
                    onClick={() =>
                      handleRescheduleAppointment(appointment.id, selectedDate, description)
                    }
                  >
                    Reschedule
                  </Button>
                  <IconButton
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    sx={{ color: "#D1001C" }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No appointments scheduled.</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ScheduledDates;
