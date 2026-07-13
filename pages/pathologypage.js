const { expect } = require("@playwright/test");

class PathologyPage {
  constructor(page) {
    this.page = page;

    // Menu
   this.pathologyMenu = this.page.locator(
     "//li[contains(@class,'treeview')]//span[normalize-space()='Pathology']/parent::a",
   );

    // Generate Bill
    this.generateBillBtn = page.locator("button.assigntest");

    // Bill Form
    this.billForm = page.locator("#bill");

    // Patient
   this.patientDropdown = this.page.locator(
     "//span[@aria-labelledby='select2-addpatient_id-container']",
   );
    this.searchInput = page.locator("input.select2-search__field");
    this.options = page.locator("li.select2-results__option");

    // Test Name
    this.testDropdown = page.locator("#select2-1-container");
    // All options
this.testOptions = this.page.locator("li.select2-results__option");

    // Save
    this.saveBtn = page.locator("#billsave");
  }

  async openPathology() {
    await this.pathologyMenu.click();
    await this.page.waitForLoadState("networkidle");
  }

  async openGenerateBill() {
    await this.generateBillBtn.click();

    // Wait until Generate Bill form is visible
    await expect(this.billForm).toBeVisible({ timeout: 15000 });
  }

  async selectPatient(letters) {
    for (const letter of letters) {
      await this.patientDropdown.click();

      await this.searchInput.last().fill(letter);

      await this.page.waitForTimeout(800);

      const count = await this.options.count();

      if (count > 0) {
        console.log(`Patient found with '${letter}'`);

        await this.options.first().click();

        return;
      }
    }

    throw new Error("No patient found.");
  }

  async selectTest() {
   
    await this.testDropdown.click();

    await this.options.first().waitFor({
      state: "visible",
      timeout: 10000,
    });

    await this.testOptions.nth(1).click();
     // Wait 3 seconds
  await this.page.waitForTimeout(3000);
  }

  async saveBill() {
    await this.saveBtn.click();

    // Wait until form disappears
    await expect(this.billForm).toBeHidden({
      timeout: 15000,
    });
  }
}

module.exports = PathologyPage;
