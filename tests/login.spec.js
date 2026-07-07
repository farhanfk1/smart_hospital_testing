const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/loginPage");

const loginData = require("../test-data/loginData");

loginData.forEach((user) => {
  test(`Login as ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
// for login
    await login.open();

    await login.selectRole(user.role);

    await login.login();

    await expect(page).toHaveURL(/admin\/admin\/dashboard/);
  });
});
