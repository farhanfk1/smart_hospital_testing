const { expect } = require("@playwright/test");

class SidebarPage {
  constructor(page) {
    this.page = page;
    this.sidebar = page.locator("ul.sidebar-menu.verttop");
  }

  getMenu(menuName) {
    return this.sidebar
      .locator("a")
      .filter({
        hasText: menuName,
      })
      .first();
  }

  async verifyMenu(menuName) {
    const menu = this.getMenu(menuName);

    await expect(menu).toBeVisible();
    await expect(menu).toBeEnabled();
  }
}

module.exports = SidebarPage;
