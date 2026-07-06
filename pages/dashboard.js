const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.notification = page.locator(".dashalert a");
  }
  async hasNotification() {
    return (await this.notification.count()) > 0;
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
    return this.page
      .locator(".info-box", {
        has: this.page.locator(".info-box-text", {
          hasText: cardName,
        }),
      })
      .locator("a");
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
  async verifyCardPage(url) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }
  async backToDashboard() {
    await this.page.goto(
      "https://demo.smart-hospital.in/admin/admin/dashboard",
      {
        waitUntil: "load",
      },
    );

    await expect(this.page.locator(".info-box").first()).toBeVisible();
  }

  async verifyNoCards() {
    await expect(this.page.locator(".info-box-content")).toHaveCount(0);
  }
  // graph
  async verifyGraph(title, locator) {
    await expect(this.page.getByText(title, { exact: true })).toBeVisible();

    await expect(this.page.locator(locator)).toBeVisible();
  }

  // get staff card
  getStaffCard(url) {
    return this.page.locator(`a[href*="${url}"]`);
  }
  async verifyStaffCardVisible(url) {
    await expect(this.getStaffCard(url)).toBeVisible();
  }
  async verifyStaffCardClickable(url) {
    await expect(this.getStaffCard(url)).toBeEnabled();
  }
  // new commentt for github push is correct fronm farhanfk1
  async clickStaffCard(url) {
    await this.getStaffCard(url).click();
  }
  async verifyStaffCardPage(url) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }
}

module.exports = DashboardPage;
