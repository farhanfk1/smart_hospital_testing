const { test } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const SidebarPage = require("../pages/sidebarPages");

const loginDaat = require("../test-data/loginData");
const sidebarData = require("../test-data/sidebarData");



test("Verify Sidebar Menus", async ({ page }) => {
  const login = new LoginPage(page);
  const sidebar = new SidebarPage(page);

  await login.open();
  await login.selectRole("Super Admin");
  await login.login();

  const menus = sidebarData["Super Admin"];

  for (const item of menus) {
    await sidebar.verifyMenu(item.menu);
  }
});
