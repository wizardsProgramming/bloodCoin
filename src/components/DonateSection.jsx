import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DonateSection = ({ updateNextDonation }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    updateNextDonation(newDate.toLocaleDateString()); // Update parent component
  };

  return (
    <Box sx={{ textAlign: "center", backgroundColor: "#222", padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h6" color="secondary">Schedule Your Next Donation</Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <Button {...params} variant="contained" color="primary">Pick a Date</Button>}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DonateSection;
