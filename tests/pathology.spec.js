const { test } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const PathologyPage = require("../pages/pathologyPage");

const loginData = require("../test-data/loginData");
const pathologyData = require("../test-data/pathologyData");

const allowUsers = loginData.filter((user) =>
  ["Super Admin", "Admin", ].includes(user.role),
);

allowUsers.forEach((user) => {
  test(`Generate Pathology Bill - ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const pathology = new PathologyPage(page);

    // Login
    await login.open();
    await login.selectRole(user.role);
    await login.login();

    // Open Pathology
    await pathology.openPathology();

    // Open Generate Bill Form
    await pathology.openGenerateBill();

    // Select Patient
    await pathology.selectPatient(pathologyData.patientLetters);

    // Select Test
    await pathology.selectTest();

    // Save Bill
    await pathology.saveBill();
  });
});
