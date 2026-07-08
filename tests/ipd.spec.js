const { test } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const IPDPage = require("../pages/ipdPage");

const loginData = require("../test-data/loginData");
const ipdData = require("../test-data/ipdData");

const allowUsers = loginData.filter((user) =>
  ["Super Admin", "Admin", "Doctor", "Receptionist"].includes(user.role),
);

allowUsers.forEach((user) => {
  test.only(`Add IPD Patient as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const ipd = new IPDPage(page);

    // Login
    await login.open();
    await login.selectRole(user.role);
    await login.login();

    // Open IPD
    await ipd.openAddPatient();

    // Patient
    await ipd.selectPatient(ipdData.patientName);

    // Admission Date
    await ipd.selectAdmissionDate();

    // Consultant Doctor
    await ipd.selectConsultant(ipdData.consultantIndex);

    // Bed Group and no
    await ipd.selectBedGroupAndBedNo();

    // Save
    await ipd.clickSave();

    // Verify user returned to IPD page
    await ipd.verifyIPDPage();
  });
});
