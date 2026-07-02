const { test } = require("@playwright/test");

const DashboardPage = require("../pages/dashboard");
const LoginPage = require("../pages/LoginPage");

const cards = require("../test-data/dashboardData");
const loginData = require("../test-data/loginData");

loginData.forEach((user) => {
  test(`${user.role} Dashboard`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    await login.selectRole(user.role);

    await login.login();

    const dashboard = new DashboardPage(page);

    if (cards[user.role].length === 0) {
      await dashboard.verifyNoCards();
      return;
    }

    for (const card of cards[user.role]) {
      await dashboard.verifyVisible(card);

      await dashboard.verifyClickable(card);
    }
  });
});
