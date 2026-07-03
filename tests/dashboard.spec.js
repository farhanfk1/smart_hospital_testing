const { test, expect } = require("@playwright/test");

const DashboardPage = require("../pages/dashboard");
const LoginPage = require("../pages/LoginPage");

const cards = require("../test-data/dashboardData");
const loginData = require("../test-data/loginData");
// login
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
    else {
      for (const card of cards[user.role]) {
        await dashboard.verifyVisible(card);

        await dashboard.verifyClickable(card);
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
