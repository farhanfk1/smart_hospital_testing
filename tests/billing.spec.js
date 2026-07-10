const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/loginpage");
const BillingPage = require("../pages/billingpage");
const loginData = require("../test-data/loginData");

loginData.forEach((user) => {
  test(`Search Billing by Case ID ${user.role}`, async ({ page }) => {
    // Skip Nurse because Billing is not available
    test.skip(
      user.role === "Nurse",
      "Billing module is not available for Nurse.",
    );
    const login = new LoginPage(page);
    const billing = new BillingPage(page);

    // Login
    await login.open();
    await login.selectRole(user.role);
    await login.login();

    // Billing Module
    await billing.openBilling();

    // Search Case
    await billing.searchCase();

    // Validation
    await expect(page).toHaveURL(/admin\/bill\/index\/\d+/);
  });
});
