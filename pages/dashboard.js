const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.notification = page.locator('.dashalert a');
  }
  async hasNotification() {
    return await this.notification.count() > 0;
  }
  
  // verify if notification is visible
  async verifyNotificationVisible() {
    await expect(this.notification.first()).toBeVisible();
  
  }
  // verify notification is clickable
  async verifyNotificationClickable() {
    await expect(this.notification.first()).toBeEnabled();
  }
  // Click notification
  async clickNotification() {
    await this.notification.first().click();
  }
  // verify notification page
  async verifyNotificationPage() {
    await expect(this.page).toHaveURL(/admin\/notification/);
  }


  // Get card by name
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
