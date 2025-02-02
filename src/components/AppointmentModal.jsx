const AppointmentModal = ({ open, handleClose, updateNextDonation }) => {
    const [appointmentDate, setAppointmentDate] = useState("");
  
    const handleReschedule = () => {
      if (appointmentDate) {
        updateNextDonation(appointmentDate); // Pass the selected date back to the parent
        handleClose();
      } else {
        alert("Please select a date.");
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Appointment Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)} // Set the date here
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleReschedule} color="primary">
            Reschedule Appointment
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  