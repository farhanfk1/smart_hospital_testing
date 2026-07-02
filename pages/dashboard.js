const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  getCard(cardName) {
    return this.page.locator(".info-box-content", {
      has: this.page.locator(".info-box-text", {
        hasText: cardName,
      }),
    });
  }

  async verifyVisible(cardName) {
    await expect(this.getCard(cardName)).toBeVisible();
  }

  async verifyClickable(cardName) {
    await expect(this.getCard(cardName)).toBeEnabled();
  }

  async clickCard(cardName) {
    await this.getCard(cardName).click();
  }
  async verifyNoCards() {
    await expect(this.page.locator(".info-box-content")).toHaveCount(0);
  }
}

module.exports = DashboardPage;
