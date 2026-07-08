const { expect } = require("@playwright/test");

class OPDPage {
  constructor(page) {
    this.page = page;

    // OPD Menu
   this.opdMenu = page
     .locator("ul.sidebar-menu")
     .getByText("OPD - Out Patient", { exact: true });
    // Add Patient
    this.addPatientButton = page
      .locator("a.addpatient")
      .filter({ visible: true });

    // Patient
    this.patientDropdown = page.locator(
      ".select2-selection[aria-labelledby='select2-addpatient_id-container']",
    );
    this.searchBox = page.locator(".select2-search__field");
    this.firstOption = page.locator(".select2-results__option").first();

    // Appointment Date
    this.appointmentDate = page.locator("#datetimepicker");

    // Consultant Doctor
    this.consultantDropdown = page.locator(
      "#select2-consultant_doctor-container",
    );

    // Charge Category
    this.chargeCategoryDropdown = page.locator(
      '[id^="select2-charge_category"]',
    );

    // Charge
    this.chargeDropdown = page.locator('[id^="select2-charge_id"]');

    // Common Select2 options
    this.dropdownOptions = page.locator(".select2-results__option");

    // Save
    this.saveButton = page.locator("#formaddbtn");

    // Success message
    this.successMessage = page.locator(
      ".alert-success, .toast-success, .bootstrap-growl",
    );
  }

  async openAddPatient() {
     await this.opdMenu.click();

     await this.page.waitForLoadState("networkidle");

    console.log("Buttons:", await this.page.locator("a.addpatient").count());
    console.log(
      "First visible:",
      await this.page.locator("a.addpatient").first().isVisible(),
    );

    console.log(
      "Second visible:",
      await this.page.locator("a.addpatient").nth(1).isVisible(),
    );

     await expect(this.addPatientButton).toBeVisible();

     

     await this.addPatientButton.click();
  }

  async selectPatient(name) {
    await this.patientDropdown.click();
    const searchBox = this.page
      .locator("input.select2-search__field").last();
    await searchBox.fill(name);
   await this.page.locator(".select2-results__option").first().click();

  }

  async selectAppointmentDate(date) {
    await this.appointmentDate.fill(date);
  }

  async selectConsultant(index = 1) {
    await this.consultantDropdown.click();
    await this.dropdownOptions.nth(index).click();
  }

  async selectChargeCategory(index = 1) {
    await this.chargeCategoryDropdown.click();
    await this.dropdownOptions.nth(index).click();
  }

  async selectCharge(index = 1) {
    await this.chargeDropdown.click();
    await this.dropdownOptions.nth(index).click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyOPDPage() {
    await expect(this.page).toHaveURL(/admin\/patient\/search/);
     await expect(this.addPatientButton).toBeVisible();
  }
}

module.exports = OPDPage;
