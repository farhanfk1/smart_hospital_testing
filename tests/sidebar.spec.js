const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const SidebarPage = require("../pages/sidebarPages");

const loginData = require("../test-data/loginData");
const sidebarData = require("../test-data/sidebarData");

loginData.forEach((user) => {
  test(`Verify Sidebar Menus - ${user.role}`, async ({ page }) => {
    const login = new LoginPage(page);
    const sidebar = new SidebarPage(page);

    await login.open();
    await login.selectRole(user.role);    
    await login.login();

    await expect(page).toHaveURL(/admin\/admin\/dashboard/);

    const menus = sidebarData[user.role] || [];

    for (const item of menus) {
      await sidebar.verifyMenu(item.menu);
      await sidebar.clickMenu(item.menu);
    }
  });
});
