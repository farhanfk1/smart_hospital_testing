const { test } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const OPDPage = require("../pages/opdPage");

const loginData = require("../test-data/loginData");
const opdData = require("../test-data/opdData");

const allowUsers = loginData.filter((user) =>
  ["Super Admin", "Admin", "Doctor", "Receptionist"].includes(user.role),
);

allowUsers.forEach((user) => {
  test(`Add OPD Patient as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const opd = new OPDPage(page);

    await login.open();
    await login.selectRole(user.role);
    await login.login();
    
    await opd.openAddPatient();

    await opd.selectPatient(opdData.patient);

    await opd.selectAppointmentDate(opdData.appointmentDate);

    await opd.selectConsultant(opdData.consultantIndex);

    await opd.selectChargeCategory(opdData.chargeCategoryIndex);

    await opd.selectCharge(opdData.chargeIndex);

    await opd.clickSave();

    await opd.verifyOPDPage();
  });
});
