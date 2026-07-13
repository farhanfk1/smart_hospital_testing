const { expect } = require("@playwright/test");

class BillingPage {
  constructor(page) {
    this.page = page;

    // Sidebar
    this.billingMenu = page.locator(
      "//a[contains(@href,'/admin/bill/dashboard')]",
    );

    // Billing Search
    this.caseIdField = page.locator("#case_id");
    this.searchButton = page.locator("#serach_btn");

    // Autocomplete suggestions
    this.caseOptions = page.locator("li.ui-menu-item");

    // Result page (optional)
    this.resultHeading = page.locator("h3");
  }

  async openBilling() {
    await this.billingMenu.click();
    await this.page.waitForLoadState("networkidle");
  }

  async searchCase() {
    let found = false;

    for (let i = 1; i <= 9; i++) {
      console.log(`Trying Case ID: ${i}`);

      // Clear and type the number
      await this.caseIdField.click();
      await this.caseIdField.fill("");
      await this.caseIdField.fill(i.toString());

      // Give autocomplete time to load
      await this.page.waitForTimeout(1000);

      // Check whether the first suggestion is visible
      const visible = await this.caseOptions
        .first()
        .isVisible()
        .catch(() => false);

      if (visible) {
        console.log(`Case found for ${i}`);

        // Select the first suggestion
        await this.caseOptions.first().click();

        // Click Search
        await this.searchButton.click();

        await this.page.waitForLoadState("networkidle");

        found = true;
        break;
      }

      console.log(`No Case ID found for ${i}`);
    }

    if (!found) {
      throw new Error("No valid Case ID found between 1 and 9.");
    }
  }
}

module.exports = BillingPage;
