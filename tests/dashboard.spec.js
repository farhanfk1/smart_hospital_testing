const { test } = require("@playwright/test");

const DashboardPage = require("../pages/dashboard");
const LoginPage = require("../pages/loginpage");

const dashboardData = require("../test-data/dashboard/dashboardData");
const loginData = require("../test-data/loginData");

loginData.forEach((user) => {
  test.describe(`${user.role} Dashboard`, () => {
    let dashboard;

    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);

      await login.open();
      await login.selectRole(user.role);
      await login.login();

      dashboard = new DashboardPage(page);
    });

    test("Dashboard Cards", async () => {
      const roleData = dashboardData[user.role];

      if (!roleData.cards || roleData.cards.length === 0) {
        await dashboard.verifyNoCards();
        return;
      }

      for (const card of roleData.cards) {
        console.log(`Checking Card: ${card.name}`);

        await dashboard.verifyVisible(card.name);
        console.log("Visible");
        await dashboard.verifyClickable(card.name);
         console.log("Clickable");
        await dashboard.clickCard(card.name);
        console.log("Clicked");
        await dashboard.verifyCardPage(card.url);
        console.log("Verified URL");
        await dashboard.backToDashboard();
        console.log("Back to dashboard");
      }
    });

    test("Dashboard Graphs", async () => {
      const roleData = dashboardData[user.role];

      if (!roleData.graphs || roleData.graphs.length === 0) {
        return;
      }

      for (const graph of roleData.graphs) {
        console.log(`Checking Graph: ${graph.title}`);

        await dashboard.verifyGraph(graph.title, graph.locator);
      }
    });

    test("Staff Cards", async ({page}) => {
      const roleData = dashboardData[user.role];

      if (!roleData.staffCards || roleData.staffCards.length === 0) {
        return;
      }

      for (const staffCard of roleData.staffCards) {
        console.log(`Checking Staff Card: ${staffCard.url}`);

        await dashboard.verifyStaffCardVisible(staffCard.url);
        console.log(await page.url());
        console.log(await page.locator(".info-box").count());
        await dashboard.verifyStaffCardClickable(staffCard.url);

        await dashboard.clickStaffCard(staffCard.url);
        console.log("Current URL:", page.url());

        await dashboard.verifyStaffCardPage(staffCard.url);

       await dashboard.backToDashboard();
      }
    });

    test("Notifications", async () => {
      const notificationExists = await dashboard.hasNotification();

      if (!notificationExists) {
        console.log(`${user.role} has no notifications.`);
        return;
      }

      await dashboard.verifyNotificationVisible();
      await dashboard.verifyNotificationClickable();

      await dashboard.clickNotification();

      await dashboard.verifyNotificationPage();
    });
  });
});
