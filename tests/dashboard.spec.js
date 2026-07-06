const { test, expect } = require("@playwright/test");

const DashboardPage = require("../pages/dashboard");
const LoginPage = require("../pages/LoginPage");

const dashboardData = require("../test-data/dashboardData");
const loginData = require("../test-data/loginData");
// login
loginData.forEach((user) => {
  test(`${user.role} Dashboard`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();

    await login.selectRole(user.role);

    await login.login();

    const dashboard = new DashboardPage(page);
    const roleData = dashboardData[user.role];

    if (roleData.cards.length === 0) {
      await dashboard.verifyNoCards();
      return;
    }
    else {
      for (const card of roleData.cards) {
        await dashboard.verifyVisible(card);

        await dashboard.verifyClickable(card);
      }
    }

    // verify graphs
    for (const graph of roleData.graphs) {
      await dashboard.verifyGraph(graph.title, graph.locator);
    }
    // verify staff cards
    if (roleData.staffCards && roleData.staffCards.length > 0) {
      for (const staffCard of roleData.staffCards) {
        await dashboard.verifyStaffCardVisible(staffCard);
        await dashboard.verifyStaffCardClickable(staffCard);
      }
    }


    // verify notification 
   const notificationExists = await dashboard.hasNotification();

   if (notificationExists) {
    

     await dashboard.verifyNotificationVisible();

     await dashboard.verifyNotificationClickable();

     await dashboard.clickNotification();

     await dashboard.verifyNotificationPage();
   } else {
      console.log("No notification found for this user.");
    }
    

  });
});
