const today = new Date();

const currentHour = today.getHours();

let shift;
let slot;

// After 12 PM appointment date = tomorrow
if (currentHour >= 12) {
  today.setDate(today.getDate() + 1);

  shift = "Evening";
  slot = "04:00 PM - 07:00 PM";
} else {
  shift = "Morning";
  slot = "10:00 AM - 12:30 PM";
}

const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();

module.exports = {
  patient: "Olivier Thomas",
  doctor: "Amit Singh (9009)",
  shift,
  slot,
  appointmentDate: `${day}/${month}/${year}`,
  status: "Approved",
};
