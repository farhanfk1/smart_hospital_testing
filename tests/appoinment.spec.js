const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const AppointmentPage = require("../pages/appointmentPage");

const loginData = require("../test-data/loginData");
const appointmentData = require("../test-data/appoinmentData");

// Users who can add appointments
const allowedUsers = loginData.filter((user) =>
  ["Super Admin", "Admin", "Doctor", "Accountant", "Receptionist"].includes(
    user.role,
  ),
);
allowedUsers.forEach((user) => {
  test(`Add appoinment as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const appointment = new AppointmentPage(page);

    // Login
    await login.open();
    await login.selectRole(user.role);
    await login.login();

    // Wait for dashboard
    await page.waitForLoadState("networkidle");

    // Open Add Appointment form
    await appointment.openAddAppointment();

    // Fill Appointment Form
    await appointment.addAppointment(appointmentData);

    // Verify modal closes after successful save
    await expect(appointment.appointmentModal).toBeHidden();

    // Verify user remains on Appointment page
    await expect(page).toHaveURL(/admin\/appointment\/index/);
  })

});

