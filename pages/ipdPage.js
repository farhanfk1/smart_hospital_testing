const { expect } = require("@playwright/test");

class IPDPage {
  constructor(page) {
    this.page = page;

    // IPD Menu
    this.ipdMenu = page.locator(
      "//span[normalize-space()='IPD - In Patient']/parent::a",
    );

    // Add Patient
    this.addPatientButton = page.locator("#addp");

    // Patient
    this.patientDropdown = page.locator(
      "[aria-labelledby='select2-addpatient_id-container']",
    );

    // Admission Date
    this.admissionDate = page.locator("#datetimepicker");

    // Consultant Doctor
    this.consultantDropdown = page.locator(
      "[aria-labelledby='select2-consultant_doctor-container']",
    );

    // Bed Group
    this.bedGroup = page.locator("select[name='bed_group_id']");

    // Bed No
    this.bedNoDropdown = page.locator("#select2-bed_no-container");

    // Save
    this.saveButton = page.locator("#formaddbtn");
  }

  async openAddPatient() {
    await this.ipdMenu.click();

    await expect(this.addPatientButton).toBeVisible();

    await this.addPatientButton.click();
  }

  async selectPatient(name) {
    await this.patientDropdown.click();

    const searchBox = this.page.locator(
      ".select2-container--open input.select2-search__field",
    );

    await searchBox.fill(name);

    await this.page
      .locator(".select2-results__option")
      .filter({ hasNotText: "Enter Patient Name or Id" })
      .first()
      .click();
  }

  async selectAdmissionDate(date) {
    await this.admissionDate.click();
    await this.page.keyboard.press("Tab");
  }

  async selectConsultant(index) {
    await this.consultantDropdown.click();

    await this.page.locator(".select2-results__option").nth(index).click();
  }

  async selectBedGroupAndBedNo() {
    // Skip index 0 because it is "Select"
    for (let i = 1; i <= 7; i++) {
      // Select Bed Group
      await this.bedGroup.selectOption({ index: i });

      // Wait for Bed No dropdown to load
      await this.page.waitForTimeout(1000);

      // Open Bed No dropdown
      await this.bedNoDropdown.click();

      const options = this.page
        .locator(".select2-results__option")
        .filter({ hasNotText: "No Results Found" });

      const count = await options.count();

      // If a bed exists
      if (count > 1) {
        await options.nth(1).click();
        return;
      }

      // Close dropdown before trying next Bed Group
      await this.page.keyboard.press("Escape");
    }

    throw new Error("No bed available in any Bed Group.");
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyIPDPage() {
    await expect(this.page).toHaveURL(/ipdsearch/);

    await expect(this.addPatientButton).toBeVisible();
  }
}

module.exports = IPDPage;
