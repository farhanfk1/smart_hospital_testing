const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const PatientPage = require("../pages/patientPage");

const loginData = require("../test-data/loginData");
const patientData = require("../test-data/patientData");

const allowUsers = loginData.filter(user => 
   ["Super Admin", "Admin", "Doctor","Receptionist"].includes(user.role)
       );

allowUsers.forEach((user) => {
  test(`Add New Patient as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const patient = new PatientPage(page);

    await login.open();
    await login.selectRole(user.role);
    await login.login();

    await page.waitForLoadState("networkidle");

    await patient.openAddPatient();
    await patient.addPatient(patientData);

    await expect(patient.patientModal).toBeHidden();
  });
});

